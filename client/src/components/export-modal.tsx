import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { type Prompt } from "@shared/schema";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompts: Prompt[];
}

export function ExportModal({ isOpen, onClose, prompts }: ExportModalProps) {
  const [format, setFormat] = useState("csv");
  const [includePrompts, setIncludePrompts] = useState(true);
  const [includeTags, setIncludeTags] = useState(true);
  const [includeTimestamps, setIncludeTimestamps] = useState(false);
  
  const { toast } = useToast();

  const handleExport = () => {
    if (prompts.length === 0) {
      toast({
        title: "No Data",
        description: "No prompts available to export.",
        variant: "destructive",
      });
      return;
    }

    try {
      let content = "";
      let filename = "";
      let mimeType = "";

      switch (format) {
        case "csv":
          content = generateCSV();
          filename = "prompts.csv";
          mimeType = "text/csv";
          break;
        case "json":
          content = generateJSON();
          filename = "prompts.json";
          mimeType = "application/json";
          break;
        case "txt":
          content = generateTXT();
          filename = "prompts.txt";
          mimeType = "text/plain";
          break;
        default:
          throw new Error("Unsupported format");
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `Prompts exported as ${filename}`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export prompts. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generateCSV = () => {
    const headers = [];
    if (includePrompts) headers.push("Prompt");
    if (includeTags) headers.push("Category", "Style", "Theme", "Audience", "Tags");
    if (includeTimestamps) headers.push("Created At");

    const rows = [headers.join(",")];
    
    prompts.forEach(prompt => {
      const row = [];
      if (includePrompts) row.push(`"${prompt.content.replace(/"/g, '""')}"`);
      if (includeTags) {
        row.push(prompt.category || "");
        row.push(prompt.style || "");
        row.push(prompt.theme || "");
        row.push(prompt.audience || "");
        row.push(`"${prompt.tags?.join(", ") || ""}"`);
      }
      if (includeTimestamps) row.push(prompt.createdAt?.toISOString() || "");
      
      rows.push(row.join(","));
    });

    return rows.join("\n");
  };

  const generateJSON = () => {
    const data = prompts.map(prompt => {
      const item: any = {};
      if (includePrompts) item.content = prompt.content;
      if (includeTags) {
        item.category = prompt.category;
        item.style = prompt.style;
        item.theme = prompt.theme;
        item.audience = prompt.audience;
        item.tags = prompt.tags;
      }
      if (includeTimestamps) item.createdAt = prompt.createdAt;
      
      return item;
    });

    return JSON.stringify(data, null, 2);
  };

  const generateTXT = () => {
    return prompts.map(prompt => {
      let text = "";
      if (includePrompts) text += `${prompt.content}\n`;
      if (includeTags) {
        text += `Category: ${prompt.category || "N/A"}\n`;
        text += `Style: ${prompt.style || "N/A"}\n`;
        text += `Theme: ${prompt.theme || "N/A"}\n`;
        text += `Audience: ${prompt.audience || "N/A"}\n`;
        text += `Tags: ${prompt.tags?.join(", ") || "N/A"}\n`;
      }
      if (includeTimestamps) text += `Created: ${prompt.createdAt?.toISOString() || "N/A"}\n`;
      
      return text + "\n---\n";
    }).join("\n");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Prompts</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="format">Export Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV File</SelectItem>
                <SelectItem value="json">JSON File</SelectItem>
                <SelectItem value="txt">Text File</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Include</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-prompts"
                  checked={includePrompts}
                  onCheckedChange={setIncludePrompts}
                />
                <Label htmlFor="include-prompts" className="text-sm">
                  Generated prompts
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-tags"
                  checked={includeTags}
                  onCheckedChange={setIncludeTags}
                />
                <Label htmlFor="include-tags" className="text-sm">
                  Categories and tags
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-timestamps"
                  checked={includeTimestamps}
                  onCheckedChange={setIncludeTimestamps}
                />
                <Label htmlFor="include-timestamps" className="text-sm">
                  Timestamps
                </Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleExport}>
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
