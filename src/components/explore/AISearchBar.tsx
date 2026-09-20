"use client";

import { useState, type FormEvent } from "react";
import { HiSparkles } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import type { ExploreFilters } from "@/src/lib/filterDestinations";

interface AISearchBarProps {
  onParsed: (filters: Partial<ExploreFilters>) => void;
}

export default function AISearchBar({ onParsed }: AISearchBarProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<Partial<ExploreFilters> | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError(null);
    setLastResult(null);

    try {
      const res = await fetch("/api/ai/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Something went wrong");

      setLastResult(data.filters);
      onParsed(data.filters);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't understand that search.");
    } finally {
      setLoading(false);
    }
  }

  const chips: { label: string }[] = [];
  if (lastResult) {
    if (lastResult.category && lastResult.category !== "all") chips.push({ label: `Category: ${lastResult.category}` });
    if (lastResult.maxPrice) chips.push({ label: `Max ৳${lastResult.maxPrice.toLocaleString()}` });
    if (lastResult.minPrice) chips.push({ label: `Min ৳${lastResult.minPrice.toLocaleString()}` });
    if (lastResult.minDuration || lastResult.maxDuration) {
      chips.push({
        label: `${lastResult.minDuration ?? "0"}–${lastResult.maxDuration ?? "∞"} days`,
      });
    }
    if (lastResult.search) chips.push({ label: `"${lastResult.search}"` });
  }

  return (
    <div className="mb-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-2xl border border-brand-emerald/40 bg-white px-4 py-3"
      >
        <HiSparkles className="h-4 w-4 shrink-0 text-brand-emerald-dark" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try: beach trip under 70k for a week…"
          className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder-slate-400"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          aria-label="AI search"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-emerald text-white transition disabled:opacity-50"
        >
          <FiSearch className="h-4 w-4" />
        </button>
      </form>

      {loading && <p className="mt-2 text-xs text-slate-400">Understanding your search…</p>}
      {error && <p className="mt-2 text-xs font-medium text-red-500">{error}</p>}

      {chips.length > 0 && !loading && (
        <div className="mt-2 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip.label}
              className="font-mono-travel rounded-full bg-brand-emerald/10 px-3 py-1 text-xs font-medium text-brand-emerald-dark"
            >
              {chip.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}