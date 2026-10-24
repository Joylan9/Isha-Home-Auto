import { useMemo, useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { ContactShadows, OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export type RoomId = 'living' | 'kitchen' | 'bedroom' | 'entry';

export interface HomeState {
  lights: Record<RoomId, number>;
  tv: boolean;
  /** 0 = closed, 1 = open */
  curtains: number;
  locked: boolean;
}

interface Room {
  id: RoomId;
  center: [number, number];
  size: [number, number];
  floor: string;
}

/** Cutaway two-bedroom-style flat, metres. +z faces the viewer. */
export const ROOMS: Room[] = [
  { id: 'living', center: [-2.5, 2], size: [7, 4], floor: '#d8c6ad' },
  { id: 'kitchen', center: [3.5, 2], size: [5, 4], floor: '#e6e1d8' },
  { id: 'bedroom', center: [-3, -2], size: [6, 4], floor: '#cdb79a' },
  { id: 'entry', center: [3, -2], size: [6, 4], floor: '#ddd5c8' },
];

const WALL_H = 1.25;
const WALL_T = 0.12;
const WARM = new THREE.Color('#ffc978');
const GOLD = '#e2a54e';
const CYAN = '#5dfcfd';
const WALL = '#f4efe8';

/** Smoothly chases a target every frame — interruptible, never jumps. */
function useChase(target: number, speed = 4) {
  const v = useRef(target);
  return (dt: number) => {
    v.current += (target - v.current) * Math.min(1, dt * speed);
    return v.current;
  };
}

function Wall({ from, to }: { from: [number, number]; to: [number, number] }) {
  const [x1, z1] = from;
  const [x2, z2] = to;
  const len = Math.hypot(x2 - x1, z2 - z1);
  const angle = Math.atan2(z2 - z1, x2 - x1);
  return (
    <mesh position={[(x1 + x2) / 2, WALL_H / 2, (z1 + z2) / 2]} rotation={[0, -angle, 0]} castShadow receiveShadow>
      <boxGeometry args={[len + WALL_T, WALL_H, WALL_T]} />
      <meshStandardMaterial color={WALL} roughness={0.85} />
    </mesh>
  );
}

function Block({ position, size, color, radius = 0.06 }: { position: [number, number, number]; size: [number, number, number]; color: string; radius?: number }) {
  return (
    <RoundedBox args={size} radius={radius} smoothness={3} position={position} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={0.7} />
    </RoundedBox>
  );
}

function RoomFloor({ room, lit, hovered, onHover, onToggle }: { room: Room; lit: number; hovered: boolean; onHover: (id: RoomId | null) => void; onToggle: (id: RoomId) => void }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const chase = useChase(hovered ? 1 : 0, 8);
  useFrame((_, dt) => {
    const h = chase(dt);
    if (mat.current) mat.current.emissiveIntensity = 0.04 + lit * 0.12 + h * 0.18;
  });
  return (
    <mesh
      position={[room.center[0], 0.01, room.center[1]]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        onHover(room.id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        onHover(null);
        document.body.style.cursor = '';
      }}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onToggle(room.id);
      }}
    >
      <planeGeometry args={[room.size[0] - WALL_T, room.size[1] - WALL_T]} />
      <meshStandardMaterial ref={mat} color={room.floor} roughness={0.6} emissive={WARM} emissiveIntensity={0.05} />
    </mesh>
  );
}

function Pendant({ position, level }: { position: [number, number, number]; level: number }) {
  const light = useRef<THREE.PointLight>(null);
  const bulb = useRef<THREE.MeshStandardMaterial>(null);
  const chase = useChase(level, 3.2);
  useFrame((_, dt) => {
    const v = chase(dt);
    if (light.current) light.current.intensity = v * 14;
    if (bulb.current) bulb.current.emissiveIntensity = 0.15 + v * 3.2;
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 1.1]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.28, 0.24, 32, 1, true]} />
        <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.06, 0]}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial ref={bulb} color="#fff4dd" emissive={WARM} emissiveIntensity={1} toneMapped={false} />
      </mesh>
      <pointLight ref={light} position={[0, -0.2, 0]} color={WARM} distance={6} decay={1.6} castShadow={false} />
    </group>
  );
}

