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

type CafeSeed = Omit<Cafe, "lastUpdatedAt" | "seatStatus">;

const seed: CafeSeed[] = [
  { id: "stumptown-ace", name: "Stumptown Coffee Roasters", address: "18 W 29th St", neighborhood: "Flatiron", distance: 0.2, seatsAvailable: 4, totalSeats: 24, wifi: true, outlets: true, noiseLevel: "moderate", hours: "7am - 7pm", rating: 4.7, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop", lastUpdated: "2 min ago", lat: 40.7459, lng: -73.9876 },
  { id: "bluebottle-bryant", name: "Blue Bottle Coffee", address: "54 W 40th St", neighborhood: "Midtown", distance: 0.5, seatsAvailable: 0, totalSeats: 18, wifi: true, outlets: false, noiseLevel: "lively", hours: "6:30am - 6pm", rating: 4.5, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&auto=format&fit=crop", lastUpdated: "5 min ago", lat: 40.7531, lng: -73.9836 },
  { id: "joe-coffee-uni", name: "Joe Coffee", address: "9 E 13th St", neighborhood: "Union Square", distance: 0.8, seatsAvailable: 0, totalSeats: 32, wifi: true, outlets: true, noiseLevel: "moderate", hours: "7am - 8pm", rating: 4.6, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&auto=format&fit=crop", lastUpdated: "1 min ago", lat: 40.7340, lng: -73.9920 },
  { id: "black-cat-soho", name: "Black Cat", address: "172 Rivington St", neighborhood: "Lower East Side", distance: 1.1, seatsAvailable: 2, totalSeats: 16, wifi: true, outlets: true, noiseLevel: "quiet", hours: "8am - 10pm", rating: 4.4, priceLevel: 1, imageUrl: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&auto=format&fit=crop", lastUpdated: "8 min ago", lat: 40.7196, lng: -73.9870 },
  { id: "devocion-brooklyn", name: "Devoción", address: "69 Grand St", neighborhood: "Williamsburg", distance: 2.3, seatsAvailable: 0, totalSeats: 45, wifi: true, outlets: true, noiseLevel: "lively", hours: "7am - 6pm", rating: 4.8, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop", lastUpdated: "3 min ago", lat: 40.7150, lng: -73.9610 },
  { id: "la-colombe-tribeca", name: "La Colombe", address: "75 Vandam St", neighborhood: "Tribeca", distance: 1.4, seatsAvailable: 0, totalSeats: 22, wifi: true, outlets: false, noiseLevel: "moderate", hours: "7am - 7pm", rating: 4.3, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&auto=format&fit=crop", lastUpdated: "12 min ago", lat: 40.7270, lng: -74.0065 },
  { id: "think-coffee-bway", name: "Think Coffee", address: "123 Mercer St", neighborhood: "Soho", distance: 0.9, seatsAvailable: 0, totalSeats: 28, wifi: true, outlets: true, noiseLevel: "moderate", hours: "6:30am - 9pm", rating: 4.2, priceLevel: 1, imageUrl: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&auto=format&fit=crop", lastUpdated: "4 min ago", lat: 40.7240, lng: -74.0010 },
  { id: "kaffe1668", name: "Kaffe 1668", address: "275 Greenwich St", neighborhood: "Tribeca", distance: 1.6, seatsAvailable: 1, totalSeats: 20, wifi: true, outlets: true, noiseLevel: "quiet", hours: "7am - 7pm", rating: 4.5, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop", lastUpdated: "6 min ago", lat: 40.7180, lng: -74.0095 },
  { id: "birch-chelsea", name: "Birch Coffee", address: "134 1/2 E 62nd St", neighborhood: "Upper East Side", distance: 2.8, seatsAvailable: 0, totalSeats: 26, wifi: true, outlets: true, noiseLevel: "moderate", hours: "7am - 6pm", rating: 4.5, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop", lastUpdated: "3 min ago", lat: 40.7642, lng: -73.9675 },
  { id: "everyman-espresso", name: "Everyman Espresso", address: "136 E 13th St", neighborhood: "East Village", distance: 1.2, seatsAvailable: 0, totalSeats: 14, wifi: true, outlets: true, noiseLevel: "quiet", hours: "8am - 6pm", rating: 4.6, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop", lastUpdated: "7 min ago", lat: 40.7330, lng: -73.9880 },
  { id: "third-rail-east", name: "Third Rail Coffee", address: "159 Sullivan St", neighborhood: "Greenwich Village", distance: 1.0, seatsAvailable: 0, totalSeats: 18, wifi: true, outlets: true, noiseLevel: "moderate", hours: "7am - 7pm", rating: 4.4, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop", lastUpdated: "9 min ago", lat: 40.7285, lng: -74.0015 },
  { id: "sweatshop-wburg", name: "Sweatshop", address: "191 Grand St", neighborhood: "Williamsburg", distance: 2.6, seatsAvailable: 0, totalSeats: 30, wifi: true, outlets: true, noiseLevel: "lively", hours: "7:30am - 6pm", rating: 4.3, priceLevel: 1, imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b5dd7359?w=800&auto=format&fit=crop", lastUpdated: "11 min ago", lat: 40.7135, lng: -73.9580 },
  { id: "grumpy-chelsea", name: "Café Grumpy", address: "224 W 20th St", neighborhood: "Chelsea", distance: 1.3, seatsAvailable: 0, totalSeats: 24, wifi: true, outlets: true, noiseLevel: "moderate", hours: "7am - 7pm", rating: 4.5, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1504647149325-a1967a9e7328?w=800&auto=format&fit=crop", lastUpdated: "2 min ago", lat: 40.7420, lng: -73.9990 },
  { id: "sweetleaf-lic", name: "Sweetleaf", address: "4618 Center Blvd", neighborhood: "Long Island City", distance: 3.1, seatsAvailable: 0, totalSeats: 36, wifi: true, outlets: true, noiseLevel: "lively", hours: "7am - 8pm", rating: 4.4, priceLevel: 1, imageUrl: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&auto=format&fit=crop", lastUpdated: "15 min ago", lat: 40.7450, lng: -73.9530 },
  { id: "elixr-noho", name: "Elixr Coffee Roasters", address: "337 Canal St", neighborhood: "Nolita", distance: 0.7, seatsAvailable: 0, totalSeats: 16, wifi: true, outlets: false, noiseLevel: "moderate", hours: "8am - 5pm", rating: 4.6, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&auto=format&fit=crop", lastUpdated: "10 min ago", lat: 40.7215, lng: -73.9950 },
  { id: "drip-coffee", name: "Drip Coffee", address: "303 E 85th St", neighborhood: "Upper East Side", distance: 3.4, seatsAvailable: 0, totalSeats: 18, wifi: true, outlets: true, noiseLevel: "quiet", hours: "7am - 5pm", rating: 4.1, priceLevel: 1, imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop", lastUpdated: "14 min ago", lat: 40.7775, lng: -73.9535 },
  { id: "ninth-st-espresso", name: "Ninth Street Espresso", address: "700 E 9th St", neighborhood: "East Village", distance: 1.5, seatsAvailable: 0, totalSeats: 20, wifi: true, outlets: true, noiseLevel: "quiet", hours: "7am - 6pm", rating: 4.5, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop", lastUpdated: "6 min ago", lat: 40.7280, lng: -73.9790 },
  { id: "ground-support", name: "Ground Support", address: "399 Broadway", neighborhood: "Soho", distance: 1.1, seatsAvailable: 0, totalSeats: 22, wifi: true, outlets: true, noiseLevel: "moderate", hours: "7am - 7pm", rating: 4.3, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&auto=format&fit=crop", lastUpdated: "8 min ago", lat: 40.7200, lng: -74.0020 },
  { id: "pourt-wburg", name: "The Pourt", address: "210 Grand St", neighborhood: "Williamsburg", distance: 2.5, seatsAvailable: 0, totalSeats: 28, wifi: true, outlets: true, noiseLevel: "lively", hours: "8am - 8pm", rating: 4.2, priceLevel: 1, imageUrl: "https://images.unsplash.com/photo-1500353391678-d7b06670ee39?w=800&auto=format&fit=crop", lastUpdated: "5 min ago", lat: 40.7140, lng: -73.9550 },
  { id: "ludlow-coffee", name: "Ludlow Coffee Supply", address: "176 Ludlow St", neighborhood: "Lower East Side", distance: 1.3, seatsAvailable: 0, totalSeats: 14, wifi: true, outlets: false, noiseLevel: "lively", hours: "7:30am - 5pm", rating: 4.4, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop", lastUpdated: "13 min ago", lat: 40.7210, lng: -73.9880 },
  { id: "saltwater-coffee", name: "Saltwater Coffee", address: "345 E 12th St", neighborhood: "East Village", distance: 1.4, seatsAvailable: 0, totalSeats: 30, wifi: true, outlets: true, noiseLevel: "moderate", hours: "7am - 6pm", rating: 4.3, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800&auto=format&fit=crop", lastUpdated: "4 min ago", lat: 40.7300, lng: -73.9830 },
  { id: "pacific-coffee", name: "Pacific Coffee", address: "155 Freeman St", neighborhood: "Greenpoint", distance: 3.6, seatsAvailable: 0, totalSeats: 20, wifi: true, outlets: true, noiseLevel: "quiet", hours: "8am - 4pm", rating: 4.7, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1518832553480-cd0e565a18a6?w=800&auto=format&fit=crop", lastUpdated: "16 min ago", lat: 40.7345, lng: -73.9555 },
  { id: "seven-grams", name: "Seven Grams Caffe", address: "275 7th Ave", neighborhood: "Chelsea", distance: 0.6, seatsAvailable: 3, totalSeats: 16, wifi: true, outlets: true, noiseLevel: "moderate", hours: "7am - 6pm", rating: 4.2, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&auto=format&fit=crop", lastUpdated: "9 min ago", lat: 40.7460, lng: -73.9935 },
  { id: "toby-brooklyn", name: "Toby’s Estate", address: "125 N 6th St", neighborhood: "Williamsburg", distance: 2.7, seatsAvailable: 13, totalSeats: 40, wifi: true, outlets: true, noiseLevel: "lively", hours: "7am - 7pm", rating: 4.6, priceLevel: 2, imageUrl: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop", lastUpdated: "2 min ago", lat: 40.7170, lng: -73.9590 },
  { id: "gasoline-alley", name: "Gasoline Alley Coffee", address: "325 Bowery", neighborhood: "Noho", distance: 0.9, seatsAvailable: 0, totalSeats: 12, wifi: true, outlets: false, noiseLevel: "moderate", hours: "7:30am - 5pm", rating: 4.0, priceLevel: 1, imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop", lastUpdated: "17 min ago", lat: 40.7255, lng: -73.9925 },
];

const minutesAgoMap: Record<string, number> = {
  "1 min ago": 1, "2 min ago": 2, "3 min ago": 3, "4 min ago": 4,
  "5 min ago": 5, "6 min ago": 6, "7 min ago": 7, "8 min ago": 8,
  "9 min ago": 9, "10 min ago": 10, "11 min ago": 11, "12 min ago": 12,
  "13 min ago": 13, "14 min ago": 14, "15 min ago": 15, "16 min ago": 16,
  "17 min ago": 17,
};

export const cafes: Cafe[] = seed.map((s) => ({
  ...s,
  seatStatus: seatStatusFromCount(s.seatsAvailable, s.totalSeats),
  lastUpdatedAt: Date.now() - (minutesAgoMap[s.lastUpdated] ?? 5) * 60_000,
}));

export function getCafeById(id: string): Cafe | undefined {
  return cafes.find((c) => c.id === id);
}

export function getAvailabilityStatus(cafe: Cafe): "green" | "amber" | "red" {
  if (cafe.seatStatus === "plenty") return "green";
  if (cafe.seatStatus === "few") return "amber";
  return "red";
}
