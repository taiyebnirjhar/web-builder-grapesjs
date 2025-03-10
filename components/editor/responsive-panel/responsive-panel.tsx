"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { DeviceConfig } from "@/types/editor"
import { Monitor, Tablet, Smartphone, Plus, Trash2, Save } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ResponsivePanelProps {
  devices: DeviceConfig[]
  currentDevice: string
  onDeviceChange: (deviceId: string) => void
  onAddDevice: (device: DeviceConfig) => void
  onRemoveDevice: (deviceId: string) => void
  onUpdateDevice: (deviceId: string, updates: Partial<DeviceConfig>) => void
}

export function ResponsivePanel({
  devices,
  currentDevice,
  onDeviceChange,
  onAddDevice,
  onRemoveDevice,
  onUpdateDevice,
}: ResponsivePanelProps) {
  const [customWidth, setCustomWidth] = useState<number>(375)
  const [newDevice, setNewDevice] = useState<DeviceConfig>({
    id: "",
    name: "",
    width: "",
  })
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false)

  const handleCustomWidthChange = (values: number[]) => {
    const width = values[0]
    setCustomWidth(width)
    onUpdateDevice("custom", { width: `${width}px` })
  }

  const handleAddDevice = () => {
    if (newDevice.id && newDevice.name && newDevice.width) {
      onAddDevice(newDevice)
      setNewDevice({ id: "", name: "", width: "" })
      setIsAddDeviceOpen(false)
    }
  }

  const getDeviceIcon = (deviceId: string) => {
    switch (deviceId) {
      case "desktop":
        return <Monitor className="w-3.5 h-3.5" />
      case "tablet":
        return <Tablet className="w-3.5 h-3.5" />
      case "mobile":
        return <Smartphone className="w-3.5 h-3.5" />
      default:
        if (deviceId.includes("tablet")) return <Tablet className="w-3.5 h-3.5" />
        if (deviceId.includes("mobile")) return <Smartphone className="w-3.5 h-3.5" />
        return <Monitor className="w-3.5 h-3.5" />
    }
  }

  return (
    <div className="p-3 border-t border-slate-800">
      <Tabs defaultValue="devices" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-8">
          <TabsTrigger value="devices" className="text-xs">
            Devices
          </TabsTrigger>
          <TabsTrigger value="custom" className="text-xs">
            Custom Size
          </TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-3 py-3">
          <div className="flex flex-wrap gap-1.5">
            {devices.map((device) => (
              <Button
                key={device.id}
                variant={currentDevice === device.id ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs flex items-center"
                onClick={() => onDeviceChange(device.id || "")}
              >
                {getDeviceIcon(device.id || "")}
                <span className="ml-1.5">{device.name}</span>
                {device.id !== "desktop" && device.id !== "tablet" && device.id !== "mobile" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1.5 text-slate-400 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemoveDevice(device.id || "")
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </Button>
            ))}

            <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 text-xs flex items-center">
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Add Device
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-slate-100">Add New Device</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 py-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="device-id" className="text-xs">
                      Device ID
                    </Label>
                    <Input
                      id="device-id"
                      value={newDevice.id}
                      onChange={(e) => setNewDevice({ ...newDevice, id: e.target.value })}
                      placeholder="e.g., iphone-13"
                      className="h-7 text-xs bg-slate-800 border-slate-700"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="device-name" className="text-xs">
                      Device Name
                    </Label>
                    <Input
                      id="device-name"
                      value={newDevice.name}
                      onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                      placeholder="e.g., iPhone 13"
                      className="h-7 text-xs bg-slate-800 border-slate-700"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="device-width" className="text-xs">
                      Width (px)
                    </Label>
                    <Input
                      id="device-width"
                      value={newDevice.width?.replace("px", "")}
                      onChange={(e) => setNewDevice({ ...newDevice, width: `${e.target.value}px` })}
                      placeholder="e.g., 390"
                      type="number"
                      className="h-7 text-xs bg-slate-800 border-slate-700"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setIsAddDeviceOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" className="h-7 text-xs" onClick={handleAddDevice}>
                      Add Device
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-3 py-3">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <Label className="text-xs">Width: {customWidth}px</Label>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => {
                    onAddDevice({
                      id: `custom-${Date.now()}`,
                      name: `Custom (${customWidth}px)`,
                      width: `${customWidth}px`,
                    })
                  }}
                >
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  Save Size
                </Button>
              </div>
              <Slider value={[customWidth]} min={320} max={1920} step={1} onValueChange={handleCustomWidthChange} />
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setCustomWidth(375)
                  handleCustomWidthChange([375])
                }}
              >
                Small Mobile
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setCustomWidth(428)
                  handleCustomWidthChange([428])
                }}
              >
                Large Mobile
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setCustomWidth(768)
                  handleCustomWidthChange([768])
                }}
              >
                Tablet
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setCustomWidth(1024)
                  handleCustomWidthChange([1024])
                }}
              >
                Small Desktop
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setCustomWidth(1280)
                  handleCustomWidthChange([1280])
                }}
              >
                Medium Desktop
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setCustomWidth(1536)
                  handleCustomWidthChange([1536])
                }}
              >
                Large Desktop
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

