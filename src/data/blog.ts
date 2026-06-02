import plot1 from "@/assets/plot-1.jpg";
import plot2 from "@/assets/plot-2.jpg";
import plot3 from "@/assets/plot-3.jpg";
import plot4 from "@/assets/plot-4.jpg";
import hero from "@/assets/hero-plots.jpg";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export const POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "why-invest-amaravathi-2026",
    title: "Why 2026 Is the Year to Invest in Amaravathi",
    excerpt:
      "With construction resuming on the Secretariat, High Court, and CRDA hubs, land values across the capital region are entering a new growth cycle.",
    content: [
      "After years of policy uncertainty, Amaravathi is once again the focus of Andhra Pradesh's development agenda. Construction activity around the Secretariat complex, High Court precinct, and CRDA core has resumed at scale, and infrastructure works including the inner ring road and the Vijayawada–Amaravathi expressway are progressing on revised timelines.",
      "Historically, capital regions in India — Gandhinagar, Naya Raipur, and parts of NCR — have delivered 3x to 5x land appreciation within a decade of serious infrastructure rollout. Amaravathi is following the same playbook, but with the added advantage of being a planned greenfield city designed by globally renowned urban planners.",
      "For investors, the window before mass institutional capital arrives is historically the most rewarding. DTCP and RERA approved layouts within a 10–15 km radius of the Secretariat are the highest-conviction picks for 2026.",
    ],
    category: "Investment",
    author: "Ravi Kumar",
    date: "2026-04-12",
    readTime: "6 min read",
    image: hero,
    featured: true,
  },
  {
    id: "2",
    slug: "dtcp-vs-rera-vs-panchayat",
    title: "DTCP vs RERA vs Panchayat: Which Approval Should You Trust?",
    excerpt:
      "Approval type is the single biggest predictor of resale value and bank loan eligibility. Here's a clear breakdown for first-time buyers.",
    content: [
      "DTCP (Directorate of Town and Country Planning) approval is the gold standard for residential layouts in Andhra Pradesh. It guarantees that the layout meets road width, open space, and utility provisioning norms — and almost every nationalised bank will sanction loans against DTCP plots.",
      "RERA registration adds an extra layer of buyer protection. The developer is legally bound to deliver promised amenities and faces penalties for delays. Always cross-check the RERA number on the official AP RERA website before paying any token amount.",
      "Panchayat-approved layouts are cheaper but come with real risks: limited bank financing, potential regularisation costs, and slower resale. They can work for end-use buyers with full cash, but rarely make sense as pure investments.",
    ],
    category: "Buyer Guide",
    author: "Lakshmi Priya",
    date: "2026-03-28",
    readTime: "8 min read",
    image: plot1,
  },
  {
    id: "3",
    slug: "vastu-facing-guide",
    title: "The Truth About Plot Facing: A Practical Vastu Guide",
    excerpt:
      "East and North facing plots command a premium — but is it always justified? A balanced look at facing, sunlight, and resale value.",
    content: [
      "In South Indian markets, East and North facing plots typically sell for 8–15% more than West or South facing ones. The premium is driven by both Vastu beliefs and practical sunlight orientation.",
      "However, a well-designed home on a South facing plot can outperform a poorly planned East facing one. What matters most is the road width, the position of the entrance gate within the plot, and the placement of the main door inside the home.",
      "If you're buying purely for investment and resale within 3–5 years, paying the East/North premium usually pays off. For long-term end-use, focus on plot dimensions and neighbourhood quality first.",
    ],
    category: "Buyer Guide",
    author: "Suresh Babu",
    date: "2026-03-10",
    readTime: "5 min read",
    image: plot2,
  },
  {
    id: "4",
    slug: "infrastructure-roadmap-crda",
    title: "Inside the CRDA Infrastructure Roadmap for 2026–2030",
    excerpt:
      "Highways, metro, ring roads, and a new international airport — here's what's actually under construction and when it lands.",
    content: [
      "The Capital Region Development Authority (CRDA) has published a phased infrastructure plan covering road, rail, water, and air connectivity. The Vijayawada–Amaravathi expressway is targeted for completion by late 2027, cutting travel time to under 25 minutes.",
      "Phase 1 of the inner ring road is expected to open in segments through 2026, opening up dozens of new layouts to mainstream demand. The proposed light metro corridor connecting Vijayawada, Amaravathi core, and Guntur is in detailed project report stage.",
      "Bhogapuram International Airport, while outside the immediate capital region, will significantly improve overall AP connectivity and is widely seen as a tailwind for state-wide land prices.",
    ],
    category: "Infrastructure",
    author: "Anil Reddy",
    date: "2026-02-22",
    readTime: "7 min read",
    image: plot3,
  },
  {
    id: "5",
    slug: "first-time-buyer-checklist",
    title: "The 12-Point Checklist Every First-Time Plot Buyer Needs",
    excerpt:
      "From title verification to encumbrance certificates — the exact due diligence steps we walk every buyer through before booking.",
    content: [
      "Start with the title document. Insist on the original parent document (mother deed) and a 30-year title chain. A reputable advocate can complete this verification in under a week for a modest fee.",
      "Next, pull the Encumbrance Certificate (EC) for the last 15 years from the sub-registrar's office. The EC reveals any existing mortgages, liens, or pending litigation against the property.",
      "Always physically visit the plot, walk its boundaries, and verify the survey numbers against the layout plan. Cross-check the layout's DTCP/RERA approval number on the official portals — never rely on photocopies provided by the seller.",
    ],
    category: "Buyer Guide",
    author: "Lakshmi Priya",
    date: "2026-02-05",
    readTime: "9 min read",
    image: plot4,
  },
  {
    id: "6",
    slug: "guntur-vs-vijayawada-vs-amaravathi",
    title: "Guntur vs Vijayawada vs Amaravathi Core: Where to Buy?",
    excerpt:
      "Each sub-market has its own risk-reward profile. We compare ticket size, appreciation history, and rental yields side-by-side.",
    content: [
      "Amaravathi core (within 10 km of the Secretariat) offers the highest appreciation potential but the longest holding period. Expect 7–10 years for full value realisation, with significant upside if capital plans accelerate.",
      "Vijayawada peripheries deliver the most balanced risk-reward today. The city's existing infrastructure, schools, and hospitals support immediate end-use demand, while proximity to Amaravathi adds long-term upside.",
      "Guntur side layouts are the most affordable entry point and benefit from established residential demand. Appreciation is steadier but typically slower than Vijayawada or Amaravathi core.",
    ],
    category: "Market Insights",
    author: "Ravi Kumar",
    date: "2026-01-18",
    readTime: "6 min read",
    image: plot1,
  },
];

export const CATEGORIES = ["All", "Investment", "Buyer Guide", "Infrastructure", "Market Insights"];
