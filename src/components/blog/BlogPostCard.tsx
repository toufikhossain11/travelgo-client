"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCalendar, FiClock } from "react-icons/fi";
import type { BlogPost } from "@/src/types";
import { scaleIn } from "@/src/lib/motion";

const categoryColor: Record<BlogPost["category"], string> = {
  Packing: "bg-brand-emerald/10 text-brand-emerald-dark",
  "Trip Planning": "bg-brand-sky/10 text-brand-sky-dark",
  "Solo Travel": "bg-brand-amber/15 text-brand-amber-dark",
  "Budget Travel": "bg-brand-emerald/10 text-brand-emerald-dark",
  Destinations: "bg-brand-sky/10 text-brand-sky-dark",
};

interface BlogPostCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogPostCard({ post, index = 0 }: BlogPostCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-100 bg-white transition hover:shadow-sm"
      >
        <div className="relative h-44 w-full shrink-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <span
            className={`font-mono-travel absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${categoryColor[post.category]}`}
          >
            {post.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-base font-semibold leading-snug text-slate-900">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.excerpt}</p>

          <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <FiCalendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <FiClock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}