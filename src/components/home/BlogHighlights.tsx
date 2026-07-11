"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import { blogPosts } from "@/src/data/blogPosts";
import { fadeInUp } from "@/src/lib/motion";

export default function BlogHighlights() {
  return (
    <section className="bg-[#F0F9FF] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="From the journal" title="Trip planning, from people who've done it" />
          <Link href="/blog" className="shrink-0 text-sm font-semibold text-brand-emerald-dark">
            Visit the blog →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={fadeInUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-[20px] border border-slate-100 bg-white">
                <div className="relative h-40 w-full">
                  <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5">
                  <p className="font-mono-travel text-xs text-slate-400">{post.readTime}</p>
                  <h3 className="font-display mt-1.5 font-semibold text-slate-900">{post.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
