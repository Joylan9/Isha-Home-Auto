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

      // Look around the flat: the photo is far wider than the screen and
      // the cursor pans across all of it, with a gentle 3D turn.
      const hero = root.current!;
      const pan = hero.querySelector<HTMLElement>('.hero__pan')!;
      const extra = () => ({ x: Math.max(0, pan.offsetWidth - hero.offsetWidth), y: Math.max(0, pan.offsetHeight - hero.offsetHeight) });

      if (!window.matchMedia('(pointer: fine)').matches) {
        // Touch screens: drift slowly from one side of the room to the other.
        gsap.fromTo(pan, { x: () => extra().x * 0.45 }, { x: () => -extra().x * 0.45, duration: 16, ease: 'sine.inOut', repeat: -1, yoyo: true });
        return;
      }

      const to = (sel: string | Element, prop: string, d: number) => gsap.quickTo(sel, prop, { duration: d, ease: 'power3.out' });
      const panX = to(pan, 'x', 1.6);
      const panY = to(pan, 'y', 1.6);
      const turnY = to('.hero__media', 'rotationY', 1.6);
      const turnX = to('.hero__media', 'rotationX', 1.6);
      const copyX = to('.hero__content', 'x', 0.9);
      const copyY = to('.hero__content', 'y', 0.9);
      const widgetX = to('.hero__widget', 'x', 0.8);
      const widgetY = to('.hero__widget', 'y', 0.8);
      const widgetRY = to('.hero__widget', 'rotationY', 0.8);
      const widgetRX = to('.hero__widget', 'rotationX', 0.8);
      let hinted = false;

      const onMove = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        if (e.clientY > r.bottom) return;
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        const { x, y } = extra();
        panX(-nx * x);
        panY(-ny * y);
        turnY(nx * 6);
        turnX(ny * -3);
        copyX(nx * 16);
        copyY(ny * 10);
        widgetX(nx * 40);
        widgetY(ny * 26);
        widgetRY(nx * 16 - 8);
        widgetRX(ny * -10 + 4);
        if (!hinted) {
          hinted = true;
          gsap.to('.hero__hint', { autoAlpha: 0, y: -8, duration: 0.8, delay: 2.5, ease: 'power2.out' });
        }
      };
      window.addEventListener('pointermove', onMove);
      return () => window.removeEventListener('pointermove', onMove);
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__media">
        <div className="hero__pan">
          <Img photo={photos.heroFlat} priority sizes="160vw" alt="A premium apartment living room with warm layered lighting, a sculptural ceiling and floor-to-ceiling glass" />
        </div>
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

      <p className="hero__hint" data-hero-fade aria-hidden="true">
        <span className="hero__hint-icon" />
        Move your cursor to look around the flat
      </p>

      <div className="hero__scroll" data-hero-fade aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
