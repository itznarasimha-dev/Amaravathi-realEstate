import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, MapPin } from "lucide-react";

const NAV = [
  { to: "/",        label: "Home" },
  { to: "/plots",   label: "Plots" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog",    label: "Blog" },
  { to: "/about",   label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: scrolled ? "rgba(12,24,20,0.95)" : "rgba(12,24,20,0.80)",
        borderBottom: "1px solid rgba(34,211,238,0.13)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        boxShadow: scrolled ? "0 2px 32px rgba(34,211,238,0.08)" : "none",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="container mx-auto flex h-[4.25rem] items-center justify-between gap-6 px-4 md:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #22D3EE 0%, #2A5C3F 50%, #C9973A 100%)",
              boxShadow: "0 8px 28px rgba(34,211,238,0.35)",
            }}
          >
            <MapPin style={{ width: 18, height: 18, color: "#F0FDF4" }} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "1rem", letterSpacing: "-0.02em" }}>
              AMARAVATHI
            </span>
            <span className="font-mono" style={{ color: "#22D3EE", fontSize: "0.6rem", letterSpacing: "0.24em", marginTop: 1 }}>
              REAL ESTATE
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200"
              style={{ color: "rgba(240,253,244,0.65)" }}
              activeProps={{ style: { color: "#22D3EE", fontWeight: 600, background: "rgba(34,211,238,0.10)" } }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <Link
            to="/contact"
            className="btn btn-tri"
            style={{ padding: "0.55rem 1.4rem", fontSize: "0.8rem" }}
          >
            Book Site Visit
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-xl"
          style={{ color: "#22D3EE" }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ borderTop: "1px solid rgba(34,211,238,0.13)", background: "rgba(12,24,20,0.97)", backdropFilter: "blur(24px)" }}>
          <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium transition-all"
                style={{ color: "rgba(240,253,244,0.70)" }}
                activeProps={{ style: { color: "#22D3EE", fontWeight: 600, background: "rgba(34,211,238,0.10)" } }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-3 btn btn-tri justify-center" style={{ fontSize: "0.875rem" }}>
              Book Site Visit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
