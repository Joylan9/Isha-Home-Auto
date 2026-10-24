import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { interests, regions, tiers } from '../data/content';
import { photos } from '../data/photos';
import { Img } from './Img';
import { Icon } from './Icon';
import { sendEnquiry, type Enquiry, type SendResult } from '../lib/enquiry';

type FormState = Enquiry;

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'city', string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error';

const empty: FormState = { name: '', phone: '', email: '', city: '', collection: '', interests: [], message: '' };

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please share your name.';
  if (!/^[+\d][\d\s-]{7,}$/.test(f.phone.trim())) e.phone = 'Enter a valid phone number.';
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'That email doesn’t look right.';
  if (!f.city) e.city = 'Choose your city.';
  return e;
}

function failureMessage(result: Exclude<SendResult, { ok: true }>): string {
  switch (result.reason) {
    case 'not-configured':
      return 'Online enquiries are being set up. Please try again soon.';
    case 'network':
      return 'We couldn’t reach our server — please check your connection and try again.';
    default:
      return result.message || 'Something went wrong sending your enquiry. Please try again in a moment.';
  }
}

export function Contact({ enquiry }: { enquiry: { tier: string; n: number } | null }) {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [failure, setFailure] = useState('');
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (enquiry) setForm((f) => ({ ...f, collection: enquiry.tier }));
  }, [enquiry]);

  const set = (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...form, [key]: e.target.value };
    setForm(next);
    if (touched) setErrors(validate(next));
  };

  const toggleInterest = (value: string) =>
    setForm((f) => ({ ...f, interests: f.interests.includes(value) ? f.interests.filter((v) => v !== value) : [...f.interests, value] }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus('sending');
    const result = await sendEnquiry(form, honeypot);
    if (result.ok) {
      setStatus('sent');
    } else {
      setFailure(failureMessage(result));
      setStatus('error');
    }
  };

  const fieldClass = (key: keyof Errors) => `field${errors[key] ? ' has-error' : ''}`;

  return (
    <section className="contact section" id="contact">
      <div className="contact__bg">
        <Img photo={photos.starlitHome} alt="" />
      </div>
      <div className="container contact__grid">
        <div className="contact__intro">
          <p className="eyebrow" data-reveal>
            Begin your ISHA home
          </p>
          <h2 className="title" data-split>
            Let your home <em>take care</em> of you.
          </h2>
          <p className="muted" data-reveal>
            Building new or upgrading? Tell us about your space and we’ll arrange a consultation — for homeowners, architects and interior designers
            across Coastal Karnataka.
          </p>
          <ul className="contact__list" data-reveal>
            <li>
              <span>Serving</span>
              {regions.join(' · ')}
            </li>
            <li>
              <span>For</span>Homeowners · Architects · Interior designers
            </li>
          </ul>
        </div>

        <div className="form glass" data-reveal>
          {status === 'sent' ? (
            <div className="form__done" role="status">
              <span className="form__done-icon">
                <Icon name="check" />
              </span>
              <h3>Thank you, {form.name.split(' ')[0]}.</h3>
              <p>Your enquiry is with the ISHA team. We’ll reach out shortly to plan your consultation.</p>
              <button
                className="btn btn--ghost"
                onClick={() => {
                  setForm(empty);
                  setTouched(false);
                  setFailure('');
                  setStatus('idle');
                }}
              >
                <span>Send another enquiry</span>
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              {/* Honeypot: hidden from people, tempting to bots. */}
              <div className="form__trap" aria-hidden="true">
                <label htmlFor="f-company">Company</label>
                <input id="f-company" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </div>
              <div className="form__row">
                <div className={fieldClass('name')}>
                  <input id="f-name" type="text" autoComplete="name" placeholder=" " value={form.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby="e-name" />
                  <label htmlFor="f-name">Full name</label>
                  <small id="e-name">{errors.name}</small>
                </div>
                <div className={fieldClass('phone')}>
                  <input id="f-phone" type="tel" autoComplete="tel" inputMode="tel" placeholder=" " value={form.phone} onChange={set('phone')} aria-invalid={!!errors.phone} aria-describedby="e-phone" />
                  <label htmlFor="f-phone">Phone</label>
                  <small id="e-phone">{errors.phone}</small>
                </div>
              </div>
              <div className={fieldClass('email')}>
                <input id="f-email" type="email" autoComplete="email" placeholder=" " value={form.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby="e-email" />
                <label htmlFor="f-email">Email (optional)</label>
                <small id="e-email">{errors.email}</small>
              </div>
              <div className="form__row">
                <div className={`${fieldClass('city')} field--select${form.city ? ' is-filled' : ''}`}>
                  <select id="f-city" value={form.city} onChange={set('city')} aria-invalid={!!errors.city} aria-describedby="e-city">
                    <option value="" disabled hidden />
                    {regions.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                    <option>Elsewhere in Karnataka</option>
                  </select>
                  <label htmlFor="f-city">City</label>
                  <small id="e-city">{errors.city}</small>
                </div>
                <div className="field field--select is-filled">
                  <select id="f-collection" value={form.collection} onChange={set('collection')}>
                    <option value="">Not sure yet</option>
                    {tiers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.id}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="f-collection">Collection</label>
                </div>
              </div>
              <fieldset className="chips">
                <legend>I’m interested in</legend>
                {interests.map((i) => (
                  <label key={i} className={form.interests.includes(i) ? 'is-on' : ''}>
                    <input type="checkbox" checked={form.interests.includes(i)} onChange={() => toggleInterest(i)} />
                    <span>{i}</span>
                  </label>
                ))}
              </fieldset>
              <div className="field">
                <textarea id="f-msg" rows={3} placeholder=" " value={form.message} onChange={set('message')} />
                <label htmlFor="f-msg">Tell us about your home</label>
              </div>
              <button className="btn btn--primary btn--full" type="submit" disabled={status === 'sending'} data-magnetic>
                <span>{status === 'sending' ? 'Sending…' : 'Request consultation'}</span>
                <Icon name="arrow" />
              </button>
              {status === 'error' && (
                <p className="form__error" role="alert">
                  {failure}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
