import { useState } from "react";
import { SectionHead } from "./SectionHead";
import { sora, wrap, card } from "./styles";

type SystemId = "rag" | "agents" | "mcp";

const tabs: { id: SystemId; title: string; sub: string }[] = [
  { id: "rag", title: "RAG pipeline", sub: "Grounded answers that cite their sources." },
  { id: "agents", title: "Multi-agent system", sub: "A planner that delegates to specialists." },
  { id: "mcp", title: "MCP server", sub: "Least-privilege tools for any AI agent." },
];

const node = { padding: "7px 14px", border: "1px solid var(--border)", borderRadius: 999, background: "var(--surface2)", fontSize: 12.5 } as const;
const nodeAccent = { ...node, border: "1px solid var(--accent)", background: "color-mix(in srgb, var(--accent) 12%, transparent)" } as const;
const sep = <span aria-hidden style={{ color: "var(--faint)", fontSize: 13 }}>→</span>;

function Flow({ items, accentAt = [] }: { items: string[]; accentAt?: number[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginTop: 22 }}>
      {items.map((n, i) => (
        <span key={n} style={{ display: "contents" }}>
          {i > 0 && sep}
          <span className="mono" style={accentAt.includes(i) ? nodeAccent : node}>{n}</span>
        </span>
      ))}
    </div>
  );
}

function Notes({ notes }: { notes: { k: string; v: string }[] }) {
  return (
    <div className="home-notes" style={{ marginTop: 28, border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "var(--border)", gap: 1 }}>
      {notes.map((n) => (
        <div key={n.k} style={{ background: "var(--solid)", padding: 16 }}>
          <p className="mono" style={{ margin: 0, fontSize: 11, color: "var(--accent)" }}>{n.k}</p>
          <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.55, color: "var(--mute)" }}>{n.v}</p>
        </div>
      ))}
    </div>
  );
}

export function SystemsTabs() {
  const [active, setActive] = useState<SystemId>("rag");

  return (
    <section id="systems" className="band" style={{ scrollMarginTop: 80 }}>
      <div style={{ ...wrap, padding: "88px 32px" }}>
        <SectionHead
          index="01"
          label="Systems"
          title="Systems I architect"
          blurb="Banking taught me to design for the failure case first. Every system here grounds the model in real data, verifies before it answers, and assumes the model can be wrong."
        />

        <div className="home-systems" style={{ marginTop: 44 }}>
          <div role="tablist" aria-label="Architectures" style={{ display: "grid", gap: 10, alignContent: "start" }}>
            {tabs.map((t, i) => {
              const on = active === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(t.id)}
                  className="hover-card"
                  style={{
                    display: "flex", gap: 16, alignItems: "flex-start", textAlign: "left", cursor: "pointer", padding: "16px 18px",
                    borderRadius: 14, border: `1px solid ${on ? "var(--accent)" : "var(--border)"}`,
                    background: on ? "var(--solid)" : "transparent",
                    boxShadow: on ? "inset 3px 0 0 var(--accent)" : "none", color: "var(--text)",
                  }}
                >
                  <span className="mono" style={{ fontSize: 12, color: on ? "var(--accent)" : "var(--mute)", paddingTop: 5 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span style={{ display: "block", fontFamily: sora, fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>{t.title}</span>
                    <span style={{ display: "block", marginTop: 4, fontSize: 14, color: "var(--mute)" }}>{t.sub}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div role="tabpanel" style={{ ...card, padding: "30px 32px", minHeight: 360 }}>
            {active === "rag" && (
              <div className="fu">
                <p className="mono" style={{ margin: 0, fontSize: 11.5, color: "var(--mute)" }}>Used in · Temenos docs assistant · travel corpus assistant</p>
                <h3 style={{ fontFamily: sora, fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", margin: "10px 0 0" }}>Retrieval-augmented generation</h3>
                <Flow items={["Query", "Embed", "Retriever", "Vector DB", "Re-ranker", "LLM", "Cited response"]} accentAt={[3, 5, 6]} />
                <Notes notes={[
                  { k: "01 · chunking", v: "Semantic chunks sized to the doc, not a fixed window." },
                  { k: "02 · re-ranking", v: "A second pass trims noise before it reaches the model." },
                  { k: "03 · citations", v: "Every answer points back to the source it came from." },
                ]} />
              </div>
            )}
            {active === "agents" && (
              <div className="fu">
                <p className="mono" style={{ margin: 0, fontSize: 11.5, color: "var(--mute)" }}>Used in · LangGraph agentic trip planner</p>
                <h3 style={{ fontFamily: sora, fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", margin: "10px 0 0" }}>Planner + specialist agents</h3>
                <Flow items={["User", "Planner Agent"]} accentAt={[1]} />
                <Notes notes={[
                  { k: "destination.research", v: "RAG over a travel corpus." },
                  { k: "budget.math", v: "Deterministic tools, not vibes." },
                  { k: "itinerary.check", v: "Verifies plans before replying." },
                ]} />
                <p className="mono" style={{ margin: "14px 0 0", padding: "9px 14px", textAlign: "center", fontSize: 12, border: "1px dashed var(--border-strong)", borderRadius: 10, color: "var(--dim)" }}>Shared memory</p>
              </div>
            )}
            {active === "mcp" && (
              <div className="fu">
                <p className="mono" style={{ margin: 0, fontSize: 11.5, color: "var(--mute)" }}>Used in · Settle — live in Claude and ChatGPT</p>
                <h3 style={{ fontFamily: sora, fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", margin: "10px 0 0" }}>OAuth-scoped MCP server</h3>
                <Flow items={["AI Agent", "OAuth", "MCP Server"]} accentAt={[2]} />
                <ul className="mono" style={{ listStyle: "none", margin: "28px 0 0", padding: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 8, border: "1px solid var(--border)", borderRadius: 12, background: "var(--surface)", fontSize: 12.5 }}>
                  {["list_groups()", "get_group_balances()", "add_expense()", "get_spending_analytics()"].map((f) => (
                    <li key={f} style={{ padding: "8px 12px" }}><span style={{ color: "var(--accent)" }}>fn</span> {f}</li>
                  ))}
                </ul>
                <p className="mono" style={{ margin: "18px 0 0", fontSize: 11.5, color: "var(--mute)" }}>14 read tools · 3 narrow write tools · OAuth-scoped, so an agent only sees the groups you're in</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
