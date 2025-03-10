"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

// Updated with the specific features provided
const features = [
  "Premium Components - Access hundreds of pre-built, responsive components to jumpstart your website.",
  "Fully Responsive - Every website you build looks perfect on any device, from desktop to mobile.",
  "Lightning Fast - Optimized for speed and performance, delivering a smooth experience for your visitors.",
  "Clean Code Export - Export clean, optimized HTML, CSS, and JavaScript code for your website.",
  "Custom Styling - Customize every aspect of your website with our intuitive style editor.",
  "Interactive Elements - Add animations and interactions without writing a single line of code.",
  "Flexible Layouts - Create complex layouts with our intuitive grid system and flexible containers.",
  "SEO Optimized - Built-in SEO tools to help your website rank higher in search engine results.",
];

export function PricingSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Now 100% Free, Forever
          </h2>
          <p className="mt-4 text-xl text-slate-600">
            We've made our platform completely free for everyone. No credit card
            required, no hidden fees.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-primary text-primary-foreground text-center text-sm font-medium py-2">
              <span className="text-lg">Free Forever</span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-slate-900">
                Everything Included
              </h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-bold text-slate-900">$0</span>
                <span className="text-slate-600 ml-2 text-xl">/forever</span>
              </div>
              <p className="mt-3 text-slate-600">
                Access all premium features with no limitations or restrictions
              </p>

              <ul className="mt-6 space-y-4">
                {features.map((feature, i) => {
                  const [title, description] = feature.split(" - ");
                  return (
                    <li key={i} className="flex">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-3 mt-1" />
                      <div>
                        <span className="font-medium text-slate-900">
                          {title}
                        </span>
                        <p className="text-slate-600 text-sm">{description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8">
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                >
                  <Link href="/builder">Get Started Now</Link>
                </Button>
              </div>
              <p className="text-center mt-4 text-sm text-slate-500">
                No credit card required. Sign up in seconds.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
