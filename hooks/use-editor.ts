"use client";

import { useEffect, useRef, useState } from "react";
import type { EditorState, LayerItem } from "../types/editor";
import { createEditorConfig } from "../utils/editor-config";

// Improved type definition for GrapesJS editor
interface GrapesJSEditor {
  getHtml: () => string;
  getCss: () => string | undefined;
  getJs?: () => string;
  setJs?: (js: string) => void;
  setComponents: (components: string | object) => any;
  addComponents: (components: string | object) => any;
  setStyle: (style: string | object) => any;
  UndoManager: {
    undo: () => void;
    redo: () => void;
  };
  select: (component: any) => void;
  getSelected: () => any;
  refresh: () => void;
  setDevice: (device: string) => void;
  getDevice: () => string;
  Components: {
    getComponents: () => any[];
    getById: (id: string) => any;
    getWrapper: () => any;
  };
  BlockManager: {
    getAll: () => any;
  };
  DeviceManager: {
    getAll: () => any;
    get: (id: string) => any;
    add: (device: any) => void;
    remove: (id: string) => void;
  };
  Modal: {
    open: (options: any) => void;
    close: () => void;
  };
  StorageManager: {
    store: (data: Record<string, any>) => void;
    get: (key: string) => any;
  };
  on: (event: string, callback: Function) => void;
  destroy: () => void;
}

// Update your EditorState interface in types/editor.ts to include editorJs
// If you can't modify that file directly, you can extend it here:
interface ExtendedEditorState extends EditorState {
  editorJs?: string;
}

