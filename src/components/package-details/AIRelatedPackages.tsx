"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import DestinationCard from "@/src/components/shared/DestinationCard";
import { destinations } from "@/src/data/destinations";
import type { Destination } from "@/src/types";

interface AIRelatedPackagesProps {
  currentId: string;
  category: string;
}

export default function AIRelatedPackages({ currentId, category }: AIRelatedPackagesProps) {
  const [related, setRelated] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchRelated() {
      setLoading(true);
      try {
        const res = await fetch("/api/ai/related", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentId }),
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        const matched = data.ids
          .map((id: string) => destinations.find((d) => d.id === id))
          .filter(Boolean) as Destination[];

        if (!cancelled) setRelated(matched);
      } catch {
        // fallback: category-matching, same as before, so the section never breaks
        if (!cancelled) {
          const sameCategory = destinations.filter((d) => d.id !== currentId && d.category === category);
          const others = destinations.filter((d) => d.id !== currentId && d.category !== category);
          setRelated([...sameCategory, ...others].slice(0, 4));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRelated();
    return () => {
      cancelled = true;
    };
  }, [currentId, category]);

  return (
    <section className="bg-[#F0F9FF] py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-mono-travel inline-flex items-center gap-1.5 rounded-full bg-brand-amber/15 px-3 py-1 text-xs font-medium text-brand-amber-dark">
            <HiSparkles className="h-3.5 w-3.5" /> AI picked for you
          </span>
        </div>
        <h2 className="font-display text-2xl font-semibold text-slate-900 md:text-3xl">Related tour packages</h2>
        <p className="mt-2 max-w-lg text-sm text-slate-500">
          Matched on pace, price range and traveler fit — not just category.
        </p>

        {loading ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-[20px] bg-slate-100" />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {related.map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}