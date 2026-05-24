import { useEffect } from "react";
import { X, Users } from "lucide-react";
import type { Cafe, SeatStatus } from "@/lib/cafes";
import { SEAT_STATUS_FULL_LABEL } from "@/lib/cafes";
import { useCafeStore } from "@/lib/cafeStore";

interface UpdateSeatsSheetProps {
  cafe: Cafe | null;
  open: boolean;
  onClose: () => void;
}

const OPTIONS: { value: SeatStatus; label: string; sub: string; emoji: string; ring: string }[] = [
  { value: "none", label: "No open seats", sub: "It's packed right now", emoji: "🚫", ring: "ring-seat-red/40" },
  { value: "few", label: "A few seats", sub: "1–3 spots open", emoji: "☕", ring: "ring-seat-amber/40" },
  { value: "plenty", label: "Plenty of seats", sub: "Lots of room", emoji: "✨", ring: "ring-seat-green/40" },
];

export function UpdateSeatsSheet({ cafe, open, onClose }: UpdateSeatsSheetProps) {
  const { updateSeats } = useCafeStore();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !cafe) return null;

  const handlePick = (status: SeatStatus) => {
    updateSeats(cafe.id, status);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md bg-[#f5ead8] text-[#25160e] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#25160e]/10 p-5 sm:p-6 animate-in slide-in-from-bottom"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#7a5a3e]">
              <Users size={14} /> HELP OTHERS
            </div>
            <h2 className="text-lg font-bold mt-1">How many seats are open right now?</h2>
            <p className="text-sm text-[#5c3f2a] mt-0.5 truncate">{cafe.name}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 p-1.5 rounded-full hover:bg-[#25160e]/5 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 space-y-2.5">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handlePick(opt.value)}
              className={`w-full flex items-center gap-3 rounded-2xl bg-white border border-[#25160e]/10 px-4 py-3.5 text-left hover:ring-2 ${opt.ring} hover:border-transparent transition-all active:scale-[0.99]`}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{opt.label}</p>
                <p className="text-xs text-[#7a5a3e]">{opt.sub}</p>
              </div>
            </button>
          ))}
        </div>

        <p className="text-[11px] text-[#7a5a3e] text-center mt-4">
          Your update helps the next person find a seat. Thanks ☕
        </p>
      </div>
    </div>
  );
}

export { SEAT_STATUS_FULL_LABEL };
