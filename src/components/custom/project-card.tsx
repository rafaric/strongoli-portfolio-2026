"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const TECH_COLORS: Record<string, string> = {
  "Next.js 15": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "Next.js": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  React: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  TypeScript:
    "bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20",
  "Tailwind CSS":
    "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
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
};

function getTagClass(tag: string): string {
  return TECH_COLORS[tag] ?? "bg-primary/10 text-primary border-primary/20";
}

/* Per-project gradient backgrounds for the placeholder area */
const PROJECT_GRADIENTS: Record<string, string> = {
  "landing-santicuore-ph":
    "from-primary/5 via-background to-accent/5",
  "estadisticas-mundiales":
    "from-sky-500/5 via-background to-emerald-500/5",
  "red-social-bts":
    "from-pink-500/5 via-background to-violet-500/5",
  "dashboard-admin":
    "from-violet-500/10 via-primary/5 to-sky-500/10",
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPlaceholder = project.liveUrl === null && project.githubUrl === null;
  const isDashboard = project.title === "Dashboard Admin";
  const gradientClass = PROJECT_GRADIENTS[project.id] ?? "from-muted via-muted/80 to-muted";

  return (
    <motion.article
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              scale: 1.03,
              transition: { duration: 0.25, ease: "easeOut" as const },
            }
      }
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-card transition-all duration-300",
        project.featured
          ? "border border-primary/20 shadow-lg shadow-primary/5 hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/40"
          : "border border-border shadow-sm hover:shadow-xl hover:shadow-foreground/10 hover:border-primary/20"
      )}
    >
      {/* Image / Screenshot area — larger aspect ratio */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {/* Gradient background for each project */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            gradientClass
          )}
        />

        {/* Dashboard mockup — make it look premium */}
        {isDashboard ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[85%] h-[70%] rounded-lg border border-border/50 bg-card shadow-2xl overflow-hidden">
              {/* Mock sidebar */}
              <div className="absolute left-0 top-0 bottom-0 w-[20%] bg-muted/50 border-r border-border/30 p-2 space-y-2">
                <div className="h-2 w-3/4 rounded bg-primary/30" />
                <div className="h-2 w-1/2 rounded bg-muted-foreground/10" />
                <div className="h-2 w-2/3 rounded bg-muted-foreground/10" />
                <div className="h-2 w-1/2 rounded bg-muted-foreground/10" />
                <div className="mt-4 h-2 w-1/2 rounded bg-accent/20" />
              </div>
              {/* Mock content area */}
              <div className="ml-[20%] p-3 space-y-2">
                <div className="h-3 w-1/3 rounded bg-foreground/10" />
                <div className="flex gap-2 mt-2">
                  <div className="h-12 flex-1 rounded bg-primary/10 border border-primary/20" />
                  <div className="h-12 flex-1 rounded bg-accent/10 border border-accent/20" />
                  <div className="h-12 flex-1 rounded bg-emerald-500/10 border border-emerald-500/20" />
                </div>
                <div className="h-16 w-full rounded bg-muted/50 border border-border/30" />
              </div>
            </div>
          </div>
        ) : project.image ? (
          // Real project image
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <img
              src={project.image}
              alt={project.title}
              className="size-full object-cover"
            />
          </div>
        ) : (
          // Fallback — show title as placeholder
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground/60 text-sm font-medium">{project.title}</p>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md">
            <Sparkles className="size-3" />
            Destacado
          </span>
        )}

        {/* Coming Soon badge — attractive for Dashboard */}
        {isPlaceholder && isDashboard && (
          <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-violet-500/90 px-3 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-sm">
            <Sparkles className="size-3" />
            En desarrollo
          </span>
        )}
        {isPlaceholder && !isDashboard && (
          <span className="absolute top-3 right-3 z-10 inline-flex items-center rounded-full bg-muted-foreground/20 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            Próximamente
          </span>
        )}

        {/* Hover gradient overlay — subtle glow from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Tech Tags — more visual */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border tracking-wide uppercase",
                getTagClass(tag)
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-auto pt-2 border-t border-border/50">
          {project.liveUrl ? (
            <Button
              size="sm"
              className="group/btn gap-1.5"
              render={<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" />}
            >
              Ver Demo
              <ArrowUpRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
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
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.2-2.7-.8-3.8-.2-.4-.5-.8-1-1.2l-.3-.3c-.5-.5-1.2-1-2-1.2a10 10 0 0 0-5.4 1.8c-1 .8-1.6 1.7-1.8 2.8 0 .5.1 1 .2 1.5v.3a4 4 8 0 0 1-3.2 3.8 6.6 6.6 0 0 0-3 1 4 4 0 0 0 .8 5.2c3 0 5.5-1.8 5.5-5.5 0-.6-.1-1.2-.2-1.8"/><path d="M9 22v-4a4.8 4.8 0 0 0-1-3.5c-3 0-6-2-6-5.5.1-1.3.2-2.7.8-3.8.2-.4.5-.8 1-1.2l.3-.3c.5-.5 1.2-1 2-1.2a10 10 0 0 1 5.4 1.8c1 .8 1.6 1.7 1.8 2.8 0 .5-.1 1-.2 1.5v.3a4 4 8 0 0 0 3.2 3.8 6.6 6.6 0 0 1 3 1 4 4 0 0 0-.8 5.2c-3 0-5.5-1.8-5.5-5.5 0-.6.1-1.2.2-1.8"/></svg>
              Privado
            </span>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}