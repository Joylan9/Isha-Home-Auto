import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { pillars } from '../data/content';
import { Img } from './Img';

/** The four pillars — pinned and scrolled sideways on desktop, stacked on mobile. */
export function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 960px)', () => {
        const track = root.current!.querySelector<HTMLElement>('.spaces__track')!;
        const distance = () => track.scrollWidth - window.innerWidth + 64;
        const scroll = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        gsap.to('.spaces__bar span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, scrub: true } });
        gsap.utils.toArray<HTMLElement>('.pillar').forEach((card) => {
          const img = card.querySelector('img');
          if (img) gsap.fromTo(img, { xPercent: -10 }, { xPercent: 10, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: scroll, start: 'left right', end: 'right left', scrub: true } });
        });
      });
      mm.add('(max-width: 959px)', () => {
        gsap.utils.toArray<HTMLElement>('.pillar').forEach((card) => {
          gsap.from(card, { y: 60, autoAlpha: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 85%' } });
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="spaces" id="spaces" ref={root}>
      <div className="spaces__intro container">
        <div>
          <p className="eyebrow" data-reveal>
            What ISHA brings to your space
          </p>
          <h2 className="title" data-split>
            Four pillars of <em>intelligent</em> living.
          </h2>
        </div>
        <div className="spaces__bar" aria-hidden="true">
          <span />
        </div>
      </div>
      <div className="spaces__track">
        {pillars.map((p) => (
          <article className="pillar" key={p.num}>
            <div className="pillar__media">
              <Img photo={p.photo} alt={p.alt} sizes="(min-width: 960px) 44vw, 92vw" />
            </div>
            <div className="pillar__body">
              <span className="pillar__num">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <ul>
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
