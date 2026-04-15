"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: "easeOut" as const,
    },
  }),
};

const TECH_COLORS: Record<string, string> = {
  "Next.js 15": "bg-foreground/10 text-foreground border-foreground/20",
  Next: "bg-foreground/10 text-foreground border-foreground/20",
  React: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  TypeScript:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Tailwind:
    "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
  "shadcn/ui":
    "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  "Framer Motion":
    "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  "D3.js": "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  "API REST": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Supabase:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Auth: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  "TanStack Table":
    "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  Recharts:
    "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  Admin: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
};

function getTagClass(tag: string): string {
  return TECH_COLORS[tag] ?? "bg-primary/10 text-primary border-primary/20";
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPlaceholder = project.liveUrl === null && project.githubUrl === null;
  const isDashboard = project.title === "Dashboard Admin";

  const hoverEffect = shouldReduceMotion
    ? {}
    : {
        y: -6,
        transition: { duration: 0.25, ease: "easeOut" as const },
      };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={index}
      whileHover={hoverEffect}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-shadow duration-300 ${
        project.featured
          ? "border-primary/30 ring-2 ring-primary/10 shadow-lg hover:shadow-xl hover:shadow-primary/10"
          : "border-border hover:shadow-lg hover:shadow-foreground/5"
      } bg-card`}
    >
      {/* Project Image / Placeholder */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {/* Gradient placeholder for all projects */}
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            isDashboard
              ? "bg-gradient-to-br from-violet-500/20 via-primary/10 to-sky-500/20"
              : "bg-gradient-to-br from-muted via-muted/80 to-muted"
          }`}
        >
          {isDashboard ? (
            <div className="text-center">
              <Sparkles className="size-10 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-primary">En desarrollo</p>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">{project.title}</p>
          )}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
            <Sparkles className="size-3" />
            Destacado
          </span>
        )}

        {/* Coming soon overlay for placeholder */}
        {isPlaceholder && !isDashboard && (
          <span className="absolute top-3 right-3 z-10 inline-flex items-center rounded-full bg-muted-foreground/20 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            Próximamente
          </span>
        )}

        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="mb-2 text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTagClass(
                tag
              )}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-auto">
          {project.liveUrl ? (
            <Button
              size="sm"
              className="group/btn"
              render={<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" />}
            >
              Ver Demo
              <ExternalLink className="ml-1.5 size-3.5 inline-block transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Button>
          ) : isDashboard ? (
            <Button size="sm" variant="outline" disabled className="gap-1.5">
              <Sparkles className="size-3.5" />
              Demo próximamente
            </Button>
          ) : (
            <Button size="sm" variant="outline" disabled className="gap-1.5">
              <ExternalLink className="size-3.5" />
              Ver Demo
            </Button>
          )}

          {project.githubUrl ? (
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              render={<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" />}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.2-2.7-.8-3.8-.2-.4-.5-.8-1-1.2l-.3-.3c-.5-.5-1.2-1-2-1.2a10 10 0 0 0-5.4 1.8c-1 .8-1.6 1.7-1.8 2.8 0 .5.1 1 .2 1.5v.3a4 4 8 0 0 1-3.2 3.8 6.6 6.6 0 0 0-3 1 4 4 0 0 0 .8 5.2c3 0 5.5-1.8 5.5-5.5 0-.6-.1-1.2-.2-1.8"/><path d="M9 22v-4a4.8 4.8 0 0 0-1-3.5c-3 0-6-2-6-5.5.1-1.3.2-2.7.8-3.8.2-.4.5-.8 1-1.2l.3-.3c.5-.5 1.2-1 2-1.2a10 10 0 0 1 5.4 1.8c1 .8 1.6 1.7 1.8 2.8 0 .5-.1 1-.2 1.5v.3a4 4 8 0 0 0 3.2 3.8 6.6 6.6 0 0 1 3 1 4 4 0 0 0-.8 5.2c-3 0-5.5-1.8-5.5-5.5 0-.6.1-1.2.2-1.8"/></svg>
              Código
            </Button>
          ) : !isPlaceholder ? (
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.2-2.7-.8-3.8-.2-.4-.5-.8-1-1.2l-.3-.3c-.5-.5-1.2-1-2-1.2a10 10 0 0 0-5.4 1.8c-1 .8-1.6 1.7-1.8 2.8 0 .5.1 1 .2 1.5v.3a4 4 8 0 0 1-3.2 3.8 6.6 6.6 0 0 0-3 1 4 4 0 0 0 .8 5.2c3 0 5.5-1.8 5.5-5.5 0-.6-.1-1.2-.2-1.8"/><path d="M9 22v-4a4.8 4.8 0 0 0-1-3.5c-3 0-6-2-6-5.5.1-1.3.2-2.7.8-3.8.2-.4.5-.8 1-1.2l.3-.3c.5-.5 1.2-1 2-1.2a10 10 0 0 1 5.4 1.8c1 .8 1.6 1.7 1.8 2.8 0 .5-.1 1-.2 1.5v.3a4 4 8 0 0 0 3.2 3.8 6.6 6.6 0 0 1 3 1 4 4 0 0 0-.8 5.2c-3 0-5.5-1.8-5.5-5.5 0-.6.1-1.2.2-1.8"/></svg>
              Privado
            </span>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}