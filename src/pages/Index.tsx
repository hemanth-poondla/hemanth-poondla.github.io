import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AISystemDiagram } from "@/components/AISystemDiagram";
import profileImage from "@/assets/profile.jpg";

const techStack = ["OpenAI", "LangChain", "LangGraph", "RAG", "MCP", "Pinecone", "PyTorch", "FastAPI"];
const ragFlow = ["Query", "Embed", "Retriever", "Vector DB", "Re-ranker", "LLM"];
const agentWorkers = ["Destination research", "Budget math", "Itinerary check"];
const mcpTools = ["FinX expenses", "Settle balances", "Gmail", "Supabase"];

const stats = [
  { value: "6+", label: "years engineering" },
  { value: "5", label: "products shipped" },
  { value: "AI", label: "current focus" },
  { value: "#1", label: "internal UX redesign" },
];

/** Every line has to prove something — no generic "React & TypeScript". */
const skills = [
  { name: "Product & UI/UX Design", cat: "Unified UX redesign for Supply Chain Finance — top-ranked internally", level: 5 },
  { name: "React & TypeScript", cat: "6+ yrs building enterprise banking UI at Temenos", level: 5 },
  { name: "LangChain & Agents", cat: "Orchestration and tooling behind my internal AI assistants", level: 4 },
  { name: "RAG & Vector Search", cat: "Retrieval docs assistant shipped to my team at Temenos", level: 4 },
  { name: "OpenAI API & Prompting", cat: "Powers Trip Captain's itinerary generation in production", level: 4 },
].map((s, i) => ({
  ...s,
  rank: String(i + 1).padStart(2, "0"),
  rankColor: i < 2 ? "var(--accent)" : "var(--faint)",
  barColor: i < 2 ? "var(--accent)" : "#7c72c9",
}));

const products = [
  { title: "FinX", endpoint: "finx.werde.app", description: "AI finance tracker — an LLM auto-categorizes expenses straight from Gmail & SMS.", url: "https://finx.werde.app/" },
  { title: "Trip Captain", endpoint: "tripcaptain.werde.app", description: "Itinerary generator built on the OpenAI API, with live group collaboration.", url: "https://tripcaptain.werde.app/" },
  { title: "Settle by werde", endpoint: "settle.werde.app", description: "Split shared expenses and settle up — a sharper Splitwise.", url: "https://settle.werde.app/" },
];

