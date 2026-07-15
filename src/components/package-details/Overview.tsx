import SectionHeading from "@/src/components/shared/SectionHeading";

export default function Overview({ description }: { description: string[] }) {
  return (
    <section className="py-6 md:py-8">
      <SectionHeading eyebrow="Overview" title="About this trip" />
      <div className="mt-5 max-w-3xl space-y-4">
        {description.map((paragraph, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-slate-600">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}