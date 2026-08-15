import rawData from "@/src/database/db.json";
import type { Product } from "./types";

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Beef: ["beef", "steak"],
  Chicken: ["chicken"],
  Noodles: ["noodle", "ramen", "donburi", "bowl"],
  Vegetarian: ["zucchini", "vegetable", "veggie"],
};

function inferCategory(product: { title: string; description: string }): string {
  const text = `${product.title} ${product.description}`.toLocaleLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      return category;
    }
  }
  return "Other";
}

function normalizeProducts(): Product[] {
  const data = rawData as {
    products: Omit<Product, "category" | "isNew">[];
    New: Omit<Product, "category" | "isNew">[];
  };

  const newIds = new Set(data.New.map((item) => item.id));

  return data.products.map((product) => ({
    ...product,
    category: (product as Product).category ?? inferCategory(product),
    isNew: newIds.has(product.id),
  }));
}

export const allProducts: Product[] = normalizeProducts();

export function getAllCategories(): string[] {
  const categories = new Set(allProducts.map((p) => p.category ?? "Other"));
  return Array.from(categories).sort();
}

export function getPriceRange(): { min: number; max: number } {
  const prices = allProducts.map((p) => parseFloat(p.price));
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}