function Television({ on }: { on: boolean }) {
  const screen = useRef<THREE.MeshStandardMaterial>(null);
  const glow = useRef<THREE.PointLight>(null);
  const chase = useChase(on ? 1 : 0, 3);
  useFrame((state, dt) => {
    const v = chase(dt);
    const flicker = 0.85 + Math.sin(state.clock.elapsedTime * 7) * 0.08 + Math.sin(state.clock.elapsedTime * 2.3) * 0.07;
    if (screen.current) screen.current.emissiveIntensity = v * 2.2 * flicker;
    if (glow.current) glow.current.intensity = v * 5 * flicker;
  });
  return (
    <group position={[-2.6, 0, 0.32]}>
      <Block position={[0, 0.18, 0]} size={[2.4, 0.36, 0.38]} color="#1f2a44" />
      <mesh position={[0, 0.85, -0.06]}>
        <boxGeometry args={[1.9, 0.95, 0.05]} />
        <meshStandardMaterial color="#0b1222" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.85, -0.03]}>
        <planeGeometry args={[1.8, 0.86]} />
        <meshStandardMaterial ref={screen} color="#050b18" emissive="#3aa0ff" emissiveIntensity={0} toneMapped={false} />
      </mesh>
      <pointLight ref={glow} position={[0, 0.9, 0.6]} color="#4aa8ff" distance={5} decay={1.5} />
    </group>
  );
}

