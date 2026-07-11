// import type { TourCategory } from "@/types";

import { TourCategory } from "../types";

// TODO: replace with data fetched from the backend, e.g. GET /api/categories
export const categories: TourCategory[] = [
  { id: "adventure", name: "Adventure", icon: "adventure", tripCount: 142 },
  { id: "beach", name: "Beach", icon: "beach", tripCount: 98 },
  { id: "cultural", name: "Cultural", icon: "cultural", tripCount: 210 },
  { id: "wildlife", name: "Wildlife", icon: "wildlife", tripCount: 67 },
  { id: "mountain", name: "Mountain", icon: "mountain", tripCount: 85 },
  { id: "cruise", name: "Cruise", icon: "cruise", tripCount: 54 },
];
