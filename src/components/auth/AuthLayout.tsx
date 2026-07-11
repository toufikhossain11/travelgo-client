"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCompass, FiStar } from "react-icons/fi";

interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  subheading: string;
}

export default function AuthLayout({ children, heading, subheading }: AuthLayoutProps) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-160px)] max-w-7xl grid-cols-1 lg:grid-cols-2">
      {/* form side */}
      <div className="flex items-center justify-center px-5 py-14 md:px-8">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="font-display mb-8 flex items-center gap-2 text-lg font-bold text-brand-emerald-dark lg:hidden"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-emerald text-white">
              <FiCompass className="h-4 w-4" />
            </span>
            TravelGo
          </Link>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{heading}</h1>
            <p className="mt-2 text-sm text-slate-500">{subheading}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        </div>
      </div>

      {/* branded side */}
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1000&h=1400&fit=crop"
          alt="Traveler looking over a mountain valley"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-emerald-dark/90 via-brand-emerald-dark/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute bottom-10 left-8 right-8 rounded-[20px] border border-white/20 bg-white/10 p-6 backdrop-blur-md"
        >
          <div className="mb-2 flex gap-1 text-brand-amber">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="text-sm text-white">
            &quot;Our Bali package handled every transfer and reservation — we just showed up and explored.&quot;
          </p>
          <p className="font-mono-travel mt-3 text-xs text-emerald-100">Rifat Ahmed · Bali, 6-day trip</p>
        </motion.div>
      </div>
    </div>
  );
}