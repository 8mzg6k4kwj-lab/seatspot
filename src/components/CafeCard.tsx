import { useState } from "react";
import { MapPin, Wifi, Plug, Star, PencilLine } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Cafe } from "@/lib/cafes";
import { timeAgo } from "@/lib/cafes";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { UpdateSeatsSheet } from "./UpdateSeatsSheet";

interface CafeCardProps {
  cafe: Cafe;
}

export function CafeCard({ cafe }: CafeCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Link
        to="/cafe/$cafeId"
        params={{ cafeId: cafe.id }}
        className="group block rounded-2xl bg-card border border-border overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/20 active:scale-[0.99]"
      >
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={cafe.imageUrl}
            alt={cafe.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 right-3 flex items-center gap-0.5 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            {cafe.rating}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-foreground truncate">{cafe.name}</h3>
              <p className="text-sm text-muted-foreground mt-0.5 truncate">{cafe.address}</p>
            </div>
          </div>

          {/* Seat status */}
          <div className="mt-3">
            <AvailabilityBadge cafe={cafe} size="md" />
          </div>

          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {cafe.distance} mi
            </span>
            {cafe.wifi && (
              <span className="flex items-center gap-1">
                <Wifi size={14} />
                WiFi
              </span>
            )}
            {cafe.outlets && (
              <span className="flex items-center gap-1">
                <Plug size={14} />
                Outlets
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">Updated {timeAgo(cafe.lastUpdatedAt)}</p>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 hover:bg-primary/15 transition-colors"
            >
              <PencilLine size={12} />
              Update seats
            </button>
          </div>
        </div>
      </Link>

      <UpdateSeatsSheet cafe={cafe} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
