import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// Update the metadata to reflect our premium web builder
export const metadata: Metadata = {
  title: "WebBuilder - Create stunning websites without code",
  description: "Build beautiful, responsive websites with our intuitive drag-and-drop builder. No coding required.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add GrapesJS styles */}
        <link rel="stylesheet" href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'