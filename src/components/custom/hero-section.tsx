"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.25 },
  },
};

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 animate-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
                Freelance Frontend Developer
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]"
            >
              Creo productos digitales{" "}
              <span className="text-primary">rápidos</span>,{" "}
              <span className="text-primary">hermosos</span> y que{" "}
              <span className="text-accent">convierten</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              Especialista en <strong className="text-foreground">Next.js 15</strong>,{" "}
              <strong className="text-foreground">shadcn/ui</strong> y{" "}
              <strong className="text-foreground">Tailwind</strong>. Ayudo a startups y emprendedores de LatAm a lanzar MVPs en tiempo récord.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Button size="lg" className="group text-base px-8" render={<a href="#projects" />}>
                Ver mis proyectos
                <ArrowDown className="ml-2 h-4 w-4 inline-block transition-transform duration-200 group-hover:translate-y-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group text-base px-8 border-primary/30 hover:bg-primary/10 hover:text-primary"
                render={
                  <a
                    href="https://wa.me/5491134567890?text=Hola%20Rafael%2C%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20charlar"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                Hablemos por WhatsApp
                <MessageCircle className="ml-2 h-4 w-4 inline-block transition-transform duration-200 group-hover:scale-110" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl ring-4 ring-primary/10">
              <Image
                src="/images/1000000136.jpg"
                alt="Rafael Strongoli — Desarrollador Frontend"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}