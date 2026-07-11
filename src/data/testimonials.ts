import type { Testimonial } from "../types";

// TODO: replace with data fetched from the backend, e.g. GET /api/reviews?featured=true
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rifat Ahmed",
    trip: "Bali, 6-day trip",
    rating: 5,
    quote:
      "Our Bali package handled every transfer and reservation — we just showed up and hiked, ate and dove for six days straight.",
    initials: "RA",
    accent: "sky",
  },
  {
    id: "t2",
    name: "Sadia Nasrin",
    trip: "Kyoto, 7-day trip",
    rating: 5,
    quote:
      "The Kyoto guide rerouted our whole third day around a sudden festival. That's the kind of thing you can't book yourself.",
    initials: "SN",
    accent: "emerald",
  },
  {
    id: "t3",
    name: "Tanvir Hasan",
    trip: "Swiss Alps, 8-day trip",
    rating: 4,
    quote:
      "Support answered at 2am local time when our connecting flight got cancelled and had us rebooked before we'd even landed.",
    initials: "TH",
    accent: "amber",
  },
];
