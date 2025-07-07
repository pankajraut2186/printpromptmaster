import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Layers, 
  Shirt, 
  Smartphone, 
  Home, 
  Palette, 
  ShoppingBag, 
  PenTool, 
  Calendar,
  History,
  Heart,
  Download
} from "lucide-react";

interface CategorySidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onExport: () => void;
  onShowFavorites: () => void;
  onShowHistory: () => void;
  showFavorites: boolean;
  showHistory: boolean;
}

const categories = [
  { id: "all", label: "All Categories", icon: Layers },
  { id: "apparel", label: "Apparel & Clothing", icon: Shirt },
  { id: "accessories", label: "Accessories", icon: Smartphone },
  { id: "home", label: "Home & Living", icon: Home },
  { id: "art", label: "Art & Prints", icon: Palette },
  { id: "bags", label: "Bags & Totes", icon: ShoppingBag },
  { id: "stationery", label: "Stationery", icon: PenTool },
  { id: "seasonal", label: "Seasonal", icon: Calendar },
];

export function CategorySidebar({
  selectedCategory,
  onCategoryChange,
  onExport,
  onShowFavorites,
  onShowHistory,
  showFavorites,
  showHistory
}: CategorySidebarProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
        
        <nav className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => onCategoryChange(category.id)}
              >
                <Icon className="mr-3 w-4 h-4" />
                {category.label}
              </Button>
            );
          })}
        </nav>

        <Separator className="my-6" />

        <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <Button
            variant={showHistory ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={onShowHistory}
          >
            <History className="mr-3 w-4 h-4" />
            History
          </Button>
          <Button
            variant={showFavorites ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={onShowFavorites}
          >
            <Heart className="mr-3 w-4 h-4" />
            Favorites
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={onExport}
          >
            <Download className="mr-3 w-4 h-4" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
