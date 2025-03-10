"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    content:
      "This web builder has completely transformed how we create landing pages. What used to take days now takes hours, and the results are even better.",
    author: "Sarah Johnson",
    role: "Marketing Director, TechCorp",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    content:
      "As a non-technical founder, this tool has been a game-changer. I can now create professional-looking websites for my business without hiring a developer.",
    author: "Michael Chen",
    role: "Founder, StartupX",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    content:
      "The templates are beautiful and the drag-and-drop interface is intuitive. I've tried many website builders, but this one is by far the best.",
    author: "Emily Rodriguez",
    role: "Designer, CreativeStudio",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Loved by thousands of creators</h2>
          <p className="mt-4 text-xl text-slate-600">
            Don't just take our word for it. Here's what our users have to say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-slate-900">{testimonial.author}</h4>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

