import { useEffect, useRef, useState } from "react";

/**
 * Skills as a luminous constellation in 3D. Each cluster is a beam from the
 * origin; related skills are orbs along that beam — colinear = related, the way
 * an embedding groups similar concepts. Rendered on Canvas with additive glow
 * (dark) / soft halos (light), rotated by a real composed rotation matrix.
 * Tap a beam to surface its skills + what they shipped.
 */

type Vec3 = [number, number, number];

interface Cluster {
  id: string;
  label: string;
  color: string;
  dir: Vec3;
  proof: string;
  skills: string[];
}

const unit = (v: Vec3): Vec3 => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};

const CLUSTERS: Cluster[] = [
  { id: "ai", label: "AI / GenAI", color: "#8b7dff", dir: unit([0.95, 0.26, 0.32]), proof: "Shipped a RAG docs assistant and AI code-review tooling at Temenos; OpenAI powers Trip Captain.", skills: ["LangChain", "LangGraph", "RAG", "Embeddings", "OpenAI API", "MCP", "Vector Search"] },
  { id: "fe", label: "Frontend", color: "#22d3ee", dir: unit([-0.7, 0.66, 0.28]), proof: "6+ years of production banking UI, including a top-ranked Supply Chain Finance redesign.", skills: ["React", "TypeScript", "Tailwind", "UI / UX"] },
  { id: "be", label: "Backend / Data", color: "#4ade80", dir: unit([0.24, -0.82, 0.5]), proof: "The APIs and Supabase data layer behind five live products.", skills: ["Node.js", "Supabase", "REST", "SQL"] },
  { id: "domain", label: "Domain", color: "#c99a3a", dir: unit([-0.52, -0.32, -0.8]), proof: "Deep Trade Finance and corporate-banking domain knowledge.", skills: ["Trade Finance", "Banking"] },
];

const rnd = (i: number, s: number) => ((Math.sin((i + 1) * 12.9898 + s * 78.233) * 43758.5453) % 1) * 0.2 - 0.1;

interface Node { cluster: string; color: string; p: Vec3; idx: number; }
const NODES: Node[] = CLUSTERS.flatMap((c) =>
  c.skills.map((_, i) => {
    const r = 1.25 + i * 0.42;
    return { cluster: c.id, color: c.color, idx: i, p: [c.dir[0] * r + rnd(i, 1), c.dir[1] * r + rnd(i, 2), c.dir[2] * r + rnd(i, 3)] as Vec3 };
  })
);

function rotate(p: Vec3, theta: number, phi: number): Vec3 {
  const [x, y, z] = p;
  const cp = Math.cos(phi), sp = Math.sin(phi);
  const y1 = y * cp - z * sp;
  const z1 = y * sp + z * cp;
  const ct = Math.cos(theta), st = Math.sin(theta);
  return [x * ct + z1 * st, y1, -x * st + z1 * ct];
}

