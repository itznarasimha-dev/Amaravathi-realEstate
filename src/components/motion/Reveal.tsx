import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { fadeUp } from "@/animations/motion";

export function Reveal({ className = "", children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

