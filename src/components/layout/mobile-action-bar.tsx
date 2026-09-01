import { MessageCircle, Phone, MapPin } from "lucide-react";
import { whatsappUrl, telUrl } from "@/lib/whatsapp";
import { site } from "@/content/site";

const itemClass =
  "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium text-forest transition-colors active:bg-forest/5";

/** Persistent bottom bar on mobile only - the three actions that convert. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-ink/10 bg-white/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass}
      >
        <MessageCircle aria-hidden className="size-5 text-[#128C7E]" />
        WhatsApp
      </a>
      <span aria-hidden className="my-2 w-px bg-ink/10" />
      <a href={telUrl()} className={itemClass} aria-label={`Call ${site.phone}`}>
        <Phone aria-hidden className="size-5" />
        Call
      </a>
      <span aria-hidden className="my-2 w-px bg-ink/10" />
      <a
        href={site.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass}
      >
        <MapPin aria-hidden className="size-5" />
        Directions
      </a>
    </nav>
  );
}
