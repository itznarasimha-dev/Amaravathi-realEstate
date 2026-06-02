import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <motion.a
        href="https://wa.me/919999999999?text=Hi%2C%20I%27m%20interested%20in%20plots%20in%20Amaravathi"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.12, y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #22D3EE 0%, #2A5C3F 100%)",
          boxShadow: "0 12px 36px rgba(34,211,238,0.40), 0 4px 12px rgba(42,92,63,0.30)",
          color: "#F0FDF4",
        }}
      >
        <MessageCircle style={{ width: 22, height: 22 }} />
      </motion.a>

      <motion.a
        href="tel:+919999999999"
        aria-label="Call now"
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.12, y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #C9973A 0%, #2A5C3F 100%)",
          boxShadow: "0 12px 36px rgba(201,151,58,0.45), 0 4px 12px rgba(42,92,63,0.25)",
          color: "#F0FDF4",
        }}
      >
        <Phone style={{ width: 22, height: 22 }} />
      </motion.a>
    </div>
  );
}
