import { PROJECTS } from "@/lib/data/projects";
import { FadeIn } from "@/components/custom/fade-in";
import { ProjectCard } from "@/components/custom/project-card";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12">
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Proyectos Destacados
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Algunos de los proyectos en los que he trabajado
          </p>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}