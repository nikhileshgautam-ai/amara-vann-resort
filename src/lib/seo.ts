/**
 * Search engines are kept out until the site is genuinely ready.
 *
 * The content is placeholder: an invented business name, invented reviews and
 * FAQ answers the owner has not confirmed. Letting Google index that means a
 * fictional resort enters the search results under the client's domain, and
 * getting pages removed afterwards is far slower than never being indexed.
 *
 * Set NEXT_PUBLIC_SITE_INDEXABLE=true in the host's environment variables on
 * the day of launch, once the real details are in.
 */
export const isIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";
