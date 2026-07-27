import { useRef, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import profileImage from "@/assets/profile.webp";

const WEB3FORMS_ACCESS_KEY = "733101df-ea65-4f6f-8e6f-fa0d6a1fa8c0";
const sora = "'Sora', sans-serif";
const gradTitle: React.CSSProperties = { background: "var(--title)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" };

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fieldStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "0 14px",
  background: "var(--field)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  color: "var(--text)",
  fontSize: 14,
  fontFamily: "'DM Sans', sans-serif",
};
const labelStyle: React.CSSProperties = { display: "block", fontSize: 11, color: "var(--mute)", marginBottom: 7 };

// ---- Transmission scene geometry (shared by the flight + landing phases) ----
// Your message launches from the send button, flies a beam, and joins a little
// vector-space — the same four directions as the skill constellation.
const LAUNCH: [number, number] = [58, 190];
const LAND: [number, number] = [286, 92];
const CORE: [number, number] = [312, 74];
const FLIGHT_PATH = `M${LAUNCH[0]} ${LAUNCH[1]} Q150 112 ${LAND[0]} ${LAND[1]}`;
const DIM_ORBS: { p: [number, number]; c: string }[] = [
  { p: [280, 50], c: "#8b7dff" }, // ai
  { p: [346, 58], c: "#22d3ee" }, // frontend
  { p: [352, 94], c: "#4ade80" }, // backend
  { p: [320, 110], c: "#c99a3a" }, // domain
];

/** The mini vector-space. `phase` decides whether the packet is mid-flight,
 *  landed (with a burst), or static (reduced-motion / in-transit). */
