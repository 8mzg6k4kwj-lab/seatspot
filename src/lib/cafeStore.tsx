import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { cafes as seedCafes, type Cafe, type SeatStatus } from "./cafes";

interface CafeStoreContext {
  cafes: Cafe[];
  getCafe: (id: string) => Cafe | undefined;
  updateSeats: (id: string, status: SeatStatus) => void;
}

const Ctx = createContext<CafeStoreContext | null>(null);
const STORAGE_KEY = "seatspot:overrides:v1";

type Override = { seatStatus: SeatStatus; lastUpdatedAt: number };

function loadOverrides(): Record<string, Override> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function CafeStoreProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, Override>>({});

  useEffect(() => {
    setOverrides(loadOverrides());
  }, []);

  const cafes = useMemo(
    () =>
      seedCafes.map((c) => {
        const o = overrides[c.id];
        return o ? { ...c, seatStatus: o.seatStatus, lastUpdatedAt: o.lastUpdatedAt } : c;
      }),
    [overrides]
  );

  const updateSeats = useCallback((id: string, status: SeatStatus) => {
    setOverrides((prev) => {
      const next = { ...prev, [id]: { seatStatus: status, lastUpdatedAt: Date.now() } };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const getCafe = useCallback((id: string) => cafes.find((c) => c.id === id), [cafes]);

  const value = useMemo(() => ({ cafes, getCafe, updateSeats }), [cafes, getCafe, updateSeats]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCafeStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCafeStore must be used inside CafeStoreProvider");
  return ctx;
}
