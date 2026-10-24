import { useEffect, useState } from 'react';
import { navLinks, regions } from '../data/content';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > last && y > window.innerHeight * 0.9);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}${hidden && !open ? ' is-hidden' : ''}`}>
        <a href="#top" className="nav__brand" aria-label="ISHA — Intelligent Living, back to top" onClick={close}>
          <img src="/brand/isha-logo-512.webp" alt="" width={52} height={52} />
        </a>
        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              <span data-text={l.label}>{l.label}</span>
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn--glass nav__cta" data-magnetic>
          <span>Book a consultation</span>
        </a>
        <button
          className={`nav__toggle${open ? ' is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`menu${open ? ' is-open' : ''}`} id="menu" aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile">
          {[...navLinks, { href: '#contact', label: 'Contact' }].map((l, i) => (
            <a key={l.href} href={l.href} onClick={close} style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : '0s' }}>
              <em>0{i + 1}</em>
              {l.label}
            </a>
          ))}
        </nav>
        <p className="menu__foot">{regions.join(' · ')}</p>
      </div>
    </>
  );
}