function TransmitScene({ phase }: { phase: "flight" | "landed" | "static" }) {
  return (
    <svg viewBox="0 0 400 210" width="100%" style={{ display: "block", maxWidth: 440, margin: "0 auto" }} aria-hidden="true">
      <defs>
        <filter id="txglow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="3.4" />
        </filter>
      </defs>

      {/* flight beam */}
      {phase === "flight" && (
        <path d={FLIGHT_PATH} className="tx-beam" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
      )}

      {/* cluster beams from the core out to each direction */}
      {DIM_ORBS.map((o, i) => (
        <line key={i} className="tx-cluster-beam" x1={CORE[0]} y1={CORE[1]} x2={o.p[0]} y2={o.p[1]} stroke={o.c} strokeWidth="1" />
      ))}
      {/* the beam your message settles onto, drawn once it lands */}
      {phase === "landed" && (
        <line className="tx-cluster-beam" x1={CORE[0]} y1={CORE[1]} x2={LAND[0]} y2={LAND[1]} stroke="var(--accent)" strokeWidth="1.2" style={{ opacity: 0.55 }} />
      )}

      {/* origin core */}
      <circle cx={CORE[0]} cy={CORE[1]} r="4" fill="#cfc8ff" filter="url(#txglow)" />
      <circle cx={CORE[0]} cy={CORE[1]} r="2.6" fill="#efecff" />

      {/* the existing points in the space */}
      {DIM_ORBS.map((o, i) => (
        <g key={i}>
          <circle cx={o.p[0]} cy={o.p[1]} r="5" fill={o.c} filter="url(#txglow)" opacity="0.45" />
          <circle className="tx-orb" cx={o.p[0]} cy={o.p[1]} r="3" fill={o.c} style={{ animationDelay: `${i * 0.3}s` }} />
        </g>
      ))}

      {/* landing burst + your message as a new bright vector */}
      {phase === "landed" && (
        <>
          <circle className="tx-ring" cx={LAND[0]} cy={LAND[1]} r="8" fill="none" stroke="var(--accent)" strokeWidth="1.6" />
          <circle className="tx-ring" cx={LAND[0]} cy={LAND[1]} r="8" fill="none" stroke="var(--signal)" strokeWidth="1.2" style={{ animationDelay: "0.18s" }} />
          <circle cx={LAND[0]} cy={LAND[1]} r="10" fill="var(--accent)" filter="url(#txglow)" opacity="0.7" />
          <circle className="tx-newlanded" cx={LAND[0]} cy={LAND[1]} r="5" fill="#fff" />
        </>
      )}

      {/* the packet in transit */}
      {phase === "flight" && (
        <g>
          <circle r="9" fill="var(--accent)" filter="url(#txglow)" opacity="0.7" />
          <circle r="4" fill="#efecff" />
          <animateMotion dur="1.5s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" path={FLIGHT_PATH} />
        </g>
      )}
    </svg>
  );
}

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [message, setMessage] = useState("");
  const reduced = useRef(prefersReduced());
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const startedAt = Date.now();
    setStatus("sending");

    const formData = new FormData(form);
    const senderEmail = String(formData.get("email") || "");
    const senderName = String(formData.get("name") || "");

    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("from_name", "Portfolio Contact Form");
    // So replying in Gmail goes back to the sender, not to Web3Forms.
    formData.append("replyTo", senderEmail);
    if (!String(formData.get("subject") || "").trim()) {
      formData.set("subject", `Portfolio enquiry from ${senderName || "a visitor"}`);
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();

      // Only ever show the confirmation when the API genuinely accepted it —
      // a silent false success is what hid an earlier delivery problem.
      if (!response.ok || !data?.success) {
        console.error("Web3Forms rejected the submission:", { status: response.status, data });
        setStatus("idle");
        toast({
          title: "Message not sent",
          description: data?.message || `The form service returned an error (${response.status}). Please email me directly.`,
          variant: "destructive",
        });
        return;
      }

      // Let the packet finish its flight before the landing, even on a fast
      // network — otherwise the animation is over before it's seen.
      const flightRemaining = reduced.current ? 0 : Math.max(0, 1500 - (Date.now() - startedAt));
      window.setTimeout(() => {
        setStatus("sent");
        form.reset();
        setMessage("");
      }, flightRemaining);
    } catch (error) {
      console.error("Contact form network error:", error);
      setStatus("idle");
      toast({
        title: "Couldn't reach the form service",
        description: "Please check your connection, or email me directly at poondlahemanth1@gmail.com.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="sec" style={{ maxWidth: 960, margin: "0 auto", padding: "60px 32px 28px" }}>
        <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>// open.a.connection</span>
        <h1 className="page-h1" style={{ fontFamily: sora, fontSize: 48, fontWeight: 700, letterSpacing: "-0.03em", margin: "12px 0 12px", ...gradTitle }}>Let's talk</h1>
        <p style={{ fontSize: 17, color: "var(--dim)", lineHeight: 1.6, margin: 0, maxWidth: 560 }}>
          A role, a project, or an idea worth building with GenAI? Send a message — it becomes a point in my inbox's vector space, and I usually reply within a day or two.
        </p>
      </section>

      <section className="contact-grid sec" style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px 72px", display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 40, alignItems: "start" }}>
        {/* Form */}
        <div style={{ position: "relative", overflow: "hidden", border: "1px solid var(--border)", borderRadius: 20, background: "var(--surface)", padding: 30, boxShadow: "var(--shadow)" }}>
          {/* ambient accent glow */}
          <div style={{ position: "absolute", top: -80, right: -60, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, var(--glow1), transparent 65%)", filter: "blur(30px)", pointerEvents: "none" }} />

          {status === "sending" ? (
            <div style={{ position: "relative", minHeight: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }} aria-live="polite">
              <TransmitScene phase={reduced.current ? "static" : "flight"} />
              <p className="mono" style={{ fontSize: 12.5, color: "var(--mute)", margin: 0, letterSpacing: "0.02em" }}>
                embedding your message<span style={{ color: "var(--faint)" }}> · transmitting →</span>
              </p>
            </div>
          ) : status === "sent" ? (
            <div className="cf-success" style={{ position: "relative", textAlign: "center", minHeight: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", animation: "popIn 0.4s cubic-bezier(0.2,0.7,0.2,1) both" }} aria-live="polite">
              {/* sparkles */}
              {[
                { x: "16%", y: "10%", d: 0 }, { x: "84%", y: "16%", d: 0.15 }, { x: "10%", y: "40%", d: 0.3 },
                { x: "90%", y: "46%", d: 0.1 }, { x: "26%", y: "70%", d: 0.25 }, { x: "76%", y: "74%", d: 0.35 },
              ].map((s, i) => (
                <span key={i} className="cf-spark" style={{ position: "absolute", left: s.x, top: s.y, width: 6, height: 6, borderRadius: 999, background: "var(--accent)", animation: `sparkPop 1.4s ${s.d}s ease-in-out infinite` }} />
              ))}

              <TransmitScene phase="landed" />
              <p style={{ fontFamily: sora, fontSize: 22, fontWeight: 700, margin: "14px 0 8px" }}>Received ✦</p>
              <p style={{ fontSize: 14.5, color: "var(--dim)", margin: "0 0 22px", lineHeight: 1.6, maxWidth: 380 }}>
                Your message just landed as a new vector in my inbox. I'll get back to you within a day or two — thanks for reaching out.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mono"
                style={{ cursor: "pointer", fontSize: 12.5, padding: "10px 18px", borderRadius: 999, border: "1px solid var(--border-strong)", background: "rgba(139,125,255,0.1)", color: "var(--accent)" }}
              >
                Send another →
              </button>
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              <p className="mono" style={{ fontSize: 11, color: "var(--faint)", margin: "0 0 18px" }}>// new.message</p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* honeypot — bots fill this, humans never see it */}
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }} />

                <div className="form-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label className="mono" style={labelStyle}>NAME</label>
                    <input name="name" required placeholder="Your name" className="cf-field" style={{ ...fieldStyle, height: 46 }} />
                  </div>
                  <div>
                    <label className="mono" style={labelStyle}>EMAIL</label>
                    <input name="email" type="email" required placeholder="you@example.com" className="cf-field" style={{ ...fieldStyle, height: 46 }} />
                  </div>
                </div>
                <div>
                  <label className="mono" style={labelStyle}>SUBJECT</label>
                  <input name="subject" required placeholder="What's on your mind?" className="cf-field" style={{ ...fieldStyle, height: 46 }} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                    <label className="mono" style={labelStyle}>MESSAGE</label>
                    <span className="mono" style={{ fontSize: 10.5, color: message.length > 0 ? "var(--mute)" : "var(--faint)" }}>{message.length} chars</span>
                  </div>
                  <textarea name="message" required rows={5} placeholder="Tell me about it…" value={message} onChange={(e) => setMessage(e.target.value)} className="cf-field" style={{ ...fieldStyle, padding: "12px 14px", resize: "none" }} />
                </div>

                <button type="submit" className="cf-send" style={{ height: 50, border: "none", borderRadius: 12, background: "var(--accent)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, boxShadow: "0 12px 30px -14px rgba(139,125,255,0.7)" }}>
                  Send message
                  <svg className="cf-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4 20-7Z" /></svg>
                </button>

                {/* fallback so an enquiry is never lost if the form service fails */}
                <p className="mono" style={{ fontSize: 11.5, color: "var(--mute)", margin: 0, textAlign: "center" }}>
                  Prefer email? <a href="mailto:poondlahemanth1@gmail.com" style={{ color: "var(--accent)" }}>poondlahemanth1@gmail.com</a>
                </p>
              </form>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ width: 88, height: 88, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--border-strong)" }}>
            <img src={profileImage} alt="Hemanth Poondla" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div>
            <p className="mono" style={{ fontSize: 11, color: "var(--faint)", margin: "0 0 6px" }}>EMAIL</p>
            <a href="mailto:poondlahemanth1@gmail.com" style={{ fontSize: 15, color: "var(--text)" }}>poondlahemanth1@gmail.com</a>
          </div>
          <div>
            <p className="mono" style={{ fontSize: 11, color: "var(--faint)", margin: "0 0 6px" }}>LOCATION</p>
            <p style={{ fontSize: 15, margin: 0 }}>Hyderabad, India</p>
          </div>
          <div>
            <p className="mono" style={{ fontSize: 11, color: "var(--faint)", margin: "0 0 10px" }}>SOCIAL</p>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="https://github.com/hemanth-poondla" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ width: 44, height: 44, borderRadius: 12, border: "1px solid var(--border)", background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text)" }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.5 0 12.3c0 5.43 3.44 10.03 8.2 11.66.6.11.82-.27.82-.6v-2.1c-3.34.74-4.04-1.66-4.04-1.66-.55-1.43-1.33-1.8-1.33-1.8-1.08-.76.08-.74.08-.74 1.2.09 1.83 1.26 1.83 1.26 1.07 1.87 2.8 1.33 3.48 1.02.1-.79.42-1.33.76-1.64-2.67-.31-5.47-1.37-5.47-6.08 0-1.34.46-2.44 1.23-3.3-.12-.31-.53-1.57.12-3.28 0 0 1-.33 3.3 1.26a11.2 11.2 0 0 1 6 0c2.3-1.6 3.3-1.26 3.3-1.26.65 1.71.24 2.97.12 3.28.77.86 1.23 1.96 1.23 3.3 0 4.72-2.8 5.77-5.48 6.07.43.38.81 1.13.81 2.28v3.38c0 .33.22.72.83.6C20.56 22.32 24 17.72 24 12.3 24 5.5 18.63 0 12 0Z" /></svg>
              </a>
              <a href="https://linkedin.com/in/hemanth-poondla" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ width: 44, height: 44, borderRadius: 12, border: "1px solid var(--border)", background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text)" }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" /></svg>
              </a>
              <a href="mailto:poondlahemanth1@gmail.com" aria-label="Email" style={{ width: 44, height: 44, borderRadius: 12, border: "1px solid var(--border)", background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text)" }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>
              </a>
            </div>
          </div>
          <div style={{ paddingTop: 20, borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--signal)", animation: "livePulse 2.4s ease-in-out infinite" }} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Available for work</span>
            </div>
            <p style={{ fontSize: 13.5, color: "var(--mute)", margin: 0 }}>Open to GenAI engineering roles, remote or Hyderabad.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
