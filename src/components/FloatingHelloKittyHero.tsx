import { CSSProperties, useEffect, useRef, useState } from "react";
import defaultHelloKitty from "@/assets/Hello Kitty Mani.png";
import speechBubble from "@/assets/Speech-Bubble.png";

type HeroPhase = "idle" | "entering" | "perched" | "burst" | "wave" | "done";

interface FloatingHelloKittyHeroProps {
  imageSrc?: string;
  size?: string | number;
  topOffset?: string | number;
  bottomOffset?: string | number;
  rightOffset?: string | number;
  hideFloorKey?: boolean;
}

const ENTER_DURATION_MS = 3400;
const PERCH_DURATION_MS = 700;
const BURST_DURATION_MS = 1325;
const WAVE_DURATION_MS = 1200;
const HERO_BUBBLE_SHOW_MS = 2400;
const HERO_BUBBLE_GAP_MS = 360;
const HERO_HOVER_WARNINGS = [
  "Don't click that!",
  "I mean it!",
  "I'm not playing with you!",
  "Don't do it!",
];

const toCssValue = (value: string | number) =>
  typeof value === "number" ? `${value}px` : value;

const FloatingHelloKittyHero = ({
  imageSrc = defaultHelloKitty,
  size = "clamp(88px, 10vw, 136px)",
  topOffset,
  bottomOffset,
  rightOffset = "clamp(-1.1rem, 1vw, 0.2rem)",
  hideFloorKey = false,
}: FloatingHelloKittyHeroProps) => {
  const [phase, setPhase] = useState<HeroPhase>("idle");
  const [bubbleMessage, setBubbleMessage] = useState("");
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const bubbleSequenceRef = useRef<number[]>([]);
  const lastHoverWarningRef = useRef<string | null>(null);
  const wasHideFloorKeyRef = useRef(false);

  const clearBubbleSequence = () => {
    bubbleSequenceRef.current.forEach((timer) => window.clearTimeout(timer));
    bubbleSequenceRef.current = [];
  };

  useEffect(() => {
    const startTimer = window.setTimeout(() => {
      setPhase("entering");
    }, 250);

    return () => window.clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    // Simple phase progression keeps the entrance easy to reason about and tune.
    switch (phase) {
      case "entering":
        timeoutRef.current = window.setTimeout(() => setPhase("perched"), ENTER_DURATION_MS);
        break;
      case "perched":
        timeoutRef.current = window.setTimeout(() => setPhase("burst"), PERCH_DURATION_MS);
        break;
      case "burst":
        timeoutRef.current = window.setTimeout(() => setPhase("wave"), BURST_DURATION_MS);
        break;
      case "wave":
        timeoutRef.current = window.setTimeout(() => setPhase("done"), WAVE_DURATION_MS);
        break;
      default:
        timeoutRef.current = null;
    }

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;

    const timers: number[] = [];

    setBubbleMessage("Oh, hey! What are you doing here?");
    setIsBubbleVisible(true);

    timers.push(
      window.setTimeout(() => {
        setIsBubbleVisible(false);
      }, HERO_BUBBLE_SHOW_MS),
    );

    timers.push(
      window.setTimeout(() => {
        setBubbleMessage("Don't go reading my diary!");
        setIsBubbleVisible(true);
      }, HERO_BUBBLE_SHOW_MS + HERO_BUBBLE_GAP_MS),
    );

    timers.push(
      window.setTimeout(() => {
        setIsBubbleVisible(false);
      }, HERO_BUBBLE_SHOW_MS * 2 + HERO_BUBBLE_GAP_MS),
    );

    bubbleSequenceRef.current = timers;

    return () => {
      clearBubbleSequence();
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;

    if (hideFloorKey && !wasHideFloorKeyRef.current) {
      clearBubbleSequence();
      const availableWarnings = HERO_HOVER_WARNINGS.filter(
        (warning) => warning !== lastHoverWarningRef.current,
      );
      const nextWarning =
        availableWarnings[Math.floor(Math.random() * availableWarnings.length)] ??
        HERO_HOVER_WARNINGS[0];

      lastHoverWarningRef.current = nextWarning;
      setBubbleMessage(nextWarning);
      setIsBubbleVisible(true);
    } else if (!hideFloorKey && bubbleMessage !== "" && HERO_HOVER_WARNINGS.includes(bubbleMessage)) {
      setIsBubbleVisible(false);
    }

    wasHideFloorKeyRef.current = hideFloorKey;
  }, [bubbleMessage, hideFloorKey, phase]);

  const style = {
    "--hero-kitty-size": toCssValue(size),
    "--hero-kitty-right": toCssValue(rightOffset),
  } as CSSProperties;

  if (topOffset !== undefined) {
    style["--hero-kitty-top" as keyof CSSProperties] = toCssValue(topOffset) as never;
  }

  if (bottomOffset !== undefined) {
    style["--hero-kitty-bottom" as keyof CSSProperties] = toCssValue(bottomOffset) as never;
  }

  return (
    <div
      aria-hidden="true"
      className="floating-hello-kitty-hero"
      data-phase={phase}
      data-hide-floor-key={hideFloorKey ? "true" : "false"}
      style={style}
    >
      <div className="floating-hello-kitty-hero__character">
        <div
          className="floating-hello-kitty-hero__speech-bubble"
          data-visible={isBubbleVisible ? "true" : "false"}
        >
          <img
            src={speechBubble}
            alt=""
            className="floating-hello-kitty-hero__speech-bubble-image"
            loading="eager"
            decoding="async"
          />
          <div className="floating-hello-kitty-hero__speech-bubble-text">{bubbleMessage}</div>
        </div>
        <div className="floating-hello-kitty-hero__confetti-cloud">
          <span className="floating-hello-kitty-hero__confetti floating-hello-kitty-hero__confetti--pink" />
          <span className="floating-hello-kitty-hero__confetti floating-hello-kitty-hero__confetti--black" />
          <span className="floating-hello-kitty-hero__confetti floating-hello-kitty-hero__confetti--gold" />
          <span className="floating-hello-kitty-hero__confetti floating-hello-kitty-hero__confetti--pink-2" />
          <span className="floating-hello-kitty-hero__confetti floating-hello-kitty-hero__confetti--gold-2" />
        </div>
        <div className="floating-hello-kitty-hero__balloons">
          <span className="floating-hello-kitty-hero__string floating-hello-kitty-hero__string--one" />
          <span className="floating-hello-kitty-hero__string floating-hello-kitty-hero__string--two" />
          <span className="floating-hello-kitty-hero__string floating-hello-kitty-hero__string--three" />
          <span className="floating-hello-kitty-hero__balloon floating-hello-kitty-hero__balloon--one" />
          <span className="floating-hello-kitty-hero__balloon floating-hello-kitty-hero__balloon--two" />
          <span className="floating-hello-kitty-hero__balloon floating-hello-kitty-hero__balloon--three" />
        </div>
        <div className="floating-hello-kitty-hero__glow" />
        <div className="floating-hello-kitty-hero__seat-shadow" />
        <div className="floating-hello-kitty-hero__diary-key">
          <span className="floating-hello-kitty-hero__diary-key-bow" />
          <span className="floating-hello-kitty-hero__diary-key-shaft" />
          <span className="floating-hello-kitty-hero__diary-key-teeth" />
        </div>
        <img
          src={imageSrc}
          alt=""
          className="floating-hello-kitty-hero__image"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
};

export default FloatingHelloKittyHero;
