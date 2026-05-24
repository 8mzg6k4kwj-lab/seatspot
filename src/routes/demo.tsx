import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/demo")({
  component: DemoPage,
  head: () => ({
    meta: [
      { title: "SeatSpot — Demo Video" },
      { name: "description", content: "Watch a short walkthrough of SeatSpot finding real-time cafe seating in NYC." },
    ],
  }),
});

function DemoPage() {
  return (
    <div className="min-h-screen bg-[#25160e] text-[#f2e3d4]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[#f2e3d4]/80 hover:text-[#f2e3d4] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to SeatSpot
        </Link>

        <div className="mt-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">SeatSpot Demo</h1>
          <p className="mt-2 text-[#f2e3d4]/70 italic">A quick look at finding a seat in real time.</p>
        </div>

        <div className="mt-8 rounded-2xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10">
          <video
            src="/seatspot-demo.mp4"
            controls
            autoPlay
            playsInline
            className="w-full h-auto"
          />
        </div>

        <p className="mt-4 text-center text-xs text-[#f2e3d4]/60">
          Share this page: <span className="font-mono">/demo</span>
        </p>
      </div>
    </div>
  );
}
