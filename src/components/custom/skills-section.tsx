import { SKILLS_BY_CATEGORY } from "@/lib/data/skills";
import { SkillBadge } from "@/components/custom/skill-badge";

const CATEGORY_LABELS: Record<string, string> = {
  frontend: "Frontend",
  tools: "Herramientas",
  platform: "Plataforma",
};

export function SkillsSection() {
  const categories = Object.entries(SKILLS_BY_CATEGORY);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Stack & Skills
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mt-4" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Tecnologías y herramientas con las que trabajo día a día
          </p>
        </div>

        <div className="space-y-12">
          {categories.map(([category, skills], index) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {CATEGORY_LABELS[category]}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <SkillBadge key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}