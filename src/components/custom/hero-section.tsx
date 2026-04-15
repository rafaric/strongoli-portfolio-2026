import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/custom/fade-in";

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 animate-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <FadeIn direction="left" className="space-y-6">
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
            >
              Desarrollador Frontend | Especialista en Next.js 15 + shadcn/ui + Tailwind | Creo MVPs rápidos y hermosos para startups y emprendedores
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
              Transformo ideas en productos digitales de alta calidad. Enfoque en UX, performance y conversión.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">
                <a href="#contact">Contactame</a>
              </Button>
              <Button size="lg" variant="outline">
                <a href="#projects">Proyectos</a>
              </Button>
            </div>
          </FadeIn>

          {/* Avatar / Photo */}
          <FadeIn direction="right" delay={0.2} className="flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-border/50 shadow-2xl">
              {/* TODO: Replace with actual avatar image - ADD priority={true} when real image is added for LCP */}
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-lg">Foto de Perfil</span>
              </div>
              {/* When real image is available, uncomment below:
              <Image
                src="/images/avatar.webp"
                alt="Rafael Strongoli"
                fill
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,..."
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              */}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}