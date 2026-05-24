import { Search, List, Map } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeFilter: "all" | "open" | "nearby" | "outlets";
  onFilterChange: (f: "all" | "open" | "nearby" | "outlets") => void;
  view: "list" | "map";
  onViewChange: (v: "list" | "map") => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  view,
  onViewChange,
}: FilterBarProps) {
  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search cafes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-[#25160e]/10 pl-10 pr-4 py-3 text-sm placeholder:text-[#25160e]/50 focus:outline-none focus:ring-2 focus:ring-ring text-[#25160e] bg-[#f2e3d4]"
        />
      </div>

      {/* Filters + View toggle */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2 flex-wrap">
          {(["all", "open", "nearby", "outlets"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                activeFilter === filter
                  ? "bg-[#a07a5c] text-[#f2e3d4]"
                  : "border border-[#f2e3d4]/20 bg-[#f2e3d4] text-[#25160e]"
              }`}
            >
              {filter === "open" ? "Has Seats" : filter === "outlets" ? "Outlets" : filter === "nearby" ? "WiFi" : filter}
            </button>
          ))}
        </div>

        <div className="flex rounded-full border border-[#f2e3d4]/20 bg-[#f2e3d4] overflow-hidden shrink-0">
          <button
            onClick={() => onViewChange("list")}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors ${
              view === "list" ? "bg-[#a07a5c] text-[#f2e3d4]" : "text-[#25160e]"
            }`}
          >
            <List size={14} /> List
          </button>
          <button
            onClick={() => onViewChange("map")}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors ${
              view === "map" ? "bg-[#a07a5c] text-[#f2e3d4]" : "text-[#25160e]"
            }`}
          >
            <Map size={14} /> Map
          </button>
        </div>
      </div>
    </div>
  );
}
