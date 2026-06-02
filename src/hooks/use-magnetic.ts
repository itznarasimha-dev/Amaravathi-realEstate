import { useCallback, useRef } from "react";
import type { MouseEvent } from "react";

export function useMagnetic(strength = 0.22) {
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * strength;
      const y = (event.clientY - rect.top - rect.height / 2) * strength;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    [strength],
  );

  const onMouseLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    element.style.transform = "translate3d(0, 0, 0)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
