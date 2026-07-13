"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/src/lib/motion";

export default function OurStory() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative h-72 overflow-hidden rounded-[24px] md:h-96"
        >
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=1000&fit=crop"
            alt="Our team planning a trip itinerary"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <p className="font-mono-travel text-sm font-medium text-brand-sky-dark">Our story</p>
          <h2 className="font-display mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
            Built by people who kept getting burned by &quot;great deal&quot; packages
          </h2>
          <p className="mt-4 text-slate-600">
            Ayesha spent years booking group trips for hospitality clients and watched the same thing happen
            over and over: glossy package listings that turned into unreachable operators the moment something
            went wrong mid-trip.
          </p>
          <p className="mt-4 text-slate-600">
            So in 2017 she started visiting operators in person before listing them — a habit that never went
            away. Today every partner on TravelGo has been vetted face-to-face, and the same small team that
            built the platform still answers support calls themselves.
          </p>
        </motion.div>
      </div>
    </section>
  );
}