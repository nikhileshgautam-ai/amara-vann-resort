import { site } from "@/content/site";

/**
 * Builds a wa.me link with a URL-encoded, context-aware message.
 * Never put anything sensitive in here - the URL is fully visible to the user
 * and to WhatsApp.
 */
export function whatsappUrl(message?: string) {
  const number = site.whatsapp.number.replace(/\D/g, "");
  const text = (message ?? site.whatsapp.defaultMessage).trim();
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export const waMessages = {
  general: site.whatsapp.defaultMessage,
  stay: "Hi, I am interested in staying at your resort. Please share room availability and pricing.",
  room: (room: string) =>
    `Hi, I am interested in the ${room}. Please share availability, pricing and details.`,
  cafe: "Hi, I would like to know more about your cafe and menu.",
  table: "Hi, I would like to reserve a table at your restaurant. Please share available timings.",
  banquet:
    "Hi, I am interested in booking your banquet hall for an event. Please share availability and pricing.",
  event: (type: string) =>
    `Hi, I am planning a ${type} and would like to know about your venue, packages and availability.`,
  directions: "Hi, I would like directions to your property. Could you please share the location?",
};

export function telUrl() {
  return `tel:${site.phone.replace(/[^\d+]/g, "")}`;
}
