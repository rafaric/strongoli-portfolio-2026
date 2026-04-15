// ─── Branded Types ─────────────────────────────────────────────────────────
type Brand<T, B> = T & { __brand: B };
export type ProjectId = Brand<string, "ProjectId">;
export type ServiceId = Brand<string, "ServiceId">;
export type SkillId = Brand<string, "SkillId">;

// ─── Const Types Pattern ─────────────────────────────────────────────────
export const SKILL_CATEGORIES = {
  frontend: "frontend",
  tools: "tools",
  platform: "platform",
} as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[keyof typeof SKILL_CATEGORIES];

export const SKILL_LEVELS = {
  expert: "expert",
  advanced: "advanced",
  intermediate: "intermediate",
} as const;
export type SkillLevel = (typeof SKILL_LEVELS)[keyof typeof SKILL_LEVELS];

// ─── Data Interfaces ─────────────────────────────────────────────────────
export interface Project {
  id: ProjectId;
  title: string;
  description: string;
  image: string;
  tags: readonly string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
}

export interface Skill {
  id: SkillId;
  name: string;
  iconName: string;
  category: SkillCategory;
  level: SkillLevel;
}

export interface Service {
  id: ServiceId;
  title: string;
  description: string;
  iconName: string;
  features: readonly string[];
}

export interface NavLink {
  label: string;
  href: string;
}

// ─── Server Action Result ───────────────────────────────────────────────
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// ─── FadeIn Component Props ───────────────────────────────────────────────
export interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

// ─── Site Metadata ───────────────────────────────────────────────────────
export interface SiteMetadata {
  name: string;
  title: string;
  description: string;
  url: string;
  github?: string;
  linkedin?: string;
  whatsapp?: string;
  email?: string;
}
