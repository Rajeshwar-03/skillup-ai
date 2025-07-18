
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Courses } from "@/components/Courses";
import { Certifications } from "@/components/Certifications";
import { Hackathons } from "@/components/Hackathons";
import { Events } from "@/components/Events";
import { Community } from "@/components/Community";
import { AIChat } from "@/components/AIChat";
import { Footer } from "@/components/Footer";

const Index = () => {
  const location = useLocation();
  const initialRender = useRef(true);

  // Reset scroll position when the page loads
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      window.scrollTo(0, 0);
      
      // Check if we should scroll to a specific section
      const scrollToSection = location.state?.scrollTo;
      if (scrollToSection) {
        setTimeout(() => {
          const section = document.getElementById(scrollToSection);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500); // Small delay to ensure components are rendered
      }
    }
  }, [location]);

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <div id="courses">
        <Courses />
      </div>
      <Certifications />
      <Hackathons />
      <Events />
      <Community />
      <AIChat />
      <Footer />
    </main>
  );
};

export default Index;
