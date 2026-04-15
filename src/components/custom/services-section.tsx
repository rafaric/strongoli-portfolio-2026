import { SERVICES } from "@/lib/data/services";
import { FadeIn } from "@/components/custom/fade-in";
import { ServiceCard } from "@/components/custom/service-card";

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12">
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Servicios
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Lo que puedo hacer por tu proyecto
          </p>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}