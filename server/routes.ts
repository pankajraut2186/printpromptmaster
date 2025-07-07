import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPromptSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get prompts with optional filters
  app.get("/api/prompts", async (req, res) => {
    try {
      const filters = {
        category: req.query.category as string,
        style: req.query.style as string,
        theme: req.query.theme as string,
        audience: req.query.audience as string,
        isFavorite: req.query.favorite === "true" ? true : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
      };

      const prompts = await storage.getPrompts(filters);
      res.json(prompts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch prompts" });
    }
  });

  // Get single prompt
  app.get("/api/prompts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const prompt = await storage.getPrompt(id);
      
      if (!prompt) {
        return res.status(404).json({ error: "Prompt not found" });
      }

      res.json(prompt);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch prompt" });
    }
  });

  // Create new prompt
  app.post("/api/prompts", async (req, res) => {
    try {
      const validatedData = insertPromptSchema.parse(req.body);
      const prompt = await storage.createPrompt(validatedData);
      res.status(201).json(prompt);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid prompt data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create prompt" });
    }
  });

  // Toggle favorite status
  app.patch("/api/prompts/:id/favorite", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const prompt = await storage.toggleFavorite(id);
      
      if (!prompt) {
        return res.status(404).json({ error: "Prompt not found" });
      }

      res.json(prompt);
    } catch (error) {
      res.status(500).json({ error: "Failed to update favorite status" });
    }
  });

  // Delete prompt
  app.delete("/api/prompts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deletePrompt(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Prompt not found" });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete prompt" });
    }
  });

  // Get favorites
  app.get("/api/favorites", async (req, res) => {
    try {
      const favorites = await storage.getFavoritePrompts();
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch favorites" });
    }
  });

  // Get history
  app.get("/api/history", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const history = await storage.getPromptHistory(limit);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch history" });
    }
  });

  // Generate prompts endpoint
  app.post("/api/generate", async (req, res) => {
    try {
      const { category, style, theme, audience, count = 1 } = req.body;
      
      const { generatePrompts } = await import("../client/src/lib/prompt-templates");
      const generatedPrompts = generatePrompts({
        category: category || "apparel",
        style: style || "minimalist",
        theme: theme || "nature",
        audience: audience || "general",
        count: Math.min(count, 10) // Limit to 10 at once
      });

      // Save generated prompts to storage
      const savedPrompts = [];
      for (const promptData of generatedPrompts) {
        const prompt = await storage.createPrompt(promptData);
        savedPrompts.push(prompt);
      }

      res.json(savedPrompts);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate prompts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
