import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Copy, Clock, Tag } from "lucide-react";
import { type Prompt } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface PromptCardProps {
  prompt: Prompt;
  onCopy: (content: string) => void;
  onToggleFavorite: (id: number) => void;
}

const getCategoryColor = (category: string) => {
  const colors = {
    apparel: "bg-blue-100 text-blue-800",
    accessories: "bg-purple-100 text-purple-800",
    home: "bg-orange-100 text-orange-800",
    art: "bg-indigo-100 text-indigo-800",
    bags: "bg-green-100 text-green-800",
    stationery: "bg-pink-100 text-pink-800",
    seasonal: "bg-yellow-100 text-yellow-800",
  };
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

const getStyleColor = (style: string) => {
  const colors = {
    minimalist: "bg-slate-100 text-slate-800",
    vintage: "bg-amber-100 text-amber-800",
    modern: "bg-cyan-100 text-cyan-800",
    retro: "bg-rose-100 text-rose-800",
    abstract: "bg-violet-100 text-violet-800",
    realistic: "bg-emerald-100 text-emerald-800",
    cartoon: "bg-lime-100 text-lime-800",
    typography: "bg-teal-100 text-teal-800",
  };
  return colors[style as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export function PromptCard({ prompt, onCopy, onToggleFavorite }: PromptCardProps) {
  const timeAgo = prompt.createdAt ? formatDistanceToNow(new Date(prompt.createdAt), { addSuffix: true }) : "Unknown";
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {prompt.tags?.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {prompt.category && (
                <Badge className={`text-xs ${getCategoryColor(prompt.category)}`}>
                  {prompt.category.charAt(0).toUpperCase() + prompt.category.slice(1)}
                </Badge>
              )}
              {prompt.style && (
                <Badge className={`text-xs ${getStyleColor(prompt.style)}`}>
                  {prompt.style.charAt(0).toUpperCase() + prompt.style.slice(1)}
                </Badge>
              )}
            </div>
            
            <p className="text-gray-900 font-medium mb-2 leading-relaxed">
              {prompt.content}
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {timeAgo}
              </span>
              {prompt.category && (
                <span className="flex items-center">
                  <Tag className="w-3 h-3 mr-1" />
                  {prompt.category.charAt(0).toUpperCase() + prompt.category.slice(1)}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(prompt.id)}
              className={prompt.isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-500"}
            >
              <Heart className={`w-4 h-4 ${prompt.isFavorite ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onCopy(prompt.content)}
              className="text-gray-400 hover:text-blue-500"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
