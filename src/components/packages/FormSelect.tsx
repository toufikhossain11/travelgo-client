"use client";

import type { SelectHTMLAttributes } from "react";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export default function FormSelect({ label, id, children, ...selectProps }: FormSelectProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        id={id}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/15"
        {...selectProps}
      >
        {children}
      </select>
    </div>
  );
}