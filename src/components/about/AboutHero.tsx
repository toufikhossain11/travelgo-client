"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ECFDF5 0%, #F0F9FF 60%, #F8FAFC 100%)" }}
    >
      <div className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8 md:py-28">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono-travel inline-flex items-center gap-2 rounded-full bg-brand-amber/15 px-3 py-1.5 text-xs font-medium text-brand-amber-dark"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-amber" />
          Est. 2017 · Dhaka, Bangladesh
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-display mt-5 text-3xl font-bold leading-tight text-slate-900 md:text-5xl"
        >
          We started TravelGo because trip planning used to feel like a second job.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-lg text-slate-600"
        >
          Nine years later, we are still a small team that personally vets every operator on the platform —
          and still answers the phone at 2am when a flight gets cancelled.
        </motion.p>
      </div>
    </section>
  );
}