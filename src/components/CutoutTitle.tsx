import CutoutLetter from "./CutoutLetter";

interface CutoutTitleProps {
  text: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const CutoutTitle = ({ text, size = "lg" }: CutoutTitleProps) => {
  const words = text.split(" ");
  const variants: Array<"primary" | "secondary" | "accent"> = ["primary", "secondary", "accent"];

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="flex gap-0.5 md:gap-1">
          {word.split("").map((letter, letterIndex) => (
            <CutoutLetter
              key={`${wordIndex}-${letterIndex}`}
              letter={letter}
              variant={variants[(wordIndex + letterIndex) % variants.length]}
              size={size}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CutoutTitle;
