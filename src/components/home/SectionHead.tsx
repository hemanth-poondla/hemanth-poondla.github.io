import type { ReactNode } from "react";
import { sora } from "./styles";

interface Props {
  index: string;
  label: string;
  title: ReactNode;
  blurb?: ReactNode;
}

export function SectionHead({ index, label, title, blurb }: Props) {
  return (
    <div className="home-head">
      <div>
        <p className="mono" style={{ display: "flex", alignItems: "center", gap: 10, margin: 0, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mute)" }}>
          <span style={{ width: 28, height: 1, background: "var(--accent)" }} />
          {index} — {label}
        </p>
        <h2 style={{ fontFamily: sora, fontSize: "clamp(32px, 4.4vw, 56px)", fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.035em", margin: "14px 0 0" }}>{title}</h2>
      </div>
      {blurb && <p className="home-head-blurb" style={{ fontSize: 16.5, lineHeight: 1.65, color: "var(--mute)", margin: 0, maxWidth: 460 }}>{blurb}</p>}
    </div>
  );
}
