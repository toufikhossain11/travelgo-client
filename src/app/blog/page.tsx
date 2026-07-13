"use client";

import { useMemo, useState } from "react";
import BlogPostCard from "@/src/components/blog/BlogPostCard";
import CategoryFilter from "@/src/components/blog/CategoryFilter";
import FeaturedPost from "@/src/components/blog/FeaturedPost";
import Newsletter from "@/src/components/home/Newsletter";
import { blogPosts } from "@/src/data/blogPosts";
import type { BlogPost } from "@/src/types";

const PAGE_SIZE = 6;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogPost["category"] | "All">("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [featured, ...rest] = blogPosts;

  const filtered = useMemo(() => {
    if (activeCategory === "All") return rest;
    return rest.filter((post) => post.category === activeCategory);
  }, [activeCategory, rest]);

  const visiblePosts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleCategoryChange(category: BlogPost["category"] | "All") {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <div className="mb-8 max-w-2xl">
        <p className="font-mono-travel text-sm font-medium text-brand-sky-dark">The TravelGo journal</p>
        <h1 className="font-display mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
          Trip planning, from people who&apos;ve done it
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Packing lists, budget breakdowns and honest destination guides — written by our travelers, not AI-generated filler.
        </p>
      </div>

      <div className="mb-10">
        <FeaturedPost post={featured} />
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CategoryFilter active={activeCategory} onChange={handleCategoryChange} />
        <p className="text-sm text-slate-400">
          <span className="font-semibold text-slate-700">{filtered.length}</span> articles
        </p>
      </div>

      {visiblePosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index % PAGE_SIZE} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-14 text-center">
          <p className="font-display text-lg font-semibold text-slate-700">No articles in this category yet</p>
          <p className="mt-1 text-sm text-slate-400">Try a different category from the list above.</p>
        </div>
      )}

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-emerald hover:text-brand-emerald-dark"
          >
            Load more articles
          </button>
        </div>
      )}

      <div className="mt-16">
        <Newsletter />
      </div>
    </main>
  );
}