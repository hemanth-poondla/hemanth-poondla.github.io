import { Layout } from "@/components/layout/Layout";
import { TravelMap } from "@/components/TravelMap";
import profileImage from "@/assets/profile.webp";

const sora = "'Sora', sans-serif";
const gradTitle: React.CSSProperties = { background: "var(--title)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" };

const achievements = [
  { title: "Rank 1 Performer", desc: "Top rank two consecutive years at Temenos" },
  { title: "Chess Champion", desc: "Won the office-level competition twice" },
  { title: "HackerRank Stars", desc: "Silver 3★ Problem Solving, 4★ Python" },
];

const interests = [
  { emoji: "♟️", title: "Chess", desc: "Elite league player. Strategy is my playground." },
  { emoji: "🏏", title: "Cricket", desc: "Former college captain. Weekend warrior." },
  { emoji: "🎵", title: "Music", desc: "Diverse genres keep me in the zone." },
  { emoji: "✈️", title: "Travel", desc: "50+ places explored and counting." },
  { emoji: "📚", title: "Philosophy", desc: "Traditional values, modern perspective." },
];

const lessons = [
  { n: "01", text: "Quality over quantity, always." },
  { n: "02", text: "Stay curious, stay humble." },
  { n: "03", text: "Family first, everything else follows." },
  { n: "04", text: "Hard work beats talent when talent doesn't work hard." },
  { n: "05", text: "Every place has a story. Listen to it." },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="fu sec" style={{ maxWidth: 820, margin: "0 auto", padding: "72px 32px 48px", textAlign: "center" }}>
        <div style={{ width: 132, height: 132, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(139,125,255,0.4)", margin: "0 auto 28px", boxShadow: "0 0 50px -10px rgba(139,125,255,0.5)" }}>
          <img src={profileImage} alt="Hemanth Poondla" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>// about</span>
        <h1 className="page-h1" style={{ fontFamily: sora, fontSize: 52, fontWeight: 700, letterSpacing: "-0.03em", margin: "12px 0 14px", ...gradTitle }}>About Me</h1>
        <p className="mono" style={{ fontSize: 13, color: "var(--faint)", margin: "0 0 26px" }}>Hyderabad, India</p>
        <p style={{ fontSize: 20.5, color: "var(--dim)", lineHeight: 1.65, margin: "0 0 18px" }}>
          I spent six years building banking software — Trade Finance, payments, corporate origination — the kind of systems where a bug doesn't just annoy someone, it moves money the wrong way.
        </p>
        <p style={{ fontSize: 17, color: "var(--dim)", lineHeight: 1.7, margin: "0 0 18px" }}>
          That taught me something most demos never do: <strong style={{ color: "var(--text)" }}>reliability isn't a feature you bolt on at the end</strong>. You design for the failure cases first. When I started building with LLMs — an AI code-review tool and a RAG docs assistant for my team at Temenos — I brought the same instinct. Ground the model in real data. Verify before you answer. Assume it will be wrong sometimes, and design for that.
        </p>
        <p style={{ fontSize: 17, color: "var(--mute)", lineHeight: 1.7, margin: 0 }}>
          Five live products later, that's still how I work. Born and raised in Hyderabad, rooted in Indian traditions, and endlessly curious about the world — when I'm not wiring up LLMs you'll find me plotting my next chess move, planning the next trip, or cheering for cricket.
        </p>
      </section>

      {/* Achievements */}
      <section className="sec" style={{ maxWidth: 900, margin: "0 auto", padding: "24px 32px 40px" }}>
        <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {achievements.map((a) => (
            <div key={a.title} style={{ textAlign: "center", padding: "28px 20px", border: "1px solid var(--border)", borderRadius: 18, background: "var(--surface)" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(139,125,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
              </div>
              <h3 style={{ fontFamily: sora, fontSize: 16.5, fontWeight: 600, margin: "0 0 5px" }}>{a.title}</h3>
              <p style={{ fontSize: 13.5, color: "var(--mute)", margin: 0, lineHeight: 1.5 }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Beyond code */}
      <section className="sec" style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>// beyond.code</span>
          <h2 style={{ fontFamily: sora, fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", margin: "10px 0 6px" }}>Beyond Code</h2>
          <p style={{ fontSize: 15, color: "var(--mute)", margin: 0 }}>Life is more than just work. Here's what keeps me going.</p>
        </div>
        <div className="g5" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 }}>
          {interests.map((i) => (
            <div key={i.title} className="hover-card" style={{ textAlign: "center", padding: "22px 14px", border: "1px solid var(--border)", borderRadius: 16, background: "var(--surface)" }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{i.emoji}</div>
              <h3 style={{ fontFamily: sora, fontSize: 14, fontWeight: 600, margin: "0 0 5px" }}>{i.title}</h3>
              <p style={{ fontSize: 12, color: "var(--mute)", margin: 0, lineHeight: 1.45 }}>{i.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Travel map */}
      <section id="map" className="sec" style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>// places.visited</span>
          <h2 style={{ fontFamily: sora, fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", margin: "10px 0 6px" }}>The Map</h2>
          <p style={{ fontSize: 15, color: "var(--mute)", margin: 0 }}>60+ places across 5 countries — home base Hyderabad. Click a marker.</p>
        </div>
        <TravelMap />
      </section>

      {/* Life lessons */}
      <section className="sec" style={{ maxWidth: 680, margin: "0 auto", padding: "40px 32px 72px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>// principles</span>
          <h2 style={{ fontFamily: sora, fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", margin: "10px 0 6px" }}>Life Lessons</h2>
          <p style={{ fontSize: 15, color: "var(--mute)", margin: 0 }}>Things I believe in. My code of life.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {lessons.map((l) => (
            <div key={l.n} className="hover-card" style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 22px", border: "1px solid var(--border)", borderRadius: 14, background: "var(--surface)" }}>
              <span className="mono" style={{ fontSize: 16, color: "var(--accent)", fontWeight: 600 }}>{l.n}</span>
              <p style={{ fontSize: 15.5, color: "var(--dim)", fontStyle: "italic", margin: 0 }}>"{l.text}"</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default About;
