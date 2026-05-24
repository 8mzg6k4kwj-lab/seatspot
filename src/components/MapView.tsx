import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Star, Users, MapPin, Wifi, Plug } from "lucide-react";
import type { Cafe } from "@/lib/cafes";

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

  const { MapContainer, TileLayer, CircleMarker, Popup } = Mod.rl;

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
              mouseover: (e: any) => {
                setHovered(cafe);
                e.target.openPopup();
              },
            }}
          >
            <Popup autoPan closeButton={false} offset={[0, -8]} maxWidth={240}>
              <Link
                to="/cafe/$cafeId"
                params={{ cafeId: cafe.id }}
                className="block w-52 text-foreground no-underline"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm truncate !m-0">{cafe.name}</h3>
                    <p className="text-xs text-muted-foreground truncate !m-0 !mt-0.5">{cafe.address}</p>
                  </div>
                  <span className="flex items-center gap-0.5 rounded-full bg-black/80 px-1.5 py-0.5 text-[10px] text-white shrink-0">
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    {cafe.rating}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users size={12} />{cafe.seatsAvailable}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} />{cafe.distance}mi</span>
                  {cafe.wifi && <span className="flex items-center gap-1"><Wifi size={12} />WiFi</span>}
                  {cafe.outlets && <span className="flex items-center gap-1"><Plug size={12} />Outlets</span>}
                </div>
              </Link>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
