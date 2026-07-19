export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: 32, textAlign: "center" }}>
        <p
          className="mono"
          style={{ fontSize: 12, color: "var(--faint)", margin: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexWrap: "wrap" }}
        >
          Made with
          <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--accent)" style={{ animation: "livePulse 2s ease-in-out infinite" }}>
            <path d="M12 21s-7.5-4.9-10-9.3C.5 8.6 2 5 5.5 5c2 0 3.4 1.2 4.5 2.6C11.1 6.2 12.5 5 14.5 5 18 5 19.5 8.6 22 11.7 19.5 16.1 12 21 12 21Z"></path>
          </svg>
          by Hemanth Poondla · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
