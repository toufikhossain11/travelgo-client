"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import { FiCompass, FiStar } from "react-icons/fi";

interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  subheading: string;
}

export default function AuthLayout({ children, heading, subheading }: AuthLayoutProps) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2 lg:items-center lg:min-h-[calc(100vh-160px)]">
      {/* form side */}
      <div className="flex items-center justify-center px-5 py-10 md:px-8">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="font-display mb-6 flex items-center gap-2 text-base font-bold text-brand-emerald-dark lg:hidden"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-emerald text-white">
              <FiCompass className="h-3.5 w-3.5" />
            </span>
            TravelGo
          </Link>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="font-display text-xl font-bold text-slate-900 md:text-2xl">{heading}</h1>
            <p className="mt-1.5 text-xs text-slate-500">{subheading}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="mt-6"
          >
            <Card className="rounded-2xl p-5 sm:p-6">{children}</Card>
          </motion.div>
        </div>
      </div>

      {/* branded side — small, rounded, capped */}
      <div className="hidden items-center justify-center p-6 lg:flex lg:p-8">
        <div className="relative h-[440px] w-full max-w-sm overflow-hidden rounded-2xl shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&h=900&fit=crop"
            alt="Traveler looking over a mountain valley"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 360px, 0px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

          <div className="absolute inset-x-4 bottom-4">
            <Card className="border-white/20 bg-white/10 p-4 backdrop-blur-md">
              <div className="mb-1.5 flex gap-0.5 text-brand-amber">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-white">
                &quot;Our Bali package handled every transfer — we just showed up and explored.&quot;
              </p>
              <p className="font-mono-travel mt-2 text-[11px] text-emerald-100">Rifat Ahmed · Bali, 6-day trip</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}