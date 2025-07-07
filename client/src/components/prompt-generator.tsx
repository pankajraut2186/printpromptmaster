import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Zap, Layers, Dice6 } from "lucide-react";

interface PromptGeneratorProps {
  selectedStyle: string;
  selectedTheme: string;
  selectedAudience: string;
  onStyleChange: (style: string) => void;
  onThemeChange: (theme: string) => void;
  onAudienceChange: (audience: string) => void;
  onGenerate: () => void;
  onBulkGenerate: () => void;
  onSurpriseMe: () => void;
}

const styles = [
  { value: "any", label: "Any Style" },
  { value: "minimalist", label: "Minimalist" },
  { value: "vintage", label: "Vintage" },
  { value: "modern", label: "Modern" },
  { value: "retro", label: "Retro" },
  { value: "abstract", label: "Abstract" },
  { value: "realistic", label: "Realistic" },
  { value: "cartoon", label: "Cartoon" },
  { value: "typography", label: "Typography" },
];

const themes = [
  { value: "any", label: "Any Theme" },
  { value: "nature", label: "Nature" },
  { value: "animals", label: "Animals" },
  { value: "food", label: "Food & Drink" },
  { value: "travel", label: "Travel" },
  { value: "motivational", label: "Motivational" },
  { value: "funny", label: "Funny" },
  { value: "gaming", label: "Gaming" },
  { value: "music", label: "Music" },
  { value: "sports", label: "Sports" },
  { value: "holiday", label: "Holiday" },
];

const audiences = [
  { value: "general", label: "General" },
  { value: "kids", label: "Kids" },
  { value: "teens", label: "Teens" },
  { value: "adults", label: "Adults" },
  { value: "seniors", label: "Seniors" },
  { value: "parents", label: "Parents" },
  { value: "professionals", label: "Professionals" },
  { value: "students", label: "Students" },
];

export function PromptGenerator({
  selectedStyle,
  selectedTheme,
  selectedAudience,
  onStyleChange,
  onThemeChange,
  onAudienceChange,
  onGenerate,
  onBulkGenerate,
  onSurpriseMe,
}: PromptGeneratorProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Prompts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="style">Style</Label>
          <Select value={selectedStyle} onValueChange={onStyleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {styles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select value={selectedTheme} onValueChange={onThemeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {themes.map((theme) => (
                <SelectItem key={theme.value} value={theme.value}>
                  {theme.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="audience">Target Audience</Label>
          <Select value={selectedAudience} onValueChange={onAudienceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              {audiences.map((audience) => (
                <SelectItem key={audience.value} value={audience.value}>
                  {audience.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={onGenerate} className="bg-primary hover:bg-primary/90">
          <Zap className="mr-2 w-4 h-4" />
          Generate Prompt
        </Button>
        <Button onClick={onBulkGenerate} className="bg-secondary hover:bg-secondary/90">
          <Layers className="mr-2 w-4 h-4" />
          Bulk Generate (10)
        </Button>
        <Button onClick={onSurpriseMe} variant="secondary">
          <Dice6 className="mr-2 w-4 h-4" />
          Surprise Me
        </Button>
      </div>
    </div>
  );
}
