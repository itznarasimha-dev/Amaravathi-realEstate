import { Link } from "@tanstack/react-router";
import { MapPin, Compass, Maximize2, BadgeCheck, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card3D } from "@/components/motion/Card3D";
import type { Plot } from "@/data/plots";
import { formatINR } from "@/data/plots";

const GLOWS = ["cyan", "gold", "forest", "cyan"] as const;

export function PlotCard({ plot, index = 0 }: { plot: Plot; index?: number }) {
  const glow = GLOWS[index % GLOWS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card3D
        glowColor={glow}
        maxTilt={12}
        className="rounded-[1.4rem] overflow-hidden"
        style={{ background: "#ffffff", border: "1px solid rgba(34,211,238,0.12)" }}
      >
        <Link to="/plots/$plotId" params={{ plotId: plot.id }} className="block">

          {/* Image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", background: "#0F2918" }}>
            <img
              src={plot.image}
              alt={plot.title}
              loading="lazy"
              className="h-full w-full object-cover"
              style={{ transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.07)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            />

            {/* Approval badge */}
            <div
              className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                background: "rgba(15,41,24,0.88)",
                border: "1px solid rgba(34,211,238,0.30)",
                backdropFilter: "blur(12px)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.16em",
                color: "#22D3EE",
                textTransform: "uppercase",
              }}
            >
              <BadgeCheck style={{ width: 11, height: 11 }} />
              {plot.approval}
            </div>

            {/* Price overlay */}
            <div
              className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-10"
              style={{ background: "linear-gradient(to top, rgba(15,41,24,0.97) 0%, rgba(15,41,24,0.65) 55%, transparent 100%)" }}
            >
              <p className="price-tag">{formatINR(plot.price)}</p>
              <p
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(240,253,244,0.55)", letterSpacing: "0.06em", marginTop: 2 }}
              >
                ₹{plot.pricePerSqYd.toLocaleString("en-IN")} / sq.yd
              </p>
            </div>
          </div>

          {/* Card body */}
          <div className="p-5" style={{ background: "rgba(12,24,20,0.88)" }}>
            <div className="flex items-start justify-between gap-2">
              <h3
                className="font-display font-bold leading-tight line-clamp-1 flex-1"
                style={{ color: "#F0FDF4", fontSize: "1.1rem", letterSpacing: "-0.018em" }}
              >
                {plot.title}
              </h3>
              <ArrowUpRight
                style={{ width: 15, height: 15, color: "#22D3EE", flexShrink: 0, marginTop: 2 }}
              />
            </div>

            <p
              className="mt-2 flex items-center gap-1.5 text-sm line-clamp-1"
              style={{ color: "rgba(240,253,244,0.50)", fontFamily: "var(--font-sans)" }}
            >
              <MapPin style={{ width: 12, height: 12, flexShrink: 0, color: "#C9973A" }} />
              {plot.location}
            </p>

            {/* Specs */}
            <div
              className="mt-4 grid grid-cols-2 gap-2 pt-4"
              style={{ borderTop: "1px solid rgba(34,211,238,0.10)" }}
            >
              <span
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2"
                style={{
                  background: "rgba(34,211,238,0.07)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.06em",
                  color: "#F0FDF4",
                }}
              >
                <Maximize2 style={{ width: 12, height: 12, color: "#22D3EE" }} />
                {plot.size} sq.yd
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2"
                style={{
                  background: "rgba(42,92,63,0.10)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.06em",
                  color: "#F0FDF4",
                }}
              >
                <Compass style={{ width: 12, height: 12, color: "#2A5C3F" }} />
                {plot.facing}
              </span>
            </div>
          </div>
        </Link>
      </Card3D>
    </motion.div>
  );
}
