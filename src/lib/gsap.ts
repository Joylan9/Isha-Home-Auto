import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Apple-style curves: a long, soft settle with no overshoot. */
export const EASE_OUT = 'expo.out';
export const EASE_IN_OUT = 'power3.inOut';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };

// Dev-only handle for inspecting timelines from the browser console.
if (import.meta.env.DEV) (window as unknown as { gsap: typeof gsap }).gsap = gsap;
