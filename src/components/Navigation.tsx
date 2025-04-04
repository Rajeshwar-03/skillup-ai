
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // Close mobile menu
    setIsMenuOpen(false);
    
    // If we're not on the homepage, navigate to homepage first with a section hash
    if (location.pathname !== "/") {
      return;
    }
    
    // If we're already on the homepage, scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Courses", path: "/", action: () => {} },
    { name: "Features", path: "#features", action: () => scrollToSection("features") },
    { name: "Community", path: "#community", action: () => scrollToSection("community") },
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "py-2 bg-background/80 backdrop-blur-md shadow-sm" : "py-4"}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">SkillUp AI</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => {
                  if (link.path.startsWith('#')) {
                    e.preventDefault();
                    link.action();
                  }
                }}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center space-x-4">
          <Link to="/signup">
            <Button>Get Started</Button>
          </Link>

          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="bg-background border-t mt-4 py-4 shadow-lg">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => {
                  if (link.path.startsWith('#')) {
                    e.preventDefault();
                    link.action();
                  }
                  setIsMenuOpen(false);
                }}
                className="text-foreground/70 hover:text-foreground py-2 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
