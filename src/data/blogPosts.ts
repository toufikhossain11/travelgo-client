
import { BlogPost } from "../types";

// TODO: replace with data fetched from the backend, e.g. GET /api/blog?limit=3
export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "Packing for two weeks in one carry-on",
    readTime: "6 min read",
    slug: "packing-two-weeks-carry-on",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=340&fit=crop",
  },
  {
    id: "b2",
    title: "When to actually book your flights",
    readTime: "4 min read",
    slug: "when-to-book-flights",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=340&fit=crop",
  },
  {
    id: "b3",
    title: "A first-timer's guide to solo travel",
    readTime: "8 min read",
    slug: "first-timer-solo-travel-guide",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=340&fit=crop",
  },
];
