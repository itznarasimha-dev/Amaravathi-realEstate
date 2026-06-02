import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { X, MapPin } from "lucide-react";
import { PLOTS } from "@/data/plots";

const FILTERS = ["All", "Amaravathi", "Vijayawada", "Guntur"] as const;
type Filter = (typeof FILTERS)[number];

interface Item { src: string; title: string; location: string; region: string; plotId: string; }

const ACCENT_MAP: Record<string, string> = {
  All: "#22D3EE", Amaravathi: "#22D3EE", Vijayawada: "#C9973A", Guntur: "#2A5C3F",
};

export function PhotoGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<Item | null>(null);

  const items = useMemo<Item[]>(() => {
    const all: Item[] = [];
    PLOTS.forEach((p) => {
      [p.image, ...(p.gallery || [])].forEach((src) => {
        all.push({ src, title: p.title, location: p.location, region: p.region, plotId: p.id });
      });
    });
    return all;
  }, []);

  const filtered = filter === "All" ? items : items.filter((i) => i.region === filter);

  const filterBtn = (f: Filter) => ({
    style:
      filter === f
        ? { background: `linear-gradient(135deg, #22D3EE 0%, #2A5C3F 100%)`, color: "#F0FDF4", border: "none", fontSize: "0.72rem", letterSpacing: "0.14em", borderRadius: "99px", padding: "0.45rem 1rem", fontFamily: "var(--font-mono)" }
        : { background: "transparent", color: "rgba(240,253,244,0.52)", border: "1px solid rgba(34,211,238,0.20)", fontSize: "0.72rem", letterSpacing: "0.14em", borderRadius: "99px", padding: "0.45rem 1rem", fontFamily: "var(--font-mono)" },
    onClick: () => setFilter(f),
  });

  return (
    <>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => <button key={f} {...filterBtn(f)}>{f}</button>)}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
        {filtered.map((item, i) => (
          <motion.button
            key={`${item.plotId}-${i}`}
            onClick={() => setLightbox(item)}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: (i % 8) * 0.04 }}
            className={`group relative overflow-hidden rounded-[1.1rem] ${i % 7 === 0 ? "row-span-2 aspect-[3/5]" : "aspect-square"}`}
            style={{ border: "1px solid rgba(34,211,238,0.10)" }}
          >
            <img
              src={item.src} alt={item.title} loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "linear-gradient(to top, rgba(12,24,20,0.92) 0%, rgba(12,24,20,0.40) 55%, transparent 100%)" }}
            />
            <div className="absolute inset-x-0 bottom-0 p-4 text-left translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-display font-bold text-sm line-clamp-1" style={{ color: "#F0FDF4" }}>{item.title}</p>
              <p className="mt-1 flex items-center gap-1 font-mono" style={{ fontSize: "0.65rem", color: "#22D3EE", letterSpacing: "0.08em" }}>
                <MapPin style={{ width: 10, height: 10 }} /> {item.location}
              </p>
            </div>
            {/* Cyan top accent on hover */}
            <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(90deg, #22D3EE, #2A5C3F, #C9973A)" }} />
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center font-mono" style={{ color: "rgba(240,253,244,0.40)", fontSize: "0.8rem", letterSpacing: "0.14em" }}>
          NO IMAGES FOR THIS REGION YET
        </p>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(12,24,20,0.96)", backdropFilter: "blur(20px)" }}
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200"
              style={{ background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.25)", color: "#22D3EE" }}
            >
              <X style={{ width: 18, height: 18 }} />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-5xl w-full overflow-hidden rounded-[1.5rem]"
              style={{ border: "1px solid rgba(34,211,238,0.18)", boxShadow: "0 40px 100px rgba(34,211,238,0.15)" }}
            >
              <img src={lightbox.src} alt={lightbox.title} className="max-h-[72vh] w-full object-contain" style={{ background: "#0C1814" }} />
              <div
                className="flex flex-wrap items-center justify-between gap-4 p-5"
                style={{ background: "rgba(12,24,20,0.95)", borderTop: "1px solid rgba(34,211,238,0.14)" }}
              >
                <div>
                  <p className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "1.1rem" }}>{lightbox.title}</p>
                  <p className="mt-1 flex items-center gap-1 font-mono" style={{ fontSize: "0.65rem", color: "#22D3EE", letterSpacing: "0.1em" }}>
                    <MapPin style={{ width: 10, height: 10 }} />{lightbox.location}
                  </p>
                </div>
                <Link
                  to="/plots/$plotId"
                  params={{ plotId: lightbox.plotId }}
                  onClick={() => setLightbox(null)}
                  className="btn btn-cyan"
                  style={{ padding: "0.6rem 1.4rem", fontSize: "0.8rem" }}
                >
                  View Plot Details
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
