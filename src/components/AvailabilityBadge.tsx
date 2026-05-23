import { Check, AlertTriangle, X } from "lucide-react";
import type { Cafe } from "@/lib/cafes";
import { getAvailabilityStatus } from "@/lib/cafes";

interface AvailabilityBadgeProps {
  cafe: Cafe;
  size?: "sm" | "md" | "lg";
}

export function AvailabilityBadge({ cafe, size = "md" }: AvailabilityBadgeProps) {
  const status = getAvailabilityStatus(cafe);

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
    lg: "px-4 py-1.5 text-base gap-2",
  };

  const config = {
    green: {
      bg: "bg-seat-green/15",
      text: "text-seat-green",
      icon: Check,
      label: `${cafe.seatsAvailable} seat${cafe.seatsAvailable === 1 ? "" : "s"}`,
    },
    amber: {
      bg: "bg-seat-amber/15",
      text: "text-seat-amber",
      icon: AlertTriangle,
      label: `${cafe.seatsAvailable} seat${cafe.seatsAvailable === 1 ? "" : "s"}`,
    },
    red: {
      bg: "bg-seat-red/15",
      text: "text-seat-red",
      icon: X,
      label: "Full",
    },
  };

  const { bg, text, icon: Icon, label } = config[status];

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${bg} ${text} ${sizeClasses[size]}`}
    >
      <Icon className="shrink-1" size={size === "lg" ? 18 : size === "md" ? 14 : 12} />
      {label}
    </span>
  );
}
