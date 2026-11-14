import { Link } from "react-router-dom";
import { sora, wrap, gradAccent } from "./styles";

const linkBtn = { display: "inline-flex", alignItems: "center", padding: "11px 20px", borderRadius: 999, border: "1px solid var(--border)", background: "var(--surface)", fontSize: 13.5 } as const;

export function Cta() {
  return (
    <section style={{ ...wrap, padding: "32px 32px 80px" }}>
      <div style={{ position: "relative", overflow: "hidden", border: "1px solid var(--border-strong)", borderRadius: 24, background: "linear-gradient(160deg, color-mix(in srgb, var(--accent) 14%, transparent), var(--surface))", padding: "64px 40px", textAlign: "center" }}>
        <div style={{ position: "absolute", top: -110, left: "50%", transform: "translateX(-50%)", width: 520, height: 280, background: "radial-gradient(circle, var(--glow1), transparent 62%)", filter: "blur(30px)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <h2 style={{ fontFamily: sora, fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.04em", margin: 0 }}>
            Building something with LLMs that <span style={gradAccent}>can’t be wrong?</span>
          </h2>
          <p style={{ fontSize: 17, color: "var(--dim)", maxWidth: 520, margin: "18px auto 28px", lineHeight: 1.65 }}>
            Open to GenAI engineering roles and collaborations.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
            <Link to="/contact" style={{ ...linkBtn, border: "none", background: "var(--accent)", color: "#fff", fontWeight: 600 }}>Get in touch →</Link>
            <a href="mailto:poondlahemanth1@gmail.com" className="mono" style={linkBtn}>poondlahemanth1@gmail.com</a>
            <a href="https://github.com/hemanth-poondla" target="_blank" rel="noopener noreferrer" className="mono" style={linkBtn}>GitHub ↗</a>
            <a href="https://linkedin.com/in/hemanth-poondla" target="_blank" rel="noopener noreferrer" className="mono" style={linkBtn}>LinkedIn ↗</a>
            <a href="/resume.pdf" download="Hemanth_Poondla_Resume.pdf" className="mono" style={linkBtn}>Résumé</a>
          </div>
        </div>
      </div>
    </section>
  );
}
