"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Monitor, Tablet, Smartphone } from "lucide-react"

interface DevicePreviewProps {
  currentDevice: string
  onChange: (device: string) => void
}

export function DevicePreview({ currentDevice, onChange }: DevicePreviewProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-0.5 border border-slate-700 rounded-md bg-slate-800">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentDevice === "desktop" ? "default" : "ghost"}
              size="icon"
              className="h-7 w-7 rounded-none rounded-l-md"
              onClick={() => onChange("desktop")}
            >
              <Monitor className="h-4 w-4" />
              <span className="sr-only">Desktop</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Desktop</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentDevice === "tablet" ? "default" : "ghost"}
              size="icon"
              className="h-7 w-7 rounded-none"
              onClick={() => onChange("tablet")}
            >
              <Tablet className="h-4 w-4" />
              <span className="sr-only">Tablet</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Tablet</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentDevice === "mobile" ? "default" : "ghost"}
              size="icon"
              className="h-7 w-7 rounded-none rounded-r-md"
              onClick={() => onChange("mobile")}
            >
              <Smartphone className="h-4 w-4" />
              <span className="sr-only">Mobile</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Mobile</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

