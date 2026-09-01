import type { MenuCategory } from "@/types";

/** PLACEHOLDER cafe menu. A short, representative selection - not the full card. */
export const cafeIntro = {
  heading: "The Garden Cafe",
  blurb:
    "All-day dining under the trees. Slow coffee in the morning, wood-fired plates in the evening, and a kitchen that stays open until eleven.",
  hours: "7:30 am - 11:00 pm, every day",
  highlights: [
    "Single-estate coffee, roasted in-house",
    "Wood-fired pizzas and clay-oven breads",
    "Full vegetarian and Jain menu",
    "Outdoor seating for 60",
  ],
};

export const menu: MenuCategory[] = [
  {
    id: "coffee",
    name: "Coffee & Cold Brew",
    blurb: "Estate beans from Chikmagalur, roasted every fortnight.",
    items: [
      { name: "Filter Coffee", description: "The strong, sweet, traditional one", price: 120, veg: true },
      { name: "Flat White", price: 220, veg: true },
      { name: "24-Hour Cold Brew", description: "Served over a single large cube", price: 260, veg: true },
      { name: "Masala Chai", description: "Brewed to order, not held", price: 110, veg: true },
    ],
  },
  {
    id: "breakfast",
    name: "All-Day Breakfast",
    items: [
      { name: "Ghee Roast Dosa", description: "With two chutneys and sambar", price: 260, veg: true },
      { name: "Poha & Jalebi", price: 220, veg: true },
      { name: "Shakshuka", description: "Baked eggs, sourdough toast", price: 380 },
      { name: "Seasonal Fruit Bowl", price: 240, veg: true },
    ],
  },
  {
    id: "mains",
    name: "From the Wood Oven",
    items: [
      { name: "Margherita", description: "San Marzano, fresh mozzarella, basil", price: 420, veg: true },
      { name: "Truffle & Mushroom Pizza", price: 560, veg: true },
      { name: "Dal Amara", description: "Slow-cooked overnight, our house dal", price: 340, veg: true },
      { name: "Tandoori Platter", description: "Chef's selection for two", price: 720 },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      { name: "Basque Cheesecake", price: 320, veg: true },
      { name: "Gulab Jamun Tiramisu", description: "House favourite", price: 340, veg: true },
      { name: "Seasonal Sorbet", price: 200, veg: true },
    ],
  },
];
