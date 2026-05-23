import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeFilter: "all" | "open" | "nearby";
  onFilterChange: (f: "all" | "open" | "nearby") => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

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
          className="px-3.5 py-1.5 rounded-full text-sm font-medium capitalize transition-colors bg-primary text-primary-foreground bg-[#f2e3d4]"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
            showFilters ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(["all", "open", "nearby"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
              activeFilter === filter
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {filter === "open" ? "Has Seats" : filter}
          </button>
        ))}
      </div>
    </div>
  );
}
