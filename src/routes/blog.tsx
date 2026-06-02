import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Card3D } from "@/components/motion/Card3D";
import { useGsapWordReveal } from "@/hooks/use-gsap";
import { POSTS, CATEGORIES } from "@/data/blog";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Insights — Amaravathi Real Estate" },
      { name: "description", content: "Expert insights on Amaravathi land investment, approvals, and market trends." },
    ],
  }),
  component: BlogPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function BlogPage() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  /* h1 has a <span> child for gradient text — word reveal preserves markup */
  useGsapWordReveal(h1Ref, { stagger: 0.08 });

  const [active, setActive] = useState("All");
  const filtered = active === "All" ? POSTS : POSTS.filter((p) => p.category === active);
  const featured = POSTS.find((p) => p.featured) ?? POSTS[0];

  const ACCENT = ["#22D3EE", "#C9973A", "#2A5C3F", "#22D3EE", "#C9973A", "#2A5C3F"];

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, #0F2918 0%, #0891B2 100%)", padding: "5rem 0 4rem", position: "relative", overflow: "hidden" }}>
        <div className="orb-gold absolute" style={{ width: 280, height: 280, bottom: -60, right: "15%", opacity: 0.15 }} />
        <div className="container mx-auto px-4 md:px-8 text-center" style={{ position: "relative", zIndex: 1 }}>
          <motion.p className="eyebrow-light mb-4 inline-block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>/ Insights</motion.p>
          <h1 ref={h1Ref} className="font-display font-black" style={{ color: "#F0FDF4", fontSize: "clamp(2.6rem,7vw,5.5rem)", letterSpacing: "-0.03em", lineHeight: 1.02 }}>
            Land.{" "}
            <span className="text-grad-gold" style={{ fontStyle: "italic" }}>Decoded.</span>
          </h1>
          <p style={{ color: "rgba(240,253,244,0.65)", marginTop: "1.25rem", maxWidth: 520, margin: "1.25rem auto 0", fontSize: "1rem" }}>
            Expert perspectives on investments, approvals, infrastructure, and the art of buying land that appreciates.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section style={{ background: "var(--forest-deep)", padding: "5rem 0" }}>
        <div className="container mx-auto px-4 md:px-8">
          <p className="eyebrow-light mb-6">/ Featured Article</p>
          <Link to="/blog/$slug" params={{ slug: featured.slug }} className="group grid gap-10 md:grid-cols-2 md:gap-14 items-center">
            <div className="overflow-hidden rounded-[1.4rem]" style={{ boxShadow: "0 20px 60px rgba(34,211,238,0.15)", border: "1px solid rgba(34,211,238,0.14)" }}>
              <img src={featured.image} alt={featured.title} loading="lazy" className="h-72 md:h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div>
              <span className="badge badge-cyan">{featured.category}</span>
              <h2 className="font-display font-bold mt-4" style={{ color: "#F0FDF4", fontSize: "clamp(1.6rem,3vw,2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.08, transition: "color 0.2s" }}>
                {featured.title}
              </h2>
              <p style={{ color: "rgba(240,253,244,0.62)", marginTop: "1rem", fontSize: "0.95rem", lineHeight: 1.75 }}>{featured.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 mt-5 font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.12em", color: "rgba(240,253,244,0.42)" }}>
                <span className="flex items-center gap-1.5"><User style={{ width: 12, height: 12 }} />{featured.author}</span>
                <span className="flex items-center gap-1.5"><Calendar style={{ width: 12, height: 12 }} />{formatDate(featured.date)}</span>
                <span className="flex items-center gap-1.5"><Clock style={{ width: 12, height: 12 }} />{featured.readTime}</span>
              </div>
              <div className="flex items-center gap-2 mt-6 font-sans font-semibold transition-all group-hover:gap-3" style={{ color: "#22D3EE", fontSize: "0.9rem" }}>
                Read article <ArrowRight style={{ width: 15, height: 15 }} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section style={{ background: "linear-gradient(160deg, #0F2918 0%, #092600 60%, #0F2918 100%)", padding: "5rem 0" }}>
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading theme="dark" eyebrow="Latest" title="Read the latest" description="Curated articles to help you invest with conviction." />

          {/* Category filter */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className="rounded-full px-4 py-2 font-mono transition-all duration-200"
                style={
                  active === c
                    ? { background: "linear-gradient(135deg, #22D3EE, #2A5C3F)", color: "#F0FDF4", fontSize: "0.72rem", letterSpacing: "0.14em", border: "none" }
                    : { background: "transparent", color: "rgba(240,253,244,0.52)", fontSize: "0.72rem", letterSpacing: "0.14em", border: "1px solid rgba(34,211,238,0.20)" }
                }
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}>
                <Card3D
                  glowColor={(["cyan", "gold", "forest"] as const)[i % 3]}
                  maxTilt={11}
                  className="rounded-[1.4rem] overflow-hidden flex flex-col h-full"
                  style={{ background: "rgba(12,24,20,0.82)", border: `1px solid ${ACCENT[i % 6]}22` }}
                >
                  <Link to="/blog/$slug" params={{ slug: post.slug }} className="block overflow-hidden">
                    <img src={post.image} alt={post.title} loading="lazy" className="h-48 w-full object-cover transition-transform duration-700 hover:scale-105" />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.20em", color: ACCENT[i % 6], textTransform: "uppercase" }}>{post.category}</span>
                    <h3 className="font-display font-bold mt-2 leading-tight" style={{ fontSize: "1.1rem", letterSpacing: "-0.015em" }}>
                      <Link to="/blog/$slug" params={{ slug: post.slug }} style={{ color: "#F0FDF4", transition: "color 0.2s" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = ACCENT[i % 6]; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#F0FDF4"; }}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-3 line-clamp-3" style={{ color: "rgba(240,253,244,0.55)", fontSize: "0.875rem", lineHeight: 1.72 }}>{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between font-mono pt-4" style={{ borderTop: "1px solid rgba(240,253,244,0.08)", fontSize: "0.65rem", letterSpacing: "0.12em", color: "rgba(240,253,244,0.38)" }}>
                      <span className="flex items-center gap-1.5"><Calendar style={{ width: 11, height: 11 }} />{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1.5"><Clock style={{ width: 11, height: 11 }} />{post.readTime}</span>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--forest-deep)", padding: "5rem 0" }}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden noise"
            style={{ background: "linear-gradient(135deg, #22D3EE 0%, #2A5C3F 45%, #C9973A 100%)", boxShadow: "0 28px 80px rgba(34,211,238,0.22)" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(12,24,20,0.45)", borderRadius: "inherit" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="font-display font-black" style={{ color: "#F0FDF4", fontSize: "clamp(1.8rem,4vw,3.2rem)", letterSpacing: "-0.025em" }}>
                Ready to invest in Amaravathi?
              </h2>
              <p style={{ color: "rgba(240,253,244,0.75)", marginTop: "1rem", maxWidth: 480, margin: "1rem auto 0" }}>
                Browse our DTCP & RERA approved open plots — handpicked for long-term appreciation.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link to="/plots" className="btn" style={{ background: "rgba(12,24,20,0.85)", color: "#F0FDF4", padding: "0.8rem 2rem", border: "1.5px solid rgba(240,253,244,0.28)", borderRadius: "99px", fontWeight: 600 }}>View Plots</Link>
                <Link to="/contact" className="btn btn-ghost">Talk to an Expert</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
