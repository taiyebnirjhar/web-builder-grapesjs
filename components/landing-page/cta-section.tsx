"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-24 bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to build your next website?</h2>
          <p className="mt-4 text-xl text-indigo-100">
            Join thousands of creators and businesses building amazing websites with our platform.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="text-base px-8 py-6 bg-white text-indigo-600 hover:bg-indigo-50">
              <Link href="/builder">Start Building Now</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

