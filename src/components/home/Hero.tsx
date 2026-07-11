"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FiCalendar, FiMapPin, FiSearch } from "react-icons/fi";

const trending = ["Bali", "Swiss Alps", "Marrakech", "Kyoto"];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ECFDF5 0%, #F0F9FF 55%, #F8FAFC 100%)" }}
    >
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono-travel inline-flex items-center gap-2 rounded-full bg-brand-amber/15 px-3 py-1.5 text-xs font-medium text-brand-amber-dark"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-amber" />
            1,200+ verified trip packages
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-display mt-5 text-4xl font-bold leading-[1.08] text-slate-900 md:text-5xl"
          >
            Plan trips that feel like <span className="text-brand-emerald-dark">discoveries</span>, not itineraries.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-5 max-w-lg text-lg text-slate-600"
          >
            Search, compare and book curated tour packages from local experts across 40+ countries — flights,
            stays and experiences, sorted for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-8 flex flex-col gap-2 rounded-[20px] border border-slate-100 bg-white p-2 shadow-sm md:flex-row md:items-stretch"
          >
            <div className="flex flex-1 items-center gap-3 border-b border-dashed border-slate-200 px-4 py-3 md:border-b-0 md:border-r">
              <FiMapPin className="h-4 w-4 shrink-0 text-brand-sky" />
              <div className="flex-1">
                <p className="font-mono-travel text-[11px] uppercase tracking-wide text-slate-400">Destination</p>
                <input
                  type="text"
                  placeholder="Where to — Bali, Kyoto, Santorini…"
                  className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-slate-400 outline-none"
                />
              </div>
            </div>
            <div className="flex flex-1 items-center gap-3 px-4 py-3">
              <FiCalendar className="h-4 w-4 shrink-0 text-brand-sky" />
              <div className="flex-1">
                <p className="font-mono-travel text-[11px] uppercase tracking-wide text-slate-400">Travel dates</p>
                <input
                  type="text"
                  placeholder="Add dates"
                  className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-slate-400 outline-none"
                />
              </div>
            </div>
            <Button variant="primary" className="flex items-center justify-center gap-2 rounded-2xl">
              <FiSearch className="h-4 w-4" /> Search trips
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="font-mono-travel mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500"
          >
            <span>Trending —</span>
            {trending.map((place) => (
              <Link key={place} href="#" className="transition hover:text-slate-800">
                {place}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* side animation: two floating destination photos + flight-route line */}
        <div className="relative hidden h-[420px] lg:block">
          <motion.div
            className="absolute right-16 top-0 h-72 w-56 overflow-hidden rounded-[24px] border-4 border-white shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, -14, 0] }}
            transition={{
              opacity: { duration: 0.6 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=650&fit=crop"
              alt="Beach cliffside view in Bali"
              fill
              className="object-cover"
              sizes="224px"
              priority
            />
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-4 h-64 w-52 overflow-hidden rounded-[24px] border-4 border-white shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, 14, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.15 },
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=480&h=600&fit=crop"
              alt="Traditional streets of Kyoto"
              fill
              className="object-cover"
              sizes="208px"
            />
          </motion.div>

          <svg className="pointer-events-none absolute inset-0" viewBox="0 0 400 420" fill="none" aria-hidden="true">
            <path
              d="M40 380 C 140 360, 220 120, 360 60"
              stroke="#0EA5E9"
              strokeWidth="2"
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
            <circle cx="40" cy="380" r="6" fill="#10B981" />
            <circle cx="360" cy="60" r="6" fill="#F59E0B" />
          </svg>
        </div>
      </div>
    </section>
  );
}
