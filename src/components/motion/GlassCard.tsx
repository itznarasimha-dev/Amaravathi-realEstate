import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { scaleIn } from "@/animations/motion";

export function GlassCard({
  className = "",
  children,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: -5,
        transition: { duration: 0.32 },
      }}
      className={`glass-panel scene-perspective rounded-2xl ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

