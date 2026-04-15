import Image from "next/image";
import { FadeIn } from "@/components/custom/fade-in";

export function AboutSection() {
  const bio = [
    "Hola, soy Rafael Strongoli. Como desarrollador frontend freelancer, me especializo en crear experiencias web rápidas, hermosas y orientadas a la conversión para startups y emprendedores de LatAm.",
    "Trabajo con Next.js 15, shadcn/ui y Tailwind para construir MVPs en tiempo récord, sin sacrificar calidad ni performance. Mi enfoque está en transformar ideas en productos digitales que realmente funcionan: que carguen rápido, se vean bien y conviertan.",
    "Si necesitás lanzar tu idea pronto o mejorar un producto existente, puedo ayudarte a hacerlo realidad con código limpio, moderno y optimizado para SEO y Core Web Vitals.",
  ].join(" ");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-card"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="right" className="mb-12">
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Sobre mí
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio Text - Left Column (desktop) */}
          <FadeIn direction="right" delay={0.1} className="space-y-6 order-2 lg:order-1">
            <p className="text-lg text-foreground leading-relaxed">{bio}</p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                Next.js 15
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                shadcn/ui
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                Tailwind
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent">
                MVPs Rápidos
              </span>
            </div>
          </FadeIn>

          {/* Photo - Right Column (desktop) */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <FadeIn direction="right" delay={0.2}>
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border-4 border-border/50 shadow-xl bg-muted">
                {/* TODO: Replace with actual professional photo */}
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm text-center px-4">
                    Foto profesional
                    <br />
                    (próximamente)
                  </span>
                </div>
                {/* When real image is available, uncomment below:
                <Image
                  src="/images/about.webp"
                  alt="Rafael Strongoli"
                  fill
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,..."
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                */}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}