import { motion, useScroll, useTransform } from "framer-motion";

export function AmbientScene() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 42]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        style={{ y, rotate }}
        className="absolute -right-20 top-24 h-96 w-96 rounded-full border border-cyan-300/10 bg-cyan-300/10 blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [120, -160]) }}
        className="absolute -left-20 top-1/2 h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/10 blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,oklch(1_0_0/.075),transparent_36%)]" />
      {Array.from({ length: 42 }).map((_, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          animate={{ y: [0, -22, 0], opacity: [0.16, 0.5, 0.16] }}
          transition={{ duration: 5 + (index % 7), repeat: Infinity, delay: index * 0.09 }}
          className="absolute h-px w-px rounded-full bg-white"
          style={{
            left: `${(index * 29) % 100}%`,
            top: `${(index * 47) % 100}%`,
            boxShadow: "0 0 12px oklch(0.8 0.18 205)",
          }}
        />
      ))}
    </div>
  );
}

