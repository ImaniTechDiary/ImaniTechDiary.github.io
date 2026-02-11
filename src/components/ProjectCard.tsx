import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  hidePlaceholder?: boolean;
  href?: string;
  onTellMeMore?: () => void;
  imageClassName?: string;
  rotation?: number;
  className?: string;
}

const ProjectCard = ({ 
  title, 
  description, 
  tags, 
  image,
  hidePlaceholder = false,
  href,
  onTellMeMore,
  imageClassName,
  rotation = 0,
  className 
}: ProjectCardProps) => {
  // Random tape positions for scrapbook effect
  const tapePositions = [
    "top-0 left-1/4 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg]",
    "top-0 right-1/4 translate-x-1/2 -translate-y-1/2 rotate-[12deg]",
  ];

  return (
    <div
      className={cn(
        "project-card relative group hover:z-10",
        className
      )}
      style={{ "--card-rot": `${rotation}deg` } as CSSProperties}
    >
      {/* Tape strips */}
      <div className={cn("absolute w-12 h-4 bg-primary/20 backdrop-blur-sm z-20", tapePositions[0])} />
      <div className={cn("absolute w-10 h-4 bg-primary/20 backdrop-blur-sm z-20", tapePositions[1])} />
      
      {/* Stamp-like border */}
      <div className="relative bg-card border-4 border-dashed border-primary/40 p-1 shadow-lg">
        {/* Perforated edge effect */}
        <div className="absolute -left-1 top-0 bottom-0 w-2 flex flex-col justify-around">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-background rounded-full" />
          ))}
        </div>
        <div className="absolute -right-1 top-0 bottom-0 w-2 flex flex-col justify-around">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-background rounded-full" />
          ))}
        </div>
        
        {/* Card content */}
        <div className="bg-card p-4">
          {/* Project image placeholder */}
          <div className="w-full h-32 bg-primary/10 mb-3 flex items-center justify-center overflow-hidden">
            {image ? (
              <img src={image} alt={title} className={cn("w-full h-full object-cover", imageClassName)} />
            ) : hidePlaceholder ? (
              <div className="w-full h-full" />
            ) : (
              <div className="text-muted-foreground text-xs font-mono">[ screenshot ]</div>
            )}
          </div>
          
          {/* Title with handwritten style */}
          <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Card actions */}
          <div className="mt-4 flex items-center justify-between text-xs font-mono">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Visit project
              </a>
            ) : (
              <span />
            )}
            {onTellMeMore ? (
              <button
                type="button"
                onClick={onTellMeMore}
                className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
              >
                Tell me more
              </button>
            ) : null}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-2 -right-2 text-lg opacity-60 group-hover:opacity-100 transition-opacity">
        ✨
      </div>
    </div>
  );
};

export default ProjectCard;
