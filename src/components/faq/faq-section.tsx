import { Plus } from "lucide-react";
import { faqs } from "@/content/faq";

/**
 * Native <details> accordion — keyboard accessible, works without JavaScript,
 * and ships no client bundle. The FAQPage schema below helps these questions
 * surface directly in search results.
 */
export function FaqSection({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <ul className="divide-y divide-ink/10 border-y border-ink/10">
        {items.map((item) => (
          <li key={item.q}>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-xl text-forest md:text-2xl">{item.q}</h3>
                <Plus
                  aria-hidden
                  className="mt-1 size-5 shrink-0 text-brass transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="pretty mt-3 max-w-2xl pr-10 leading-relaxed text-ink/70">
                {item.a}
              </p>
            </details>
          </li>
        ))}
      </ul>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
