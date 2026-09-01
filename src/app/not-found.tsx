import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp/cta-buttons";

export default function NotFound() {
  return (
    <section className="h-screen-copy flex items-center bg-cream">
      <div className="container-page py-32 text-center">
        <p className="eyebrow text-brass">404</p>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4rem)] text-forest">
          This page has checked out
        </h1>
        <p className="mx-auto mt-5 max-w-md text-ink/65">
          The link you followed does not exist any more. Head back to the homepage, or just
          message us — it is usually faster.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <WhatsAppButton size="lg" variant="outline" label="Message us" />
        </div>
      </div>
    </section>
  );
}
