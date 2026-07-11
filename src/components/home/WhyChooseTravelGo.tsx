"use client";

import { motion } from "framer-motion";
import { FiDollarSign, FiHeadphones, FiLock, FiShield } from "react-icons/fi";
import SectionHeading from "../shared/SectionHeading";
import { fadeInUp } from "@/src/lib/motion";
// import SectionHeading from "@/components/shared/SectionHeading";
// import { fadeInUp } from "@/lib/motion";

const features = [
  {
    icon: FiShield,
    title: "Verified local hosts",
    description: "Every package is run by a licensed local operator we've vetted in person.",
    bg: "bg-brand-emerald/10",
    fg: "text-brand-emerald-dark",
  },
  {
    icon: FiDollarSign,
    title: "Best price guarantee",
    description: "Find it cheaper elsewhere within 48 hours and we'll match it, no questions.",
    bg: "bg-brand-sky/10",
    fg: "text-brand-sky-dark",
  },
  {
    icon: FiHeadphones,
    title: "24/7 trip support",
    description: "A real person picks up when a flight's delayed or plans change mid-trip.",
    bg: "bg-brand-amber/15",
    fg: "text-brand-amber-dark",
  },
  {
    icon: FiLock,
    title: "Secure booking",
    description: "Payments held in escrow until 24 hours after your trip begins.",
    bg: "bg-brand-emerald/10",
    fg: "text-brand-emerald-dark",
  },
];

export default function WhyChooseTravelGo() {
  return (
    <section className="bg-[#ECFDF5] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Why TravelGo" title="Booking a trip shouldn't feel like a second job" />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-[20px] border border-slate-100 bg-white p-6"
              >
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${feature.bg} ${feature.fg}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
