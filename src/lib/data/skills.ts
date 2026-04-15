import type { Skill, SkillCategory, SkillLevel, SkillId } from "../types";

export const SKILLS: readonly Skill[] = [
  // Frontend
  {
    id: "nextjs-15" as SkillId,
    name: "Next.js 15",
    iconName: "Code2",
    category: "frontend" as SkillCategory,
    level: "expert" as SkillLevel,
  },
  {
    id: "react" as SkillId,
    name: "React",
    iconName: "Palette",
    category: "frontend" as SkillCategory,
    level: "expert" as SkillLevel,
  },
  {
    id: "typescript" as SkillId,
    name: "TypeScript",
    iconName: "Cpu",
    category: "frontend" as SkillCategory,
    level: "expert" as SkillLevel,
  },
  {
    id: "tailwind" as SkillId,
    name: "Tailwind",
    iconName: "Smartphone",
    category: "frontend" as SkillCategory,
    level: "expert" as SkillLevel,
  },
  {
    id: "shadcn-ui" as SkillId,
    name: "shadcn/ui",
    iconName: "Boxes",
    category: "frontend" as SkillCategory,
    level: "advanced" as SkillLevel,
  },
  {
    id: "framer-motion" as SkillId,
    name: "Framer Motion",
    iconName: "Sparkles",
    category: "frontend" as SkillCategory,
    level: "advanced" as SkillLevel,
  },
  // Tools
  {
    id: "supabase" as SkillId,
    name: "Supabase",
    iconName: "Database",
    category: "tools" as SkillCategory,
    level: "advanced" as SkillLevel,
  },
  {
    id: "openai" as SkillId,
    name: "OpenAI",
    iconName: "Sparkles",
    category: "tools" as SkillCategory,
    level: "intermediate" as SkillLevel,
  },
  // Platform
  {
    id: "vercel" as SkillId,
    name: "Vercel",
    iconName: "Cloud",
    category: "platform" as SkillCategory,
    level: "expert" as SkillLevel,
  },
] as const;

export type SkillData = (typeof SKILLS)[number];

export const SKILLS_BY_CATEGORY = {
  frontend: SKILLS.filter((s) => s.category === "frontend"),
  tools: SKILLS.filter((s) => s.category === "tools"),
  platform: SKILLS.filter((s) => s.category === "platform"),
} as const;
