import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SplineStage } from "@/components/3d/SplineStage";
import { fadeUp, stagger } from "@/animations/motion";

export function ImmersivePageHero({
  eyebrow,
  title,
  description,
  scene,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  scene?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="container mx-auto grid min-h-[58vh] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.32em] text-cyan-200">
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 max-w-4xl text-balance text-5xl font-extrabold leading-[0.98] text-white md:text-7xl"
          >
            {title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            {description}
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -14 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel min-h-[360px] rounded-[2rem] p-2"
        >
          <SplineStage scene={scene} label="Interactive capital-region scene" />
        </motion.div>
      </div>
    </section>
  );
}
