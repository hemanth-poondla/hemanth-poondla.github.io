import { useState, memo } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";

interface Place {
  name: string;
  region: string;
  country: string;
  isHome?: boolean;
  coordinates: [number, number]; // [lng, lat]
}

const countryColors: Record<string, string> = {
  India: "#f97316",
  "Sri Lanka": "#10b981",
  UAE: "#3b82f6",
  Oman: "#a855f7",
  "South Africa": "#eab308",
};

const places: Place[] = [
  { name: "Delhi", region: "Delhi", country: "India", coordinates: [77.209, 28.6139] },
  { name: "Agra", region: "Uttar Pradesh", country: "India", coordinates: [78.0081, 27.1767] },
  { name: "Amritsar", region: "Punjab", country: "India", coordinates: [74.8723, 31.634] },
  { name: "Shimla", region: "Himachal Pradesh", country: "India", coordinates: [77.1734, 31.1048] },
  { name: "Spiti Valley", region: "Himachal Pradesh", country: "India", coordinates: [78.0349, 32.2464] },
  { name: "Chandigarh", region: "Punjab/Haryana", country: "India", coordinates: [76.7794, 30.7333] },
  { name: "Lucknow", region: "Uttar Pradesh", country: "India", coordinates: [80.9462, 26.8467] },
  { name: "Prayagraj", region: "Uttar Pradesh", country: "India", coordinates: [81.8463, 25.4358] },
  { name: "Jaipur", region: "Rajasthan", country: "India", coordinates: [75.7873, 26.9124] },
  { name: "Udaipur", region: "Rajasthan", country: "India", coordinates: [73.7125, 24.5854] },
  { name: "Jaisalmer", region: "Rajasthan", country: "India", coordinates: [70.9083, 26.9157] },
  { name: "Jodhpur", region: "Rajasthan", country: "India", coordinates: [73.0243, 26.2389] },
  { name: "Bhuj", region: "Gujarat", country: "India", coordinates: [69.6669, 23.2419] },
  { name: "Dwarka", region: "Gujarat", country: "India", coordinates: [68.9685, 22.2442] },
  { name: "Rann of Kutch", region: "Gujarat", country: "India", coordinates: [69.8597, 23.7337] },
  { name: "Surat", region: "Gujarat", country: "India", coordinates: [72.8311, 21.1702] },
  { name: "Pune", region: "Maharashtra", country: "India", coordinates: [73.8567, 18.5204] },
  { name: "Mumbai", region: "Maharashtra", country: "India", coordinates: [72.8777, 19.076] },
  { name: "Navi Mumbai", region: "Maharashtra", country: "India", coordinates: [73.0297, 19.033] },
  { name: "Dandeli", region: "Karnataka", country: "India", coordinates: [74.6174, 15.2497] },
  { name: "Mysore", region: "Karnataka", country: "India", coordinates: [76.6394, 12.2958] },
  { name: "Bangalore", region: "Karnataka", country: "India", coordinates: [77.5946, 12.9716] },
  { name: "Coorg", region: "Karnataka", country: "India", coordinates: [75.8069, 12.3375] },
  { name: "Goa", region: "Goa", country: "India", coordinates: [74.124, 15.2993] },
  { name: "Alleppey", region: "Kerala", country: "India", coordinates: [76.3388, 9.4981] },
  { name: "Wayanad", region: "Kerala", country: "India", coordinates: [76.132, 11.6854] },
  { name: "Munnar", region: "Kerala", country: "India", coordinates: [77.0595, 10.0889] },
  { name: "Tirupati", region: "Andhra Pradesh", country: "India", coordinates: [79.4192, 13.6288] },
  { name: "Arunachalam", region: "Tamil Nadu", country: "India", coordinates: [79.0677, 12.2253] },
  { name: "Vijayawada", region: "Andhra Pradesh", country: "India", coordinates: [80.648, 16.5062] },
  { name: "Guntur", region: "Andhra Pradesh", country: "India", coordinates: [80.4365, 16.3067] },
  { name: "Hyderabad", region: "Telangana", country: "India", coordinates: [78.4867, 17.385], isHome: true },
  { name: "Bhubaneshwar", region: "Odisha", country: "India", coordinates: [85.8245, 20.2961] },
  { name: "Puri", region: "Odisha", country: "India", coordinates: [85.8312, 19.8135] },
  { name: "Kolkata", region: "West Bengal", country: "India", coordinates: [88.3639, 22.5726] },
  { name: "Colombo", region: "Western Province", country: "Sri Lanka", coordinates: [79.8612, 6.9271] },
  { name: "Negombo", region: "Western Province", country: "Sri Lanka", coordinates: [79.8358, 7.2083] },
  { name: "Trincomalee", region: "Eastern Province", country: "Sri Lanka", coordinates: [81.2152, 8.5874] },
  { name: "Unawatuna", region: "Southern Province", country: "Sri Lanka", coordinates: [80.249, 6.0169] },
  { name: "Yala National Park", region: "Southern Province", country: "Sri Lanka", coordinates: [81.5169, 6.3725] },
  { name: "Ella", region: "Uva Province", country: "Sri Lanka", coordinates: [81.0466, 6.8667] },
  { name: "Nuwara Eliya", region: "Central Province", country: "Sri Lanka", coordinates: [80.7891, 6.9497] },
  { name: "Galle", region: "Southern Province", country: "Sri Lanka", coordinates: [80.221, 6.0535] },
  { name: "Adam's Peak", region: "Sabaragamuwa", country: "Sri Lanka", coordinates: [80.4994, 6.8094] },
  { name: "Dambulla", region: "Central Province", country: "Sri Lanka", coordinates: [80.6518, 7.856] },
  { name: "Sigiriya", region: "Central Province", country: "Sri Lanka", coordinates: [80.7603, 7.957] },
  { name: "Dubai", region: "Dubai", country: "UAE", coordinates: [55.2708, 25.2048] },
  { name: "Abu Dhabi", region: "Abu Dhabi", country: "UAE", coordinates: [54.3773, 24.4539] },
  { name: "Muscat", region: "Muscat Governorate", country: "Oman", coordinates: [58.3829, 23.588] },
  { name: "Bimmah Sinkhole", region: "Muscat Governorate", country: "Oman", coordinates: [59.0781, 23.0392] },
  { name: "Wadi Shab", region: "Ash Sharqiyah", country: "Oman", coordinates: [59.2372, 22.8411] },
  { name: "Nizwa", region: "Ad Dakhiliyah", country: "Oman", coordinates: [57.5333, 22.9333] },
  { name: "Daymaniyat Islands", region: "Muscat Governorate", country: "Oman", coordinates: [58.0833, 23.85] },
  { name: "Johannesburg", region: "Gauteng", country: "South Africa", coordinates: [28.0473, -26.2041] },
  { name: "Port Elizabeth", region: "Eastern Cape", country: "South Africa", coordinates: [25.5701, -33.918] },
  { name: "Kruger National Park", region: "Mpumalanga", country: "South Africa", coordinates: [31.5547, -23.9884] },
  { name: "Storms River", region: "Eastern Cape", country: "South Africa", coordinates: [23.9, -33.9667] },
  { name: "Knysna", region: "Western Cape", country: "South Africa", coordinates: [23.0471, -34.0363] },
  { name: "Gansbaai", region: "Western Cape", country: "South Africa", coordinates: [19.3508, -34.5803] },
  { name: "Hermanus", region: "Western Cape", country: "South Africa", coordinates: [19.2345, -34.4187] },
  { name: "Cape Town", region: "Western Cape", country: "South Africa", coordinates: [18.4241, -33.9249] },
];

