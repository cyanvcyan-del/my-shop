import type { Product } from "./types";

function normalize(value: string): string {
  return value.toLocaleLowerCase().trim();
}

export function searchProducts(query: string, products: Product[]): Product[] {
  const q = normalize(query);
  if (!q) return [];

  const scored = products
    .map((product) => {
      const title = normalize(product.title);
      const description = normalize(product.description);
      const category = normalize(product.category ?? "");
      const spice = normalize(product.spice);

      let score = 0;

      if (title === q) score += 100;
      else if (title.startsWith(q)) score += 60;
      else if (title.includes(q)) score += 40;

      if (category.includes(q)) score += 20;
      if (spice.includes(q)) score += 10;
      if (description.includes(q)) score += 5;

      return { product, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map((entry) => entry.product);
}