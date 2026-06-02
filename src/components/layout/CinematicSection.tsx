import type { ReactNode } from "react";

export function CinematicSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden py-20 md:py-28 ${className}`}>
      <div className="absolute inset-x-0 top-0 light-line opacity-60" />
      <div className="container relative z-10 mx-auto px-4 md:px-8">{children}</div>
    </section>
  );
}

