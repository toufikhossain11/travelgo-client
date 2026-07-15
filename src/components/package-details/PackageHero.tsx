"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FiClock, FiMapPin, FiStar } from "react-icons/fi";
import toast from "react-hot-toast";
import type { PackageDetail } from "@/src/types";

export default function PackageHero({ pkg }: { pkg: PackageDetail }) {
  return (
    <section className="relative h-[420px] w-full overflow-hidden md:h-[520px]">
      <Image src={pkg.coverImage} alt={pkg.title} fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-7xl px-5 pb-8 md:px-8 md:pb-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="font-mono-travel inline-flex items-center rounded-full bg-brand-amber px-3 py-1 text-xs font-semibold text-white">
              {pkg.category}
            </span>

            <h1 className="font-display mt-3 max-w-2xl text-2xl font-bold leading-tight text-white md:text-4xl">
              {pkg.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/90">
              <span className="flex items-center gap-1.5">
                <FiMapPin className="h-4 w-4" /> {pkg.location}, {pkg.country}
              </span>
              <span className="flex items-center gap-1.5">
                <FiClock className="h-4 w-4" /> {pkg.durationDays} days
              </span>
              <span className="flex items-center gap-1 text-brand-amber">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} className={`h-4 w-4 ${i < Math.round(pkg.rating) ? "fill-current" : ""}`} />
                ))}
                <span className="ml-1 font-mono-travel text-white/90">
                  {pkg.rating.toFixed(1)} ({pkg.reviewCount})
                </span>
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <p className="font-mono-travel text-2xl font-bold text-white">
                {pkg.currency}
                {pkg.price.toLocaleString()}
                <span className="ml-1 text-sm font-normal text-white/70">/ person</span>
              </p>
              <Button
                variant="primary"
                className="rounded-full !bg-brand-emerald"
                onPress={() => toast.success("Booking flow coming soon!")}
              >
                Book Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}