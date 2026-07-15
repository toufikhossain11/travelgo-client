"use client";

import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import SectionHeading from "@/src/components/shared/SectionHeading";
import { fadeInUp } from "@/src/lib/motion";
import type { PackageReview } from "@/src/types";

const accentColors = ["bg-brand-emerald", "bg-brand-sky", "bg-brand-amber"];

interface ReviewsProps {
  rating: number;
  reviewCount: number;
  reviews: PackageReview[];
}

export default function Reviews({ rating, reviewCount, reviews }: ReviewsProps) {
  return (
    <section className="py-6 md:py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow="Customer Reviews" title="What travelers said" />
        <div className="flex items-center gap-3 rounded-[16px] border border-slate-100 bg-white px-4 py-3">
          <p className="font-display text-2xl font-bold text-slate-900">{rating.toFixed(1)}</p>
          <div>
            <div className="flex gap-0.5 text-brand-amber">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} className={`h-3.5 w-3.5 ${i < Math.round(rating) ? "fill-current" : ""}`} />
              ))}
            </div>
            <p className="text-xs text-slate-400">{reviewCount} reviews</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            variants={fadeInUp}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-[20px] border border-slate-100 bg-white p-5"
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white ${accentColors[index % accentColors.length]}`}
              >
                {review.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">{review.name}</p>
                <p className="text-xs text-slate-400">{review.date}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-0.5 text-brand-amber">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-current" : ""}`} />
              ))}
            </div>
            <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}