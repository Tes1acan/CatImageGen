import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCatImageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate a new cat image
  app.post("/api/cat-images/generate", async (req, res) => {
    try {
      // Fetch a random cat image from The Cat API
      const apiKey = process.env.CAT_API_KEY;
      if (!apiKey) {
        throw new Error("CAT_API_KEY environment variable is not set");
      }

      const catApiResponse = await fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=false&order=RANDOM&page=0&limit=1", {
        headers: {
          'x-api-key': apiKey
        }
      });

      if (!catApiResponse.ok) {
        throw new Error(`Cat API error: ${catApiResponse.status}`);
      }

      const catData = await catApiResponse.json();
      
      if (!catData || catData.length === 0) {
        throw new Error("No cat image returned from API");
      }

      const catImageData = catData[0];
      
      // Generate a creative title for the cat
      const titles = [
        "Adorable Whiskers",
        "Fluffy Explorer",
        "Curious Kitten",
        "Majestic Feline",
        "Sleepy Companion",
        "Playful Paws",
        "Royal Cat",
        "Sweet Dreams",
        "Adventure Seeker",
        "Cozy Cuddles"
      ];
      
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      
      const newCatImage = await storage.createCatImage({
        title: randomTitle,
        imageUrl: catImageData.url,
        thumbnailUrl: catImageData.url,
        liked: false,
      });

      res.json(newCatImage);
    } catch (error) {
      console.error("Error generating cat image:", error);
      res.status(500).json({ 
        message: "Failed to generate cat image", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Get all cat images
  app.get("/api/cat-images", async (req, res) => {
    try {
      const images = await storage.getCatImages();
      res.json(images);
    } catch (error) {
      console.error("Error fetching cat images:", error);
      res.status(500).json({ message: "Failed to fetch cat images" });
    }
  });

  // Get a specific cat image
  app.get("/api/cat-images/:id", async (req, res) => {
    try {
      const image = await storage.getCatImage(req.params.id);
      if (!image) {
        return res.status(404).json({ message: "Cat image not found" });
      }
      res.json(image);
    } catch (error) {
      console.error("Error fetching cat image:", error);
      res.status(500).json({ message: "Failed to fetch cat image" });
    }
  });

  // Update a cat image (like/unlike)
  app.patch("/api/cat-images/:id", async (req, res) => {
    try {
      const updateSchema = z.object({
        liked: z.boolean().optional(),
        title: z.string().optional(),
      });
      
      const updates = updateSchema.parse(req.body);
      const updated = await storage.updateCatImage(req.params.id, updates);
      
      if (!updated) {
        return res.status(404).json({ message: "Cat image not found" });
      }
      
      res.json(updated);
    } catch (error) {
      console.error("Error updating cat image:", error);
      res.status(500).json({ message: "Failed to update cat image" });
    }
  });

  // Delete a cat image
  app.delete("/api/cat-images/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteCatImage(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Cat image not found" });
      }
      res.json({ message: "Cat image deleted successfully" });
    } catch (error) {
      console.error("Error deleting cat image:", error);
      res.status(500).json({ message: "Failed to delete cat image" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
