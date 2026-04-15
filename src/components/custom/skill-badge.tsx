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

interface SkillBadgeProps {
  skill: Skill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  // Level indicator configuration
  const levelConfig = {
    expert: {
      dotSize: "size-3",
      opacity: "opacity-100",
      label: "Experto",
    },
    advanced: {
      dotSize: "size-2.5",
      opacity: "opacity-70",
      label: "Avanzado",
    },
    intermediate: {
      dotSize: "size-2",
      opacity: "opacity-50",
      label: "Intermedio",
    },
  };

  const config = levelConfig[skill.level];
  const IconComponent = ICON_MAP[skill.iconName] ?? Code2;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border bg-card px-3 py-2",
        "transition-colors hover:bg-accent/10"
      )}
      title={`${skill.name} - ${config.label}`}
    >
      <IconComponent className="size-5 text-primary" />
      <span className="text-sm font-medium text-foreground">{skill.name}</span>
      <span
        className={cn(
          "ml-auto rounded-full bg-primary",
          config.dotSize,
          config.opacity
        )}
        aria-label={`Nivel: ${config.label}`}
      />
    </div>
  );
}