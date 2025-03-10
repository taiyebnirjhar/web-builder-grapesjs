"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/use-editor";
import type { DeviceConfig } from "@/types/editor";
import {
  Box,
  Code,
  Download,
  Eye,
  MousePointer,
  Palette,
  PanelRight,
  Redo,
  Sliders,
  Trash2,
  Undo,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AttributesEditor } from "./attributes-editor/attributes-editor";
import { BlocksManager } from "./blocks-manager/blocks-manager";
import { CodeEditor } from "./code-editor/code-editor";
import { DevicePreview } from "./device-preview/device-preview";
import { InteractivityEditor } from "./interactivity/interactivity-editor";
import { ResponsivePanel } from "./responsive-panel/responsive-panel";
import { StyleEditor } from "./style-editor/style-editor";
import { TemplateManager } from "./template-manager/template-manager";

export default function GrapesJSEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { state, actions } = useEditor("gjs-editor");
  const [showResponsivePanel, setShowResponsivePanel] = useState(false);
  const [customDevices, setCustomDevices] = useState<DeviceConfig[]>([]);
  const [editorHtml, setEditorHtml] = useState("");
  const [editorCss, setEditorCss] = useState("");
  const [editorJs, setEditorJs] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [recentBlocks, setRecentBlocks] = useState<string[]>([]);
  const [favoriteBlocks, setFavoriteBlocks] = useState<string[]>([]);

  // Extract import code modal functionality
  const handleImportCode = () => {
    if (state.editor) {
      state.editor.Modal.open({
        title: "Import Code",
        content: `
        <div style="padding: 20px;">
          <textarea id="import-code" style="width: 100%; height: 250px; padding: 10px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; color:black
          ;" placeholder="Paste your HTML code here"></textarea>
          <button id="import-button" style="padding: 8px 16px; background-color: #7C3AED; color: white; border: none; border-radius: 4px; cursor: pointer;">Import</button>
        </div>
      `,
        attributes: { class: "gjs-modal-import" },
      });

      // Add event listener to the import button
      setTimeout(() => {
        const importButton = document.getElementById("import-button");
        const importCode = document.getElementById(
          "import-code"
        ) as HTMLTextAreaElement;

        if (importButton && importCode) {
          importButton.addEventListener("click", () => {
            const code = importCode.value;
            actions.importCode(code);
            state.editor.Modal.close();
          });
        }
      }, 100);
    }
  };

  // Device management functions
  const handleAddDevice = (device: DeviceConfig) => {
    setCustomDevices([...customDevices, device]);
    if (state.editor && state.editor.DeviceManager) {
      state.editor.DeviceManager.add(device);
    }
  };

  const handleRemoveDevice = (deviceId: string) => {
    setCustomDevices(customDevices.filter((device) => device.id !== deviceId));
    if (state.editor && state.editor.DeviceManager) {
      state.editor.DeviceManager.remove(deviceId);
    }
  };

  const handleUpdateDevice = (
    deviceId: string,
    updates: Partial<DeviceConfig>
  ) => {
    if (state.editor && state.editor.DeviceManager) {
      // First, check if the device exists
      const device = state.editor.DeviceManager.get(deviceId);

      if (device) {
        // If device exists, remove it first and then add the updated version
        state.editor.DeviceManager.remove(deviceId);

        // Create updated device config
        const updatedDevice = {
          ...device.attributes,
          ...updates,
          id: deviceId,
        };

        // Add the updated device
        state.editor.DeviceManager.add(updatedDevice);

        // If this was the current device, set it again
        if (state.currentDevice === deviceId) {
          state.editor.setDevice(deviceId);
        }
      } else {
        // If device doesn't exist, add a new one
        state.editor.DeviceManager.add({
          id: deviceId,
          name: "Custom",
          ...updates,
        });
      }
    }
  };

  // Template management functions
  const handleSelectTemplate = (content: string, append = false) => {
    if (state.editor) {
      if (append) {
        state.editor.addComponents(content);
      } else {
        state.editor.setComponents(content);
      }
    }
  };
  const handleClearCanvas = () => {
    if (state.editor) {
      try {
        // Clear all components from the canvas
        state.editor.setComponents("");

        // Also clear any custom styles
        state.editor.setStyle("");

        // Clear any JavaScript if the editor supports it
        if (typeof state.editor.setJs === "function") {
          state.editor.setJs("");
        } else if (state.editor.StorageManager) {
          // Fallback for editors without setJs
          state.editor.StorageManager.store({
            jsCode: "",
          });
        }

        // Update the editor state
        setEditorHtml("");
        setEditorCss("");
        setEditorJs("");

        // Refresh the editor to ensure changes take effect
        state.editor.refresh();

        console.log("Canvas cleared successfully");
      } catch (error) {
        console.error("Error clearing canvas:", error);
      }
    } else {
      console.warn("Editor not initialized");
    }
  };

  const handleSaveTemplate = (name: string, content: string) => {
    // In a real app, you would save this to a database
    console.log(`Saving template: ${name}`);
    console.log(content);
  };

  // Code editor functions
  const handleUpdateHtml = (html: string) => {
    if (state.editor) {
      state.editor.setComponents(html);
      setEditorHtml(html);
    }
  };

  const handleUpdateCss = (css: string) => {
    if (state.editor) {
      state.editor.setStyle(css);
      setEditorCss(css);
    }
  };

  const handleUpdateJs = (js: string) => {
    if (state.editor && state.editor.setJs) {
      state.editor.setJs(js);
      setEditorJs(js);
    }
  };

  // UI toggle functions
  const togglePreviewMode = () => {
    if (state.editor) {
      if (isPreviewMode) {
        state.editor.stopCommand("preview");
      } else {
        state.editor.runCommand("preview");
      }
      setIsPreviewMode(!isPreviewMode);

      // Hide sidebar in preview mode
      if (!isPreviewMode && showSidebar) {
        setShowSidebar(false);
      }
    }
  };

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  // Local storage functions
  const handleRecentBlocksChange = (blocks: string[]) => {
    setRecentBlocks(blocks);
    try {
      localStorage.setItem("grapesjs-recent-blocks", JSON.stringify(blocks));
    } catch (e) {
      console.warn("Could not save recent blocks to localStorage", e);
    }
  };

  // Handle favorite blocks updates
  const handleFavoriteBlocksChange = (blocks: string[]) => {
    setFavoriteBlocks(blocks);
    try {
      localStorage.setItem("grapesjs-favorite-blocks", JSON.stringify(blocks));
    } catch (e) {
      console.warn("Could not save favorite blocks to localStorage", e);
    }
  };

  // Extract the editor initialization logic
  const initializeEditor = () => {
    if (state.editor) {
      // Update editor content when editor is ready
      setEditorHtml(state.editor.getHtml());
      setEditorCss(state.editor.getCss());
      setEditorJs(state.editor.getJs ? state.editor.getJs() : "");

      // Set up event listeners for content changes
      state.editor.on("component:update", () => {
        setEditorHtml(state.editor.getHtml());
        setEditorCss(state.editor.getCss());
        setEditorJs(state.editor.getJs ? state.editor.getJs() : "");
      });

      // Add this new event listener to keep selections properly updated
      state.editor.on("component:selected", (component: { get: any }) => {
        // Only open the sidebar if we have a valid component
        if (component && component.get) {
          setShowSidebar(true);

          // Ensure the editor is focused on this component
          // This helps with consistent styling behavior
          try {
            state.editor.select(component);
          } catch (e) {
            console.error("Error focusing on selected component:", e);
          }
        }
      });

      // Fix block categories
      if (state.editor.BlockManager) {
        state.editor.BlockManager.getAll().forEach(
          (block: {
            get: (arg0: string) => any;
            set: (arg0: string, arg1: any) => void;
          }) => {
            // Ensure category is a string
            if (typeof block.get("category") === "object") {
              const category = block.get("category");
              block.set("category", category.label || "Basic");
            }
          }
        );
      }

      // Load saved recent and favorite blocks from localStorage
      loadSavedBlocks();

      // Add a debounced window listener to refresh the editor on window resize
      setupResizeListener();
    }
  };

  // Load saved blocks from localStorage
  const loadSavedBlocks = () => {
    try {
      const savedRecentBlocks = localStorage.getItem("grapesjs-recent-blocks");
      const savedFavoriteBlocks = localStorage.getItem(
        "grapesjs-favorite-blocks"
      );

      if (savedRecentBlocks) {
        setRecentBlocks(JSON.parse(savedRecentBlocks));
      }

      if (savedFavoriteBlocks) {
        setFavoriteBlocks(JSON.parse(savedFavoriteBlocks));
      }
    } catch (e) {
      console.warn("Could not load saved blocks from localStorage", e);
    }
  };

  // Setup resize listener
  const setupResizeListener = () => {
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (state.editor) {
          state.editor.refresh();
        }
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    // Return cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  };

  // Render the top toolbar
  const renderTopToolbar = () => {
    return (
      <div className="h-12 border-b border-slate-800 flex items-center px-3 justify-between bg-slate-900">
        <Link href="/" className="font-bold text-xl text-white mr-4">
          WebBuilder
        </Link>

        <div className="flex items-center space-x-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <BlocksManager
                blocks={state.blocks}
                onAddBlock={(content) => actions.addComponent(content)}
                recentBlocks={recentBlocks}
                onRecentBlocksChange={handleRecentBlocksChange}
                favorites={favoriteBlocks}
                onFavoritesChange={handleFavoriteBlocksChange}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom">Blocks</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <TemplateManager
                onSelectTemplate={handleSelectTemplate}
                onSaveTemplate={handleSaveTemplate}
                currentContent={state.editor?.getHtml()}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom">Templates</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <CodeEditor
                html={editorHtml}
                css={editorCss}
                js={editorJs}
                onUpdateHtml={handleUpdateHtml}
                onUpdateCss={handleUpdateCss}
                onUpdateJs={handleUpdateJs}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom">Edit Code</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={handleImportCode}
              >
                <Code className="w-3.5 h-3.5 mr-1.5" />
                Import HTML
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Import HTML</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={actions.undo}
              >
                <Undo className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={actions.redo}
              >
                <Redo className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Redo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleClearCanvas}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Reset Canvas</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isPreviewMode ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={togglePreviewMode}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Preview</TooltipContent>
          </Tooltip>

          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Save className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Save Project</TooltipContent>
          </Tooltip> */}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={actions.downloadHtml}
              >
                <Download className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Export HTML</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={showSidebar ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8 ml-1.5"
                onClick={toggleSidebar}
              >
                <PanelRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {showSidebar ? "Hide Properties Panel" : "Show Properties Panel"}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    );
  };

  // Render the bottom toolbar
  const renderBottomToolbar = () => {
    return (
      <div className="border-t border-slate-800 bg-slate-900">
        <div className="h-10 flex items-center justify-between px-3">
          <div className="flex items-center space-x-3">
            <DevicePreview
              currentDevice={state.currentDevice}
              onChange={actions.setDevice}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setShowResponsivePanel(!showResponsivePanel)}
                >
                  <Sliders className="h-4 w-4" />
                  <span className="sr-only">
                    {showResponsivePanel
                      ? "Hide Responsive Panel"
                      : "Show Responsive Panel"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {showResponsivePanel
                  ? "Hide Responsive Panel"
                  : "Show Responsive Panel"}
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-slate-400 mr-2">
              Canvas: {state.currentDevice}
            </span>
          </div>
        </div>

        {showResponsivePanel && (
          <ResponsivePanel
            devices={allDevices}
            currentDevice={state.currentDevice}
            onDeviceChange={actions.setDevice}
            onAddDevice={handleAddDevice}
            onRemoveDevice={handleRemoveDevice}
            onUpdateDevice={handleUpdateDevice}
          />
        )}
      </div>
    );
  };

  // Render the sidebar
  const renderSidebar = () => {
    if (!showSidebar) return null;

    return (
      <div className="w-[40%] border-l border-slate-800 flex flex-col h-full transition-all duration-300 ease-in-out">
        <Tabs defaultValue="style" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 h-10 bg-slate-900 rounded-none border-b border-slate-800">
            <Tooltip>
              <TooltipTrigger asChild>
                <TabsTrigger value="style" className="text-xs font-medium">
                  <Palette className="w-4 h-4" />
                  <span className="sr-only">Style</span>
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">Style</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <TabsTrigger value="attributes" className="text-xs font-medium">
                  <Box className="w-4 h-4" />
                  <span className="sr-only">Attributes</span>
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">Attributes</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <TabsTrigger
                  value="interactivity"
                  className="text-xs font-medium"
                >
                  <MousePointer className="w-4 h-4" />
                  <span className="sr-only">Interactivity</span>
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">Interactivity</TooltipContent>
            </Tooltip>
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <TabsTrigger value="settings" className="text-xs font-medium">
                  <Settings className="w-4 h-4" />
                  <span className="sr-only">Settings</span>
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">Settings</TooltipContent>
            </Tooltip> */}
          </TabsList>

          <TabsContent value="style" className="p-3 flex-1 overflow-y-auto">
            {renderStyleTab()}
          </TabsContent>

          <TabsContent
            value="attributes"
            className="p-3 flex-1 overflow-y-auto"
          >
            {renderAttributesTab()}
          </TabsContent>

          <TabsContent
            value="interactivity"
            className="p-3 flex-1 overflow-y-auto"
          >
            {renderInteractivityTab()}
          </TabsContent>

          {/* <TabsContent value="settings" className="p-3 flex-1 overflow-y-auto">
            {renderSettingsTab()}
          </TabsContent> */}
        </Tabs>
      </div>
    );
  };

  // Render the style tab
  const renderStyleTab = () => {
    if (!state.selectedElement) {
      return renderEmptySelectionMessage("Box", "properties");
    }

    return (
      <StyleEditor styles={state.styles} onStyleChange={actions.updateStyle} />
    );
  };

  // Render the attributes tab
  const renderAttributesTab = () => {
    if (!state.selectedElement) {
      return renderEmptySelectionMessage("Box", "attributes");
    }

    return (
      <AttributesEditor
        selectedElement={state.selectedElement}
        onAttributeChange={actions.updateAttribute}
      />
    );
  };

  // Render the interactivity tab
  const renderInteractivityTab = () => {
    if (!state.selectedElement) {
      return renderEmptySelectionMessage("MousePointer", "interactivity");
    }

    return (
      <InteractivityEditor
        selectedElement={state.selectedElement}
        onInteractivityChange={actions.updateInteractivity}
      />
    );
  };

  // Render empty selection message
  const renderEmptySelectionMessage = (icon: string, type: string) => {
    const Icon =
      icon === "Box" ? Box : icon === "MousePointer" ? MousePointer : Box;

    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center p-6">
        <Icon className="w-10 h-10 mb-3 opacity-50" />
        <h3 className="text-sm font-medium mb-2">No Element Selected</h3>
        <p className="text-xs">
          Select an element on the canvas to edit its {type}
        </p>
      </div>
    );
  };

  // Render the settings tab
  const renderSettingsTab = () => {
    return (
      <div className="space-y-5">
        <div>
          <h3 className="text-sm font-medium mb-3">Project Settings</h3>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Project Name
              </label>
              <input
                type="text"
                className="w-full px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="My Awesome Website"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Description
              </label>
              <textarea
                className="w-full px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="A brief description of your project"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Canvas Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">
                Show Grid
              </span>
              <button className="w-8 h-4 bg-slate-700 rounded-full relative">
                <span className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">
                Snap to Grid
              </span>
              <button className="w-8 h-4 bg-indigo-600 rounded-full relative">
                <span className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">
                Show Rulers
              </span>
              <button className="w-8 h-4 bg-slate-700 rounded-full relative">
                <span className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Export Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">
                Include CSS
              </span>
              <button className="w-8 h-4 bg-indigo-600 rounded-full relative">
                <span className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">
                Include JS
              </span>
              <button className="w-8 h-4 bg-indigo-600 rounded-full relative">
                <span className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">
                Minify Output
              </span>
              <button className="w-8 h-4 bg-slate-700 rounded-full relative">
                <span className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (state.editor) {
      initializeEditor();
      return setupResizeListener();
    }
  }, [state.editor]);

  const allDevices = [
    ...(state.editor?.DeviceManager?.getAll()?.models?.map((model: any) => ({
      id: model.id,
      name: model.get("name"),
      width: model.get("width"),
    })) || []),
    ...customDevices,
  ];

  return (
    <div className="h-screen bg-[#0F172A] text-white overflow-hidden flex flex-col">
      <TooltipProvider delayDuration={300}>
        {/* Top Toolbar */}
        {renderTopToolbar()}

        {/* Main Content Area with Sidebar */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Main Canvas */}
          <div
            className={`${
              showSidebar ? "w-[60%]" : "w-full"
            } transition-all duration-300 ease-in-out relative`}
          >
            {state.isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            )}
            <div id="gjs-editor" className="h-full w-full" ref={containerRef} />
          </div>

          {/* Right Sidebar - conditionally rendered */}
          {renderSidebar()}
        </div>

        {/* Bottom Toolbar */}
        {renderBottomToolbar()}
      </TooltipProvider>
    </div>
  );
}
