"use client";

import { motion } from "framer-motion";
import { FiEye, FiHeart, FiMapPin, FiUsers } from "react-icons/fi";
import SectionHeading from "@/src/components/shared/SectionHeading";
import { fadeInUp } from "@/src/lib/motion";

const values = [
  {
    icon: FiMapPin,
    title: "Local-first, always",
    description: "Every operator is a local business, not a reseller. Your money stays in the places you visit.",
    bg: "bg-brand-emerald/10",
    fg: "text-brand-emerald-dark",
  },
  {
    icon: FiEye,
    title: "Radical transparency",
    description: "No hidden fees, no bait-and-switch listings. The price you see includes everything we know about.",
    bg: "bg-brand-sky/10",
    fg: "text-brand-sky-dark",
  },
  {
    icon: FiUsers,
    title: "Support that's actually there",
    description: "Every trip is backed by a real person who'll pick up the phone, not a chatbot reading a script.",
    bg: "bg-brand-amber/15",
    fg: "text-brand-amber-dark",
  },
  {
    icon: FiHeart,
    title: "Travel that gives back",
    description: "We favor operators who reinvest in their communities — it's part of how we choose who to list.",
    bg: "bg-brand-emerald/10",
    fg: "text-brand-emerald-dark",
  },
];

export default function ValuesGrid() {
  return (
    <section className="bg-[#ECFDF5] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="What we stand for" title="The rules we don't break, even when it's slower" />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-[20px] border border-slate-100 bg-white p-6"
              >
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${value.bg} ${value.fg}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}