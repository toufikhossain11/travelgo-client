"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/src/lib/motion";


export default function CTABanner() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8 md:pb-20">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="rounded-[24px] border border-slate-100 p-10 text-center md:p-14"
        style={{
          backgroundImage: "radial-gradient(circle, #E2E8F0 1.5px, transparent 1.5px)",
          backgroundSize: "10px 10px",
        }}
      >
        <h2 className="font-display text-2xl font-bold text-slate-900 md:text-4xl">
          Ready for your next adventure?
        </h2>
        <p className="mt-3 text-slate-600">
          Browse 1,200+ packages or tell us what you&apos;re after and we&apos;ll shortlist it for you.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/explore"
            className="rounded-full bg-brand-emerald px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Explore destinations
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-slate-200 px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
          >
            Talk to a trip planner
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
