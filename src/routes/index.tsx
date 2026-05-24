import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { cafes } from "@/lib/cafes";
import { CafeCard } from "@/components/CafeCard";
import { FilterBar } from "@/components/FilterBar";
import { MapView } from "@/components/MapView";
import { getAvailabilityStatus } from "@/lib/cafes";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "open" | "nearby" | "outlets">("all");
  const [view, setView] = useState<"list" | "map">("list");

  const filteredCafes = useMemo(() => {
    let result = [...cafes];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.neighborhood.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q)
      );
    }

    if (activeFilter === "open") {
      result = result.filter((c) => c.seatsAvailable > 0);
    }

    if (activeFilter === "outlets") {
      result = result.filter((c) => c.outlets);
    }

    if (activeFilter === "nearby") {
      result = result.filter((c) => c.distance <= 1.0);
    }

    // Sort: available first, then by distance
    result.sort((a, b) => {
      const aStatus = getAvailabilityStatus(a);
      const bStatus = getAvailabilityStatus(b);
      if (aStatus !== bStatus) {
        if (aStatus === "green" && bStatus !== "green") return -1;
        if (bStatus === "green" && aStatus !== "green") return 1;
        if (aStatus === "amber" && bStatus === "red") return -1;
        if (bStatus === "amber" && aStatus === "red") return 1;
      }
      return a.distance - b.distance;
    });

    return result;
  }, [searchQuery, activeFilter]);

  const openCount = cafes.filter((c) => c.seatsAvailable > 0).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3 bg-[#25160e] text-[#f2e3d4]">
          <div className="flex items-center justify-between mb-3 gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#f2e3d4]">SeatSpot</h1>
              <p className="text-sm text-[#f2e3d4]/80 mt-0.5 italic">find a cafe. find a seat.</p>
            </div>
          </div>

          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            view={view}
            onViewChange={setView}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 bg-[#462b1b]">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{filteredCafes.length} cafe{filteredCafes.length !== 1 ? "s" : ""}</span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-seat-green" />
            
          </span>
        </div>
      </div>

      {/* Cafe List or Map */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {view === "map" ? (
          <MapView cafes={filteredCafes} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCafes.map((cafe) => (
              <CafeCard key={cafe.id} cafe={cafe} />
            ))}
          </div>
        )}

        {filteredCafes.length === 0 && view === "list" && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">☕</div>
            <p className="text-muted-foreground">No cafes found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
