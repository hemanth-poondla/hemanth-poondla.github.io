import { building } from "@/data/roadmap";
import { SectionHead } from "./SectionHead";
import { sora, wrap, card, pill, accentPill, gradAccent } from "./styles";

export function Roadmap() {
  return (
    <section id="roadmap" className="band" style={{ scrollMarginTop: 80 }}>
      <div style={{ ...wrap, padding: "88px 32px" }}>
        <SectionHead
          index="03"
          label="Roadmap"
          title="Three builds that compose into one agent"
          blurb="Each piece ships on its own, then plugs into the next — retrieval, tools, and finally an agent that uses both."
        />

        <ol className="home-three" style={{ listStyle: "none", margin: "44px 0 0", padding: 0 }}>
          {building.map((b, i) => {
            const last = i === building.length - 1;
            return (
              <li key={b.title} style={{ ...card, padding: 26, borderColor: last ? "var(--border-strong)" : "var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                  <span className="mono" style={last ? pill : accentPill}>
                    {!last && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", animation: "livePulse 2.4s infinite" }} />}
                    {b.status === "in progress" ? "In progress" : "Designing"}
                  </span>
                  <span className="mono" style={{ fontSize: 11.5, color: "var(--mute)" }}>{b.eta}</span>
                </div>
                <p style={{ fontFamily: sora, fontSize: 60, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.05em", margin: "34px 0 0", color: last ? undefined : "var(--surface2)", ...(last ? gradAccent : {}) }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 style={{ fontFamily: sora, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: "14px 0 0" }}>{b.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--mute)", margin: "10px 0 0" }}>{b.description}</p>
                <p className="mono" style={{ margin: "24px 0 0", paddingTop: 14, borderTop: "1px solid var(--border)", fontSize: 11.5, color: last ? "var(--accent)" : "var(--mute)" }}>
                  {last ? "Output · one composed agent" : "Feeds into Agentic Trip Planner"}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
