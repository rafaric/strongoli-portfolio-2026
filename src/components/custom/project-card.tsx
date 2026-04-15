"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPlaceholder = project.liveUrl === null && project.githubUrl === null;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-colors ${
        project.featured
          ? "border-primary ring-2 ring-primary/20 dark:ring-primary/40"
          : "border-border"
      }`}
    >
      {/* Project Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {/* Placeholder for image - TODO: Replace with actual project screenshot */}
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-muted-foreground text-sm">{project.title}</span>
        </div>
        {/* When real images are available, uncomment below:
        <Image
          src={project.image}
          alt={project.title}
          fill
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,..."
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        */}

        {/* Featured Badge */}
        {project.featured && (
          <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
            Destacado
          </span>
        )}

        {/* Coming Soon Badge */}
        {isPlaceholder && (
          <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            Próximamente
          </span>
        )}
      </div>

      {/* Project Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-xl font-semibold text-foreground">{project.title}</h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground">{project.description}</p>

        {/* Tech Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.liveUrl ? (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <ExternalLink className="size-4" />
              Ver Demo
            </Link>
          ) : (
            <span
              className={`flex items-center gap-1.5 text-sm font-medium ${
                isPlaceholder ? "text-muted-foreground/50" : "text-muted-foreground"
              }`}
            >
              <ExternalLink className="size-4" />
              Ver Demo
            </span>
          )}

          {project.githubUrl ? (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.2-2.7-.8-3.8-.2-.4-.5-.8-1-1.2l-.3-.3c-.5-.5-1.2-1-2-1.2a10 10 0 0 0-5.4 1.8c-1 .8-1.6 1.7-1.8 2.8 0 .5.1 1 .2 1.5v.3a4 4 8 0 0 1-3.2 3.8 6.6 6.6 0 0 0-3 1 4 4 0 0 0 .8 5.2c3 0 5.5-1.8 5.5-5.5 0-.6-.1-1.2-.2-1.8" />
                <path d="M9 22v-4a4.8 4.8 0 0 0-1-3.5c-3 0-6-2-6-5.5.1-1.3.2-2.7.8-3.8.2-.4.5-.8 1-1.2l.3-.3c.5-.5 1.2-1 2-1.2a10 10 0 0 1 5.4 1.8c1 .8 1.6 1.7 1.8 2.8 0 .5-.1 1-.2 1.5v.3a4 4 8 0 0 0 3.2 3.8 6.6 6.6 0 0 1 3 1 4 4 0 0 0-.8 5.2c-3 0-5.5-1.8-5.5-5.5 0-.6.1-1.2.2-1.8" />
              </svg>
              Código
            </Link>
          ) : (
            <span
              className={`flex items-center gap-1.5 text-sm font-medium ${
                isPlaceholder ? "text-muted-foreground/50" : "text-muted-foreground"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.2-2.7-.8-3.8-.2-.4-.5-.8-1-1.2l-.3-.3c-.5-.5-1.2-1-2-1.2a10 10 0 0 0-5.4 1.8c-1 .8-1.6 1.7-1.8 2.8 0 .5.1 1 .2 1.5v.3a4 4 8 0 0 1-3.2 3.8 6.6 6.6 0 0 0-3 1 4 4 0 0 0 .8 5.2c3 0 5.5-1.8 5.5-5.5 0-.6-.1-1.2-.2-1.8" />
                <path d="M9 22v-4a4.8 4.8 0 0 0-1-3.5c-3 0-6-2-6-5.5.1-1.3.2-2.7.8-3.8.2-.4.5-.8 1-1.2l.3-.3c.5-.5 1.2-1 2-1.2a10 10 0 0 1 5.4 1.8c1 .8 1.6 1.7 1.8 2.8 0 .5-.1 1-.2 1.5v.3a4 4 8 0 0 0 3.2 3.8 6.6 6.6 0 0 1 3 1 4 4 0 0 0-.8 5.2c-3 0-5.5-1.8-5.5-5.5 0-.6.1-1.2.2-1.8" />
              </svg>
              Código
            </span>
          )}
        </div>
      </div>

      {/* Hover Animation Overlay */}
      {!shouldReduceMotion && !isPlaceholder && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl ring-2 ring-transparent"
          whileHover={{
            scale: 1.02,
            boxShadow:
              "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      )}
    </article>
  );
}