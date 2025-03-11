"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Code, Play } from "lucide-react";
import { useEffect, useState } from "react";

interface CodeEditorProps {
  html: string;
  css: string;
  js: string;
  onUpdateHtml: (html: string) => void;
  onUpdateCss: (css: string) => void;
  onUpdateJs: (js: string) => void;
}

export function CodeEditor({
  html,
  css,
  js,
  onUpdateHtml,
  onUpdateCss,
  onUpdateJs,
}: CodeEditorProps) {
  const [localHtml, setLocalHtml] = useState(html);
  const [localCss, setLocalCss] = useState(css);
  const [localJs, setLocalJs] = useState(js);
  const [preview, setPreview] = useState("");
  const [activeTab, setActiveTab] = useState("html");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setLocalHtml(html);
    setLocalCss(css);
    setLocalJs(js);
  }, [html, css, js]);

  useEffect(() => {
    if (isDialogOpen) {
      generatePreview();
    }
  }, [isDialogOpen]);

  const generatePreview = () => {
    const previewHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Add Tailwind CSS CDN -->
        <script src="https://cdn.tailwindcss.com"></script>
        <style>${localCss}</style>
      </head>
      <body>
        ${localHtml}
        <script>${localJs}</script>
      </body>
      </html>
    `;
    setPreview(previewHtml);
  };

  const handleApplyChanges = () => {
    onUpdateHtml(localHtml);
    onUpdateCss(localCss);
    onUpdateJs(localJs);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 text-xs">
          <Code className="w-3.5 h-3.5 mr-1.5" />
          Code Editor
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Code Editor</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
          <div className="md:w-1/2 flex flex-col">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="js">JavaScript</TabsTrigger>
              </TabsList>

              <TabsContent
                value="html"
                className={cn(
                  "flex-1 flex flex-col",
                  activeTab !== "html" && "hidden"
                )}
              >
                <div className="flex-1 border rounded-md  h-full">
                  <textarea
                    className="w-full h-full p-4 font-mono text-sm bg-gray-900 text-gray-100 resize-none focus:outline-none"
                    value={localHtml}
                    onChange={(e) => setLocalHtml(e.target.value)}
                    spellCheck={false}
                  />
                </div>
              </TabsContent>

              <TabsContent
                value="css"
                className={cn(
                  "flex-1 flex flex-col",
                  activeTab !== "css" && "hidden"
                )}
              >
                <div className="flex-1 border rounded-md overflow-hidden">
                  <textarea
                    className="w-full h-full p-4 font-mono text-sm bg-gray-900 text-gray-100 resize-none focus:outline-none"
                    value={localCss}
                    onChange={(e) => setLocalCss(e.target.value)}
                    spellCheck={false}
                  />
                </div>
              </TabsContent>

              <TabsContent
                value="js"
                className={cn(
                  "flex-1 flex flex-col",
                  activeTab !== "js" && "hidden"
                )}
              >
                <div className="flex-1 border rounded-md overflow-hidden">
                  <textarea
                    className="w-full h-full p-4 font-mono text-sm bg-gray-900 text-gray-100 resize-none focus:outline-none"
                    value={localJs}
                    onChange={(e) => setLocalJs(e.target.value)}
                    spellCheck={false}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="md:w-1/2 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Preview</h3>
              <Button variant="outline" size="sm" onClick={generatePreview}>
                <Play className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
            <div className="flex-1 border rounded-md overflow-hidden bg-white">
              <iframe
                srcDoc={preview}
                title="Preview"
                className="w-full h-full"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleApplyChanges}>Apply Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
