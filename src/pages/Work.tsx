import { Layout } from "@/components/layout/Layout";

const sora = "'Sora', sans-serif";
const gradTitle: React.CSSProperties = { background: "var(--title)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" };

const jobs = [
  {
    year: "2023 - Present",
    location: "Hyderabad, India",
    title: "Senior Product Engineer",
    company: "Temenos India Pvt. Ltd.",
    description: "Leading Supply Chain Finance UX, building internal AI tooling, and mentoring the team.",
    responsibilities: [
      "Built and rolled out an AI-assisted code review tool (LLM analysis to flag issues and speed up reviews)",
      "Built a retrieval-based (RAG) documentation assistant for team docs",
      "Iterated on prompt design and evaluation for internal LLM tooling",
      "Delivered a unified UX redesign for Supply Chain Finance, top-ranked internally",
      "Partnered across teams on a corporate origination banking product",
    ],
    tools: ["React", "TypeScript", "LangChain", "OpenAI API", "Tailwind", "Git"],
  },
  {
    year: "2020 - 2023",
    location: "Hyderabad, India",
    title: "Software Development Engineer",
    company: "Temenos India Pvt. Ltd.",
    description: "Led Trade Finance features across a Corporate Banking application.",
    responsibilities: [
      "Built Import LC, Export LC, Issued/Received Guarantees and Collections",
      "Mentored and trained 4 new developers to full role competency",
      "Modularized a large Retail Banking app into smaller micro-apps",
      "Built out Payments Module features",
    ],
    tools: ["React", "JavaScript", "REST APIs", "Git", "Jenkins"],
  },
  {
    year: "2019 - 2020",
    location: "Hyderabad, India",
    title: "Associate Software Development Engineer",
    company: "Kony India Pvt. Ltd.",
    description: "Contributed to Online and Mobile Banking modules.",
    responsibilities: [
      "Owned UI development for User Management and Foreign Exchange modules",
      "Delivered feature builds and critical bug fixes",
      "Cut operating costs by revising and modularizing legacy codebases",
    ],
    tools: ["JavaScript", "HTML5", "CSS3", "REST APIs"],
  },
];

const Work = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="fu sec" style={{ maxWidth: 720, margin: "0 auto", padding: "72px 32px 40px", textAlign: "center" }}>
        <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>// career.journey</span>
        <h1 className="page-h1" style={{ fontFamily: sora, fontSize: 52, fontWeight: 700, letterSpacing: "-0.03em", margin: "12px 0 16px", ...gradTitle }}>Work Experience</h1>
        <p style={{ fontSize: 18, color: "var(--dim)", lineHeight: 1.6, margin: "0 0 28px" }}>
          6+ years building enterprise-grade banking applications — from Trade Finance to Supply Chain UX — now applying that production discipline to GenAI.
        </p>
        <a href="/resume.pdf" download="Hemanth_Poondla_Resume.pdf" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "12px 24px", borderRadius: 12, background: "var(--accent)", color: "#fff", fontSize: 14.5, fontWeight: 600, boxShadow: "0 16px 40px -16px rgba(139,125,255,0.7)" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v13M7 11l5 5 5-5M5 21h14" /></svg>
          Download Résumé
        </a>
      </section>

      {/* Timeline */}
      <section className="sec" style={{ maxWidth: 820, margin: "0 auto", padding: "24px 32px 40px" }}>
        <div style={{ position: "relative", paddingLeft: 34 }}>
          <div style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 2, background: "linear-gradient(180deg,var(--accent),rgba(139,125,255,0.1))" }} />
          {jobs.map((j) => (
            <div key={j.title} style={{ position: "relative", marginBottom: 22 }}>
              <span style={{ position: "absolute", left: -34, top: 26, width: 12, height: 12, borderRadius: "50%", background: "var(--accent)", border: "3px solid var(--bg)", boxShadow: "0 0 0 3px rgba(139,125,255,0.2)" }} />
              <div className="hover-card" style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--surface)", padding: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                  <span className="mono" style={{ fontSize: 12, color: "var(--accent)", background: "rgba(139,125,255,0.1)", borderRadius: 6, padding: "4px 10px" }}>{j.year}</span>
                  <span className="mono" style={{ fontSize: 12, color: "var(--faint)" }}>{j.location}</span>
                </div>
                <h3 style={{ fontFamily: sora, fontSize: 22, fontWeight: 600, margin: "0 0 3px" }}>{j.title}</h3>
                <p style={{ fontSize: 14.5, color: "var(--accent)", fontWeight: 500, margin: "0 0 14px" }}>{j.company}</p>
                <p style={{ fontSize: 15, color: "var(--dim)", lineHeight: 1.55, margin: "0 0 16px" }}>{j.description}</p>
                <ul style={{ margin: "0 0 18px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                  {j.responsibilities.map((r) => (
                    <li key={r} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--mute)", lineHeight: 1.5 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.4" style={{ marginTop: 2, flexShrink: 0 }}><path d="m9 18 6-6-6-6" /></svg>
                      {r}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {j.tools.map((t) => (
                    <span key={t} className="mono" style={{ padding: "5px 10px", fontSize: 11, color: "var(--mute)", background: "var(--chip)", borderRadius: 6 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="sec" style={{ maxWidth: 560, margin: "0 auto", padding: "20px 32px 72px", textAlign: "center" }}>
        <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>// education</span>
        <div style={{ border: "1px solid var(--border)", borderRadius: 20, background: "var(--surface)", padding: 30, marginTop: 16 }}>
          <p className="mono" style={{ fontSize: 12, color: "var(--faint)", margin: "0 0 8px" }}>2016 - 2020</p>
          <h3 style={{ fontFamily: sora, fontSize: 19, fontWeight: 600, margin: "0 0 5px" }}>B.Tech, Computer Science & Engineering</h3>
          <p style={{ fontSize: 15, color: "var(--mute)", margin: 0 }}>Keshav Memorial Institute of Technology, Hyderabad</p>
          <p style={{ fontSize: 13.5, color: "var(--accent)", margin: "10px 0 0" }}>CGPA: 7.8</p>
        </div>
      </section>
    </Layout>
  );
};

export default Work;
