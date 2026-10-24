import type { CSSProperties, PointerEvent } from 'react';
import { tiers } from '../data/content';
import { Img } from './Img';
import { Icon } from './Icon';

/** Cards lean toward the pointer, with a soft spotlight following it. */
function onTilt(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  el.style.setProperty('--rx', `${(0.5 - py) * 8}deg`);
  el.style.setProperty('--ry', `${(px - 0.5) * 10}deg`);
  el.style.setProperty('--mx', `${px * 100}%`);
  el.style.setProperty('--my', `${py * 100}%`);
}

function resetTilt(e: PointerEvent<HTMLElement>) {
  e.currentTarget.style.setProperty('--rx', '0deg');
  e.currentTarget.style.setProperty('--ry', '0deg');
}

export function Collections({ onEnquire }: { onEnquire: (tierId: string) => void }) {
  return (
    <section className="collections section" id="collections">
      <div className="container">
        <div className="section__head section__head--row">
          <div>
            <p className="eyebrow" data-reveal>
              Four ways to live smarter
            </p>
            <h2 className="title" data-split>
              The ISHA <em>collections</em>.
            </h2>
          </div>
          <p className="muted section__lede" data-reveal>
            Start with the essentials or go whole-home. Every collection grows with you, room by room.
          </p>
        </div>

        <div className="tiers">
          {tiers.map((t, i) => (
            <div className="tier-wrap" data-reveal key={t.id} style={{ '--i': i } as CSSProperties}>
            <article className={`tier${t.badge ? ' tier--feature' : ''}`} data-tilt onPointerMove={onTilt} onPointerLeave={resetTilt}>
              {t.badge && <span className="tier__badge">{t.badge}</span>}
              <div className="tier__media">
                <Img photo={t.photo} alt={t.alt} sizes="(min-width: 1100px) 25vw, (min-width: 640px) 50vw, 100vw" />
              </div>
              <div className="tier__body">
                <div className="tier__level" aria-label={`Level ${t.level} of 4`}>
                  {[1, 2, 3, 4].map((n) => (
                    <i key={n} className={n <= t.level ? 'on' : ''} />
                  ))}
                </div>
                <h3>
                  ISHA <span>{t.name}</span>
                </h3>
                <p>{t.tagline}</p>
                <ul>
                  {t.includes.map((inc) => (
                    <li key={inc}>
                      <Icon name="check" />
                      {inc}
                    </li>
                  ))}
                </ul>
                <button className="tier__cta" onClick={() => onEnquire(t.id)}>
                  Enquire about {t.name} <Icon name="arrow" />
                </button>
              </div>
            </article>
            </div>
          ))}
        </div>
        <p className="collections__note" data-reveal>
          Collections and capabilities shown are planned offerings, subject to development and validation.
        </p>
      </div>
    </section>
  );
}
