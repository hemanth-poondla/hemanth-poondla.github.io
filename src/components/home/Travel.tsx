import { Link } from "react-router-dom";
import { places, countries, countryColors } from "@/components/travelPlaces";
import { sora, wrap, card, gradAccent } from "./styles";

const slug = (c: string) => c.toLowerCase().replace(/\s+/g, "-");

// Drop `<country-slug>.jpg` (e.g. india.jpg, south-africa.jpg) into src/assets/travel to give a tile a photo.
const photoModules = import.meta.glob("../../assets/travel/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const photoFor = (country: string) =>
  Object.entries(photoModules).find(([path]) => path.endsWith(`/${slug(country)}.jpg`))?.[1];

// Portrait shots sit in wide tiles, so pick which band of the photo stays visible.
const focus: Record<string, string> = { India: "50% 48%", UAE: "50% 40%" };

// Photos shown uncropped (letterboxed over a blurred copy of themselves), with the caption below.
const showWhole = new Set(["South Africa"]);

const ranked = countries
  .map((c) => ({ country: c, count: places.filter((p) => p.country === c).length }))
  .sort((a, b) => b.count - a.count);
const max = ranked[0]?.count ?? 1;

// Countries with a photo lead the grid so the large tile is never a bare gradient.
const tiles = [...ranked].sort((a, b) => Number(!!photoFor(b.country)) - Number(!!photoFor(a.country)));

function Tile({ country, count, big, tall }: { country: string; count: number; big?: boolean; tall?: boolean }) {
  const photo = photoFor(country);
  const whole = !!photo && showWhole.has(country);
  const color = countryColors[country] ?? "var(--accent)";
  const fill: React.CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%" };
  const caption = (
    <>
      <span className="mono" style={{ display: "block", fontSize: 11.5, opacity: 0.85 }}>{count} {count === 1 ? "place" : "places"}</span>
      <span style={{ display: "block", fontFamily: sora, fontSize: big ? 38 : 22, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.05 }}>{country}</span>
    </>
  );
  return (
    <figure
      className={["home-tile", big && "home-tile-big", tall && "home-tile-tall", whole && "home-tile-whole"].filter(Boolean).join(" ")}
      style={{ position: "relative", margin: 0, overflow: "hidden", borderRadius: 16, border: "1px solid var(--border)", display: whole ? "flex" : undefined, flexDirection: "column", background: whole ? "#0b0b10" : `linear-gradient(150deg, color-mix(in srgb, ${color} 30%, var(--solid)), var(--solid) 75%)` }}
    >
      {whole ? (
        <>
          <div style={{ position: "relative", flex: 1, minHeight: 0, overflow: "hidden" }}>
            <img src={photo} alt="" aria-hidden loading="lazy" style={{ ...fill, objectFit: "cover", filter: "blur(22px) brightness(0.7)", transform: "scale(1.25)" }} />
            <img src={photo} alt={`${country}, from my travels`} loading="lazy" style={{ ...fill, objectFit: "contain" }} />
          </div>
          <figcaption style={{ padding: "12px 18px 14px", color: "#fff", background: "rgba(8,8,12,0.92)" }}>{caption}</figcaption>
        </>
      ) : (
        <>
          {photo && <img src={photo} alt={`${country}, from my travels`} loading="lazy" style={{ ...fill, objectFit: "cover", objectPosition: focus[country] ?? "center" }} />}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,12,0.72), transparent 60%)" }} />
          <figcaption style={{ position: "absolute", left: 18, bottom: 16, color: "#fff" }}>{caption}</figcaption>
        </>
      )}
    </figure>
  );
}

export function Travel() {
  return (
    <section id="travel" className="band" style={{ scrollMarginTop: 80 }}>
      <div style={{ ...wrap, padding: "88px 32px" }}>
        <div className="home-travel-head">
          <div>
            <p className="mono" style={{ display: "flex", alignItems: "center", gap: 10, margin: 0, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mute)" }}>
              <span style={{ width: 28, height: 1, background: "var(--accent)" }} />05 — Off duty
            </p>
            <h2 style={{ fontFamily: sora, fontSize: "clamp(44px, 7vw, 88px)", fontWeight: 700, lineHeight: 0.96, letterSpacing: "-0.05em", margin: "14px 0 0" }}>
              {places.length} places. <span style={gradAccent}>{countries.length} countries.</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--mute)", maxWidth: 520, margin: "22px 0 0" }}>
              The training data that isn’t on GitHub. Home base: Hyderabad — everything else is a story, journaled on mywayaround.
            </p>
            <Link to="/about" className="mono" style={{ display: "inline-block", marginTop: 18, fontSize: 13, color: "var(--accent)" }}>See the map →</Link>
          </div>

          <ul style={{ ...card, listStyle: "none", margin: 0, padding: 24, display: "grid", gap: 14, alignContent: "start" }}>
            {ranked.map((r) => (
              <li key={r.country} style={{ display: "grid", gridTemplateColumns: "110px 1fr 36px", alignItems: "center", gap: 14 }}>
                <span className="mono" style={{ fontSize: 12.5 }}>{r.country}</span>
                <span style={{ height: 6, borderRadius: 999, background: "var(--surface2)" }}>
                  <span style={{ display: "block", height: 6, width: `${(r.count / max) * 100}%`, borderRadius: 999, background: "linear-gradient(90deg, var(--accent), var(--accent2))" }} />
                </span>
                <span style={{ textAlign: "right", fontFamily: sora, fontSize: 18, fontWeight: 700 }}>{r.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="home-tiles" style={{ marginTop: 44 }}>
          {tiles.map((r, i) => <Tile key={r.country} country={r.country} count={r.count} big={i === 0} tall={i >= 3} />)}
        </div>
      </div>
    </section>
  );
}
