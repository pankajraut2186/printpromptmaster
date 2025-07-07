import { type Prompt, type InsertPrompt } from "@shared/schema";

export interface IStorage {
  getPrompts(filters?: {
    category?: string;
    style?: string;
    theme?: string;
    audience?: string;
    isFavorite?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Prompt[]>;
  getPrompt(id: number): Promise<Prompt | undefined>;
  createPrompt(prompt: InsertPrompt): Promise<Prompt>;
  updatePrompt(id: number, updates: Partial<Prompt>): Promise<Prompt | undefined>;
  deletePrompt(id: number): Promise<boolean>;
  getFavoritePrompts(): Promise<Prompt[]>;
  toggleFavorite(id: number): Promise<Prompt | undefined>;
  getPromptHistory(limit?: number): Promise<Prompt[]>;
}

export class MemStorage implements IStorage {
  private prompts: Prompt[] = [];
  private nextId = 1;
  async getPrompts(filters?: {
    category?: string;
    style?: string;
    theme?: string;
    audience?: string;
    isFavorite?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Prompt[]> {
    let results = [...this.prompts];

    // Apply all filters
    if (filters) {
      if (filters.category && filters.category !== "all") {
        results = results.filter((p: Prompt) => p.category === filters.category);
      }
      if (filters.style && filters.style !== "any") {
        results = results.filter((p: Prompt) => p.style === filters.style);
      }
      if (filters.theme && filters.theme !== "any") {
        results = results.filter((p: Prompt) => p.theme === filters.theme);
      }
      if (filters.audience && filters.audience !== "general") {
        results = results.filter((p: Prompt) => p.audience === filters.audience);
      }
      if (filters.isFavorite !== undefined) {
        results = results.filter((p: Prompt) => p.isFavorite === filters.isFavorite);
      }
    }

    // Sort by creation date (newest first)
    results.sort((a: Prompt, b: Prompt) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );

    if (filters?.offset) {
      results = results.slice(filters.offset);
    }
    if (filters?.limit) {
      results = results.slice(0, filters.limit);
    }

    return results;
  }

  async getPrompt(id: number): Promise<Prompt | undefined> {
    return this.prompts.find(p => p.id === id);
  }

  async createPrompt(insertPrompt: InsertPrompt): Promise<Prompt> {
    const prompt: Prompt = {
      id: this.nextId++,
      content: insertPrompt.content,
      category: insertPrompt.category,
      style: insertPrompt.style || null,
      theme: insertPrompt.theme || null,
      audience: insertPrompt.audience || null,
      tags: insertPrompt.tags || null,
      isFavorite: insertPrompt.isFavorite || false,
      createdAt: new Date(),
    };
    this.prompts.push(prompt);
    return prompt;
  }

  async updatePrompt(id: number, updates: Partial<Prompt>): Promise<Prompt | undefined> {
    const index = this.prompts.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    this.prompts[index] = { ...this.prompts[index], ...updates };
    return this.prompts[index];
  }

  async deletePrompt(id: number): Promise<boolean> {
    const index = this.prompts.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.prompts.splice(index, 1);
    return true;
  }

  async getFavoritePrompts(): Promise<Prompt[]> {
    return this.getPrompts({ isFavorite: true });
  }

  async toggleFavorite(id: number): Promise<Prompt | undefined> {
    const prompt = await this.getPrompt(id);
    if (!prompt) return undefined;

    return this.updatePrompt(id, { isFavorite: !prompt.isFavorite });
  }

  async getPromptHistory(limit = 50): Promise<Prompt[]> {
    return this.getPrompts({ limit });
  }
}

export const storage = new MemStorage();
