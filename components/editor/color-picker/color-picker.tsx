"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  className?: string
}

export function ColorPicker({ color, onChange, className = "" }: ColorPickerProps) {
  const [currentColor, setCurrentColor] = useState(color)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setCurrentColor(color)
  }, [color])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setCurrentColor(newColor)
    onChange(newColor)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`w-8 h-8 rounded border border-gray-700 cursor-pointer ${className}`}
          style={{ backgroundColor: currentColor }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="space-y-3">
          <div className="w-full h-24 rounded" style={{ backgroundColor: currentColor }} />
          <Input ref={inputRef} type="color" value={currentColor} onChange={handleChange} className="w-full h-10" />
          <Input value={currentColor} onChange={handleChange} className="w-full" />
        </div>
      </PopoverContent>
    </Popover>
  )
}

