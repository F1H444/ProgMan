import { HeroSection } from "@/components/home/HeroSection";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { TechStackMarquee } from "@/components/home/TechStackMarquee";
import { ProjectSection } from "@/components/home/ProjectSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <InfiniteMarquee />
      <ServicesSection />
      <AboutSection />
      <TechStackMarquee />
      <ProjectSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
