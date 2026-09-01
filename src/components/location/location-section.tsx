import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { site, fullAddress } from "@/content/site";
import { telUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";

/**
 * The map is a plain iframe loaded lazily - no Maps JS API, no API key, and no
 * measurable cost to the initial page load.
 */
export function LocationSection({ showMap = true }: { showMap?: boolean }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="min-w-0">
        <ul className="space-y-7">
          <li className="flex gap-4">
            <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-brass" />
            <div>
              <h3 className="font-display text-xl text-forest">Address</h3>
              <address className="mt-1 not-italic leading-relaxed text-ink/70">
                {fullAddress}
              </address>
              <p className="mt-1 text-sm text-ink/50">{site.landmark}</p>
            </div>
          </li>
          <li className="flex gap-4">
            <Phone aria-hidden className="mt-1 size-5 shrink-0 text-brass" />
            <div>
              <h3 className="font-display text-xl text-forest">Phone</h3>
              <p className="mt-1 text-ink/70">
                <a
                  href={telUrl()}
                  className="inline-block py-2 hover:text-forest"
                >
                  {site.phone}
                </a>
                <span className="mx-2 text-ink/30">·</span>
                <span className="text-ink/60">{site.phoneAlt}</span>
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <Clock aria-hidden className="mt-1 size-5 shrink-0 text-brass" />
            <div>
              <h3 className="font-display text-xl text-forest">Hours</h3>
              <dl className="mt-2 space-y-1.5 text-sm text-ink/70">
                {site.hours.map((row) => (
                  <div key={row.label} className="flex gap-3">
                    <dt className="w-32 shrink-0 text-ink/50 sm:w-44">{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </li>
        </ul>

        <Button asChild variant="primary" size="lg" className="mt-9">
          <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer">
            <Navigation aria-hidden />
            Get Directions
          </a>
        </Button>
      </div>

      {showMap ? (
        <div className="min-w-0 overflow-hidden rounded-2xl border border-ink/10 bg-mist">
          <iframe
            title={`Map showing the location of ${site.legalName}`}
            src={site.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[380px] w-full border-0"
          />
        </div>
      ) : null}
    </div>
  );
}