const sec: React.CSSProperties = { maxWidth: 1180, margin: "0 auto" };
const sora = "'Sora', sans-serif";
const gradTitle: React.CSSProperties = {
  background: "var(--title)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};
const sectionLabel: React.CSSProperties = { fontSize: 12, color: "var(--accent)" };
const h2Style: React.CSSProperties = { fontFamily: sora, fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 };
const archChip: React.CSSProperties = { padding: "6px 10px", border: "1px solid var(--border)", borderRadius: 8, background: "var(--solid)", fontSize: 11, color: "var(--dim)" };
const archChipAccent: React.CSSProperties = { padding: "6px 10px", border: "1px solid var(--accent)", borderRadius: 8, background: "var(--surface2)", fontSize: 11, color: "var(--text)" };
const archCard: React.CSSProperties = { border: "1px solid var(--border)", borderRadius: 18, background: "var(--solid)", padding: 24 };

const Index = () => {
  return (
    <Layout secondaryGlow>
      {/* ---------- Hero ---------- */}
      <section className="hero sec" style={{ ...sec, padding: "56px 32px 40px", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 40, alignItems: "center", minHeight: "74vh" }}>
        <div className="fu">
          <div className="hero-badge" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <div style={{ position: "relative", width: 58, height: 58, flexShrink: 0 }}>
              <div style={{ width: 58, height: 58, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--accent)" }}>
                <img src={profileImage} alt="Hemanth Poondla" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <span style={{ position: "absolute", bottom: 0, right: 0, width: 13, height: 13, borderRadius: "50%", background: "var(--signal)", border: "2.5px solid var(--bg)", animation: "livePulse 2.4s infinite" }} title="available" />
            </div>
            <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--accent)", border: "1px solid var(--border-strong)", borderRadius: 999, padding: "6px 13px" }}>
              Hemanth Poondla · GenAI Engineer · Available
            </span>
          </div>

          <h1 style={{ fontFamily: sora, fontSize: 58, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, margin: "0 0 20px", ...gradTitle }}>
            From banking systems<br />to AI systems.
          </h1>

          <p style={{ fontSize: 18.5, color: "var(--dim)", lineHeight: 1.65, maxWidth: 540, margin: "0 0 12px" }}>
            Six years on software where a bug moves money the wrong way — now building with LLMs. An AI code-review tool and a RAG docs assistant at Temenos, plus five live products of my own.
          </p>
          <p className="mono" style={{ fontSize: 12.5, color: "var(--faint)", margin: "0 0 28px" }}>
            Senior Product Engineer @ Temenos · 6+ yrs · Hyderabad, IN
          </p>

          <div className="hero-cta" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link to="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", borderRadius: 12, background: "var(--accent)", color: "#fff", fontSize: 14.5, fontWeight: 600, boxShadow: "0 16px 40px -16px rgba(139,125,255,0.6)" }}>
              View projects
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <a href="/resume.pdf" download="Hemanth_Poondla_Resume.pdf" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 14.5, fontWeight: 500, color: "var(--text)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v13M7 11l5 5 5-5M5 21h14" /></svg>
              Résumé
            </a>
          </div>
        </div>

        <div className="orbit-wrap fu" style={{ animationDelay: "0.2s", position: "relative" }}>
          <div style={{ position: "absolute", inset: 20, borderRadius: "50%", background: "radial-gradient(circle, var(--glow1), transparent 60%)", filter: "blur(24px)", animation: "glowBreathe 6s ease-in-out infinite", pointerEvents: "none" }} />
          <AISystemDiagram />
        </div>
      </section>

      {/* ---------- Tech strip ---------- */}
      <section className="sec" style={{ ...sec, padding: "8px 32px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mute)" }}>Working across the modern AI stack</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {techStack.map((t) => (
              <span key={t} className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 13px", border: "1px solid var(--border)", borderRadius: 999, fontSize: 12, color: "var(--text)" }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }} />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Stats (band, borderless) ---------- */}
      <div className="band">
        <section className="stats sec" style={{ ...sec, padding: "26px 32px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
          {stats.map((s) => (
            <div key={s.label} className="stat-cell" style={{ padding: "6px 24px" }}>
              <p style={{ fontFamily: sora, fontSize: 34, fontWeight: 700, margin: 0, ...gradTitle }}>{s.value}</p>
              <p className="mono" style={{ fontSize: 12, color: "var(--mute)", margin: "6px 0 0" }}>{s.label}</p>
            </div>
          ))}
        </section>
      </div>

      {/* ---------- Skills (borderless rows) ---------- */}
      <section className="sec" style={{ ...sec, padding: "44px 32px 32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
          <span className="mono" style={sectionLabel}>// core.stack</span>
          <h2 style={h2Style}>What I'm strongest at</h2>
        </div>
        <p style={{ fontSize: 16, color: "var(--mute)", margin: "0 0 8px", maxWidth: 640 }}>
          Ranked by depth — each one tied to something I actually shipped.
        </p>
        <div>
          {skills.map((s) => (
            <div key={s.name} className="skills-row" style={{ display: "grid", gridTemplateColumns: "56px 1fr 180px", alignItems: "center", gap: 22, padding: "20px 4px", borderTop: "1px solid var(--border)" }}>
              <span className="mono" style={{ fontSize: 26, fontWeight: 600, color: s.rankColor, lineHeight: 1 }}>{s.rank}</span>
              <div>
                <h3 style={{ fontFamily: sora, fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>{s.name}</h3>
                <p style={{ fontSize: 13.5, color: "var(--mute)", margin: 0, lineHeight: 1.5 }}>{s.cat}</p>
              </div>
              <div className="meter" style={{ display: "flex", gap: 5, justifyContent: "flex-end" }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} style={{ width: 22, height: 7, borderRadius: 3, background: n <= s.level ? s.barColor : "var(--surface2)" }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Architectures (band) ---------- */}
      <div className="band">
        <section className="sec" style={{ ...sec, padding: "48px 32px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
            <span className="mono" style={sectionLabel}>// architectures</span>
            <h2 style={h2Style}>Systems I architect</h2>
          </div>
          <p style={{ fontSize: 16, color: "var(--mute)", margin: "0 0 24px", maxWidth: 660 }}>
            Not textbook diagrams — these are the patterns behind my own builds: the docs assistant at Temenos, the FinX categorizer, and the trip-planning agent.
          </p>
          <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            <div className="hover-card" style={archCard}>
              <h3 style={{ fontFamily: sora, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>RAG Pipeline</h3>
              <p className="mono" style={{ fontSize: 11, color: "var(--faint)", margin: "0 0 18px" }}>retrieval-augmented generation</p>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                {ragFlow.map((n) => (
                  <span key={n} style={{ display: "contents" }}>
                    <span className="mono" style={archChip}>{n}</span>
                    <span style={{ color: "var(--faint)", fontSize: 12 }}>→</span>
                  </span>
                ))}
                <span className="mono" style={archChipAccent}>Response</span>
              </div>
              <p style={{ fontSize: 13.5, color: "var(--mute)", lineHeight: 1.6, margin: "18px 0 0" }}>How my Temenos docs assistant answers with citations — and the base of my travel-corpus assistant.</p>
            </div>

            <div className="hover-card" style={archCard}>
              <h3 style={{ fontFamily: sora, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Multi-Agent System</h3>
              <p className="mono" style={{ fontSize: 11, color: "var(--faint)", margin: "0 0 18px" }}>plan · execute · verify</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="mono" style={archChip}>User</span>
                  <span style={{ color: "var(--faint)", fontSize: 12 }}>→</span>
                  <span className="mono" style={archChipAccent}>Planner Agent</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, paddingLeft: 14 }}>
                  {agentWorkers.map((w) => (<span key={w} className="mono" style={archChip}>{w}</span>))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 14 }}>
                  <span style={{ color: "var(--faint)", fontSize: 12 }}>↳</span>
                  <span className="mono" style={archChip}>Shared Memory</span>
                </div>
              </div>
              <p style={{ fontSize: 13.5, color: "var(--mute)", lineHeight: 1.6, margin: "18px 0 0" }}>The shape of my LangGraph trip planner — a planner agent farming out research, booking math and verification.</p>
            </div>

            <div className="hover-card" style={archCard}>
              <h3 style={{ fontFamily: sora, fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>MCP Server</h3>
              <p className="mono" style={{ fontSize: 11, color: "var(--faint)", margin: "0 0 18px" }}>tools over the Model Context Protocol</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="mono" style={archChip}>AI Agent</span>
                  <span style={{ color: "var(--faint)", fontSize: 12 }}>→</span>
                  <span className="mono" style={archChipAccent}>MCP Server</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, paddingLeft: 14 }}>
                  {mcpTools.map((m) => (<span key={m} className="mono" style={archChip}>{m}</span>))}
                </div>
              </div>
              <pre
                className="mono"
                style={{ margin: "14px 0 0", padding: "10px 12px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 10.5, color: "var(--dim)", overflowX: "auto", lineHeight: 1.5 }}
              >{`{
  "name": "get_expenses",
  "description": "Read-only FinX lookup",
  "input": { "month": "2026-07" }
}`}</pre>
              <p style={{ fontSize: 13.5, color: "var(--mute)", lineHeight: 1.6, margin: "14px 0 0" }}>My MCP server exposes real FinX and Settle data — expense lookups, balances — to any agent.</p>
            </div>
          </div>
        </section>
      </div>

      {/* ---------- Featured products ---------- */}
      <section className="sec" style={{ ...sec, padding: "48px 32px 32px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 22, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span className="mono" style={sectionLabel}>// featured</span>
            <h2 style={h2Style}>Products I've shipped</h2>
          </div>
          <Link to="/projects" className="mono" style={{ fontSize: 13, color: "var(--mute)", display: "inline-flex", alignItems: "center", gap: 6 }}>see all 5 →</Link>
        </div>
        <div className="products" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {products.map((p) => (
            <a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer" className="hover-card" style={{ display: "flex", flexDirection: "column", border: "1px solid var(--border)", borderRadius: 18, background: "var(--surface)", padding: 24, minHeight: 180 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 11px", border: "1px solid var(--border)", borderRadius: 999 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--signal)", animation: "livePulse 2.4s ease-in-out infinite" }} />
                  <span style={{ fontSize: 11, color: "var(--signal)" }}>live</span>
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--faint)" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6M10 14 21 3" /></svg>
              </div>
              <h3 style={{ fontFamily: sora, fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>{p.title}</h3>
              <p className="mono" style={{ fontSize: 11.5, color: "var(--accent)", margin: "0 0 12px" }}>{p.endpoint}</p>
              <p style={{ color: "var(--dim)", fontSize: 14.5, lineHeight: 1.6, margin: 0, flex: 1 }}>{p.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ---------- Building next ---------- */}
      <section className="sec" style={{ ...sec, padding: "8px 32px 32px" }}>
        <div style={{ border: "1px dashed rgba(201,154,58,0.32)", borderRadius: 20, background: "linear-gradient(160deg,rgba(201,154,58,0.07),transparent)", padding: "26px 30px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#c99a3a", animation: "livePulse 2.4s ease-in-out infinite" }} />
            <span className="mono" style={{ fontSize: 12.5, color: "#c99a3a" }}>building now</span>
          </div>
          <p style={{ fontSize: 15.5, color: "var(--dim)", margin: 0, flex: 1, minWidth: 260, lineHeight: 1.55 }}>
            A <strong style={{ color: "var(--text)" }}>RAG doc assistant</strong>, an <strong style={{ color: "var(--text)" }}>MCP tool server</strong> over real FinX data, and a <strong style={{ color: "var(--text)" }}>LangGraph trip-planning agent</strong> — see the roadmap on the projects page.
          </p>
          <Link to="/projects" className="mono" style={{ fontSize: 13, color: "#c99a3a", whiteSpace: "nowrap" }}>view roadmap →</Link>
        </div>
      </section>

      {/* ---------- Pull quote (band) ---------- */}
      <div className="band">
        <section className="sec" style={{ maxWidth: 900, margin: "0 auto", padding: "56px 32px", textAlign: "center" }}>
          <p style={{ fontFamily: sora, fontSize: 26, fontWeight: 600, lineHeight: 1.45, letterSpacing: "-0.015em", margin: 0, color: "var(--text)" }}>
            “Six years where a bug could cost millions taught me one thing:{" "}
            <span style={gradTitle}>reliability isn't a feature you add later.</span>{" "}
            That's the discipline I bring to GenAI.”
          </p>
        </section>
      </div>

      {/* ---------- Off duty ---------- */}
      <section className="sec" style={{ ...sec, padding: "48px 32px 32px" }}>
        <div className="offduty" style={{ display: "grid", gridTemplateColumns: "1.2fr auto", gap: 28, alignItems: "center" }}>
          <div>
            <span className="mono" style={sectionLabel}>// off.duty</span>
            <h3 style={{ fontFamily: sora, fontSize: 25, fontWeight: 600, letterSpacing: "-0.01em", margin: "10px 0 8px" }}>60+ places mapped — and quietly turned into training data</h3>
            <p style={{ fontSize: 16, color: "var(--dim)", lineHeight: 1.65, margin: 0, maxWidth: 560 }}>
              My travel journal is also my AI playground: it's the corpus behind the RAG assistant and the trip data behind the LangGraph agent. Chess, cricket and music fill the rest. <Link to="/about" style={{ color: "var(--accent)" }}>More about me + the map →</Link>
            </p>
          </div>
          <div className="mono offduty-stats" style={{ display: "flex", gap: 26 }}>
            {[{ v: "60+", l: "places" }, { v: "2×", l: "chess champ" }, { v: "1", l: "travel blog" }].map((x) => (
              <span key={x.l} style={{ fontSize: 12, color: "var(--mute)", textAlign: "center" }}>
                <span style={{ display: "block", fontFamily: sora, fontSize: 30, fontWeight: 700, color: "var(--text)" }}>{x.v}</span>{x.l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="sec" style={{ ...sec, padding: "32px 32px 72px" }}>
        <div style={{ position: "relative", overflow: "hidden", border: "1px solid var(--border-strong)", borderRadius: 24, background: "linear-gradient(160deg,rgba(139,125,255,0.14),var(--surface))", padding: "56px 40px", textAlign: "center" }}>
          <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 480, height: 280, background: "radial-gradient(circle, var(--glow1), transparent 60%)", filter: "blur(30px)", animation: "glowBreathe 7s ease-in-out infinite", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <h2 style={{ fontFamily: sora, fontSize: 38, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px" }}>Let's build something intelligent</h2>
            <p style={{ fontSize: 16.5, color: "var(--dim)", maxWidth: 520, margin: "0 auto 26px", lineHeight: 1.65 }}>Looking for a GenAI engineer who also designs the product around the model? Let's talk.</p>
            <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 12, background: "var(--accent)", color: "#fff", fontSize: 15, fontWeight: 600, boxShadow: "0 16px 40px -16px rgba(139,125,255,0.7)" }}>
              Get in touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
