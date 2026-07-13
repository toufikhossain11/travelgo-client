"use client";

import type { BlogPost } from "@/src/types";

const categories: Array<BlogPost["category"] | "All"> = [
  "All",
  "Packing",
  "Trip Planning",
  "Solo Travel",
  "Budget Travel",
  "Destinations",
];

interface CategoryFilterProps {
  active: BlogPost["category"] | "All";
  onChange: (category: BlogPost["category"] | "All") => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            active === category
              ? "bg-brand-emerald text-white"
              : "border border-slate-200 text-slate-600 hover:border-slate-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}