"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  componentCategories,
  componentTemplates,
} from "@/utils/component-library";
import { Download, FileText, Save, Search, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Update the TemplateManagerProps interface to support multiple selections
interface TemplateManagerProps {
  onSelectTemplate: (content: string, append?: boolean) => void;
  onSaveTemplate: (name: string, content: string) => void;
  currentContent?: string;
}

export function TemplateManager({
  onSelectTemplate,
  onSaveTemplate,
  currentContent,
}: TemplateManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [templateName, setTemplateName] = useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("browse");

  // Add a state for selected templates
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);

  // Add a state to control the dialog
  const [open, setOpen] = useState(false);

  // Filter templates based on search term and category
  const filteredTemplates = componentTemplates.filter((template) => {
    const matchesSearch = template.label
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group templates by category
  const groupedTemplates = filteredTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, typeof componentTemplates>);

  const handleSaveTemplate = () => {
    if (templateName && currentContent) {
      onSaveTemplate(templateName, currentContent);
      setTemplateName("");
      setSaveDialogOpen(false);
    }
  };

  // Add a function to handle template selection
  const handleTemplateSelection = (templateId: string) => {
    setSelectedTemplates((prev) => {
      if (prev.includes(templateId)) {
        return prev.filter((id) => id !== templateId);
      } else {
        return [...prev, templateId];
      }
    });
  };

  // Update the handleAddSelectedTemplates function to close the dialog
  const handleAddSelectedTemplates = () => {
    // Find all selected templates
    const templates = componentTemplates.filter((template) =>
      selectedTemplates.includes(template.id)
    );

    // Add each template to the canvas
    templates.forEach((template) => {
      onSelectTemplate(template.content, true); // Pass true to append instead of replace
    });

    // Clear selections after adding
    setSelectedTemplates([]);

    // Close the dialog
    setOpen(false);
  };

  // Update the handleTemplateDoubleClick function to close the dialog
  const handleTemplateDoubleClick = (template: any) => {
    onSelectTemplate(template.content, true); // Append the template

    // Close the dialog
    setOpen(false);
  };

  // Update the Dialog component to use the open state
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs"
          onClick={() => setOpen(true)}
        >
          <FileText className="w-3.5 h-3.5 mr-1.5" />
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col overflow-hidden bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-slate-100">Template Library</DialogTitle>
        </DialogHeader>

        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-3.5 w-3.5" />
            <Input
              placeholder="Search templates..."
              className="pl-9 h-8 text-xs bg-slate-800 border-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
            <DialogContent className="bg-slate-900 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-slate-100">
                  Save as Template
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label
                    htmlFor="template-name"
                    className="text-xs font-medium text-slate-300"
                  >
                    Template Name
                  </label>
                  <Input
                    id="template-name"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Enter template name"
                    className="h-8 text-xs bg-slate-800 border-slate-700"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => setSaveDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 text-xs"
                    onClick={handleSaveTemplate}
                  >
                    Save Template
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col min-h-0"
        >
          <TabsList className="grid w-full grid-cols-2 h-9 bg-slate-800">
            <TabsTrigger value="browse" className="text-xs">
              Browse Templates
            </TabsTrigger>
            <TabsTrigger value="saved" className="text-xs">
              My Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="browse"
            className={cn(
              "flex-1 flex flex-col min-h-0",
              activeTab !== "browse" && "hidden"
            )}
          >
            {/* Horizontally scrollable categories */}
            <div className="flex space-x-1.5 mb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800 py-2 px-1">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs shrink-0"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              {componentCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  className="h-7 text-xs whitespace-nowrap shrink-0"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Scrollable template sections */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="space-y-6 px-1 pb-4">
                  {Object.entries(groupedTemplates).map(
                    ([category, templates]) => (
                      <div key={category}>
                        <h3 className="text-sm font-medium mb-3 text-slate-200 sticky top-0 bg-slate-900 py-2 z-10">
                          {componentCategories.find((c) => c.id === category)
                            ?.label || category}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {templates.map((template) => (
                            <Card
                              key={template.id}
                              className={`cursor-pointer transition-colors bg-slate-800 border-slate-700 ${
                                selectedTemplates.includes(template.id)
                                  ? "border-2 border-indigo-500"
                                  : "hover:border-indigo-500"
                              }`}
                              onClick={() =>
                                handleTemplateSelection(template.id)
                              }
                              onDoubleClick={() =>
                                handleTemplateDoubleClick(template)
                              }
                            >
                              <CardContent className="p-2">
                                <div className="aspect-video bg-slate-700 rounded-sm mb-2 overflow-hidden">
                                  <img
                                    src={
                                      template.thumbnail ||
                                      "/placeholder.svg?height=100&width=200"
                                    }
                                    alt={template.label}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <h4 className="font-medium text-xs text-slate-200 truncate">
                                  {template.label}
                                </h4>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            </div>
            {selectedTemplates.length > 0 && (
              <div className="sticky bottom-0 bg-slate-900 p-3 border-t border-slate-700 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300">
                    {selectedTemplates.length} template(s) selected
                  </span>
                  <Button
                    size="sm"
                    className="h-8 text-xs"
                    onClick={handleAddSelectedTemplates}
                  >
                    Add Selected Templates
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="saved"
            className={cn(
              "flex-1 flex flex-col min-h-0",
              activeTab !== "saved" && "hidden"
            )}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-slate-200">
                My Saved Templates
              </h3>
              <div className="flex space-x-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => {
                    toast("Feature Under Development!");
                  }}
                >
                  <Upload className="w-3.5 h-3.5 mr-1.5" />
                  Import
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => {
                    toast("Feature Under Development!");
                  }}
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Export All
                </Button>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center text-center p-6 text-slate-400 border-2 border-dashed border-slate-700 rounded-lg">
              <div>
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <h4 className="text-sm font-medium mb-2">
                  No saved templates yet
                </h4>
                <p className="text-xs mb-4">
                  Save your current design as a template to reuse it later
                </p>
                <Button
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => {
                    toast("Feature Under Development!");
                  }}
                  // onClick={() => setSaveDialogOpen(true)}
                >
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  Save Current Design
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
