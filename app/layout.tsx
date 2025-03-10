import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

// Update the metadata to reflect our premium web builder
export const metadata: Metadata = {
  title: "WebBuilder - Create stunning websites without code",
  description:
    "Build beautiful, responsive websites with our intuitive drag-and-drop builder. No coding required.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add GrapesJS styles */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        />
      </head>
      <body className={inter.className}>
        <main>{children}</main>

        <SonnerToaster />
      </body>
    </html>
  );
}

import "./globals.css";
