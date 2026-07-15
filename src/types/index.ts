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
  excerpt: string;
  category: "Packing" | "Trip Planning" | "Solo Travel" | "Budget Travel" | "Destinations";
  author: string;
  date: string;
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
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
}
export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface PackageReview {
  id: string;
  name: string;
  initials: string;
  rating: number;
  date: string;
  comment: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PackageDetail {
  id: string;
  title: string;
  country: string;
  location: string;
  category: string;
  price: number;
  currency: string;
  durationDays: number;
  rating: number;
  reviewCount: number;
  coverImage: string;
  galleryImages: string[];
  description: string[]; // paragraphs
  groupSize: string;
  tourType: string;
  language: string;
  bestSeason: string;
  difficulty: string;
  hotelIncluded: boolean;
  mealsIncluded: boolean;
  transport: string;
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  reviews: PackageReview[];
  faqs: FAQItem[];
}

export interface LocalPackage {
  id: string;
  title: string;
  category: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  durationDays: number;
  imageUrl?: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
}