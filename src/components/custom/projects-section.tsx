"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

import { PROJECTS } from "@/lib/data/projects";
import { ProjectCard } from "@/components/custom/project-card";

export { containerVariants, itemVariants };

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Proyectos Destacados
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mt-4" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Algunos de los proyectos en los que he trabajado. Cada uno construido
            con foco en performance, UX y código limpio.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {PROJECTS.map((project, index) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}