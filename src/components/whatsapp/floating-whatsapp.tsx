"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Floating WhatsApp CTA. Appears after a short scroll so it never covers the
 * hero, and sits above the mobile action bar rather than on top of it.
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens WhatsApp in a new tab)"
      className={cn(
        "group fixed right-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-[#04301a] shadow-lg shadow-black/15 transition-all duration-300 md:right-6",
        "bottom-[calc(5rem+env(safe-area-inset-bottom))] md:bottom-6",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <span className="relative flex size-6 items-center justify-center">
        <span
          aria-hidden
          className="absolute inline-flex size-full animate-ping rounded-full bg-white/50 opacity-60 motion-reduce:hidden"
        />
        <MessageCircle aria-hidden className="relative size-5" />
      </span>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
