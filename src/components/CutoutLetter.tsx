import { cn } from "@/lib/utils";

interface CutoutLetterProps {
  letter: string;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const CutoutLetter = ({ letter, variant = "primary", className, size = "lg" }: CutoutLetterProps) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transform transition-transform hover:scale-110";
  
  const variantStyles = {
    primary: "bg-foreground text-background",
    secondary: "bg-primary text-primary-foreground",
    accent: "bg-card text-foreground border-2 border-foreground",
  };

  const sizeStyles = {
    sm: "w-6 h-8 text-lg",
    md: "w-8 h-10 text-xl",
    lg: "w-10 h-12 text-2xl md:w-14 md:h-16 md:text-4xl",
    xl: "w-12 h-14 text-3xl md:w-16 md:h-20 md:text-5xl",
  };

  const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];
  const randomRotation = rotations[letter.charCodeAt(0) % rotations.length];

  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        randomRotation,
        "shadow-md rounded-sm",
        className
      )}
    >
      {letter}
    </span>
  );
};

export default CutoutLetter;
