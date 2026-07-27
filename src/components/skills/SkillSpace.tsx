import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { CLUSTERS } from "./skillClusters";

/**
 * "Skills, as a vector space." A WebGL constellation (lazy-loaded, mounted only
 * when scrolled into view) is the signature; the DOM chips + detail panel around
 * it stay crisp and accessible. Tap a beam to surface its skills + what shipped.
 */

const SkillGraph3D = lazy(() => import("./SkillGraph3D"));

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function SkillSpace() {
  const reduced = useRef(prefersReduced());
  const viewportRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const active = hover ?? selected;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pick = (id: string) => setSelected((s) => (s === id ? null : id));
  const detail = CLUSTERS.find((c) => c.id === selected);

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", border: "1px solid var(--border)", borderRadius: 22, background: "radial-gradient(120% 100% at 50% 0%, var(--surface), transparent 70%)", padding: 18, boxShadow: "var(--shadow)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
        <span className="mono" style={{ fontSize: 12, color: "var(--mute)" }}>skills ∈ ℝ³ · drag to orbit</span>
        <span className="mono" style={{ fontSize: 10.5, color: "var(--accent)" }}>colinear = related</span>
      </div>

      {/* always-dark viewport so the bloom reads, even in light theme */}
      <div
        ref={viewportRef}
        className="skill-canvas"
        style={{ position: "relative", width: "100%", height: 440, borderRadius: 14, overflow: "hidden", background: "radial-gradient(120% 120% at 50% 40%, #14131f, #08080b 75%)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {inView && (
          <Suspense fallback={<div className="mono" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#6a6a76" }}>rendering space…</div>}>
            <SkillGraph3D active={active} reduced={reduced.current} onOver={setHover} onOut={() => setHover(null)} onSelect={pick} />
          </Suspense>
        )}
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
              border: `1px solid ${active === c.id ? c.color : "var(--border)"}`,
              background: selected === c.id ? "var(--surface2)" : "transparent",
              color: active === c.id ? "var(--text)" : "var(--mute)",
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
