import type { EventType } from "@/types";

export const banquetIntro = {
  heading: "Weddings & Events",
  blurb:
    "An open lawn for 500, a covered hall for 250, and a kitchen that has been feeding both for a decade. We handle decor, catering and stay for outstation guests under one roof.",
  spaces: [
    { name: "The Lawn", capacity: "Up to 500 standing / 350 seated", note: "Open-air, lit trees, generator backed" },
    { name: "Banquet Hall", capacity: "Up to 250 seated", note: "Air-conditioned, pillarless, AV ready" },
    { name: "The Deck", capacity: "Up to 80", note: "Intimate dinners, sangeet, corporate offsites" },
  ],
};

export const eventTypes: EventType[] = [
  {
    id: "wedding",
    name: "Weddings",
    blurb:
      "Mehendi on the deck, sangeet on the lawn, pheras under the trees. Rooms for the family on the same property.",
    capacity: "150 - 500 guests",
    includes: ["Lawn & hall for three days", "In-house catering & tastings", "Decor partners", "Room block for guests"],
  },
  {
    id: "reception",
    name: "Receptions & Anniversaries",
    blurb: "A single evening, done properly - stage, lighting, live counters and a clear timeline.",
    capacity: "100 - 400 guests",
    includes: ["Stage & lighting", "Live food counters", "Valet parking", "Bridal suite"],
  },
  {
    id: "corporate",
    name: "Corporate Offsites",
    blurb: "Conference setup by day, bonfire by night. Wi-Fi that holds up and a projector that works.",
    capacity: "20 - 200 guests",
    includes: ["AV & projector", "High-speed Wi-Fi", "Working lunch menus", "Team activity space"],
  },
  {
    id: "private",
    name: "Birthdays & Private Parties",
    blurb: "Smaller, warmer gatherings on the deck or in a reserved section of the cafe.",
    capacity: "20 - 120 guests",
    includes: ["Reserved seating", "Custom cake & menu", "Music setup", "Kids play area"],
  },
];
