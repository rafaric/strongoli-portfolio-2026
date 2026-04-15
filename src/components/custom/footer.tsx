import { BackToTopButton } from "@/components/custom/back-to-top-button";

// Inline GitHub icon since lucide-react doesn't include it
const GithubIcon = ({ className }: { className?: string }) => (
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
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.2-2.7-.8-3.8-.2-.4-.5-.8-1-1.2l-.3-.3c-.5-.5-1.2-1-2-1.2a10 10 0 0 0-5.4 1.8c-1 .8-1.6 1.7-1.8 2.8 0 .5.1 1 .2 1.5v.3a4 4 8 0 0 1-3.2 3.8 6.6 6.6 0 0 0-3 1 4 4 0 0 0 .8 5.2c3 0 5.5-1.8 5.5-5.5 0-.6-.1-1.2-.2-1.8" />
    <path d="M9 22v-4a4.8 4.8 0 0 0-1-3.5c-3 0-6-2-6-5.5.1-1.3.2-2.7.8-3.8.2-.4.5-.8 1-1.2l.3-.3c.5-.5 1.2-1 2-1.2a10 10 0 0 1 5.4 1.8c1 .8 1.6 1.7 1.8 2.8 0 .5-.1 1-.2 1.5v.3a4 4 8 0 0 0 3.2 3.8 6.6 6.6 0 0 1 3 1 4 4 0 0 0-.8 5.2c3 0 5.5-1.8 5.5-5.5 0-.6.1-1.2.2-1.8" />
  </svg>
);

// Inline LinkedIn icon
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

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          © {currentYear} Rafael Strongoli. Todos los derechos reservados.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/rafaelstrongoli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub profile"
          >
            <GithubIcon className="size-5" />
          </a>
          <a
            href="https://linkedin.com/in/rafaelstrongoli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon className="size-5" />
          </a>
        </div>

        {/* Back to Top */}
        <BackToTopButton />
      </div>
    </footer>
  );
}