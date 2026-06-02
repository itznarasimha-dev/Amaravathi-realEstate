import { motion } from "framer-motion";

/** Procedural fallback stage — no external Spline dependency needed */
export function SplineStage({ label }: { scene?: string; label: string }) {
  return (
    <div className="relative h-full min-h-[360px] w-full overflow-hidden rounded-[2rem]" style={{ background: "rgba(12,24,20,0.80)" }}>
      {/* Rotating ring */}
      <motion.div
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full"
        style={{ border: "1px solid rgba(34,211,238,0.20)", transformStyle: "preserve-3d" }}
      />
      {/* Floating gem */}
      <motion.div
        aria-hidden="true"
        animate={{ rotateY: [0, 360], rotateX: [12, 32, 12] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2"
        style={{
          transformStyle: "preserve-3d",
          clipPath: "polygon(50% 0%, 100% 30%, 82% 100%, 18% 100%, 0 30%)",
          background: "linear-gradient(135deg, rgba(34,211,238,0.80) 0%, rgba(42,92,63,0.50) 50%, rgba(201,151,58,0.70) 100%)",
          boxShadow: "0 0 60px rgba(34,211,238,0.45)",
        }}
      />
      {/* Particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          animate={{ y: [0, -16, 0], opacity: [0.2, 0.75, 0.2] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.18 }}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            left: `${14 + ((i * 37) % 76)}%`,
            top: `${16 + ((i * 23) % 68)}%`,
            background: (["#22D3EE", "#C9973A", "#2A5C3F"] as const)[i % 3],
            boxShadow: `0 0 10px ${(["rgba(34,211,238,0.7)", "rgba(201,151,58,0.7)", "rgba(42,92,63,0.7)"] as const)[i % 3]}`,
          }}
        />
      ))}
      {/* Label */}
      <div
        className="absolute inset-x-8 bottom-8 rounded-2xl px-4 py-3 text-center font-mono"
        style={{
          background: "rgba(12,24,20,0.80)",
          border: "1px solid rgba(34,211,238,0.18)",
          fontSize: "0.65rem",
          letterSpacing: "0.22em",
          color: "rgba(34,211,238,0.75)",
          textTransform: "uppercase",
          backdropFilter: "blur(8px)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
