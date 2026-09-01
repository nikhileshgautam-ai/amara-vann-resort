import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { CtaBand } from "@/components/home/cta-band";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photographs of the rooms, pool, garden cafe and banquet lawn at ${site.legalName}, ${site.address.city}.`,
  alternates: { canonical: "/gallery" },
  openGraph: { title: `Gallery | ${site.name}`, url: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The property, honestly photographed"
        lead="No stock images and no rendering tricks — this is what you will walk into."
        seed={5}
      />
      <Section tone="cream">
        <GalleryGrid />
      </Section>
      <CtaBand
        title="Want to see it in person?"
        lead="Site visits run from 10 am to 7 pm, every day. Message us and we will keep the time free."
      />
    </>
  );
}
