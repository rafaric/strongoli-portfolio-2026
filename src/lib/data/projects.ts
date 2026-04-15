import type { Project, ProjectId } from "../types";

export const PROJECTS = [
  {
    id: "landing-santicuore-ph" as ProjectId,
    title: "Landing Page – SantiCuore PH (FooTalent Group)",
    description:
      "Participé como Desarrollador Frontend en el desarrollo de una landing page profesional para SantiCuore PH, fotógrafo y creador audiovisual. El proyecto incluye diseño visual impactante, optimización SEO, estructura semántica y excelente experiencia de usuario responsive. Desarrollado en equipo multidisciplinario (FooTalent Group).",
    image: "/images/projects/landing-santiago.webp",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://www.santicuoreph.com/",
    githubUrl: "https://github.com/FooTalentGroup/Landing-SantiCuoreph",
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