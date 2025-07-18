
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, UserRound } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
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
    { name: "Courses", path: "#courses", action: () => scrollToSection("courses") },
    { name: "Certifications", path: "#certifications", action: () => scrollToSection("certifications") },
    { name: "Hackathons", path: "#hackathons", action: () => scrollToSection("hackathons") },
    { name: "Events", path: "#events", action: () => scrollToSection("events") },
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
          {user ? (
            <Link to="/profile">
              <Avatar className="cursor-pointer transition-all hover:ring-2 hover:ring-primary">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-white">
                  {user.email?.[0]?.toUpperCase() || <UserRound className="h-5 w-5" />}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          )}

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
            {user ? (
              <Link 
                to="/profile"
                className="text-foreground/70 hover:text-foreground py-2 transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserRound className="mr-2 h-4 w-4" />
                Profile
              </Link>
            ) : (
              <Link 
                to="/signup"
                className="text-foreground/70 hover:text-foreground py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
