import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { Navbar } from "@/components/custom/navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://strongoli.dev"),
  title: {
    default: "Rafael Strongoli — Frontend Developer",
    template: "%s | Rafael Strongoli",
  },
  description:
    "Freelance Frontend Developer especializado en Next.js, React y Tailwind. Construyo experiencias web rápidas, hermosas y que convierten para startups de LatAm.",
  keywords: [
    "Next.js developer",
    "React developer",
    "Frontend developer LatAm",
    "Freelance developer",
    "Next.js Argentina",
    "React developer Buenos Aires",
    "Tailwind CSS developer",
    "TypeScript developer",
  ],
  authors: [{ name: "Rafael Strongoli" }],
  creator: "Rafael Strongoli",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://strongoli.dev",
    siteName: "Rafael Strongoli",
    title: "Rafael Strongoli — Frontend Developer",
    description:
      "Freelance Frontend Developer especializado en Next.js, React y Tailwind. Construyo experiencias web rápidas y que convierten.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rafael Strongoli — Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafael Strongoli — Frontend Developer",
    description:
      "Freelance Frontend Developer especializado en Next.js, React y Tailwind.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rafael Strongoli",
  jobTitle: "Frontend Developer",
  url: "https://strongoli.dev",
  sameAs: ["https://github.com/rafaelstrongoli", "https://linkedin.com/in/rafaelstrongoli"],
  knowsAbout: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Frontend Development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} min-h-full antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
