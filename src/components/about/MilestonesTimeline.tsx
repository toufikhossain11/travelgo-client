"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/src/components/shared/SectionHeading";
import { milestones } from "@/src/data/milestones";
import { fadeInUp } from "@/src/lib/motion";

export default function MilestonesTimeline() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-20">
      <SectionHeading eyebrow="Our journey" title="Nine years, one trip at a time" align="center" />

      <div className="relative mt-12">
        <div className="absolute left-[15px] top-2 bottom-2 w-px border-l-2 border-dashed border-brand-sky/40 md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-10">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              variants={fadeInUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className={`relative flex items-start gap-5 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-10" : "md:ml-auto md:pl-10"
              }`}
            >
              <span className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-emerald text-white md:absolute md:top-1 md:left-1/2 md:-translate-x-1/2 md:mt-0">
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>
              <div className="rounded-[16px] border border-slate-100 bg-white p-5">
                <p className="font-mono-travel text-xs font-semibold text-brand-emerald-dark">{milestone.year}</p>
                <h3 className="font-display mt-1 font-semibold text-slate-900">{milestone.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}