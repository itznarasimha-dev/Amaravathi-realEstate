import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouter } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingActions } from "@/components/FloatingActions";
import { Toaster } from "@/components/ui/sonner";
import { LenisProvider } from "@/lib/lenis";
import appCss from "../styles.css?url";

const EASE_OUT  = [0.16, 1, 0.3, 1] as [number, number, number, number];
const EASE_IN   = [0.4, 0, 1, 1]   as [number, number, number, number];

const pageVariants = {
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE_OUT } },
  exit:    { opacity: 0, y: -8, filter: "blur(4px)", transition: { duration: 0.28, ease: EASE_IN } },
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: "var(--forest-deep)" }}>
      <div className="max-w-md text-center">
        <p className="font-display font-black" style={{ fontSize: "7rem", lineHeight: 1, background: "linear-gradient(135deg,#22D3EE,#2A5C3F,#C9973A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          404
        </p>
        <h2 className="font-display font-bold mt-4" style={{ color: "#F0FDF4", fontSize: "1.5rem" }}>Page not found</h2>
        <p className="mt-2 text-sm" style={{ color: "rgba(240,253,244,0.55)" }}>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-tri inline-flex mt-8">Go home</Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Amaravathi Real Estate — Premium Open Plots in AP Capital Region" },
      { name: "description", content: "DTCP & RERA approved open plots in Amaravathi, Vijayawada & Guntur." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

/* Premium loading screen */
function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ background: "var(--forest-deep)" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Glow orbs */}
      <div style={{ position: "absolute", width: 300, height: 300, top: "10%", left: "10%", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.30) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div style={{ position: "absolute", width: 250, height: 250, bottom: "10%", right: "10%", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,151,58,0.28) 0%, transparent 70%)", filter: "blur(50px)" }} />

      <div className="flex flex-col items-center gap-6 text-center" style={{ position: "relative", zIndex: 1 }}>
        {/* Tricolor spinning ring */}
        <div style={{ position: "relative", width: 72, height: 72 }}>
          <motion.div
            style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "3px solid transparent",
              borderTopColor: "#22D3EE",
              borderRightColor: "#2A5C3F",
              borderBottomColor: "#C9973A",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          />
          <div style={{
            position: "absolute", inset: 8, borderRadius: "50%",
            background: "linear-gradient(135deg, #22D3EE 0%, #2A5C3F 50%, #C9973A 100%)",
            opacity: 0.15,
          }} />
        </div>

        <div>
          <p className="font-display font-black" style={{ color: "#F0FDF4", fontSize: "1.4rem", letterSpacing: "-0.02em" }}>AMARAVATHI</p>
          <p className="font-mono" style={{ color: "#22D3EE", fontSize: "0.6rem", letterSpacing: "0.28em", marginTop: 4 }}>REAL ESTATE</p>
        </div>

        {/* Progress bar */}
        <div style={{ width: 160, height: 2, background: "rgba(240,253,244,0.10)", borderRadius: 99, overflow: "hidden" }}>
          <motion.div
            style={{ height: "100%", background: "linear-gradient(90deg, #22D3EE, #2A5C3F, #C9973A)", borderRadius: 99 }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function RootComponent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const path = router.state.location.pathname ?? "/";

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <LenisProvider>
      <div className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--forest-deep)" }}>
        {/* Global ambient gradient bg */}
        <div
          className="pointer-events-none fixed inset-0 -z-10"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34,211,238,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(201,151,58,0.06) 0%, transparent 60%)" }}
        />

        <SiteHeader />

        <main>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={path}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <SiteFooter />
        <FloatingActions />
        <Toaster />

        <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      </div>
    </LenisProvider>
  );
}
