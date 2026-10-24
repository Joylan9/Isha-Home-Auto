import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { unsplashUrl } from '../lib/unsplash';
import { photos } from '../data/photos';

/** Waits for the hero photo + fonts, while the ISHA mark draws itself in. */
function waitForAssets(): Promise<void> {
  const hero = new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = unsplashUrl(photos.heroVilla, window.innerWidth > 1600 ? 2400 : 1600);
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
      const strokes = gsap.utils.toArray<SVGGeometryElement>('.loader__stroke');

      strokes.forEach((s) => {
        const len = s.getTotalLength();
        gsap.set(s, { strokeDasharray: len, strokeDashoffset: len });
      });

      const intro = gsap.timeline();
      intro
        .to(strokes, { strokeDashoffset: 0, duration: reduced ? 0.01 : 1.6, ease: 'power2.inOut', stagger: 0.18 })
        .to('.loader__fill', { opacity: 1, duration: 0.6 }, '-=0.5')
        .from('.loader__word span', { yPercent: 120, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, 0.3)
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
      <div className="loader__inner">
        <svg className="loader__mark" viewBox="0 0 100 100" fill="none">
          <defs>
            <linearGradient id="loaderGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#E8EDF3" />
              <stop offset="0.55" stopColor="#C4CCD6" />
              <stop offset="1" stopColor="#168DDF" />
            </linearGradient>
          </defs>
          <path className="loader__fill" d="M31 87 V60 Q31 54 36 51 L43 47 V87 Z" />
          <circle className="loader__fill" cx="37" cy="38" r="6.5" />
          <path className="loader__stroke" d="M8 44 L44 16 Q48 13 52 16 L82 40 Q87 44 87 50 L87 79 Q87 87 79 87 L50 87" />
          <circle className="loader__stroke" cx="37" cy="38" r="6.5" />
          <path className="loader__stroke" d="M31 87 V60 Q31 54 36 51 L43 47 V87 Z" />
        </svg>
        <div className="loader__word">
          {'ISHA'.split('').map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
        <p className="loader__tag">Intelligent Living</p>
      </div>
      <div className="loader__count">
        <span className="loader__num">0</span>%
      </div>
    </div>
  );
}
