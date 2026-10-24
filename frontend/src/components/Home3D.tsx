import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { HomeState, RoomId } from './three/HomeModel';
import { prefersReducedMotion } from '../lib/gsap';

const HomeScene = lazy(() => import('./three/HomeScene'));

const ROOM_LABELS: Record<RoomId, string> = {
  living: 'Living',
  kitchen: 'Kitchen',
  bedroom: 'Bedroom',
  entry: 'Entry',
};

type PresetId = 'welcome' | 'movie' | 'night' | 'away';

const PRESETS: { id: PresetId; label: string; hint: string; state: HomeState }[] = [
  {
    id: 'welcome',
    label: 'Welcome home',
    hint: 'Door unlocks, lights rise, curtains open.',
    state: { lights: { living: 0.85, kitchen: 0.8, bedroom: 0.4, entry: 0.9 }, tv: false, curtains: 1, locked: false },
  },
  {
    id: 'movie',
    label: 'Movie night',
    hint: 'Living room dims, curtains close, the screen comes alive.',
    state: { lights: { living: 0.12, kitchen: 0, bedroom: 0, entry: 0 }, tv: true, curtains: 0, locked: true },
  },
  {
    id: 'night',
    label: 'Good night',
    hint: 'A soft bedside glow; everything else rests. Door locked.',
    state: { lights: { living: 0, kitchen: 0, bedroom: 0.15, entry: 0 }, tv: false, curtains: 0, locked: true },
  },
  {
    id: 'away',
    label: 'Away',
    hint: 'All off, curtains drawn, home secured.',
    state: { lights: { living: 0, kitchen: 0, bedroom: 0, entry: 0 }, tv: false, curtains: 0, locked: true },
  },
];

export function Home3D() {
  const root = useRef<HTMLElement>(null);
  const [state, setState] = useState<HomeState>(PRESETS[0].state);
  const [preset, setPreset] = useState<PresetId | null>('welcome');
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);

  // Mount the canvas just before it scrolls in; pause rendering when off-screen.
  useEffect(() => {
    const el = root.current!;
    const mountObs = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '600px 0px' });
    const visObs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    mountObs.observe(el);
    visObs.observe(el);
    return () => {
      mountObs.disconnect();
      visObs.disconnect();
    };
  }, []);

  const toggleRoom = (id: RoomId) => {
    setPreset(null);
    setState((s) => ({ ...s, lights: { ...s.lights, [id]: s.lights[id] > 0.05 ? 0 : 0.85 } }));
  };

  const applyPreset = (id: PresetId) => {
    setPreset(id);
    setState(PRESETS.find((p) => p.id === id)!.state);
  };

  const litCount = (Object.keys(state.lights) as RoomId[]).filter((r) => state.lights[r] > 0.05).length;
  const active = PRESETS.find((p) => p.id === preset);

  return (
    <section className="home3d section" id="home-3d" ref={root}>
      <div className="container">
        <div className="section__head section__head--row">
          <div>
            <p className="eyebrow" data-reveal>
              Your home, in 3D
            </p>
            <h2 className="title" data-split>
              Every room, <em>one touch</em> away.
            </h2>
          </div>
          <p className="muted section__lede" data-reveal>
            Drag to look around this ISHA flat. Tap any room to switch its lights, or run a scene and watch the whole home respond together.
          </p>
        </div>

        <div className="home3d__stage" data-reveal>
          <div className="home3d__canvas" aria-label="Interactive 3D model of a smart flat" role="img">
            {near && (
              <Suspense fallback={<div className="home3d__loading">Loading 3D home…</div>}>
                <HomeScene state={state} onToggle={toggleRoom} active={visible} autoRotate={!prefersReducedMotion()} />
              </Suspense>
            )}
          </div>

          <div className="home3d__panel glass">
            <p className="home3d__label">Scenes</p>
            <div className="home3d__presets">
              {PRESETS.map((p) => (
                <button key={p.id} className={preset === p.id ? 'is-active' : ''} aria-pressed={preset === p.id} onClick={() => applyPreset(p.id)}>
                  {p.label}
                </button>
              ))}
            </div>
            <p className="home3d__hint" aria-live="polite">
              {active ? active.hint : 'Custom — your own mix of rooms.'}
            </p>

            <p className="home3d__label">Rooms</p>
            <div className="home3d__rooms">
              {(Object.keys(ROOM_LABELS) as RoomId[]).map((r) => {
                const on = state.lights[r] > 0.05;
                return (
                  <button key={r} className={on ? 'is-on' : ''} aria-pressed={on} onClick={() => toggleRoom(r)}>
                    <i />
                    {ROOM_LABELS[r]}
                    <span>{on ? `${Math.round(state.lights[r] * 100)}%` : 'Off'}</span>
                  </button>
                );
              })}
            </div>

            <div className="home3d__status">
              <div>
                <b>{litCount}/4</b>
                <span>Rooms lit</span>
              </div>
              <div>
                <b className={state.locked ? 'is-safe' : 'is-open'}>{state.locked ? 'Locked' : 'Unlocked'}</b>
                <span>Front door</span>
              </div>
              <div>
                <b>{state.curtains > 0.5 ? 'Open' : 'Closed'}</b>
                <span>Curtains</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
