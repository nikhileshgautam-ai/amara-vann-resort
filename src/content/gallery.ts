import type { GalleryItem } from "@/types";

/**
 * PLACEHOLDER gallery. Drop real photographs into /public/images/gallery and
 * set the `image` field to e.g. "/images/gallery/pool.jpg".
 */
export const galleryItems: GalleryItem[] = [
  { id: "g1", caption: "The pool at first light", category: "Resort" },
  { id: "g2", caption: "Mango grove walking trail", category: "Resort" },
  { id: "g3", caption: "Cottage deck", category: "Rooms" },
  { id: "g4", caption: "Deluxe Garden Room", category: "Rooms" },
  { id: "g5", caption: "Cafe seating under the trees", category: "Cafe" },
  { id: "g6", caption: "Wood-fired oven", category: "Cafe" },
  { id: "g7", caption: "Lawn set for a reception", category: "Events" },
  { id: "g8", caption: "Mandap under the banyan", category: "Events" },
  { id: "g9", caption: "Evening bonfire", category: "Resort" },
  { id: "g10", caption: "Family Villa garden", category: "Rooms" },
  { id: "g11", caption: "Morning filter coffee", category: "Cafe" },
  { id: "g12", caption: "Banquet hall, seated for 250", category: "Events" },
];

export const galleryCategories = ["All", "Resort", "Rooms", "Cafe", "Events"] as const;
