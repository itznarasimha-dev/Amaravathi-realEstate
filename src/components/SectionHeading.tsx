import { useRef } from "react";
import { useGsapCharReveal, useGsapReveal } from "@/hooks/use-gsap";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  theme = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  theme?: "light" | "dark";
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef  = useRef<HTMLParagraphElement>(null);

  useGsapCharReveal(titleRef, { stagger: 0.018 });
  useGsapReveal(descRef, { delay: 0.15, y: 22 });

  const isDark = theme === "dark";

  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={isDark ? "eyebrow-light mb-4" : "eyebrow mb-4"}
        >
          /{" "}{eyebrow}
        </p>
      )}

      {/*
        We render the raw title string as text content here.
        GSAP splitChars() will read el.textContent BEFORE replacing innerHTML,
        so the original text is always captured correctly — even across navigations
        because we store it in data-original-text on first run.
      */}
      <h2
        ref={titleRef}
        className="font-display"
        style={{
          color: isDark ? "#F0FDF4" : "var(--ink)",
          fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
          lineHeight: 1.06,
          letterSpacing: "-0.025em",
          fontWeight: 800,
          /* Ensure spaces inside the heading don't collapse */
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          ref={descRef}
          style={{
            color: isDark ? "rgba(240,253,244,0.68)" : "var(--ink-muted)",
            marginTop: "1rem",
            fontSize: "1rem",
            lineHeight: 1.75,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
