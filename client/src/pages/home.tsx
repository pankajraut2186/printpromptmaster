import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { CategorySidebar } from "@/components/category-sidebar";
import { PromptGenerator } from "@/components/prompt-generator";
import { PromptCard } from "@/components/prompt-card";
import { ExportModal } from "@/components/export-modal";
import { useToast } from "@/hooks/use-toast";
import { Bell, Settings, User, Zap, RotateCcw, Filter } from "lucide-react";
import { type Prompt } from "@shared/schema";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("any");
  const [selectedTheme, setSelectedTheme] = useState("any");
  const [selectedAudience, setSelectedAudience] = useState("general");
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [applyFilters, setApplyFilters] = useState(false);

  const { toast } = useToast();

  const { data: allPrompts = [], isLoading, refetch } = useQuery<Prompt[]>({
    queryKey: [
      "/api/prompts",
      selectedCategory,
      showFavorites
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") params.append("category", selectedCategory);
      if (showFavorites) params.append("favorite", "true");
      
      const response = await fetch(`/api/prompts?${params}`);
      if (!response.ok) throw new Error("Failed to fetch prompts");
      return response.json();
    }
  });

  // Filter prompts based on user preference
  const prompts = applyFilters ? allPrompts.filter(prompt => {
    if (selectedStyle !== "any" && prompt.style !== selectedStyle) return false;
    if (selectedTheme !== "any" && prompt.theme !== selectedTheme) return false;
    if (selectedAudience !== "general" && prompt.audience !== selectedAudience) return false;
    return true;
  }) : allPrompts;

  const handleQuickGenerate = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: selectedCategory === "all" ? undefined : selectedCategory,
          style: selectedStyle === "any" ? undefined : selectedStyle,
          theme: selectedTheme === "any" ? undefined : selectedTheme,
          audience: selectedAudience === "general" ? undefined : selectedAudience,
          count: 1
        })
      });
      
      if (!response.ok) throw new Error("Failed to generate prompt");
      
      await refetch();
      toast({
        title: "Success",
        description: "New prompt generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate prompt. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyPrompt = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied",
        description: "Prompt copied to clipboard!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy prompt to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = async (id: number) => {
    try {
      const response = await fetch(`/api/prompts/${id}/favorite`, {
        method: "PATCH",
      });
      
      if (!response.ok) throw new Error("Failed to update favorite");
      
      await refetch();
      toast({
        title: "Success",
        description: "Favorite status updated!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorite status.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Zap className="text-white w-4 h-4" />
                </div>
                <h1 className="ml-3 text-xl font-bold text-gray-900">POD Prompt Generator</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onExport={() => setShowExportModal(true)}
              onShowFavorites={() => setShowFavorites(!showFavorites)}
              onShowHistory={() => setShowHistory(!showHistory)}
              showFavorites={showFavorites}
              showHistory={showHistory}
            />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Generation Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <PromptGenerator
                selectedStyle={selectedStyle}
                selectedTheme={selectedTheme}
                selectedAudience={selectedAudience}
                onStyleChange={setSelectedStyle}
                onThemeChange={setSelectedTheme}
                onAudienceChange={setSelectedAudience}
                onGenerate={handleQuickGenerate}
                onBulkGenerate={async () => {
                  try {
                    const response = await fetch("/api/generate", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        category: selectedCategory === "all" ? undefined : selectedCategory,
                        style: selectedStyle === "any" ? undefined : selectedStyle,
                        theme: selectedTheme === "any" ? undefined : selectedTheme,
                        audience: selectedAudience === "general" ? undefined : selectedAudience,
                        count: 10
                      })
                    });
                    
                    if (!response.ok) throw new Error("Failed to generate prompts");
                    
                    await refetch();
                    toast({
                      title: "Success",
                      description: "10 new prompts generated successfully!",
                    });
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Failed to generate prompts. Please try again.",
                      variant: "destructive",
                    });
                  }
                }}
                onSurpriseMe={async () => {
                  try {
                    const response = await fetch("/api/generate", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ count: 1 })
                    });
                    
                    if (!response.ok) throw new Error("Failed to generate surprise prompt");
                    
                    await refetch();
                    toast({
                      title: "Surprise!",
                      description: "Random prompt generated for you!",
                    });
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Failed to generate surprise prompt. Please try again.",
                      variant: "destructive",
                    });
                  }
                }}
              />
            </div>

            {/* Generated Prompts */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {showFavorites ? "Favorite Prompts" : showHistory ? "Prompt History" : "Generated Prompts"}
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {prompts.length} {prompts.length === 1 ? "prompt" : "prompts"}
                  </span>
                  <Button
                    variant={applyFilters ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setApplyFilters(!applyFilters)}
                    title={applyFilters ? "Show all prompts" : "Filter prompts by style/theme"}
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => refetch()}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                        <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                        <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : prompts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No prompts generated yet</h3>
                  <p className="text-gray-500 mb-4">Click "Generate Prompt" to create your first design prompt.</p>
                  <Button onClick={handleQuickGenerate}>
                    Generate Your First Prompt
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {prompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      onCopy={handleCopyPrompt}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleQuickGenerate}
          className="w-14 h-14 bg-accent hover:bg-accent/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          size="icon"
        >
          <Zap className="w-6 h-6" />
        </Button>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        prompts={prompts}
      />
    </div>
  );
}
