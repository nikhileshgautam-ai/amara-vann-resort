import { MessageCircle, Phone, MapPin } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { whatsappUrl, telUrl } from "@/lib/whatsapp";
import { site } from "@/content/site";

type CtaProps = {
  message?: string;
  label?: string;
  className?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
};

export function WhatsAppButton({
  message,
  label = "WhatsApp Us",
  className,
  variant = "whatsapp",
  size = "md",
}: CtaProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} on WhatsApp (opens WhatsApp in a new tab)`}
      >
        <MessageCircle aria-hidden />
        {label}
      </a>
    </Button>
  );
}

export function CallButton({
  label = "Call Now",
  className,
  variant = "outline",
  size = "md",
}: Omit<CtaProps, "message">) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={telUrl()} aria-label={`Call ${site.name} on ${site.phone}`}>
        <Phone aria-hidden />
        {label}
      </a>
    </Button>
  );
}

export function DirectionsButton({
  label = "Get Directions",
  className,
  variant = "outline",
  size = "md",
}: Omit<CtaProps, "message">) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={site.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get directions on Google Maps (opens in a new tab)"
      >
        <MapPin aria-hidden />
        {label}
      </a>
    </Button>
  );
}
