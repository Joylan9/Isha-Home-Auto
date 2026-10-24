import { useRef, useState, type CSSProperties } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { scenes, type SceneId } from '../data/content';
import { Img } from './Img';
import { Icon } from './Icon';

interface Controls {
  light: number;
  curtain: number;
  temp: number;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function Experience() {
  const root = useRef<HTMLElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const [active, setActive] = useState<SceneId>('morning');
  const [ctrl, setCtrl] = useState<Controls>({ light: scenes[0].light, curtain: scenes[0].curtain, temp: scenes[0].temp });
  const scene = scenes.find((s) => s.id === active)!;

  const { contextSafe } = useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '.stage',
        { clipPath: 'inset(10% 6% 10% 6% round 36px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 28px)',
          ease: 'none',
          scrollTrigger: { trigger: '.stage', start: 'top 90%', end: 'top 30%', scrub: true },
        },
      );
      gsap.from('.stage__panel', {
        x: 60,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.stage', start: 'top 60%' },
      });
    },
    { scope: root },
  );

  // Scene changes glide every control to its preset instead of jumping.
  const selectScene = contextSafe((id: SceneId) => {
    const next = scenes.find((s) => s.id === id)!;
    setActive(id);
    tween.current?.kill();
    const state = { ...ctrl };
    tween.current = gsap.to(state, {
      light: next.light,
      curtain: next.curtain,
      temp: next.temp,
      duration: prefersReducedMotion() ? 0 : 1.4,
      ease: 'power3.inOut',
      onUpdate: () => setCtrl({ light: state.light, curtain: state.curtain, temp: state.temp }),
    });
  });

  const update = (patch: Partial<Controls>) => {
    tween.current?.kill();
    setCtrl((c) => ({ ...c, ...patch }));
  };

  const curtainLabel = ctrl.curtain > 95 ? 'Open' : ctrl.curtain < 5 ? 'Closed' : `${Math.round(ctrl.curtain)}%`;
  // Lights dim the room; drawn curtains shade it further.
  const dim = (1 - ctrl.light / 100) * 0.5 + (1 - ctrl.curtain / 100) * 0.25;
  const curtainShift = (ctrl.curtain / 100) * 100;

  return (
    <section className="experience section" id="experience" ref={root}>
      <div className="container">
        <div className="section__head">
          <p className="eyebrow" data-reveal>
            The ISHA experience
          </p>
          <h2 className="title" data-split>
            An invisible presence. <em>A more effortless</em> home.
          </h2>
          <p className="muted section__lede" data-reveal>
            Imagine a morning when the curtains open gently, the lighting feels natural and your preferred room settings are ready. In the evening, a
            single scene transforms your living room for family time or entertainment. Try it below.
          </p>
        </div>

        <div className="stage">
          <div className="stage__media">
            {scenes.map((s) => (
              <Img key={s.id} photo={s.photo} alt={s.alt} sizes="(min-width: 1280px) 1240px, 100vw" className={s.id === active ? 'is-active' : ''} />
            ))}
            <div className="stage__dim" style={{ opacity: dim }} />
            <div className="stage__tint" style={{ background: scene.tint }} />
            <div
              className="stage__glow"
              style={{ opacity: ctrl.light / 100, background: `radial-gradient(60% 50% at 50% 30%, rgba(255, 190, 120, ${0.08 + (ctrl.temp - 18) / 120}), transparent 70%)` }}
            />
            <div className="stage__curtain stage__curtain--l" style={{ transform: `translateX(-${curtainShift}%)` }} />
            <div className="stage__curtain stage__curtain--r" style={{ transform: `translateX(${curtainShift}%)` }} />
          </div>

          <div className="stage__time" aria-live="polite">
            <span key={scene.time} className="stage__clock">
              {scene.time}
            </span>
            <p key={scene.caption}>{scene.caption}</p>
          </div>

          <div className="stage__panel glass" role="group" aria-label="Scene controls">
            <div className="stage__scenes" role="tablist" aria-label="Scenes">
              {scenes.map((s) => (
                <button key={s.id} role="tab" aria-selected={s.id === active} className={s.id === active ? 'is-active' : ''} onClick={() => selectScene(s.id)}>
                  <Icon name={s.id} />
                  {s.label}
                </button>
              ))}
            </div>

            <label className="ctrl">
              <span className="ctrl__label">
                Lighting <b>{Math.round(ctrl.light)}%</b>
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(ctrl.light)}
                style={{ '--fill': `${ctrl.light}%` } as CSSProperties}
                onChange={(e) => update({ light: Number(e.target.value) })}
                aria-label="Lighting level"
              />
            </label>

            <label className="ctrl">
              <span className="ctrl__label">
                Curtains <b>{curtainLabel}</b>
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(ctrl.curtain)}
                style={{ '--fill': `${ctrl.curtain}%` } as CSSProperties}
                onChange={(e) => update({ curtain: Number(e.target.value) })}
                aria-label="Curtain position"
              />
            </label>

            <div className="ctrl ctrl--temp">
              <span className="ctrl__label">Climate</span>
              <div className="temp">
                <button type="button" onClick={() => update({ temp: clamp(Math.round(ctrl.temp) - 1, 18, 30) })} aria-label="Lower temperature">
                  −
                </button>
                <output aria-live="polite">{Math.round(ctrl.temp)}°</output>
                <button type="button" onClick={() => update({ temp: clamp(Math.round(ctrl.temp) + 1, 18, 30) })} aria-label="Raise temperature">
                  +
                </button>
              </div>
            </div>

            <p className="stage__note">Familiar manual controls stay within reach — always.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
