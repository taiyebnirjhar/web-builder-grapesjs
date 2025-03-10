import { Card, CardContent } from "@/components/ui/card";
import type { BlockConfig } from "@/types/editor";
import {
  Columns,
  Grid,
  Image,
  Layout,
  LinkIcon,
  Type,
  Video,
} from "lucide-react";

interface BlocksPanelProps {
  blocks: BlockConfig[];
  onAddBlock: (content: string) => void;
}

export function BlocksPanel({ blocks, onAddBlock }: BlocksPanelProps) {
  // Helper function to safely get category name
  const getCategoryName = (category: any): string => {
    if (!category) return "Basic";
    if (typeof category === "string") return category;
    if (typeof category === "object") {
      // Try to extract a name property if it exists
      return category.name || category.label || category.id || "Basic";
    }
    return String(category); // Convert any other type to string
  };

  // Group blocks by category
  const categories = blocks.reduce((acc, block) => {
    const categoryName = getCategoryName(block.category);
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(block);
    return acc;
  }, {} as Record<string, BlockConfig[]>);

  // Get icon for block type
  const getBlockIcon = (blockId: string) => {
    switch (blockId) {
      case "text":
        return <Type className="w-4 h-4" />;
      case "image":
        return <Image className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "section":
        return <Layout className="w-4 h-4" />;
      case "link":
        return <LinkIcon className="w-4 h-4" />;
      default:
        return blockId.includes("grid") ? (
          <Grid className="w-4 h-4" />
        ) : blockId.includes("column") ? (
          <Columns className="w-4 h-4" />
        ) : (
          <Layout className="w-4 h-4" />
        );
    }
  };

  // Format category name for display
  const formatCategoryName = (category: string): string => {
    if (category === "Basic") return "Basic Elements";
    if (category === "Layout") return "Layout Elements";
    if (category === "Media") return "Media Elements";
    // Capitalize first letter of each word
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="space-y-4">
      {Object.entries(categories).map(([category, categoryBlocks]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-xs font-medium text-slate-300">
            {formatCategoryName(category)}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {categoryBlocks.map((block) => (
              <Card
                key={block.id}
                className="cursor-move hover:border-indigo-500 transition-colors bg-slate-800 border-slate-700"
                onClick={() => {
                  const content =
                    typeof block.content === "string"
                      ? block.content
                      : `<div data-gjs-type="${block.id}">
                    ${block.label}
                    </div>`;
                  onAddBlock(content);
                }}
              >
                <CardContent className="p-2 flex flex-col items-center justify-center text-center">
                  <div className="h-7 w-7 rounded-full bg-slate-700 flex items-center justify-center mb-1.5">
                    {getBlockIcon(block.id)}
                  </div>
                  <span className="text-xs">{block.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
