import { useRef } from 'react';
import { gsap, SplitText, useGSAP, EASE_OUT, prefersReducedMotion } from '../lib/gsap';
import { photos } from '../data/photos';
import { Img } from './Img';
import { Icon } from './Icon';

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ready) return;
      const reduced = prefersReducedMotion();
      const title = root.current!.querySelector<HTMLElement>('.hero__title')!;
      const split = SplitText.create(title, { type: 'lines,words', mask: 'lines' });
      gsap.set(title, { autoAlpha: 1 });

      const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
      tl.fromTo('.hero__media', { scale: 1.25, filter: 'brightness(0.4) saturate(0.8)' }, { scale: 1.08, filter: 'brightness(1) saturate(1)', duration: reduced ? 0.01 : 2.6 })
        .from(split.words, { yPercent: 120, duration: 1.4, stagger: 0.07 }, 0.25)
        .fromTo('[data-hero-fade]', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.12 }, 0.7)
        .fromTo('.hero__widget', { autoAlpha: 0, y: 40, scale: 0.94, filter: 'blur(12px)' }, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.4 }, 1.1);

      root.current!.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const o = { v: 0 };
        tl.to(o, { v: Number(el.dataset.count), duration: 1.6, ease: 'power2.out', onUpdate: () => (el.textContent = String(Math.round(o.v))) }, 1.4);
      });
      tl.fromTo('.widget__bar span', { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'power2.out' }, 1.4);

      if (reduced) return;
      // Scroll: the photo eases deeper as the copy lifts away.
      const scroll = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } as const;
      gsap.to('.hero__media img', { yPercent: 14, scale: 1.12, ease: 'none', scrollTrigger: scroll });
      gsap.to('.hero__content', { yPercent: -30, autoAlpha: 0, ease: 'none', scrollTrigger: { ...scroll, end: '70% top' } });
      gsap.to('.hero__widget', { yPercent: -60, ease: 'none', scrollTrigger: scroll });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__media">
        <Img photo={photos.heroVilla} priority alt="A sloped-roof coastal villa glowing with warm interior lighting beside a pool at night" />
      </div>
      <div className="hero__veil" />

      <div className="hero__content">
        <p className="eyebrow hero__eyebrow" data-hero-fade>
          <span className="dot" /> Premium Home Automation · Coastal Karnataka
        </p>
        <h1 className="hero__title">
          A home that <em>understands</em> you.
        </h1>
        <p className="hero__lede" data-hero-fade>
          Technology you barely notice. Comfort you experience every day.
        </p>
        <div className="hero__actions" data-hero-fade>
          <a href="#experience" className="btn btn--primary btn--still">
            <span>Experience ISHA</span>
            <Icon name="arrow" />
          </a>
          <a href="#collections" className="btn btn--ghost btn--still">
            <span>Explore collections</span>
          </a>
        </div>
      </div>

      <aside className="hero__widget glass" aria-label="Example ISHA scene: living room, evening">
        <div className="widget__head">
          <span className="widget__room">Living Room</span>
          <span className="widget__live">
            <i />
            Live
          </span>
        </div>
        <p className="widget__scene">Evening Scene</p>
        <div className="widget__row">
          <span>Ambient light</span>
          <b data-count="62">62</b>
          <small>%</small>
        </div>
        <div className="widget__bar">
          <span />
        </div>
        <div className="widget__row">
          <span>Climate</span>
          <b data-count="24">24</b>
          <small>°C</small>
        </div>
        <div className="widget__row">
          <span>Curtains</span>
          <b>Closed</b>
        </div>
      </aside>

      <div className="hero__scroll" data-hero-fade aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
