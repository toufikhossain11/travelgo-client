"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import { fadeInUp } from "@/src/lib/motion";
import { destinations } from "@/src/data/destinations";
import DestinationCard from "../shared/DestinationCard";
;

export default function PopularDestinations() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
      <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow="Popular destinations" title="Where travelers are heading this season" />
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Link href="/explore" className="shrink-0 text-sm font-semibold text-brand-emerald-dark">
            View all destinations →
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.slice(0, 8).map((destination, index) => (
          <DestinationCard key={destination.id} destination={destination} index={index} />
        ))}
      </div>
    </section>
  );
}
