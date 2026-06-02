import { useRef, useCallback, type ReactNode, type CSSProperties } from "react";

type GlowColor = "cyan" | "gold" | "forest" | "tri";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTilt?: number;
  glowColor?: GlowColor;
}

const GLOW_MAP: Record<GlowColor, string> = {
  cyan:   "rgba(34,211,238,0.55)",
  gold:   "rgba(201,151,58,0.55)",
  forest: "rgba(42,92,63,0.55)",
  tri:    "rgba(34,211,238,0.40)",
};

const BORDER_MAP: Record<GlowColor, string> = {
  cyan:   "linear-gradient(90deg, transparent, #22D3EE, transparent)",
  gold:   "linear-gradient(90deg, transparent, #C9973A, transparent)",
  forest: "linear-gradient(90deg, transparent, #2A5C3F, transparent)",
  tri:    "linear-gradient(90deg, #22D3EE, #2A5C3F, #C9973A)",
};

export function Card3D({
  children,
  className = "",
  style,
  maxTilt = 14,
  glowColor = "cyan",
}: Card3DProps) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const card  = cardRef.current;
        const shine = shineRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const px   = (e.clientX - rect.left) / rect.width;
        const py   = (e.clientY - rect.top)  / rect.height;
        const rotX = (0.5 - py) * maxTilt;
        const rotY = (px - 0.5) * maxTilt;

        card.style.transform  = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px)`;
        card.style.boxShadow  = `${-rotY * 2}px ${rotX * 2}px 60px -10px ${GLOW_MAP[glowColor]}, 0 28px 70px -14px rgba(12,24,20,0.24)`;

        if (shine) {
          shine.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)`;
          shine.style.opacity    = "1";
        }
      });
    },
    [maxTilt, glowColor]
  );

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const card  = cardRef.current;
    const shine = shineRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    card.style.boxShadow = "0 8px 32px -8px rgba(12,24,20,0.14)";
    if (shine) shine.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden will-change-transform ${className}`}
      style={{
        transition: "box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)",
        transformStyle: "preserve-3d",
        boxShadow: "0 8px 32px -8px rgba(12,24,20,0.14)",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shine overlay */}
      <div
        ref={shineRef}
        style={{
          position: "absolute", inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 10, opacity: 0,
          transition: "opacity 0.18s ease",
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "1.5px",
          background: BORDER_MAP[glowColor],
          opacity: 0.75,
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {children}
    </div>
  );
}
