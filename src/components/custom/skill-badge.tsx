import type { Skill } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Code2,
  Palette,
  Smartphone,
  Database,
  Cpu,
  Boxes,
  Sparkles,
  Cloud,
  LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Palette,
  Smartphone,
  Database,
  Cpu,
  Boxes,
  Sparkles,
  Cloud,
};

const LEVEL_CONFIG = {
  expert: {
    label: "Experto",
    ring: "ring-2 ring-primary/40",
    bg: "bg-primary/10",
  },
  advanced: {
    label: "Avanzado",
    ring: "ring-1 ring-primary/20",
    bg: "bg-primary/5",
  },
  intermediate: {
    label: "Intermedio",
    ring: "ring-1 ring-border",
    bg: "bg-muted",
  },
};

interface SkillBadgeProps {
  skill: Skill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  const IconComponent = ICON_MAP[skill.iconName] ?? Code2;
  const config = LEVEL_CONFIG[skill.level];

  return (
    <div
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all duration-200 hover:shadow-md hover:shadow-primary/5 cursor-default",
        "border border-border hover:border-primary/30",
        config.bg,
      )}
      title={`${skill.name} — ${config.label}`}
    >
      <IconComponent className="size-5 text-primary shrink-0 transition-transform duration-200 group-hover:scale-110" />
      <span className="text-sm font-medium text-foreground">{skill.name}</span>
      <span className={cn("text-[10px] font-medium text-muted-foreground ml-auto uppercase tracking-wider")}>
        {config.label}
      </span>
    </div>
  );
}