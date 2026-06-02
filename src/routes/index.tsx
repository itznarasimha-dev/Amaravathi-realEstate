import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, MapPin, ShieldCheck, TrendingUp, Award, Building2, Landmark, Trees, ArrowRight, Star, Quote } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlotCard } from "@/components/PlotCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Card3D } from "@/components/motion/Card3D";
import { HeroScene } from "@/components/3d/HeroScene";
import { useGsapCharReveal, useGsapWordReveal, useGsapReveal, useGsapStagger } from "@/hooks/use-gsap";
import { PLOTS, REGIONS, APPROVALS } from "@/data/plots";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amaravathi Real Estate — Premium Open Plots in AP's Capital Region" },
      { name: "description", content: "DTCP & RERA approved open plots in Amaravathi, Vijayawada and Guntur." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const featured = PLOTS.filter((p) => p.featured);
  const [region, setRegion] = useState("");
  const [approval, setApproval] = useState("");

  /* GSAP refs — only plain-text elements use char split */
  const heroSubRef   = useRef<HTMLParagraphElement>(null);
  const featureGrid  = useRef<HTMLDivElement>(null);
  const testimonials = useRef<HTMLDivElement>(null);

  useGsapReveal(heroSubRef, { delay: 0.4, y: 28 });
  useGsapStagger(featureGrid, ".feat-card", { stagger: 0.09 });
  useGsapStagger(testimonials, ".testi-card", { stagger: 0.11 });

  const handleSearch = () => navigate({ to: "/plots", search: { region, approval } as any });

  return (
    <>
      {/* ════════════════════════════════════════
          HERO — dark ink + tricolor glow orbs
          ════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden min-h-[95vh] flex items-center noise">
        <div className="absolute inset-0 -z-30">
          <HeroScene />
        </div>
        <div className="absolute inset-0 -z-20 bg-slate-900/20 backdrop-blur-lg" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.14),transparent_22%)]" />

        {/* Glow orbs */}
        <div className="orb-cyan" style={{ width: 500, height: 500, top: -120, right: -80, opacity: 0.22, zIndex: -10 }} />
        <div className="orb-gold" style={{ width: 350, height: 350, bottom: -60, left: -60, opacity: 0.18, zIndex: -10 }} />
        <div className="orb-forest" style={{ width: 400, height: 400, top: "30%", left: "30%", opacity: 0.14, zIndex: -10 }} />

        <div className="container mx-auto grid gap-12 px-4 py-28 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:items-center">

          {/* Left */}
          <div>
            {/* Eyebrow badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="badge badge-dark inline-flex items-center gap-2 mb-7">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22D3EE", display: "inline-block", boxShadow: "0 0 8px #22D3EE" }} />
                AP's New Capital Region
              </span>
            </motion.div>

            {/* H1 — Framer Motion fade (has JSX children, no char-split) */}
            <motion.h1
              className="font-display"
              style={{ color: "#F0FDF4", fontSize: "clamp(2.8rem,6.5vw,6rem)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 900 }}
              initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Own a piece of{" "}
              <span className="text-grad-gold" style={{ fontStyle: "italic" }}>Amaravathi's</span>{" "}
              future.
            </motion.h1>

            {/* Subtitle */}
            <p
              ref={heroSubRef}
              style={{ color: "rgba(240,253,244,0.70)", marginTop: "1.5rem", fontSize: "1.1rem", lineHeight: 1.75, maxWidth: 520 }}
            >
              Premium DTCP & RERA approved open plots adjacent to the Secretariat, High Court & CRDA hubs — curated for long-term wealth creation.
            </p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 mt-10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <Link to="/plots" className="btn btn-gold">
                Explore Plots <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Book a Site Visit
              </Link>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              className="flex flex-wrap gap-8 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              {[
                { n: "1,200+", l: "Happy Investors", c: "#22D3EE" },
                { n: "₹450 Cr", l: "Plots Sold", c: "#C9973A" },
                { n: "10+ Yrs", l: "Experience", c: "#2A5C3F" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display font-black" style={{ color: s.c, fontSize: "clamp(1.4rem,2.5vw,2rem)", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.n}</p>
                  <p className="font-mono" style={{ color: "rgba(240,253,244,0.45)", fontSize: "0.65rem", letterSpacing: "0.2em", marginTop: 4, textTransform: "uppercase" }}>{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Search card */}
          <motion.div
            initial={{ opacity: 0, x: 48, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1000 }}
          >
            <Card3D
              glowColor="cyan"
              maxTilt={10}
              className="rounded-[1.6rem] p-7"
              style={{ background: "rgba(12,24,20,0.90)", border: "1px solid rgba(34,211,238,0.18)" }}
            >
              <p className="eyebrow-light mb-2">/ Find your plot</p>
              <h2 className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "1.6rem", letterSpacing: "-0.025em", marginBottom: "0.5rem" }}>
                Search open plots
              </h2>
              <p style={{ color: "rgba(240,253,244,0.55)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                Filter by location and approval to find your ideal investment.
              </p>

              <div className="space-y-3">
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="h-12 rounded-xl text-sm" style={{ background: "rgba(34,211,238,0.06)", borderColor: "rgba(34,211,238,0.20)", color: "#F0FDF4" }}>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={approval} onValueChange={setApproval}>
                  <SelectTrigger className="h-12 rounded-xl text-sm" style={{ background: "rgba(34,211,238,0.06)", borderColor: "rgba(34,211,238,0.20)", color: "#F0FDF4" }}>
                    <SelectValue placeholder="Approval type" />
                  </SelectTrigger>
                  <SelectContent>
                    {APPROVALS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                  </SelectContent>
                </Select>
                <button onClick={handleSearch} className="btn btn-cyan w-full h-12 justify-center text-sm">
                  <Search style={{ width: 16, height: 16 }} /> Search Plots
                </button>
              </div>

              {/* Mini stats */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { n: "6", l: "Active Plots", c: "#22D3EE" },
                  { n: "3", l: "Regions", c: "#2A5C3F" },
                  { n: "4×", l: "Growth", c: "#C9973A" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl p-3 text-center" style={{ background: "rgba(240,253,244,0.04)", border: "1px solid rgba(240,253,244,0.07)" }}>
                    <p className="font-display font-bold" style={{ color: s.c, fontSize: "1.25rem", lineHeight: 1 }}>{s.n}</p>
                    <p className="font-mono" style={{ color: "rgba(240,253,244,0.40)", fontSize: "0.6rem", letterSpacing: "0.14em", marginTop: 3, textTransform: "uppercase" }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </Card3D>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY US — Cyan → Forest gradient bg
          ════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(160deg, #0891B2 0%, #0F2918 100%)", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
        <div className="orb-gold" style={{ width: 300, height: 300, top: -80, right: "10%", opacity: 0.12 }} />
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading
            theme="dark"
            eyebrow="Why Amaravathi Real Estate"
            title="Land that pays for generations"
            description="Verified, fully approved open plots in the most strategically located zones of AP's capital region."
          />
          <div ref={featureGrid} className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: "100% Approved",     desc: "Every plot DTCP / RERA verified with clear titles and zero disputes.", glow: "cyan" as const,   accent: "#22D3EE" },
              { icon: TrendingUp,  title: "4× Appreciation",   desc: "Capital region land values have grown 4× in just the last 5 years.",   glow: "gold" as const,   accent: "#C9973A" },
              { icon: Award,       title: "Premium Layouts",   desc: "Wide BT roads, parks, drainage, electricity & gated communities.",    glow: "forest" as const, accent: "#2A5C3F" },
              { icon: Landmark,    title: "Prime Locations",   desc: "Walking distance to the Secretariat, High Court & CRDA offices.",     glow: "cyan" as const,   accent: "#22D3EE" },
            ].map((f) => (
              <Card3D
                key={f.title}
                glowColor={f.glow}
                maxTilt={13}
                className="feat-card rounded-[1.25rem] p-7"
                style={{ background: "rgba(12,24,20,0.75)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl mb-5"
                  style={{ background: `rgba(${f.accent === "#22D3EE" ? "34,211,238" : f.accent === "#C9973A" ? "201,151,58" : "42,92,63"},0.15)`, border: `1px solid ${f.accent}30` }}
                >
                  <f.icon style={{ width: 24, height: 24, color: f.accent }} strokeWidth={1.8} />
                </div>
                <h3 className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "1.15rem", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ color: "rgba(240,253,244,0.60)", fontSize: "0.875rem", lineHeight: 1.7 }}>{f.desc}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FEATURED PLOTS — Gold → Forest gradient
          ════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(160deg, #0F2918 0%, #0F2918 55%, #92600A 100%)", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
        <div className="orb-cyan" style={{ width: 320, height: 320, bottom: -60, left: "5%", opacity: 0.14 }} />
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <SectionHeading
              theme="dark"
              align="left"
              eyebrow="Featured Listings"
              title="Hand-picked open plots"
              description="Our most sought-after investments in the capital region."
            />
            <Link to="/plots" className="btn btn-outline-cyan" style={{ fontSize: "0.8125rem" }}>
              View All Plots <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => <PlotCard key={p.id} plot={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          LANDMARKS — Cyan → Gold gradient
          ════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg, #0891B2 0%, #0C1814 50%, #C9973A 100%)", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
        <div className="orb-forest" style={{ width: 300, height: 300, top: -50, left: "50%", opacity: 0.18 }} />
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading
            theme="dark"
            eyebrow="Strategic Connectivity"
            title="Surrounded by what matters"
            description="The capital's most important institutions are all within minutes of our plots."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { icon: Landmark, name: "AP Secretariat",    dist: "2 km",   c: "#22D3EE" },
              { icon: Building2, name: "High Court",        dist: "3 km",   c: "#C9973A" },
              { icon: Building2, name: "CRDA Office",       dist: "4 km",   c: "#2A5C3F" },
              { icon: Trees,     name: "Krishna Riverfront",dist: "1.5 km", c: "#22D3EE" },
              { icon: MapPin,    name: "Vijayawada Airport",dist: "20 km",  c: "#C9973A" },
              { icon: Building2, name: "NH-16 Highway",     dist: "5 min",  c: "#2A5C3F" },
            ].map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-[1.1rem] p-5 text-center transition-all duration-300 cursor-default"
                style={{ background: "rgba(12,24,20,0.60)", border: `1px solid ${l.c}22` }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${l.c}14`;
                  el.style.borderColor = `${l.c}55`;
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(12,24,20,0.60)";
                  el.style.borderColor = `${l.c}22`;
                  el.style.transform = "translateY(0)";
                }}
              >
                <l.icon style={{ width: 22, height: 22, color: l.c, margin: "0 auto 10px" }} />
                <p className="font-sans font-semibold" style={{ color: "#F0FDF4", fontSize: "0.8rem" }}>{l.name}</p>
                <p className="font-mono" style={{ color: l.c, fontSize: "0.7rem", marginTop: 4, letterSpacing: "0.08em" }}>{l.dist}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TESTIMONIALS — pure dark ink bg
          ════════════════════════════════════════ */}
      <section style={{ background: "var(--forest-deep)", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
        <div className="orb-cyan" style={{ width: 400, height: 400, top: -100, right: -100, opacity: 0.12 }} />
        <div className="orb-gold" style={{ width: 300, height: 300, bottom: -80, left: -80, opacity: 0.10 }} />
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading
            theme="dark"
            eyebrow="Investor Stories"
            title="Trusted by 1,200+ landowners"
            description="Families and investors across India trust us for honest, approved land."
          />
          <div ref={testimonials} className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { name: "Ravi Kumar",   role: "IT Professional, Hyderabad", text: "Bought a 200 sq.yd plot in 2022 — value already doubled. Excellent guidance from start to finish.", accent: "#22D3EE" },
              { name: "Lakshmi Devi", role: "NRI, Singapore",             text: "Genuine team. They handled everything remotely — registration, paperwork, even the site visit on video.", accent: "#C9973A" },
              { name: "Suresh Reddy", role: "Business Owner, Vijayawada", text: "Premium gated layouts at honest prices. The Amaravathi capital story is real, and these guys deliver.", accent: "#2A5C3F" },
            ].map((t, i) => (
              <Card3D
                key={t.name}
                glowColor={(["cyan", "gold", "forest"] as const)[i]}
                maxTilt={10}
                className="testi-card rounded-[1.4rem] p-8"
                style={{ background: "rgba(12,24,20,0.80)", border: `1px solid ${t.accent}22` }}
              >
                <Quote style={{ width: 28, height: 28, color: t.accent, opacity: 0.7, marginBottom: "1rem" }} />
                <p style={{ color: "rgba(240,253,244,0.80)", fontSize: "0.95rem", lineHeight: 1.75 }}>"{t.text}"</p>
                <div className="flex gap-1 mt-5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} style={{ width: 14, height: 14, color: t.accent, fill: t.accent }} />
                  ))}
                </div>
                <p className="font-display font-semibold mt-4" style={{ color: t.accent, fontSize: "0.95rem" }}>{t.name}</p>
                <p className="font-mono" style={{ color: "rgba(240,253,244,0.45)", fontSize: "0.68rem", letterSpacing: "0.12em", marginTop: 3 }}>{t.role}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA — full 3-color tricolor gradient
          ════════════════════════════════════════ */}
      <section style={{ background: "var(--surface)", padding: "5rem 0" }}>
        <div className="container mx-auto px-4 md:px-8">
          <div
            className="rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden noise"
            style={{ background: "linear-gradient(135deg, #22D3EE 0%, #2A5C3F 45%, #C9973A 100%)", boxShadow: "0 28px 80px rgba(34,211,238,0.25), 0 16px 40px rgba(42,92,63,0.20)" }}
          >
            {/* inner dark vignette so text is readable */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(12,24,20,0.55) 0%, rgba(12,24,20,0.30) 50%, rgba(12,24,20,0.50) 100%)", borderRadius: "inherit" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p className="eyebrow-light mb-4 inline-block">/ Ready to Invest</p>
              <h2
                className="font-display font-black"
                style={{ color: "#F0FDF4", fontSize: "clamp(2rem,4vw,3.4rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Ready to invest in{" "}
                <span style={{ color: "#FEF3C7", fontStyle: "italic", textShadow: "0 0 40px rgba(201,151,58,0.6)" }}>
                  Amaravathi?
                </span>
              </h2>
              <p style={{ color: "rgba(240,253,244,0.78)", marginTop: "1.25rem", fontSize: "1.05rem", maxWidth: 520, margin: "1.25rem auto 0" }}>
                Schedule a free, no-obligation site visit. Our team will guide you through every available plot personally.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <Link to="/contact" className="btn" style={{ background: "rgba(12,24,20,0.85)", color: "#F0FDF4", padding: "0.85rem 2.2rem", border: "1.5px solid rgba(240,253,244,0.30)", borderRadius: "99px", backdropFilter: "blur(8px)", fontWeight: 600 }}>
                  Schedule Site Visit
                </Link>
                <a href="tel:+919999999999" className="btn" style={{ background: "rgba(240,253,244,0.12)", color: "#F0FDF4", padding: "0.85rem 2.2rem", border: "1.5px solid rgba(240,253,244,0.20)", borderRadius: "99px", backdropFilter: "blur(8px)", fontWeight: 500 }}>
                  Call +91 99999 99999
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
