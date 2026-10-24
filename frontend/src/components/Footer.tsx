import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { navLinks, regions, tiers } from '../data/content';

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('.footer__word span', {
        yPercent: 100,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.footer__word', start: 'top 95%' },
      });
    },
    { scope: root },
  );

  return (
    <footer className="footer" ref={root}>
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src="/brand/isha-logo-512.png" alt="ISHA logo" width={72} height={66} loading="lazy" />
            <p>
              A home that <em>understands</em> you.
            </p>
            <a href="#contact" className="btn btn--glass" data-magnetic>
              <span>Book a consultation</span>
            </a>
          </div>
          <nav className="footer__cols" aria-label="Footer">
            <div>
              <h4>Explore</h4>
              {navLinks.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
            <div>
              <h4>Collections</h4>
              {tiers.map((t) => (
                <a key={t.id} href="#collections">
                  ISHA {t.name}
                </a>
              ))}
            </div>
            <div>
              <h4>Region</h4>
              {regions.map((r) => (
                <span key={r}>{r}</span>
              ))}
            </div>
          </nav>
        </div>
        <div className="footer__word" aria-hidden="true">
          {'ISHA'.split('').map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} ISHA · Intelligent Living. A brand concept powered by SoVir Technologies LLP.
          </p>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