function Curtains({ open }: { open: number }) {
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);
  const chase = useChase(open, 2.5);
  const span = 4.6;
  useFrame((_, dt) => {
    const v = chase(dt);
    const w = THREE.MathUtils.lerp(span / 2, 0.35, v);
    for (const [mesh, dir] of [[left.current, -1], [right.current, 1]] as const) {
      if (!mesh) continue;
      mesh.scale.x = w;
      mesh.position.x = -2.5 + dir * (span / 2 - w / 2);
    }
  });
  return (
    <group position={[0, 0, 3.86]}>
      {/* Glazing */}
      <mesh position={[-2.5, 0.68, 0.08]}>
        <boxGeometry args={[span, 1.1, 0.03]} />
        <meshPhysicalMaterial color={CYAN} transmission={0.6} transparent opacity={0.22} roughness={0.05} />
      </mesh>
      {[left, right].map((ref, i) => (
        <mesh key={i} ref={ref} position={[-2.5, 0.68, 0]} castShadow>
          <boxGeometry args={[1, 1.1, 0.06]} />
          <meshStandardMaterial color="#c9b79c" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

function SmartLock({ locked }: { locked: boolean }) {
  const door = useRef<THREE.Group>(null);
  const led = useRef<THREE.MeshStandardMaterial>(null);
  const chase = useChase(locked ? 0 : 1, 3);
  const cyan = useMemo(() => new THREE.Color(CYAN), []);
  const gold = useMemo(() => new THREE.Color(GOLD), []);
  useFrame((_, dt) => {
    const v = chase(dt);
    if (door.current) door.current.rotation.y = v * 1.1;
    if (led.current) {
      led.current.emissive.copy(cyan).lerp(gold, v);
      led.current.color.copy(led.current.emissive);
    }
  });
  return (
    <group position={[4.1, 0, -4]}>
      <group ref={door}>
        <mesh position={[0.45, 0.6, 0]} castShadow>
          <boxGeometry args={[0.9, 1.2, 0.07]} />
          <meshStandardMaterial color="#3a2a1d" roughness={0.55} />
        </mesh>
        <mesh position={[0.78, 0.62, 0.06]}>
          <boxGeometry args={[0.08, 0.2, 0.04]} />
          <meshStandardMaterial ref={led} color={CYAN} emissive={CYAN} emissiveIntensity={2.4} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function Furniture() {
  return (
    <group>
      {/* Living: L-sofa, coffee table, rug */}
      <Block position={[-3.1, 0.24, 3.05]} size={[3, 0.48, 0.9]} color="#e7ddcf" />
      <Block position={[-4.95, 0.24, 2.1]} size={[0.9, 0.48, 2.3]} color="#e7ddcf" />
      <Block position={[-3.1, 0.55, 3.42]} size={[3, 0.4, 0.2]} color="#d9cdbb" />
      <Block position={[-2.6, 0.16, 1.75]} size={[1.3, 0.32, 0.75]} color="#3b2f25" />
      <mesh position={[-2.8, 0.015, 2.1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.6, 2.2]} />
        <meshStandardMaterial color="#1d3a7a" roughness={1} />
      </mesh>
      {/* Kitchen: counters + island with gold stools */}
      <Block position={[3.5, 0.45, 3.6]} size={[4.4, 0.9, 0.6]} color="#f3f1ec" />
      <Block position={[5.6, 0.45, 2.3]} size={[0.6, 0.9, 2.2]} color="#f3f1ec" />
      <Block position={[3.2, 0.46, 1.5]} size={[2.2, 0.92, 0.95]} color="#1e2b49" />
      {[2.5, 3.2, 3.9].map((x) => (
        <mesh key={x} position={[x, 0.35, 0.8]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.7, 20]} />
          <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
      {/* Bedroom: bed, headboard, side tables, wardrobe */}
      <Block position={[-3, 0.26, -2.35]} size={[2.1, 0.52, 2.3]} color="#f2efe9" />
      <Block position={[-3, 0.6, -3.55]} size={[2.4, 1.0, 0.16]} color="#1e2b49" />
      <Block position={[-3, 0.56, -2.95]} size={[1.9, 0.12, 0.7]} color="#d9cdbb" />
      <Block position={[-4.5, 0.25, -3.3]} size={[0.5, 0.5, 0.45]} color="#3b2f25" />
      <Block position={[-1.5, 0.25, -3.3]} size={[0.5, 0.5, 0.45]} color="#3b2f25" />
      <Block position={[-5.5, 0.6, -1.2]} size={[0.6, 1.2, 1.8]} color="#e2d6c4" />
      {/* Entry / study: desk, chair, console */}
      <Block position={[1.6, 0.38, -3.45]} size={[1.8, 0.08, 0.7]} color="#3b2f25" />
      <Block position={[1.6, 0.18, -3.45]} size={[0.08, 0.36, 0.6]} color="#3b2f25" />
      <Block position={[1.6, 0.28, -2.8]} size={[0.5, 0.56, 0.5]} color="#1e2b49" />
      <Block position={[5.6, 0.4, -1.6]} size={[0.5, 0.8, 1.6]} color="#f3f1ec" />
    </group>
  );
}

export function HomeModel({ state, onToggle, autoRotate }: { state: HomeState; onToggle: (id: RoomId) => void; autoRotate: boolean }) {
  const [hovered, setHovered] = useState<RoomId | null>(null);
  const ambient = useRef<THREE.AmbientLight>(null);
  const avg = (state.lights.living + state.lights.kitchen + state.lights.bedroom + state.lights.entry) / 4;
  const sun = useRef<THREE.DirectionalLight>(null);
  const chaseAmbient = useChase(0.18 + avg * 0.3 + state.curtains * 0.3, 2);
  // Daylight follows the curtains: open = bright, closed = evening mood.
  const chaseSun = useChase(0.15 + state.curtains * 1.05, 2);
  useFrame((_, dt) => {
    if (ambient.current) ambient.current.intensity = chaseAmbient(dt);
    if (sun.current) sun.current.intensity = chaseSun(dt);
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0.6} color="#fff1df" />
      <hemisphereLight args={['#cfe2ff', '#2a1d10', 0.3]} />
      <directionalLight
        ref={sun}
        position={[8, 14, 6]}
        intensity={1.1}
        color="#dbe8ff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-bias={-0.0004}
      />

      <group position={[0, -0.6, 0]}>
        {/* Plinth with a glowing smart-home ring */}
        <RoundedBox args={[13.4, 0.35, 9.4]} radius={0.12} position={[0, -0.18, 0]} receiveShadow>
          <meshStandardMaterial color="#0a2a78" roughness={0.6} metalness={0.2} />
        </RoundedBox>
        <mesh position={[0, -0.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[7.6, 7.75, 96]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.45} toneMapped={false} />
        </mesh>

        {ROOMS.map((r) => (
          <RoomFloor key={r.id} room={r} lit={state.lights[r.id]} hovered={hovered === r.id} onHover={setHovered} onToggle={onToggle} />
        ))}

        {/* Outer walls (front wall left low so you can look in) */}
        <Wall from={[-6, -4]} to={[4.1, -4]} />
        <Wall from={[5.0, -4]} to={[6, -4]} />
        <Wall from={[-6, -4]} to={[-6, 4]} />
        <Wall from={[6, -4]} to={[6, 4]} />
        {/* Inner walls with doorways */}
        <Wall from={[-6, 0]} to={[-3.6, 0]} />
        <Wall from={[-2.4, 0]} to={[1.6, 0]} />
        <Wall from={[2.8, 0]} to={[6, 0]} />
        <Wall from={[1, 0]} to={[1, 2.6]} />
        <Wall from={[0, -4]} to={[0, -1.6]} />
        {/* Low front parapet */}
        <mesh position={[3.5, 0.08, 3.94]} receiveShadow>
          <boxGeometry args={[5, 0.16, WALL_T]} />
          <meshStandardMaterial color={WALL} />
        </mesh>

        <Furniture />
        <Television on={state.tv} />
        <Curtains open={state.curtains} />
        <SmartLock locked={state.locked} />

        <Pendant position={[-3, 1.75, 2]} level={state.lights.living} />
        <Pendant position={[3.3, 1.75, 1.6]} level={state.lights.kitchen} />
        <Pendant position={[-3, 1.75, -1.9]} level={state.lights.bedroom} />
        <Pendant position={[3.2, 1.75, -2]} level={state.lights.entry} />

        <ContactShadows position={[0, -0.37, 0]} scale={18} blur={2.6} opacity={0.55} far={4} color="#000b2e" />
      </group>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={0.55}
        maxPolarAngle={1.15}
        autoRotate={autoRotate && hovered === null}
        autoRotateSpeed={0.45}
        target={[0, -0.9, 0]}
      />
    </>
  );
}
