import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plane, X, Globe } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

interface Place {
  name: string;
  region: string;
  country: string;
  isHome?: boolean;
  coordinates: [number, number]; // [lng, lat]
}

// Country color mapping
const countryColors: Record<string, { bg: string; text: string; hex: string }> = {
  India: { bg: "bg-orange-500", text: "text-orange-500", hex: "#f97316" },
  "Sri Lanka": { bg: "bg-emerald-500", text: "text-emerald-500", hex: "#10b981" },
  UAE: { bg: "bg-blue-500", text: "text-blue-500", hex: "#3b82f6" },
  Oman: { bg: "bg-purple-500", text: "text-purple-500", hex: "#a855f7" },
  "South Africa": { bg: "bg-yellow-500", text: "text-yellow-500", hex: "#eab308" },
};

const places: Place[] = [
  // India - North
  { name: "Delhi", region: "Delhi", country: "India", coordinates: [77.209, 28.6139] },
  { name: "Agra", region: "Uttar Pradesh", country: "India", coordinates: [78.0081, 27.1767] },
  { name: "Amritsar", region: "Punjab", country: "India", coordinates: [74.8723, 31.634] },
  { name: "Shimla", region: "Himachal Pradesh", country: "India", coordinates: [77.1734, 31.1048] },
  { name: "Spiti Valley", region: "Himachal Pradesh", country: "India", coordinates: [78.0349, 32.2464] },
  { name: "Chandigarh", region: "Punjab/Haryana", country: "India", coordinates: [76.7794, 30.7333] },
  { name: "Lucknow", region: "Uttar Pradesh", country: "India", coordinates: [80.9462, 26.8467] },
  { name: "Prayagraj", region: "Uttar Pradesh", country: "India", coordinates: [81.8463, 25.4358] },
  
  // India - Rajasthan
  { name: "Jaipur", region: "Rajasthan", country: "India", coordinates: [75.7873, 26.9124] },
  { name: "Udaipur", region: "Rajasthan", country: "India", coordinates: [73.7125, 24.5854] },
  { name: "Jaisalmer", region: "Rajasthan", country: "India", coordinates: [70.9083, 26.9157] },
  { name: "Jodhpur", region: "Rajasthan", country: "India", coordinates: [73.0243, 26.2389] },
  
  // India - Gujarat
  { name: "Bhuj", region: "Gujarat", country: "India", coordinates: [69.6669, 23.2419] },
  { name: "Dwarka", region: "Gujarat", country: "India", coordinates: [68.9685, 22.2442] },
  { name: "Rann of Kutch", region: "Gujarat", country: "India", coordinates: [69.8597, 23.7337] },
  { name: "Surat", region: "Gujarat", country: "India", coordinates: [72.8311, 21.1702] },
  
  // India - Maharashtra
  { name: "Pune", region: "Maharashtra", country: "India", coordinates: [73.8567, 18.5204] },
  { name: "Mumbai", region: "Maharashtra", country: "India", coordinates: [72.8777, 19.076] },
  { name: "Navi Mumbai", region: "Maharashtra", country: "India", coordinates: [73.0297, 19.033] },
  
  // India - Karnataka
  { name: "Dandeli", region: "Karnataka", country: "India", coordinates: [74.6174, 15.2497] },
  { name: "Mysore", region: "Karnataka", country: "India", coordinates: [76.6394, 12.2958] },
  { name: "Bangalore", region: "Karnataka", country: "India", coordinates: [77.5946, 12.9716] },
  { name: "Coorg", region: "Karnataka", country: "India", coordinates: [75.8069, 12.3375] },
  
  // India - Goa
  { name: "Goa", region: "Goa", country: "India", coordinates: [74.124, 15.2993] },
  
  // India - Kerala
  { name: "Alleppey", region: "Kerala", country: "India", coordinates: [76.3388, 9.4981] },
  { name: "Wayanad", region: "Kerala", country: "India", coordinates: [76.132, 11.6854] },
  { name: "Munnar", region: "Kerala", country: "India", coordinates: [77.0595, 10.0889] },
  
  // India - Andhra Pradesh & Telangana
  { name: "Tirupati", region: "Andhra Pradesh", country: "India", coordinates: [79.4192, 13.6288] },
  { name: "Arunachalam", region: "Tamil Nadu", country: "India", coordinates: [79.0677, 12.2253] },
  { name: "Vijayawada", region: "Andhra Pradesh", country: "India", coordinates: [80.648, 16.5062] },
  { name: "Guntur", region: "Andhra Pradesh", country: "India", coordinates: [80.4365, 16.3067] },
  { name: "Hyderabad", region: "Telangana", country: "India", coordinates: [78.4867, 17.385], isHome: true },
  
  // India - East
  { name: "Bhubaneshwar", region: "Odisha", country: "India", coordinates: [85.8245, 20.2961] },
  { name: "Puri", region: "Odisha", country: "India", coordinates: [85.8312, 19.8135] },
  { name: "Kolkata", region: "West Bengal", country: "India", coordinates: [88.3639, 22.5726] },

  // Sri Lanka
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

  // UAE
  { name: "Dubai", region: "Dubai", country: "UAE", coordinates: [55.2708, 25.2048] },
  { name: "Abu Dhabi", region: "Abu Dhabi", country: "UAE", coordinates: [54.3773, 24.4539] },

  // Oman
  { name: "Muscat", region: "Muscat Governorate", country: "Oman", coordinates: [58.3829, 23.588] },
  { name: "Bimmah Sinkhole", region: "Muscat Governorate", country: "Oman", coordinates: [59.0781, 23.0392] },
  { name: "Wadi Shab", region: "Ash Sharqiyah", country: "Oman", coordinates: [59.2372, 22.8411] },
  { name: "Nizwa", region: "Ad Dakhiliyah", country: "Oman", coordinates: [57.5333, 22.9333] },
  { name: "Daymaniyat Islands", region: "Muscat Governorate", country: "Oman", coordinates: [58.0833, 23.85] },

  // South Africa
  { name: "Johannesburg", region: "Gauteng", country: "South Africa", coordinates: [28.0473, -26.2041] },
  { name: "Port Elizabeth", region: "Eastern Cape", country: "South Africa", coordinates: [25.5701, -33.918] },
  { name: "Kruger National Park", region: "Mpumalanga", country: "South Africa", coordinates: [31.5547, -23.9884] },
  { name: "Storms River", region: "Eastern Cape", country: "South Africa", coordinates: [23.9, -33.9667] },
  { name: "Knysna", region: "Western Cape", country: "South Africa", coordinates: [23.0471, -34.0363] },
  { name: "Gansbaai", region: "Western Cape", country: "South Africa", coordinates: [19.3508, -34.5803] },
  { name: "Hermanus", region: "Western Cape", country: "South Africa", coordinates: [19.2345, -34.4187] },
  { name: "Cape Town", region: "Western Cape", country: "South Africa", coordinates: [18.4241, -33.9249] },
];

