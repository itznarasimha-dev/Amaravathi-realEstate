import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Award, TrendingUp, Users } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Card3D } from "@/components/motion/Card3D";
import { useGsapCharReveal, useGsapReveal } from "@/hooks/use-gsap";
const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];
import heroImg from "@/assets/hero-plots.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Amaravathi Real Estate" },
      { name: "description", content: "Decade-long expertise in AP capital region land investments." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const subRef  = useRef<HTMLParagraphElement>(null);
  const h2Ref   = useRef<HTMLHeadingElement>(null);
  useGsapReveal(subRef, { delay: 0.35, y: 24 });
  useGsapCharReveal(h2Ref, { stagger: 0.02 });

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden" style={{ paddingTop: "7rem", paddingBottom: "6rem" }}>
        <div className="absolute inset-0 -z-30">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 -z-20" style={{ background: "linear-gradient(160deg, rgba(12,24,20,0.97) 0%, rgba(8,145,178,0.35) 55%, rgba(12,24,20,0.96) 100%)" }} />
        <div className="orb-cyan absolute" style={{ width: 400, height: 400, top: -80, right: -80, opacity: 0.20, zIndex: -10 }} />
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="eyebrow-light mb-5">/ Our Story</p>
          </motion.div>
          <motion.h1
            className="font-display font-black max-w-3xl"
            style={{ color: "#F0FDF4", fontSize: "clamp(2.6rem,6.5vw,5.5rem)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_EXPO }}
          >
            Building{" "}
            <span className="text-grad-gold" style={{ fontStyle: "italic" }}>trust</span>,
            {" "}one plot at a time.
          </motion.h1>
          <p ref={subRef} style={{ color: "rgba(240,253,244,0.68)", marginTop: "1.5rem", maxWidth: 560, fontSize: "1.1rem", lineHeight: 1.75 }}>
            For over a decade, we've helped families and investors secure their future in Andhra Pradesh's most promising land destination — Amaravathi.
          </p>
        </div>
      </section>

      {/* Who we are */}
      <section style={{ background: "var(--forest-deep)", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
        <div className="orb-cyan absolute" style={{ width: 350, height: 350, top: -80, right: -80, opacity: 0.14 }} />
        <div className="container mx-auto grid gap-16 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="eyebrow-light mb-3">/ Who we are</p>
            <h2 ref={h2Ref} className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "clamp(2rem,4vw,3.2rem)", letterSpacing: "-0.025em", lineHeight: 1.06 }}>
              The Amaravathi land specialists
            </h2>
            <div className="divider-tri w-24 mt-4 mb-6" />
            <p style={{ color: "rgba(240,253,244,0.65)", lineHeight: 1.78, fontSize: "0.95rem" }}>
              Founded by a team of local experts with deep roots in the Krishna and Guntur districts, Amaravathi Real Estate is built on three pillars: verified plots, transparent pricing, and white-glove service.
            </p>
            <p style={{ color: "rgba(240,253,244,0.65)", lineHeight: 1.78, fontSize: "0.95rem", marginTop: "1rem" }}>
              Every layout we represent is hand-inspected. Every title is verified. Every plot is priced honestly — because your investment deserves nothing less.
            </p>
            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { n: "1,200+", l: "Happy Investors", c: "#22D3EE" },
                { n: "₹450 Cr", l: "Plots Sold", c: "#C9973A" },
                { n: "10+ Yrs", l: "Experience", c: "#2A5C3F" },
              ].map((s) => (
                <div key={s.l} className="rounded-[1rem] p-4 text-center" style={{ background: `${s.c}0D`, border: `1px solid ${s.c}30` }}>
                  <p className="font-display font-black stat-num" style={{ color: s.c }}>{s.n}</p>
                  <p className="font-mono mt-1.5" style={{ color: "rgba(240,253,244,0.42)", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid gap-5">
            {[
              { icon: Eye,    title: "Our Vision", text: "To be Andhra Pradesh's most trusted name in capital region land investments.", glow: "cyan" as const,   c: "#22D3EE" },
              { icon: Target, title: "Our Mission", text: "Deliver verified, fully approved plots at honest prices, backed by lifelong service.", glow: "gold" as const,   c: "#C9973A" },
              { icon: Heart,  title: "Our Values",  text: "Transparency, integrity, and putting investor interests above all else.", glow: "forest" as const, c: "#2A5C3F" },
            ].map((v) => (
              <Card3D key={v.title} glowColor={v.glow} maxTilt={10} className="rounded-[1.2rem] p-6" style={{ background: "rgba(12,24,20,0.75)", border: `1px solid ${v.c}22` }}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl mb-4" style={{ background: `${v.c}15`, border: `1px solid ${v.c}35` }}>
                  <v.icon style={{ width: 20, height: 20, color: v.c }} />
                </div>
                <h3 className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "1.1rem", marginBottom: "0.4rem" }}>{v.title}</h3>
                <p style={{ color: "rgba(240,253,244,0.58)", fontSize: "0.875rem", lineHeight: 1.7 }}>{v.text}</p>
              </Card3D>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Investment reasons */}
      <section style={{ background: "linear-gradient(160deg, #0F2918 0%, #92600A 100%)", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
        <div className="orb-cyan absolute" style={{ width: 300, height: 300, bottom: -60, left: "10%", opacity: 0.15 }} />
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading
            theme="dark"
            eyebrow="Why invest in Amaravathi"
            title="A once-in-a-generation opportunity"
            description="The capital city of Andhra Pradesh is back on track — and the smart money is moving fast."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: Award,    title: "Capital City Status", text: "Reaffirmed as the people's capital with Secretariat, High Court & CRDA already in place.", glow: "cyan" as const,   c: "#22D3EE" },
              { icon: TrendingUp, title: "4× Appreciation",  text: "Land values in the capital region have grown 4× in the last 5 years and continue to rise.", glow: "gold" as const,   c: "#C9973A" },
              { icon: Users,    title: "Mega Infrastructure", text: "World-class roads, riverfront development, IT corridors and educational hubs underway.", glow: "forest" as const, c: "#2A5C3F" },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}>
                <Card3D glowColor={f.glow} maxTilt={12} className="rounded-[1.4rem] p-8 h-full" style={{ background: "rgba(12,24,20,0.70)", border: `1px solid ${f.c}28` }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl mb-5" style={{ background: `${f.c}14`, border: `1px solid ${f.c}35` }}>
                    <f.icon style={{ width: 22, height: 22, color: f.c }} />
                  </div>
                  <h3 className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "1.3rem", marginBottom: "0.6rem" }}>{f.title}</h3>
                  <p style={{ color: "rgba(240,253,244,0.60)", fontSize: "0.875rem", lineHeight: 1.75 }}>{f.text}</p>
                </Card3D>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/plots" className="btn btn-tri inline-flex items-center gap-2">
              Explore Available Plots
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
