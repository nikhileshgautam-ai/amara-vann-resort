import type { Facility } from "@/types";

/** icon values map to keys in components/facilities icon map. */
export const facilities: Facility[] = [
  { id: "pool", name: "Spring-fed Pool", blurb: "Open 7 am to 8 pm, heated in winter.", icon: "waves" },
  { id: "cafe", name: "Garden Cafe", blurb: "All-day dining, indoor and outdoor seating.", icon: "coffee" },
  { id: "banquet", name: "Lawn & Banquet Hall", blurb: "Up to 500 guests, fully generator backed.", icon: "party" },
  { id: "spa", name: "Ayurvedic Spa", blurb: "Two therapy rooms, booked a day ahead.", icon: "flower" },
  { id: "bonfire", name: "Evening Bonfire", blurb: "Lit at 7 pm through the winter months.", icon: "flame" },
  { id: "kids", name: "Kids' Play Area", blurb: "Fenced, shaded, and visible from the cafe.", icon: "baby" },
  { id: "parking", name: "Parking for 120", blurb: "Valet available on event days.", icon: "car" },
  { id: "wifi", name: "Property-wide Wi-Fi", blurb: "Fibre line with a backup connection.", icon: "wifi" },
];
