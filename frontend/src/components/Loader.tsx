import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { unsplashUrl } from '../lib/unsplash';
import { photos } from '../data/photos';

/** Waits for the hero photo + fonts, while the ISHA mark draws itself in. */
function waitForAssets(): Promise<void> {
  const hero = new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = unsplashUrl(photos.heroFlat, window.innerWidth > 1600 ? 2400 : 1600);
  });
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, 4500));
  return Promise.race([Promise.all([hero, document.fonts.ready]).then(() => undefined), timeout]);
}

export function Loader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const reduced = prefersReducedMotion();
      const counter = { v: 0 };
      const num = root.current!.querySelector('.loader__num')!;
      const intro = gsap.timeline();
      intro
        .fromTo('.loader__logo', { scale: 0.82, autoAlpha: 0, filter: 'blur(16px)', rotateX: 18 }, { scale: 1, autoAlpha: 1, filter: 'blur(0px)', rotateX: 0, duration: reduced ? 0.01 : 1.4, ease: 'expo.out' })
        .to('.loader__shine', { xPercent: 240, duration: reduced ? 0.01 : 1.3, ease: 'power2.inOut' }, 0.5)
        .from('.loader__tag', { autoAlpha: 0, y: 12, duration: 0.8, ease: 'expo.out' }, 0.7)
        .to(counter, {
          v: 86,
          duration: reduced ? 0.01 : 1.8,
          ease: 'power1.out',
          onUpdate: () => (num.textContent = String(Math.round(counter.v))),
        }, 0);

      // StrictMode mounts twice: ignore callbacks from a reverted run.
      let cancelled = false;
      const finish = contextSafe!(() => {
        if (cancelled) return;
        gsap
          .timeline({ onComplete })
          .to(counter, { v: 100, duration: 0.5, ease: 'power2.out', onUpdate: () => (num.textContent = String(Math.round(counter.v))) })
          .to(['.loader__inner', '.loader__count'], { yPercent: -30, autoAlpha: 0, duration: 0.8, ease: 'power3.in' }, '+=0.15')
          .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=0.35')
          .set(root.current, { display: 'none' });
      });
      Promise.all([waitForAssets(), intro.then()]).then(finish);
      return () => {
        cancelled = true;
      };
    },
    { scope: root },
  );

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__inner" style={{ perspective: 800 }}>
        <div className="loader__logo">
          <img src="/brand/isha-logo-512.webp" alt="" width={200} height={200} />
          <span className="loader__shine" />
        </div>
        <p className="loader__tag">Intelligent Living</p>
      </div>
      <div className="loader__count">
        <span className="loader__num">0</span>%
      </div>
    </div>
  );
}
