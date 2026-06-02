import { useEffect, useRef } from "react";

let lenisInstance: InstanceType<typeof import("lenis").default> | null = null;

export function useLenis() {
  return lenisInstance;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let lenis: InstanceType<typeof import("lenis").default> | null = null;

    async function init() {
      try {
        const mod = await import("lenis");
        const Lenis = mod.default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.85,
        } as ConstructorParameters<typeof Lenis>[0]);
        lenisInstance = lenis;

        function raf(time: number) {
          lenis!.raf(time);
          rafRef.current = requestAnimationFrame(raf);
        }
        rafRef.current = requestAnimationFrame(raf);
      } catch {
        // Lenis unavailable — silent fallback
      }
    }

    init();

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis?.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
