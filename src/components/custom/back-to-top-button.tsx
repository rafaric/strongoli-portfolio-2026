"use client";

import { motion, useReducedMotion } from "framer-motion";

export function BackToTopButton() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (shouldReduceMotion) {
    return (
      <button
        onClick={scrollToTop}
        className="rounded-lg border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label="Volver al inicio"
      >
        ↑ Volver arriba
      </button>
    );
  }

  return (
    <motion.button
      onClick={scrollToTop}
      className="rounded-lg border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      aria-label="Volver al inicio"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      ↑ Volver arriba
    </motion.button>
  );
}