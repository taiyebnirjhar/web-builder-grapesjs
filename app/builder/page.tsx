"use client";

import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import GrapesJS editor to ensure it only loads on the client side
const GrapesJSEditor = dynamic(() => import("@/components/editor"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-screen bg-[#1E1E1E]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <span className="ml-2 text-lg text-white">Loading editor...</span>
    </div>
  ),
});

export default function Builder() {
  return <GrapesJSEditor />;
}
