import CutoutLetter from "./CutoutLetter";

interface CutoutTitleProps {
  text: string;
  size?: "sm" | "md" | "lg" | "xl";
  emphasizeFirstLetter?: boolean;
}

const CutoutTitle = ({ text, size = "lg", emphasizeFirstLetter = false }: CutoutTitleProps) => {
  const words = text.split(" ");
  const variants: Array<"primary" | "secondary" | "accent"> = ["primary", "secondary", "accent"];
  const firstLetterSizeStyles = {
    sm: "w-8 h-10 text-2xl",
    md: "w-10 h-12 text-3xl",
    lg: "w-[3.25rem] h-16 text-4xl md:w-[4.5rem] md:h-[5.5rem] md:text-6xl",
    xl: "w-16 h-[4.5rem] text-5xl md:w-24 md:h-32 md:text-7xl",
  };

  return (
    <div className="flex flex-wrap items-end justify-center gap-2 md:gap-4">
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="flex items-end gap-0.5 md:gap-1">
          {word.split("").map((letter, letterIndex) => (
            <CutoutLetter
              key={`${wordIndex}-${letterIndex}`}
              letter={letter}
              variant={variants[(wordIndex + letterIndex) % variants.length]}
              size={size}
              className={
                emphasizeFirstLetter && letterIndex === 0
                  ? `bg-[#FF2D8B] text-white border-0 shadow-[0_6px_0_rgba(138,0,74,0.42)] [clip-path:polygon(0%_12%,6%_6%,12%_12%,18%_6%,24%_12%,30%_6%,36%_12%,42%_6%,48%_12%,54%_6%,60%_12%,66%_6%,72%_12%,78%_6%,84%_12%,90%_6%,96%_12%,100%_20%,94%_26%,100%_32%,94%_38%,100%_44%,94%_50%,100%_56%,94%_62%,100%_68%,94%_74%,100%_80%,94%_86%,100%_92%,94%_100%,88%_94%,82%_100%,76%_94%,70%_100%,64%_94%,58%_100%,52%_94%,46%_100%,40%_94%,34%_100%,28%_94%,22%_100%,16%_94%,10%_100%,4%_94%,0%_88%,6%_82%,0%_76%,6%_70%,0%_64%,6%_58%,0%_52%,6%_46%,0%_40%,6%_34%,0%_28%,6%_22%,0%_16%)] ${firstLetterSizeStyles[size]}`
                  : undefined
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CutoutTitle;
