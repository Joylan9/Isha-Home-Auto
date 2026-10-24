import { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { HomeModel, type HomeState, type RoomId } from './HomeModel';

/** Pulls the camera back on tall/narrow canvases so the whole flat stays in frame. */
function FitCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    const dist = 18.5 * Math.max(1, 1.45 / aspect);
    camera.position.setLength(dist);
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

/** Lazy-loaded so three.js stays out of the first-paint bundle. */
export default function HomeScene({
  state,
  onToggle,
  active,
  autoRotate,
}: {
  state: HomeState;
  onToggle: (id: RoomId) => void;
  active: boolean;
  autoRotate: boolean;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [11, 9.5, 12.5], fov: 34, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <FitCamera />
      <HomeModel state={state} onToggle={onToggle} autoRotate={autoRotate} />
    </Canvas>
  );
}
