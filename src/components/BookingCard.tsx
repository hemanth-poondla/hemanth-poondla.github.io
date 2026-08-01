import { useState } from "react";
import { loadCal, currentTheme } from "@/lib/cal";

/**
 * Booking buttons for the Contact sidebar.
 *
 * Clicking opens Cal.com in a modal over the site. If the embed can't load —
 * blocked, offline, timed out — the click opens the hosted booking page in a
 * new tab instead, so the button never dead-ends.
 */

/** Your cal.com username. The two event slugs below must exist on that account. */
const CAL_HANDLE = "hemanth-poondla";

const MEETINGS = [
  { slug: `${CAL_HANDLE}/15min`, duration: "15 min", kind: "quick chat" },
  { slug: `${CAL_HANDLE}/45min`, duration: "45 min", kind: "deep dive" },
] as const;

export function BookingCard() {
  const [busy, setBusy] = useState<string | null>(null);

  const open = async (slug: string) => {
    if (busy) return;
    setBusy(slug);
    try {
      const cal = await loadCal();
      cal("modal", { calLink: slug, config: { theme: currentTheme() } });
    } catch (err) {
      console.error("Cal embed unavailable, opening the hosted page instead:", err);
      window.open(`https://cal.com/${slug}`, "_blank", "noopener,noreferrer");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
      {MEETINGS.map((m) => {
        const loading = busy === m.slug;
        return (
          <button
            key={m.slug}
            onClick={() => open(m.slug)}
            disabled={loading}
            aria-label={`Book a ${m.duration} ${m.kind} with Hemanth`}
            className="mono book-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              width: "100%",
              padding: "11px 14px",
              borderRadius: 11,
              border: "1px solid var(--border-strong)",
              background: "rgba(139,125,255,0.08)",
              color: "var(--accent)",
              fontSize: 12.5,
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.6 : 1,
              textAlign: "left",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span style={{ fontWeight: 500 }}>{m.duration}</span>
            <span style={{ color: "var(--mute)" }}>· {m.kind}</span>
            {loading && <span style={{ marginLeft: "auto", color: "var(--mute)" }}>…</span>}
          </button>
        );
      })}
    </div>
  );
}
