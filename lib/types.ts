export interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  spice: "Not Spicy" | "Medium" | "Very Spicy";
  time: string;
  available: boolean;
  category?: string;
  isNew?: boolean;
}

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export type AvailabilityFilter = "all" | "available" | "unavailable";