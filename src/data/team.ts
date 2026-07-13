import type { TeamMember } from "@/src/types";

// TODO: replace with data fetched from the backend, e.g. GET /api/team
export const team: TeamMember[] = [
  {
    id: "m1",
    name: "Ayesha Rahman",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "Spent six years in hospitality before getting tired of packages that overpromised. Started TravelGo from a spreadsheet in 2017.",
  },
  {
    id: "m2",
    name: "Farhan Kabir",
    role: "Head of Operator Relations",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Visits every new local operator in person before they're allowed on the platform. Has slept in more guesthouses than hotels.",
  },
  {
    id: "m3",
    name: "Nusrat Jahan",
    role: "Head of Customer Experience",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    bio: "Runs the 24/7 support team. Believes a good trip planner answers the phone at 2am without making you feel bad about it.",
  },
  {
    id: "m4",
    name: "Imran Chowdhury",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    bio: "Builds the tools that make booking a trip feel less like filling out a tax form. Previously worked on airline booking systems.",
  },
];