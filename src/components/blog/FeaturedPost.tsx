"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiClock } from "react-icons/fi";
import type { BlogPost } from "@/src/types";
import { fadeInUp } from "@/src/lib/motion";

export default function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <Link
        href={`/blog/${post.slug}`}
        className="grid grid-cols-1 overflow-hidden rounded-[24px] border border-slate-100 bg-white transition hover:shadow-md md:grid-cols-2"
      >
        <div className="relative h-56 w-full md:h-full">
          <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
        </div>

        <div className="flex flex-col justify-center p-6 md:p-10">
          <span className="font-mono-travel inline-flex w-fit items-center gap-2 rounded-full bg-brand-amber/15 px-3 py-1 text-xs font-medium text-brand-amber-dark">
            Latest story
          </span>
          <h2 className="font-display mt-4 text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
            {post.title}
          </h2>
          <p className="mt-3 text-sm text-slate-600 md:text-base">{post.excerpt}</p>

          <div className="mt-5 flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <FiCalendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <FiClock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
            <span>By {post.author}</span>
          </div>

          <span className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-brand-emerald-dark">
            Read the story <FiArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}