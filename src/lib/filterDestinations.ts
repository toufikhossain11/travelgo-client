import type { Destination } from "@/src/types";

export interface ExploreFilters {
  search: string;
  category: string; // "all" or a TourCategory id (e.g. "beach")
  minPrice: number | null;
  maxPrice: number | null;
}

export type SortOption = "relevance" | "price-asc" | "price-desc" | "rating-desc";

export function filterDestinations(items: Destination[], filters: ExploreFilters): Destination[] {
  return items.filter((item) => {
    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      const matches =
        item.name.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q);
      if (!matches) return false;
    }

    if (filters.category !== "all" && item.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }

    if (filters.minPrice !== null && item.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && item.price > filters.maxPrice) return false;

    return true;
  });
}

export function sortDestinations(items: Destination[], sortBy: SortOption): Destination[] {
  const sorted = [...items];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted; // "relevance" — dummy data-র আসল order
  }
}