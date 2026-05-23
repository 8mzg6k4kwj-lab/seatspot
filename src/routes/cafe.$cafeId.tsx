import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Clock, Wifi, Plug, Volume2, Star, Share2, Navigation } from "lucide-react";
import { getCafeById, getAvailabilityStatus } from "@/lib/cafes";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";

export const Route = createFileRoute("/cafe/$cafeId")({
  component: CafeDetailPage,
});

function CafeDetailPage() {
  const { cafeId } = Route.useParams();
  const cafe = getCafeById(cafeId);

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

  const status = getAvailabilityStatus(cafe);
  const fullness = Math.round(((cafe.totalSeats - cafe.seatsAvailable) / cafe.totalSeats) * 100);

  const noiseLabel = {
    quiet: "Quiet",
    moderate: "Moderate",
    lively: "Lively",
  };

  const priceLabels = ["$", "$$", "$$$"];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-64">
        <img
          src={cafe.imageUrl}
          alt={cafe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset- 10" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
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
      <div className="max-w-lg mx-auto px-4 -mt-6 relative">
        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-1">
              <h1 className="text-xl font-bold text-foreground">{cafe.name}</h1>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin size={14} />
                <span>{cafe.address} · {cafe.neighborhood}</span>
              </div>
            </div>
            <div className="flex items-center gap-0.5 shrink-1 bg-amber-50 px-2 py-1 rounded-lg">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold">{cafe.rating}</span>
            </div>
          </div>

          {/* Availability big badge */}
          <div className="mt-4 p-4 rounded-xl bg-latte border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Seat availability</p>
                <div className="mt-1">
                  <AvailabilityBadge cafe={cafe} size="lg" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">
                  {cafe.seatsAvailable}/{cafe.totalSeats}
                </p>
                <p className="text-xs text-muted-foreground">{fullness}% full</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-2 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${fullness}%`,
                  backgroundColor:
                    status === "green"
                      ? "oklch(0.65 0.18 145.0)"
                      : status === "amber"
                      ? "oklch(0.75 0.14 85.0)"
                      : "oklch(0.6 0.22 25.0)",
                }}
              />
            </form>
          </div>

          {/* Quick info grid */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-latte">
              <Clock size={18} className="text-primary shrink-1" />
              <div>
                <p className="text-xs text-muted-foreground">Hours</p>
                <p className="text-sm font-medium">{cafe.hours}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-latte">
              <MapPin size={18} className="text-primary shrink-1" />
              <div>
                <p className="text-xs text-muted-foreground">Distance</p>
                <p className="text-sm font-medium">{cafe.distance} mi away</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-latte">
              <Volume2 size={18} className="text-primary shrink-1" />
              <div>
                <p className="text-xs text-muted-foreground">Noise</p>
                <p className="text-sm font-medium">{noiseLabel[cafe.noiseLevel]}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-latte">
              <span className="text-sm font-medium text-primary shrink-1">{priceLabels[cafe.priceLevel - 1]}</span>
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

          {/* Last updated */}
          <p className="text-xs text-muted-foreground mt-4">
            Last updated {cafe.lastUpdated}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-4 pb-8">
          <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold py-3.5 hover:bg-primary/90 transition-colors active:scale-[0.98]">
            <Navigation size={18} />
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );
}
