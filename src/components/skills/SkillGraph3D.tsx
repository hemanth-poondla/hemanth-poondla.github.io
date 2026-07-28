import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { CLUSTERS, type Cluster } from "./skillClusters";

/**
 * WebGL skill constellation. Each cluster is a *vector* from the origin — a
 * glowing arrow with its skills strung colinearly along it (colinear = related,
 * the way similar concepts line up in an embedding). A faint polar field and a
 * dim starfield anchor it as a real space. Bloom post-processing sells the glow;
 * rendered in an always-dark viewport so it reads in either theme.
 * Cluster data lives in ./skillClusters (kept three-free for code-splitting).
 */

const R0 = 0.95;
const STEP = 0.46;
const UP = new THREE.Vector3(0, 1, 0);

const orbRadius = (c: Cluster, i: number) => R0 + i * STEP;
const maxRadius = (c: Cluster) => R0 + (c.skills.length - 1) * STEP;
const vec = (d: [number, number, number], r: number): [number, number, number] => [d[0] * r, d[1] * r, d[2] * r];

const dim = (hex: string, f: number) => {
  const h = hex.replace("#", "");
  const r = Math.round(parseInt(h.slice(0, 2), 16) * f);
  const g = Math.round(parseInt(h.slice(2, 4), 16) * f);
  const b = Math.round(parseInt(h.slice(4, 6), 16) * f);
  return `rgb(${r},${g},${b})`;
};
// gradient endpoints for a beam: bright near the core, cluster-colour at the tip
const lift = (hex: string, f: number) => {
  const h = hex.replace("#", "");
  const mix = (c: number) => Math.round(c + (255 - c) * f);
  return `rgb(${mix(parseInt(h.slice(0, 2), 16))},${mix(parseInt(h.slice(2, 4), 16))},${mix(parseInt(h.slice(4, 6), 16))})`;
};

