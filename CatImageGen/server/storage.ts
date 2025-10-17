import { type User, type InsertUser, type CatImage, type InsertCatImage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCatImages(): Promise<CatImage[]>;
  getCatImage(id: string): Promise<CatImage | undefined>;
  createCatImage(catImage: InsertCatImage): Promise<CatImage>;
  updateCatImage(id: string, updates: Partial<CatImage>): Promise<CatImage | undefined>;
  deleteCatImage(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private catImages: Map<string, CatImage>;

  constructor() {
    this.users = new Map();
    this.catImages = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCatImages(): Promise<CatImage[]> {
    return Array.from(this.catImages.values()).sort(
      (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getCatImage(id: string): Promise<CatImage | undefined> {
    return this.catImages.get(id);
  }

  async createCatImage(insertCatImage: InsertCatImage): Promise<CatImage> {
    const id = randomUUID();
    const catImage: CatImage = {
      ...insertCatImage,
      id,
      thumbnailUrl: insertCatImage.thumbnailUrl || null,
      liked: insertCatImage.liked || false,
      createdAt: new Date(),
    };
    this.catImages.set(id, catImage);
    return catImage;
  }

  async updateCatImage(id: string, updates: Partial<CatImage>): Promise<CatImage | undefined> {
    const existing = this.catImages.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.catImages.set(id, updated);
    return updated;
  }

  async deleteCatImage(id: string): Promise<boolean> {
    return this.catImages.delete(id);
  }
}

export const storage = new MemStorage();
