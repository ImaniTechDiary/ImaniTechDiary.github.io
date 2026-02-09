import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
