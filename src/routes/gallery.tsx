import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ImageIcon, Video } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PhotoGallery } from "@/components/PhotoGallery";
import { VideoGallery } from "@/components/VideoGallery";
import heroImg from "@/assets/hero-plots.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Photos & Videos | Amaravathi Real Estate" },
      { name: "description", content: "Visual tour of our open plots and capital region developments." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [tab, setTab] = useState<"photos" | "videos">("photos");

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden" style={{ paddingTop: "6rem", paddingBottom: "5rem" }}>
        <div className="absolute inset-0 -z-30"><img src={heroImg} alt="" className="h-full w-full object-cover" /></div>
        <div className="absolute inset-0 -z-20" style={{ background: "linear-gradient(160deg, rgba(12,24,20,0.97) 0%, rgba(8,145,178,0.30) 50%, rgba(12,24,20,0.97) 100%)" }} />
        <div className="orb-gold absolute" style={{ width: 350, height: 350, top: -80, right: -80, opacity: 0.16, zIndex: -10 }} />
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.p
            className="eyebrow-light mb-4 inline-block"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            / Gallery
          </motion.p>
          <motion.h1
            className="font-display font-black"
            style={{ color: "#F0FDF4", fontSize: "clamp(2.6rem,7vw,5.5rem)", letterSpacing: "-0.03em", lineHeight: 1.02 }}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            See the{" "}
            <span className="text-grad-cyan" style={{ fontStyle: "italic" }}>land</span>{" "}
            for yourself.
          </motion.h1>
          <motion.p
            style={{ color: "rgba(240,253,244,0.65)", marginTop: "1.25rem", maxWidth: 560, margin: "1.25rem auto 0", fontSize: "1rem" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A curated visual tour of our open plots, completed layouts, and the rapidly growing Amaravathi capital region.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: "var(--forest-deep)", padding: "5rem 0" }}>
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading
            theme="dark"
            eyebrow="Visual Tour"
            title={tab === "photos" ? "Plots & layouts" : "Video walkthroughs"}
            description={tab === "photos" ? "Click any image to view full size." : "Aerial tours, site walkthroughs, and investor stories."}
          />

          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full p-1" style={{ background: "rgba(12,24,20,0.80)", border: "1px solid rgba(34,211,238,0.15)" }}>
              {([
                { id: "photos" as const, icon: ImageIcon, label: "Photos" },
                { id: "videos" as const, icon: Video,     label: "YouTube Videos" },
              ]).map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className="flex items-center gap-2 rounded-full px-5 py-2.5 font-sans font-semibold transition-all duration-200"
                  style={{
                    fontSize: "0.875rem",
                    ...(tab === id
                      ? { background: "linear-gradient(135deg, #22D3EE 0%, #2A5C3F 100%)", color: "#F0FDF4", boxShadow: "0 4px 16px rgba(34,211,238,0.30)" }
                      : { background: "transparent", color: "rgba(240,253,244,0.55)" }),
                  }}
                >
                  <Icon style={{ width: 15, height: 15 }} /> {label}
                </button>
              ))}
            </div>
          </div>

          {tab === "photos" ? <PhotoGallery /> : <VideoGallery />}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(160deg, #0F2918 0%, #0891B2 100%)", padding: "5rem 0", position: "relative", overflow: "hidden" }}>
        <div className="orb-gold absolute" style={{ width: 250, height: 250, bottom: -60, right: "10%", opacity: 0.14 }} />
        <div className="container mx-auto px-4 md:px-8">
          <div className="rounded-[2rem] p-10 md:p-14 text-center relative overflow-hidden"
            style={{ background: "rgba(12,24,20,0.60)", border: "1px solid rgba(34,211,238,0.20)", backdropFilter: "blur(16px)" }}>
            <h2 className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "clamp(1.8rem,4vw,3rem)", letterSpacing: "-0.025em" }}>
              Like what you see?
            </h2>
            <p style={{ color: "rgba(240,253,244,0.68)", marginTop: "0.875rem", maxWidth: 480, margin: "0.875rem auto 0" }}>
              Schedule a free site visit and walk the land yourself — at no cost or obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/plots" className="btn btn-gold">Browse Plots</Link>
              <Link to="/contact" className="btn btn-ghost">Book Site Visit</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
