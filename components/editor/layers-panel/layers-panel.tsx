"use client"

import { ChevronDown, ChevronRight } from "lucide-react"
import type { LayerItem } from "@/types/editor"
import { useState } from "react"

interface LayersPanelProps {
  layers: LayerItem[]
  onSelectLayer: (id: string) => void
}

export function LayersPanel({ layers, onSelectLayer }: LayersPanelProps) {
  const [expandedLayers, setExpandedLayers] = useState<Record<string, boolean>>({})

  const toggleLayer = (layerId: string) => {
    setExpandedLayers((prev) => ({
      ...prev,
      [layerId]: !prev[layerId],
    }))
  }

  const renderLayer = (layer: LayerItem) => {
    const isExpanded = expandedLayers[layer.id] || false
    const hasChildren = layer.children && layer.children.length > 0

    return (
      <div key={layer.id}>
        <div
          className="flex items-center py-1 px-2 hover:bg-slate-800 rounded cursor-pointer"
          style={{ paddingLeft: `${layer.level * 10 + 4}px` }}
        >
          {hasChildren && (
            <div
              className="mr-1 text-slate-400 hover:text-slate-200"
              onClick={(e) => {
                e.stopPropagation()
                toggleLayer(layer.id)
              }}
            >
              {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </div>
          )}
          {!hasChildren && <div className="w-3 mr-1"></div>}
          <div className="flex-1 text-xs truncate" onClick={() => onSelectLayer(layer.id)}>
            {layer.name}
          </div>
        </div>
        {isExpanded && hasChildren && layer.children.map(renderLayer)}
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {layers.length === 0 ? (
        <div className="text-xs text-slate-400 text-center py-4">No layers available</div>
      ) : (
        layers.map(renderLayer)
      )}
    </div>
  )
}

