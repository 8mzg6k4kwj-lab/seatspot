import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Clock, Wifi, Plug, Volume2, Star, Share2, Navigation, PencilLine } from "lucide-react";
import { timeAgo } from "@/lib/cafes";
import { useCafeStore } from "@/lib/cafeStore";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { UpdateSeatsSheet } from "@/components/UpdateSeatsSheet";

export const Route = createFileRoute("/cafe/$cafeId")({
  component: CafeDetailPage,
});

function CafeDetailPage() {
  const { cafeId } = Route.useParams();
  const { getCafe } = useCafeStore();
  const cafe = getCafe(cafeId);
  const [open, setOpen] = useState(false);

  if (!cafe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Cafe not found</p>
          <Link to="/" className="text-primary mt-2 inline-block">
            Go back
          </Link>
        </div>
      </div>
    );
  }

  const noiseLabel = { quiet: "Quiet", moderate: "Moderate", lively: "Lively" } as const;
  const priceLabels = ["$", "$$", "$$$"];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 md:h-96">
        <img src={cafe.imageUrl} alt={cafe.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="absolute top-0 left-0 right-0 p-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-4xl mx-auto">
          <Link
            to="/"
            className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-foreground shadow-sm hover:bg-white transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex gap-2">
            <button className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-foreground shadow-sm hover:bg-white transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative pb-28">
        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-foreground">{cafe.name}</h1>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin size={14} />
                <span>{cafe.address} · {cafe.neighborhood}</span>
              </div>
            </div>
            <div className="flex items-center gap-0.5 shrink-0 bg-amber-50 px-2 py-1 rounded-lg">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold">{cafe.rating}</span>
            </div>
          </div>

          {/* Availability + Update CTA */}
          <div className="mt-4 p-4 rounded-xl bg-latte border border-border">
            <p className="text-sm text-muted-foreground">Seat availability</p>
            <div className="mt-1.5 flex items-center justify-between gap-3 flex-wrap">
              <AvailabilityBadge cafe={cafe} size="lg" />
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold px-3.5 py-2 hover:bg-primary/90 transition-colors active:scale-[0.98]"
              >
                <PencilLine size={14} />
                Update seats
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Availability updated {cafe.lastUpdated}
            </p>
          </div>

          {/* Quick info grid */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-latte">
              <Clock size={18} className="text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Hours</p>
                <p className="text-sm font-medium">{cafe.hours}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-latte">
              <MapPin size={18} className="text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Distance</p>
                <p className="text-sm font-medium">{cafe.distance} mi away</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-latte">
              <Volume2 size={18} className="text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Noise</p>
                <p className="text-sm font-medium">{noiseLabel[cafe.noiseLevel]}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-latte">
              <span className="text-sm font-medium text-primary shrink-0">{priceLabels[cafe.priceLevel - 1]}</span>
              <div>
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="text-sm font-medium">{cafe.priceLevel === 1 ? "Budget" : cafe.priceLevel === 2 ? "Moderate" : "Premium"}</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-4">
            <p className="text-sm font-semibold text-foreground mb-2">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {cafe.wifi && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-latte text-sm text-foreground">
                  <Wifi size={14} /> WiFi
                </span>
              )}
              {cafe.outlets && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-latte text-sm text-foreground">
                  <Plug size={14} /> Outlets
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-latte text-sm text-foreground">
                <Volume2 size={14} /> {noiseLabel[cafe.noiseLevel]}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-card border border-border text-foreground font-semibold py-3.5 hover:bg-latte transition-colors active:scale-[0.98]"
          >
            <ArrowLeft size={18} />
            Back to results
          </Link>
          <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold py-3.5 hover:bg-primary/90 transition-colors active:scale-[0.98]">
            <Navigation size={18} />
            Get Directions
          </button>
        </div>
      </div>

      <UpdateSeatsSheet cafe={cafe} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
