import type { EditorConfig, DeviceConfig, BlockConfig } from "../types/editor"

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
]

// Default blocks for the editor
export const defaultBlocks: BlockConfig[] = [
  {
    id: "section",
    label: "Section",
    category: "Basic",
    content: '<section class="section"><div class="container"></div></section>',
    attributes: { class: "gjs-block-section" },
  },
  {
    id: "text",
    label: "Text",
    category: "Basic",
    content: '<div data-gjs-type="text">Insert your text here</div>',
    attributes: { class: "gjs-block-text" },
  },
  {
    id: "image",
    label: "Image",
    category: "Media",
    content: { type: "image" },
    attributes: { class: "gjs-block-image" },
  },
  {
    id: "video",
    label: "Video",
    category: "Media",
    content: {
      type: "video",
      src: "https://www.youtube.com/embed/jNQXAC9IVRw",
      style: {
        height: "350px",
        width: "100%",
      },
    },
    attributes: { class: "gjs-block-video" },
  },
  {
    id: "link",
    label: "Link",
    category: "Basic",
    content: {
      type: "link",
      content: "Link",
      attributes: { href: "#" },
    },
    attributes: { class: "gjs-block-link" },
  },
]

// Create editor configuration
export function createEditorConfig(container: HTMLElement | string, options: Partial<EditorConfig> = {}): EditorConfig {
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
            { name: "Border Radius", property: "border-radius", type: "slider" },
          ],
        },
        {
          name: "Colors",
          open: false,
          properties: [
            { name: "Background Color", property: "background-color", type: "color" },
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
      styles: ["https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"],
    },
    ...options,
  }
}

