"use client";

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
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

// Types and Interfaces
interface AttributesEditorProps {
  selectedElement: any;
  onAttributeChange: (name: string, value: string) => void;
}

interface CustomAttribute {
  name: string;
  value: string;
}

type ElementType =
  | "link"
  | "image"
  | "video"
  | "iframe"
  | "input"
  | "button"
  | "form"
  | "element"
  | "unknown";

// Helper Functions
function getElementType(selectedElement: any): ElementType {
  if (!selectedElement) return "unknown";

  const tagName = selectedElement.get("tagName")?.toLowerCase() || "div";

  if (tagName === "a") return "link";
  if (tagName === "img") return "image";
  if (tagName === "video") return "video";
  if (tagName === "iframe") return "iframe";
  if (tagName === "input") return "input";
  if (tagName === "button") return "button";
  if (tagName === "form") return "form";

  return "element";
}

// Main Component
export function AttributesEditor({
  selectedElement,
  onAttributeChange,
}: AttributesEditorProps) {
  const [attributes, setAttributes] = useState<Record<string, string>>({});
  const [customAttributes, setCustomAttributes] = useState<CustomAttribute[]>(
    []
  );
  const [newAttributeName, setNewAttributeName] = useState("");
  const [newAttributeValue, setNewAttributeValue] = useState("");

  useEffect(() => {
    if (selectedElement) {
      // Get all attributes from the selected element
      const attrs = selectedElement.getAttributes();
      setAttributes(attrs || {});

      // Filter out standard attributes to get custom ones
      const standardAttrs = [
        "id",
        "class",
        "style",
        "src",
        "href",
        "alt",
        "title",
        "target",
        "rel",
      ];
      const custom = Object.entries(attrs || {})
        .filter(([key]) => !standardAttrs.includes(key))
        .map(([name, value]) => ({ name, value: String(value) }));

      setCustomAttributes(custom);
    }
  }, [selectedElement]);

  const handleAttributeChange = (name: string, value: string) => {
    onAttributeChange(name, value);
  };

  const handleAddCustomAttribute = () => {
    if (
      newAttributeName &&
      !customAttributes.some((attr) => attr.name === newAttributeName)
    ) {
      const newAttr = { name: newAttributeName, value: newAttributeValue };
      setCustomAttributes([...customAttributes, newAttr]);
      onAttributeChange(newAttributeName, newAttributeValue);
      setNewAttributeName("");
      setNewAttributeValue("");
    }
  };

  const handleRemoveCustomAttribute = (name: string) => {
    setCustomAttributes(customAttributes.filter((attr) => attr.name !== name));
    onAttributeChange(name, ""); // Setting to empty string will remove the attribute
  };

  // Render Functions for Different Element Types
  function renderLinkAttributes() {
    return (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">URL (href)</Label>
          <Input
            value={attributes.href || ""}
            onChange={(e) => handleAttributeChange("href", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="https://example.com"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Target</Label>
          <Select
            value={attributes.target || "_self"}
            onValueChange={(value) => handleAttributeChange("target", value)}
          >
            <SelectTrigger className="h-7 text-xs bg-slate-800 border-slate-700">
              <SelectValue placeholder="Select target" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="_self" className="text-xs">
                Same window (_self)
              </SelectItem>
              <SelectItem value="_blank" className="text-xs">
                New window (_blank)
              </SelectItem>
              <SelectItem value="_parent" className="text-xs">
                Parent frame (_parent)
              </SelectItem>
              <SelectItem value="_top" className="text-xs">
                Full body of the window (_top)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Rel</Label>
          <Input
            value={attributes.rel || ""}
            onChange={(e) => handleAttributeChange("rel", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="nofollow noopener"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Title</Label>
          <Input
            value={attributes.title || ""}
            onChange={(e) => handleAttributeChange("title", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="Link title"
          />
        </div>
      </div>
    );
  }

  function renderImageAttributes() {
    return (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Source URL (src)</Label>
          <Input
            value={attributes.src || ""}
            onChange={(e) => handleAttributeChange("src", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Alt Text</Label>
          <Input
            value={attributes.alt || ""}
            onChange={(e) => handleAttributeChange("alt", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="Image description"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Title</Label>
          <Input
            value={attributes.title || ""}
            onChange={(e) => handleAttributeChange("title", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="Image title"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Width</Label>
            <Input
              value={attributes.width || ""}
              onChange={(e) => handleAttributeChange("width", e.target.value)}
              className="h-7 text-xs bg-slate-800 border-slate-700"
              placeholder="auto"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Height</Label>
            <Input
              value={attributes.height || ""}
              onChange={(e) => handleAttributeChange("height", e.target.value)}
              className="h-7 text-xs bg-slate-800 border-slate-700"
              placeholder="auto"
            />
          </div>
        </div>
      </div>
    );
  }

  function renderVideoAttributes() {
    return (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Source URL (src)</Label>
          <Input
            value={attributes.src || ""}
            onChange={(e) => handleAttributeChange("src", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="https://example.com/video.mp4"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Width</Label>
            <Input
              value={attributes.width || ""}
              onChange={(e) => handleAttributeChange("width", e.target.value)}
              className="h-7 text-xs bg-slate-800 border-slate-700"
              placeholder="auto"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Height</Label>
            <Input
              value={attributes.height || ""}
              onChange={(e) => handleAttributeChange("height", e.target.value)}
              className="h-7 text-xs bg-slate-800 border-slate-700"
              placeholder="auto"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={attributes.controls === "true"}
            onCheckedChange={(checked) =>
              handleAttributeChange("controls", checked ? "true" : "")
            }
            id="controls"
          />
          <Label htmlFor="controls" className="text-xs">
            Controls
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={attributes.autoplay === "true"}
            onCheckedChange={(checked) =>
              handleAttributeChange("autoplay", checked ? "true" : "")
            }
            id="autoplay"
          />
          <Label htmlFor="autoplay" className="text-xs">
            Autoplay
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={attributes.loop === "true"}
            onCheckedChange={(checked) =>
              handleAttributeChange("loop", checked ? "true" : "")
            }
            id="loop"
          />
          <Label htmlFor="loop" className="text-xs">
            Loop
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={attributes.muted === "true"}
            onCheckedChange={(checked) =>
              handleAttributeChange("muted", checked ? "true" : "")
            }
            id="muted"
          />
          <Label htmlFor="muted" className="text-xs">
            Muted
          </Label>
        </div>
      </div>
    );
  }

  function renderIframeAttributes() {
    return (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Source URL (src)</Label>
          <Input
            value={attributes.src || ""}
            onChange={(e) => handleAttributeChange("src", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="https://example.com/embed"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Width</Label>
            <Input
              value={attributes.width || ""}
              onChange={(e) => handleAttributeChange("width", e.target.value)}
              className="h-7 text-xs bg-slate-800 border-slate-700"
              placeholder="auto"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Height</Label>
            <Input
              value={attributes.height || ""}
              onChange={(e) => handleAttributeChange("height", e.target.value)}
              className="h-7 text-xs bg-slate-800 border-slate-700"
              placeholder="auto"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Title</Label>
          <Input
            value={attributes.title || ""}
            onChange={(e) => handleAttributeChange("title", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="Iframe title"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Allow</Label>
          <Input
            value={attributes.allow || ""}
            onChange={(e) => handleAttributeChange("allow", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={attributes.allowfullscreen === "true"}
            onCheckedChange={(checked) =>
              handleAttributeChange("allowfullscreen", checked ? "true" : "")
            }
            id="allowfullscreen"
          />
          <Label htmlFor="allowfullscreen" className="text-xs">
            Allow Fullscreen
          </Label>
        </div>
      </div>
    );
  }

  function renderInputAttributes() {
    return (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Type</Label>
          <Select
            value={attributes.type || "text"}
            onValueChange={(value) => handleAttributeChange("type", value)}
          >
            <SelectTrigger className="h-7 text-xs bg-slate-800 border-slate-700">
              <SelectValue placeholder="Select input type" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="text" className="text-xs">
                Text
              </SelectItem>
              <SelectItem value="email" className="text-xs">
                Email
              </SelectItem>
              <SelectItem value="password" className="text-xs">
                Password
              </SelectItem>
              <SelectItem value="number" className="text-xs">
                Number
              </SelectItem>
              <SelectItem value="tel" className="text-xs">
                Telephone
              </SelectItem>
              <SelectItem value="url" className="text-xs">
                URL
              </SelectItem>
              <SelectItem value="date" className="text-xs">
                Date
              </SelectItem>
              <SelectItem value="checkbox" className="text-xs">
                Checkbox
              </SelectItem>
              <SelectItem value="radio" className="text-xs">
                Radio
              </SelectItem>
              <SelectItem value="file" className="text-xs">
                File
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Name</Label>
          <Input
            value={attributes.name || ""}
            onChange={(e) => handleAttributeChange("name", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="input-name"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Placeholder</Label>
          <Input
            value={attributes.placeholder || ""}
            onChange={(e) =>
              handleAttributeChange("placeholder", e.target.value)
            }
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="Enter text..."
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Value</Label>
          <Input
            value={attributes.value || ""}
            onChange={(e) => handleAttributeChange("value", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="Default value"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={attributes.required === "true"}
            onCheckedChange={(checked) =>
              handleAttributeChange("required", checked ? "true" : "")
            }
            id="required"
          />
          <Label htmlFor="required" className="text-xs">
            Required
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={attributes.disabled === "true"}
            onCheckedChange={(checked) =>
              handleAttributeChange("disabled", checked ? "true" : "")
            }
            id="disabled"
          />
          <Label htmlFor="disabled" className="text-xs">
            Disabled
          </Label>
        </div>
      </div>
    );
  }

  function renderButtonAttributes() {
    return (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Type</Label>
          <Select
            value={attributes.type || "button"}
            onValueChange={(value) => handleAttributeChange("type", value)}
          >
            <SelectTrigger className="h-7 text-xs bg-slate-800 border-slate-700">
              <SelectValue placeholder="Select button type" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="button" className="text-xs">
                Button
              </SelectItem>
              <SelectItem value="submit" className="text-xs">
                Submit
              </SelectItem>
              <SelectItem value="reset" className="text-xs">
                Reset
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Name</Label>
          <Input
            value={attributes.name || ""}
            onChange={(e) => handleAttributeChange("name", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="button-name"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Value</Label>
          <Input
            value={attributes.value || ""}
            onChange={(e) => handleAttributeChange("value", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="Button value"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={attributes.disabled === "true"}
            onCheckedChange={(checked) =>
              handleAttributeChange("disabled", checked ? "true" : "")
            }
            id="button-disabled"
          />
          <Label htmlFor="button-disabled" className="text-xs">
            Disabled
          </Label>
        </div>
      </div>
    );
  }

  function renderFormAttributes() {
    return (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Action</Label>
          <Input
            value={attributes.action || ""}
            onChange={(e) => handleAttributeChange("action", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="https://example.com/submit"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Method</Label>
          <Select
            value={attributes.method || "get"}
            onValueChange={(value) => handleAttributeChange("method", value)}
          >
            <SelectTrigger className="h-7 text-xs bg-slate-800 border-slate-700">
              <SelectValue placeholder="Select form method" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="get" className="text-xs">
                GET
              </SelectItem>
              <SelectItem value="post" className="text-xs">
                POST
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Enctype</Label>
          <Select
            value={attributes.enctype || "application/x-www-form-urlencoded"}
            onValueChange={(value) => handleAttributeChange("enctype", value)}
          >
            <SelectTrigger className="h-7 text-xs bg-slate-800 border-slate-700">
              <SelectValue placeholder="Select encoding type" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem
                value="application/x-www-form-urlencoded"
                className="text-xs"
              >
                URL Encoded
              </SelectItem>
              <SelectItem value="multipart/form-data" className="text-xs">
                Multipart (for file uploads)
              </SelectItem>
              <SelectItem value="text/plain" className="text-xs">
                Plain Text
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={attributes.novalidate === "true"}
            onCheckedChange={(checked) =>
              handleAttributeChange("novalidate", checked ? "true" : "")
            }
            id="novalidate"
          />
          <Label htmlFor="novalidate" className="text-xs">
            Disable Validation
          </Label>
        </div>
      </div>
    );
  }

  function renderGenericAttributes() {
    return (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">ID</Label>
          <Input
            value={attributes.id || ""}
            onChange={(e) => handleAttributeChange("id", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="element-id"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Title</Label>
          <Input
            value={attributes.title || ""}
            onChange={(e) => handleAttributeChange("title", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="Element title"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Class</Label>
          <Input
            value={attributes.class || ""}
            onChange={(e) => handleAttributeChange("class", e.target.value)}
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="class1 class2"
          />
        </div>
      </div>
    );
  }

  function renderAttributesByType() {
    const elementType = getElementType(selectedElement);

    switch (elementType) {
      case "link":
        return renderLinkAttributes();
      case "image":
        return renderImageAttributes();
      case "video":
        return renderVideoAttributes();
      case "iframe":
        return renderIframeAttributes();
      case "input":
        return renderInputAttributes();
      case "button":
        return renderButtonAttributes();
      case "form":
        return renderFormAttributes();
      default:
        return renderGenericAttributes();
    }
  }

  function renderCustomAttributesSection() {
    return (
      <div className="space-y-3">
        {customAttributes.map((attr, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={attr.name}
              readOnly
              className="h-7 text-xs bg-slate-800 border-slate-700 flex-1"
            />
            <Input
              value={attr.value}
              onChange={(e) => handleAttributeChange(attr.name, e.target.value)}
              className="h-7 text-xs bg-slate-800 border-slate-700 flex-1"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-red-500 hover:text-red-400 hover:bg-red-900/20"
              onClick={() => handleRemoveCustomAttribute(attr.name)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}

        <div className="pt-2 border-t border-slate-700">
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-1.5">
              <Label className="text-xs">Name</Label>
              <Input
                value={newAttributeName}
                onChange={(e) => setNewAttributeName(e.target.value)}
                className="h-7 text-xs bg-slate-800 border-slate-700"
                placeholder="data-custom"
              />
            </div>
            <div className="flex-1 space-y-1.5">
              <Label className="text-xs">Value</Label>
              <Input
                value={newAttributeValue}
                onChange={(e) => setNewAttributeValue(e.target.value)}
                className="h-7 text-xs bg-slate-800 border-slate-700"
                placeholder="value"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handleAddCustomAttribute}
              disabled={!newAttributeName}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main Render
  if (!selectedElement) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Select an element on the canvas to edit its attributes</p>
      </div>
    );
  }

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="element-attributes"
      className="w-full"
    >
      <AccordionItem value="element-attributes" className="border-slate-700">
        <AccordionTrigger className="text-xs font-medium py-2 hover:no-underline">
          {getElementType(selectedElement).charAt(0).toUpperCase() +
            getElementType(selectedElement).slice(1)}{" "}
          Attributes
        </AccordionTrigger>
        <AccordionContent>{renderAttributesByType()}</AccordionContent>
      </AccordionItem>

      <AccordionItem value="custom-attributes" className="border-slate-700">
        <AccordionTrigger className="text-xs font-medium py-2 hover:no-underline">
          Custom Attributes
        </AccordionTrigger>
        <AccordionContent>{renderCustomAttributesSection()}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
