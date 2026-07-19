import { Link } from "react-router-dom";

const navItems = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "work", path: "/work" },
  { name: "projects", path: "/projects" },
  { name: "contact", path: "/contact" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/hemanth-poondla",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.5 0 12.3c0 5.43 3.44 10.03 8.2 11.66.6.11.82-.27.82-.6v-2.1c-3.34.74-4.04-1.66-4.04-1.66-.55-1.43-1.33-1.8-1.33-1.8-1.08-.76.08-.74.08-.74 1.2.09 1.83 1.26 1.83 1.26 1.07 1.87 2.8 1.33 3.48 1.02.1-.79.42-1.33.76-1.64-2.67-.31-5.47-1.37-5.47-6.08 0-1.34.46-2.44 1.23-3.3-.12-.31-.53-1.57.12-3.28 0 0 1-.33 3.3 1.26a11.2 11.2 0 0 1 6 0c2.3-1.6 3.3-1.26 3.3-1.26.65 1.71.24 2.97.12 3.28.77.86 1.23 1.96 1.23 3.3 0 4.72-2.8 5.77-5.48 6.07.43.38.81 1.13.81 2.28v3.38c0 .33.22.72.83.6C20.56 22.32 24 17.72 24 12.3 24 5.5 18.63 0 12 0Z" /></svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/hemanth-poondla",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" /></svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:poondlahemanth1@gmail.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>
    ),
  },
];

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: 24 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 32px 36px" }}>
        {/* Tagline */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              margin: 0,
              background: "var(--title)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Living fully, exploring endlessly.
          </p>
        </div>

        {/* Nav + socials */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 26 }}>
          <nav style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="mono" style={{ fontSize: 12.5, color: "var(--mute)" }}>
                {item.name}
              </Link>
            ))}
          </nav>
          <span style={{ width: 1, height: 16, background: "var(--border)" }} aria-hidden="true" />
          <div style={{ display: "flex", gap: 10 }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--mute)",
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Rights */}
        <p className="mono" style={{ textAlign: "center", fontSize: 11.5, color: "var(--faint)", margin: 0 }}>
          © {new Date().getFullYear()} Hemanth Poondla · All rights reserved.
        </p>
      </div>
    </footer>
  );
}
