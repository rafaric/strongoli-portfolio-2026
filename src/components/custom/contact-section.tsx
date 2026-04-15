import { MessageCircle, Mail } from "lucide-react";
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
  // TODO: Replace with actual contact information
  const whatsappLink = "https://wa.me/54911XXXXXXXX?text=Hola%20Rafael";
  const emailLink = "mailto:rafael@strongoli.dev?subject=Consulta%20desde%20portfolio";
  const linkedinLink = "https://linkedin.com/in/rafaelstrongoli";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12">
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Contacto
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            ¿Tenés un proyecto en mente? Hablemos.
          </p>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Direct Contact Links */}
          <div className="space-y-6">
            <p className="text-muted-foreground">
              También podés contactarme directamente por cualquiera de estos canales:
            </p>
            <div className="flex flex-col gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border bg-card p-4 text-foreground transition-colors hover:bg-accent/10 hover:text-primary"
              >
                <MessageCircle className="size-6 text-primary" />
                <span className="font-medium">WhatsApp</span>
              </a>
              <a
                href={emailLink}
                className="flex items-center gap-3 rounded-lg border bg-card p-4 text-foreground transition-colors hover:bg-accent/10 hover:text-primary"
              >
                <Mail className="size-6 text-primary" />
                <span className="font-medium">Email</span>
              </a>
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border bg-card p-4 text-foreground transition-colors hover:bg-accent/10 hover:text-primary"
              >
                <LinkedinIcon className="size-6 text-primary" />
                <span className="font-medium">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}