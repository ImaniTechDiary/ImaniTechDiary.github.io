import { useState } from "react";
import Navigation from "@/components/Navigation";
import ScrapbookBackground from "@/components/ScrapbookBackground";
import FloatingDoodle from "@/components/FloatingDoodle";
import KissMarkDecoration from "@/components/KissMarkDecoration";
import CutoutTitle from "@/components/CutoutTitle";
import ProjectCard from "@/components/ProjectCard";
import ProjectEnvelopeModal, { ProjectModalContent } from "@/components/ProjectEnvelopeModal";

// Sample projects data - easy to add more!
interface ProjectItem extends ProjectModalContent {
  id: number;
  tags: string[];
  rotation: number;
  image?: string;
  imageClassName?: string;
  href?: string;
}

const projects: ProjectItem[] = [
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
    image: "/YemAPMainLogo.png",
    imageClassName: "yemAPLogo object-contain p-0 w-[125%] h-[125%] max-w-none",
    href: "https://yemap.pages.dev",
    summary: "A focused platform built to organize AP exam prep with cleaner workflows and a faster UI.",
    features: [
      "Structured AP subject pages with focused resources",
      "Responsive interface for mobile and desktop study sessions",
      "Fast-loading front end optimized for quick navigation",
    ],
    links: [
      { label: "Live Site", url: "https://yemap.pages.dev" },
    ],
  },
  {
    id: 2,
    title: "MUNYUN",
    description: "to write later...",
    tags: ["TypeScript", "API", "Charts"],
    rotation: 3,
    image: "/Munyun-logo.png",
    href: "https://munyun.pages.dev/login",
    summary: "MUNYUN helps track money activity with a cleaner dashboard and easier account flows.",
    features: [
      "Authentication flow and protected dashboard pages",
      "Data-driven widgets for quick financial snapshots",
      "Simple structure for adding future analytics modules",
    ],
    links: [
      { label: "Live App", url: "https://munyun.pages.dev/login" },
    ],
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Creative developer portfolio with unique animations and interactions.",
    tags: ["Design", "CSS", "Animation"],
    rotation: -1,
    image: "/ITD-logo.png",
    imageClassName: "object-contain p-0.5 w-[95%] h-auto mx-auto",
    href: "https://imanitechdiary.github.io/",
    summary: "A personality-driven portfolio focused on visual storytelling, motion, and project highlights.",
    features: [
      "Custom visual theme with scrapbook-inspired components",
      "Project-first information architecture",
      "Reusable React components for quick iteration",
    ],
    links: [
      { label: "Portfolio", url: "https://imanitechdiary.github.io/" },
    ],
  },
  {
    id: 4,
    title: "Task Management App",
    description: "Kanban-style productivity tool with drag-and-drop and team collaboration.",
    tags: ["React", "DnD", "Firebase"],
    rotation: 2,
    summary: "A collaborative kanban workflow tool built for planning and execution across teams.",
    features: [
      "Drag-and-drop board interactions",
      "Task ownership and progress visibility",
      "Cloud-ready backend integration",
    ],
  },
  {
    id: 5,
    title: "Social Media Clone",
    description: "Feature-rich social platform with real-time updates and messaging.",
    tags: ["Full Stack", "WebSocket", "Auth"],
    rotation: -3,
    summary: "A social feed concept with live updates, messaging, and identity-aware interactions.",
    features: [
      "Real-time post and chat events",
      "Authentication and profile-aware feeds",
      "Scalable full-stack architecture patterns",
    ],
  },
  {
    id: 6,
    title: "AI Chat Assistant",
    description: "Intelligent conversational interface powered by machine learning.",
    tags: ["AI", "Python", "NLP"],
    rotation: 1,
    summary: "An assistant interface focused on natural conversation, context carry-over, and practical AI outputs.",
    features: [
      "Conversational prompt orchestration",
      "Context handling for more coherent responses",
      "Extensible architecture for tool integrations",
    ],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

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
                onTellMeMore={() => setSelectedProject(project)}
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

      <ProjectEnvelopeModal
        isOpen={Boolean(selectedProject)}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Projects;
