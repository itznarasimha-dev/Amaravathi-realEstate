import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PlotCard } from "@/components/PlotCard";
import { useGsapCharReveal } from "@/hooks/use-gsap";
import { PLOTS, REGIONS, APPROVALS, FACINGS, formatINR } from "@/data/plots";

export const Route = createFileRoute("/plots")({
  head: () => ({
    meta: [
      { title: "Open Plots for Sale — Amaravathi Real Estate" },
      { name: "description", content: "Browse DTCP & RERA approved open plots. Filter by location, price, approval and facing." },
    ],
  }),
  component: PlotsPage,
});

function PlotsPage() {
  const [region, setRegion]   = useState("all");
  const [approval, setApproval] = useState("all");
  const [facing, setFacing]   = useState("all");
  const [sort, setSort]       = useState("featured");
  const [maxPrice, setMaxPrice] = useState(10000000);

  const titleRef = useRef<HTMLHeadingElement>(null);
  useGsapCharReveal(titleRef, { stagger: 0.02 });

  const filtered = useMemo(() => {
    let r = [...PLOTS];
    if (region !== "all")   r = r.filter((p) => p.region === region);
    if (approval !== "all") r = r.filter((p) => p.approval === approval);
    if (facing !== "all")   r = r.filter((p) => p.facing === facing);
    r = r.filter((p) => p.price <= maxPrice);
    if (sort === "low")  r.sort((a, b) => a.price - b.price);
    if (sort === "high") r.sort((a, b) => b.price - a.price);
    if (sort === "size") r.sort((a, b) => b.size - a.size);
    return r;
  }, [region, approval, facing, sort, maxPrice]);

  const reset = () => { setRegion("all"); setApproval("all"); setFacing("all"); setSort("featured"); setMaxPrice(10000000); };

  const inputStyle = { background: "rgba(34,211,238,0.06)", borderColor: "rgba(34,211,238,0.20)", color: "#F0FDF4" };

  return (
    <>
      {/* Header */}
      <section style={{ background: "linear-gradient(160deg, #0891B2 0%, #0F2918 100%)", padding: "5rem 0 4rem", position: "relative", overflow: "hidden" }}>
        <div className="orb-gold" style={{ width: 250, height: 250, top: -60, right: "15%", opacity: 0.15 }} />
        <div className="container mx-auto px-4 md:px-8" style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow-light mb-4">/ All Listings</p>
            <h1 ref={titleRef} className="font-display font-black" style={{ color: "#F0FDF4", fontSize: "clamp(2.4rem,6vw,4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.02 }}>
              Open Plots for Sale
            </h1>
            <p style={{ color: "rgba(240,253,244,0.65)", marginTop: "1rem", maxWidth: 560, fontSize: "1rem" }}>
              Verified, fully approved plots across the Amaravathi capital region.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: "var(--forest-deep)", minHeight: "60vh" }}>
        <div className="container mx-auto grid gap-8 px-4 py-12 md:px-8 lg:grid-cols-[260px_1fr]">

          {/* Filters */}
          <aside
            className="h-fit rounded-[1.25rem] p-6 lg:sticky lg:top-24"
            style={{ background: "rgba(12,24,20,0.80)", border: "1px solid rgba(34,211,238,0.14)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold flex items-center gap-2" style={{ color: "#F0FDF4", fontSize: "1.1rem" }}>
                <Filter style={{ width: 15, height: 15, color: "#22D3EE" }} /> Filters
              </h3>
              <button onClick={reset} className="flex items-center gap-1 font-mono" style={{ color: "#C9973A", fontSize: "0.68rem", letterSpacing: "0.12em" }}>
                <X style={{ width: 11, height: 11 }} /> RESET
              </button>
            </div>
            <div className="space-y-5">
              {[
                { label: "Location", value: region, onChange: setRegion, opts: REGIONS, all: "All locations" },
                { label: "Approval", value: approval, onChange: setApproval, opts: APPROVALS, all: "All approvals" },
                { label: "Facing",   value: facing, onChange: setFacing, opts: FACINGS, all: "Any facing" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="font-mono block mb-2" style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "rgba(240,253,244,0.40)", textTransform: "uppercase" }}>{f.label}</label>
                  <Select value={f.value} onValueChange={f.onChange}>
                    <SelectTrigger className="h-10 rounded-xl text-sm" style={inputStyle}><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{f.all}</SelectItem>
                      {f.opts.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              ))}
              <div>
                <label className="font-mono flex justify-between mb-3" style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "rgba(240,253,244,0.40)", textTransform: "uppercase" }}>
                  <span>Max Price</span>
                  <span style={{ color: "#C9973A", letterSpacing: "normal", textTransform: "none" }}>{formatINR(maxPrice)}</span>
                </label>
                <Slider value={[maxPrice]} onValueChange={(v) => setMaxPrice(v[0])} min={1000000} max={10000000} step={500000} />
              </div>
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
              <p className="font-mono" style={{ color: "rgba(240,253,244,0.45)", fontSize: "0.75rem", letterSpacing: "0.12em" }}>
                SHOWING <span style={{ color: "#22D3EE" }}>{filtered.length}</span> PLOT{filtered.length !== 1 ? "S" : ""}
              </p>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-44 h-10 rounded-xl text-sm" style={inputStyle}><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="low">Price: Low → High</SelectItem>
                  <SelectItem value="high">Price: High → Low</SelectItem>
                  <SelectItem value="size">Largest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {filtered.length === 0 ? (
              <div className="rounded-[1.25rem] p-16 text-center" style={{ border: "1.5px dashed rgba(34,211,238,0.20)", background: "rgba(12,24,20,0.50)" }}>
                <p style={{ color: "rgba(240,253,244,0.50)" }}>No plots match your filters.</p>
                <button onClick={reset} className="font-mono mt-3" style={{ color: "#22D3EE", fontSize: "0.75rem", letterSpacing: "0.14em" }}>RESET FILTERS →</button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p, i) => <PlotCard key={p.id} plot={p} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
