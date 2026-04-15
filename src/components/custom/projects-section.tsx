import { PROJECTS } from "@/lib/data/projects";
import { ProjectCard } from "@/components/custom/project-card";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Proyectos Destacados
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mt-4" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Algunos de los proyectos en los que he trabajado. Cada uno construido
            con foco en performance, UX y código limpio.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}