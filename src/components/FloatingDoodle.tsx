import { cn } from "@/lib/utils";
import { Laptop, Mouse, Code, Terminal, Sparkles, Heart, Star, Zap } from "lucide-react";

interface FloatingDoodleProps {
  icon: "laptop" | "mouse" | "code" | "terminal" | "sparkles" | "heart" | "star" | "zap";
  className?: string;
  size?: number;
  delay?: number;
}

const iconMap = {
  laptop: Laptop,
  mouse: Mouse,
  code: Code,
  terminal: Terminal,
  sparkles: Sparkles,
  heart: Heart,
  star: Star,
  zap: Zap,
};

const FloatingDoodle = ({ icon, className, size = 24, delay = 0 }: FloatingDoodleProps) => {
  const Icon = iconMap[icon];

  return (
    <div
      className={cn(
        "absolute text-primary opacity-60 animate-bounce",
        className
      )}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: "3s",
      }}
    >
      <Icon size={size} strokeWidth={1.5} />
    </div>
  );
};

export default FloatingDoodle;
