"use client";

import type React from "react";
import { useCallback, useEffect, useState } from "react";

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

// Types
interface BlocksManagerProps {
  blocks: any[];
  onAddBlock: (blockContent: any) => void;
  recentBlocks?: string[];
  onRecentBlocksChange?: (blocks: string[]) => void;
  favorites?: string[];
  onFavoritesChange?: (blocks: string[]) => void;
}

// Block icons mapping
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

// Helper function to get icon for any block id
const getBlockIcon = (blockId: keyof typeof blockIcons) => {
  return blockIcons[blockId] || <Layout className="h-4 w-4" />;
};

// Helper function to group blocks by category
const groupBlocksByCategory = (blocks: any[]) => {
  return blocks.reduce((acc, block) => {
    const category = block.category || "Basic";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(block);
    return acc;
  }, {});
};

// Helper function to get unique categories
const getCategories = (blocksByCategory: Record<string, any[]>) => {
  return [
    "all",
    "favorites",
    "recent",
    ...Object.keys(blocksByCategory).sort(),
  ];
};

// Helper function to filter blocks
const filterBlocks = (
  blocks: any[],
  searchTerm: string,
  activeCategory: string,
  favoritesList: string[],
  recentBlocksList: string[]
) => {
  return blocks.filter((block) => {
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
};

export function BlocksManager({
  blocks,
  onAddBlock,
  recentBlocks = [],
  onRecentBlocksChange,
  favorites = [],
  onFavoritesChange,
}: BlocksManagerProps) {
  // State hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [recentBlocksList, setRecentBlocksList] =
    useState<string[]>(recentBlocks);
  const [favoritesList, setFavoritesList] = useState<string[]>(favorites);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [blockView, setBlockView] = useState<"grid" | "list">("grid");
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);

  // Process blocks data
  const blocksByCategory = groupBlocksByCategory(blocks);
  const categories = getCategories(blocksByCategory);
  const filteredBlocks = filterBlocks(
    blocks,
    searchTerm,
    activeCategory,
    favoritesList,
    recentBlocksList
  );

  // Load premium blocks
  useEffect(() => {
    // This would typically connect to your backend or load blocks from an API
    console.log("Premium blocks library loaded", blockLibrary);
  }, []);

  // Handle adding a block
  const handleAddBlock = useCallback(
    (blockId: string) => {
      // Find the block by ID
      const block = blocks.find((block) => block.id === blockId);

      if (block) {
        try {
          updateRecentBlocks(blockId);
          addBlockContent(block);
        } catch (error) {
          console.error("Error adding block:", error);
        }
      }
    },
    [blocks, onAddBlock, recentBlocksList, onRecentBlocksChange]
  );

  // Update recent blocks list
  const updateRecentBlocks = useCallback(
    (blockId: string) => {
      const updatedRecentBlocks = [
        blockId,
        ...recentBlocksList.filter((id) => id !== blockId),
      ].slice(0, 10); // Keep only the 10 most recent

      setRecentBlocksList(updatedRecentBlocks);
      if (onRecentBlocksChange) {
        onRecentBlocksChange(updatedRecentBlocks);
      }
    },
    [recentBlocksList, onRecentBlocksChange]
  );

  // Add block content to canvas
  const addBlockContent = useCallback(
    (block: any) => {
      if (block.content) {
        onAddBlock(block.content);
      } else {
        // Fallback for blocks without content
        onAddBlock(`<div class="p-4 bg-gray-100 border border-gray-300 rounded">
          <h3 class="text-lg font-medium">${block.label}</h3>
          <p class="text-gray-600">This is a placeholder for ${block.label}</p>
        </div>`);
      }
    },
    [onAddBlock]
  );

  // Toggle block selection
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

  // Handle adding all selected blocks
  const handleAddSelectedBlocks = useCallback(() => {
    // Add each selected block to the canvas
    selectedBlocks.forEach((blockId) => {
      const block = blocks.find((block) => block.id === blockId);
      if (block) {
        updateRecentBlocks(blockId);
        addBlockContent(block);
      }
    });

    // Clear selections and close the modal
    setSelectedBlocks([]);
    setOpen(false);
  }, [blocks, selectedBlocks, updateRecentBlocks, addBlockContent]);

  // Toggle favorite status
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

  // Render grid view
  const renderGridView = useCallback(
    () => (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-1">
        {filteredBlocks.length > 0 ? (
          filteredBlocks.map((block) => (
            <BlockGridItem
              key={block.id}
              block={block}
              isSelected={selectedBlocks.includes(block.id)}
              isFavorite={favoritesList.includes(block.id)}
              onToggleSelection={toggleBlockSelection}
              onToggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          <EmptyBlocksMessage />
        )}
      </div>
    ),
    [
      filteredBlocks,
      selectedBlocks,
      favoritesList,
      toggleBlockSelection,
      toggleFavorite,
    ]
  );

  // Render list view
  const renderListView = useCallback(
    () => (
      <div className="space-y-1.5 p-1">
        {filteredBlocks.length > 0 ? (
          filteredBlocks.map((block) => (
            <BlockListItem
              key={block.id}
              block={block}
              isSelected={selectedBlocks.includes(block.id)}
              isFavorite={favoritesList.includes(block.id)}
              onToggleSelection={toggleBlockSelection}
              onToggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          <EmptyBlocksMessage />
        )}
      </div>
    ),
    [
      filteredBlocks,
      selectedBlocks,
      favoritesList,
      toggleBlockSelection,
      toggleFavorite,
    ]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 text-xs">
          <Layout className="w-3.5 h-3.5 mr-1.5" />
          Blocks
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

        <SearchAndFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          blockView={blockView}
          setBlockView={setBlockView}
          showFilterOptions={showFilterOptions}
          setShowFilterOptions={setShowFilterOptions}
        />

        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <ScrollArea className="flex-1 pr-4 h-[400px]">
          {blockView === "grid" ? renderGridView() : renderListView()}
        </ScrollArea>

        {selectedBlocks.length > 0 && (
          <SelectedBlocksFooter
            selectedCount={selectedBlocks.length}
            onAddSelectedBlocks={handleAddSelectedBlocks}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

// Component for search bar and filter options
function SearchAndFilterBar({
  searchTerm,
  setSearchTerm,
  blockView,
  setBlockView,
  showFilterOptions,
  setShowFilterOptions,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  blockView: "grid" | "list";
  setBlockView: (view: "grid" | "list") => void;
  showFilterOptions: boolean;
  setShowFilterOptions: (show: boolean) => void;
}) {
  return (
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
          onClick={() => setBlockView(blockView === "grid" ? "list" : "grid")}
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

          {showFilterOptions && <FilterOptionsDropdown />}
        </div>
      </div>
    </div>
  );
}

// Component for filter options dropdown
function FilterOptionsDropdown() {
  return (
    <div className="absolute right-0 mt-1 w-48 bg-popover rounded-md shadow-md p-2 z-10 text-popover-foreground border">
      <div className="text-xs font-medium mb-2">Sort By</div>
      <div className="space-y-1">
        <div className="flex items-center px-2 py-1 hover:bg-muted rounded-sm cursor-pointer">
          <input type="radio" id="sort-name" name="sort" className="mr-2" />
          <label htmlFor="sort-name" className="text-xs cursor-pointer">
            Name
          </label>
        </div>
        <div className="flex items-center px-2 py-1 hover:bg-muted rounded-sm cursor-pointer">
          <input type="radio" id="sort-category" name="sort" className="mr-2" />
          <label htmlFor="sort-category" className="text-xs cursor-pointer">
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
          <label htmlFor="sort-recent" className="text-xs cursor-pointer">
            Recently Used
          </label>
        </div>
      </div>
    </div>
  );
}

// Component for category tabs
function CategoryTabs({
  categories,
  activeCategory,
  setActiveCategory,
}: {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}) {
  return (
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
    </Tabs>
  );
}

// Component for grid view item
function BlockGridItem({
  block,
  isSelected,
  isFavorite,
  onToggleSelection,
  onToggleFavorite,
}: {
  block: any;
  isSelected: boolean;
  isFavorite: boolean;
  onToggleSelection: (blockId: string, event: React.MouseEvent) => void;
  onToggleFavorite: (blockId: string, event: React.MouseEvent) => void;
}) {
  return (
    <Card
      className={`cursor-pointer transition-colors relative group ${
        isSelected ? "border-2 border-primary" : "hover:border-primary"
      }`}
      onClick={(e) => onToggleSelection(block.id, e)}
    >
      <CardContent className="p-3 flex flex-col items-center justify-center text-center">
        <div className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-muted"
            onClick={(e) => onToggleFavorite(block.id, e)}
          >
            <Star
              className={`h-3.5 w-3.5 ${
                isFavorite
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
  );
}

// Component for list view item
function BlockListItem({
  block,
  isSelected,
  isFavorite,
  onToggleSelection,
  onToggleFavorite,
}: {
  block: any;
  isSelected: boolean;
  isFavorite: boolean;
  onToggleSelection: (blockId: string, event: React.MouseEvent) => void;
  onToggleFavorite: (blockId: string, event: React.MouseEvent) => void;
}) {
  return (
    <div
      className={`flex items-center p-2 rounded-md cursor-pointer group ${
        isSelected ? "bg-accent" : "hover:bg-accent"
      }`}
      onClick={(e) => onToggleSelection(block.id, e)}
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
            onClick={(e) => onToggleFavorite(block.id, e)}
          >
            <Star
              className={`h-3.5 w-3.5 ${
                isFavorite
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
  );
}

// Component for empty blocks message
function EmptyBlocksMessage() {
  return (
    <div className="col-span-full text-center py-8 text-muted-foreground">
      <p>No blocks found matching your search.</p>
    </div>
  );
}

// Component for selected blocks footer
function SelectedBlocksFooter({
  selectedCount,
  onAddSelectedBlocks,
}: {
  selectedCount: number;
  onAddSelectedBlocks: () => void;
}) {
  return (
    <div className="sticky bottom-0 bg-background p-3 border-t mt-4">
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {selectedCount} block(s) selected
        </span>
        <Button size="sm" onClick={onAddSelectedBlocks}>
          Add Selected Blocks
        </Button>
      </div>
    </div>
  );
}
