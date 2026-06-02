import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { Card3D } from "@/components/motion/Card3D";
import { POSTS } from "@/data/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Article — Amaravathi Real Estate" }] };
    return {
      meta: [
        { title: `${post.title} — Amaravathi Real Estate` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: post.image },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BlogPostPage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="container mx-auto px-4 py-24 text-center" style={{ background: "var(--forest-deep)" }}>
        <p style={{ color: "rgba(240,253,244,0.55)" }}>Failed to load: {error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="btn btn-cyan inline-flex mt-4">Retry</button>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-24 text-center" style={{ background: "var(--forest-deep)" }}>
      <h1 className="font-display font-bold" style={{ color: "#F0FDF4", fontSize: "2rem" }}>Article not found</h1>
      <Link to="/blog" className="btn btn-tri inline-flex mt-6">Back to Blog</Link>
    </div>
  ),
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

const ACCENTS = ["#22D3EE", "#C9973A", "#2A5C3F"];

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const related = POSTS.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

  return (
    <div style={{ background: "var(--forest-deep)" }}>
      {/* Hero */}
      <header className="relative isolate overflow-hidden" style={{ paddingTop: "5rem", paddingBottom: "4rem" }}>
        <div className="absolute inset-0 -z-30">
          <img src={post.image} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 -z-20" style={{ background: "linear-gradient(160deg, rgba(12,24,20,0.97) 0%, rgba(8,145,178,0.28) 55%, rgba(12,24,20,0.97) 100%)" }} />
        <div className="orb-gold absolute" style={{ width: 300, height: 300, top: -60, right: "10%", opacity: 0.15, zIndex: -10 }} />

        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-mono mb-6 transition-colors duration-200"
            style={{ color: "rgba(240,253,244,0.50)", fontSize: "0.7rem", letterSpacing: "0.18em" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#22D3EE"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,253,244,0.50)"; }}
          >
            <ArrowLeft style={{ width: 13, height: 13 }} /> ALL ARTICLES
          </Link>

          <motion.span
            className="badge badge-cyan inline-flex mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {post.category}
          </motion.span>

          {/* Plain text title — safe for Framer Motion */}
          <motion.h1
            className="font-display font-black"
            style={{ color: "#F0FDF4", fontSize: "clamp(2.2rem,5.5vw,4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.04 }}
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, delay: 0.15, ease }}
          >
            {post.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-5 mt-6 font-mono" style={{ fontSize: "0.68rem", letterSpacing: "0.14em", color: "rgba(240,253,244,0.45)" }}>
            <span className="flex items-center gap-1.5"><User style={{ width: 12, height: 12 }} />{post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar style={{ width: 12, height: 12 }} />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock style={{ width: 12, height: 12 }} />{post.readTime}</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <blockquote
            className="font-display font-medium mb-10"
            style={{ color: "#F0FDF4", fontSize: "clamp(1.15rem,2vw,1.4rem)", lineHeight: 1.65, fontStyle: "italic", borderLeft: "3px solid #22D3EE", paddingLeft: "1.5rem" }}
          >
            {post.excerpt}
          </blockquote>

          <div className="space-y-6">
            {post.content.map((para: string, i: number) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{ color: "rgba(240,253,244,0.72)", lineHeight: 1.82, fontSize: "1rem" }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          <div className="flex items-center justify-between mt-12 pt-8" style={{ borderTop: "1px solid rgba(34,211,238,0.14)" }}>
            <Link to="/blog" className="btn btn-outline-cyan inline-flex items-center gap-2" style={{ fontSize: "0.8rem" }}>
              <ArrowLeft style={{ width: 14, height: 14 }} /> Back to Blog
            </Link>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + (typeof window !== "undefined" ? window.location.href : ""))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans font-medium transition-colors duration-200"
              style={{ color: "rgba(240,253,244,0.50)", fontSize: "0.875rem" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#22D3EE"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,253,244,0.50)"; }}
            >
              <Share2 style={{ width: 15, height: 15 }} /> Share
            </a>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ background: "linear-gradient(160deg, #0F2918 0%, #0891B2 100%)", padding: "5rem 0", position: "relative", overflow: "hidden" }}>
          <div className="orb-gold absolute" style={{ width: 250, height: 250, bottom: -60, right: "10%", opacity: 0.13 }} />
          <div className="container mx-auto px-4 md:px-8">
            <p className="eyebrow-light mb-3">/ Continue Reading</p>
            <h2 className="font-display font-bold mb-10" style={{ color: "#F0FDF4", fontSize: "2rem", letterSpacing: "-0.02em" }}>Related articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                  <Card3D glowColor={(["cyan", "gold", "forest"] as const)[i % 3]} maxTilt={11} className="rounded-[1.3rem] overflow-hidden" style={{ background: "rgba(12,24,20,0.82)", border: `1px solid ${ACCENTS[i % 3]}22` }}>
                    <Link to="/blog/$slug" params={{ slug: p.slug }}>
                      <img src={p.image} alt={p.title} loading="lazy" className="h-44 w-full object-cover transition-transform duration-700 hover:scale-105" />
                      <div className="p-5">
                        <span className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: ACCENTS[i % 3], textTransform: "uppercase" }}>{p.category}</span>
                        <h3 className="font-display font-bold mt-2 leading-tight" style={{ color: "#F0FDF4", fontSize: "1.05rem" }}>{p.title}</h3>
                        <span className="inline-flex items-center gap-1.5 mt-3 font-sans font-medium" style={{ color: ACCENTS[i % 3], fontSize: "0.8rem" }}>
                          Read <ArrowRight style={{ width: 13, height: 13 }} />
                        </span>
                      </div>
                    </Link>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
