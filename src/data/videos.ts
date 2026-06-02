export interface VideoItem {
  id: string; // YouTube video ID
  title: string;
  description: string;
  region: "Amaravathi" | "Vijayawada" | "Guntur" | "General";
  duration?: string;
}

// Replace these YouTube IDs with your actual project walkthroughs.
// Format: the part after `v=` in https://www.youtube.com/watch?v=XXXXXXXXXXX
export const VIDEOS: VideoItem[] = [
  {
    id: "1J9b8zYf9Yk",
    title: "Amaravathi Capital Region — Aerial Tour",
    description:
      "A bird's-eye view of the upcoming capital city, secretariat, and major infrastructure corridors.",
    region: "Amaravathi",
    duration: "4:12",
  },
  {
    id: "aqz-KE-bpKQ",
    title: "Capital View Greens — Site Walkthrough",
    description:
      "Walk the plot boundaries, internal BT roads, and amenity zones at our flagship Tulluru layout.",
    region: "Amaravathi",
    duration: "6:48",
  },
  {
    id: "ScMzIvxBSi4",
    title: "Vijayawada Highway Frontage — Why Invest",
    description:
      "Strategic location insights, connectivity, and ROI breakdown for our NH-65 corridor plots.",
    region: "Vijayawada",
    duration: "5:20",
  },
  {
    id: "LXb3EKWsInQ",
    title: "Guntur Outer Ring — Layout Overview",
    description:
      "Master plan walkthrough with infrastructure timelines and approval documentation.",
    region: "Guntur",
    duration: "3:55",
  },
  {
    id: "9bZkp7q19f0",
    title: "Customer Stories — Investing in Amaravathi",
    description:
      "Hear from families and NRIs who chose Amaravathi Real Estate for their land investments.",
    region: "General",
    duration: "7:10",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "DTCP & RERA — What Every Buyer Should Know",
    description:
      "A quick guide to plot approvals, due diligence, and what makes a layout truly investment-grade.",
    region: "General",
    duration: "5:02",
  },
];
