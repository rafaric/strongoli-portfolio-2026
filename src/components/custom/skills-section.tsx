import { SKILLS_BY_CATEGORY } from "@/lib/data/skills";
import { FadeIn } from "@/components/custom/fade-in";
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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12">
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Stack & Skills
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tecnologías y herramientas con las que trabajo
          </p>
        </FadeIn>

        <div className="space-y-12">
          {categories.map(([category, skills], index) => (
            <FadeIn key={category} delay={index * 0.1}>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {CATEGORY_LABELS[category]}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {skills.map((skill) => (
                    <SkillBadge key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}