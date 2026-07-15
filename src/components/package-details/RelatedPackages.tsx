"use client";

import DestinationCard from "@/src/components/shared/DestinationCard";
import SectionHeading from "@/src/components/shared/SectionHeading";
import { destinations } from "@/src/data/destinations";

interface RelatedPackagesProps {
  currentId: string;
  category: string;
}

export default function RelatedPackages({ currentId, category }: RelatedPackagesProps) {
  const sameCategory = destinations.filter((d) => d.id !== currentId && d.category === category);
  const others = destinations.filter((d) => d.id !== currentId && d.category !== category);
  const related = [...sameCategory, ...others].slice(0, 4);

  return (
    <section className="bg-[#F0F9FF] py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="You might also like" title="Related tour packages" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((destination, index) => (
            <DestinationCard key={destination.id} destination={destination} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}