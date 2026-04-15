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
  title: "Rafael Strongoli — Frontend Developer",
  description:
    "Freelance frontend developer specializing in Next.js, React, and Tailwind. I build fast, conversion-focused web experiences for LatAm startups.",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://strongoli.dev",
    siteName: "Rafael Strongoli",
    title: "Rafael Strongoli — Frontend Developer",
    description:
      "Freelance frontend developer specializing in Next.js, React, and Tailwind. I build fast, conversion-focused web experiences for LatAm startups.",
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
      "Freelance frontend developer specializing in Next.js, React, and Tailwind.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
