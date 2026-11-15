import { Link } from "react-router-dom";
import profileImage from "@/assets/profile.webp";
import { places } from "@/components/travelPlaces";
import { sora, gradTitle, gradAccent, wrap, pill } from "./styles";

const stack = ["OpenAI", "LangChain", "LangGraph", "RAG", "MCP", "Pinecone", "PyTorch", "FastAPI"];

const stats = [
  { v: "6+", l: "years in fintech" },
  { v: "5", l: "live products" },
  { v: "#1", l: "performance rank" },
  { v: String(places.length), l: "places explored" },
];

const steps = [
  "embed(query) → 1536d",
  "retrieve top_k=5 from portfolio.index",
  "re-rank · grounding check passed",
];

const arrow = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export function Hero() {
  return (
    <section style={{ position: "relative" }}>
      <div className="home-hero" style={{ ...wrap, padding: "64px 32px 56px" }}>
        <div className="fu">
          <div className="hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: 10, ...pill, padding: "5px 14px 5px 5px", fontSize: 12.5 }}>
            <span style={{ position: "relative", width: 30, height: 30, flexShrink: 0 }}>
              <img src={profileImage} alt="Hemanth Poondla" style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", display: "block", border: "1.5px solid var(--accent)" }} />
              <span style={{ position: "absolute", right: -1, bottom: -1, width: 9, height: 9, borderRadius: "50%", background: "var(--signal)", border: "2px solid var(--bg)", animation: "livePulse 2.4s infinite" }} />
            </span>
            <span className="mono">GenAI Engineer · Senior Product Engineer @ Temenos</span>
          </div>

          <h1 style={{ fontFamily: sora, fontSize: "clamp(36px, 5.2vw, 64px)", fontWeight: 700, lineHeight: 0.98, letterSpacing: "-0.05em", margin: "26px 0 0" }}>
            From banking systems to <span style={gradAccent}>AI systems.</span>
          </h1>

          <p style={{ fontSize: 18.5, lineHeight: 1.65, color: "var(--dim)", maxWidth: 560, margin: "26px 0 0" }}>
            Six years on software where a bug moves money the wrong way — now building with LLMs. An AI code-review tool and a RAG docs assistant at Temenos, plus five live products of my own.
          </p>

          <div className="hero-cta" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
            <Link to="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", borderRadius: 999, background: "var(--text)", color: "var(--bg)", fontSize: 14.5, fontWeight: 600 }}>
              Explore the work {arrow}
            </Link>
            <a href="#systems" style={{ display: "inline-flex", alignItems: "center", padding: "13px 24px", borderRadius: 999, border: "1px solid var(--border)", background: "var(--surface)", fontSize: 14.5, fontWeight: 500 }}>
              See the architectures
            </a>
          </div>

          <dl className="home-stats" style={{ margin: "40px 0 0", maxWidth: 640, border: "1px solid var(--border)", borderRadius: 14, background: "var(--surface)" }}>
            {stats.map((s) => (
              <div key={s.l} className="home-stat" style={{ padding: "14px 18px" }}>
                <dt className="mono" style={{ fontSize: 11.5, color: "var(--mute)" }}>{s.l}</dt>
                <dd style={{ margin: "6px 0 0", fontFamily: sora, fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, ...gradTitle }}>{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="fu" style={{ position: "relative", animationDelay: "0.18s" }}>
          <div style={{ position: "absolute", inset: -30, borderRadius: "50%", background: "radial-gradient(circle, var(--glow1), transparent 65%)", filter: "blur(28px)", pointerEvents: "none" }} />
          <div style={{ position: "relative", border: "1px solid var(--border)", borderRadius: 18, background: "var(--solid)", boxShadow: "var(--shadow)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 18px", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                {[0, 1, 2].map((i) => <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--border)" }} />)}
                <span className="mono" style={{ marginLeft: 8, fontSize: 11.5, color: "var(--mute)" }}>Portfolio assistant</span>
              </div>
              <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--signal)", border: "1px solid var(--border)", borderRadius: 999, padding: "2px 10px" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)", animation: "livePulse 2.4s infinite" }} /> live
              </span>
            </div>

            <div style={{ padding: 20, display: "grid", gap: 16 }}>
              <div style={{ marginLeft: "auto", maxWidth: "88%", padding: "10px 14px", borderRadius: "14px 14px 3px 14px", background: "var(--text)", color: "var(--bg)" }}>
                <p className="mono" style={{ margin: 0, fontSize: 10.5, opacity: 0.6 }}>You</p>
                <p style={{ margin: "4px 0 0", fontSize: 15 }}>What has Hemanth shipped with LLMs?</p>
              </div>

              <ol className="mono" style={{ listStyle: "none", margin: 0, padding: "0 0 0 14px", borderLeft: "1px solid var(--border)", display: "grid", gap: 8, fontSize: 12 }}>
                {steps.map((s) => (
                  <li key={s} style={{ color: "var(--mute)" }}><span style={{ color: "var(--accent)" }}>✓</span> {s}</li>
                ))}
                <li style={{ color: "var(--text)" }}><span style={{ color: "var(--accent)", animation: "nodePulse 1.6s infinite" }}>●</span> generating answer…</li>
              </ol>

              <div style={{ border: "1px solid var(--border)", borderRadius: "14px 14px 14px 3px", background: "var(--surface2)", padding: 14 }}>
                <p className="mono" style={{ margin: 0, fontSize: 11, color: "var(--accent)" }}>Assistant · 3 sources</p>
                <p style={{ margin: "6px 0 0", fontSize: 14.5, lineHeight: 1.6 }}>
                  An AI code-review tool and a RAG docs assistant at Temenos, an MCP server live in Claude &amp; ChatGPT for Settle, and LLM categorisation inside FinX.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                  {["[1] temenos.md", "[2] settle/mcp", "[3] finx.readme"].map((c) => (
                    <span key={c} className="mono" style={{ ...pill, padding: "2px 9px", fontSize: 10.5 }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mono" style={{ display: "flex", justifyContent: "space-between", padding: "10px 18px", borderTop: "1px solid var(--border)", background: "var(--surface)", fontSize: 11, color: "var(--mute)" }}>
              <span>Retrieval-augmented</span><span>Re-ranked</span><span style={{ color: "var(--signal)" }}>Grounded ✓</span>
            </div>
          </div>

          <div className="mono home-float" style={{ position: "absolute", left: -28, bottom: -18, display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 999, border: "1px solid var(--border)", background: "var(--header)", backdropFilter: "blur(10px)", boxShadow: "var(--shadow)", fontSize: 12 }}>
            <span style={{ color: "var(--accent)" }}>⚡</span> MCP · live in Claude &amp; ChatGPT
          </div>
        </div>
      </div>

      <div className="band" style={{ overflow: "hidden", padding: "18px 0", maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }} aria-label="Working across the modern AI stack">
        <ul className="home-marquee" style={{ display: "flex", width: "max-content", margin: 0, padding: 0, listStyle: "none", alignItems: "center", gap: 44 }}>
          {[...stack, ...stack].map((item, i) => (
            <li key={`${item}-${i}`} aria-hidden={i >= stack.length} style={{ display: "flex", alignItems: "center", gap: 44, fontFamily: sora, fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--mute)" }}>
              {item}<span style={{ fontSize: 14, color: "var(--accent)", opacity: 0.6 }}>✦</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
