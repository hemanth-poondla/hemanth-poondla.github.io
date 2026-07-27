import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { CLUSTERS, type Cluster } from "./skillClusters";

/**
 * WebGL skill constellation. Each cluster is a beam from the origin; skills are
 * glowing orbs strung along it (colinear = related). Real 3D with bloom
 * post-processing. Rendered in an always-dark viewport so the glow reads.
 * Cluster data lives in ./skillClusters (kept three-free for code-splitting).
 */

const rnd = (i: number, s: number) => ((Math.sin((i + 1) * 12.9898 + s * 78.233) * 43758.5453) % 1) * 0.28 - 0.14;
const R0 = 1.2;
const STEP = 0.5;
const posFor = (c: Cluster, i: number): [number, number, number] => {
  const r = R0 + i * STEP;
  return [c.dir[0] * r + rnd(i, 1), c.dir[1] * r + rnd(i, 2), c.dir[2] * r + rnd(i, 3)];
};

const dim = (hex: string, f: number) => {
  const h = hex.replace("#", "");
  const r = Math.round(parseInt(h.slice(0, 2), 16) * f);
  const g = Math.round(parseInt(h.slice(2, 4), 16) * f);
  const b = Math.round(parseInt(h.slice(4, 6), 16) * f);
  return `rgb(${r},${g},${b})`;
};

function Orb({ position, color, on, faded, onOver, onOut, onClick }: {
  position: [number, number, number]; color: string; on: boolean; faded: boolean;
  onOver: () => void; onOut: () => void; onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const target = on ? 0.19 : 0.12;
  useFrame(() => {
    if (!ref.current) return;
    const s = ref.current.scale.x + (target - ref.current.scale.x) * 0.2;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh
      ref={ref}
      position={position}
      scale={0.12}
      onPointerOver={(e) => { e.stopPropagation(); onOver(); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { onOut(); document.body.style.cursor = "default"; }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      <sphereGeometry args={[1, 24, 24]} />
      <meshBasicMaterial color={faded ? dim(color, 0.32) : color} toneMapped={false} transparent opacity={faded ? 0.5 : 1} />
    </mesh>
  );
}

function Scene({ active, reduced, onOver, onOut, onSelect }: {
  active: string | null; reduced: boolean;
  onOver: (id: string) => void; onOut: () => void; onSelect: (id: string) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(reduced ? 1 : 0.001);
  // Fit the constellation to the viewport aspect so wide horizontal beams don't
  // clip on narrow (mobile) canvases. Recomputed each render from canvas size.
  const { size } = useThree();
  const fit = useRef(1);
  fit.current = Math.max(0.58, Math.min(1, size.width / size.height / 1.7));
  useFrame(() => {
    if (!group.current) return;
    if (t.current < 1) t.current = Math.min(1, t.current + 0.02);
    const e = t.current < 1 ? 1 - Math.pow(1 - t.current, 3) : 1;
    group.current.scale.setScalar(e * fit.current);
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduced} autoRotateSpeed={0.55} rotateSpeed={0.5} minPolarAngle={0.6} maxPolarAngle={2.4} />
      <group ref={group} scale={reduced ? 1 : 0.001}>
        {/* origin core */}
        <mesh>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshBasicMaterial color="#cfc8ff" toneMapped={false} />
        </mesh>

        {CLUSTERS.map((c) => {
          const on = active === c.id;
          const faded = !!active && !on;
          const maxR = R0 + (c.skills.length - 1) * STEP; // radius of the outermost orb
          const beamR = maxR + 0.55;
          const labelR = maxR + 1.15;
          const beamTip: [number, number, number] = [c.dir[0] * beamR, c.dir[1] * beamR, c.dir[2] * beamR];
          const labelPos: [number, number, number] = [c.dir[0] * labelR, c.dir[1] * labelR, c.dir[2] * labelR];
          const orbs = c.skills.map((_, i) => posFor(c, i));
          return (
            <group key={c.id}>
              {/* beam */}
              <Line points={[[0, 0, 0], beamTip]} color={faded ? dim(c.color, 0.28) : c.color} lineWidth={on ? 2.2 : 1} transparent opacity={faded ? 0.25 : on ? 0.9 : 0.5} />
              {/* thread through the orbs */}
              <Line points={orbs} color={faded ? dim(c.color, 0.28) : c.color} lineWidth={on ? 1.5 : 0.8} transparent opacity={faded ? 0.15 : on ? 0.6 : 0.3} />
              {/* orbs */}
              {orbs.map((p, i) => (
                <Orb key={i} position={p} color={c.color} on={on} faded={faded}
                  onOver={() => onOver(c.id)} onOut={onOut} onClick={() => onSelect(c.id)} />
              ))}
              {/* label past the last orb */}
              <Html position={labelPos} center distanceFactor={9} style={{ pointerEvents: "none", whiteSpace: "nowrap" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: on ? 700 : 500, color: on ? "#f4f4f6" : "#8a8a94", opacity: faded ? 0.35 : 1 }}>
                  {c.label}
                </span>
              </Html>
            </group>
          );
        })}
      </group>

      <EffectComposer>
        <Bloom intensity={1.15} luminanceThreshold={0.15} luminanceSmoothing={0.5} mipmapBlur radius={0.7} />
      </EffectComposer>
    </>
  );
}

export default function SkillGraph3D(props: {
  active: string | null; reduced: boolean;
  onOver: (id: string) => void; onOut: () => void; onSelect: (id: string) => void;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 10.5], fov: 40 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }} style={{ display: "block" }}>
      <Scene {...props} />
    </Canvas>
  );
}
