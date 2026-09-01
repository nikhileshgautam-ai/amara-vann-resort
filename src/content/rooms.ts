import type { Room } from "@/types";

/** PLACEHOLDER room data - replace copy, pricing and images with the real thing. */
export const rooms: Room[] = [
  {
    slug: "deluxe-garden-room",
    name: "Deluxe Garden Room",
    summary: "A calm, wood-and-linen room opening onto the garden path.",
    description: [
      "Our entry-level room, and the one most guests come back to. Twenty-eight square metres, a king bed, and a small private sit-out that looks straight into the mango grove.",
      "Quiet side of the property, a two-minute walk from the cafe and the pool.",
    ],
    priceFrom: 4500,
    size: "28 sq m",
    occupancy: "2 adults + 1 child",
    bed: "King",
    view: "Garden",
    amenities: [
      "Private sit-out",
      "Air conditioning",
      "Smart TV",
      "Tea & coffee station",
      "Rain shower",
      "Complimentary breakfast",
    ],
  },
  {
    slug: "premium-pool-view",
    name: "Premium Pool View",
    summary: "Larger, brighter, and a few steps from the water.",
    description: [
      "Thirty-six square metres with a full-height window facing the pool deck. Best booked for two, but the daybed converts for a third guest.",
      "Comes with pool-side lounger access reserved through the day.",
    ],
    priceFrom: 6500,
    size: "36 sq m",
    occupancy: "3 adults",
    bed: "King + daybed",
    view: "Pool",
    amenities: [
      "Pool-facing window",
      "Reserved lounger",
      "Air conditioning",
      "Mini refrigerator",
      "Bathtub",
      "Complimentary breakfast",
    ],
  },
  {
    slug: "luxury-cottage-suite",
    name: "Luxury Cottage Suite",
    summary: "A standalone cottage with a living room and a private deck.",
    description: [
      "Six freestanding cottages sit along the far edge of the property, each with its own deck, an outdoor shower and a living room that comfortably seats four.",
      "The quietest thing we have. Popular for anniversaries and long stays.",
    ],
    priceFrom: 9500,
    size: "62 sq m",
    occupancy: "3 adults + 1 child",
    bed: "King + sofa bed",
    view: "Grove & hills",
    amenities: [
      "Private deck",
      "Separate living room",
      "Outdoor shower",
      "Bonfire on request",
      "In-cottage dining",
      "Complimentary breakfast",
    ],
  },
  {
    slug: "family-villa",
    name: "Family Villa",
    summary: "Two bedrooms, a shared living space and a walled garden.",
    description: [
      "Built for families and small groups travelling together: two en-suite bedrooms, a shared living and dining area, and a walled garden with its own seating.",
      "Extra beds and a cot can be added at no charge.",
    ],
    priceFrom: 14000,
    size: "104 sq m",
    occupancy: "6 adults",
    bed: "2 king bedrooms",
    view: "Private garden",
    amenities: [
      "Two en-suite bedrooms",
      "Walled private garden",
      "Living & dining area",
      "Barbecue setup on request",
      "Extra beds free of charge",
      "Complimentary breakfast",
    ],
  },
];

export function getRoom(slug: string) {
  return rooms.find((room) => room.slug === slug);
}
