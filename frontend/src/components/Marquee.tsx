import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { regions } from '../data/content';

/** Endless ribbon of the towns ISHA serves; scrolling speeds it up and flips its direction. */
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const loop = gsap.to('.marquee__track', { xPercent: -50, ease: 'none', duration: 32, repeat: -1 });
      let direction = 1;
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          if (self.direction !== direction) direction = self.direction;
          const boost = Math.min(Math.abs(self.getVelocity()) / 300, 6);
          gsap.to(loop, { timeScale: direction * (1 + boost), duration: 0.3, overwrite: true });
          gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.3 });
        },
      });
    },
    { scope: root },
  );

  const items = [...regions, 'Intelligent Living'];
  return (
    <div className="marquee" ref={root} aria-label={`Serving ${regions.join(', ')}`}>
      <div className="marquee__track" aria-hidden="true">
        {[0, 1].map((n) => (
          <div className="marquee__group" key={n}>
            {items.map((r) => (
              <span key={r}>
                {r}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
