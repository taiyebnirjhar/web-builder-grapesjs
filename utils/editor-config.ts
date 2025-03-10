import type { DeviceConfig, EditorConfig } from "../types/editor";
import { defaultBlocks } from "./block-library";

// Default devices for responsive design
export const defaultDevices: DeviceConfig[] = [
  {
    id: "desktop",
    name: "Desktop",
    width: "",
  },
  {
    id: "tablet",
    name: "Tablet",
    width: "768px",
    widthMedia: "992px",
  },
  {
    id: "mobile",
    name: "Mobile",
    width: "320px",
    widthMedia: "480px",
  },
];

// Create editor configuration
export function createEditorConfig(
  container: HTMLElement | string,
  options: Partial<EditorConfig> = {}
): EditorConfig {
  return {
    container,
    height: "100%",
    width: "100%",
    fromElement: false,
    storageManager: {
      type: "local",
      autosave: true,
      autoload: true,
      stepsBeforeSave: 1,
      id: "gjs-",
    },
    deviceManager: {
      devices: defaultDevices,
    },
    blockManager: {
      blocks: defaultBlocks,
    },
    layerManager: {
      appendTo: "#layers-container",
    },
    styleManager: {
      sectors: [
        {
          name: "Typography",
          open: false,
          properties: [
            { name: "Font Family", property: "font-family", type: "select" },
            { name: "Font Size", property: "font-size", type: "slider" },
            { name: "Font Weight", property: "font-weight", type: "select" },
            { name: "Color", property: "color", type: "color" },
            { name: "Text Align", property: "text-align", type: "radio" },
          ],
        },
        {
          name: "Spacing",
          open: false,
          properties: [
            { name: "Padding", property: "padding", type: "composite" },
            { name: "Margin", property: "margin", type: "composite" },
            {
              name: "Border Radius",
              property: "border-radius",
              type: "slider",
            },
          ],
        },
        {
          name: "Colors",
          open: false,
          properties: [
            {
              name: "Background Color",
              property: "background-color",
              type: "color",
            },
            { name: "Border Color", property: "border-color", type: "color" },
            { name: "Border Width", property: "border-width", type: "slider" },
            { name: "Border Style", property: "border-style", type: "select" },
          ],
        },
      ],
      appendTo: "#styles-container",
    },
    panels: { defaults: [] },
    canvas: {
      styles: [
        "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
      ],
    },
    ...options,
  };
}
