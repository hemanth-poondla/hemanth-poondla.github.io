import { useEffect, useRef, useState } from "react";

interface NodeDef {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Route a request takes from the user to this node (for the animated packet). */
  path: string;
  desc: string;
}

/** Node geometry matches the original hero diagram; copy is tied to real builds. */
const NODES: NodeDef[] = [
  {
    id: "user", label: "User", x: 14, y: 151, w: 66, h: 34,
    path: "M47,168 L47,168",
    desc: "A question arrives — a teammate asking the docs assistant, or a traveller describing the trip they want.",
  },
  {
    id: "gateway", label: "AI Gateway", x: 104, y: 151, w: 94, h: 34,
    path: "M80,168 L151,168",
    desc: "Routing, auth and rate limiting before anything reaches a model — where cost and abuse get controlled.",
  },
  {
    id: "agent", label: "Agent", sub: "reasoning", x: 214, y: 149, w: 116, h: 38,
    path: "M80,168 L272,168",
    desc: "The reasoning core: it plans the task, decides which tools to call, and verifies the result before answering.",
  },
  {
    id: "memory", label: "Memory", x: 196, y: 47, w: 96, h: 34,
    path: "M80,168 L272,168 L248,83",
    desc: "Conversation and task state, so follow-up questions keep their context instead of starting cold.",
  },
  {
    id: "retriever", label: "Retriever", x: 104, y: 243, w: 92, h: 34,
    path: "M80,168 L151,168 L150,187 L150,241",
    desc: "Finds the right passages — this is how my Temenos docs assistant grounds answers in real team documentation.",
  },
  {
    id: "vectordb", label: "Vector DB", x: 104, y: 305, w: 92, h: 34,
    path: "M80,168 L151,168 L150,187 L150,241 L150,303",
    desc: "Embedded chunks of the corpus. Similarity search runs here, over team docs or my travel-research notes.",
  },
  {
    id: "llm", label: "LLM", x: 308, y: 243, w: 84, h: 34,
    path: "M80,168 L272,168 L304,183 L344,245",
    desc: "Generation, grounded in what the retriever returned — not the model's own recollection.",
  },
  {
    id: "tools", label: "Tools", sub: "MCP", x: 372, y: 151, w: 94, h: 34,
    path: "M80,168 L419,168",
    desc: "MCP tools expose real data — my Settle server hands an agent live balances, expenses and analytics — so it acts on facts, not guesses.",
  },
  {
    id: "response", label: "Response", x: 296, y: 305, w: 108, h: 34,
    path: "M80,168 L272,168 L304,183 L344,245 L350,303",
    desc: "The grounded answer, returned with citations pointing back to the source passages.",
  },
];

const CYCLE = ["user", "gateway", "agent", "retriever", "vectordb", "llm", "tools", "memory", "response"];

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AISystemDiagram() {
  const [selected, setSelected] = useState("agent");
  const [interacted, setInteracted] = useState(false);
  const reduced = useRef(prefersReducedMotion());

  // Idle autoplay — cycles stages until the visitor takes over.
  useEffect(() => {
    if (interacted || reduced.current) return;
    const t = setInterval(() => {
      setSelected((cur) => {
        const i = CYCLE.indexOf(cur);
        return CYCLE[(i + 1) % CYCLE.length];
      });
    }, 2600);
    return () => clearInterval(t);
  }, [interacted]);

  const pick = (id: string) => {
    setSelected(id);
    setInteracted(true);
  };

  const active = NODES.find((n) => n.id === selected) ?? NODES[2];

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid var(--border)",
        borderRadius: 20,
        background: "linear-gradient(180deg,var(--surface),transparent)",
        padding: 18,
        boxShadow: "var(--shadow)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6, gap: 10 }}>
        <span className="mono" style={{ fontSize: 12, color: "var(--mute)" }}>AI System in Action</span>
        <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 9px", border: "1px solid var(--border)", borderRadius: 999 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--signal)", animation: "livePulse 2.4s ease-in-out infinite" }} />
          <span style={{ fontSize: 10.5, color: "var(--signal)" }}>{interacted ? "explore" : "live"}</span>
        </span>
      </div>

      <svg viewBox="0 0 480 366" style={{ width: "100%", height: "auto", display: "block", fontFamily: "'JetBrains Mono', monospace" }}>
        <defs>
          <marker id="arr" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6" fill="none" stroke="var(--faint)" strokeWidth="1.3" />
          </marker>
        </defs>

        {/* structural connectors */}
        <g stroke="var(--border)" strokeWidth="1.4" fill="none" markerEnd="url(#arr)">
          <line x1="80" y1="168" x2="102" y2="168" />
          <line x1="198" y1="168" x2="214" y2="168" />
          <line x1="150" y1="187" x2="150" y2="241" />
          <line x1="150" y1="277" x2="150" y2="303" />
          <line x1="350" y1="277" x2="350" y2="303" />
        </g>
        <line x1="272" y1="151" x2="248" y2="83" stroke="var(--border)" strokeWidth="1.4" strokeDasharray="3 4" />
        <g fill="none" stroke="var(--accent)" strokeWidth="1.7" strokeDasharray="3 7" opacity="0.85" style={reduced.current ? undefined : { animation: "dashFlow 3s linear infinite" }}>
          <polyline points="328,168 372,168" />
          <polyline points="304,183 344,245" />
          <polyline points="196,322 306,268" />
        </g>

        {/* nodes */}
        {NODES.map((n) => {
          const isActive = n.id === selected;
          return (
            <g
              key={n.id}
              role="button"
              tabIndex={0}
              aria-label={`${n.label}: ${n.desc}`}
              aria-pressed={isActive}
              onClick={() => pick(n.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  pick(n.id);
                }
              }}
              style={{ cursor: "pointer", opacity: isActive ? 1 : 0.5, transition: "opacity 0.35s ease", outline: "none" }}
            >
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={n.h}
                rx={9}
                fill={isActive ? "var(--surface2)" : "var(--solid)"}
                stroke={isActive ? "var(--accent)" : "var(--border)"}
                strokeWidth={isActive ? 1.8 : 1}
                style={{ transition: "stroke 0.3s ease, fill 0.3s ease" }}
              />
              <text
                x={n.x + n.w / 2}
                y={n.y + (n.sub ? 16 : 21)}
                textAnchor="middle"
                fontSize="11.5"
                fontWeight={isActive ? 600 : 400}
                fill={isActive ? "var(--text)" : "var(--dim)"}
                style={{ pointerEvents: "none" }}
              >
                {n.label}
              </text>
              {n.sub && (
                <text x={n.x + n.w / 2} y={n.y + 29} textAnchor="middle" fontSize="9" fill="var(--mute)" style={{ pointerEvents: "none" }}>
                  {n.sub}
                </text>
              )}
            </g>
          );
        })}

        {/* animated request packet along the active route */}
        {!reduced.current && (
          <circle key={active.id} r="4.5" fill="var(--accent)" opacity="0.95">
            <animateMotion dur="1.7s" repeatCount="indefinite" path={active.path} />
          </circle>
        )}
      </svg>

      {/* caption */}
      <div style={{ marginTop: 8, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
        <div className="mono" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--signal)", marginBottom: 6 }}>
          ▸ {active.label}
          {!interacted && <span style={{ color: "var(--faint)" }}>· click any node to explore</span>}
        </div>
        <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.55, margin: 0, minHeight: 42 }}>{active.desc}</p>
      </div>
    </div>
  );
}
