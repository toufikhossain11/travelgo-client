"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <section className="py-10 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="relative h-72 w-full overflow-hidden rounded-[24px] md:h-[420px]"
      >
        <Image src={images[active]} alt={title} fill className="object-cover" sizes="100vw" />
      </motion.div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.slice(0, 4).map((img, index) => (
          <button
            key={img}
            onClick={() => setActive(index)}
            className={`relative h-20 overflow-hidden rounded-xl border-2 transition md:h-24 ${
              active === index ? "border-brand-emerald" : "border-transparent opacity-80 hover:opacity-100"
            }`}
          >
            <Image src={img} alt={`${title} thumbnail ${index + 1}`} fill className="object-cover" sizes="150px" />
          </button>
        ))}
      </div>
    </section>
  );
}