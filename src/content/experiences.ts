/**
 * PLACEHOLDER. These are the things a guest remembers afterwards, and the
 * strongest content on the site — worth rewriting with the owner in the room
 * rather than guessing.
 */
export const experiences = [
  {
    id: "sunrise",
    title: "The sunrise trail",
    time: "6:00 am · 45 minutes",
    body:
      "A gentle loop through the mango grove to the far ridge, where the valley fills with mist before the heat arrives. The kitchen sends a flask of chai up with you.",
    seed: 0,
  },
  {
    id: "breakfast",
    title: "Breakfast at the pool",
    time: "7:30 am – 10:30 am",
    body:
      "Dosas made to order at a counter beside the water, fruit from the orchard, and coffee that keeps coming. Included with every room, and worth waking up for.",
    seed: 5,
  },
  {
    id: "bonfire",
    title: "Dinner around the fire",
    time: "7:00 pm onwards, October to March",
    body:
      "The fire is lit at seven and dinner comes out to it — clay-oven breads, a slow-cooked dal, and whatever the kitchen has been working on since morning.",
    seed: 2,
  },
  {
    id: "spa",
    title: "An unhurried spa afternoon",
    time: "By appointment, a day ahead",
    body:
      "Two therapy rooms, traditional Ayurvedic oils, and no attempt to sell you a package on the way out. Book it for the afternoon you have nothing planned.",
    seed: 3,
  },
] as const;
