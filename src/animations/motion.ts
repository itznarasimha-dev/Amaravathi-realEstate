export const easeOutExpo  = [0.16, 1, 0.3, 1] as const;
export const easeInOutCubic = [0.65, 0, 0.35, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.75, ease: easeOutExpo },
  },
};

export const fadeIn = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  show: {
    opacity: 1, filter: "blur(0px)",
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88, rotateX: 12 },
  show: {
    opacity: 1, scale: 1, rotateX: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  animate: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.55, ease: easeOutExpo },
  },
  exit: {
    opacity: 0, y: -8, filter: "blur(4px)",
    transition: { duration: 0.28, ease: easeInOutCubic },
  },
};
