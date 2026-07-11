import type { StatItem } from "../types";

// TODO: replace with data fetched from the backend, e.g. GET /api/stats
export const stats: StatItem[] = [
  { id: "s1", label: "Travelers booked", value: "86K+" },
  { id: "s2", label: "Countries covered", value: "42" },
  { id: "s3", label: "Curating trips", value: "9 yrs" },
  { id: "s4", label: "Average rating", value: "4.8/5" },
];