const countries = ["India", "Sri Lanka", "UAE", "Oman", "South Africa"];
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const getMapConfig = (selectedCountry: string | null): { center: [number, number]; zoom: number } => {
  switch (selectedCountry) {
    case "India": return { center: [80, 22], zoom: 3.4 };
    case "Sri Lanka": return { center: [80.7, 7.6], zoom: 11 };
    case "UAE": return { center: [54.8, 24.8], zoom: 9 };
    case "Oman": return { center: [58.3, 23.1], zoom: 7 };
    case "South Africa": return { center: [24, -30], zoom: 3.2 };
    default: return { center: [52, 8], zoom: 1.4 };
  }
};

const MapChart = memo(({ selectedCountry, onSelect }: { selectedCountry: string | null; onSelect: (p: Place) => void }) => {
  const config = getMapConfig(selectedCountry);
  const filtered = selectedCountry ? places.filter((p) => p.country === selectedCountry) : places;

  return (
    <ComposableMap projection="geoMercator" projectionConfig={{ scale: 150 }} style={{ width: "100%", height: "100%" }}>
      <ZoomableGroup center={config.center} zoom={config.zoom} minZoom={config.zoom} maxZoom={config.zoom}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="var(--surface2)"
                stroke="var(--border)"
                strokeWidth={0.4}
                style={{ default: { outline: "none" }, hover: { outline: "none", fill: "var(--surface2)" }, pressed: { outline: "none" } }}
              />
            ))
          }
        </Geographies>
        {filtered.map((place) => (
          <Marker
            key={`${place.country}-${place.name}`}
            coordinates={place.coordinates}
            onClick={() => onSelect(place)}
            style={{ default: { cursor: "pointer" }, hover: { cursor: "pointer" }, pressed: {} }}
          >
            <circle
              r={place.isHome ? 4.6 : 3.2}
              fill={place.isHome ? "#ef4444" : countryColors[place.country]}
              stroke="#fff"
              strokeWidth={1}
            >
              <title>{`${place.name} — ${place.region}, ${place.country}`}</title>
            </circle>
          </Marker>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
});
MapChart.displayName = "MapChart";

const chipBase: React.CSSProperties = {
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  fontSize: 12,
  padding: "8px 14px",
  borderRadius: 999,
};

export const TravelMap = () => {
  const [selected, setSelected] = useState<Place | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  const filtered = country ? places.filter((p) => p.country === country) : places;

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

      {/* Map card */}
      <div style={{ position: "relative", border: "1px solid var(--border)", borderRadius: 20, background: "var(--surface)", overflow: "hidden" }}>
        <div className="mono" style={{ position: "absolute", top: 14, right: 14, zIndex: 2, display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: "var(--dim)", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 999, padding: "6px 12px" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z" /></svg>
          {filtered.length} places explored
        </div>

        <div style={{ aspectRatio: "16 / 9", minHeight: 300 }}>
          <MapChart selectedCountry={country} onSelect={setSelected} />
        </div>

        <div style={{ position: "absolute", bottom: 14, left: 14, zIndex: 2, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "10px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
          {countries.map((c) => (
            <span key={c} className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10.5, color: "var(--mute)" }}>
              <span style={{ width: 9, height: 9, borderRadius: 999, background: countryColors[c], border: "1px solid rgba(255,255,255,0.5)" }} />{c}
            </span>
          ))}
          <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10.5, color: "var(--mute)" }}>
            <span style={{ width: 9, height: 9, borderRadius: 999, background: "#ef4444", border: "1px solid rgba(255,255,255,0.5)" }} />Home (Hyderabad)
          </span>
        </div>

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
            <button onClick={() => setSelected(null)} style={{ cursor: "pointer", border: "1px solid var(--border)", background: "transparent", color: "var(--mute)", width: 30, height: 30, borderRadius: 8, fontSize: 14 }}>×</button>
          </div>
        )}
      </div>
    </div>
  );
};
