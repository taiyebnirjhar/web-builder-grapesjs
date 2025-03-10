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
import {
  ArrowRight,
  Eye,
  EyeOff,
  MousePointer,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

// Types
interface InteractivityEditorProps {
  selectedElement: any;
  onInteractivityChange: (
    type: string,
    event: string,
    action: string,
    target?: string,
    options?: any
  ) => void;
}

interface Interaction {
  id: string;
  event: string;
  action: string;
  target?: string;
  options?: any;
}

// Main component
export function InteractivityEditor({
  selectedElement,
  onInteractivityChange,
}: InteractivityEditorProps) {
  const [interactions, setInteractions] = useState<Array<Interaction>>([]);
  const [newEvent, setNewEvent] = useState("click");
  const [newAction, setNewAction] = useState("toggle-class");
  const [newTarget, setNewTarget] = useState("");
  const [newOptions, setNewOptions] = useState<any>({
    class: "active",
    duration: "300",
    easing: "ease",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Load interactions when selected element changes
  useEffect(() => {
    loadInteractionsFromElement();
  }, [selectedElement]);

  // Helper functions
  const loadInteractionsFromElement = () => {
    if (selectedElement) {
      const elementInteractions = selectedElement.get("interactions") || [];
      setInteractions(elementInteractions);
    } else {
      setInteractions([]);
    }
  };

  const handleAddInteraction = () => {
    if (!validateInteraction()) return;

    const newInteraction = {
      id: `interaction-${Date.now()}`,
      event: newEvent,
      action: newAction,
      target: newTarget || undefined,
      options: newOptions,
    };

    const updatedInteractions = [...interactions, newInteraction];
    updateElementInteractions(updatedInteractions);

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const validateInteraction = () => {
    // Validate required fields based on action type
    if (
      newAction === "toggle-class" ||
      newAction === "add-class" ||
      newAction === "remove-class"
    ) {
      if (!newOptions.class) {
        alert("Please enter a class name");
        return false;
      }
    } else if (newAction === "redirect") {
      if (!newOptions.url) {
        alert("Please enter a URL");
        return false;
      }
    }
    return true;
  };

  const handleRemoveInteraction = (id: string) => {
    if (window.confirm("Are you sure you want to remove this interaction?")) {
      const interactionToRemove = interactions.find((i) => i.id === id);
      const updatedInteractions = interactions.filter((i) => i.id !== id);

      updateElementInteractions(updatedInteractions);

      if (interactionToRemove) {
        onInteractivityChange(
          "remove",
          interactionToRemove.event,
          interactionToRemove.action,
          interactionToRemove.target,
          interactionToRemove.options
        );
      }
    }
  };

  const handleUpdateInteraction = (id: string, field: string, value: any) => {
    const updatedInteractions = interactions.map((interaction) => {
      if (interaction.id === id) {
        if (field === "options") {
          return {
            ...interaction,
            options: { ...interaction.options, ...value },
          };
        }
        return { ...interaction, [field]: value };
      }
      return interaction;
    });

    updateElementInteractions(updatedInteractions);
  };

  const updateElementInteractions = (
    updatedInteractions: Array<Interaction>
  ) => {
    setInteractions(updatedInteractions);

    // Update the element
    if (selectedElement) {
      selectedElement.set("interactions", updatedInteractions);

      // Find the last interaction if we're adding a new one
      if (updatedInteractions.length > interactions.length) {
        const newInteraction =
          updatedInteractions[updatedInteractions.length - 1];
        onInteractivityChange(
          "add",
          newInteraction.event,
          newInteraction.action,
          newInteraction.target,
          newInteraction.options
        );
      } else if (updatedInteractions.length === interactions.length) {
        // We're updating an existing interaction
        const updatedInteraction = updatedInteractions.find(
          (i, idx) => JSON.stringify(i) !== JSON.stringify(interactions[idx])
        );
        if (updatedInteraction) {
          onInteractivityChange(
            "update",
            updatedInteraction.event,
            updatedInteraction.action,
            updatedInteraction.target,
            updatedInteraction.options
          );
        }
      }
    }
  };

  // If no element is selected, show a placeholder
  if (!selectedElement) {
    return <NoElementSelectedView />;
  }

  return (
    <div className="space-y-4">
      <EditorHeader />
      <SelectedElementInfo selectedElement={selectedElement} />

      <AddInteractionAccordion
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        newAction={newAction}
        setNewAction={setNewAction}
        newTarget={newTarget}
        setNewTarget={setNewTarget}
        newOptions={newOptions}
        setNewOptions={setNewOptions}
        handleAddInteraction={handleAddInteraction}
        showSuccess={showSuccess}
      />

      <InteractionsList
        interactions={interactions}
        handleUpdateInteraction={handleUpdateInteraction}
        handleRemoveInteraction={handleRemoveInteraction}
      />
    </div>
  );
}

// Component for when no element is selected
function NoElementSelectedView() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center p-6">
      <MousePointer className="w-10 h-10 mb-3 opacity-50" />
      <h3 className="text-sm font-medium mb-2">No Element Selected</h3>
      <p className="text-xs">
        Select an element on the canvas to add interactive behaviors
      </p>
    </div>
  );
}

// Header component
function EditorHeader() {
  return (
    <div className="mb-4 p-3 bg-slate-800/50 border border-slate-700/50 rounded-md">
      <h3 className="text-xs font-medium mb-1.5">Element Interactivity</h3>
      <p className="text-[10px] text-slate-400">
        Add interactive behaviors to your elements without writing code. Select
        an event type and action to create dynamic, engaging content.
      </p>
    </div>
  );
}

// Selected element info component
function SelectedElementInfo({ selectedElement }: { selectedElement: any }) {
  return (
    <div className="mb-4 p-2 bg-slate-800/30 border border-slate-700/30 rounded-md flex items-center">
      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
      <span className="text-xs text-slate-300">
        Selected:{" "}
        <span className="font-mono text-green-400">
          {selectedElement.getName?.() ||
            selectedElement.get?.("tagName") ||
            "Element"}
        </span>
      </span>
    </div>
  );
}

// Add interaction accordion component
function AddInteractionAccordion({
  newEvent,
  setNewEvent,
  newAction,
  setNewAction,
  newTarget,
  setNewTarget,
  newOptions,
  setNewOptions,
  handleAddInteraction,
  showSuccess,
}: {
  newEvent: string;
  setNewEvent: (event: string) => void;
  newAction: string;
  setNewAction: (action: string) => void;
  newTarget: string;
  setNewTarget: (target: string) => void;
  newOptions: any;
  setNewOptions: (options: any) => void;
  handleAddInteraction: () => void;
  showSuccess: boolean;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="add-interaction"
      className="w-full"
    >
      <AccordionItem value="add-interaction" className="border-slate-700">
        <AccordionTrigger className="text-xs font-medium py-2 hover:no-underline">
          Add New Interaction
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <EventSelector value={newEvent} onChange={setNewEvent} />
            <ActionSelector value={newAction} onChange={setNewAction} />

            {needsTargetSelector(newAction) && (
              <TargetSelector value={newTarget} onChange={setNewTarget} />
            )}

            <ActionOptionsForm
              action={newAction}
              options={newOptions}
              setOptions={setNewOptions}
            />

            <Button
              className="w-full mt-2"
              size="sm"
              onClick={handleAddInteraction}
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Add Interaction
            </Button>

            {showSuccess && (
              <div className="mt-2 p-2 bg-green-900/20 border border-green-800 rounded-md text-green-400 text-xs text-center">
                Interaction added successfully!
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// Helper function to determine if target selector is needed
function needsTargetSelector(action: string) {
  return [
    "show",
    "hide",
    "toggle",
    "toggle-class",
    "add-class",
    "remove-class",
    "scroll-to",
  ].includes(action);
}

// Event selector component
function EventSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">Event</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-7 text-xs bg-slate-800 border-slate-700">
          <SelectValue placeholder="Select event" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700">
          <SelectItem value="click" className="text-xs">
            Click
          </SelectItem>
          <SelectItem value="dblclick" className="text-xs">
            Double Click
          </SelectItem>
          <SelectItem value="hover" className="text-xs">
            Hover
          </SelectItem>
          <SelectItem value="scroll" className="text-xs">
            Scroll
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

// Action selector component
function ActionSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">Action</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-7 text-xs bg-slate-800 border-slate-700">
          <SelectValue placeholder="Select action" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700">
          <SelectItem value="toggle-class" className="text-xs">
            Toggle Class
          </SelectItem>
          <SelectItem value="add-class" className="text-xs">
            Add Class
          </SelectItem>
          <SelectItem value="remove-class" className="text-xs">
            Remove Class
          </SelectItem>
          <SelectItem value="show" className="text-xs">
            Show Element
          </SelectItem>
          <SelectItem value="hide" className="text-xs">
            Hide Element
          </SelectItem>
          <SelectItem value="toggle" className="text-xs">
            Toggle Visibility
          </SelectItem>
          <SelectItem value="scroll-to" className="text-xs">
            Scroll To
          </SelectItem>
          <SelectItem value="redirect" className="text-xs">
            Redirect
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

// Target selector component
function TargetSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">Target Element (CSS selector)</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 text-xs bg-slate-800 border-slate-700"
        placeholder="#element-id or .element-class"
      />
      <p className="text-[10px] text-slate-400 mt-1">
        Leave empty to target this element
      </p>
    </div>
  );
}

// Action options form component
function ActionOptionsForm({
  action,
  options,
  setOptions,
}: {
  action: string;
  options: any;
  setOptions: (options: any) => void;
}) {
  if (
    action === "toggle-class" ||
    action === "add-class" ||
    action === "remove-class"
  ) {
    return <ClassNameOption options={options} setOptions={setOptions} />;
  }

  if (action === "show" || action === "hide" || action === "toggle") {
    return <AnimationOptions options={options} setOptions={setOptions} />;
  }

  if (action === "redirect") {
    return <RedirectOptions options={options} setOptions={setOptions} />;
  }

  return null;
}

// Class name option component
function ClassNameOption({
  options,
  setOptions,
}: {
  options: any;
  setOptions: (options: any) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">Class Name</Label>
      <Input
        value={options.class || ""}
        onChange={(e) => setOptions({ ...options, class: e.target.value })}
        className="h-7 text-xs bg-slate-800 border-slate-700"
        placeholder="active"
      />
    </div>
  );
}

// Animation options component
function AnimationOptions({
  options,
  setOptions,
}: {
  options: any;
  setOptions: (options: any) => void;
}) {
  return (
    <>
      <div className="space-y-1.5">
        <Label className="text-xs">Animation</Label>
        <Select
          value={options.animation || "none"}
          onValueChange={(value) =>
            setOptions({ ...options, animation: value })
          }
        >
          <SelectTrigger className="h-7 text-xs bg-slate-800 border-slate-700">
            <SelectValue placeholder="Select animation" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="none" className="text-xs">
              None
            </SelectItem>
            <SelectItem value="fade" className="text-xs">
              Fade
            </SelectItem>
            <SelectItem value="slide" className="text-xs">
              Slide
            </SelectItem>
            <SelectItem value="scale" className="text-xs">
              Scale
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Duration (ms)</Label>
        <Input
          value={options.duration || "300"}
          onChange={(e) => setOptions({ ...options, duration: e.target.value })}
          className="h-7 text-xs bg-slate-800 border-slate-700"
          type="number"
          min="0"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Easing</Label>
        <Select
          value={options.easing || "ease"}
          onValueChange={(value) => setOptions({ ...options, easing: value })}
        >
          <SelectTrigger className="h-7 text-xs bg-slate-800 border-slate-700">
            <SelectValue placeholder="Select easing" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="ease" className="text-xs">
              Ease
            </SelectItem>
            <SelectItem value="linear" className="text-xs">
              Linear
            </SelectItem>
            <SelectItem value="ease-in" className="text-xs">
              Ease In
            </SelectItem>
            <SelectItem value="ease-out" className="text-xs">
              Ease Out
            </SelectItem>
            <SelectItem value="ease-in-out" className="text-xs">
              Ease In Out
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

// Redirect options component
function RedirectOptions({
  options,
  setOptions,
}: {
  options: any;
  setOptions: (options: any) => void;
}) {
  return (
    <>
      <div className="space-y-1.5">
        <Label className="text-xs">URL</Label>
        <Input
          value={options.url || ""}
          onChange={(e) => setOptions({ ...options, url: e.target.value })}
          className="h-7 text-xs bg-slate-800 border-slate-700"
          placeholder="https://example.com"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={options.newTab === true}
          onCheckedChange={(checked) =>
            setOptions({ ...options, newTab: checked })
          }
          id="new-tab"
        />
        <Label htmlFor="new-tab" className="text-xs">
          Open in new tab
        </Label>
      </div>
    </>
  );
}

// Interactions list component
function InteractionsList({
  interactions,
  handleUpdateInteraction,
  handleRemoveInteraction,
}: {
  interactions: Array<Interaction>;
  handleUpdateInteraction: (id: string, field: string, value: any) => void;
  handleRemoveInteraction: (id: string) => void;
}) {
  if (interactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-slate-400 text-xs">
        <p>No interactions added yet</p>
        <p className="mt-1 text-[10px]">
          Use the panel above to add your first interaction
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-medium">Current Interactions</h3>
      {interactions.map((interaction) => (
        <InteractionItem
          key={interaction.id}
          interaction={interaction}
          onUpdate={handleUpdateInteraction}
          onRemove={handleRemoveInteraction}
        />
      ))}
    </div>
  );
}

// Single interaction item component
function InteractionItem({
  interaction,
  onUpdate,
  onRemove,
}: {
  interaction: Interaction;
  onUpdate: (id: string, field: string, value: any) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="mb-4 p-3 bg-slate-800 rounded-md border border-slate-700">
      <InteractionHeader
        interaction={interaction}
        onRemove={() => onRemove(interaction.id)}
      />

      <div className="space-y-3 mt-3">
        <EventSelector
          value={interaction.event}
          onChange={(value) => onUpdate(interaction.id, "event", value)}
        />

        <EventOptionsForm interaction={interaction} onUpdate={onUpdate} />

        <ActionSelector
          value={interaction.action}
          onChange={(value) => onUpdate(interaction.id, "action", value)}
        />

        {needsTargetSelector(interaction.action) && (
          <div className="space-y-1.5">
            <Label className="text-xs">Target Element (CSS selector)</Label>
            <Input
              value={interaction.target || ""}
              onChange={(e) =>
                onUpdate(interaction.id, "target", e.target.value)
              }
              className="h-7 text-xs bg-slate-800 border-slate-700"
              placeholder="#my-id, .my-class, or tag"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Target this element if empty, or specify a CSS selector
            </p>
          </div>
        )}

        <InteractionActionOptions
          interaction={interaction}
          onUpdate={onUpdate}
        />
      </div>
    </div>
  );
}

// Interaction header component
function InteractionHeader({
  interaction,
  onRemove,
}: {
  interaction: Interaction;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-2 p-1.5 bg-slate-700/50 rounded-md">
      <div className="flex items-center space-x-2">
        {getEventIcon(interaction.event)}
        <span className="text-xs font-medium">
          {formatEventName(interaction.event)}
        </span>
        <span className="text-xs text-slate-400">→</span>
        {getActionIcon(interaction.action)}
        <span className="text-xs font-medium">
          {formatActionName(interaction.action)}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 text-red-500 hover:text-red-400 hover:bg-red-900/20"
        onClick={onRemove}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

// Event options form component
function EventOptionsForm({
  interaction,
  onUpdate,
}: {
  interaction: Interaction;
  onUpdate: (id: string, field: string, value: any) => void;
}) {
  switch (interaction.event) {
    case "hover":
      return (
        <div className="space-y-1.5">
          <Label className="text-xs">Delay (ms)</Label>
          <Input
            value={interaction.options?.delay || "0"}
            onChange={(e) =>
              onUpdate(interaction.id, "options", { delay: e.target.value })
            }
            className="h-7 text-xs bg-slate-800 border-slate-700"
            type="number"
            min="0"
          />
        </div>
      );
    case "scroll":
      return (
        <div className="space-y-1.5">
          <Label className="text-xs">Offset (%)</Label>
          <Input
            value={interaction.options?.offset || "0"}
            onChange={(e) =>
              onUpdate(interaction.id, "options", { offset: e.target.value })
            }
            className="h-7 text-xs bg-slate-800 border-slate-700"
            type="number"
            min="0"
            max="100"
          />
        </div>
      );
    default:
      return null;
  }
}

// Interaction action options component
function InteractionActionOptions({
  interaction,
  onUpdate,
}: {
  interaction: Interaction;
  onUpdate: (id: string, field: string, value: any) => void;
}) {
  switch (interaction.action) {
    case "toggle-class":
    case "add-class":
    case "remove-class":
      return (
        <div className="space-y-1.5">
          <Label className="text-xs">Class Name</Label>
          <Input
            value={interaction.options?.class || ""}
            onChange={(e) =>
              onUpdate(interaction.id, "options", { class: e.target.value })
            }
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="active"
          />
        </div>
      );
    case "show":
    case "hide":
    case "toggle":
      return (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Animation</Label>
            <Select
              value={interaction.options?.animation || "none"}
              onValueChange={(value) =>
                onUpdate(interaction.id, "options", { animation: value })
              }
            >
              <SelectTrigger className="h-7 text-xs bg-slate-800 border-slate-700">
                <SelectValue placeholder="Select animation" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="none" className="text-xs">
                  None
                </SelectItem>
                <SelectItem value="fade" className="text-xs">
                  Fade
                </SelectItem>
                <SelectItem value="slide" className="text-xs">
                  Slide
                </SelectItem>
                <SelectItem value="scale" className="text-xs">
                  Scale
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Duration (ms)</Label>
            <Input
              value={interaction.options?.duration || "300"}
              onChange={(e) =>
                onUpdate(interaction.id, "options", {
                  duration: e.target.value,
                })
              }
              className="h-7 text-xs bg-slate-800 border-slate-700"
              type="number"
              min="0"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Easing</Label>
            <Select
              value={interaction.options?.easing || "ease"}
              onValueChange={(value) =>
                onUpdate(interaction.id, "options", { easing: value })
              }
            >
              <SelectTrigger className="h-7 text-xs bg-slate-800 border-slate-700">
                <SelectValue placeholder="Select easing" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="ease" className="text-xs">
                  Ease
                </SelectItem>
                <SelectItem value="linear" className="text-xs">
                  Linear
                </SelectItem>
                <SelectItem value="ease-in" className="text-xs">
                  Ease In
                </SelectItem>
                <SelectItem value="ease-out" className="text-xs">
                  Ease Out
                </SelectItem>
                <SelectItem value="ease-in-out" className="text-xs">
                  Ease In Out
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    case "scroll-to":
      return (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Offset (px)</Label>
            <Input
              value={interaction.options?.offset || "0"}
              onChange={(e) =>
                onUpdate(interaction.id, "options", { offset: e.target.value })
              }
              className="h-7 text-xs bg-slate-800 border-slate-700"
              type="number"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Duration (ms)</Label>
            <Input
              value={interaction.options?.duration || "500"}
              onChange={(e) =>
                onUpdate(interaction.id, "options", {
                  duration: e.target.value,
                })
              }
              className="h-7 text-xs bg-slate-800 border-slate-700"
              type="number"
              min="0"
            />
          </div>
        </div>
      );
    case "redirect":
      return (
        <div className="space-y-1.5">
          <Label className="text-xs">URL</Label>
          <Input
            value={interaction.options?.url || ""}
            onChange={(e) =>
              onUpdate(interaction.id, "options", { url: e.target.value })
            }
            className="h-7 text-xs bg-slate-800 border-slate-700"
            placeholder="https://example.com"
          />
          <div className="flex items-center space-x-2 mt-2">
            <Switch
              checked={interaction.options?.newTab === true}
              onCheckedChange={(checked) =>
                onUpdate(interaction.id, "options", { newTab: checked })
              }
              id={`new-tab-${interaction.id}`}
            />
            <Label htmlFor={`new-tab-${interaction.id}`} className="text-xs">
              Open in new tab
            </Label>
          </div>
        </div>
      );
    default:
      return null;
  }
}

// Helper functions for icons and formatting
function getEventIcon(event: string) {
  switch (event) {
    case "click":
      return <MousePointer className="h-3.5 w-3.5 text-blue-400" />;
    case "dblclick":
      return <MousePointer className="h-3.5 w-3.5 text-purple-400" />;
    case "hover":
      return <MousePointer className="h-3.5 w-3.5 text-green-400" />;
    case "scroll":
      return <ArrowRight className="h-3.5 w-3.5 text-yellow-400" />;
    default:
      return <MousePointer className="h-3.5 w-3.5" />;
  }
}

function getActionIcon(action: string) {
  switch (action) {
    case "toggle-class":
      return <span className="text-xs font-mono text-indigo-400">.class</span>;
    case "add-class":
      return <span className="text-xs font-mono text-indigo-400">.class</span>;
    case "remove-class":
      return <span className="text-xs font-mono text-indigo-400">.class</span>;
    case "show":
      return <Eye className="h-3.5 w-3.5 text-green-400" />;
    case "hide":
      return <EyeOff className="h-3.5 w-3.5 text-red-400" />;
    case "toggle":
      return (
        <div className="flex">
          <Eye className="h-3.5 w-3.5 text-green-400" />
          <EyeOff className="h-3.5 w-3.5 text-red-400 -ml-1" />
        </div>
      );
    case "scroll-to":
      return <ArrowRight className="h-3.5 w-3.5 text-yellow-400" />;
    case "redirect":
      return <ArrowRight className="h-3.5 w-3.5 text-blue-400" />;
    default:
      return null;
  }
}

function formatEventName(event: string) {
  switch (event) {
    case "click":
      return "Click";
    case "dblclick":
      return "Double Click";
    case "hover":
      return "Hover";
    case "scroll":
      return "Scroll";
    default:
      return event;
  }
}

function formatActionName(action: string) {
  switch (action) {
    case "toggle-class":
      return "Toggle Class";
    case "add-class":
      return "Add Class";
    case "remove-class":
      return "Remove Class";
    case "show":
      return "Show";
    case "hide":
      return "Hide";
    case "toggle":
      return "Toggle";
    case "scroll-to":
      return "Scroll To";
    case "redirect":
      return "Redirect";
    default:
      return action;
  }
}
