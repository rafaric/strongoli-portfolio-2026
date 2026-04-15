import { MessageCircle, Mail, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/custom/fade-in";
import { ContactForm } from "@/components/custom/contact-form";

// Inline LinkedIn icon since lucide-react doesn't include social icons
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12">
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Contacto
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mt-4" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            ¿Tenés un proyecto en mente? Hablemos. Respondo en menos de 24hs.
          </p>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Direct Contact Buttons */}
          <FadeIn direction="right" className="space-y-6">
            <p className="text-muted-foreground mb-6">
              También podés contactarme directamente:
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/5491134567890?text=Hola%20Rafael%2C%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20charlar"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-green-500/40 hover:shadow-md hover:shadow-green-500/5"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                  <MessageCircle className="size-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block font-semibold text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    WhatsApp
                  </span>
                  <span className="block text-sm text-muted-foreground">Mensaje directo, sin compromiso</span>
                </div>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-green-600 dark:group-hover:text-green-400" />
              </a>

              <a
                href="mailto:rafael@strongoli.dev?subject=Consulta%20desde%20tu%20portfolio"
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="size-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block font-semibold text-foreground group-hover:text-primary transition-colors">
                    Email
                  </span>
                  <span className="block text-sm text-muted-foreground">rafael@strongoli.dev</span>
                </div>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </a>

              <a
                href="https://linkedin.com/in/rafaelstrongoli"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-500/5"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                  <LinkedinIcon className="size-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    LinkedIn
                  </span>
                  <span className="block text-sm text-muted-foreground">Conectemos profesionalmente</span>
                </div>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </a>
            </div>

            <p className="text-sm text-muted-foreground pt-4 flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-green-500 animate-pulse" />
              Respondo en menos de 24hs
            </p>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="left" delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}