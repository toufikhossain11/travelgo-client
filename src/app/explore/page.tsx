"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import DestinationCard from "@/src/components/shared/DestinationCard";
import ExploreFilters from "@/src/components/explore/ExploreFilters";
import SortDropdown from "@/src/components/explore/SortDropdown";
import { destinations } from "@/src/data/destinations";
import {
  filterDestinations,
  sortDestinations,
  type ExploreFilters as ExploreFiltersType,
  type SortOption,
} from "@/src/lib/filterDestinations";

const PAGE_SIZE = 4;

const emptyFilters: ExploreFiltersType = {
  search: "",
  category: "all",
  minPrice: null,
  maxPrice: null,
};

function ExplorePageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";

  const [draft, setDraft] = useState<ExploreFiltersType>({ ...emptyFilters, category: initialCategory });
  const [applied, setApplied] = useState<ExploreFiltersType>({ ...emptyFilters, category: initialCategory });
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // effect ছাড়াই — filters/sort বদলালে render-এর সময়ই visibleCount reset হয়ে যায়
  const [trackedKey, setTrackedKey] = useState({ applied, sortBy });
  if (trackedKey.applied !== applied || trackedKey.sortBy !== sortBy) {
    setTrackedKey({ applied, sortBy });
    setVisibleCount(PAGE_SIZE);
  }

  const results = useMemo(() => {
    const filtered = filterDestinations(destinations, applied);
    return sortDestinations(filtered, sortBy);
  }, [applied, sortBy]);

  const visibleResults = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <div className="mb-8">
        <p className="font-mono-travel text-sm font-medium text-brand-sky-dark">Explore</p>
        <h1 className="font-display mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
          Find your next destination
        </h1>
        <p className="mt-2 max-w-xl text-sm text-slate-500">
          Search and filter {destinations.length}+ curated tour packages across 40+ countries.
        </p>
      </div>

      <ExploreFilters
        draft={draft}
        onChange={setDraft}
        onApply={() => setApplied(draft)}
        onClear={() => {
          setDraft(emptyFilters);
          setApplied(emptyFilters);
        }}
      />

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-slate-800">{results.length}</span> results found
        </p>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {visibleResults.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleResults.map((destination, index) => (
            <DestinationCard key={destination.id} destination={destination} index={index % PAGE_SIZE} />
          ))}
        </div>
      ) : (
        <div className="mt-14 flex flex-col items-center text-center">
          <p className="font-display text-lg font-semibold text-slate-700">No destinations match your filters</p>
          <p className="mt-1 text-sm text-slate-400">Try adjusting your search or clearing some filters.</p>
        </div>
      )}

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-emerald hover:text-brand-emerald-dark"
          >
            Load more
          </button>
        </div>
      )}
    </main>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={null}>
      <ExplorePageContent />
    </Suspense>
  );
}