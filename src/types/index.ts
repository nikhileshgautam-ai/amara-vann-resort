export type Room = {
  slug: string;
  name: string;
  summary: string;
  description: string[];
  priceFrom: number;
  size: string;
  occupancy: string;
  bed: string;
  view: string;
  amenities: string[];
  image?: string;
  gallery?: string[];
};

export type MenuItem = { name: string; description?: string; price?: number; veg?: boolean };
export type MenuCategory = { id: string; name: string; blurb?: string; items: MenuItem[] };

export type EventType = {
  id: string;
  name: string;
  blurb: string;
  capacity: string;
  includes: string[];
  image?: string;
};

export type Facility = { id: string; name: string; blurb: string; icon: string };

export type Testimonial = {
  id: string;
  name: string;
  location?: string;
  rating: number;
  quote: string;
  context?: string;
};

export type GalleryItem = {
  id: string;
  caption: string;
  category: "Resort" | "Rooms" | "Cafe" | "Events";
  image?: string;
};