const hexA = (hex: string, a: number) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
};

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function SkillSpace() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theta = useRef(0.5);
  const phi = useRef(-0.3);
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const start = useRef(0);
  const projRef = useRef<{ x: number; y: number; cluster: string }[]>([]);
  const stateRef = useRef({ hover: null as string | null, selected: null as string | null });
  const [selected, setSelected] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  stateRef.current = { hover, selected };

  useEffect(() => {
    const canvas = canvasRef.current, wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = prefersReduced();
    let raf = 0;
    let W = 0, H = 0, dpr = 1;

    let colors = { text: "#f4f4f6", mute: "#8a8a94", dark: true };
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const dark = document.documentElement.getAttribute("data-theme") !== "light";
      colors = {
        text: cs.getPropertyValue("--text").trim() || (dark ? "#f4f4f6" : "#161522"),
        mute: cs.getPropertyValue("--mute").trim() || "#8a8a94",
        dark,
      };
    };
    readColors();
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = wrap.clientWidth; H = wrap.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    start.current = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const draw = (now: number) => {
      const { hover: hv, selected: sel } = stateRef.current;
      const active = hv ?? sel;
      if (!drag.current && !reduced) theta.current += 0.0035;
      const assemble = reduced ? 1 : ease(Math.min(1, (now - start.current) / 1300));

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const scale = Math.min(W, H) * 0.125;
      const proj = (p: Vec3): [number, number] => [cx + p[0] * scale, cy - p[1] * scale];

      // ---- beams ----
      CLUSTERS.forEach((c) => {
        const [ox, oy] = proj(rotate([0, 0, 0], theta.current, phi.current));
        const [tx, ty] = proj(rotate([c.dir[0] * 3.7 * assemble, c.dir[1] * 3.7 * assemble, c.dir[2] * 3.7 * assemble], theta.current, phi.current));
        const on = active === c.id;
        const dim = active && !on;
        const g = ctx.createLinearGradient(ox, oy, tx, ty);
        g.addColorStop(0, hexA(c.color, on ? 0.9 : dim ? 0.08 : 0.4));
        g.addColorStop(1, hexA(c.color, 0));
        ctx.strokeStyle = g;
        ctx.lineWidth = on ? 3 : 1.4;
        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(tx, ty); ctx.stroke();
      });

      // ---- origin glow ----
      const [ox, oy] = proj(rotate([0, 0, 0], theta.current, phi.current));
      const pulse = reduced ? 0.6 : 0.55 + 0.25 * Math.sin(now / 900);
      const og = ctx.createRadialGradient(ox, oy, 0, ox, oy, 34);
      og.addColorStop(0, hexA("#a99fff", 0.5 * pulse * assemble));
      og.addColorStop(1, hexA("#a99fff", 0));
      ctx.fillStyle = og;
      ctx.beginPath(); ctx.arc(ox, oy, 34, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = hexA("#c9c2ff", 0.9 * assemble);
      ctx.beginPath(); ctx.arc(ox, oy, 3, 0, Math.PI * 2); ctx.fill();

      // ---- nodes (depth sorted) ----
      const pts = NODES.map((n) => {
        const r = rotate([n.p[0] * assemble, n.p[1] * assemble, n.p[2] * assemble], theta.current, phi.current);
        const [sx, sy] = proj(r);
        return { n, sx, sy, z: r[2] };
      }).sort((a, b) => a.z - b.z);
      const zs = pts.map((p) => p.z);
      const zMin = Math.min(...zs), zMax = Math.max(...zs);
      const depth = (z: number) => (zMax === zMin ? 0.5 : (z - zMin) / (zMax - zMin));

      // thread linking each cluster's orbs (draw under)
      CLUSTERS.forEach((c) => {
        const cp = pts.filter((p) => p.n.cluster === c.id).sort((a, b) => a.n.idx - b.n.idx);
        const on = active === c.id;
        if (cp.length < 2) return;
        ctx.strokeStyle = hexA(c.color, on ? 0.35 : active ? 0.04 : 0.14);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(cp[0].sx, cp[0].sy);
        for (let i = 1; i < cp.length; i++) ctx.lineTo(cp[i].sx, cp[i].sy);
        ctx.stroke();
      });

      projRef.current = [];
      pts.forEach(({ n, sx, sy, z }) => {
        const d = depth(z);
        const on = active === n.cluster;
        const dim = active && !on;
        const base = 2.4 + d * 4.2;
        const rad = base * (on ? 1.2 : 1);
        // halo (additive on dark for luminous add-up)
        if (colors.dark) ctx.globalCompositeOperation = "lighter";
        const hg = ctx.createRadialGradient(sx, sy, 0, sx, sy, rad * 3.6);
        hg.addColorStop(0, hexA(n.color, (dim ? 0.06 : 0.42) * (0.5 + d * 0.5)));
        hg.addColorStop(1, hexA(n.color, 0));
        ctx.fillStyle = hg;
        ctx.beginPath(); ctx.arc(sx, sy, rad * 3.6, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        // core
        ctx.fillStyle = hexA(n.color, dim ? 0.22 : 0.9);
        ctx.beginPath(); ctx.arc(sx, sy, rad, 0, Math.PI * 2); ctx.fill();
        // specular
        if (!dim) {
          ctx.fillStyle = hexA("#ffffff", 0.5 + d * 0.3);
          ctx.beginPath(); ctx.arc(sx - rad * 0.3, sy - rad * 0.3, rad * 0.34, 0, Math.PI * 2); ctx.fill();
        }
        projRef.current.push({ x: sx, y: sy, cluster: n.cluster });
      });

      // ---- cluster labels at beam tips ----
      ctx.font = "600 12px 'JetBrains Mono', monospace";
      ctx.textBaseline = "middle";
      CLUSTERS.forEach((c) => {
        const tip = rotate([c.dir[0] * 4.35 * assemble, c.dir[1] * 4.35 * assemble, c.dir[2] * 4.35 * assemble], theta.current, phi.current);
        let [lx, ly] = proj(tip);
        const on = active === c.id;
        const dim = active && !on;
        const left = lx < cx;
        lx = Math.max(46, Math.min(W - 46, lx));
        ly = Math.max(14, Math.min(H - 14, ly));
        ctx.textAlign = left ? "left" : "right";
        ctx.fillStyle = on ? colors.text : colors.mute;
        ctx.globalAlpha = dim ? 0.3 : 1;
        ctx.fillText(c.label, lx + (left ? 6 : -6), ly);
        ctx.globalAlpha = 1;
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); mo.disconnect(); };
  }, []);

  // pointer interaction
  const hit = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const r = canvas.getBoundingClientRect();
    const x = clientX - r.left, y = clientY - r.top;
    let best: string | null = null, bd = 20;
    for (const p of projRef.current) {
      const dd = Math.hypot(p.x - x, p.y - y);
      if (dd < bd) { bd = dd; best = p.cluster; }
    }
    return best;
  };
  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY, moved: false };
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (drag.current) {
      const dx = e.clientX - drag.current.x, dy = e.clientY - drag.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) drag.current.moved = true;
      drag.current = { x: e.clientX, y: e.clientY, moved: drag.current.moved };
      theta.current += dx * 0.008;
      phi.current = Math.max(-1.2, Math.min(1.2, phi.current + dy * 0.008));
    } else {
      setHover(hit(e.clientX, e.clientY));
    }
  };
  const onUp = (e: React.PointerEvent) => {
    if (drag.current && !drag.current.moved) {
      const c = hit(e.clientX, e.clientY);
      if (c) setSelected((s) => (s === c ? null : c));
    }
    drag.current = null;
  };

  const pick = (id: string) => setSelected((s) => (s === id ? null : id));
  const detail = CLUSTERS.find((c) => c.id === selected);

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", border: "1px solid var(--border)", borderRadius: 22, background: "radial-gradient(120% 100% at 50% 0%, var(--surface), transparent 70%)", padding: 18, boxShadow: "var(--shadow)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
        <span className="mono" style={{ fontSize: 12, color: "var(--mute)" }}>skills ∈ ℝ³ · drag to orbit</span>
        <span className="mono" style={{ fontSize: 10.5, color: "var(--accent)" }}>colinear = related</span>
      </div>

      <div
        ref={wrapRef}
        className="skill-canvas"
        style={{ position: "relative", width: "100%", maxWidth: 680, height: 430, margin: "0 auto", borderRadius: 14, overflow: "hidden", touchAction: "none", cursor: "grab" }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={() => { drag.current = null; setHover(null); }}
          style={{ display: "block" }}
        />
      </div>

      {/* beam selector */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        <span className="mono" style={{ fontSize: 10.5, color: "var(--faint)" }}>tap a beam →</span>
        {CLUSTERS.map((c) => (
          <button
            key={c.id}
            className="mono"
            onPointerEnter={() => setHover(c.id)}
            onPointerLeave={() => setHover(null)}
            onClick={() => pick(c.id)}
            aria-pressed={selected === c.id}
            style={{
              cursor: "pointer", fontSize: 10.5, padding: "6px 11px", borderRadius: 999,
              border: `1px solid ${(hover ?? selected) === c.id ? c.color : "var(--border)"}`,
              background: selected === c.id ? "var(--surface2)" : "transparent",
              color: (hover ?? selected) === c.id ? "var(--text)" : "var(--mute)",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: 999, background: c.color }} />
            {c.label}
          </button>
        ))}
      </div>

      {/* detail */}
      <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)", minHeight: 96 }}>
        {detail ? (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 10 }}>
              {detail.skills.map((s) => (
                <span key={s} className="mono" style={{ fontSize: 11.5, padding: "5px 11px", borderRadius: 999, border: `1px solid ${detail.color}`, background: "var(--surface2)", color: "var(--text)" }}>{s}</span>
              ))}
            </div>
            <p style={{ fontSize: 13.5, color: "var(--dim)", margin: 0, lineHeight: 1.6 }}>{detail.proof}</p>
          </>
        ) : (
          <p style={{ fontSize: 13.5, color: "var(--mute)", margin: 0, lineHeight: 1.6, maxWidth: 640 }}>
            Four directions in my skill space — <span style={{ color: "var(--text)" }}>related skills line up along the same beam</span>, just like similar concepts cluster in an embedding. Tap a beam to see what lives there and what it shipped.
          </p>
        )}
      </div>
    </div>
  );
}
