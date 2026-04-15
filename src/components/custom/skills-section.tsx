"use client";

import { motion } from "framer-motion";
import { SKILLS_BY_CATEGORY } from "@/lib/data/skills";
import { SkillBadge } from "@/components/custom/skill-badge";
import { FadeIn } from "@/components/custom/fade-in";

const CATEGORY_LABELS: Record<string, string> = {
  frontend: "Frontend",
  tools: "Herramientas",
  platform: "Plataforma",
};

const categoryContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function SkillsSection() {
  const categories = Object.entries(SKILLS_BY_CATEGORY);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12">
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Stack & Skills
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mt-4" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Tecnologías y herramientas con las que trabajo día a día
          </p>
        </FadeIn>

        <div className="space-y-12">
          {categories.map(([category, skills]) => (
            <FadeIn key={category} delay={0.05}>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {CATEGORY_LABELS[category]}
              </h3>
              <motion.div
                variants={categoryContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="flex flex-wrap gap-3"
              >
                {skills.map((skill) => (
                  <motion.div key={skill.id} variants={badgeVariants}>
                    <SkillBadge skill={skill} />
                  </motion.div>
                ))}
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}