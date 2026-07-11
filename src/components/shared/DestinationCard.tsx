"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button, Card } from "@heroui/react";
import { FiStar, FiClock, FiMapPin } from "react-icons/fi";
import { Destination } from "@/src/types";
import { scaleIn } from "@/src/lib/motion";


interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

export default function DestinationCard({ destination, index = 0 }: DestinationCardProps) {
  const { name, country, price, currency, durationDays, rating, reviewCount, image, shortDescription } =
    destination;

  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-100">
        <div className="relative h-48 w-full shrink-0">
          <Image
            src={image}
            alt={`${name}, ${country}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <span className="font-mono-travel absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-slate-700">
            {durationDays} days
          </span>
          <span className="font-mono-travel absolute right-3 top-3 flex items-center gap-1 rounded-full bg-brand-amber/15 px-2.5 py-1 text-xs font-medium text-brand-amber-dark">
            <FiStar className="h-3 w-3 fill-current" /> {rating.toFixed(1)}
          </span>
        </div>

        <Card.Content className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-base font-semibold text-slate-900">{name}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
            <FiMapPin className="h-3.5 w-3.5" /> {country}
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">{shortDescription}</p>

          <div className="mt-4 flex items-center justify-between">
            <p className="font-mono-travel text-sm font-medium text-slate-800">
              {currency}
              {price.toLocaleString()} <span className="font-sans font-normal text-slate-400">/ person</span>
            </p>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <FiClock className="h-3.5 w-3.5" /> {reviewCount} reviews
            </span>
          </div>

          <Button variant="secondary" className="mt-4 w-full rounded-xl">
            View details
          </Button>
        </Card.Content>
      </Card>
    </motion.div>
  );
}
