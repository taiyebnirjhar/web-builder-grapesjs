# Web-Builder-Grapesjs: Modern Drag-and-Drop Website Builder

Web-Builder-Grapesjs is a powerful, intuitive drag-and-drop website builder built with Next.js and GrapesJS. Create stunning, responsive websites without writing a single line of code.

## Features

- **Intuitive Drag-and-Drop Interface**: Build websites by simply dragging and dropping components onto the canvas
- **Rich Component Library**: Access a wide range of pre-built components including sections, text blocks, images, videos, maps, and more
- **Responsive Design Tools**: Preview and optimize your website for different devices (desktop, tablet, mobile)
- **Real-time Code Editor**: View and edit HTML, CSS, and JavaScript in real-time
- **Style Editor**: Easily customize typography, spacing, colors, and more
- **Template System**: Start with pre-built templates or save your own for future use
- **Export Options**: Export your website as HTML/CSS/JS files

## 🚀 Live Demo

Try the app: [web-builder-grapesjs](https://web-builder-grapesjs.vercel.app/)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/taiyebnirjhar/web-builder-grapesjs.git
   cd web-builder-grapesjs
   ``` 
2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Start the development server:

```shellscript
npm run dev
# or
yarn dev
```


4. Open your browser and navigate to `http://localhost:3000`


## Project Structure

```
webbuilder/
├── app/                  # Next.js app directory
│   ├── builder/          # Web builder page
│   ├── templates/        # Templates page
│   ├── about/            # About page
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── editor/           # Editor-specific components
│   ├── landing-page/     # Landing page components
│   └── ui/               # UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
│   ├── editor-config.ts  # GrapesJS configuration
│   ├── component-library.ts # Component library
│   └── plugin-manager.ts # Plugin manager
└── public/               # Static assets
```

## Block System

WebBuilder uses a block system to provide pre-built components that can be dragged onto the canvas. Blocks are defined in `utils/editor-config.ts` and include:

### Basic Blocks

- Section
- Text
- Link
- Link Block
- Quote
- Text Section
- Columns (1, 2, 3, and 2 Columns 3/7)


### Media Blocks

- Image
- Video
- Map (with Google Maps integration)


### Premium Blocks

Additional premium blocks are available in categories like:

- Navigation (Premium Navbar, Mega Menu)
- Heroes (Hero with Image, Gradient Hero)
- Features (Feature Cards, Features with Screenshots)
- CTA Sections (Centered CTA)


## Customizing Blocks

You can customize existing blocks or add new ones by modifying the `defaultBlocks` array in `utils/editor-config.ts`:

```typescript
export const defaultBlocks: BlockConfig[] = [
  {
    id: "custom-block",
    label: "My Custom Block",
    category: "Custom",
    content: '<div class="custom-block">Custom content here</div>',
    attributes: { class: "gjs-block-custom" },
  },
  // ... other blocks
];
```

## Configuration

The GrapesJS editor can be configured in `utils/editor-config.ts`. Key configuration options include:

- **Storage Manager**: Configure how projects are saved
- **Device Manager**: Define devices for responsive design
- **Style Manager**: Configure style editing options
- **Layer Manager**: Configure the layer panel
- **Panel Manager**: Configure editor panels


## Advanced Usage

### Adding Custom Plugins

You can add custom GrapesJS plugins by modifying the `hooks/use-editor.ts` file:

```typescript
const initEditor = async () => {
  // Import plugins
  const grapesjs = await import("grapesjs")
  const gjsPresetWebpage = await import("grapesjs-preset-webpage")
  const gjsBlocksBasic = await import("grapesjs-blocks-basic")
  const customPlugin = await import("./custom-plugin")

  // Initialize editor with plugins
  const config = createEditorConfig(containerEl, {
    plugins: [
      gjsPresetWebpage.default, 
      gjsBlocksBasic.default,
      customPlugin.default
    ],
    // ... other options
  })
  
  // ... rest of the code
}
```

### Custom Component Types

You can create custom component types by extending GrapesJS's component system. This allows for more complex and interactive components.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [GrapesJS](https://grapesjs.com/) - Open source Web Builder Framework
- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
