"use client";

import { stats } from "@/src/data/stats";
import { fadeInUp } from "@/src/lib/motion";
import { motion } from "framer-motion";


export default function StatsSection() {
  return (
    <section className="bg-brand-emerald py-14 md:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 text-center md:grid-cols-4 md:px-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            variants={fadeInUp}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <p className="font-display text-3xl font-bold text-white md:text-4xl">{stat.value}</p>
            <p className="mt-1 text-sm text-emerald-100">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
