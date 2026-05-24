import { useEffect, useState } from "react";

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"showing" | "fading" | "done">("showing");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fading"), 2200);
    const doneTimer = setTimeout(() => setPhase("done"), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") {
    return <>{children}</>;
  }

  const isFading = phase === "fading";

  return (
    <>
      {/* Splash overlay */}
      <div
        className={`
          fixed inset-0 z-50 flex flex-col items-center justify-center
          bg-[#462b1b] transition-all duration-800 ease-out
          ${isFading ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
        aria-hidden={isFading}
      >
        <h1
          className={`
            text-[#f2e3d4] text-5xl sm:text-6xl font-bold tracking-tight
            transition-transform duration-800 ease-out
            ${isFading ? "scale-[1.02] translate-y-[-4px]" : "scale-100 translate-y-0"}
          `}
        >
          SeatSpot
        </h1>
        <p
          className={`
            mt-3 text-[#f2e3d4]/70 text-base sm:text-lg font-light tracking-wide
            transition-all duration-800 ease-out delay-75
            ${isFading ? "opacity-100 translate-y-0" : "opacity-100 translate-y-1"}
          `}
        >
          Find a cafe. Find a seat.
        </p>
      </div>

      {/* Main app rendered underneath */}
      <div
        className={`
          transition-opacity duration-800 ease-out
          ${isFading ? "opacity-100" : "opacity-0"}
        `}
      >
        {children}
      </div>
    </>
  );
}
