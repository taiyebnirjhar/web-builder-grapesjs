import { BlockConfig } from "@/types/editor";
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
];
