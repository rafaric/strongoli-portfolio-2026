import { HeroSection } from "@/components/custom/hero-section";
import { AboutSection } from "@/components/custom/about-section";
import { ProjectsSection } from "@/components/custom/projects-section";
import { SkillsSection } from "@/components/custom/skills-section";
import { ServicesSection } from "@/components/custom/services-section";
import { ContactSection } from "@/components/custom/contact-section";
import { Footer } from "@/components/custom/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}