export interface Destination {
  id: string;
  name: string;
  country: string;
  category: "Adventure" | "Beach" | "Cultural" | "Wildlife" | "Mountain" | "Cruise";
  price: number;
  currency: string;
  durationDays: number;
  rating: number;
  reviewCount: number;
  image: string;
  shortDescription: string;
}

export interface Testimonial {
  id: string;
  name: string;
  trip: string;
  rating: number;
  quote: string;
  initials: string;
  accent: "emerald" | "sky" | "amber";
}

export interface BlogPost {
  id: string;
  title: string;
  readTime: string;
  slug: string;
  image: string;
}

export interface TourCategory {
  id: string;
  name: string;
  icon: "adventure" | "beach" | "cultural" | "wildlife" | "mountain" | "cruise";
  tripCount: number;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
}
