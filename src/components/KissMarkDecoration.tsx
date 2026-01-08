import kissMarkImage from "@/assets/kiss-mark.png";
import { cn } from "@/lib/utils";

interface KissMarkDecorationProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  rotation?: number;
  opacity?: number;
}

const KissMarkDecoration = ({ 
  className, 
  size = "md", 
  rotation = 0,
  opacity = 0.3 
}: KissMarkDecorationProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  return (
    <img
      src={kissMarkImage}
      alt=""
      aria-hidden="true"
      className={cn(
        sizeClasses[size],
        "absolute pointer-events-none select-none",
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
        opacity,
      }}
    />
  );
};

export default KissMarkDecoration;
