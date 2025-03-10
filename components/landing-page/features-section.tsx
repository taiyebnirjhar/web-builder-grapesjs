"use client";

import { motion } from "framer-motion";
import {
  Blocks,
  Code,
  Import,
  MousePointer,
  PaintBucket,
  Palette,
  Settings,
  LayoutTemplateIcon as Templates,
} from "lucide-react";

const features = [
  {
    icon: <Blocks className="h-6 w-6" />,
    title: "Premade Blocks",
    description:
      "Drag and drop ready-made blocks to quickly build sections of your website.",
  },
  {
    icon: <Templates className="h-6 w-6" />,
    title: "Premade Templates",
    description:
      "Start with professionally designed templates to jumpstart your website creation.",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Code Editor",
    description:
      "Add, remove, or update HTML, CSS, and JavaScript with our integrated code editor.",
  },
  {
    icon: <Import className="h-6 w-6" />,
    title: "Import HTML",
    description:
      "Import your existing HTML code and components to use in your new projects.",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Tailwind Support",
    description:
      "Build with Tailwind CSS classes for rapid styling and consistent design.",
  },
  {
    icon: <PaintBucket className="h-6 w-6" />,
    title: "Custom Styling",
    description:
      "Apply custom CSS styles to any element with our intuitive style editor.",
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Attribute Options",
    description:
      "Easily modify HTML attributes without diving into code for precise control.",
  },
  {
    icon: <MousePointer className="h-6 w-6" />,
    title: "Interactivity Options",
    description:
      "Add animations and interactive behaviors without writing complex JavaScript.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Powerful features for code-savvy creators
            </h2>
            <p className="mt-4 text-xl text-slate-600">
              Our builder combines the flexibility of code with the ease of
              drag-and-drop to give you complete control.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
