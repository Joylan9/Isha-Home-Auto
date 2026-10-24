import type { RefObject } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP, EASE_OUT, prefersReducedMotion } from './gsap';

/**
 * Declarative scroll motion, driven by data attributes inside `scope`:
 *  - data-split    headline lines rise out of a mask
 *  - data-words    paragraph words fill from dim to bright as you scroll
 *  - data-reveal   soft fade + lift
 *  - data-clip     image frame unveils with a clip-path wipe
 *  - data-parallax image drifts at a different speed (value = yPercent range)
 *  - data-magnetic elements lean toward the cursor
 */
export function useScrollReveals(scope: RefObject<HTMLElement | null>, enabled: boolean) {
  useGSAP(
    () => {
      if (!enabled) return;
      const q = gsap.utils.selector(scope);

      if (prefersReducedMotion()) {
        gsap.set(q('[data-reveal], [data-split], [data-clip]'), { autoAlpha: 1, clearProps: 'clipPath,transform' });
        return;
      }

      q('[data-split]').forEach((el) => {
        const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
        gsap.set(el, { autoAlpha: 1 });
        gsap.from(split.lines, {
          yPercent: 110,
          rotate: 2,
          duration: 1.3,
          ease: EASE_OUT,
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      q('[data-words]').forEach((el) => {
        const split = SplitText.create(el, { type: 'words' });
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        );
      });

      q('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 36 },
          { autoAlpha: 1, y: 0, duration: 1.2, ease: EASE_OUT, scrollTrigger: { trigger: el, start: 'top 88%' } },
        );
      });

      q('[data-clip]').forEach((el) => {
        const img = el.querySelector('img');
        gsap.fromTo(
          el,
          { clipPath: 'inset(18% 12% 18% 12% round 28px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 28px)',
            duration: 1.6,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        );
        if (img) gsap.fromTo(img, { scale: 1.3 }, { scale: 1.05, duration: 2, ease: EASE_OUT, scrollTrigger: { trigger: el, start: 'top 85%' } });
      });

      q('[data-parallax]').forEach((el) => {
        const amount = Number(el.dataset.parallax) || 8;
        gsap.fromTo(
          el,
          { yPercent: -amount },
          { yPercent: amount, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });

      // Magnetic buttons — fine pointers only.
      const cleanups: Array<() => void> = [];
      if (window.matchMedia('(pointer: fine)').matches) {
        (q('[data-magnetic]') as HTMLElement[]).forEach((el) => {
          const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
          const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.38);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener('pointermove', move);
          el.addEventListener('pointerleave', leave);
          cleanups.push(() => {
            el.removeEventListener('pointermove', move);
            el.removeEventListener('pointerleave', leave);
          });
        });
      }

      ScrollTrigger.refresh();
      return () => cleanups.forEach((fn) => fn());
    },
    { scope, dependencies: [enabled] },
  );
}
