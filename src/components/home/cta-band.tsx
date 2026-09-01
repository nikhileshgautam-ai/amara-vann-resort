import { site } from "@/content/site";
import { WhatsAppButton, CallButton } from "@/components/whatsapp/cta-buttons";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

export function CtaBand({
  title = "Tell us what you are planning",
  lead = "A weekend away, a table for four, or a wedding for four hundred - message us and we will come back the same day with availability and pricing.",
  message,
}: {
  title?: string;
  lead?: string;
  message?: string;
}) {
  return (
    <section className="grain relative overflow-hidden bg-forest py-20 text-cream md:py-24">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(169,126,70,0.6), transparent 45%), radial-gradient(circle at 80% 70%, rgba(139,166,153,0.5), transparent 45%)",
        }}
      />
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight">
            {title}
          </h2>
          <p className="mt-5 text-mist/80">{lead}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <WhatsAppButton size="lg" message={message} />
            </Magnetic>
            <Magnetic>
              <CallButton size="lg" variant="light" label={`Call ${site.phone}`} />
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
