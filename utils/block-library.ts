import type { BlockConfig } from "@/types/editor";

// Default blocks for the editor with Tailwind CSS classes
export const defaultBlocks: BlockConfig[] = [
  // Basic blocks
  {
    id: "section",
    label: "Section",
    category: "Basic",
    content:
      '<section class="py-16 bg-gray-50"><div class="container mx-auto px-4 max-w-6xl">Section Content</div></section>',
    attributes: { class: "gjs-block-section" },
  },
  {
    id: "text",
    label: "Text",
    category: "Basic",
    content:
      '<div data-gjs-type="text" class="text-gray-700 text-base leading-relaxed">Insert your text here</div>',
    attributes: { class: "gjs-block-text" },
  },
  {
    id: "link",
    label: "Link",
    category: "Basic",
    content: {
      type: "link",
      content: "Link",
      attributes: {
        href: "#",
        class:
          "text-primary hover:text-primary/80 underline transition-colors duration-200",
      },
    },
    attributes: { class: "gjs-block-link" },
  },
  {
    id: "link-block",
    label: "Link Block",
    category: "Basic",
    content:
      '<a href="#" class="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200">Link block</a>',
    attributes: { class: "gjs-block-link-block" },
  },
  {
    id: "quote",
    label: "Quote",
    category: "Basic",
    content: `<blockquote class="p-6 my-6 border-l-4 border-primary bg-gray-50 italic">
      <p class="text-lg text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <footer class="text-sm text-gray-500 font-medium">— Author</footer>
    </blockquote>`,
    attributes: { class: "gjs-block-quote" },
  },
  {
    id: "text-section",
    label: "Text section",
    category: "Basic",
    content: `<div class="py-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Insert title here</h2>
      <p class="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>`,
    attributes: { class: "gjs-block-text-section" },
  },

  // Media blocks
  {
    id: "image",
    label: "Image",
    category: "Media",
    content: {
      type: "image",
      attributes: {
        class: "w-full h-auto rounded-lg shadow-md",
      },
    },
    attributes: { class: "gjs-block-image" },
  },
  {
    id: "video",
    label: "Video",
    category: "Media",
    content: {
      type: "video",
      src: "https://www.youtube.com/embed/jNQXAC9IVRw",
      attributes: {
        class: "w-full rounded-lg shadow-md aspect-video",
      },
    },
    attributes: { class: "gjs-block-video" },
  },

  // Column blocks
  {
    id: "column1",
    label: "1 Column",
    category: "Basic",
    content: `<div class="w-full" data-gjs-droppable=".cell" data-gjs-custom-name="Row">
      <div class="w-full p-4" data-gjs-draggable=".row" data-gjs-custom-name="Cell">
        <div class="p-6 bg-white rounded-lg shadow-sm border border-gray-200">1 Column</div>
      </div>
    </div>`,
    attributes: { class: "gjs-block-column1" },
  },
  {
    id: "column2",
    label: "2 Columns",
    category: "Basic",
    content: `<div class="flex flex-wrap -mx-4" data-gjs-droppable=".cell" data-gjs-custom-name="Row">
      <div class="w-full md:w-1/2 p-4" data-gjs-draggable=".row" data-gjs-custom-name="Cell">
        <div class="p-6 bg-white rounded-lg shadow-sm border border-gray-200">Cell 1</div>
      </div>
      <div class="w-full md:w-1/2 p-4" data-gjs-draggable=".row" data-gjs-custom-name="Cell">
        <div class="p-6 bg-white rounded-lg shadow-sm border border-gray-200">Cell 2</div>
      </div>
    </div>`,
    attributes: { class: "gjs-block-column2" },
  },
  {
    id: "column3",
    label: "3 Columns",
    category: "Basic",
    content: `<div class="flex flex-wrap -mx-4" data-gjs-droppable=".cell" data-gjs-custom-name="Row">
      <div class="w-full md:w-1/3 p-4" data-gjs-draggable=".row" data-gjs-custom-name="Cell">
        <div class="p-6 bg-white rounded-lg shadow-sm border border-gray-200">Cell 1</div>
      </div>
      <div class="w-full md:w-1/3 p-4" data-gjs-draggable=".row" data-gjs-custom-name="Cell">
        <div class="p-6 bg-white rounded-lg shadow-sm border border-gray-200">Cell 2</div>
      </div>
      <div class="w-full md:w-1/3 p-4" data-gjs-draggable=".row" data-gjs-custom-name="Cell">
        <div class="p-6 bg-white rounded-lg shadow-sm border border-gray-200">Cell 3</div>
      </div>
    </div>`,
    attributes: { class: "gjs-block-column3" },
  },
  {
    id: "column-3-7",
    label: "2 Columns 3/7",
    category: "Basic",
    content: `<div class="grid grid-cols-1 md:grid-cols-10 gap-8 w-full" data-gjs-droppable=".cell" data-gjs-custom-name="Row">
    <div class="md:col-span-3" data-gjs-draggable=".row" data-gjs-custom-name="Cell 30%">
      <div class="p-6 bg-white rounded-lg shadow-sm border border-gray-200">Cell 30%</div>
    </div>
    <div class="md:col-span-7" data-gjs-draggable=".row" data-gjs-custom-name="Cell 70%">
      <div class="p-6 bg-white rounded-lg shadow-sm border border-gray-200">Cell 70%</div>
    </div>
  </div>`,
    attributes: { class: "gjs-block-column-3-7" },
  },

  // Map block
  {
    id: "map",
    label: "Map",
    category: "Basic",
    content: `<div class="w-full h-96 rounded-lg overflow-hidden shadow-md border border-gray-200">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30594451354!2d-74.25986613799748!3d40.69714941774136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2s!4v1644332380705!5m2!1sen!2s"
        width="100%"
        height="100%"
        style="border:0"
        allowfullscreen=""
        loading="lazy"
        class="w-full h-full">
      </iframe>
    </div>`,
    attributes: { class: "gjs-block-map" },
  },
];
