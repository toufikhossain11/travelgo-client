"use client";

import { motion } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";
import { fadeInUp } from "@/src/lib/motion";

interface IncludedExcludedProps {
  included: string[];
  excluded: string[];
}

export default function IncludedExcluded({ included, excluded }: IncludedExcludedProps) {
  return (
    <section className="py-6 md:py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-[20px] border border-slate-100 bg-white p-6"
        >
          <h3 className="font-display font-semibold text-slate-900">What&apos;s included</h3>
          <ul className="mt-4 space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-emerald/15 text-brand-emerald-dark">
                  <FiCheck className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-[20px] border border-slate-100 bg-white p-6"
        >
          <h3 className="font-display font-semibold text-slate-900">Not included</h3>
          <ul className="mt-4 space-y-3">
            {excluded.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <FiX className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}