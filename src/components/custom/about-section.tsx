import Image from "next/image";
import { FadeIn } from "@/components/custom/fade-in";

export function AboutSection() {
  const bio =
    "Hola, soy Rafael Strongoli. Como desarrollador frontend freelancer, me especializo en crear experiencias web rápidas, hermosas y orientadas a la conversión para startups y emprendedores de LatAm. Trabajo con Next.js 15, shadcn/ui y Tailwind para construir MVPs en tiempo récord, sin sacrificar calidad ni performance. Mi enfoque está en transformar ideas en productos digitales que realmente funcionan: que carguen rápido, se vean bien y conviertan. Si necesitás lanzar tu idea pronto o mejorar un producto existente, puedo ayudarte a hacerlo realidad con código limpio, moderno y optimizado para SEO y Core Web Vitals.";

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-card"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="mb-12">
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Sobre mí
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mt-4" />
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo - Left Column (desktop) */}
          <FadeIn direction="right" delay={0.1} className="order-1 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl ring-2 ring-primary/10">
              <Image
                src="/images/1000000136.jpg"
                alt="Rafael Strongoli — Desarrollador Frontend"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          {/* Bio Text - Right Column (desktop) */}
          <FadeIn direction="left" delay={0.2} className="space-y-6 order-2 lg:order-2">
            <p className="text-lg text-foreground/90 leading-relaxed">{bio}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                Next.js 15
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                shadcn/ui
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                Tailwind
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20">
                MVPs Rápidos
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}