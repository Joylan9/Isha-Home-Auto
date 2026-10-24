/**
 * Where consultation enquiries are delivered.
 *
 * Paste your Formspree form URL below (formspree.io → New form → copy the
 * endpoint, e.g. "https://formspree.io/f/abcdwxyz"). It is safe to commit:
 * Formspree endpoints are public by design and spam-filtered on their side.
 * A VITE_CONTACT_ENDPOINT environment variable, if set, takes precedence.
 */
export const FORMSPREE_ENDPOINT = '';

export const CONTACT_ENDPOINT: string =
  (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || FORMSPREE_ENDPOINT;
