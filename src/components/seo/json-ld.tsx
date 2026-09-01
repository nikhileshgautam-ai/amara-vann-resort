import { site, fullAddress } from "@/content/site";
import { rooms } from "@/content/rooms";

/**
 * LocalBusiness structured data. Uses a @graph so the resort, the cafe and the
 * event venue are all described without pretending to be one entity.
 */
export function JsonLd() {
  const address = {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  };

  const geo = {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Resort",
        "@id": `${site.url}/#resort`,
        name: site.legalName,
        description: site.shortDescription,
        url: site.url,
        telephone: site.phone,
        email: site.email,
        address,
        geo,
        hasMap: site.mapsUrl,
        priceRange: "₹₹",
        checkinTime: "13:00",
        checkoutTime: "11:00",
        petsAllowed: false,
        numberOfRooms: 24,
        amenityFeature: [
          "Outdoor pool",
          "Free Wi-Fi",
          "Restaurant",
          "Banquet hall",
          "Free parking",
          "Spa",
        ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
        makesOffer: rooms.map((room) => ({
          "@type": "Offer",
          name: room.name,
          priceCurrency: "INR",
          price: room.priceFrom,
          availability: "https://schema.org/InStock",
          url: `${site.url}/rooms/${room.slug}`,
        })),
      },
      {
        "@type": "Restaurant",
        "@id": `${site.url}/#cafe`,
        name: `${site.name} Garden Cafe`,
        url: `${site.url}/dining-events`,
        telephone: site.phone,
        address,
        geo,
        servesCuisine: ["Indian", "Italian", "Continental"],
        priceRange: "₹₹",
        openingHours: "Mo-Su 07:30-23:00",
        acceptsReservations: true,
      },
      {
        "@type": "EventVenue",
        "@id": `${site.url}/#banquet`,
        name: `${site.name} Lawn & Banquet Hall`,
        url: `${site.url}/dining-events`,
        telephone: site.phone,
        address,
        geo,
        maximumAttendeeCapacity: 500,
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.legalName,
        description: `${site.legalName} - ${fullAddress}`,
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
