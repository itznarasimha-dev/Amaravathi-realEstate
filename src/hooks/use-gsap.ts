import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits the text content of an element into per-character spans.
 * Spaces are preserved as real " " text so word-wrapping works correctly.
 * The original text is stored on the element so re-runs stay idempotent.
 */
export function splitChars(el: HTMLElement) {
  // Restore original text if this element was already split before
  const original = el.dataset.originalText ?? el.textContent ?? "";
  el.dataset.originalText = original;

  el.innerHTML = original
    .split("")
    .map((ch) => {
      if (ch === " ") {
        // Real space — preserve as a text node via &nbsp; substitute
        // We use a span with a normal space inside so CSS word-wrap still works
        return `<span aria-hidden="true" style="display:inline"> </span>`;
      }
      return `<span style="display:inline-block;overflow:hidden;vertical-align:bottom">`
        + `<span class="gsap-char-inner" style="display:inline-block">${ch}</span>`
        + `</span>`;
    })
    .join("");

  return el.querySelectorAll<HTMLElement>(".gsap-char-inner");
}

export function useGsapCharReveal(
  ref: React.RefObject<HTMLElement | null>,
  opts: { delay?: number; stagger?: number } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = splitChars(el);
    if (!chars.length) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });

    tl.fromTo(
      chars,
      { yPercent: 115, opacity: 0, skewX: 5 },
      {
        yPercent: 0,
        opacity: 1,
        skewX: 0,
        duration: 0.60,
        ease: "power3.out",
        stagger: opts.stagger ?? 0.022,
        delay: opts.delay ?? 0,
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function useGsapWordReveal(
  ref: React.RefObject<HTMLElement | null>,
  opts: { delay?: number; stagger?: number } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const original = el.dataset.originalText ?? el.textContent ?? "";
    el.dataset.originalText = original;

    el.innerHTML = original
      .split(" ")
      .map(
        (w) =>
          `<span style="overflow:hidden;display:inline-block;margin-right:0.28em;vertical-align:bottom">` +
          `<span class="word-inner" style="display:inline-block">${w}</span>` +
          `</span>`
      )
      .join("");

    const inners = el.querySelectorAll<HTMLElement>(".word-inner");
    if (!inners.length) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });

    tl.fromTo(
      inners,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power4.out",
        stagger: opts.stagger ?? 0.06,
        delay: opts.delay ?? 0,
      }
    );

    return () => { tl.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function useGsapReveal(
  ref: React.RefObject<HTMLElement | null>,
  opts: { delay?: number; y?: number } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: opts.y ?? 36, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
        delay: opts.delay ?? 0,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      }
    );

    return () => { tween.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function useGsapStagger(
  containerRef: React.RefObject<HTMLElement | null>,
  selector: string,
  opts: { stagger?: number; delay?: number; y?: number } = {}
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = el.querySelectorAll(selector);
    if (!items.length) return;

    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: opts.y ?? 32, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.65,
        ease: "power3.out",
        stagger: opts.stagger ?? 0.1,
        delay: opts.delay ?? 0,
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      }
    );

    return () => { tween.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function useGsapCounter(
  ref: React.RefObject<HTMLElement | null>,
  end: number,
  opts: { duration?: number; prefix?: string; suffix?: string } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: end,
      duration: opts.duration ?? 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = `${opts.prefix ?? ""}${Math.round(obj.val).toLocaleString("en-IN")}${opts.suffix ?? ""}`;
      },
    });

    return () => { tween.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end]);
}
