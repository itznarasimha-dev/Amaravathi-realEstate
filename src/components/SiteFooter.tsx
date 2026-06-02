import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer style={{ background: "var(--forest-deep)", color: "#F0FDF4", position: "relative", overflow: "hidden" }}>
      {/* 3-color top line */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, #22D3EE 0%, #2A5C3F 50%, #C9973A 100%)" }} />

      {/* Glow orbs */}
      <div className="orb-cyan" style={{ width: 360, height: 360, top: -100, left: -100, opacity: 0.18 }} />
      <div className="orb-gold" style={{ width: 280, height: 280, bottom: -60, right: -60, opacity: 0.15 }} />

      <div className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-4 md:px-8" style={{ position: "relative", zIndex: 1 }}>

        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: "linear-gradient(135deg, #22D3EE 0%, #2A5C3F 50%, #C9973A 100%)", boxShadow: "0 8px 24px rgba(34,211,238,0.30)" }}
            >
              <MapPin style={{ width: 18, height: 18, color: "#F0FDF4" }} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "1rem", letterSpacing: "-0.02em" }}>AMARAVATHI</span>
              <span className="font-mono" style={{ color: "#22D3EE", fontSize: "0.6rem", letterSpacing: "0.24em", marginTop: 1 }}>REAL ESTATE</span>
            </div>
          </div>
          <p style={{ color: "rgba(240,253,244,0.60)", fontSize: "0.875rem", lineHeight: 1.7 }}>
            Premium open plots in Andhra Pradesh's new capital region. DTCP & RERA approved layouts, built for long-term investors.
          </p>
          <div className="flex gap-3 mt-6">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200"
                style={{ border: "1px solid rgba(34,211,238,0.15)", background: "rgba(34,211,238,0.06)", color: "rgba(240,253,244,0.65)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(34,211,238,0.16)";
                  el.style.borderColor = "rgba(34,211,238,0.40)";
                  el.style.color = "#22D3EE";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(34,211,238,0.06)";
                  el.style.borderColor = "rgba(34,211,238,0.15)";
                  el.style.color = "rgba(240,253,244,0.65)";
                }}
              >
                <Icon style={{ width: 15, height: 15 }} />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-display font-semibold mb-5" style={{ color: "#22D3EE", fontSize: "1.05rem" }}>Explore</h4>
          <ul className="space-y-3" style={{ fontSize: "0.875rem" }}>
            {["/", "/plots", "/gallery", "/blog", "/about", "/contact"].map((to, i) => {
              const labels = ["Home", "All Plots", "Gallery", "Blog", "About Us", "Contact"];
              return (
                <li key={to}>
                  <Link
                    to={to as any}
                    style={{ color: "rgba(240,253,244,0.62)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#22D3EE"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,253,244,0.62)"; }}
                  >
                    {labels[i]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold mb-5" style={{ color: "#C9973A", fontSize: "1.05rem" }}>Contact</h4>
          <ul className="space-y-4" style={{ fontSize: "0.875rem" }}>
            <li className="flex items-start gap-3" style={{ color: "rgba(240,253,244,0.62)" }}>
              <MapPin style={{ width: 15, height: 15, color: "#C9973A", flexShrink: 0, marginTop: 2 }} />
              <span style={{ lineHeight: 1.65 }}>Capital Region Office,<br />Vijayawada – Amaravathi Road,<br />Andhra Pradesh, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone style={{ width: 15, height: 15, color: "#22D3EE", flexShrink: 0 }} />
              <a href="tel:+919999999999" style={{ color: "rgba(240,253,244,0.62)", transition: "color 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#22D3EE"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,253,244,0.62)"; }}>
                +91 99999 99999
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail style={{ width: 15, height: 15, color: "#2A5C3F", flexShrink: 0 }} />
              <a href="mailto:hello@amaravathirealestate.in" style={{ color: "rgba(240,253,244,0.62)", transition: "color 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#C9973A"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,253,244,0.62)"; }}>
                hello@amaravathirealestate.in
              </a>
            </li>
          </ul>
        </div>

        {/* Compliance */}
        <div>
          <h4 className="font-display font-semibold mb-5" style={{ color: "#2A5C3F", fontSize: "1.05rem" }}>Compliance</h4>
          <div
            className="rounded-2xl p-5 space-y-3"
            style={{ background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.12)" }}
          >
            {[
              { label: "RERA No.", value: "P02400000000", c: "#22D3EE" },
              { label: "DTCP", value: "Approved Layouts", c: "#2A5C3F" },
              { label: "Since", value: "2014", c: "#C9973A" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: "rgba(240,253,244,0.38)", textTransform: "uppercase" }}>{item.label}</span>
                <span className="font-semibold" style={{ fontSize: "0.8rem", color: item.c }}>{item.value}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "1rem", fontSize: "0.7rem", color: "rgba(240,253,244,0.35)", lineHeight: 1.6 }}>
            All properties verified by a registered advocate. Prices subject to change.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: "1px solid rgba(34,211,238,0.10)", position: "relative", zIndex: 1 }}>
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 md:flex-row md:px-8"
          style={{ fontSize: "0.75rem", color: "rgba(240,253,244,0.32)", fontFamily: "var(--font-mono)" }}>
          <p>© {new Date().getFullYear()} Amaravathi Real Estate. All rights reserved.</p>
          <p>Crafted for the future capital of Andhra Pradesh.</p>
        </div>
      </div>
    </footer>
  );
}
