import type { Project, ProjectId } from "../types";

export const PROJECTS = [
  {
    id: "landing-santiago-garcia" as ProjectId,
    title: "Landing Santiago García",
    description: "Landing page de conversión para coach de vida con formulario de contacto y integración con WhatsApp.",
    image: "/images/projects/landing-santiago.webp",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    liveUrl: "https://santiagogarcia.com.ar",
    githubUrl: null,
    featured: true,
  },
  {
    id: "estadisticas-mundiales" as ProjectId,
    title: "Estadísticas Mundiales",
    description: "Dashboard interactivo de datos estadísticos mundiales con gráficos dinámicos y filtros por país.",
    image: "/images/projects/estadisticas.webp",
    tags: ["React", "TypeScript", "D3.js", "API REST"],
    liveUrl: "https://estadisticasmundiales.com",
    githubUrl: "https://github.com/rafaelstrongoli/estadisticas-mundiales",
    featured: true,
  },
  {
    id: "red-social-bts" as ProjectId,
    title: "Red Social BTS",
    description: "Comunidad粉丝 de BTS con perfil de usuarios, feed de publicaciones y sistema de likes.",
    image: "/images/projects/bts-fans.webp",
    tags: ["Next.js", "Supabase", "Tailwind", "Auth"],
    liveUrl: "https://bts-fans.com.ar",
    githubUrl: "https://github.com/rafaelstrongoli/bts-fans",
    featured: false,
  },
  {
    id: "dashboard-admin" as ProjectId,
    title: "Dashboard Admin",
    description: "Panel de administración con gestión de usuarios, estadísticas y configuraciones.",
    image: "/images/projects/dashboard.webp",
    tags: ["React", "TypeScript", "Admin"],
    liveUrl: null,
    githubUrl: null,
    featured: false,
  },
] as const satisfies readonly Project[];

export type ProjectData = (typeof PROJECTS)[number];
