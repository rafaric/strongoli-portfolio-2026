import type { Project, ProjectId } from "../types";

export const PROJECTS = [
  {
    id: "landing-santicuore-ph" as ProjectId,
    title: "Landing Page – SantiCuore PH (FooTalent Group)",
    description:
      "Participé como Desarrollador Frontend en el desarrollo de una landing page profesional para SantiCuore PH, fotógrafos y creador audiovisual. El proyecto incluye diseño visual impactante, optimización SEO, estructura semántica y excelente experiencia de usuario responsive. Desarrollado en equipo multidisciplinario (FooTalent Group).",
    image: "/images/projects/santi.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://www.santicuoreph.com/",
    githubUrl: "https://github.com/FooTalentGroup/Landing-SantiCuoreph",
    featured: true,
  },
  {
    id: "estadisticas-mundiales" as ProjectId,
    title: "Estadísticas Mundiales",
    description:
      "Dashboard interactivo de datos estadísticos mundiales con gráficos dinámicos, filtros por país y visualizaciones en tiempo real.",
    image: "/images/projects/estadisticas.png",
    tags: ["React", "TypeScript", "D3.js", "API REST"],
    liveUrl: "https://world-stadistics.vercel.app/",
    githubUrl: "https://github.com/rafaelstrongoli/estadisticas-mundiales",
    featured: true,
  },
  {
    id: "red-social-bts" as ProjectId,
    title: "Red Social BTS",
    description:
      "Comunidad de fans de BTS con perfiles de usuario, feed de publicaciones, sistema de likes y autenticación con Supabase.",
    image: "/images/projects/socialarmy.png",
    tags: ["Next.js", "Supabase", "Tailwind", "Auth"],
    liveUrl: "https://socialarmy.vercel.app/",
    githubUrl: "https://github.com/rafaelstrongoli/bts-fans",
    featured: false,
  },
  {
    id: "dashboard-admin" as ProjectId,
    title: "BTS Army Admin Dashboard",
    description:
      "Panel de administración full-stack construido con Next.js 15 App Router, TypeScript y Supabase. Incluye autenticación con guard de roles, métricas en tiempo real (usuarios activos, posts, encuestas), analytics con gráficos interactivos por miembro y era discográfica, gestión de usuarios con sistema de ban/unban, log de auditoría de acciones administrativas y modo demo con datos de muestra. UI con glassmorphism, tema oscuro y diseño responsive.",
    image: "/images/projects/dashboard.png",
    tags: ["Next.js 15", "TypeScript", "Supabase", "React Query", "Recharts", "Tailwind CSS"],
    liveUrl: "https://bts-admin-dashboard-phi.vercel.app/dashboard",
    githubUrl: null,
    featured: false,
  },
] as const satisfies readonly Project[];

export type ProjectData = (typeof PROJECTS)[number];