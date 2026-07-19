import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "work", path: "/work" },
  { name: "projects", path: "/projects" },
];

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"></path>
    </svg>
  );
}

export function Header() {
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ position: "sticky", top: 18, zIndex: 50, display: "flex", justifyContent: "center", padding: "0 20px" }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 22,
          background: "var(--header)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid var(--border)",
          borderRadius: 999,
          padding: "9px 10px 9px 20px",
          boxShadow: "var(--shadow)",
          maxWidth: "100%",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 9 }} onClick={() => setMenuOpen(false)}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--signal)", animation: "livePulse 2.4s ease-in-out infinite" }} />
          <span className="mono" style={{ fontSize: 13 }}>hemanth.poondla</span>
        </Link>

        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="mono"
              style={{ fontSize: 12.5, color: location.pathname === item.path ? "var(--text)" : "var(--mute)" }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={toggle}
          title="Toggle theme"
          aria-label="Toggle theme"
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>

        <Link
          to="/contact"
          style={{ fontSize: 13, fontWeight: 600, background: "var(--accent)", color: "#fff", padding: "9px 18px", borderRadius: 999 }}
        >
          Connect
        </Link>

        {/* Mobile hamburger */}
        <button
          className="nav-burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          {menuOpen ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          )}
        </button>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 10px)",
              left: 0,
              right: 0,
              background: "var(--header)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid var(--border)",
              borderRadius: 18,
              boxShadow: "var(--shadow)",
              padding: 10,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="mono"
                style={{
                  fontSize: 14,
                  padding: "11px 14px",
                  borderRadius: 12,
                  color: location.pathname === item.path ? "var(--text)" : "var(--mute)",
                  background: location.pathname === item.path ? "var(--surface2)" : "transparent",
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
