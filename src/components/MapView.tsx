import { useEffect, useState } from "react";
import type { Cafe } from "@/lib/cafes";
import { CafeCard } from "./CafeCard";

interface MapViewProps {
  cafes: Cafe[];
}

export function MapView({ cafes }: MapViewProps) {
  const [mounted, setMounted] = useState(false);
  const [Mod, setMod] = useState<any>(null);
  const [hovered, setHovered] = useState<Cafe | null>(null);

  useEffect(() => {
    setMounted(true);
    Promise.all([import("react-leaflet"), import("leaflet")]).then(([rl, L]) => {
      // inject leaflet CSS once
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }
      setMod({ rl, L });
    });
  }, []);

  if (!mounted || !Mod) {
    return (
      <div className="h-[70vh] rounded-2xl bg-[#f2e3d4]/50 flex items-center justify-center text-muted-foreground">
        Loading map…
      </div>
    );
  }

  const { MapContainer, TileLayer, CircleMarker, Tooltip } = Mod.rl;

  const center: [number, number] = [40.7340, -73.9920];

  return (
    <div className="relative h-[70vh] rounded-2xl overflow-hidden border border-[#f2e3d4]/20">
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cafes.map((cafe) => (
          <CircleMarker
            key={cafe.id}
            center={[cafe.lat, cafe.lng]}
            radius={9}
            pathOptions={{
              color: "#ffffff",
              weight: 2,
              fillColor: "#e53935",
              fillOpacity: 1,
            }}
            eventHandlers={{
              mouseover: () => setHovered(cafe),
              mouseout: () => setHovered((h) => (h?.id === cafe.id ? null : h)),
            }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={1} permanent={false}>
              {cafe.name}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>

      {hovered && (
        <div
          className="absolute top-4 right-4 z-[1000] w-72 pointer-events-none"
          onMouseEnter={(e) => e.stopPropagation()}
        >
          <CafeCard cafe={hovered} />
        </div>
      )}
    </div>
  );
}
