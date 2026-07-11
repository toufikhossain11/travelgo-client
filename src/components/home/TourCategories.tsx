"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiActivity, FiAnchor, FiCompass, FiFeather, FiSun, FiTrendingUp } from "react-icons/fi";
import { TourCategory } from "@/src/types";
import SectionHeading from "../shared/SectionHeading";
import { categories } from "@/src/data/categories";
import { scaleIn } from "@/src/lib/motion";

const iconMap: Record<TourCategory["icon"], typeof FiCompass> = {
  adventure: FiActivity,
  beach: FiSun,
  cultural: FiCompass,
  wildlife: FiFeather,
  mountain: FiTrendingUp,
  cruise: FiAnchor,
};

export default function TourCategories() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
      <SectionHeading eyebrow="Browse by category" title="Find your kind of trip" />

      <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category, index) => {
          const Icon = iconMap[category.icon];
          return (
            <motion.div
              key={category.id}
              variants={scaleIn}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <Link
                href={`/explore?category=${category.id}`}
                className="flex flex-col items-center gap-2 rounded-[20px] border border-slate-100 bg-white p-5 text-center transition hover:border-brand-emerald/40 hover:shadow-sm"
              >
                <Icon className="h-6 w-6 text-brand-emerald-dark" />
                <span className="text-sm font-semibold text-slate-800">{category.name}</span>
                <span className="font-mono-travel text-xs text-slate-400">{category.tripCount} trips</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
