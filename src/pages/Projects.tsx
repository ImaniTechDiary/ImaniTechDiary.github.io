import Navigation from "@/components/Navigation";
import ScrapbookBackground from "@/components/ScrapbookBackground";
import FloatingDoodle from "@/components/FloatingDoodle";
import KissMarkDecoration from "@/components/KissMarkDecoration";
import CutoutTitle from "@/components/CutoutTitle";
import ProjectCard from "@/components/ProjectCard";

// Sample projects data - easy to add more!
const projects = [
  // {
  //   id: 1,
  //   title: "E-Commerce Platform",
  //   description: "A full-stack shopping experience with cart functionality and payment integration.",
  //   tags: ["React", "Node.js", "Stripe"],
  //   rotation: -2,
  // },
  {
    id: 1,
    title: "Yem AP",
    description: "to write later...",
    tags: ["React", "Node.js", "Stripe"],
    rotation: -2,
    image: "/YemAPLogo.png",
    imageClassName: "yemAPLogo object-contain p-7",
    href: "yemap.pages.dev"
  },
  {
    id: 2,
    title: "MUNYUN",
    description: "to write later...",
    tags: ["TypeScript", "API", "Charts"],
    rotation: 3,
    image: "/Munyun-logo.png",
    href: "https://munyun.pages.dev/login",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Kanban-style productivity tool with drag-and-drop and team collaboration.",
    tags: ["React", "DnD", "Firebase"],
    rotation: -1,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Creative developer portfolio with unique animations and interactions.",
    tags: ["Design", "CSS", "Animation"],
    rotation: 2,
  },
  {
    id: 5,
    title: "Social Media Clone",
    description: "Feature-rich social platform with real-time updates and messaging.",
    tags: ["Full Stack", "WebSocket", "Auth"],
    rotation: -3,
  },
  {
    id: 6,
    title: "AI Chat Assistant",
    description: "Intelligent conversational interface powered by machine learning.",
    tags: ["AI", "Python", "NLP"],
    rotation: 1,
  },
];

const Projects = () => {
  return (
    <div className="min-h-full bg-background relative">
      <Navigation />
      <ScrapbookBackground />
      
      {/* Floating Doodles */}
      <FloatingDoodle icon="code" className="top-32 right-12" size={28} delay={0} />
      <FloatingDoodle icon="terminal" className="top-48 left-16" size={26} delay={0.5} />
      <FloatingDoodle icon="sparkles" className="bottom-40 right-24" size={24} delay={1} />
      <FloatingDoodle icon="star" className="bottom-60 left-20" size={22} delay={0.3} />
      
      {/* Kiss Mark Decorations */}
      <KissMarkDecoration className="top-20 right-8" size="md" rotation={20} opacity={0.2} />
      <KissMarkDecoration className="bottom-32 left-12" size="sm" rotation={-25} opacity={0.15} />
      
      {/* Main Content */}
      <main className="relative z-10 min-h-full px-4 md:px-8 pt-24 pb-16">
        {/* Page Title */}
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <div className="absolute -inset-4 bg-accent/50 rounded-lg blur-xl" />
            <div className="relative bg-card/90 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-xl border-2 border-primary/30">
              <CutoutTitle text="My Projects" size="lg" />
            </div>
          </div>
          <p className="mt-6 text-muted-foreground font-mono text-sm">
            ~ a collection of things I've built ~
          </p>
        </div>
        
        {/* Projects Grid - Collage Style */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                rotation={project.rotation}
                image={project.image}
                href={project.href}
                imageClassName={project.imageClassName}
              />
            ))}
          </div>
        </div>
        
        {/* Bottom decorative text */}
        <div className="mt-16 flex items-center justify-center gap-3 text-center">
          <span className="text-base text-primary font-semibold font-mono italic">
            "Get in loser, we're building apps"
          </span>
          <img
            src="/PinkCar.png"
            alt="Pink car"
            className="w-16 h-auto opacity-90"
          />
        </div>
      </main>
    </div>
  );
};

export default Projects;
