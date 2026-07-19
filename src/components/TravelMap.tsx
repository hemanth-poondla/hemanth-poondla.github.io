import { Suspense, lazy } from "react";

/** MapLibre is ~230KB — keep it out of the main bundle, load only on /about. */
const TravelMapInner = lazy(() => import("./TravelMapInner"));

function MapSkeleton() {
  return (
    <div
      className="mono"
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        minHeight: 320,
        border: "1px solid var(--border)",
        borderRadius: 20,
        background: "var(--surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        color: "var(--faint)",
      }}
    >
      loading world map…
    </div>
  );
}

export const TravelMap = () => (
  <Suspense fallback={<MapSkeleton />}>
    <TravelMapInner />
  </Suspense>
);
