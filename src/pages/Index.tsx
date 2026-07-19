import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
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

const skills = [
  { name: "Product & UI/UX Design", cat: "6+ yrs · design systems, Figma, a11y", level: 5 },
  { name: "React & TypeScript", cat: "6+ yrs · frontend architecture", level: 5 },
  { name: "LangChain & Agents", cat: "applied · orchestration & tools", level: 4 },
  { name: "RAG & Vector Search", cat: "applied · retrieval pipelines", level: 4 },
  { name: "OpenAI API & Prompting", cat: "shipped in Trip Captain", level: 4 },
].map((s, i) => ({
  ...s,
  rank: String(i + 1).padStart(2, "0"),
  rankColor: i < 2 ? "var(--accent)" : "var(--faint)",
  barColor: i < 2 ? "var(--accent)" : "#7c72c9",
}));

const products = [
  { title: "FinX", endpoint: "finx.werde.app", description: "AI finance tracker — an LLM auto-categorizes expenses from Gmail & SMS.", url: "https://finx.werde.app/" },
  { title: "Trip Captain", endpoint: "tripcaptain.werde.app", description: "Itinerary generator built on the OpenAI API, with live collaboration.", url: "https://tripcaptain.werde.app/" },
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

const Index = () => {
  return (
    <Layout secondaryGlow>
      {/* Hero */}
      <section className="hero sec" style={{ ...sec, padding: "60px 32px 36px", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 40, alignItems: "center", minHeight: "74vh" }}>
        <div className="fu">
          <div className="hero-badge" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div style={{ position: "relative", width: 58, height: 58, flexShrink: 0 }}>
              <div style={{ width: 58, height: 58, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--accent)" }}>
                <img src={profileImage} alt="Hemanth Poondla" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <span style={{ position: "absolute", bottom: 0, right: 0, width: 13, height: 13, borderRadius: "50%", background: "var(--signal)", border: "2.5px solid var(--bg)", animation: "livePulse 2.4s infinite" }} title="available" />
            </div>
            <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--accent)", border: "1px solid var(--border-strong)", borderRadius: 999, padding: "6px 13px" }}>
              Hi, I'm Hemanth · GenAI Engineer · Available
            </span>
          </div>
          <h1 style={{ fontFamily: sora, fontSize: 74, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 0.98, margin: "0 0 20px", ...gradTitle }}>
            Hemanth<br />Poondla
          </h1>
          <p style={{ fontSize: 19, color: "var(--dim)", lineHeight: 1.6, maxWidth: 520, margin: "0 0 12px" }}>
            Six years shipping banking software at Temenos — where I built an AI code-review tool and a RAG docs assistant for my team — plus five live products of my own, from an LLM-powered finance tracker to an OpenAI trip planner.
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
          <div style={{ position: "relative", border: "1px solid var(--border)", borderRadius: 20, background: "linear-gradient(180deg,var(--surface),transparent)", padding: 18, boxShadow: "var(--shadow)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <span className="mono" style={{ fontSize: 12, color: "var(--mute)" }}>AI System in Action</span>
              <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 9px", border: "1px solid var(--border)", borderRadius: 999 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--signal)", animation: "livePulse 2.4s ease-in-out infinite" }} />
                <span style={{ fontSize: 10.5, color: "var(--signal)" }}>live</span>
              </span>
            </div>
            <svg viewBox="0 0 480 366" style={{ width: "100%", height: "auto", display: "block", fontFamily: "'JetBrains Mono', monospace" }}>
              <defs>
                <marker id="arr" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
                  <path d="M0 0 L6 3 L0 6" fill="none" stroke="var(--faint)" strokeWidth="1.3" />
                </marker>
              </defs>
              <g stroke="var(--border)" strokeWidth="1.4" fill="none" markerEnd="url(#arr)">
                <line x1="80" y1="168" x2="102" y2="168" />
                <line x1="198" y1="168" x2="214" y2="168" />
                <line x1="150" y1="187" x2="150" y2="241" />
                <line x1="150" y1="277" x2="150" y2="303" />
                <line x1="350" y1="277" x2="350" y2="303" />
              </g>
              <line x1="272" y1="151" x2="248" y2="83" stroke="var(--border)" strokeWidth="1.4" strokeDasharray="3 4" />
              <g fill="none" stroke="var(--accent)" strokeWidth="1.7" strokeDasharray="3 7" opacity="0.85" style={{ animation: "dashFlow 3s linear infinite" }}>
                <polyline points="328,168 372,168" />
                <polyline points="304,183 344,245" />
                <polyline points="196,322 306,268" />
              </g>
              <g>
                <rect x="196" y="47" width="96" height="34" rx="9" fill="var(--solid)" stroke="var(--border)" /><text x="244" y="68" textAnchor="middle" fontSize="11.5" fill="var(--dim)">Memory</text>
                <rect x="14" y="151" width="66" height="34" rx="9" fill="var(--solid)" stroke="var(--border)" /><text x="47" y="172" textAnchor="middle" fontSize="11.5" fill="var(--dim)">User</text>
                <rect x="104" y="151" width="94" height="34" rx="9" fill="var(--solid)" stroke="var(--border)" /><text x="151" y="172" textAnchor="middle" fontSize="11.5" fill="var(--dim)">AI Gateway</text>
                <rect x="214" y="149" width="116" height="38" rx="10" fill="var(--surface2)" stroke="var(--accent)" strokeWidth="1.5" /><text x="272" y="165" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--text)">Agent</text><text x="272" y="178" textAnchor="middle" fontSize="9" fill="var(--mute)">reasoning</text>
                <rect x="372" y="151" width="94" height="34" rx="9" fill="var(--solid)" stroke="var(--border)" /><text x="419" y="168" textAnchor="middle" fontSize="11.5" fill="var(--dim)">Tools</text><text x="419" y="179" textAnchor="middle" fontSize="8.5" fill="var(--mute)">MCP</text>
                <rect x="104" y="243" width="92" height="34" rx="9" fill="var(--solid)" stroke="var(--border)" /><text x="150" y="264" textAnchor="middle" fontSize="11.5" fill="var(--dim)">Retriever</text>
                <rect x="104" y="305" width="92" height="34" rx="9" fill="var(--solid)" stroke="var(--border)" /><text x="150" y="326" textAnchor="middle" fontSize="11.5" fill="var(--dim)">Vector DB</text>
                <rect x="308" y="243" width="84" height="34" rx="9" fill="var(--solid)" stroke="var(--border)" /><text x="350" y="264" textAnchor="middle" fontSize="11.5" fill="var(--dim)">LLM</text>
                <rect x="296" y="305" width="108" height="34" rx="9" fill="var(--solid)" stroke="var(--border)" /><text x="350" y="326" textAnchor="middle" fontSize="11.5" fill="var(--dim)">Response</text>
              </g>
              <circle cx="272" cy="149" r="4" fill="var(--accent)" style={{ animation: "nodePulse 2.4s ease-in-out infinite" }} />
            </svg>
            <div className="mono" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 6, paddingTop: 10, borderTop: "1px solid var(--border)", fontSize: 11, color: "var(--faint)" }}>
              <span style={{ color: "var(--signal)" }}>▸ flow</span> Observe → Retrieve → Reason → Act → Verify
            </div>
          </div>
        </div>
      </section>

      {/* Tech strip */}
      <section className="sec" style={{ ...sec, padding: "8px 32px" }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: 16, background: "var(--surface)", padding: "18px 24px", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--faint)" }}>Working across the modern AI stack</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {techStack.map((t) => (
              <span key={t} className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 13px", border: "1px solid var(--border)", borderRadius: 999, fontSize: 12, color: "var(--dim)" }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }} />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats sec" style={{ ...sec, padding: "12px 32px 40px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ border: "1px solid var(--border)", borderRadius: 18, background: "var(--surface)", padding: 24 }}>
            <p style={{ fontFamily: sora, fontSize: 34, fontWeight: 700, margin: 0, ...gradTitle }}>{s.value}</p>
            <p className="mono" style={{ fontSize: 12, color: "var(--mute)", margin: "8px 0 0" }}>{s.label}</p>
          </div>
        ))}
      </section>

      {/* Top skills */}
      <section className="sec" style={{ ...sec, padding: 32 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 22 }}>
          <span className="mono" style={sectionLabel}>// core.stack</span>
          <h2 style={h2Style}>What I'm strongest at</h2>
        </div>
        <div style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--surface)", overflow: "hidden" }}>
          {skills.map((s) => (
            <div key={s.name} className="skills-row" style={{ display: "grid", gridTemplateColumns: "56px 1fr 180px", alignItems: "center", gap: 22, padding: "20px 28px", borderTop: "1px solid var(--border)" }}>
              <span className="mono" style={{ fontSize: 26, fontWeight: 600, color: s.rankColor, lineHeight: 1 }}>{s.rank}</span>
              <div>
                <h3 style={{ fontFamily: sora, fontSize: 20, fontWeight: 600, margin: "0 0 3px" }}>{s.name}</h3>
                <p className="mono" style={{ fontSize: 11, color: "var(--faint)", margin: 0 }}>{s.cat}</p>
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

      {/* Architecture gallery */}
      <section className="sec" style={{ ...sec, padding: 32 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
          <span className="mono" style={sectionLabel}>// architectures</span>
          <h2 style={h2Style}>Systems I architect</h2>
        </div>
        <p style={{ fontSize: 15, color: "var(--mute)", margin: "0 0 22px", maxWidth: 640 }}>
          Not textbook diagrams — these are the patterns behind my own builds: the docs assistant at Temenos, the FinX categorizer, and the trip-planning agent.
        </p>
        <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          <div className="hover-card" style={{ border: "1px solid var(--border)", borderRadius: 18, background: "var(--surface)", padding: 24 }}>
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
            <p style={{ fontSize: 13, color: "var(--mute)", lineHeight: 1.55, margin: "18px 0 0" }}>How my Temenos docs assistant answers with citations — and the base of my travel-corpus assistant.</p>
          </div>

          <div className="hover-card" style={{ border: "1px solid var(--border)", borderRadius: 18, background: "var(--surface)", padding: 24 }}>
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
            <p style={{ fontSize: 13, color: "var(--mute)", lineHeight: 1.55, margin: "18px 0 0" }}>The shape of my LangGraph trip planner — a planner agent farming out research, booking math and verification.</p>
          </div>

          <div className="hover-card" style={{ border: "1px solid var(--border)", borderRadius: 18, background: "var(--surface)", padding: 24 }}>
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
            <p style={{ fontSize: 13, color: "var(--mute)", lineHeight: 1.55, margin: "18px 0 0" }}>My MCP server exposes real FinX and Settle data — expense lookups, balances — to any agent.</p>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="sec" style={{ ...sec, padding: 32 }}>
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
              <p style={{ color: "var(--dim)", fontSize: 14, lineHeight: 1.55, margin: 0, flex: 1 }}>{p.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Building next */}
      <section className="sec" style={{ ...sec, padding: 32 }}>
        <div style={{ border: "1px dashed rgba(201,154,58,0.32)", borderRadius: 20, background: "linear-gradient(160deg,rgba(201,154,58,0.07),transparent)", padding: "26px 30px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#c99a3a", animation: "livePulse 2.4s ease-in-out infinite" }} />
            <span className="mono" style={{ fontSize: 12.5, color: "#c99a3a" }}>building now</span>
          </div>
          <p style={{ fontSize: 15.5, color: "var(--dim)", margin: 0, flex: 1, minWidth: 260, lineHeight: 1.5 }}>
            A <strong style={{ color: "var(--text)" }}>RAG doc assistant</strong>, an <strong style={{ color: "var(--text)" }}>MCP tool server</strong> over real FinX data, and a <strong style={{ color: "var(--text)" }}>LangGraph trip-planning agent</strong> — see the roadmap on the projects page.
          </p>
          <Link to="/projects" className="mono" style={{ fontSize: 13, color: "#c99a3a", whiteSpace: "nowrap" }}>view roadmap →</Link>
        </div>
      </section>

      {/* Off duty */}
      <section className="sec" style={{ ...sec, padding: 32 }}>
        <div className="offduty" style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--surface)", padding: "30px 34px", display: "grid", gridTemplateColumns: "1.2fr auto", gap: 28, alignItems: "center" }}>
          <div>
            <span className="mono" style={sectionLabel}>// off.duty</span>
            <h3 style={{ fontFamily: sora, fontSize: 24, fontWeight: 600, letterSpacing: "-0.01em", margin: "10px 0 8px" }}>50+ places mapped — and quietly turned into training data</h3>
            <p style={{ fontSize: 15, color: "var(--dim)", lineHeight: 1.6, margin: 0, maxWidth: 560 }}>
              My travel journal is also my AI playground: it's the corpus behind the RAG assistant and the trip data behind the LangGraph agent. Chess, cricket and music fill the rest. <Link to="/about" style={{ color: "var(--accent)" }}>More about me + the map →</Link>
            </p>
          </div>
          <div className="mono offduty-stats" style={{ display: "flex", gap: 26 }}>
            {[{ v: "50+", l: "places" }, { v: "2×", l: "chess champ" }, { v: "1", l: "travel blog" }].map((x) => (
              <span key={x.l} style={{ fontSize: 12, color: "var(--mute)", textAlign: "center" }}>
                <span style={{ display: "block", fontFamily: sora, fontSize: 30, fontWeight: 700, color: "var(--text)" }}>{x.v}</span>{x.l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec" style={{ ...sec, padding: "32px 32px 72px" }}>
        <div style={{ position: "relative", overflow: "hidden", border: "1px solid var(--border-strong)", borderRadius: 24, background: "linear-gradient(160deg,rgba(139,125,255,0.14),var(--surface))", padding: "56px 40px", textAlign: "center" }}>
          <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 480, height: 280, background: "radial-gradient(circle, var(--glow1), transparent 60%)", filter: "blur(30px)", animation: "glowBreathe 7s ease-in-out infinite", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <h2 style={{ fontFamily: sora, fontSize: 38, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px" }}>Let's build something intelligent</h2>
            <p style={{ fontSize: 16, color: "var(--dim)", maxWidth: 500, margin: "0 auto 26px", lineHeight: 1.6 }}>Looking for a GenAI engineer who also designs the product around the model? Let's talk.</p>
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
