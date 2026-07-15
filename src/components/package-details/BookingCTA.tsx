"use client";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { fadeInUp } from "@/src/lib/motion";

interface BookingCTAProps {
  title: string;
  price: number;
  currency: string;
}

export default function BookingCTA({ title, price, currency }: BookingCTAProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="flex flex-col items-center justify-between gap-6 rounded-[24px] bg-brand-emerald-dark p-8 text-center md:flex-row md:p-12 md:text-left"
      >
        <div>
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">Ready to book {title}?</h2>
          <p className="mt-2 text-sm text-emerald-100">
            Starting at {currency}
            {price.toLocaleString()} per person — limited seats each month.
          </p>
        </div>
        <button
          onClick={() => toast.success("Booking flow coming soon!")}
          className="shrink-0 rounded-full bg-brand-amber px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Book this trip
        </button>
      </motion.div>
    </section>
  );
}