import { useEffect, useState } from "react";

const BinaryCode = () => {
  const [displayText, setDisplayText] = useState("");
  const targetText = "That's So Mani";
  const binaryPhrase = "01010100 01101000 01100001 01110100 00100111 01110011 00100000 01010011 01101111 00100000 01001101 01100001 01101110 01101001"; // "That's So Mani" in binary
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= binaryPhrase.length) {
        setDisplayText(binaryPhrase.slice(0, index));
        index++;
      } else {
        // Reset after showing full binary, then show decoded text briefly
        setTimeout(() => {
          setDisplayText(targetText);
          setTimeout(() => {
            index = 0;
            setDisplayText("");
          }, 2000);
        }, 1000);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-primary text-xs md:text-sm tracking-wider">
      <span className="animate-pulse">{displayText}</span>
      <span className="animate-pulse">_</span>
    </div>
  );
};

export default BinaryCode;
