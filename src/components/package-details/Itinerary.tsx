"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/src/components/shared/SectionHeading";
import { fadeInUp } from "@/src/lib/motion";
import type { ItineraryDay } from "@/src/types";

export default function Itinerary({ itinerary }: { itinerary: ItineraryDay[] }) {
  return (
    <section className="py-6 md:py-8">
      <SectionHeading eyebrow="Travel Plan" title="Day-by-day itinerary" />

      <div className="relative mt-8">
        <div className="absolute left-4 top-2 bottom-2 w-px border-l-2 border-dashed border-brand-sky/40" />

        <div className="space-y-6">
          {itinerary.map((item, index) => (
            <motion.div
              key={item.day}
              variants={fadeInUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="relative flex gap-5 pl-1"
            >
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-emerald text-xs font-bold text-white">
                {item.day}
              </span>
              <div className="flex-1 rounded-[16px] border border-slate-100 bg-white p-5">
                <p className="font-mono-travel text-xs font-semibold text-brand-emerald-dark">Day {item.day}</p>
                <h3 className="font-display mt-1 font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}