"use client";

import { Testimonial } from "@/src/types";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import SectionHeading from "../shared/SectionHeading";
import { testimonials } from "@/src/data/testimonials";
import { fadeInUp } from "@/src/lib/motion";


const accentMap: Record<Testimonial["accent"], string> = {
  emerald: "bg-brand-emerald",
  sky: "bg-brand-sky",
  amber: "bg-brand-amber",
};

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
      <SectionHeading eyebrow="Traveler stories" title="What people say after they land back home" />

      <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            variants={fadeInUp}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-[20px] border border-slate-100 bg-white p-6"
          >
            <div className="mb-3 flex gap-1 text-brand-amber">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} className={`h-4 w-4 ${i < Math.round(testimonial.rating) ? "fill-current" : ""}`} />
              ))}
            </div>
            <p className="text-sm text-slate-600">&quot;{testimonial.quote}&quot;</p>
            <div className="mt-5 flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white ${accentMap[testimonial.accent]}`}
              >
                {testimonial.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{testimonial.name}</p>
                <p className="text-xs text-slate-400">{testimonial.trip}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
