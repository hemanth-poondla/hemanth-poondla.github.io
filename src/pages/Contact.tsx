import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import profileImage from "@/assets/profile.webp";

const WEB3FORMS_ACCESS_KEY = "733101df-ea65-4f6f-8e6f-fa0d6a1fa8c0";
const sora = "'Sora', sans-serif";
const gradTitle: React.CSSProperties = { background: "var(--title)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" };

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

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
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
      // a silent false success is what hid this problem in the first place.
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

      setStatus("sent");
      form.reset();
      toast({ title: "Message sent! 🎉", description: "Thank you! I'll get back to you soon." });
      setTimeout(() => setStatus("idle"), 5000);
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
      <section className="sec" style={{ maxWidth: 960, margin: "0 auto", padding: "60px 32px 32px" }}>
        <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>// open.a.connection</span>
        <h1 className="page-h1" style={{ fontFamily: sora, fontSize: 48, fontWeight: 700, letterSpacing: "-0.03em", margin: "12px 0 12px", ...gradTitle }}>Get in touch</h1>
        <p style={{ fontSize: 17, color: "var(--dim)", lineHeight: 1.6, margin: 0, maxWidth: 540 }}>
          Have a role, a project, or an idea worth building with GenAI? Send a message — I read every one.
        </p>
      </section>

      <section className="contact-grid sec" style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px 72px", display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 40, alignItems: "start" }}>
        {/* Form */}
        <div style={{ position: "relative", border: "1px solid var(--border)", borderRadius: 20, background: "var(--surface)", padding: 30 }}>
          {status === "sent" && (
            <div style={{ position: "absolute", inset: 0, background: "var(--bg)", opacity: 0.96, borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 30, zIndex: 2 }}>
              <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(74,222,128,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--signal)" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg>
              </div>
              <p style={{ fontFamily: sora, fontSize: 19, fontWeight: 600, margin: "0 0 6px" }}>Thanks for reaching out!</p>
              <p style={{ fontSize: 14, color: "var(--mute)", margin: 0 }}>I'll get back to you soon.</p>
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Web3Forms honeypot — bots fill this, humans never see it */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
            />
            <div className="form-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label className="mono" style={labelStyle}>NAME</label>
                <input name="name" required placeholder="Your name" style={{ ...fieldStyle, height: 46 }} />
              </div>
              <div>
                <label className="mono" style={labelStyle}>EMAIL</label>
                <input name="email" type="email" required placeholder="you@example.com" style={{ ...fieldStyle, height: 46 }} />
              </div>
            </div>
            <div>
              <label className="mono" style={labelStyle}>SUBJECT</label>
              <input name="subject" required placeholder="Project inquiry" style={{ ...fieldStyle, height: 46 }} />
            </div>
            <div>
              <label className="mono" style={labelStyle}>MESSAGE</label>
              <textarea name="message" required rows={5} placeholder="Tell me about it..." style={{ ...fieldStyle, padding: "12px 14px", resize: "none" }} />
            </div>
            <button type="submit" disabled={status === "sending"} style={{ height: 48, border: "none", borderRadius: 11, background: "var(--accent)", color: "#fff", fontSize: 14.5, fontWeight: 600, cursor: status === "sending" ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}>
              {status === "sending" ? (
                <>
                  <span style={{ width: 15, height: 15, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                  Sending...
                </>
              ) : (
                <>
                  Send message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4 20-7Z" /></svg>
                </>
              )}
            </button>

            {/* Fallback so an enquiry is never lost if the form service fails */}
            <p className="mono" style={{ fontSize: 11.5, color: "var(--mute)", margin: 0, textAlign: "center" }}>
              Prefer email?{" "}
              <a href="mailto:poondlahemanth1@gmail.com" style={{ color: "var(--accent)" }}>
                poondlahemanth1@gmail.com
              </a>
            </p>
          </form>
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
