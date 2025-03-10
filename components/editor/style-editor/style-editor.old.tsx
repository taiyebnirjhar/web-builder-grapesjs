"use client";

import { ColorPicker } from "@/components/editor/color-picker/color-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { StyleState } from "@/types/editor";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

interface StyleEditorProps {
  styles: StyleState;
  onStyleChange: (property: string, value: string) => void;
}

export function StyleEditor({ styles, onStyleChange }: StyleEditorProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="typography"
      className="w-full"
    >
      <AccordionItem value="typography" className="border-slate-700">
        <AccordionTrigger className="text-xs font-medium py-2 hover:no-underline">
          Typography
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Font Family</Label>
              <Select
                value={styles.typography.fontFamily || "Arial, sans-serif"}
                onValueChange={(value) => onStyleChange("font-family", value)}
              >
                <SelectTrigger className="h-7 text-xs bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 max-h-60">
                  <SelectItem value="Arial, sans-serif" className="text-xs">
                    Arial
                  </SelectItem>
                  <SelectItem value="Helvetica, sans-serif" className="text-xs">
                    Helvetica
                  </SelectItem>
                  <SelectItem
                    value="Times New Roman, serif"
                    className="text-xs"
                  >
                    Times New Roman
                  </SelectItem>
                  <SelectItem value="Georgia, serif" className="text-xs">
                    Georgia
                  </SelectItem>
                  <SelectItem
                    value="Courier New, monospace"
                    className="text-xs"
                  >
                    Courier New
                  </SelectItem>
                  <SelectItem value="Verdana, sans-serif" className="text-xs">
                    Verdana
                  </SelectItem>
                  <SelectItem value="Tahoma, sans-serif" className="text-xs">
                    Tahoma
                  </SelectItem>
                  <SelectItem
                    value="Trebuchet MS, sans-serif"
                    className="text-xs"
                  >
                    Trebuchet MS
                  </SelectItem>
                  <SelectItem value="Impact, sans-serif" className="text-xs">
                    Impact
                  </SelectItem>
                  <SelectItem
                    value="Comic Sans MS, cursive"
                    className="text-xs"
                  >
                    Comic Sans MS
                  </SelectItem>
                  <SelectItem
                    value="Lucida Sans Unicode, sans-serif"
                    className="text-xs"
                  >
                    Lucida Sans
                  </SelectItem>
                  <SelectItem
                    value="Palatino Linotype, serif"
                    className="text-xs"
                  >
                    Palatino
                  </SelectItem>
                  <SelectItem value="Garamond, serif" className="text-xs">
                    Garamond
                  </SelectItem>
                  <SelectItem value="Bookman, serif" className="text-xs">
                    Bookman
                  </SelectItem>
                  <SelectItem
                    value="Avant Garde, sans-serif"
                    className="text-xs"
                  >
                    Avant Garde
                  </SelectItem>
                  <SelectItem value="system-ui, sans-serif" className="text-xs">
                    System UI
                  </SelectItem>
                  <SelectItem value="Inter, sans-serif" className="text-xs">
                    Inter
                  </SelectItem>
                  <SelectItem value="Roboto, sans-serif" className="text-xs">
                    Roboto
                  </SelectItem>
                  <SelectItem value="Open Sans, sans-serif" className="text-xs">
                    Open Sans
                  </SelectItem>
                  <SelectItem value="Lato, sans-serif" className="text-xs">
                    Lato
                  </SelectItem>
                  <SelectItem
                    value="Montserrat, sans-serif"
                    className="text-xs"
                  >
                    Montserrat
                  </SelectItem>
                  <SelectItem value="Poppins, sans-serif" className="text-xs">
                    Poppins
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label className="text-xs">Font Size</Label>
                <div className="text-xs text-slate-400">
                  {styles.typography.fontSize}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Input
                  value={styles.typography.fontSize
                    .replace("px", "")
                    .replace("rem", "")
                    .replace("em", "")}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only update if the value is valid (empty or a number)
                    if (value === "" || !isNaN(Number.parseFloat(value))) {
                      const unit = styles.typography.fontSize.includes("rem")
                        ? "rem"
                        : styles.typography.fontSize.includes("em")
                        ? "em"
                        : "px";
                      onStyleChange("font-size", `${value}${unit}`);
                    }
                  }}
                  className="h-7 text-xs bg-slate-800 border-slate-700 flex-1"
                  type="number"
                  min="0"
                  step="1"
                />
                <Select
                  value={
                    styles.typography.fontSize.includes("rem")
                      ? "rem"
                      : styles.typography.fontSize.includes("em")
                      ? "em"
                      : "px"
                  }
                  onValueChange={(unit) => {
                    const value = styles.typography.fontSize
                      .replace("px", "")
                      .replace("rem", "")
                      .replace("em", "");
                    onStyleChange("font-size", `${value}${unit}`);
                  }}
                >
                  <SelectTrigger className="h-7 w-16 text-xs bg-slate-800 border-slate-700">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="px" className="text-xs">
                      px
                    </SelectItem>
                    <SelectItem value="rem" className="text-xs">
                      rem
                    </SelectItem>
                    <SelectItem value="em" className="text-xs">
                      em
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-1">
                <Slider
                  value={[
                    Number.parseFloat(
                      styles.typography.fontSize
                        .replace("px", "")
                        .replace("rem", "")
                        .replace("em", "")
                    ),
                  ]}
                  min={0}
                  max={
                    styles.typography.fontSize.includes("rem") ||
                    styles.typography.fontSize.includes("em")
                      ? 10
                      : 100
                  }
                  step={
                    styles.typography.fontSize.includes("rem") ||
                    styles.typography.fontSize.includes("em")
                      ? 0.1
                      : 1
                  }
                  onValueChange={([value]) => {
                    const unit = styles.typography.fontSize.includes("rem")
                      ? "rem"
                      : styles.typography.fontSize.includes("em")
                      ? "em"
                      : "px";
                    onStyleChange("font-size", `${value}${unit}`);
                  }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Font Weight</Label>
              <Select
                value={styles.typography.fontWeight || "400"}
                onValueChange={(value) => onStyleChange("font-weight", value)}
              >
                <SelectTrigger className="h-7 text-xs bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Select weight" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="100" className="text-xs">
                    Thin (100)
                  </SelectItem>
                  <SelectItem value="200" className="text-xs">
                    Extra Light (200)
                  </SelectItem>
                  <SelectItem value="300" className="text-xs">
                    Light (300)
                  </SelectItem>
                  <SelectItem value="400" className="text-xs">
                    Regular (400)
                  </SelectItem>
                  <SelectItem value="500" className="text-xs">
                    Medium (500)
                  </SelectItem>
                  <SelectItem value="600" className="text-xs">
                    Semi Bold (600)
                  </SelectItem>
                  <SelectItem value="700" className="text-xs">
                    Bold (700)
                  </SelectItem>
                  <SelectItem value="800" className="text-xs">
                    Extra Bold (800)
                  </SelectItem>
                  <SelectItem value="900" className="text-xs">
                    Black (900)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Line Height</Label>
              <div className="flex gap-2 items-center">
                <Input
                  value={styles.typography.lineHeight || "1.5"}
                  onChange={(e) => onStyleChange("line-height", e.target.value)}
                  className="h-7 text-xs bg-slate-800 border-slate-700 flex-1"
                  type="number"
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="pt-1">
                <Slider
                  value={[
                    Number.parseFloat(styles.typography.lineHeight || "1.5"),
                  ]}
                  min={0}
                  max={3}
                  step={0.1}
                  onValueChange={([value]) =>
                    onStyleChange("line-height", value.toString())
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Letter Spacing</Label>
              <div className="flex gap-2 items-center">
                <Input
                  value={(styles.typography.letterSpacing || "0")
                    .replace("px", "")
                    .replace("em", "")}
                  onChange={(e) => {
                    const value = e.target.value;
                    const unit =
                      styles.typography.letterSpacing &&
                      styles.typography.letterSpacing.includes("em")
                        ? "em"
                        : "px";
                    onStyleChange("letter-spacing", `${value}${unit}`);
                  }}
                  className="h-7 text-xs bg-slate-800 border-slate-700 flex-1"
                  type="number"
                  step="0.1"
                />
                <Select
                  value={
                    styles.typography.letterSpacing &&
                    styles.typography.letterSpacing.includes("em")
                      ? "em"
                      : "px"
                  }
                  onValueChange={(unit) => {
                    const value = (styles.typography.letterSpacing || "0")
                      .replace("px", "")
                      .replace("em", "");
                    onStyleChange("letter-spacing", `${value}${unit}`);
                  }}
                >
                  <SelectTrigger className="h-7 w-16 text-xs bg-slate-800 border-slate-700">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="px" className="text-xs">
                      px
                    </SelectItem>
                    <SelectItem value="em" className="text-xs">
                      em
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Text Color</Label>
              <div className="flex items-center gap-2">
                <ColorPicker
                  color={styles.typography.color}
                  onChange={(color) => onStyleChange("color", color)}
                />
                <Input
                  value={styles.typography.color}
                  onChange={(e) => onStyleChange("color", e.target.value)}
                  className="flex-1 h-7 text-xs bg-slate-800 border-slate-700"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Text Alignment</Label>
              <div className="flex gap-1.5">
                <Button
                  variant={
                    styles.typography.textAlign === "left"
                      ? "default"
                      : "outline"
                  }
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onStyleChange("text-align", "left")}
                >
                  <AlignLeft className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant={
                    styles.typography.textAlign === "center"
                      ? "default"
                      : "outline"
                  }
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onStyleChange("text-align", "center")}
                >
                  <AlignCenter className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant={
                    styles.typography.textAlign === "right"
                      ? "default"
                      : "outline"
                  }
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onStyleChange("text-align", "right")}
                >
                  <AlignRight className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant={
                    styles.typography.textAlign === "justify"
                      ? "default"
                      : "outline"
                  }
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onStyleChange("text-align", "justify")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </Button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Text Style</Label>
              <div className="flex gap-1.5">
                <Button
                  variant={
                    styles.typography.fontWeight === "bold" ||
                    Number.parseInt(styles.typography.fontWeight || "0") >= 700
                      ? "default"
                      : "outline"
                  }
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => {
                    const newWeight =
                      styles.typography.fontWeight === "bold" ||
                      Number.parseInt(styles.typography.fontWeight || "0") >=
                        700
                        ? "normal"
                        : "bold";
                    onStyleChange("font-weight", newWeight);
                  }}
                >
                  <Bold className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant={
                    styles.typography.fontStyle === "italic"
                      ? "default"
                      : "outline"
                  }
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => {
                    const newStyle =
                      styles.typography.fontStyle === "italic"
                        ? "normal"
                        : "italic";
                    onStyleChange("font-style", newStyle);
                  }}
                >
                  <Italic className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant={
                    styles.typography.textDecoration === "underline"
                      ? "default"
                      : "outline"
                  }
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => {
                    const newDecoration =
                      styles.typography.textDecoration === "underline"
                        ? "none"
                        : "underline";
                    onStyleChange("text-decoration", newDecoration);
                  }}
                >
                  <Underline className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant={
                    styles.typography.textTransform === "uppercase"
                      ? "default"
                      : "outline"
                  }
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => {
                    const newTransform =
                      styles.typography.textTransform === "uppercase"
                        ? "none"
                        : "uppercase";
                    onStyleChange("text-transform", newTransform);
                  }}
                  title="Uppercase"
                >
                  <span className="text-xs font-bold">TT</span>
                </Button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Text Shadow</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-[10px] text-slate-400">
                    Horizontal
                  </Label>
                  <Input
                    value={(styles.typography.textShadowX || "0").replace(
                      "px",
                      ""
                    )}
                    onChange={(e) => {
                      const x = e.target.value + "px";
                      const y = styles.typography.textShadowY || "0";
                      const blur = styles.typography.textShadowBlur || "0";
                      const color =
                        styles.typography.textShadowColor || "rgba(0,0,0,0.5)";
                      onStyleChange(
                        "text-shadow",
                        `${x} ${y} ${blur} ${color}`
                      );
                    }}
                    className="h-7 text-xs bg-slate-800 border-slate-700"
                    type="number"
                  />
                </div>
                <div>
                  <Label className="text-[10px] text-slate-400">Vertical</Label>
                  <Input
                    value={(styles.typography.textShadowY || "0").replace(
                      "px",
                      ""
                    )}
                    onChange={(e) => {
                      const x = styles.typography.textShadowX || "0";
                      const y = e.target.value + "px";
                      const blur = styles.typography.textShadowBlur || "0";
                      const color =
                        styles.typography.textShadowColor || "rgba(0,0,0,0.5)";
                      onStyleChange(
                        "text-shadow",
                        `${x} ${y} ${blur} ${color}`
                      );
                    }}
                    className="h-7 text-xs bg-slate-800 border-slate-700"
                    type="number"
                  />
                </div>
                <div>
                  <Label className="text-[10px] text-slate-400">Blur</Label>
                  <Input
                    value={(styles.typography.textShadowBlur || "0").replace(
                      "px",
                      ""
                    )}
                    onChange={(e) => {
                      const x = styles.typography.textShadowX || "0";
                      const y = styles.typography.textShadowY || "0";
                      const blur = e.target.value + "px";
                      const color =
                        styles.typography.textShadowColor || "rgba(0,0,0,0.5)";
                      onStyleChange(
                        "text-shadow",
                        `${x} ${y} ${blur} ${color}`
                      );
                    }}
                    className="h-7 text-xs bg-slate-800 border-slate-700"
                    type="number"
                    min="0"
                  />
                </div>
                <div>
                  <Label className="text-[10px] text-slate-400">Color</Label>
                  <div className="flex items-center gap-1">
                    <ColorPicker
                      color={
                        styles.typography.textShadowColor || "rgba(0,0,0,0.5)"
                      }
                      onChange={(color) => {
                        const x = styles.typography.textShadowX || "0";
                        const y = styles.typography.textShadowY || "0";
                        const blur = styles.typography.textShadowBlur || "0";
                        onStyleChange(
                          "text-shadow",
                          `${x} ${y} ${blur} ${color}`
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="spacing" className="border-slate-700">
        <AccordionTrigger className="text-xs font-medium py-2 hover:no-underline">
          Spacing
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Border Radius (rem)</Label>
              <Slider
                value={[styles.spacing.borderRadius || 0]}
                max={2}
                step={0.125}
                onValueChange={([value]) =>
                  onStyleChange("border-radius", `${value}rem`)
                }
                className="py-1"
              />
              <div className="text-right text-[10px] text-slate-400">
                {styles.spacing.borderRadius || 0}rem
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Padding</Label>
              <div className="flex gap-2 items-center">
                <Input
                  value={styles.spacing.padding || "0px"}
                  onChange={(e) => onStyleChange("padding", e.target.value)}
                  className="h-7 text-xs bg-slate-800 border-slate-700 flex-1"
                />
                <div className="text-xs text-slate-400 w-16 text-right">
                  {styles.spacing.padding || "0px"}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => onStyleChange("padding", "0px")}
                >
                  None
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => onStyleChange("padding", "4px")}
                >
                  XS
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => onStyleChange("padding", "8px")}
                >
                  SM
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => onStyleChange("padding", "16px")}
                >
                  MD
                </Button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Margin</Label>
              <div className="flex gap-2 items-center">
                <Input
                  value={styles.spacing.margin || "0px"}
                  onChange={(e) => onStyleChange("margin", e.target.value)}
                  className="h-7 text-xs bg-slate-800 border-slate-700 flex-1"
                />
                <div className="text-xs text-slate-400 w-16 text-right">
                  {styles.spacing.margin || "0px"}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => onStyleChange("margin", "0px")}
                >
                  None
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => onStyleChange("margin", "4px")}
                >
                  XS
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => onStyleChange("margin", "8px")}
                >
                  SM
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => onStyleChange("margin", "16px")}
                >
                  MD
                </Button>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="colors" className="border-slate-700">
        <AccordionTrigger className="text-xs font-medium py-2 hover:no-underline">
          Colors
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Background Color</Label>
              <div className="flex items-center gap-2">
                <ColorPicker
                  color={styles.colors.backgroundColor || "#FFFFFF"}
                  onChange={(color) => onStyleChange("background-color", color)}
                />
                <Input
                  value={styles.colors.backgroundColor || "#FFFFFF"}
                  onChange={(e) =>
                    onStyleChange("background-color", e.target.value)
                  }
                  className="flex-1 h-7 text-xs bg-slate-800 border-slate-700"
                />
              </div>
              <div className="grid grid-cols-5 gap-1 mt-2">
                {[
                  { color: "#FFFFFF", name: "White" },
                  { color: "#F3F4F6", name: "Light Gray" },
                  { color: "#6B7280", name: "Gray" },
                  { color: "#1F2937", name: "Dark Gray" },
                  { color: "#000000", name: "Black" },
                ].map((preset, index) => (
                  <Button
                    key={`bg-${preset.color}-${index}`}
                    variant="outline"
                    size="sm"
                    className="h-6 w-full p-0"
                    style={{ backgroundColor: preset.color }}
                    onClick={() =>
                      onStyleChange("background-color", preset.color)
                    }
                  >
                    <span className="sr-only">{preset.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Border Color</Label>
              <div className="flex items-center gap-2">
                <ColorPicker
                  color={styles.colors.borderColor || "#E5E7EB"}
                  onChange={(color) => onStyleChange("border-color", color)}
                />
                <Input
                  value={styles.colors.borderColor || "#E5E7EB"}
                  onChange={(e) =>
                    onStyleChange("border-color", e.target.value)
                  }
                  className="flex-1 h-7 text-xs bg-slate-800 border-slate-700"
                />
              </div>
              <div className="grid grid-cols-5 gap-1 mt-2">
                {[
                  { color: "#E5E7EB", name: "Default" },
                  { color: "#6B7280", name: "Gray" },
                  { color: "#3B82F6", name: "Blue" },
                  { color: "#10B981", name: "Green" },
                  { color: "#EF4444", name: "Red" },
                ].map((preset, index) => (
                  <Button
                    key={`border-${preset.color}-${index}`}
                    variant="outline"
                    size="sm"
                    className="h-6 w-full p-0"
                    style={{ backgroundColor: preset.color }}
                    onClick={() => onStyleChange("border-color", preset.color)}
                  >
                    <span className="sr-only">{preset.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Border Width</Label>
              <div className="flex gap-2 items-center">
                <Input
                  value={(styles.colors.borderWidth || "0px")
                    .replace("px", "")
                    .replace("rem", "")
                    .replace("em", "")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || !isNaN(Number.parseFloat(value))) {
                      onStyleChange("border-width", `${value}px`);
                    }
                  }}
                  className="h-7 text-xs bg-slate-800 border-slate-700 flex-1"
                  type="number"
                  min="0"
                  step="1"
                />
                <div className="text-xs text-slate-400 w-16 text-right">
                  {styles.colors.borderWidth || "0px"}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => onStyleChange("border-width", "0px")}
                >
                  None
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => onStyleChange("border-width", "1px")}
                >
                  Thin
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => onStyleChange("border-width", "2px")}
                >
                  Medium
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => onStyleChange("border-width", "4px")}
                >
                  Thick
                </Button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Border Style</Label>
              <Select
                value={styles.colors.borderStyle || "solid"}
                onValueChange={(value) => onStyleChange("border-style", value)}
              >
                <SelectTrigger className="h-7 text-xs bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="none" className="text-xs">
                    None
                  </SelectItem>
                  <SelectItem value="solid" className="text-xs">
                    Solid
                  </SelectItem>
                  <SelectItem value="dashed" className="text-xs">
                    Dashed
                  </SelectItem>
                  <SelectItem value="dotted" className="text-xs">
                    Dotted
                  </SelectItem>
                  <SelectItem value="double" className="text-xs">
                    Double
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="grid grid-cols-4 gap-1 mt-2">
                <div
                  className="h-6 border border-solid border-slate-400 rounded flex items-center justify-center text-xs cursor-pointer"
                  onClick={() => onStyleChange("border-style", "solid")}
                >
                  Solid
                </div>
                <div
                  className="h-6 border border-dashed border-slate-400 rounded flex items-center justify-center text-xs cursor-pointer"
                  onClick={() => onStyleChange("border-style", "dashed")}
                >
                  Dashed
                </div>
                <div
                  className="h-6 border border-dotted border-slate-400 rounded flex items-center justify-center text-xs cursor-pointer"
                  onClick={() => onStyleChange("border-style", "dotted")}
                >
                  Dotted
                </div>
                <div
                  className="h-6 border-2 border-double border-slate-400 rounded flex items-center justify-center text-xs cursor-pointer"
                  onClick={() => onStyleChange("border-style", "double")}
                >
                  Double
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
