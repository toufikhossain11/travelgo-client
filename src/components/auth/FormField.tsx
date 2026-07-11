"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: ReactNode;
  error?: string;
  rightElement?: ReactNode;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, icon, error, rightElement, id, ...inputProps }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
        <div
          className={`flex items-center gap-2.5 rounded-xl border bg-white px-3.5 py-2.5 transition focus-within:ring-2 ${
            error
              ? "border-red-300 focus-within:border-red-400 focus-within:ring-red-100"
              : "border-slate-200 focus-within:border-brand-emerald focus-within:ring-brand-emerald/15"
          }`}
        >
          <span className="text-slate-400">{icon}</span>
          <input
            ref={ref}
            id={id}
            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400"
            {...inputProps}
          />
          {rightElement}
        </div>
        {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;