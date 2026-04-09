import { CSSProperties, useEffect, useRef, useState } from "react";
import defaultHelloKitty from "@/assets/Hello Kitty Mani.png";
import speechBubble from "@/assets/Speech-Bubble.png";

type AnimationPhase = "idle" | "walking" | "pause" | "blink" | "wave" | "done";

interface WalkingHelloKittyProps {
  imageSrc?: string;
  triggerId?: string;
  stopPosition?: string | number;
  size?: string | number;
  bottom?: string | number;
}

const WALK_DURATION_MS = 4200;
const PAUSE_DURATION_MS = 500;
const BLINK_DURATION_MS = 220;
const WAVE_DURATION_MS = 1300;
const INTRO_BUBBLE_MS = 3200;

const HOVER_MESSAGES = [
  "Well pick one already!",
  "Go on!",
  "I got the juicy stuff too!",
];

const toCssValue = (value: string | number) =>
  typeof value === "number" ? `${value}px` : value;

const WalkingHelloKitty = ({
  imageSrc = defaultHelloKitty,
  triggerId = "projects-section",
  stopPosition = "calc(100% - clamp(7.75rem, 15vw, 10rem))",
  size = "clamp(88px, 11vw, 138px)",
  bottom = "clamp(8px, 2vw, 18px)",
}: WalkingHelloKittyProps) => {
  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const [hasTriggered, setHasTriggered] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState("");
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const [hasShownIntroBubble, setHasShownIntroBubble] = useState(false);
  const [hasShownHoverWelcome, setHasShownHoverWelcome] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const bubbleTimeoutRef = useRef<number | null>(null);
  const hoverMessageIndexRef = useRef(0);

  const clearBubbleTimeout = () => {
    if (bubbleTimeoutRef.current) {
      window.clearTimeout(bubbleTimeoutRef.current);
      bubbleTimeoutRef.current = null;
    }
  };

  const showBubble = (message: string, durationMs?: number) => {
    clearBubbleTimeout();
    setBubbleMessage(message);
    setIsBubbleVisible(true);

    if (durationMs) {
      bubbleTimeoutRef.current = window.setTimeout(() => {
        setIsBubbleVisible(false);
      }, durationMs);
    }
  };

  useEffect(() => {
    const triggerElement = document.getElementById(triggerId);

    if (!triggerElement || hasTriggered) return;

    // Observe inside the scrollable book viewport so the animation starts
    // when the projects section is actually visible to the user.
    const scrollRoot = triggerElement.closest(".book-content");
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        setHasTriggered(true);
        setPhase("walking");
        observer.disconnect();
      },
      {
        root: scrollRoot instanceof HTMLElement ? scrollRoot : null,
        threshold: 0.3,
      },
    );

    observer.observe(triggerElement);

    return () => observer.disconnect();
  }, [hasTriggered, triggerId]);

  useEffect(() => {
    if (!hasTriggered) return;

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    // Small timed state machine keeps the motion deterministic and easy to tune.
    switch (phase) {
      case "walking":
        timeoutRef.current = window.setTimeout(() => setPhase("pause"), WALK_DURATION_MS);
        break;
      case "pause":
        timeoutRef.current = window.setTimeout(() => setPhase("blink"), PAUSE_DURATION_MS);
        break;
      case "blink":
        timeoutRef.current = window.setTimeout(() => setPhase("wave"), BLINK_DURATION_MS);
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
  }, [hasTriggered, phase]);

  useEffect(() => {
    if (phase !== "done" || hasShownIntroBubble) return;

    showBubble("how the heck did you open the lock!?", INTRO_BUBBLE_MS);
    setHasShownIntroBubble(true);
  }, [hasShownIntroBubble, phase]);

  useEffect(() => {
    return () => {
      clearBubbleTimeout();
    };
  }, []);

  const style = {
    "--hello-kitty-stop": toCssValue(stopPosition),
    "--hello-kitty-size": toCssValue(size),
    "--hello-kitty-bottom": toCssValue(bottom),
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className="walking-hello-kitty"
      data-phase={phase}
      style={style}
    >
      <div
        className="walking-hello-kitty__character"
        onMouseEnter={() => {
          if (phase !== "done") return;

          if (!hasShownHoverWelcome) {
            showBubble("Well, I guess since you broke in, might as well be nosy!");
            setHasShownHoverWelcome(true);
            return;
          }

          const nextMessage = HOVER_MESSAGES[hoverMessageIndexRef.current % HOVER_MESSAGES.length];
          hoverMessageIndexRef.current += 1;
          showBubble(nextMessage);
        }}
        onMouseLeave={() => {
          clearBubbleTimeout();
          setIsBubbleVisible(false);
        }}
      >
        <div
          className="walking-hello-kitty__speech-bubble"
          data-visible={isBubbleVisible ? "true" : "false"}
        >
          <img
            src={speechBubble}
            alt=""
            className="walking-hello-kitty__speech-bubble-image"
            loading="lazy"
            decoding="async"
          />
          <div className="walking-hello-kitty__speech-bubble-text">{bubbleMessage}</div>
        </div>
        <div className="walking-hello-kitty__sparkle-trail">
          <span className="walking-hello-kitty__sparkle walking-hello-kitty__sparkle--one" />
          <span className="walking-hello-kitty__sparkle walking-hello-kitty__sparkle--two" />
          <span className="walking-hello-kitty__sparkle walking-hello-kitty__sparkle--three" />
        </div>
        <div className="walking-hello-kitty__glow" />
        <div className="walking-hello-kitty__shadow" />
        <div className="walking-hello-kitty__shell">
          <img
            src={imageSrc}
            alt=""
            className="walking-hello-kitty__image"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};

export default WalkingHelloKitty;
