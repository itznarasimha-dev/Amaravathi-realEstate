import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card3D } from "@/components/motion/Card3D";
import { useGsapCharReveal } from "@/hooks/use-gsap";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name:    z.string().trim().min(2),
  phone:   z.string().trim().regex(/^[+\d\s-]{8,15}$/),
  email:   z.string().trim().email(),
  message: z.string().trim().min(5).max(800),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Amaravathi Real Estate" },
      { name: "description", content: "Schedule a free site visit or get in touch with our team." },
    ],
  }),
  component: ContactPage,
});

const INFO = [
  { icon: Phone,         title: "Call us",       text: "+91 99999 99999",                href: "tel:+919999999999",                          sub: "Mon–Sat, 9 AM – 7 PM",     c: "#22D3EE", glow: "cyan" as const   },
  { icon: MessageCircle, title: "WhatsApp",      text: "Chat instantly",                  href: "https://wa.me/919999999999",                  sub: "Fast replies, anytime",    c: "#2A5C3F", glow: "forest" as const },
  { icon: Mail,          title: "Email",         text: "hello@amaravathirealestate.in",   href: "mailto:hello@amaravathirealestate.in",        sub: "Reply within 24 hrs",      c: "#C9973A", glow: "gold" as const   },
  { icon: MapPin,        title: "Office",        text: "Capital Region, Vijayawada–Amaravathi Rd", href: "#map",                              sub: "Walk-ins welcome",         c: "#22D3EE", glow: "cyan" as const   },
  { icon: Clock,         title: "Working Hours", text: "Mon – Sat: 9 AM – 7 PM",         href: undefined,                                    sub: "Sunday by appointment",    c: "#C9973A", glow: "gold" as const   },
];

function ContactPage() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  useGsapCharReveal(h1Ref, { stagger: 0.022 });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!schema.safeParse(data).success) { toast.error("Please fill all fields correctly."); return; }
    toast.success("Message received! We'll reach out shortly.");
    e.currentTarget.reset();
  };

  const inputCls = "mt-1.5 h-11 rounded-xl text-sm";
  const inputStyle = { background: "rgba(34,211,238,0.06)", borderColor: "rgba(34,211,238,0.20)", color: "#F0FDF4" };
  const labelStyle = { color: "rgba(240,253,244,0.70)", fontSize: "0.8125rem", fontWeight: 500 };

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, #0891B2 0%, #0F2918 100%)", padding: "5rem 0 4rem", position: "relative", overflow: "hidden" }}>
        <div className="orb-gold absolute" style={{ width: 280, height: 280, top: -60, right: "10%", opacity: 0.15 }} />
        <div className="container mx-auto px-4 md:px-8" style={{ position: "relative", zIndex: 1 }}>
          <motion.p className="eyebrow-light mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>/ Get in Touch</motion.p>
          <h1 ref={h1Ref} className="font-display font-black" style={{ color: "#F0FDF4", fontSize: "clamp(2.4rem,6vw,5rem)", letterSpacing: "-0.03em", lineHeight: 1.02 }}>
            Let's talk land.
          </h1>
          <p style={{ color: "rgba(240,253,244,0.65)", marginTop: "1rem", maxWidth: 500, fontSize: "1rem" }}>
            Whether you're a first-time investor or expanding your portfolio, our team is ready.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: "var(--forest-deep)", padding: "5rem 0" }}>
        <div className="container mx-auto grid gap-10 px-4 md:px-8 lg:grid-cols-[1fr_1.35fr]">

          {/* Info cards */}
          <div className="space-y-4">
            {INFO.map((c, i) => {
              const Tag = c.href ? "a" : "div";
              return (
                <motion.div key={c.title} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}>
                  <Card3D glowColor={c.glow} maxTilt={8} className="rounded-[1.1rem]" style={{ background: "rgba(12,24,20,0.80)", border: `1px solid ${c.c}20` }}>
                    <Tag href={c.href as string} className="flex gap-4 p-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: `${c.c}18`, border: `1px solid ${c.c}35` }}>
                        <c.icon style={{ width: 18, height: 18, color: c.c }} />
                      </div>
                      <div>
                        <p className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.20em", color: c.c, textTransform: "uppercase", marginBottom: 4 }}>{c.title}</p>
                        <p className="font-sans font-semibold" style={{ color: "#F0FDF4", fontSize: "0.9rem" }}>{c.text}</p>
                        {c.sub && <p className="font-mono" style={{ color: "rgba(240,253,244,0.42)", fontSize: "0.68rem", marginTop: 2 }}>{c.sub}</p>}
                      </div>
                    </Tag>
                  </Card3D>
                </motion.div>
              );
            })}
          </div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <Card3D glowColor="tri" maxTilt={6} className="rounded-[1.6rem] p-8 md:p-10" style={{ background: "rgba(12,24,20,0.85)", border: "1px solid rgba(34,211,238,0.18)" }}>
              <h2 className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "1.9rem", letterSpacing: "-0.025em" }}>Send us a message</h2>
              <div className="divider-tri w-20 mt-3 mb-7" />
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name" style={labelStyle}>Full Name</Label>
                    <Input id="name" name="name" placeholder="Your full name" required className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <Label htmlFor="phone" style={labelStyle}>Phone</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+91 99999 99999" required className={inputCls} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" style={labelStyle}>Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required className={inputCls} style={inputStyle} />
                </div>
                <div>
                  <Label htmlFor="message" style={labelStyle}>How can we help?</Label>
                  <Textarea id="message" name="message" rows={5} placeholder="Tell us what you're looking for..." required className="mt-1.5 rounded-xl text-sm" style={inputStyle} />
                </div>
                <button type="submit" className="btn btn-tri w-full justify-center h-12 text-sm">Send Message</button>
              </form>
            </Card3D>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section id="map" style={{ background: "var(--forest-deep)", paddingBottom: "5rem" }}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="overflow-hidden rounded-[1.5rem]" style={{ border: "1px solid rgba(34,211,238,0.15)", boxShadow: "0 20px 60px rgba(34,211,238,0.08)" }}>
            <iframe title="Office location" src="https://maps.google.com/maps?q=16.5417,80.515&z=12&output=embed" className="h-[400px] w-full" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}
