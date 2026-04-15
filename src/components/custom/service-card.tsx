"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Rocket, LayoutDashboard, Zap, Brain, LucideIcon } from "lucide-react";
import type { Service } from "@/lib/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Rocket,
  LayoutDashboard,
  Zap,
  Brain,
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const IconComponent = ICON_MAP[service.iconName] ?? Rocket;

  if (shouldReduceMotion) {
    return (
      <article className="h-full">
        <Card className="h-full transition-colors hover:border-primary/50">
          <CardHeader>
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
              <IconComponent className="size-6 text-primary" />
            </div>
            <CardTitle className="text-xl text-foreground">
              {service.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              {service.description}
            </p>
            <ul className="space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 text-primary" />
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </article>
    );
  }

  return (
    <article className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="h-full"
      >
        <Card className="h-full border-border transition-shadow hover:shadow-lg hover:shadow-primary/10">
          <CardHeader>
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
              <IconComponent className="size-6 text-primary" />
            </div>
            <CardTitle className="text-xl text-foreground">
              {service.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              {service.description}
            </p>
            <ul className="space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 text-primary" />
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </article>
  );
}