const countries = [...new Set(places.map(p => p.country))];

// TopoJSON URL for world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Get center and zoom for each view
const getMapConfig = (selectedCountry: string | null) => {
  switch (selectedCountry) {
    case "India":
      return { center: [78, 22] as [number, number], zoom: 4 };
    case "Sri Lanka":
      return { center: [80.5, 7.5] as [number, number], zoom: 12 };
    case "UAE":
      return { center: [55, 24] as [number, number], zoom: 10 };
    case "Oman":
      return { center: [58, 23] as [number, number], zoom: 8 };
    case "South Africa":
      return { center: [25, -30] as [number, number], zoom: 3.5 };
    default:
      return { center: [50, 10] as [number, number], zoom: 1.5 };
  }
};

const MapChart = memo(({ selectedCountry, onPlaceClick, hoveredPlace, setHoveredPlace }: {
  selectedCountry: string | null;
  onPlaceClick: (place: Place) => void;
  hoveredPlace: Place | null;
  setHoveredPlace: (place: Place | null) => void;
}) => {
  const config = getMapConfig(selectedCountry);
  const filteredPlaces = selectedCountry 
    ? places.filter(p => p.country === selectedCountry)
    : places;

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 150,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <ZoomableGroup center={config.center} zoom={config.zoom}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "hsl(var(--muted-foreground) / 0.3)" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        
        {filteredPlaces.map((place) => {
          const colors = countryColors[place.country];
          const isHovered = hoveredPlace?.name === place.name;
          
          return (
            <Marker
              key={`${place.country}-${place.name}`}
              coordinates={place.coordinates}
              onClick={() => onPlaceClick(place)}
              onMouseEnter={() => setHoveredPlace(place)}
              onMouseLeave={() => setHoveredPlace(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Outer glow for home */}
              {place.isHome && (
                <circle
                  r={8}
                  fill="rgba(239, 68, 68, 0.3)"
                  className="animate-ping"
                />
              )}
              
              {/* Main marker */}
              <circle
                r={place.isHome ? 6 : 4}
                fill={place.isHome ? "#ef4444" : colors.hex}
                stroke="#fff"
                strokeWidth={1.5}
                style={{
                  transform: isHovered ? "scale(1.5)" : "scale(1)",
                  transition: "transform 0.2s ease",
                }}
              />
              
              {/* Home icon */}
              {place.isHome && (
                <text
                  textAnchor="middle"
                  y={1}
                  style={{ fontSize: 6, fill: "#fff" }}
                >
                  🏠
                </text>
              )}
              
              {/* Tooltip */}
              {isHovered && (
                <g>
                  <rect
                    x={-50}
                    y={-35}
                    width={100}
                    height={25}
                    rx={4}
                    fill="hsl(var(--background))"
                    stroke="hsl(var(--border))"
                    strokeWidth={0.5}
                  />
                  <text
                    textAnchor="middle"
                    y={-20}
                    style={{
                      fontSize: 8,
                      fontWeight: 600,
                      fill: "hsl(var(--foreground))",
                    }}
                  >
                    {place.name}
                  </text>
                  <text
                    textAnchor="middle"
                    y={-12}
                    style={{
                      fontSize: 6,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                  >
                    {place.country}
                  </text>
                </g>
              )}
            </Marker>
          );
        })}
      </ZoomableGroup>
    </ComposableMap>
  );
});

MapChart.displayName = "MapChart";

export const TravelMap = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [hoveredPlace, setHoveredPlace] = useState<Place | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const filteredPlaces = selectedCountry 
    ? places.filter(p => p.country === selectedCountry)
    : places;

  const getCountryCount = (country: string) => places.filter(p => p.country === country).length;

  return (
    <div className="relative">
      {/* Country Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setSelectedCountry(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !selectedCountry 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary hover:bg-secondary/80"
          }`}
        >
          <Globe className="inline h-4 w-4 mr-1" />
          All ({places.length})
        </button>
        {countries.map(country => {
          const colors = countryColors[country];
          return (
            <button
              key={country}
              onClick={() => setSelectedCountry(country === selectedCountry ? null : country)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                selectedCountry === country
                  ? `${colors.bg} text-white`
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${colors.bg}`} />
              {country} ({getCountryCount(country)})
            </button>
          );
        })}
      </div>

      {/* Map Container */}
      <div className="relative rounded-3xl overflow-hidden border border-border shadow-lg bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 text-xs bg-background/90 backdrop-blur-sm px-3 py-2 rounded-full shadow">
          <Plane className="h-4 w-4" />
          <span>{filteredPlaces.length} places explored</span>
        </div>

        {/* Map */}
        <div className="aspect-[16/9] min-h-[400px]">
          <MapChart
            selectedCountry={selectedCountry}
            onPlaceClick={setSelectedPlace}
            hoveredPlace={hoveredPlace}
            setHoveredPlace={setHoveredPlace}
          />
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-20 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {countries.map(country => (
              <div key={country} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full border border-white/50" 
                  style={{ backgroundColor: countryColors[country].hex }}
                />
                <span>{country}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 col-span-2 pt-1 border-t border-border mt-1">
              <div className="w-3 h-3 bg-red-500 rounded-full border border-white/50" />
              <span>Home (Hyderabad)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Place Detail Modal */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPlace(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background border border-border rounded-2xl p-6 max-w-sm w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                      selectedPlace.isHome ? 'bg-red-500' : countryColors[selectedPlace.country].bg
                    }`}
                  >
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedPlace.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedPlace.region}, {selectedPlace.country}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {selectedPlace.isHome ? (
                <p className="text-muted-foreground text-sm">
                  This is where I was born and currently live. The city of pearls and biryani! 🍚
                </p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  One of the many beautiful places I've had the pleasure of exploring in {selectedPlace.country}. 
                  Blog post coming soon! ✨
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
