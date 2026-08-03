import { useState, useRef, useEffect, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import finxShot from "@/assets/projects/finx.webp";
import tripCaptainShot from "@/assets/projects/tripcaptain.webp";
import settleShot from "@/assets/projects/settle.webp";
import mywayaroundShot from "@/assets/projects/mywayaround.webp";

const sora = "'Sora', sans-serif";
const gradTitle: React.CSSProperties = { background: "var(--title)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" };

interface Project {
  title: string;
  subtitle: string;
  endpoint: string;
  slotId: string;
  description: string;
  features: string[];
  tech: string[];
  liveUrl: string;
  /** Short capability signals so cards don't all read the same. */
  signals: string[];
  /** Screenshot shown by default; the frame scrolls for full-page captures. */
  screenshot?: string;
  /** True when the site blocks iframe embedding (X-Frame-Options), so no live preview. */
  noEmbed?: boolean;
}

const projects: Project[] = [
  {
    title: "FinX", subtitle: "AI-powered personal finance", endpoint: "finx.werde.app", slotId: "p-finx",
    description: "My flagship applied-AI product. Track expenses, investments, budgets and trips in one place, with an LLM that auto-categorizes transactions straight from your Gmail and SMS — real users, real data.",
    features: ["LLM auto-categorization from Gmail & SMS", "Unified expenses, investments, budgets & trips", "The base for a fine-tuned text classifier", "AI-assisted insights and summaries"],
    signals: ["LLM auto-categorization", "Gmail + SMS ingestion", "Real users"],
    tech: ["React", "TypeScript", "Supabase", "LLM", "Framer Motion"], liveUrl: "https://finx.werde.app/", screenshot: finxShot,
  },
  {
    title: "Settle", subtitle: "Group expenses, sorted — and agent-accessible", endpoint: "settle.werde.app", slotId: "p-settle",
    description: "A Splitwise alternative with more of the features people actually ask for — and the first of my products to ship its own MCP server, so Claude and ChatGPT can read balances and log expenses on your behalf.",
    features: ["MCP server live in Claude & ChatGPT", "14 read tools, 3 deliberately narrow write tools", "OAuth-scoped to only the groups you're in", "Guided add-expense that previews before it writes", "Flexible bill splitting (equal, shares, exact)", "Automatic balance calculations and settle-up flow"],
    signals: ["MCP server + OAuth", "Multi-party balances", "Settle-up flow"],
    tech: ["React", "TypeScript", "Supabase", "MCP", "OAuth", "Edge Functions"], liveUrl: "https://settle.werde.app/", screenshot: settleShot,
  },
  {
    title: "mywayaround", subtitle: "Full-stack travel journal", endpoint: "mywayaround.blog", slotId: "p-mwa",
    description: "A complete, live travel-journal product — auth, newsletter, a content Studio and a '5 questions to your matched trip' planning quiz, all on a Supabase backend. A strong end-to-end full-stack proof point.",
    features: ["Auth, newsletter and a content Studio", "“5 questions → matched trip” planning quiz", "Supabase backend with real content", "Its own MCP server is in progress"],
    signals: ["Full-stack + auth", "Content Studio", "Trip-matching quiz"],
    tech: ["React", "Supabase", "Auth", "TypeScript"], liveUrl: "https://mywayaround.blog/", noEmbed: true, screenshot: mywayaroundShot,
  },
  {
    title: "Trip Captain", subtitle: "OpenAI-powered trip planning", endpoint: "tripcaptain.werde.app", slotId: "p-trip",
    description: "An intelligent travel-planning platform built directly on the OpenAI API. Enter your preferences, budget and dates to get a comprehensive itinerary — accommodations, activities and local gems included.",
    features: ["AI itinerary generation via the OpenAI API", "Real-time collaboration for group trips", "Smart budget optimization", "Weather-aware planning & local recommendations"],
    signals: ["OpenAI API", "Group collaboration", "Weather-aware"],
    tech: ["React", "TypeScript", "Supabase", "OpenAI API", "Framer Motion"], liveUrl: "https://tripcaptain.werde.app/", screenshot: tripCaptainShot,
  },
  {
    title: "Wardrobe", subtitle: "AI styling assistant", endpoint: "wardrobe.werde.app", slotId: "p-wardrobe",
    description: "A styling app that digitizes your wardrobe and generates AI outfit recommendations by weather, occasion and personal taste — learning from your choices to get more personal over time.",
    features: ["Digital wardrobe organization", "AI/ML outfit recommendations", "Weather & occasion-based styling", "Style analytics and insights"],
    signals: ["AI/ML recommendations", "Learns your taste", "Image-heavy UI"],
    tech: ["React", "TypeScript", "Supabase", "AI/ML", "Framer Motion"], liveUrl: "https://wardrobe.werde.app/",
  },
];

const building = [
  { title: "Document RAG Assistant", status: "in progress", eta: "Q4 2026", description: "Retrieval assistant over my travel-research corpus — chunking, embeddings and vector search with cited answers.", tech: ["RAG", "Embeddings", "Vector DB"] },
  { title: "Blog MCP Server", status: "in progress", eta: "Aug 2026", description: "A second MCP server, this one over the travel journal — list, fetch and search posts, plus blog analytics, read-only for any agent.", tech: ["MCP", "Supabase"] },
  { title: "Agentic Trip Planner", status: "designing", eta: "Q1 2027", description: "A LangGraph agent chaining the RAG assistant and MCP tools into a structured, budget-aware trip proposal.", tech: ["LangGraph", "RAG", "MCP"] },
];

/** Virtual desktop viewport the live preview is rendered at, then scaled to fit. */
const VIEWPORT_W = 1280;
const VIEWPORT_H = Math.round((VIEWPORT_W * 9) / 16); // 720 — matches the 16/9 frame

function ProjectMedia({ p, on, onToggle }: { p: Project; on: boolean; onToggle: () => void }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);
  const [canScroll, setCanScroll] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The frame has a fixed aspect-ratio, so a ResizeObserver alone never fires
  // when the lazy image loads — measure() is also called from the img's onLoad.
  const measure = useCallback(() => {
    const el = frameRef.current;
    if (!el) return;
    setScale(el.clientWidth / VIEWPORT_W);
    setCanScroll(el.scrollHeight > el.clientHeight + 4);
  }, []);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, on, p.screenshot]);

  const canPreview = !p.noEmbed;
  // Only hint at scrolling while there is still something below the fold.
  const showScrollHint = !on && canScroll && !scrolled;

  return (
    <div className="proj-media" style={{ position: "relative", overflow: "hidden", border: "1px solid var(--border)", borderRadius: 20, background: "var(--solid)", boxShadow: "0 30px 70px -40px rgba(0,0,0,0.9)" }}>
      {/* Browser chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 14px", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <span style={{ width: 9, height: 9, borderRadius: 999, background: "#3a3a42" }} />
        <span style={{ width: 9, height: 9, borderRadius: 999, background: "#3a3a42" }} />
        <span style={{ width: 9, height: 9, borderRadius: 999, background: "#3a3a42" }} />
        <span className="mono" style={{ marginLeft: 6, flex: 1, fontSize: 11.5, color: "var(--faint)", background: "var(--surface)", borderRadius: 6, padding: "4px 10px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.endpoint}</span>
        {canPreview && (
          <button onClick={onToggle} className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", border: `1px solid ${on ? "var(--border)" : "var(--border-strong)"}`, background: on ? "var(--surface2)" : "rgba(139,125,255,0.12)", color: on ? "var(--dim)" : "var(--accent)", fontSize: 11, borderRadius: 999, padding: "5px 10px", whiteSpace: "nowrap" }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "#4ade80", animation: "livePulse 2.4s ease-in-out infinite" }} />
            {on ? "screenshot" : "live preview"}
          </button>
        )}
      </div>

      {/* Viewport */}
      <div
        ref={frameRef}
        className={on ? undefined : "proj-scroll"}
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 8)}
        style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "var(--solid)", overflowX: "hidden", overflowY: on ? "hidden" : "auto" }}
      >
        {on ? (
          <iframe
            src={p.liveUrl}
            title={`${p.title} live preview`}
            loading="lazy"
            style={{ position: "absolute", top: 0, left: 0, width: VIEWPORT_W, height: VIEWPORT_H, border: 0, display: "block", background: "#fff", transform: `scale(${scale})`, transformOrigin: "top left" }}
          />
        ) : p.screenshot ? (
          // Full-page captures are taller than the frame — the panel scrolls.
          <img src={p.screenshot} alt={`${p.title} screenshot`} loading="lazy" decoding="async" onLoad={measure} style={{ width: "100%", height: "auto", display: "block" }} />
        ) : p.noEmbed ? (
          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: "linear-gradient(160deg,var(--surface2),transparent)", color: "var(--text)" }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(139,125,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6M10 14 21 3" /></svg>
            </div>
            <p className="mono" style={{ fontSize: 12, color: "var(--faint)", margin: 0, textAlign: "center", padding: "0 20px", lineHeight: 1.5 }}>
              This site opens in its own tab —<br />embedded preview is blocked. <span style={{ color: "var(--accent)" }}>Open {p.endpoint} →</span>
            </p>
          </a>
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: "linear-gradient(160deg,var(--surface2),transparent)" }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(139,125,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" /></svg>
            </div>
            <p className="mono" style={{ fontSize: 12, color: "var(--faint)", margin: 0, textAlign: "center", padding: "0 16px" }}>Click <span style={{ color: "var(--accent)" }}>live preview</span> to load {p.title}</p>
          </div>
        )}

      </div>

      {/* Affordances: visitors can't discover scroll or the live preview on their own */}
      {(showScrollHint || (canPreview && p.screenshot && !on)) && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "10px 12px", pointerEvents: "none", background: "linear-gradient(0deg, var(--solid) 55%, transparent)" }}>
          <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, color: "var(--mute)", opacity: showScrollHint ? 1 : 0, transition: "opacity 0.3s ease" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ animation: "typingBounce 1.6s ease-in-out infinite" }} aria-hidden="true">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            scroll to see the full page
          </span>

          {canPreview && p.screenshot && !on && (
            <button
              onClick={onToggle}
              className="mono preview-cta"
              aria-label={`Load live preview of ${p.title}`}
              style={{ pointerEvents: "auto", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", border: "1px solid var(--border-strong)", background: "rgba(139,125,255,0.14)", color: "var(--accent)", borderRadius: 999, padding: "7px 13px", fontSize: 11, fontWeight: 500, whiteSpace: "nowrap" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              click for live preview
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const Projects = () => {
  const [preview, setPreview] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setPreview((p) => ({ ...p, [id]: !p[id] }));

  return (
    <Layout>
      {/* Hero */}
      <section className="fu sec" style={{ maxWidth: 720, margin: "0 auto", padding: "72px 32px 48px", textAlign: "center" }}>
        <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>// deployed.systems</span>
        <h1 className="page-h1" style={{ fontFamily: sora, fontSize: 52, fontWeight: 700, letterSpacing: "-0.03em", margin: "12px 0 16px", ...gradTitle }}>Projects</h1>
        <p style={{ fontSize: 18, color: "var(--dim)", lineHeight: 1.6, margin: 0 }}>
          Real, shipped products — each one live and in the hands of users. Hit <span style={{ color: "var(--accent)" }}>live preview</span> to see any of them running right here.
        </p>
      </section>

      {/* Project rows */}
      <section className="sec" style={{ maxWidth: 1120, margin: "0 auto", padding: "20px 32px 40px", display: "flex", flexDirection: "column", gap: 56 }}>
        {projects.map((p, i) => {
          const on = !!preview[p.slotId];
          const mediaOrder = i % 2 === 1 ? 2 : 1;
          const textOrder = i % 2 === 1 ? 1 : 2;
          return (
            <div key={p.slotId} className="proj-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, alignItems: "center" }}>
              {/* Media */}
              <div style={{ order: mediaOrder }}>
                <ProjectMedia p={p} on={on} onToggle={() => toggle(p.slotId)} />
              </div>

              {/* Text */}
              <div className="proj-text" style={{ order: textOrder }}>
                <p className="mono" style={{ fontSize: 12, color: "var(--accent)", margin: "0 0 8px" }}>{p.subtitle}</p>
                <h2 style={{ fontFamily: sora, fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 12px" }}>{p.title}</h2>

                {/* Signal chips — the distinguishing capabilities at a glance */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  {p.signals.map((s) => (
                    <span
                      key={s}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 12px",
                        borderRadius: 999,
                        background: "rgba(139,125,255,0.1)",
                        border: "1px solid var(--border-strong)",
                        fontSize: 12,
                        fontWeight: 500,
                        color: "var(--text)",
                      }}
                    >
                      <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--accent)" }} />
                      {s}
                    </span>
                  ))}
                </div>

                <p style={{ fontSize: 16, color: "var(--dim)", lineHeight: 1.7, margin: "0 0 20px" }}>{p.description}</p>
                <ul style={{ margin: "0 0 22px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14.5, color: "var(--dim)", lineHeight: 1.5 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.4" style={{ marginTop: 2, flexShrink: 0 }}><path d="M20 6 9 17l-5-5" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24 }}>
                  {p.tech.map((t) => (
                    <span key={t} className="mono" style={{ padding: "5px 11px", fontSize: 11, color: "var(--mute)", background: "var(--chip)", borderRadius: 6 }}>{t}</span>
                  ))}
                </div>
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "12px 22px", borderRadius: 12, background: "var(--accent)", color: "#fff", fontSize: 14.5, fontWeight: 600, boxShadow: "0 16px 40px -16px rgba(139,125,255,0.7)" }}>
                  Visit live site
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6M10 14 21 3" /></svg>
                </a>
              </div>
            </div>
          );
        })}
      </section>

      {/* Building next */}
      <section className="sec" style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 32px 40px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
          <span className="mono" style={{ fontSize: 13, color: "#c99a3a" }}>// on.the.workbench</span>
          <h2 style={{ fontFamily: sora, fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", margin: 0, color: "var(--text)" }}>What I'm building next</h2>
        </div>
        <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {building.map((b) => (
            <div key={b.title} style={{ border: "1px dashed rgba(201,154,58,0.3)", borderRadius: 18, background: "linear-gradient(160deg,rgba(201,154,58,0.06),rgba(255,255,255,0.01))", padding: 26 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 11px", border: "1px solid rgba(201,154,58,0.3)", borderRadius: 999 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 999, background: "#c99a3a", animation: "livePulse 2.4s ease-in-out infinite" }} />
                  <span style={{ fontSize: 11.5, color: "#c99a3a" }}>{b.status}</span>
                </span>
                <span className="mono" style={{ fontSize: 11.5, color: "var(--faint)" }}>{b.eta}</span>
              </div>
              <h4 style={{ fontFamily: sora, fontSize: 18, fontWeight: 600, margin: "0 0 8px" }}>{b.title}</h4>
              <p style={{ fontSize: 14, color: "var(--mute)", lineHeight: 1.55, margin: "0 0 16px" }}>{b.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {b.tech.map((t) => (
                  <span key={t} className="mono" style={{ padding: "5px 10px", fontSize: 11, color: "#c99a3a", background: "rgba(201,154,58,0.08)", borderRadius: 6 }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
