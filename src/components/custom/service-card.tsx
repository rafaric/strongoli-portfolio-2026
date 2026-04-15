"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Rocket, LayoutDashboard, Zap, Brain, LucideIcon } from "lucide-react";
import type { Service } from "@/lib/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Rocket,
  LayoutDashboard,
  Zap,
  Brain,
};

const ICON_COLORS: Record<string, string> = {
  "landing-pages": "bg-primary/10 text-primary",
  dashboards: "bg-accent/10 text-accent",
  mvp: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "ai-integration": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" as const },
  }),
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const IconComponent = ICON_MAP[service.iconName] ?? Rocket;
  const iconColorClass = ICON_COLORS[service.id] ?? "bg-primary/10 text-primary";

  const content = (
    <article className="h-full flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5">
      {/* Large Icon */}
      <div className={`mb-5 flex size-14 items-center justify-center rounded-xl ${iconColorClass}`}>
        <IconComponent className="size-7" />
      </div>

      {/* Title */}
      <h3 className="mb-2 text-xl font-semibold text-foreground">{service.title}</h3>

      {/* Description */}
      <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>

      {/* Features */}
      <ul className="space-y-2.5">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <span className="text-sm text-foreground/80">{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );

  if (shouldReduceMotion) {
    return content;
  }

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={index}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" as const } }}
      className="h-full"
    >
      <div className="h-full flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5">
        {/* Large Icon */}
        <div className={`mb-5 flex size-14 items-center justify-center rounded-xl ${iconColorClass}`}>
          <IconComponent className="size-7" />
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-semibold text-foreground">{service.title}</h3>

        {/* Description */}
        <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>

        {/* Features */}
        <ul className="space-y-2.5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-sm text-foreground/80">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}