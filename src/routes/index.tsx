import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CafeCard } from "@/components/CafeCard";
import { FilterBar } from "@/components/FilterBar";
import { MapView } from "@/components/MapView";
import { getAvailabilityStatus } from "@/lib/cafes";
import { useCafeStore } from "@/lib/cafeStore";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { cafes } = useCafeStore();
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
      result = result.filter((c) => c.seatStatus !== "none");
    }

    if (activeFilter === "outlets") {
      result = result.filter((c) => c.outlets);
    }

    if (activeFilter === "nearby") {
      result = result.filter((c) => c.distance <= 1.0);
    }

    // Sort: plenty > few > none, then by distance
    const rank = { plenty: 0, few: 1, none: 2 } as const;
    result.sort((a, b) => {
      const d = rank[a.seatStatus] - rank[b.seatStatus];
      if (d !== 0) return d;
      return a.distance - b.distance;
    });

    return result;
  }, [cafes, searchQuery, activeFilter]);


  return (
    <div className="min-h-screen bg-[#462b1b] text-[#f2e3d4]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#25160e] border-b border-[#f2e3d4]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3 text-[#f2e3d4]">
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between text-sm text-[#f2e3d4]">
          <span>{filteredCafes.length} cafe{filteredCafes.length !== 1 ? "s" : ""}</span>
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
