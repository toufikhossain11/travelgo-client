import {
  FiClock, FiCompass, FiDollarSign, FiGlobe, FiHome,
  FiCoffee, FiMapPin, FiTag, FiTrendingUp, FiTruck, FiUsers,
} from "react-icons/fi";
import type { PackageDetail } from "@/src/types";

export default function TourInfoGrid({ pkg }: { pkg: PackageDetail }) {
  const info = [
    { icon: FiMapPin, label: "Destination", value: `${pkg.location}, ${pkg.country}` },
    { icon: FiClock, label: "Duration", value: `${pkg.durationDays} days` },
    { icon: FiDollarSign, label: "Price", value: `${pkg.currency}${pkg.price.toLocaleString()}` },
    { icon: FiTag, label: "Category", value: pkg.category },
    { icon: FiUsers, label: "Group Size", value: pkg.groupSize },
    { icon: FiCompass, label: "Tour Type", value: pkg.tourType },
    { icon: FiGlobe, label: "Language", value: pkg.language },
    { icon: FiTrendingUp, label: "Best Season", value: pkg.bestSeason },
    { icon: FiTrendingUp, label: "Difficulty", value: pkg.difficulty },
    { icon: FiHome, label: "Hotel Included", value: pkg.hotelIncluded ? "Yes" : "No" },
    { icon: FiCoffee, label: "Meals Included", value: pkg.mealsIncluded ? "Yes" : "No" },
    { icon: FiTruck, label: "Transport", value: pkg.transport },
  ];

  return (
    <section className="py-6 md:py-8">
      <div className="rounded-[20px] border border-slate-100 bg-white p-5 md:p-8">
        <h2 className="font-display text-lg font-semibold text-slate-900">Tour Information</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {info.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/10 text-brand-emerald-dark">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-slate-400">{item.label}</p>
                  <p className="text-sm font-medium text-slate-800">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}