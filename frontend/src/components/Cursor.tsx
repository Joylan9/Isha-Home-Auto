import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

/** A soft ring that trails the pointer and grows over interactive elements. */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.documentElement.classList.add('has-cursor');
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3.out' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3.out' });
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08 });

    const move = (e: PointerEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>('[data-cursor]');
      const interactive = t.closest('a, button, input, select, textarea, label, [data-tilt]');
      ring.current!.classList.toggle('is-hover', Boolean(interactive));
      ring.current!.classList.toggle('is-label', Boolean(labelled));
      label.current!.textContent = labelled?.dataset.cursor ?? '';
    };
    const down = () => ring.current!.classList.add('is-down');
    const up = () => ring.current!.classList.remove('is-down');
    const leave = () => gsap.to([ring.current, dot.current], { opacity: 0, duration: 0.3 });
    const enter = () => gsap.to([ring.current, dot.current], { opacity: 1, duration: 0.3 });

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.documentElement.addEventListener('pointerleave', leave);
    document.documentElement.addEventListener('pointerenter', enter);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.documentElement.removeEventListener('pointerenter', enter);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor__dot" ref={dot} />
      <div className="cursor__ring" ref={ring}>
        <span className="cursor__label" ref={label} />
      </div>
    </div>
  );
}
