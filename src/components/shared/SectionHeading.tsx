interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}

export default function SectionHeading({ eyebrow, title, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="font-mono-travel text-sm font-medium text-brand-sky-dark">{eyebrow}</p>
      <h2 className="font-display mt-1 text-2xl font-semibold text-slate-900 md:text-3xl">{title}</h2>
    </div>
  );
}
