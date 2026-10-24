import { CONTACT_ENDPOINT } from '../config';

export interface Enquiry {
  name: string;
  phone: string;
  email: string;
  city: string;
  collection: string;
  interests: string[];
  message: string;
}

export type SendResult = { ok: true } | { ok: false; reason: 'not-configured' | 'rejected' | 'network'; message?: string };

/**
 * Posts an enquiry to the configured endpoint (Formspree-compatible JSON).
 * `_subject` and `_replyto` shape the notification email so you can reply
 * straight to the visitor; `_gotcha` is a honeypot that bots tend to fill.
 */
export async function sendEnquiry(enquiry: Enquiry, honeypot = ''): Promise<SendResult> {
  if (!CONTACT_ENDPOINT) {
    if (import.meta.env.DEV) {
      console.warn('[ISHA] No contact endpoint configured (src/config.ts) — enquiry not delivered.', enquiry);
      await new Promise((r) => setTimeout(r, 700));
      return { ok: true };
    }
    return { ok: false, reason: 'not-configured' };
  }

  const payload = {
    _subject: `New ISHA enquiry — ${enquiry.name.trim()} (${enquiry.city})`,
    ...(enquiry.email ? { _replyto: enquiry.email } : {}),
    _gotcha: honeypot,
    Name: enquiry.name.trim(),
    Phone: enquiry.phone.trim(),
    Email: enquiry.email.trim() || '—',
    City: enquiry.city,
    Collection: enquiry.collection || 'Not sure yet',
    Interests: enquiry.interests.length ? enquiry.interests.join(', ') : '—',
    Message: enquiry.message.trim() || '—',
    Page: window.location.href,
  };

  try {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };
    const body = (await res.json().catch(() => null)) as { errors?: { message?: string }[] } | null;
    return { ok: false, reason: 'rejected', message: body?.errors?.map((e) => e.message).filter(Boolean).join(' ') };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
