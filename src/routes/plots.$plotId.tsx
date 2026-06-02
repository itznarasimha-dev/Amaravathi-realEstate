import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Compass, Maximize2, BadgeCheck, Calendar, Phone, Share2, CheckCircle2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlotCard } from "@/components/PlotCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Card3D } from "@/components/motion/Card3D";
import { PLOTS, formatINR } from "@/data/plots";
import { toast } from "sonner";
import { z } from "zod";

const enquirySchema = z.object({
  name:    z.string().trim().min(2, "Name required").max(80),
  phone:   z.string().trim().regex(/^[+\d\s-]{8,15}$/, "Valid phone required"),
  email:   z.string().trim().email("Valid email required").max(120),
  message: z.string().trim().max(500).optional(),
});

export const Route = createFileRoute("/plots/$plotId")({
  loader: ({ params }): { plot: (typeof PLOTS)[number] } => {
    const plot = PLOTS.find((p) => p.id === params.plotId);
    if (!plot) throw notFound();
    return { plot };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.plot;
    if (!p) return { meta: [{ title: "Plot — Amaravathi Real Estate" }] };
    return {
      meta: [
        { title: `${p.title} — ${formatINR(p.price)} | Amaravathi Real Estate` },
        { name: "description", content: `${p.size} sq.yd ${p.facing}-facing ${p.approval} plot in ${p.location}.` },
        { property: "og:image", content: p.image },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: PlotDetail,
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-32 text-center" style={{ background: "var(--forest-deep)" }}>
      <h1 className="font-display font-bold" style={{ color: "#F0FDF4" }}>Plot not found</h1>
      <Link to="/plots" className="btn btn-tri inline-flex mt-6">Back to all plots</Link>
    </div>
  ),
});

function PlotDetail() {
  const { plot } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const similar = PLOTS.filter((p) => p.id !== plot.id && p.region === plot.region).slice(0, 3);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!enquirySchema.safeParse(data).success) { toast.error("Please fill all fields correctly."); return; }
    toast.success("Enquiry sent! Our team will reach out within 24 hours.");
    e.currentTarget.reset();
  };

  const shareWA = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${plot.title} — ${formatINR(plot.price)} ${window.location.href}`)}`, "_blank");
  };

  const inputStyle = { background: "rgba(34,211,238,0.06)", borderColor: "rgba(34,211,238,0.20)", color: "#F0FDF4" };
  const labelStyle = { color: "rgba(240,253,244,0.70)", fontSize: "0.8125rem", fontWeight: 500 };

  const ACCENT_FOR_SPEC = ["#22D3EE", "#C9973A", "#2A5C3F"];

  return (
    <div style={{ background: "var(--forest-deep)", minHeight: "100vh" }}>

      {/* Back link */}
      <div className="container mx-auto px-4 pt-8 md:px-8">
        <Link
          to="/plots"
          className="inline-flex items-center gap-2 font-mono transition-all duration-200"
          style={{ color: "rgba(240,253,244,0.50)", fontSize: "0.75rem", letterSpacing: "0.14em" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#22D3EE"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,253,244,0.50)"; }}
        >
          <ArrowLeft style={{ width: 14, height: 14 }} /> BACK TO ALL PLOTS
        </Link>
      </div>

      {/* Main grid */}
      <section className="container mx-auto grid gap-10 px-4 py-8 md:px-8 lg:grid-cols-[1.4fr_1fr] lg:py-12">

        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-[1.5rem]" style={{ border: "1px solid rgba(34,211,238,0.15)", boxShadow: "0 24px 60px rgba(34,211,238,0.10)" }}>
            <img
              src={plot.gallery[active]}
              alt={plot.title}
              className="aspect-[4/3] w-full object-cover transition-all duration-500"
              width={1280} height={960}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {plot.gallery.map((g: string, i: number) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="overflow-hidden rounded-xl transition-all duration-200"
                style={{
                  border: active === i ? "2px solid #22D3EE" : "2px solid transparent",
                  opacity: active === i ? 1 : 0.55,
                  boxShadow: active === i ? "0 0 0 3px rgba(34,211,238,0.20)" : "none",
                }}
              >
                <img src={g} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          {/* Approval badge */}
          <span className="badge badge-cyan inline-flex w-fit">
            <BadgeCheck style={{ width: 12, height: 12 }} /> {plot.approval} Approved
          </span>

          {/* Title */}
          <motion.h1
            className="font-display font-black"
            style={{ color: "#F0FDF4", fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.025em", lineHeight: 1.06 }}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
          >
            {plot.title}
          </motion.h1>

          <p className="flex items-center gap-2 font-sans text-sm" style={{ color: "rgba(240,253,244,0.55)" }}>
            <MapPin style={{ width: 14, height: 14, color: "#C9973A" }} /> {plot.location}
          </p>

          {/* Price panel */}
          <Card3D
            glowColor="tri"
            maxTilt={6}
            className="rounded-[1.4rem] p-6"
            style={{ background: "linear-gradient(135deg, #0891B2 0%, #0F2918 55%, #92600A 100%)" }}
          >
            <p className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.22em", color: "rgba(240,253,244,0.55)", textTransform: "uppercase" }}>Total Price</p>
            <p className="price-tag mt-2" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>{formatINR(plot.price)}</p>
            <p className="font-mono mt-1" style={{ fontSize: "0.75rem", color: "rgba(240,253,244,0.55)", letterSpacing: "0.06em" }}>
              ₹{plot.pricePerSqYd.toLocaleString("en-IN")} per sq.yd
            </p>
          </Card3D>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Maximize2, label: "Size",     value: `${plot.size} sq.yd` },
              { icon: Compass,   label: "Facing",   value: plot.facing },
              { icon: BadgeCheck,label: "Approval", value: plot.approval },
            ].map((s, i) => (
              <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "rgba(12,24,20,0.70)", border: `1px solid ${ACCENT_FOR_SPEC[i]}25` }}>
                <s.icon style={{ width: 18, height: 18, color: ACCENT_FOR_SPEC[i], margin: "0 auto 8px" }} />
                <p className="font-mono" style={{ fontSize: "0.58rem", letterSpacing: "0.18em", color: "rgba(240,253,244,0.38)", textTransform: "uppercase" }}>{s.label}</p>
                <p className="font-sans font-semibold mt-1" style={{ color: "#F0FDF4", fontSize: "0.82rem" }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 mt-1">
            <a href="tel:+919999999999" className="btn btn-tri flex-1 justify-center" style={{ fontSize: "0.875rem" }}>
              <Phone style={{ width: 15, height: 15 }} /> Call Now
            </a>
            <button onClick={shareWA} className="btn btn-ghost" style={{ padding: "0.72rem 1.1rem" }}>
              <Share2 style={{ width: 17, height: 17 }} />
            </button>
          </div>
        </div>
      </section>

      {/* Details + Form */}
      <section className="container mx-auto grid gap-10 px-4 py-8 md:px-8 lg:grid-cols-[1.4fr_1fr]">

        {/* Left: description, amenities, map */}
        <div className="space-y-12">
          {/* About */}
          <div>
            <h2 className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "1.7rem", letterSpacing: "-0.02em" }}>About this plot</h2>
            <div className="divider-tri w-20 mt-3 mb-5" />
            <p style={{ color: "rgba(240,253,244,0.65)", lineHeight: 1.8, fontSize: "0.95rem" }}>{plot.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "1.7rem", letterSpacing: "-0.02em" }}>Amenities</h2>
            <div className="divider-tri w-20 mt-3 mb-5" />
            <div className="grid gap-3 sm:grid-cols-2">
              {plot.amenities.map((a: string, i: number) => (
                <motion.div
                  key={a}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-3 rounded-xl p-3.5"
                  style={{ background: "rgba(12,24,20,0.70)", border: "1px solid rgba(34,211,238,0.12)" }}
                >
                  <CheckCircle2 style={{ width: 16, height: 16, color: "#22D3EE", flexShrink: 0 }} />
                  <span className="font-sans text-sm font-medium" style={{ color: "#F0FDF4" }}>{a}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "1.7rem", letterSpacing: "-0.02em" }}>Location</h2>
            <div className="divider-tri w-20 mt-3 mb-5" />
            <div className="overflow-hidden rounded-[1.25rem]" style={{ border: "1px solid rgba(34,211,238,0.15)", boxShadow: "0 12px 40px rgba(34,211,238,0.08)" }}>
              <iframe
                title="Plot location"
                src={`https://maps.google.com/maps?q=${plot.lat},${plot.lng}&z=14&output=embed`}
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Enquiry form */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <Card3D
            glowColor="cyan"
            maxTilt={5}
            className="rounded-[1.5rem] p-7"
            style={{ background: "rgba(12,24,20,0.88)", border: "1px solid rgba(34,211,238,0.18)" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Calendar style={{ width: 14, height: 14, color: "#22D3EE" }} />
              <p className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", color: "#22D3EE", textTransform: "uppercase" }}>Schedule Site Visit</p>
            </div>
            <h3 className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "1.5rem", letterSpacing: "-0.02em" }}>Enquire Now</h3>
            <p className="font-sans text-sm mt-1 mb-6" style={{ color: "rgba(240,253,244,0.50)" }}>We'll contact you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: "name",  label: "Full Name", type: "text",  placeholder: "Your full name" },
                { id: "phone", label: "Phone",     type: "tel",   placeholder: "+91 99999 99999" },
                { id: "email", label: "Email",     type: "email", placeholder: "you@example.com" },
              ].map((f) => (
                <div key={f.id}>
                  <Label htmlFor={f.id} style={labelStyle}>{f.label}</Label>
                  <Input id={f.id} name={f.id} type={f.type} placeholder={f.placeholder} required className="mt-1.5 h-11 rounded-xl text-sm" style={inputStyle} />
                </div>
              ))}
              <div>
                <Label htmlFor="message" style={labelStyle}>Message (optional)</Label>
                <Textarea id="message" name="message" rows={3} placeholder="When would you like to visit?" className="mt-1.5 rounded-xl text-sm" style={inputStyle} />
              </div>
              <button type="submit" className="btn btn-tri w-full justify-center h-12 text-sm">Send Enquiry</button>
            </form>
          </Card3D>
        </aside>
      </section>

      {/* Similar plots */}
      {similar.length > 0 && (
        <section style={{ background: "linear-gradient(160deg, #0F2918 0%, #0891B2 100%)", padding: "5rem 0", position: "relative", overflow: "hidden" }}>
          <div className="orb-gold absolute" style={{ width: 250, height: 250, top: -60, right: "15%", opacity: 0.14 }} />
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeading theme="dark" align="left" eyebrow="More options" title="Similar plots nearby" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p, i) => <PlotCard key={p.id} plot={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
