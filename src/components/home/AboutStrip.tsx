import { Link } from "react-router-dom";
import { SectionHead } from "./SectionHead";
import { sora, wrap, card, pill, gradAccent } from "./styles";

const interests = ["Chess", "Cricket", "Music", "Travel", "Philosophy"];
const principles = ["Quality over quantity.", "Stay curious and humble.", "Family first.", "Hard work beats talent.", "Every place has a story."];

const facts = [
  { v: "#1", t: "Rank 1 Performer, Temenos", d: "Two consecutive years." },
  { v: "2×", t: "Office Chess Champion", d: "Twice. Thinks several moves ahead." },
];

export function AboutStrip() {
  return (
    <section id="about" style={{ scrollMarginTop: 80 }}>
      <div style={{ ...wrap, padding: "88px 32px" }}>
        <SectionHead index="04" label="About" title="Reliability first" />

        <div className="home-about" style={{ marginTop: 40 }}>
          <div>
            <blockquote style={{ margin: 0, fontFamily: sora, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.035em" }}>
              “In banking, a model that’s confidently wrong is a <span style={gradAccent}>bug that moves money.</span> I build AI the same way.”
            </blockquote>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--mute)", maxWidth: 620, margin: "26px 0 0" }}>
              Six years in banking software across Trade Finance, payments and corporate origination at Temenos. That shaped how I build with LLMs: design for the failure case, ground models in real data, verify before you trust.
            </p>
            <ul className="mono" style={{ listStyle: "none", margin: "26px 0 0", padding: 0, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {interests.map((t) => <li key={t} style={pill}>{t}</li>)}
            </ul>
            <Link to="/about" className="mono" style={{ display: "inline-block", marginTop: 26, fontSize: 13, color: "var(--accent)" }}>More about me →</Link>
          </div>

          <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
            <div className="home-facts">
              {facts.map((f) => (
                <div key={f.t} style={{ ...card, padding: 20 }}>
                  <p style={{ fontFamily: sora, fontSize: 32, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1, margin: 0 }}>{f.v}</p>
                  <h3 style={{ fontFamily: sora, fontSize: 15, fontWeight: 600, margin: "12px 0 0" }}>{f.t}</h3>
                  <p style={{ fontSize: 13.5, color: "var(--mute)", margin: "4px 0 0" }}>{f.d}</p>
                </div>
              ))}
            </div>
            <div style={{ ...card, padding: 20 }}>
              <h3 style={{ fontFamily: sora, fontSize: 15, fontWeight: 600, margin: 0 }}>HackerRank</h3>
              <p style={{ fontSize: 13.5, color: "var(--mute)", margin: "4px 0 0" }}>Silver 3★ Problem Solving · 4★ Python.</p>
            </div>
            <div style={{ ...card, padding: 20 }}>
              <p className="mono" style={{ margin: 0, fontSize: 11.5, color: "var(--mute)" }}>Principles</p>
              <ol style={{ listStyle: "none", margin: "14px 0 0", padding: 0, display: "grid", gap: 8 }}>
                {principles.map((p, i) => (
                  <li key={p} style={{ display: "flex", gap: 14, fontSize: 15 }}>
                    <span className="mono" style={{ fontSize: 12, color: "var(--accent)", paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>{p}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