export function useEditor(containerId: string) {
  const editorRef = useRef<GrapesJSEditor | null>(null);
  const [state, setState] = useState<ExtendedEditorState>({
    editor: null,
    selectedElement: null,
    currentDevice: "desktop",
    isLoading: true,
    blocks: [],
    layers: [],
    editorJs: "", // Add JavaScript content to state
    styles: {
      typography: {
        fontFamily: "Inter",
        fontSize: "16px",
        fontWeight: "normal",
        color: "#000000",
        textAlign: "left",
      },
      spacing: {
        borderRadius: 0,
        padding: "0px",
        margin: "0px",
      },
      colors: {
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E7EB",
        borderWidth: "0px",
        borderStyle: "solid",
      },
    },
  });

  useEffect(() => {
    const initEditor = async () => {
      try {
        // Dynamically import GrapesJS
        const grapesjs = await import("grapesjs");
        const gjsPresetWebpage = await import("grapesjs-preset-webpage");
        const gjsBlocksBasic = await import("grapesjs-blocks-basic");
        const gjsScriptEditor = await import("grapesjs-script-editor");

        // Wait for the container element to be available
        let containerEl = document.getElementById(containerId);

        // If container doesn't exist yet, wait a bit and try again
        if (!containerEl) {
          console.log(
            `Container element with id "${containerId}" not found, waiting...`
          );
          await new Promise((resolve) => setTimeout(resolve, 500));
          containerEl = document.getElementById(containerId);
        }

        if (!containerEl) {
          console.error(
            `Container element with id "${containerId}" not found after waiting`
          );
          setState((prev) => ({ ...prev, isLoading: false }));
          return;
        }

        // Initialize editor with configuration
        // const config = createEditorConfig(containerEl, {
        //   plugins: [
        //     gjsPresetWebpage.default,
        //     gjsBlocksBasic.default,
        //     gjsScriptEditor.default,
        //   ],
        //   pluginsOpts: {
        //     [String(gjsPresetWebpage.default)]: {
        //       blocksBasicOpts: {
        //         blocks: [
        //           "column1",
        //           "column2",
        //           "column3",
        //           "column3-7",
        //           "text",
        //           "link",
        //           "image",
        //           "video",
        //         ],
        //         flexGrid: true,
        //       },
        //       exportOpts: {},
        //       aviaryOpts: false,
        //       filestackOpts: false,
        //     },
        //     [String(gjsScriptEditor.default)]: {
        //       // Script editor options if needed
        //     },
        //   },
        // });
        const config = {
          ...createEditorConfig(containerEl, {}),
          plugins: [
            gjsPresetWebpage.default,
            gjsBlocksBasic.default,
            gjsScriptEditor.default,
          ],
          pluginsOpts: {
            [String(gjsPresetWebpage.default)]: {
              blocksBasicOpts: {
                blocks: [
                  "column1",
                  "column2",
                  "column3",
                  "column3-7",
                  "text",
                  "link",
                  "image",
                  "video",
                ],
                flexGrid: true,
              },
              exportOpts: {},
              aviaryOpts: false,
              filestackOpts: false,
            },
            [String(gjsScriptEditor.default)]: {
              // Script editor options if needed
            },
          },
        } as any;

        const editor = grapesjs.default.init(config);
        editorRef.current = editor as any;

        // Add fallback methods if needed
        if (typeof editor?.setJs !== "function") {
          console.log("Adding custom setJs method");
          editor.setJs = (js: string) => {
            // Store JS in editor's storage
            editor.StorageManager.store({
              jsCode: js,
            });

            // Find or create script component
            let scriptComponent = editor.Components.getWrapper()?.find(
              'script[data-gjs-type="custom-script"]'
            )[0];

            if (!scriptComponent) {
              // Create a new script component if it doesn't exist
              const addedComponents = editor.Components.addComponent({
                tagName: "script",
                attributes: { "data-gjs-type": "custom-script" },
                content: js,
                removable: false,
                draggable: false,
                droppable: false,
                copyable: false,
                // Hide from the structure panel
                layerable: false,
              });
              scriptComponent = Array.isArray(addedComponents)
                ? addedComponents[0]
                : addedComponents;
            } else {
              // Update existing script
              scriptComponent.set("content", js);
            }
          };
        }

        if (typeof editor.getJs !== "function") {
          console.log("Adding custom getJs method");
          editor.getJs = () => {
            // Try to get from storage first
            const stored = editor.StorageManager.get("jsCode");
            if (stored) return stored;

            // Otherwise try to find script component
            const scriptComponent = editor.Components.getWrapper()?.find(
              'script[data-gjs-type="custom-script"]'
            )[0];
            return scriptComponent ? scriptComponent.get("content") : "";
          };
        }

        // Set up event listeners
        setupEventListeners(editor as unknown as GrapesJSEditor);

        // Update state
        setState((prev) => ({
          ...prev,
          editor,
          isLoading: false,
        }));

        return () => {
          editor.destroy();
        };
      } catch (error) {
        console.error("Error initializing GrapesJS:", error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initEditor();
  }, [containerId]);

  const setupEventListeners = (editor: GrapesJSEditor) => {
    // Component selection
    editor.on("component:selected", (component: any) => {
      setState((prev) => ({
        ...prev,
        selectedElement: component,
      }));
      updateStylesFromComponent(component);

      // Initialize interactions if not already present
      if (!component.get("interactions")) {
        component.set("interactions", []);
      }
    });

    editor.on("component:update", (component: any) => {
      if (
        state.selectedElement &&
        component &&
        component.cid === state.selectedElement.cid
      ) {
        // Update styles when the currently selected component is updated
        updateStylesFromComponent(component);
      }
    });

    editor.on("component:deselected", () => {
      setState((prev) => ({
        ...prev,
        selectedElement: null,
      }));
    });

    // Device change
    editor.on("change:device", () => {
      setState((prev) => ({
        ...prev,
        currentDevice: editor.getDevice(),
      }));
    });

    // Script-related events
    editor.on("script:update", () => {
      if (editor.getJs) {
        const js = editor.getJs();
        setState((prev) => ({
          ...prev,
          editorJs: js,
        }));
      }
    });

    editor.on("script:add", () => {
      if (editor.getJs) {
        const js = editor.getJs();
        setState((prev) => ({
          ...prev,
          editorJs: js,
        }));
      }
    });

    editor.on("script:remove", () => {
      setState((prev) => ({
        ...prev,
        editorJs: "",
      }));
    });

    // Load event
    editor.on("load", () => {
      try {
        // Get blocks
        const blockManager = editor.BlockManager;
        const blockList = blockManager.getAll().models.map((block: any) => {
          // Extract category properly
          let category = "Basic";
          try {
            const blockCategory = block.attributes.category;
            if (typeof blockCategory === "string") {
              category = blockCategory;
            } else if (blockCategory && typeof blockCategory === "object") {
              // Try to get the label or name property
              category =
                blockCategory.label ||
                blockCategory.name ||
                blockCategory.id ||
                "Basic";
            }
          } catch (error) {
            console.error("Error processing block category:", error);
          }

          return {
            id: block.id,
            label: block.attributes.label,
            category: category,
            content: block.attributes.content,
          };
        });

        // Get initial JavaScript content if available
        let initialJs = "";
        if (editor.getJs) {
          try {
            initialJs = editor.getJs();
          } catch (e) {
            console.warn("Error getting initial JavaScript:", e);
          }
        }

        setState((prev) => ({
          ...prev,
          blocks: blockList,
          editorJs: initialJs,
        }));

        updateLayers(editor);
      } catch (error) {
        console.error("Error in load event:", error);
      }
    });

    // Component changes
    editor.on("component:update", () => updateLayers(editor));
    editor.on("component:add", () => updateLayers(editor));
    editor.on("component:remove", () => updateLayers(editor));
  };

  const updateLayers = (editor: GrapesJSEditor) => {
    if (!editor || !editor.Components) {
      return;
    }

    try {
      const components = editor.Components.getComponents();
      const layerItems = mapComponentsToLayers(components);

      setState((prev) => ({
        ...prev,
        layers: layerItems,
      }));
    } catch (error) {
      console.error("Error updating layers:", error);
      setState((prev) => ({
        ...prev,
        layers: [],
      }));
    }
  };

  const mapComponentsToLayers = (
    components: any[] | undefined,
    level = 0
  ): LayerItem[] => {
    // Return empty array if components is undefined or not an array
    if (!components || !Array.isArray(components)) {
      return [];
    }

    return components.map((component) => {
      // Make sure component exists
      if (!component) {
        return {
          id: `unknown-${Math.random().toString(36).substr(2, 9)}`,
          name: "Unknown",
          level,
          children: [],
        };
      }

      // Safely get children components
      let children = [];
      try {
        const componentsMethod =
          component.components || component.get?.("components");
        if (typeof componentsMethod === "function") {
          children = componentsMethod.call(component);
        }
      } catch (error) {
        console.error("Error getting child components:", error);
      }

      return {
        id: component.cid || `comp-${Math.random().toString(36).substr(2, 9)}`,
        name:
          component.getName?.() || component.get?.("tagName") || "Component",
        level,
        children:
          children && children.length
            ? mapComponentsToLayers(children, level + 1)
            : [],
      };
    });
  };

  const updateStylesFromComponent = (component: any) => {
    if (!component) return;

    try {
      const style = component.getStyle() || {};

      // Parse text-shadow if it exists
      let textShadowX = "0px";
      let textShadowY = "0px";
      let textShadowBlur = "0px";
      let textShadowColor = "rgba(0,0,0,0.5)";

      if (style["text-shadow"]) {
        try {
          // Handle both space-separated and comma-separated formats
          let textShadowParts = style["text-shadow"].includes(",")
            ? style["text-shadow"].split(",")[0].trim().split(" ")
            : style["text-shadow"].split(" ");

          // Filter out empty parts that might come from extra spaces
          textShadowParts = textShadowParts.filter(
            (part: string) => part.trim() !== ""
          );

          if (textShadowParts.length >= 3) {
            // First two parts are always X and Y offsets
            textShadowX = textShadowParts[0];
            textShadowY = textShadowParts[1];

            // For the blur and color, we need to determine which is which
            // If the third part starts with a number or has 'px', it's the blur
            if (/^-?\d|px/.test(textShadowParts[2])) {
              textShadowBlur = textShadowParts[2];
              // The rest is the color
              if (textShadowParts.length > 3) {
                textShadowColor = textShadowParts.slice(3).join(" ");
              }
            } else {
              // If the third part doesn't look like a size, it's probably the color
              textShadowBlur = "0px";
              textShadowColor = textShadowParts.slice(2).join(" ");
            }
          }
        } catch (e) {
          console.error("Error parsing text-shadow:", e);
          // Provide fallback values if parsing fails
          textShadowX = "0px";
          textShadowY = "0px";
          textShadowBlur = "0px";
          textShadowColor = "rgba(0,0,0,0.5)";
        }
      }

      // Parse border-radius to extract the numeric value
      let borderRadius = 0;
      if (style["border-radius"]) {
        try {
          const radiusValue = style["border-radius"]
            .replace("rem", "")
            .replace("px", "")
            .replace("em", "");
          borderRadius = Number.parseFloat(radiusValue) || 0;
        } catch (e) {
          console.error("Error parsing border-radius:", e);
        }
      }

      // Ensure color values have proper defaults and formats
      // Get computed styles for more accurate values if browser environment
      const backgroundColor = style["background-color"] || "#FFFFFF";
      const borderColor = style["border-color"] || "#E5E7EB";
      const borderWidth =
        style["border-width"] || style["border"]
          ? style["border"].split(" ")[0]
          : "0px";
      const borderStyle =
        style["border-style"] ||
        (style["border"] ? style["border"].split(" ")[1] : "solid");

      // Get current state to ensure we only update what's changed
      setState((prev) => {
        // Only update the states that have changed to prevent unnecessary re-renders
        const newStyles = {
          typography: {
            fontFamily:
              style["font-family"] ||
              prev.styles.typography.fontFamily ||
              "Arial, sans-serif",
            fontSize:
              style["font-size"] || prev.styles.typography.fontSize || "16px",
            fontWeight:
              style["font-weight"] ||
              prev.styles.typography.fontWeight ||
              "normal",
            fontStyle:
              style["font-style"] ||
              prev.styles.typography.fontStyle ||
              "normal",
            color: style["color"] || prev.styles.typography.color || "#000000",
            textAlign:
              style["text-align"] || prev.styles.typography.textAlign || "left",
            lineHeight:
              style["line-height"] ||
              prev.styles.typography.lineHeight ||
              "1.5",
            letterSpacing:
              style["letter-spacing"] ||
              prev.styles.typography.letterSpacing ||
              "0px",
            textDecoration:
              style["text-decoration"] ||
              prev.styles.typography.textDecoration ||
              "none",
            textTransform:
              style["text-transform"] ||
              prev.styles.typography.textTransform ||
              "none",
            textShadowX,
            textShadowY,
            textShadowBlur,
            textShadowColor,
          },
          spacing: {
            borderRadius,
            padding: style["padding"] || prev.styles.spacing.padding || "0px",
            margin: style["margin"] || prev.styles.spacing.margin || "0px",
          },
          colors: {
            backgroundColor,
            borderColor,
            borderWidth,
            borderStyle,
          },
        };

        return {
          ...prev,
          styles: newStyles,
        };
      });
    } catch (error) {
      console.error("Error updating styles from component:", error);
    }
  };

  // Editor actions
  const actions = {
    setDevice: (device: string) => {
      if (editorRef.current) {
        editorRef.current.setDevice(device);
        setState((prev) => ({ ...prev, currentDevice: device }));
      }
    },

    undo: () => {
      if (editorRef.current) {
        editorRef.current.UndoManager.undo();
      }
    },

    redo: () => {
      if (editorRef.current) {
        editorRef.current.UndoManager.redo();
      }
    },
    clearCanvas: () => {
      if (editorRef.current) {
        editorRef.current.setComponents("");
        editorRef.current.setStyle("");
        setState((prev) => ({
          ...prev,
          editorJs: "",
          selectedElement: null,
        }));
      }
    },

    // Add updateJs action
    updateJs: (js: string) => {
      try {
        if (
          editorRef.current &&
          typeof editorRef.current.setJs === "function"
        ) {
          editorRef.current.setJs(js);

          setState((prev) => ({
            ...prev,
            editorJs: js,
          }));
        } else {
          console.warn("setJs method not available on editor");
        }
      } catch (error) {
        console.error("Error updating JavaScript:", error);
      }
    },

    exportHtml: () => {
      if (editorRef.current) {
        const html = editorRef.current.getHtml();
        const css = editorRef.current.getCss();

        // Get JavaScript with better error handling
        let js = "";
        try {
          if (typeof editorRef.current.getJs === "function") {
            js = editorRef.current.getJs();
          }
        } catch (error) {
          console.warn("Error getting JavaScript:", error);
        }

        // Generate initialization code for animations
        const initCode = `
          // Initialize elements with animations
          document.addEventListener('DOMContentLoaded', function() {
            // Hide elements that should be initially hidden
            document.querySelectorAll('[data-initial-state="hidden"]').forEach(function(el) {
              el.style.display = 'none';
              el.style.opacity = '0';
            });

            // Setup scroll event listeners
            const scrollElements = document.querySelectorAll('[data-scroll-action]');
            if (scrollElements.length > 0) {
              window.addEventListener('scroll', function() {
                scrollElements.forEach(function(el) {
                  const rect = el.getBoundingClientRect();
                  const offset = parseFloat(el.getAttribute('data-scroll-offset') || '0');
                  const isVisible = rect.top + offset <= window.innerHeight && rect.bottom >= 0;

                  if (isVisible && !el.classList.contains('scroll-triggered')) {
                    el.classList.add('scroll-triggered');
                    const action = el.getAttribute('data-scroll-action');
                    if (action === 'show') {
                      el.style.display = 'block';
                      setTimeout(function() { el.style.opacity = '1'; }, 10);
                    } else if (action === 'add-class') {
                      const className = el.getAttribute('data-scroll-class');
                      if (className) el.classList.add(className);
                    }
                  }
                });
              }, { passive: true });
            }
          });
        `;

        // Create a full HTML document with proper script separation
        const fullHtml = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Exported Landing Page</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>${css}</style>
          </head>
          <body>
            ${html}
            ${js ? `<script>${js}</script>` : ""}
            <script>${initCode}</script>
          </body>
          </html>
        `;

        return fullHtml;
      }
      return "";
    },

    downloadHtml: () => {
      const fullHtml = actions.exportHtml();
      if (fullHtml) {
        // Create a download link
        const blob = new Blob([fullHtml], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "landing-page.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    },

    addComponent: (content: any) => {
      if (!editorRef.current) return;

      try {
        // Enhanced handling for different content types
        if (typeof content === "string") {
          // For HTML strings - this is the most common case for blocks
          // Simply add the HTML string directly to the editor
          editorRef.current.addComponents(content);
        }
        // Handle object content (like for image components)
        else if (typeof content === "object") {
          // If content has a specific GrapesJS component type
          if (content.type) {
            editorRef.current.addComponents({
              type: content.type,
              ...content,
            });
          }
          // Try to convert object to component
          else {
            editorRef.current.addComponents(content);
          }
        }
        // Fallback for any other type
        else {
          console.warn("Unrecognized content format", content);
          editorRef.current.addComponents(
            `<div>Error: Invalid content format</div>`
          );
        }
      } catch (error) {
        console.error("Error adding component:", error);
        // Try with a safer fallback
        try {
          editorRef.current.addComponents(
            "<div>Component could not be added</div>"
          );
        } catch (fallbackError) {
          console.error("Fallback error:", fallbackError);
        }
      }
    },

    importCode: (code: string, append = false) => {
      if (editorRef.current) {
        if (append) {
          editorRef.current.addComponents(code);
        } else {
          editorRef.current.setComponents(code);
        }
      }
    },

    updateStyle: (property: string, value: string) => {
      try {
        if (state.selectedElement) {
          // Create a new style object with the updated property
          const style = { [property]: value };

          // Apply the style to the element
          state.selectedElement.setStyle(style);

          // Update local state based on property type
          setState((prev) => {
            const newStyles = { ...prev.styles };

            // Handle typography properties
            if (property === "font-family") {
              newStyles.typography = {
                ...newStyles.typography,
                fontFamily: value,
              };
            } else if (property === "font-size") {
              newStyles.typography = {
                ...newStyles.typography,
                fontSize: value,
              };
            } else if (property === "font-weight") {
              newStyles.typography = {
                ...newStyles.typography,
                fontWeight: value,
              };
            } else if (property === "font-style") {
              newStyles.typography = {
                ...newStyles.typography,
                fontStyle: value,
              };
            } else if (property === "color") {
              newStyles.typography = {
                ...newStyles.typography,
                color: value,
              };
            } else if (property === "text-align") {
              newStyles.typography = {
                ...newStyles.typography,
                textAlign: value,
              };
            } else if (property === "line-height") {
              // Ensure line-height is properly formatted
              let formattedValue = value;

              // If it's just a number without units, keep it as is (unitless line-height)
              // If it has units or is a complex value, use it directly
              if (
                !isNaN(Number.parseFloat(value)) &&
                isFinite(Number(value)) &&
                !value.match(/[a-z%]/i)
              ) {
                formattedValue = value; // Keep unitless values as is
              } else if (
                !value.match(/px|em|rem|%/i) &&
                !isNaN(Number.parseFloat(value))
              ) {
                // If it's a number-like string without units, keep it unitless
                formattedValue = Number.parseFloat(value).toString();
              }

              newStyles.typography = {
                ...newStyles.typography,
                lineHeight: formattedValue,
              };
            } else if (property === "letter-spacing") {
              newStyles.typography = {
                ...newStyles.typography,
                letterSpacing: value,
              };
            } else if (property === "text-decoration") {
              newStyles.typography = {
                ...newStyles.typography,
                textDecoration: value,
              };
            } else if (property === "text-transform") {
              newStyles.typography = {
                ...newStyles.typography,
                textTransform: value,
              };
            } else if (property === "text-shadow") {
              // Parse text-shadow value to update all shadow properties
              const textShadowParts = value.split(" ");
              if (textShadowParts.length >= 3) {
                const textShadowX = textShadowParts[0];
                const textShadowY = textShadowParts[1];
                const textShadowBlur = textShadowParts[2];

                // The color could be in different formats
                let textShadowColor = "rgba(0,0,0,0.5)";
                if (textShadowParts.length === 4) {
                  textShadowColor = textShadowParts[3];
                } else if (textShadowParts.length > 4) {
                  textShadowColor = textShadowParts.slice(3).join(" ");
                }

                newStyles.typography = {
                  ...newStyles.typography,
                  textShadowX,
                  textShadowY,
                  textShadowBlur,
                  textShadowColor,
                };
              }
            }
            // Handle spacing properties
            else if (property === "padding") {
              newStyles.spacing = {
                ...newStyles.spacing,
                padding: value,
              };
            } else if (property === "margin") {
              newStyles.spacing = {
                ...newStyles.spacing,
                margin: value,
              };
            } else if (property === "border-radius") {
              // Extract numeric value from border-radius
              const radiusValue = value
                .replace("rem", "")
                .replace("px", "")
                .replace("em", "");
              const borderRadius = Number.parseFloat(radiusValue) || 0;

              newStyles.spacing = {
                ...newStyles.spacing,
                borderRadius: borderRadius,
              };
            }
            // Handle color properties
            else if (property === "background-color") {
              newStyles.colors = {
                ...newStyles.colors,
                backgroundColor: value,
              };
            } else if (property === "border-color") {
              newStyles.colors = {
                ...newStyles.colors,
                borderColor: value,
              };
            } else if (property === "border-width") {
              newStyles.colors = {
                ...newStyles.colors,
                borderWidth: value,
              };
            } else if (property === "border-style") {
              newStyles.colors = {
                ...newStyles.colors,
                borderStyle: value,
              };
            }

            return {
              ...prev,
              styles: newStyles,
            };
          });

          // Trigger editor refresh to update the view
          if (editorRef.current) {
            try {
              // Use a timeout to ensure the state is updated first
              setTimeout(() => {
                editorRef.current?.refresh();
                // Reselect the component to ensure it's still selected
                if (state.selectedElement) {
                  editorRef.current?.select(state.selectedElement);
                }
              }, 10);
            } catch (e) {
              console.error("Error refreshing editor:", e);
            }
          }
        }
      } catch (error) {
        console.error("Error updating style:", error);
      }
    },

    updateAttribute: (name: string, value: string) => {
      if (state.selectedElement) {
        // If value is empty, remove the attribute
        if (value === "") {
          state.selectedElement.removeAttributes(name);
        } else {
          state.selectedElement.addAttributes({ [name]: value });
        }
      }
    },

    selectComponent: (componentId: string) => {
      if (editorRef.current) {
        const component = editorRef.current.Components.getById(componentId);
        if (component) {
          editorRef.current.select(component);
        }
      }
    },

    updateInteractivity: (
      type: string,
      event: string,
      action: string,
      target?: string,
      options?: any
    ) => {
      if (state.selectedElement) {
        // Get current interactions or initialize empty array
        const interactions = state.selectedElement.get("interactions") || [];

        // Generate JavaScript code for the interaction
        let jsCode = "";

        // Target element (this element if no target specified)
        const targetSelector = target || "this";

        // Generate different code based on action type
        switch (action) {
          case "toggle-class":
            jsCode = `document.querySelector('${targetSelector}').classList.toggle('${
              options?.class || "active"
            }');`;
            break;
          case "add-class":
            jsCode = `document.querySelector('${targetSelector}').classList.add('${
              options?.class || "active"
            }');`;
            break;
          case "remove-class":
            jsCode = `document.querySelector('${targetSelector}').classList.remove('${
              options?.class || "active"
            }');`;
            break;
          case "show":
            if (options?.animation === "none") {
              jsCode = `document.querySelector('${targetSelector}').style.display = 'block';`;
            } else {
              jsCode = `
            const el = document.querySelector('${targetSelector}');
            el.style.transition = 'all ${options?.duration || 300}ms ${
                options?.easing || "ease"
              }';
            el.style.display = 'block';
            setTimeout(() => {
              el.style.opacity = '1';
              ${
                options?.animation === "scale"
                  ? "el.style.transform = 'scale(1)';"
                  : ""
              }
            }, 10);
          `;
            }
            break;
          case "hide":
            if (options?.animation === "none") {
              jsCode = `document.querySelector('${targetSelector}').style.display = 'none';`;
            } else {
              jsCode = `
            const el = document.querySelector('${targetSelector}');
            el.style.transition = 'all ${options?.duration || 300}ms ${
                options?.easing || "ease"
              }';
            el.style.opacity = '0';
            ${
              options?.animation === "scale"
                ? "el.style.transform = 'scale(0.8)';"
                : ""
            }
            setTimeout(() => { el.style.display = 'none'; }, ${
              options?.duration || 300
            });
          `;
            }
            break;
          case "toggle":
            jsCode = `
          const el = document.querySelector('${targetSelector}');
          if (el.style.display === 'none' || getComputedStyle(el).display === 'none') {
            ${
              options?.animation === "none"
                ? "el.style.display = 'block';"
                : `
              el.style.transition = 'all ${options?.duration || 300}ms ${
                    options?.easing || "ease"
                  }';
              el.style.display = 'block';
              setTimeout(() => {
                el.style.opacity = '1';
                ${
                  options?.animation === "scale"
                    ? "el.style.transform = 'scale(1)';"
                    : ""
                }
              }, 10);
              `
            }
          } else {
            ${
              options?.animation === "none"
                ? "el.style.display = 'none';"
                : `
              el.style.transition = 'all ${options?.duration || 300}ms ${
                    options?.easing || "ease"
                  }';
              el.style.opacity = '0';
              ${
                options?.animation === "scale"
                  ? "el.style.transform = 'scale(0.8)';"
                  : ""
              }
              setTimeout(() => { el.style.display = 'none'; }, ${
                options?.duration || 300
              });
              `
            }
          }
        `;
            break;
          case "scroll-to":
            jsCode = `
          const targetEl = document.querySelector('${targetSelector}');
          if (targetEl) {
            const yOffset = ${options?.offset || 0};
            const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
          }
        `;
            break;
          case "redirect":
            jsCode = options?.newTab
              ? `window.open('${options?.url || "#"}', '_blank');`
              : `window.location.href = '${options?.url || "#"}';`;
            break;
        }

        // Add event listener based on the event type
        if (type === "add") {
          // Add the event listener to the element
          const eventHandler = `function(event) { ${jsCode} }`;

          // Store the event handler in the element's attributes
          const eventAttr = `on${event}`;
          state.selectedElement.addAttributes({ [eventAttr]: eventHandler });

          // For hover, we need to handle mouseenter/mouseleave
          if (event === "hover") {
            const mouseEnterHandler = `function(event) { ${jsCode} }`;
            const mouseLeaveHandler = `function(event) {
              // Reverse the action for mouseleave if needed
              ${
                action === "add-class"
                  ? `document.querySelector('${targetSelector}').classList.remove('${
                      options?.class || "active"
                    }');`
                  : action === "show"
                  ? `document.querySelector('${targetSelector}').style.display = 'none';`
                  : ""
              }
            }`;

            state.selectedElement.addAttributes({
              onmouseenter: mouseEnterHandler,
              onmouseleave: mouseLeaveHandler,
            });
          }
        } else if (type === "remove") {
          // Remove the event listener from the element
          const eventAttr = `on${event}`;
          state.selectedElement.removeAttributes(eventAttr);

          // For hover, remove both mouseenter and mouseleave
          if (event === "hover") {
            state.selectedElement.removeAttributes("onmouseenter");
            state.selectedElement.removeAttributes("onmouseleave");
          }
        }

        // Update the editor to reflect changes
        if (editorRef.current) {
          editorRef.current.refresh();
        }
      }
    },
  };

  return {
    state,
    actions,
  };
}
