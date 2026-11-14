import type { CSSProperties } from "react";

export const sora = "'Sora', sans-serif";

export const wrap: CSSProperties = { maxWidth: 1240, margin: "0 auto", padding: "0 32px" };

export const gradTitle: CSSProperties = {
  background: "var(--title)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export const gradAccent: CSSProperties = {
  background: "linear-gradient(100deg, var(--accent), var(--accent2))",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export const card: CSSProperties = {
  border: "1px solid var(--border)",
  borderRadius: 18,
  background: "var(--solid)",
  boxShadow: "var(--shadow)",
};

export const pill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 11px",
  border: "1px solid var(--border)",
  borderRadius: 999,
  fontSize: 11,
  color: "var(--dim)",
  background: "var(--surface)",
};

export const accentPill: CSSProperties = {
  ...pill,
  border: "1px solid var(--border-strong)",
  color: "var(--accent)",
  background: "color-mix(in srgb, var(--accent) 10%, transparent)",
};
