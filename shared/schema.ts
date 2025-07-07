import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const prompts = pgTable("prompts", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  style: text("style"),
  theme: text("theme"),
  audience: text("audience"),
  tags: text("tags").array(),
  isFavorite: boolean("is_favorite").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPromptSchema = createInsertSchema(prompts).pick({
  content: true,
  category: true,
  style: true,
  theme: true,
  audience: true,
  tags: true,
  isFavorite: true,
});

export type InsertPrompt = z.infer<typeof insertPromptSchema>;
export type Prompt = typeof prompts.$inferSelect;

export const categories = [
  "apparel",
  "accessories", 
  "home",
  "art",
  "bags",
  "stationery",
  "seasonal"
] as const;

export const styles = [
  "minimalist",
  "vintage", 
  "modern",
  "retro",
  "abstract",
  "realistic",
  "cartoon",
  "typography"
] as const;

export const themes = [
  "nature",
  "animals",
  "food",
  "travel",
  "motivational",
  "funny",
  "gaming",
  "music",
  "sports",
  "holiday"
] as const;

export const audiences = [
  "general",
  "kids",
  "teens", 
  "adults",
  "seniors",
  "parents",
  "professionals",
  "students"
] as const;
