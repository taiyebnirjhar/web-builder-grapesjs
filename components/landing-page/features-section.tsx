"use client"

import { motion } from "framer-motion"
import { Layers, Smartphone, Zap, Code, PaintBucket, MousePointer, Layout, FileCode } from "lucide-react"

const features = [
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Premium Components",
    description: "Access hundreds of pre-built, responsive components to jumpstart your website.",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Fully Responsive",
    description: "Every website you build looks perfect on any device, from desktop to mobile.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast",
    description: "Optimized for speed and performance, delivering a smooth experience for your visitors.",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Clean Code Export",
    description: "Export clean, optimized HTML, CSS, and JavaScript code for your website.",
  },
  {
    icon: <PaintBucket className="h-6 w-6" />,
    title: "Custom Styling",
    description: "Customize every aspect of your website with our intuitive style editor.",
  },
  {
    icon: <MousePointer className="h-6 w-6" />,
    title: "Interactive Elements",
    description: "Add animations and interactions without writing a single line of code.",
  },
  {
    icon: <Layout className="h-6 w-6" />,
    title: "Flexible Layouts",
    description: "Create complex layouts with our intuitive grid system and flexible containers.",
  },
  {
    icon: <FileCode className="h-6 w-6" />,
    title: "SEO Optimized",
    description: "Built-in SEO tools to help your website rank higher in search engine results.",
  },
]

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
              Everything you need to build amazing websites
            </h2>
            <p className="mt-4 text-xl text-slate-600">
              Our powerful features make it easy to create professional websites without any coding knowledge.
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
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

