import type { NavLink } from "../types";

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre Mí", href: "#about" },
  { label: "Proyectos", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Servicios", href: "#services" },
  { label: "Contacto", href: "#contact" },
] as const;

export type NavLinkData = (typeof NAV_LINKS)[number];
