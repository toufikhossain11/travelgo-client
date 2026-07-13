"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/src/components/shared/SectionHeading";
import { team } from "@/src/data/team";
import { scaleIn } from "@/src/lib/motion";

export default function TeamSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
      <SectionHeading eyebrow="The people behind it" title="A small team that still answers the phone" />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, index) => (
          <motion.div
            key={member.id}
            variants={scaleIn}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-[20px] border border-slate-100 bg-white p-5 text-center"
          >
            <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
              <Image src={member.image} alt={member.name} fill className="object-cover" sizes="80px" />
            </div>
            <h3 className="font-display mt-3 font-semibold text-slate-900">{member.name}</h3>
            <p className="font-mono-travel text-xs text-brand-emerald-dark">{member.role}</p>
            <p className="mt-2 text-sm text-slate-500">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}