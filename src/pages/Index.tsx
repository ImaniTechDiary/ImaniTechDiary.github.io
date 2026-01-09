import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CutoutTitle from "@/components/CutoutTitle";
import BinaryCode from "@/components/BinaryCode";
import FloatingDoodle from "@/components/FloatingDoodle";
import KissMarkDecoration from "@/components/KissMarkDecoration";
import Navigation from "@/components/Navigation";
import ScrapbookBackground from "@/components/ScrapbookBackground";
import TypewriterText from "@/components/TypewriterText";
import { Laptop } from "lucide-react";
import { ArrowDown, Sparkles, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <Navigation />
      <ScrapbookBackground />
      
      {/* Floating Tech Doodles */}
      <FloatingDoodle icon="laptop" className="top-32 left-8 md:left-20" size={32} delay={0} />
      <FloatingDoodle icon="mouse" className="top-48 right-12 md:right-32" size={28} delay={0.5} />
      <FloatingDoodle icon="code" className="bottom-40 left-16 md:left-40" size={30} delay={1} />
      <FloatingDoodle icon="terminal" className="top-64 left-1/4" size={26} delay={1.5} />
      <FloatingDoodle icon="sparkles" className="bottom-60 right-20" size={24} delay={0.3} />
      <FloatingDoodle icon="heart" className="top-80 right-1/4" size={22} delay={0.8} />
      <FloatingDoodle icon="star" className="bottom-32 right-1/3" size={28} delay={1.2} />
      <FloatingDoodle icon="zap" className="top-1/3 right-12" size={24} delay={0.6} />

      {/* Kiss Mark Decorations */}
      <KissMarkDecoration className="top-24 left-4 md:left-16" size="lg" rotation={-15} opacity={0.2} />
      <KissMarkDecoration className="bottom-20 right-8 md:right-24" size="md" rotation={25} opacity={0.25} />
      <KissMarkDecoration className="top-1/2 left-8" size="sm" rotation={-30} opacity={0.15} />
      <KissMarkDecoration className="bottom-1/3 left-1/4" size="sm" rotation={45} opacity={0.2} />
      
      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-16">
        {/* Binary Code Animation */}
        <div className="mb-8 text-center">
          <BinaryCode />
        </div>

        {/* Main Title - Cutout Style */}
        <div className="mb-8 relative">
          <div className="absolute -inset-4 bg-accent/50 rounded-lg blur-xl" />
          <div className="relative bg-card/90 backdrop-blur-sm p-6 md:p-10 rounded-lg shadow-xl border-2 border-primary/30 flex items-center gap-1">
            <div className="transform rotate-12 hover:rotate-6 transition-transform duration-300">
              <Laptop 
                size={48} 
                className="text-primary drop-shadow-lg md:w-16 md:h-16" 
                strokeWidth={1.5}
              />
              <Heart 
                size={48} 
                className="text-primary drop-shadow-lg md:w-16 md:h-16" 
                strokeWidth={1.5}
                fill="none"
              />
            </div>
            <CutoutTitle text="Imani Tech Diary" size="xl" />
            <div className="transform rotate-12 hover:rotate-6 transition-transform duration-300">
              <Laptop 
                size={48} 
                className="text-primary drop-shadow-lg md:w-16 md:h-16" 
                strokeWidth={1.5}
              />
              <Heart 
                size={48} 
                className="text-primary drop-shadow-lg md:w-16 md:h-16" 
                strokeWidth={1.5}
                fill="none"
              />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 text-center max-w-md font-medium">
          <TypewriterText 
            phrases={["Software Engineer", "Designer", "Creative Coder", "Problem Solver"]} 
            typingSpeed={80}
            deletingSpeed={40}
            pauseDuration={1500}
          />
          <span className="inline-flex items-center ml-2 text-primary">
            <Sparkles size={18} className="animate-pulse" />
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button size="lg" className="font-semibold shadow-lg" asChild>
            <Link to="/projects">View Projects</Link>
          </Button>
          <Button variant="outline" size="lg" className="font-semibold" asChild>
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
          <span className="text-sm">Scroll to explore</span>
          <ArrowDown size={20} />
        </div> */}
      </main>

      {/* Decorative Quote */}
      <div className="absolute bottom-4 right-4 md:right-8 text-xs md:text-sm text-muted-foreground font-mono italic opacity-60">
        "The limit does not exist!"✨
      </div>
    </div>
  );
};

export default Index;
