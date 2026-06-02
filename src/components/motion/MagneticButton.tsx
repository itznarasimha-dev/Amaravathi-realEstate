import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { ComponentProps, ReactNode, Ref } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";

type AnchorProps = ComponentProps<"a"> & {
  children: ReactNode;
  to?: string;
  glow?: "cyan" | "purple" | "gold";
};

export function MagneticButton({
  children,
  className = "",
  glow = "cyan",
  to,
  href,
  ...props
}: AnchorProps) {
  const magnetic = useMagnetic(0.18);
  const glowClass =
    glow === "gold"
      ? "from-gold/90 via-white/80 to-gold-deep/90 text-background"
      : glow === "purple"
        ? "from-fuchsia-400 via-violet-300 to-cyan-300 text-background"
        : "from-cyan-300 via-sky-300 to-fuchsia-300 text-background";

  const content = (
    <motion.span
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r px-5 py-2.5 text-sm font-bold shadow-soft transition-smooth ${glowClass} ${className}`}
    >
      <span className="absolute inset-0 translate-x-[-80%] bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition-smooth group-hover:translate-x-[80%] group-hover:opacity-100" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.span>
  );

  const shared = {
    ...props,
    ref: magnetic.ref as Ref<HTMLAnchorElement>,
    onMouseMove: magnetic.onMouseMove,
    onMouseLeave: magnetic.onMouseLeave,
    className: "group inline-flex transition-transform duration-300 ease-out will-change-transform",
  };

  if (to) {
    return (
      <Link to={to as any} {...(shared as any)}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} {...shared}>
      {content}
    </a>
  );
}
