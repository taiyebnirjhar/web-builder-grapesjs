"use client";

import type React from "react";

import { blockLibrary } from "@/components/block-library";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlignCenter,
  Clock,
  Filter,
  Grid2X2,
  Grid3X3,
  Image,
  Layout,
  LinkIcon,
  MapPin,
  Search,
  Star,
  Type,
  Video,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface BlocksManagerProps {
  blocks: any[];
  onAddBlock: (blockContent: any) => void;
  recentBlocks?: string[];
  onRecentBlocksChange?: (blocks: string[]) => void;
  favorites?: string[];
  onFavoritesChange?: (blocks: string[]) => void;
}

export function BlocksManager({
  blocks,
  onAddBlock,
  recentBlocks = [],
  onRecentBlocksChange,
  favorites = [],
  onFavoritesChange,
}: BlocksManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [recentBlocksList, setRecentBlocksList] =
    useState<string[]>(recentBlocks);
  const [favoritesList, setFavoritesList] = useState<string[]>(favorites);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [blockView, setBlockView] = useState<"grid" | "list">("grid");

  // Add a new state for tracking selected blocks (after the existing state declarations)
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);

  // Group blocks by category
  const blocksByCategory = blocks.reduce((acc, block) => {
    const category = block.category || "Basic";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(block);
    return acc;
  }, {});

  // Get unique categories
  const categories = [
    "all",
    "favorites",
    "recent",
    ...Object.keys(blocksByCategory).sort(),
  ];

  // Add premium blocks from library
  useEffect(() => {
    // This would typically connect to your backend or load blocks from an API
    console.log("Premium blocks library loaded", blockLibrary);
  }, []);

  // Filter blocks based on search term and active category
  const filteredBlocks = blocks.filter((block) => {
    const matchesSearch =
      block.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (block.category &&
        block.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (block.description &&
        block.description.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeCategory === "all") {
      return matchesSearch;
    } else if (activeCategory === "favorites") {
      return matchesSearch && favoritesList.includes(block.id);
    } else if (activeCategory === "recent") {
      return matchesSearch && recentBlocksList.includes(block.id);
    } else {
      return matchesSearch && block.category === activeCategory;
    }
  });

  // Update the handleAddBlock function to handle multiple blocks
  const handleAddBlock = useCallback(
    (blockId: string) => {
      // Find the block by ID
      const block = blocks.find((block) => block.id === blockId);

      if (block) {
        try {
          // Add to recent blocks
          const updatedRecentBlocks = [
            blockId,
            ...recentBlocksList.filter((id) => id !== blockId),
          ].slice(0, 10); // Keep only the 10 most recent

          setRecentBlocksList(updatedRecentBlocks);
          if (onRecentBlocksChange) {
            onRecentBlocksChange(updatedRecentBlocks);
          }

          // Pass the actual block content to the onAddBlock function
          if (block.content) {
            onAddBlock(block.content);
          } else {
            // Fallback for blocks without content
            onAddBlock(`<div class="p-4 bg-gray-100 border border-gray-300 rounded">
              <h3 class="text-lg font-medium">${block.label}</h3>
              <p class="text-gray-600">This is a placeholder for ${block.label}</p>
            </div>`);
          }
        } catch (error) {
          console.error("Error adding block:", error);
        }
      }
    },
    [blocks, onAddBlock, recentBlocksList, onRecentBlocksChange]
  );

  // Add a new function to handle block selection
  const toggleBlockSelection = useCallback(
    (blockId: string, event: React.MouseEvent) => {
      event.stopPropagation(); // Prevent default click behavior

      setSelectedBlocks((prev) => {
        if (prev.includes(blockId)) {
          return prev.filter((id) => id !== blockId);
        } else {
          return [...prev, blockId];
        }
      });
    },
    []
  );

  // Add a function to handle adding all selected blocks
  const handleAddSelectedBlocks = useCallback(() => {
    // Add each selected block to the canvas
    selectedBlocks.forEach((blockId) => {
      const block = blocks.find((block) => block.id === blockId);
      if (block) {
        // Add to recent blocks
        const updatedRecentBlocks = [
          blockId,
          ...recentBlocksList.filter((id) => id !== blockId),
        ].slice(0, 10);
        setRecentBlocksList(updatedRecentBlocks);
        if (onRecentBlocksChange) {
          onRecentBlocksChange(updatedRecentBlocks);
        }

        // Add the block content
        if (block.content) {
          onAddBlock(block.content);
        } else {
          onAddBlock(`<div class="p-4 bg-gray-100 border border-gray-300 rounded">
            <h3 class="text-lg font-medium">${block.label}</h3>
            <p class="text-gray-600">This is a placeholder for ${block.label}</p>
          </div>`);
        }
      }
    });

    // Clear selections and close the modal
    setSelectedBlocks([]);
    setOpen(false);
  }, [
    blocks,
    selectedBlocks,
    recentBlocksList,
    onAddBlock,
    onRecentBlocksChange,
  ]);

  const toggleFavorite = useCallback(
    (blockId: string, event: React.MouseEvent) => {
      event.stopPropagation(); // Prevent block from being added

      let updatedFavorites;
      if (favoritesList.includes(blockId)) {
        updatedFavorites = favoritesList.filter((id) => id !== blockId);
      } else {
        updatedFavorites = [...favoritesList, blockId];
      }

      setFavoritesList(updatedFavorites);
      if (onFavoritesChange) {
        onFavoritesChange(updatedFavorites);
      }
    },
    [favoritesList, onFavoritesChange]
  );

  // Icons for blocks
  const blockIcons = {
    section: <Layout className="h-4 w-4" />,
    text: <Type className="h-4 w-4" />,
    image: <Image className="h-4 w-4" />,
    video: <Video className="h-4 w-4" />,
    link: <LinkIcon className="h-4 w-4" />,
    map: <MapPin className="h-4 w-4" />,
    column1: <AlignCenter className="h-4 w-4" />,
    column2: <Grid2X2 className="h-4 w-4" />,
    column3: <Grid3X3 className="h-4 w-4" />,
  };

  // Get icon for any block id
  const getBlockIcon = (blockId: keyof typeof blockIcons) => {
    return blockIcons[blockId] || <Layout className="h-4 w-4" />;
  };

  // Update the grid view render function to support selection
  const renderGridView = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-1">
      {filteredBlocks.length > 0 ? (
        filteredBlocks.map((block) => (
          <Card
            key={block.id}
            className={`cursor-pointer transition-colors relative group ${
              selectedBlocks.includes(block.id)
                ? "border-2 border-primary"
                : "hover:border-primary"
            }`}
            onClick={(e) => toggleBlockSelection(block.id, e)}
          >
            <CardContent className="p-3 flex flex-col items-center justify-center text-center">
              <div className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-muted"
                  onClick={(e) => toggleFavorite(block.id, e)}
                >
                  <Star
                    className={`h-3.5 w-3.5 ${
                      favoritesList.includes(block.id)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </Button>
              </div>
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-2">
                {getBlockIcon(block.id)}
              </div>
              <span className="text-sm font-medium">{block.label}</span>
              <span className="text-xs text-muted-foreground mt-1">
                {block.category || "Basic"}
              </span>

              {/* Premium badge */}
              {block.premium && (
                <Badge
                  variant="outline"
                  className="mt-2 bg-gradient-to-r from-amber-500 to-amber-300 text-white border-0"
                >
                  Premium
                </Badge>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          <p>No blocks found matching your search.</p>
        </div>
      )}
    </div>
  );

  // Update the list view render function to support selection
  const renderListView = () => (
    <div className="space-y-1.5 p-1">
      {filteredBlocks.length > 0 ? (
        filteredBlocks.map((block) => (
          <div
            key={block.id}
            className={`flex items-center p-2 rounded-md cursor-pointer group ${
              selectedBlocks.includes(block.id)
                ? "bg-accent"
                : "hover:bg-accent"
            }`}
            onClick={(e) => toggleBlockSelection(block.id, e)}
          >
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-3">
              {getBlockIcon(block.id)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">{block.label}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => toggleFavorite(block.id, e)}
                >
                  <Star
                    className={`h-3.5 w-3.5 ${
                      favoritesList.includes(block.id)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </Button>
              </div>
              <span className="text-xs text-muted-foreground block truncate">
                {block.category || "Basic"}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No blocks found matching your search.</p>
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Layout className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Blocks Library</DialogTitle>
          <DialogDescription>
            Drag and drop blocks to build your page. Click on a block to add it
            to the canvas.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search blocks..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* View toggle and filter buttons */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                setBlockView(blockView === "grid" ? "list" : "grid")
              }
            >
              {blockView === "grid" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              )}
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowFilterOptions(!showFilterOptions)}
              >
                <Filter className="h-4 w-4" />
              </Button>

              {showFilterOptions && (
                <div className="absolute right-0 mt-1 w-48 bg-popover rounded-md shadow-md p-2 z-10 text-popover-foreground border">
                  <div className="text-xs font-medium mb-2">Sort By</div>
                  <div className="space-y-1">
                    <div className="flex items-center px-2 py-1 hover:bg-muted rounded-sm cursor-pointer">
                      <input
                        type="radio"
                        id="sort-name"
                        name="sort"
                        className="mr-2"
                      />
                      <label
                        htmlFor="sort-name"
                        className="text-xs cursor-pointer"
                      >
                        Name
                      </label>
                    </div>
                    <div className="flex items-center px-2 py-1 hover:bg-muted rounded-sm cursor-pointer">
                      <input
                        type="radio"
                        id="sort-category"
                        name="sort"
                        className="mr-2"
                      />
                      <label
                        htmlFor="sort-category"
                        className="text-xs cursor-pointer"
                      >
                        Category
                      </label>
                    </div>
                    <div className="flex items-center px-2 py-1 hover:bg-muted rounded-sm cursor-pointer">
                      <input
                        type="radio"
                        id="sort-recent"
                        name="sort"
                        className="mr-2"
                        defaultChecked
                      />
                      <label
                        htmlFor="sort-recent"
                        className="text-xs cursor-pointer"
                      >
                        Recently Used
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Tabs
          defaultValue="all"
          value={activeCategory}
          onValueChange={setActiveCategory}
        >
          <div className="mb-4 overflow-x-auto">
            <TabsList className="inline-flex w-auto h-9 bg-muted/50 p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-3 py-1.5 text-xs whitespace-nowrap flex items-center gap-1"
                >
                  {category === "all" ? (
                    <>
                      <Layout className="h-3 w-3" />
                      <span>All Blocks</span>
                    </>
                  ) : category === "favorites" ? (
                    <>
                      <Star className="h-3 w-3" />
                      <span>Favorites</span>
                    </>
                  ) : category === "recent" ? (
                    <>
                      <Clock className="h-3 w-3" />
                      <span>Recent</span>
                    </>
                  ) : (
                    <span className="capitalize">{category}</span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <ScrollArea className="flex-1 pr-4 h-[400px]">
            {blockView === "grid" ? renderGridView() : renderListView()}
          </ScrollArea>
          {selectedBlocks.length > 0 && (
            <div className="sticky bottom-0 bg-background p-3 border-t mt-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {selectedBlocks.length} block(s) selected
                </span>
                <Button size="sm" onClick={handleAddSelectedBlocks}>
                  Add Selected Blocks
                </Button>
              </div>
            </div>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
