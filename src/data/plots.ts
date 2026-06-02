import plot1 from "@/assets/plot-1.jpg";
import plot2 from "@/assets/plot-2.jpg";
import plot3 from "@/assets/plot-3.jpg";
import plot4 from "@/assets/plot-4.jpg";

export type Approval = "DTCP" | "RERA" | "Panchayat";
export type Facing = "East" | "West" | "North" | "South";

export interface Plot {
  id: string;
  title: string;
  location: string;
  region: "Amaravathi" | "Vijayawada" | "Guntur";
  price: number; // total in INR
  pricePerSqYd: number;
  size: number; // sq yards
  facing: Facing;
  approval: Approval;
  image: string;
  gallery: string[];
  amenities: string[];
  description: string;
  featured?: boolean;
  lat: number;
  lng: number;
}

export const PLOTS: Plot[] = [
  {
    id: "amr-001",
    title: "Capital View Greens",
    location: "Tulluru, Amaravathi Capital Region",
    region: "Amaravathi",
    price: 4800000,
    pricePerSqYd: 24000,
    size: 200,
    facing: "East",
    approval: "DTCP",
    image: plot1,
    gallery: [plot1, plot4, plot3],
    amenities: ["BT Road", "Underground Drainage", "Electricity", "Water Supply", "Parks", "Compound Wall"],
    description:
      "Premium east-facing DTCP-approved plot in the heart of the Amaravathi Capital Region, just 2 km from the proposed Secretariat. Excellent appreciation potential.",
    featured: true,
    lat: 16.5417,
    lng: 80.515,
  },
  {
    id: "amr-002",
    title: "Secretariat Enclave",
    location: "Velagapudi, Amaravathi",
    region: "Amaravathi",
    price: 7200000,
    pricePerSqYd: 36000,
    size: 200,
    facing: "North",
    approval: "RERA",
    image: plot4,
    gallery: [plot4, plot1, plot2],
    amenities: ["CC Road", "Street Lights", "24/7 Security", "Parks", "Clubhouse", "Avenue Plantation"],
    description:
      "RERA-approved gated layout adjacent to the Secretariat zone. Lush palm-lined avenues and a premium gated entry.",
    featured: true,
    lat: 16.5273,
    lng: 80.5172,
  },
  {
    id: "amr-003",
    title: "High Court Heights",
    location: "Nelapadu, Amaravathi",
    region: "Amaravathi",
    price: 3600000,
    pricePerSqYd: 18000,
    size: 200,
    facing: "West",
    approval: "DTCP",
    image: plot3,
    gallery: [plot3, plot2, plot1],
    amenities: ["BT Road", "Electricity", "Water Supply", "Compound Wall"],
    description:
      "Strategically located near the proposed High Court complex with excellent road connectivity and rapidly appreciating land values.",
    featured: true,
    lat: 16.5128,
    lng: 80.5345,
  },
  {
    id: "amr-004",
    title: "Krishna Riverside Plots",
    location: "Penumaka, Amaravathi",
    region: "Amaravathi",
    price: 5500000,
    pricePerSqYd: 27500,
    size: 200,
    facing: "East",
    approval: "RERA",
    image: plot2,
    gallery: [plot2, plot1, plot4],
    amenities: ["River View", "BT Road", "Underground Drainage", "Electricity", "Parks"],
    description:
      "Serene riverside plot with stunning Krishna river views. Perfect for a future dream home or long-term investment.",
    featured: true,
    lat: 16.4863,
    lng: 80.5587,
  },
  {
    id: "vij-001",
    title: "IT Corridor Greens",
    location: "Mangalagiri, Vijayawada",
    region: "Vijayawada",
    price: 2800000,
    pricePerSqYd: 14000,
    size: 200,
    facing: "South",
    approval: "DTCP",
    image: plot1,
    gallery: [plot1, plot3],
    amenities: ["BT Road", "Electricity", "Water Supply", "Street Lights"],
    description:
      "Strategically positioned near the upcoming IT corridor on the Vijayawada–Amaravathi highway.",
    lat: 16.4307,
    lng: 80.5697,
  },
  {
    id: "gnt-001",
    title: "Guntur Garden Estates",
    location: "Tadepalli, Guntur",
    region: "Guntur",
    price: 1900000,
    pricePerSqYd: 9500,
    size: 200,
    facing: "North",
    approval: "Panchayat",
    image: plot3,
    gallery: [plot3, plot2],
    amenities: ["CC Road", "Electricity", "Water Supply"],
    description:
      "Affordable, well-laid-out plots ideal for first-time buyers. Quick connectivity to NH-16.",
    lat: 16.4707,
    lng: 80.6093,
  },
];

export const REGIONS = ["Amaravathi", "Vijayawada", "Guntur"] as const;
export const APPROVALS: Approval[] = ["DTCP", "RERA", "Panchayat"];
export const FACINGS: Facing[] = ["East", "West", "North", "South"];

export const formatINR = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
};
