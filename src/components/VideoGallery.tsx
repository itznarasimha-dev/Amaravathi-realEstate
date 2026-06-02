import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Play, Clock } from "lucide-react";
import { VIDEOS, type VideoItem } from "@/data/videos";

const FILTERS = ["All", "Amaravathi", "Vijayawada", "Guntur", "General"] as const;
type Filter = (typeof FILTERS)[number];

const REGION_COLOR: Record<string, string> = {
  Amaravathi: "#22D3EE", Vijayawada: "#C9973A", Guntur: "#2A5C3F", General: "#22D3EE",
};

export function VideoGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<VideoItem | null>(null);

  const filtered = filter === "All" ? VIDEOS : VIDEOS.filter((v) => v.region === filter);

  return (
    <>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={
              filter === f
                ? { background: "linear-gradient(135deg, #22D3EE 0%, #2A5C3F 100%)", color: "#F0FDF4", border: "none", fontSize: "0.72rem", letterSpacing: "0.14em", borderRadius: "99px", padding: "0.45rem 1rem", fontFamily: "var(--font-mono)" }
                : { background: "transparent", color: "rgba(240,253,244,0.52)", border: "1px solid rgba(34,211,238,0.20)", fontSize: "0.72rem", letterSpacing: "0.14em", borderRadius: "99px", padding: "0.45rem 1rem", fontFamily: "var(--font-mono)" }
            }
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((v, i) => (
          <motion.button
            key={v.id}
            onClick={() => setActive(v)}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: (i % 6) * 0.06 }}
            className="group overflow-hidden rounded-[1.3rem] text-left transition-all duration-300"
            style={{
              background: "rgba(12,24,20,0.82)",
              border: `1px solid ${(REGION_COLOR[v.region] ?? "#22D3EE")}22`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${(REGION_COLOR[v.region] ?? "#22D3EE")}20`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {/* Thumbnail */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", background: "#0C1814" }}>
              <img
                src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                alt={v.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,24,20,0.75) 0%, transparent 60%)" }} />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #22D3EE 0%, #2A5C3F 50%, #C9973A 100%)",
                    boxShadow: "0 12px 36px rgba(34,211,238,0.40)",
                  }}
                  whileHover={{ scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Play style={{ width: 22, height: 22, fill: "#F0FDF4", color: "#F0FDF4", marginLeft: 3 }} />
                </motion.span>
              </div>

              {/* Duration */}
              {v.duration && (
                <span
                  className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono"
                  style={{ background: "rgba(12,24,20,0.88)", color: "#22D3EE", fontSize: "0.65rem", letterSpacing: "0.1em", backdropFilter: "blur(8px)" }}
                >
                  <Clock style={{ width: 10, height: 10 }} /> {v.duration}
                </span>
              )}

              {/* Region badge */}
              <span
                className="absolute left-3 top-3 rounded-lg px-2.5 py-1 font-mono"
                style={{
                  background: `${REGION_COLOR[v.region] ?? "#22D3EE"}20`,
                  border: `1px solid ${REGION_COLOR[v.region] ?? "#22D3EE"}40`,
                  color: REGION_COLOR[v.region] ?? "#22D3EE",
                  fontSize: "0.62rem",
                  letterSpacing: "0.15em",
                  backdropFilter: "blur(8px)",
                  textTransform: "uppercase",
                }}
              >
                {v.region}
              </span>

              {/* Top gradient line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(90deg, #22D3EE, #2A5C3F, #C9973A)" }} />
            </div>

            {/* Text */}
            <div className="p-5">
              <h3 className="font-display font-bold line-clamp-2" style={{ color: "#F0FDF4", fontSize: "1.05rem", letterSpacing: "-0.015em" }}>
                {v.title}
              </h3>
              <p className="mt-2 line-clamp-2" style={{ color: "rgba(240,253,244,0.52)", fontSize: "0.85rem", lineHeight: 1.65 }}>
                {v.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center font-mono" style={{ color: "rgba(240,253,244,0.40)", fontSize: "0.8rem", letterSpacing: "0.14em" }}>
          NO VIDEOS FOR THIS REGION YET
        </p>
      )}

      {/* Video modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(12,24,20,0.96)", backdropFilter: "blur(24px)" }}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.25)", color: "#22D3EE" }}
            >
              <X style={{ width: 18, height: 18 }} />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl overflow-hidden rounded-[1.5rem]"
              style={{ border: "1px solid rgba(34,211,238,0.18)", boxShadow: "0 40px 100px rgba(34,211,238,0.15)" }}
            >
              {/* Top tricolor bar */}
              <div style={{ height: "3px", background: "linear-gradient(90deg, #22D3EE, #2A5C3F, #C9973A)" }} />
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <div className="p-5" style={{ background: "rgba(12,24,20,0.95)", borderTop: "1px solid rgba(34,211,238,0.14)" }}>
                <p className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "1.1rem" }}>{active.title}</p>
                <p className="mt-1" style={{ color: "rgba(240,253,244,0.52)", fontSize: "0.875rem" }}>{active.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