function Orb({ position, color, on, faded, onOver, onOut, onClick }: {
  position: [number, number, number]; color: string; on: boolean; faded: boolean;
  onOver: () => void; onOut: () => void; onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const target = on ? 0.185 : 0.115;
  useFrame(() => {
    if (!ref.current) return;
    const s = ref.current.scale.x + (target - ref.current.scale.x) * 0.2;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh
      ref={ref}
      position={position}
      scale={0.115}
      onPointerOver={(e) => { e.stopPropagation(); onOver(); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { onOut(); document.body.style.cursor = "default"; }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      <sphereGeometry args={[1, 24, 24]} />
      <meshBasicMaterial color={faded ? dim(color, 0.34) : color} toneMapped={false} transparent opacity={faded ? 0.5 : 1} />
    </mesh>
  );
}

/** Arrowhead cone sitting at the vector tip, oriented along its direction. */
function Arrow({ dir, r, color, on, faded }: { dir: [number, number, number]; r: number; color: string; on: boolean; faded: boolean }) {
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(UP, new THREE.Vector3(...dir).normalize()), [dir]);
  const pos = vec(dir, r);
  return (
    <mesh position={pos} quaternion={quat} scale={on ? 1.15 : 1}>
      <coneGeometry args={[0.12, 0.36, 20]} />
      <meshBasicMaterial color={faded ? dim(color, 0.34) : color} toneMapped={false} transparent opacity={faded ? 0.45 : 1} />
    </mesh>
  );
}

/** Faint reference field: three concentric polar rings on a slight tilt. */
function PolarField() {
  const rings = [1.6, 3.0, 4.4];
  const tilt = useMemo(() => new THREE.Euler(1.32, 0.2, 0), []);
  const circle = (radius: number) => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      pts.push([Math.cos(a) * radius, Math.sin(a) * radius, 0]);
    }
    return pts;
  };
  return (
    <group rotation={tilt}>
      {rings.map((r, i) => (
        <Line key={i} points={circle(r)} color="#8a8aa0" lineWidth={1} transparent opacity={0.09} />
      ))}
    </group>
  );
}

/** Dim starfield for depth. */
function Stars() {
  const geo = useMemo(() => {
    const n = 70;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(4.2 + Math.random() * 3.2);
      arr.set([v.x, v.y, v.z], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);
  return (
    <points geometry={geo}>
      <pointsMaterial size={0.045} color="#9a9ab4" transparent opacity={0.5} sizeAttenuation toneMapped={false} />
    </points>
  );
}

function Scene({ active, reduced, onOver, onOut, onSelect }: {
  active: string | null; reduced: boolean;
  onOver: (id: string) => void; onOut: () => void; onSelect: (id: string) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(reduced ? 1 : 0.001);
  const { size } = useThree();
  const fit = useRef(1);
  // Fit to the viewport aspect so the fan never clips on narrow (mobile) canvases.
  fit.current = Math.max(0.62, Math.min(1, size.width / size.height / 1.8));
  useFrame((state) => {
    if (!group.current) return;
    if (t.current < 1) t.current = Math.min(1, t.current + 0.02);
    const e = t.current < 1 ? 1 - Math.pow(1 - t.current, 3) : 1;
    group.current.scale.setScalar(e * fit.current);
    // Gentle idle sway instead of a full spin, so every vector stays legible.
    if (!reduced) {
      const s = state.clock.elapsedTime;
      group.current.rotation.y = Math.sin(s * 0.32) * 0.42;
      group.current.rotation.x = Math.sin(s * 0.24) * 0.12;
    }
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} minPolarAngle={0.7} maxPolarAngle={2.3} />
      <group ref={group} scale={reduced ? 1 : 0.001}>
        <PolarField />
        <Stars />

        {/* origin core */}
        <mesh>
          <sphereGeometry args={[0.17, 24, 24]} />
          <meshBasicMaterial color="#efecff" toneMapped={false} />
        </mesh>

        {CLUSTERS.map((c) => {
          const on = active === c.id;
          const faded = !!active && !on;
          const maxR = maxRadius(c);
          const tipR = maxR + 0.34; // arrowhead sits just past the last orb
          const labelR = tipR + 0.5;
          const orbs = c.skills.map((_, i) => vec(c.dir, orbRadius(c, i)));
          const beamStart = lift(c.color, on ? 0.55 : 0.35);
          const beamEnd = faded ? dim(c.color, 0.3) : c.color;
          return (
            <group key={c.id}>
              {/* the vector, brighter at the core, cluster-colour at the tip */}
              <Line
                points={[[0, 0, 0], vec(c.dir, tipR)]}
                vertexColors={[new THREE.Color(faded ? dim(c.color, 0.3) : beamStart), new THREE.Color(beamEnd)] as unknown as THREE.Color[]}
                lineWidth={on ? 3.4 : 2}
                transparent
                opacity={faded ? 0.28 : 1}
              />
              <Arrow dir={c.dir} r={tipR} color={c.color} on={on} faded={faded} />
              {orbs.map((p, i) => (
                <Orb key={i} position={p} color={c.color} on={on} faded={faded}
                  onOver={() => onOver(c.id)} onOut={onOut} onClick={() => onSelect(c.id)} />
              ))}
              {/* tip label as a small chip */}
              <Html position={vec(c.dir, labelR)} center distanceFactor={9} style={{ pointerEvents: "none", whiteSpace: "nowrap" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, fontWeight: on ? 700 : 500,
                  color: on ? "#f4f4f6" : "#a6a6b4", opacity: faded ? 0.4 : 1,
                  padding: "3px 9px", borderRadius: 999,
                  background: "rgba(10,10,16,0.66)", border: `1px solid ${on ? c.color : "rgba(255,255,255,0.12)"}`,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: c.color }} />
                  {c.label}
                </span>
              </Html>
            </group>
          );
        })}
      </group>

      <EffectComposer>
        <Bloom intensity={1.05} luminanceThreshold={0.18} luminanceSmoothing={0.5} mipmapBlur radius={0.72} />
      </EffectComposer>
    </>
  );
}

export default function SkillGraph3D(props: {
  active: string | null; reduced: boolean;
  onOver: (id: string) => void; onOut: () => void; onSelect: (id: string) => void;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 13.5], fov: 40 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }} style={{ display: "block" }}>
      <Scene {...props} />
    </Canvas>
  );
}
