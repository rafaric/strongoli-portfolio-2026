import type { Project, ProjectId } from "../types";

export const PROJECTS = [
  {
    id: "landing-santiago-garcia" as ProjectId,
    title: "Landing Santiago García",
    description:
      "Landing page de conversión para coach de vida con formulario de contacto, integración WhatsApp y animaciones fluidas.",
    image: "/images/projects/landing-santiago.webp",
    tags: ["Next.js 15", "TypeScript", "Tailwind", "Framer Motion"],
    liveUrl: "https://santiagogarcia.com.ar",
    githubUrl: null,
    featured: true,
  },
  {
    id: "estadisticas-mundiales" as ProjectId,
    title: "Estadísticas Mundiales",
    description:
      "Dashboard interactivo de datos estadísticos mundiales con gráficos dinámicos, filtros por país y visualizaciones en tiempo real.",
    image: "/images/projects/estadisticas.webp",
    tags: ["React", "TypeScript", "D3.js", "API REST"],
    liveUrl: "https://estadisticasmundiales.com",
    githubUrl: "https://github.com/rafaelstrongoli/estadisticas-mundiales",
    featured: true,
  },
  {
    id: "red-social-bts" as ProjectId,
    title: "Red Social BTS",
    description:
      "Comunidad de fans de BTS con perfiles de usuario, feed de publicaciones, sistema de likes y autenticación con Supabase.",
    image: "/images/projects/bts-fans.webp",
    tags: ["Next.js", "Supabase", "Tailwind", "Auth"],
    liveUrl: "https://bts-fans.com.ar",
    githubUrl: "https://github.com/rafaelstrongoli/bts-fans",
    featured: false,
  },
  {
    id: "dashboard-admin" as ProjectId,
    title: "Dashboard Admin",
    description:
      "Dashboard administrativo moderno con tabla sortable, gráficos interactivos, sidebar colapsable y tema dark. Construido con Next.js 15, shadcn/ui y TanStack Table.",
    image: "/images/projects/dashboard.webp",
    tags: ["Next.js 15", "shadcn/ui", "TanStack Table", "Recharts"],
    liveUrl: null,
    githubUrl: null,
    featured: false,
  },
] as const satisfies readonly Project[];

export type ProjectData = (typeof PROJECTS)[number];