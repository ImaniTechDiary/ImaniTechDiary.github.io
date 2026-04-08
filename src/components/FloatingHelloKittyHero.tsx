import { CSSProperties, useEffect, useRef, useState } from "react";
import defaultHelloKitty from "@/assets/Hello Kitty Mani.png";

type HeroPhase = "idle" | "entering" | "perched" | "burst" | "wave" | "done";

interface FloatingHelloKittyHeroProps {
  imageSrc?: string;
  size?: string | number;
  topOffset?: string | number;
  bottomOffset?: string | number;
  rightOffset?: string | number;
}

const ENTER_DURATION_MS = 3400;
const PERCH_DURATION_MS = 700;
const BURST_DURATION_MS = 1325;
const WAVE_DURATION_MS = 1200;

const toCssValue = (value: string | number) =>
  typeof value === "number" ? `${value}px` : value;

const FloatingHelloKittyHero = ({
  imageSrc = defaultHelloKitty,
  size = "clamp(88px, 10vw, 136px)",
  topOffset,
  bottomOffset,
  rightOffset = "clamp(-1.1rem, 1vw, 0.2rem)",
}: FloatingHelloKittyHeroProps) => {
  const [phase, setPhase] = useState<HeroPhase>("idle");
  const timeoutRef = useRef<number | null>(null);

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
      style={style}
    >
      <div className="floating-hello-kitty-hero__character">
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
