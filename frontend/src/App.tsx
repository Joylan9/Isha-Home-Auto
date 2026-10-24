import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader } from './components/Loader';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Story } from './components/Story';
import { Experience } from './components/Experience';
import { Capabilities } from './components/Capabilities';
import { Principles } from './components/Principles';
import { Collections } from './components/Collections';
import { Sovir } from './components/Sovir';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useScrollReveals } from './lib/useScrollReveals';
import { bindAnchorLinks, scrollToTarget, startSmoothScroll } from './lib/smoothScroll';
import { gsap, useGSAP } from './lib/gsap';

export default function App() {
  const [ready, setReady] = useState(false);
  const [enquiry, setEnquiry] = useState<{ tier: string; n: number } | null>(null);
  const main = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  // Hold the page still while the loader plays; release into smooth scrolling.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.classList.toggle('is-loading', !ready);
    if (!ready) return;
    const stopScroll = startSmoothScroll();
    const unbind = bindAnchorLinks();
    return () => {
      stopScroll();
      unbind();
    };
  }, [ready]);

  useScrollReveals(main, ready);

  useGSAP(
    () => {
      if (!ready) return;
      gsap.to(progress.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      });
    },
    { dependencies: [ready] },
  );

  const handleEnquire = useCallback((tier: string) => {
    setEnquiry((e) => ({ tier, n: (e?.n ?? 0) + 1 }));
    scrollToTarget('#contact');
  }, []);

  const handleLoaded = useCallback(() => setReady(true), []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Loader onComplete={handleLoaded} />
      <div className="progress" aria-hidden="true">
        <span ref={progress} />
      </div>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="main" ref={main}>
        <Hero ready={ready} />
        <Marquee />
        <Story />
        <Experience />
        <Capabilities />
        <Principles />
        <Collections onEnquire={handleEnquire} />
        <Sovir />
        <Contact enquiry={enquiry} />
      </main>
      <Footer />
    </>
  );
}
