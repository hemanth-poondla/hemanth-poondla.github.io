import { Link } from "react-router-dom";
import { SectionHead } from "./SectionHead";
import { sora, wrap, card, pill, accentPill } from "./styles";

const ext = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M8 7h9v9" /></svg>
);

const inbox = [
  { text: "“INR 640 debited at SWIGGY”", tag: "Food & Dining · 0.97" },
  { text: "“UPI payment to UBER”", tag: "Transport · 0.94" },
  { text: "“SIP instalment processed”", tag: "Investments · 0.99" },
];
const bars = [40, 65, 30, 85, 50, 70, 45];

const more = [
  { n: "004", title: "Trip Captain", kind: "OpenAI itinerary planner", desc: "Preferences, budget and dates in; a collaborative itinerary with weather and local picks out.", url: "https://tripcaptain.werde.app/" },
  { n: "005", title: "Wardrobe", kind: "AI styling assistant", desc: "A digital wardrobe that learns your taste and dresses you for the weather and the occasion.", url: "https://wardrobe.werde.app/" },
];

function Tags({ items, accentAt }: { items: string[]; accentAt?: string }) {
  return (
    <ul className="mono" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: 8 }}>
      {items.map((t) => <li key={t} style={t === accentAt ? accentPill : pill}>{t}</li>)}
    </ul>
  );
}

export function Products() {
  return (
    <section id="work" style={{ scrollMarginTop: 80 }}>
      <div style={{ ...wrap, padding: "88px 32px" }}>
        <SectionHead
          index="02"
          label="Selected work"
          title="Live products, built end to end"
          blurb="Side projects that went all the way to production — auth, data, AI, and the boring parts in between."
        />

        <a href="https://finx.werde.app/" target="_blank" rel="noopener noreferrer" className="home-feature hover-card" style={{ ...card, marginTop: 44, overflow: "hidden", display: "grid" }}>
          <div style={{ padding: "34px 36px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="mono" style={accentPill}>Featured · AI finance</span>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--mute)" }}>001</span>
            </div>
            <h3 style={{ fontFamily: sora, fontSize: "clamp(56px, 8vw, 88px)", fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.06em", margin: "26px 0 0" }}>FinX</h3>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--dim)", maxWidth: 460, margin: "22px 0 28px" }}>
              One home for expenses, investments, budgets and trips. An LLM reads your Gmail and SMS and auto-categorises every transaction, then surfaces insights you'd otherwise miss.
            </p>
            <div style={{ marginTop: "auto" }}><Tags items={["React", "TypeScript", "Supabase", "LLM", "Framer Motion"]} accentAt="LLM" /></div>
          </div>

          <div style={{ borderLeft: "1px solid var(--border)", padding: 28, background: "linear-gradient(160deg, color-mix(in srgb, var(--accent) 9%, transparent), transparent 70%)" }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, background: "var(--solid)", overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
                <span className="mono" style={{ fontSize: 12 }}>Inbox</span>
                <span className="mono" style={{ fontSize: 10.5, color: "var(--mute)" }}>Auto-categorised from Gmail &amp; SMS</span>
              </div>
              {inbox.map((r) => (
                <div key={r.text} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap", padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
                  <span className="mono" style={{ fontSize: 11.5, color: "var(--mute)" }}>{r.text}</span>
                  <span className="mono" style={{ ...pill, fontSize: 10.5, color: "var(--text)" }}>{r.tag}</span>
                </div>
              ))}
              <div style={{ padding: 16 }}>
                <p className="mono" style={{ margin: 0, fontSize: 10.5, color: "var(--mute)" }}>Spending this week</p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 88, marginTop: 12 }}>
                  {bars.map((h, i) => (
                    <span key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 3, background: i === 3 ? "linear-gradient(to top, var(--accent), var(--accent2))" : "var(--surface2)" }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </a>

        <div className="home-two" style={{ marginTop: 18 }}>
          <a href="https://settle.werde.app/" target="_blank" rel="noopener noreferrer" className="hover-card" style={{ ...card, padding: "28px 30px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span className="mono" style={accentPill}>MCP · live in Claude &amp; ChatGPT</span>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--mute)" }}>002</span>
            </div>
            <h3 style={{ fontFamily: sora, fontSize: 44, fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1, margin: "24px 0 0" }}>Settle</h3>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--dim)", margin: "14px 0 0", flex: 1 }}>
              Split shared expenses and settle up — plus an MCP server that hands 17 OAuth-scoped tools to any agent.
            </p>
            <p className="mono" style={{ margin: "22px 0 0", paddingTop: 14, borderTop: "1px solid var(--border)", fontSize: 11.5, color: "var(--mute)" }}>settle.werde.app ↗</p>
          </a>

          <a href="https://mywayaround.blog/" target="_blank" rel="noopener noreferrer" className="hover-card" style={{ ...card, padding: "28px 30px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span className="mono" style={accentPill}>Full-stack travel journal</span>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--mute)" }}>003</span>
            </div>
            <h3 style={{ fontFamily: sora, fontSize: 44, fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1, margin: "24px 0 0" }}>mywayaround</h3>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--dim)", margin: "14px 0 0", flex: 1 }}>
              A full-stack travel journal on Supabase — auth, newsletter, a content Studio and a trip-matching quiz.
            </p>
            <p className="mono" style={{ margin: "22px 0 0", paddingTop: 14, borderTop: "1px solid var(--border)", fontSize: 11.5, color: "var(--mute)" }}>mywayaround.blog ↗</p>
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginTop: 44 }}>
          <p className="mono" style={{ margin: 0, fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mute)" }}>More projects</p>
          <Link to="/projects" className="mono" style={{ fontSize: 12.5, color: "var(--mute)" }}>see all 5 →</Link>
        </div>
        <ul style={{ listStyle: "none", margin: "14px 0 0", padding: 0, borderTop: "1px solid var(--border)" }}>
          {more.map((m) => (
            <li key={m.title} style={{ borderBottom: "1px solid var(--border)" }}>
              <a href={m.url} target="_blank" rel="noopener noreferrer" className="home-more" style={{ padding: "20px 8px" }}>
                <span className="mono" style={{ fontSize: 11.5, color: "var(--mute)" }}>{m.n}</span>
                <span style={{ fontFamily: sora, fontSize: 28, fontWeight: 700, letterSpacing: "-0.035em" }}>{m.title}</span>
                <span style={{ fontSize: 15, color: "var(--mute)", lineHeight: 1.55 }}>
                  <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>{m.kind} — </span>{m.desc}
                </span>
                <span style={{ color: "var(--mute)" }}>{ext}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
