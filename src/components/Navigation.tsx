import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKEDIN_URL = "https://www.linkedin.com/in/imani-wells/";

const Navigation = () => {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    // { label: "About", path: "/about" },
    // { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="book-nav sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg text-primary hover:opacity-80 transition-opacity">
          ITD
        </Link>
        <div className="flex gap-2 md:gap-4">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              className="text-foreground hover:text-primary hover:bg-accent"
              asChild
            >
              <Link to={item.path}>{item.label}</Link>
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary hover:bg-accent"
            asChild
          >
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.9} />
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
