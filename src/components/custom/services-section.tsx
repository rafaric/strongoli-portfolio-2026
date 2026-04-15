import { SERVICES } from "@/lib/data/services";
import { ServiceCard } from "@/components/custom/service-card";

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Servicios
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mt-4" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Lo que puedo hacer por tu proyecto. Desde landing pages hasta dashboards, todo construido con velocidad y calidad.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}