import { FiMapPin, FiNavigation } from "react-icons/fi";

interface MapSectionProps {
  location: string;
  country: string;
}

export default function MapSection({ location, country }: MapSectionProps) {
  return (
    <section className="py-6 md:py-8">
      <div className="overflow-hidden rounded-[20px] border border-slate-100 bg-white">
        <div
          className="relative flex h-56 items-center justify-center md:h-72"
          style={{
            backgroundColor: "#ECFDF5",
            backgroundImage: "radial-gradient(#0EA5E9 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          <div className="flex flex-col items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-emerald text-white shadow-lg">
              <FiMapPin className="h-6 w-6" />
            </span>
            <p className="font-display mt-3 font-semibold text-slate-800">{location}</p>
            <p className="text-sm text-slate-500">{country}</p>
          </div>
        </div>
        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-sm text-slate-500">Exact meeting point shared after booking confirmation.</p>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-brand-emerald-dark">
            <FiNavigation className="h-4 w-4" /> Get directions
          </button>
        </div>
      </div>
    </section>
  );
}