import { useEffect, useRef, useState } from "react";
import maplibregl, { Map as MlMap, Marker, LngLatBounds } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTheme } from "@/contexts/ThemeContext";
import { places, countries, countryColors, type Place } from "./travelPlaces";

/** Free, keyless CARTO vector basemaps that mirror the site's dark/light themes. */
const STYLES = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
};

const chipBase: React.CSSProperties = {
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  fontSize: 12,
  padding: "8px 14px",
  borderRadius: 999,
};

function markerEl(place: Place, onClick: () => void) {
  const el = document.createElement("button");
  el.type = "button";
  el.setAttribute("aria-label", `${place.name}, ${place.country}`);
  const size = place.isHome ? 18 : 13;
  el.style.cssText = `
    width:${size}px;height:${size}px;border-radius:999px;cursor:pointer;padding:0;
    background:${place.isHome ? "#ef4444" : countryColors[place.country]};
    border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.45);
    ${place.isHome ? "animation:livePulse 2.4s ease-in-out infinite;" : ""}
  `;
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    onClick();
  });
  return el;
}

export default function TravelMapInner() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [country, setCountry] = useState<string | null>(null);
  const [selected, setSelected] = useState<Place | null>(null);

  const filtered = country ? places.filter((p) => p.country === country) : places;

  // Init once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLES[theme],
      center: [72, 15],
      zoom: 2.4,
      attributionControl: { compact: true },
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Swap basemap when the site theme changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.setStyle(STYLES[theme]);
  }, [theme]);

  // (Re)draw markers for the current filter — also re-runs after a style swap
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const draw = () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = filtered.map((p) =>
        new maplibregl.Marker({ element: markerEl(p, () => setSelected(p)) })
          .setLngLat(p.coordinates)
          .addTo(map)
      );
    };

    if (map.isStyleLoaded()) draw();
    else map.once("styledata", draw);

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [filtered, theme]);

  // Fit the viewport to whatever is currently filtered
  useEffect(() => {
    const map = mapRef.current;
    if (!map || filtered.length === 0) return;
    const b = new LngLatBounds();
    filtered.forEach((p) => b.extend(p.coordinates));
    map.fitBounds(b, { padding: 64, maxZoom: 9, duration: 900 });
  }, [filtered]);

  return (
    <div>
      {/* Filter chips */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 18 }}>
        <button
          className="mono"
          onClick={() => { setCountry(null); setSelected(null); }}
          style={{ ...chipBase, border: `1px solid ${country === null ? "var(--accent)" : "var(--border)"}`, background: country === null ? "var(--surface2)" : "transparent", color: country === null ? "var(--text)" : "var(--mute)" }}
        >
          <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--accent)" }} />
          All ({places.length})
        </button>
        {countries.map((c) => {
          const active = country === c;
          return (
            <button
              key={c}
              className="mono"
              onClick={() => { setCountry(active ? null : c); setSelected(null); }}
              style={{ ...chipBase, border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`, background: active ? "var(--surface2)" : "transparent", color: active ? "var(--text)" : "var(--mute)" }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 999, background: countryColors[c] }} />
              {c} ({places.filter((p) => p.country === c).length})
            </button>
          );
        })}
      </div>

      {/* Map */}
      <div style={{ position: "relative", border: "1px solid var(--border)", borderRadius: 20, background: "var(--surface)", overflow: "hidden" }}>
        {/* Map area is its own positioning context, so overlays anchor to the
            map rather than the card (which grows when a place is selected). */}
        <div style={{ position: "relative" }}>
          <div className="mono" style={{ position: "absolute", top: 14, right: 14, zIndex: 2, display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: "var(--dim)", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 999, padding: "6px 12px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z" /></svg>
            {filtered.length} places explored
          </div>

          <div ref={containerRef} style={{ width: "100%", aspectRatio: "16 / 9", minHeight: 320 }} />

          {/* Legend — sits above the attribution strip, inside the map area */}
          <div className="map-legend" style={{ position: "absolute", bottom: 30, left: 14, zIndex: 2, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "10px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
            {countries.map((c) => (
              <span key={c} className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10.5, color: "var(--mute)" }}>
                <span style={{ width: 9, height: 9, borderRadius: 999, background: countryColors[c], border: "1px solid rgba(255,255,255,0.5)" }} />{c}
              </span>
            ))}
            <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10.5, color: "var(--mute)" }}>
              <span style={{ width: 9, height: 9, borderRadius: 999, background: "#ef4444", border: "1px solid rgba(255,255,255,0.5)" }} />Home (Hyderabad)
            </span>
          </div>
        </div>

        {/* Selection bar */}
        {selected && (
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 22px", borderTop: "1px solid var(--border)" }}>
            <span style={{ width: 38, height: 38, borderRadius: "50%", background: selected.isHome ? "#ef4444" : countryColors[selected.country], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15.5, fontWeight: 600, margin: 0 }}>{selected.name}</p>
              <p className="mono" style={{ fontSize: 11.5, color: "var(--mute)", margin: "2px 0 0" }}>
                {selected.isHome ? `${selected.region}, India — born, raised & based here 🏠` : `${selected.region}, ${selected.country}`}
              </p>
            </div>
            <button onClick={() => setSelected(null)} aria-label="Close" style={{ cursor: "pointer", border: "1px solid var(--border)", background: "transparent", color: "var(--mute)", width: 30, height: 30, borderRadius: 8, fontSize: 14 }}>×</button>
          </div>
        )}
      </div>
    </div>
  );
}
