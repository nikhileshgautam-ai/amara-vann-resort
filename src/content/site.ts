/**
 * ---------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH FOR BUSINESS INFORMATION
 * ---------------------------------------------------------------------------
 * Every phone number, address and piece of copy on the site is read from this
 * file. Replace the PLACEHOLDER values below with the real business details -
 * nothing else in the codebase needs to change.
 * ---------------------------------------------------------------------------
 */

export const site = {
  // PLACEHOLDER - replace with the real business name
  name: "Amara Vann",
  legalName: "Amara Vann Resort, Cafe & Banquet",
  shortDescription:
    "A boutique hillside resort with a garden cafe and an open-air banquet lawn.",
  tagline: "Stay. Dine. Celebrate.",
  heroHeading: "A quiet luxury retreat, minutes from the city",
  heroSubheading:
    "Twenty-two acres of green, four room categories, a garden cafe and a banquet lawn that seats 500. Made for slow weekends and big celebrations alike.",

  // PLACEHOLDER contact details
  phone: "+91 98765 43210",
  phoneAlt: "+91 98765 43211",
  email: "stay@example.com",

  whatsapp: {
    // Digits only, including country code. PLACEHOLDER.
    number: "919876543210",
    defaultMessage:
      "Hi, I found your website and would like to know more about your resort, cafe and banquet hall.",
  },

  address: {
    line1: "Survey No. 44, Lake View Road",
    line2: "Badgaon",
    city: "Udaipur",
    state: "Rajasthan",
    postalCode: "313001",
    country: "IN",
  },

  // PLACEHOLDER - replace with the real coordinates and Maps links
  geo: { lat: 24.6005, lng: 73.6828 },
  mapsUrl: "https://maps.google.com/?q=24.6005,73.6828",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=24.6005,73.6828",
  mapEmbedUrl:
    "https://www.google.com/maps?q=24.6005,73.6828&hl=en&z=14&output=embed",

  landmark: "8 km from the city centre, 2 km past the lake crossing.",

  hours: [
    { label: "Reception", value: "Open 24 hours" },
    { label: "Cafe & Restaurant", value: "7:30 am - 11:00 pm" },
    { label: "Check-in / Check-out", value: "1:00 pm / 11:00 am" },
    { label: "Banquet site visits", value: "10:00 am - 7:00 pm" },
  ],

  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },

  // Used for metadata, canonical URLs and JSON-LD. PLACEHOLDER.
  url: "https://www.example.com",

  reviews: {
    // PLACEHOLDER — replace with the real Google rating and count, or remove
    // this block entirely rather than shipping a number you cannot back up.
    average: 4.8,
    count: 312,
    source: "Google reviews",
  },

  stats: [
    { value: "22", label: "Acres of green" },
    { value: "24", label: "Rooms & cottages" },
    { value: "500", label: "Banquet capacity" },
    { value: "4.8", label: "Average guest rating" },
  ],

  whyUs: [
    {
      title: "One property, three experiences",
      body: "Stay the weekend, drop in for coffee, or host three hundred guests - all in the same twenty-two acres.",
    },
    {
      title: "Real green, not a lawn",
      body: "Mature trees, a spring-fed pool and walking trails that make the city feel far away.",
    },
    {
      title: "Kitchen that travels well",
      body: "The same kitchen that runs the cafe runs your wedding buffet. Tastings before you book.",
    },
    {
      title: "Straight answers, quickly",
      body: "Message us on WhatsApp and get availability, pricing and a walkthrough the same day.",
    },
  ],
} as const;

export const fullAddress = [
  site.address.line1,
  site.address.line2,
  `${site.address.city}, ${site.address.state} ${site.address.postalCode}`,
].join(", ");
