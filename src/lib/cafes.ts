export type SeatStatus = "none" | "few" | "plenty";

export interface Cafe {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  distance: number; // miles
  seatsAvailable: number; // legacy / approximate count, kept for detail view
  totalSeats: number;
  wifi: boolean;
  outlets: boolean;
  noiseLevel: "quiet" | "moderate" | "lively";
  hours: string;
  rating: number;
  priceLevel: 1 | 2 | 3;
  imageUrl: string;
  lastUpdated: string;
  lastUpdatedAt: number; // epoch ms
  seatStatus: SeatStatus;
  lat: number;
  lng: number;
}

export const SEAT_STATUS_LABEL: Record<SeatStatus, string> = {
  none: "No seats",
  few: "A few seats",
  plenty: "Plenty of seats",
};

export const SEAT_STATUS_FULL_LABEL: Record<SeatStatus, string> = {
  none: "No seats available",
  few: "A few seats available",
  plenty: "Plenty of seats available",
};

export function seatStatusFromCount(seats: number, total: number): SeatStatus {
  if (seats <= 0) return "none";
  if (seats / total < 0.35) return "few";
  return "plenty";
}

export function timeAgo(ts: number): string {
  const diff = Math.max(0, Date.now() - ts);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins === 1) return "1 min ago";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs === 1) return "1 hr ago";
  if (hrs < 24) return `${hrs} hrs ago`;
  const days = Math.floor(hrs / 24);
  return days === 1 ? "1 day ago" : `${days} days ago`;
}

export const cafes: Cafe[] = [
  {
    id: "stumptown-ace",
    name: "Stumptown Coffee Roasters",
    address: "18 W 29th St",
    neighborhood: "Flatiron",
    distance: 0.2,
    seatsAvailable: 4,
    totalSeats: 24,
    wifi: true,
    outlets: true,
    noiseLevel: "moderate",
    hours: "7am - 7pm",
    rating: 4.7,
    priceLevel: 2,
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop",
    lastUpdated: "2 min ago",
    lat: 40.7459, lng: -73.9876,
  },
  {
    id: "bluebottle-bryant",
    name: "Blue Bottle Coffee",
    address: "54 W 40th St",
    neighborhood: "Midtown",
    distance: 0.5,
    seatsAvailable: 0,
    totalSeats: 18,
    wifi: true,
    outlets: false,
    noiseLevel: "lively",
    hours: "6:30am - 6pm",
    rating: 4.5,
    priceLevel: 2,
    imageUrl: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&auto=format&fit=crop",
    lastUpdated: "5 min ago",
    lat: 40.7531, lng: -73.9836,
  },
  {
    id: "joe-coffee-uni",
    name: "Joe Coffee",
    address: "9 E 13th St",
    neighborhood: "Union Square",
    distance: 0.8,
    seatsAvailable: 12,
    totalSeats: 32,
    wifi: true,
    outlets: true,
    noiseLevel: "moderate",
    hours: "7am - 8pm",
    rating: 4.6,
    priceLevel: 2,
    imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&auto=format&fit=crop",
    lastUpdated: "1 min ago",
    lat: 40.7340, lng: -73.9920,
  },
  {
    id: "black-cat-soho",
    name: "Black Cat",
    address: "172 Rivington St",
    neighborhood: "Lower East Side",
    distance: 1.1,
    seatsAvailable: 2,
    totalSeats: 16,
    wifi: true,
    outlets: true,
    noiseLevel: "quiet",
    hours: "8am - 10pm",
    rating: 4.4,
    priceLevel: 1,
    imageUrl: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&auto=format&fit=crop",
    lastUpdated: "8 min ago",
    lat: 40.7196, lng: -73.9870,
  },
  {
    id: "devocion-brooklyn",
    name: "Devoción",
    address: "69 Grand St",
    neighborhood: "Williamsburg",
    distance: 2.3,
    seatsAvailable: 15,
    totalSeats: 45,
    wifi: true,
    outlets: true,
    noiseLevel: "lively",
    hours: "7am - 6pm",
    rating: 4.8,
    priceLevel: 2,
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop",
    lastUpdated: "3 min ago",
    lat: 40.7150, lng: -73.9610,
  },
  {
    id: "la-colombe-tribeca",
    name: "La Colombe",
    address: "75 Vandam St",
    neighborhood: "Tribeca",
    distance: 1.4,
    seatsAvailable: 0,
    totalSeats: 22,
    wifi: true,
    outlets: false,
    noiseLevel: "moderate",
    hours: "7am - 7pm",
    rating: 4.3,
    priceLevel: 2,
    imageUrl: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&auto=format&fit=crop",
    lastUpdated: "12 min ago",
    lat: 40.7270, lng: -74.0065,
  },
  {
    id: "think-coffee-bway",
    name: "Think Coffee",
    address: "123 Mercer St",
    neighborhood: "Soho",
    distance: 0.9,
    seatsAvailable: 6,
    totalSeats: 28,
    wifi: true,
    outlets: true,
    noiseLevel: "moderate",
    hours: "6:30am - 9pm",
    rating: 4.2,
    priceLevel: 1,
    imageUrl: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&auto=format&fit=crop",
    lastUpdated: "4 min ago",
    lat: 40.7240, lng: -74.0010,
  },
  {
    id: "kaffe1668",
    name: "Kaffe 1668",
    address: "275 Greenwich St",
    neighborhood: "Tribeca",
    distance: 1.6,
    seatsAvailable: 1,
    totalSeats: 20,
    wifi: true,
    outlets: true,
    noiseLevel: "quiet",
    hours: "7am - 7pm",
    rating: 4.5,
    priceLevel: 2,
    imageUrl: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop",
    lastUpdated: "6 min ago",
    lat: 40.7180, lng: -74.0095,
  },
];

export function getCafeById(id: string): Cafe | undefined {
  return cafes.find((c) => c.id === id);
}

export function getAvailabilityStatus(cafe: Cafe): "green" | "amber" | "red" {
  const ratio = cafe.seatsAvailable / cafe.totalSeats;
  if (cafe.seatsAvailable ===  0.3) return "green";
  if (ratio > 0.1) return "amber";
  return "red";
}
