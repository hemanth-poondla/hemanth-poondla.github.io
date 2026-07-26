import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  /** Show the secondary cyan glow (home only). */
  secondaryGlow?: boolean;
}

export function Layout({ children, secondaryGlow = false }: LayoutProps) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "var(--bg)", overflowX: "hidden" }}>
      {/* Ambient glow blobs */}
      <div
        style={{
          position: "absolute",
          top: -160,
          right: -120,
          width: 620,
          height: 620,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--glow1), transparent 65%)",
          filter: "blur(30px)",
          animation: "bgDrift 18s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      {secondaryGlow && (
        <div
          style={{
            position: "absolute",
            top: 420,
            left: -180,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, var(--glow2), transparent 65%)",
            filter: "blur(30px)",
            animation: "bgDrift 22s ease-in-out infinite reverse",
            pointerEvents: "none",
          }}
        />
      )}
      {/* Dotted grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(var(--dot) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          pointerEvents: "none",
        }}
      />

      {/* Matrix-bracket framing — the whole page reads as one vector/matrix.
          Fixed so the brackets hold as you scroll. Desktop-only, decorative. */}
      <div className="matrix-frame" aria-hidden="true">
        <svg className="mb mb-left" viewBox="0 0 24 100" preserveAspectRatio="none">
          <path d="M20 2 L6 2 L6 98 L20 98" fill="none" stroke="var(--border-strong)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg className="mb mb-right" viewBox="0 0 24 100" preserveAspectRatio="none">
          <path d="M4 2 L18 2 L18 98 L4 98" fill="none" stroke="var(--border-strong)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
