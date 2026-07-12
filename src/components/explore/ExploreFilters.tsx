"use client";

import { Button } from "@heroui/react";
import { FiSearch, FiX } from "react-icons/fi";
import { categories } from "@/src/data/categories";
import type { ExploreFilters as ExploreFiltersType } from "@/src/lib/filterDestinations";

interface ExploreFiltersProps {
  draft: ExploreFiltersType;
  onChange: (next: ExploreFiltersType) => void;
  onApply: () => void;
  onClear: () => void;
}

export default function ExploreFilters({ draft, onChange, onApply, onClear }: ExploreFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 md:p-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-end">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">Search</label>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5">
            <FiSearch className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search destinations, countries…"
              value={draft.search}
              onChange={(e) => onChange({ ...draft, search: e.target.value })}
              className="w-full bg-transparent text-sm outline-none placeholder-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">Category</label>
          <select
            value={draft.category}
            onChange={(e) => onChange({ ...draft, category: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">Min price (৳)</label>
          <input
            type="number"
            min={0}
            placeholder="0"
            value={draft.minPrice ?? ""}
            onChange={(e) => onChange({ ...draft, minPrice: e.target.value ? Number(e.target.value) : null })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">Max price (৳)</label>
          <input
            type="number"
            min={0}
            placeholder="Any"
            value={draft.maxPrice ?? ""}
            onChange={(e) => onChange({ ...draft, maxPrice: e.target.value ? Number(e.target.value) : null })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
          />
        </div>

        <Button variant="primary" size="sm" className="h-[42px]" onPress={onApply}>
          Apply Filters
        </Button>
      </div>

      <button
        onClick={onClear}
        className="mt-3 flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600"
      >
        <FiX className="h-3.5 w-3.5" /> Clear all
      </button>
    </div>
  );
}