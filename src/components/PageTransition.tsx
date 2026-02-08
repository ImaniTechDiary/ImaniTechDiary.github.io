import { ReactNode, useState, useEffect, useRef } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Projects from "@/pages/Projects";
import NotFound from "@/pages/NotFound";

interface PageTransitionProps {
  children?: ReactNode;
}

// Map of routes to their components
const routeComponents: Record<string, ReactNode> = {
  "/": <Index />,
  "/projects": <Projects />,
};

const getPageForPath = (pathname: string): ReactNode => {
  return routeComponents[pathname] || <NotFound />;
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isFlipping, setIsFlipping] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [flippingPath, setFlippingPath] = useState<string | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setCurrentPath(location.pathname)
      return;
    }

    // if (currentPath !== location.pathname) {
    // ** Only trigger if the path actually changed
    if (currentPath !== location.pathname && !isFlipping) {
      // Start flip animation - keep showing old path as flipping page
      setFlippingPath(currentPath);
      setIsFlipping(true);
      // Update current path to show new content underneath
      // setCurrentPath(location.pathname);
      // ** Delay updating current path slightly to ensure old content renders first before page flip
      const updatePathTimer = setTimeout(() => {
        setCurrentPath(location.pathname)
      }, 50);
      
      const animationEndTimer = setTimeout(() => {
        setIsFlipping(false);
        setFlippingPath(null);
      }, 2800);

      return () => {
        clearTimeout(updatePathTimer)
        clearTimeout(animationEndTimer);
      };
    }
  // }, [location.pathname, currentPath]);
  }, [location.pathname]);

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ perspective: '3200px' }}>
      {/* New page content underneath */}
      <div className="h-full w-full">
        {getPageForPath(currentPath)}
      </div>
      
      {/* Flipping page overlay - shows OLD page content */}
      {isFlipping && flippingPath && (
        <div className="book-flip-overlay absolute inset-0 z-50 h-full w-full pointer-events-none">
          <div className="page-sheet">
            <div className="page-face page-front">
              {getPageForPath(flippingPath)}
            </div>
            <div className="page-face page-back">
              <div className="page-back-paper" />
            </div>
            <div className="page-edge" />
            <div className="page-curl" />
            <div className="page-light-sweep" />
          </div>
        </div>
      )}
      
      {/* Shadow cast on the new page */}
      {isFlipping && (
        <div 
          className="absolute inset-0 pointer-events-none z-40"
          style={{
            background: 'linear-gradient(to right, rgba(15,23,42,0.35) 0%, rgba(15,23,42,0.18) 22%, rgba(15,23,42,0.06) 45%, transparent 70%)',
            animation: 'shadow-sweep 2.2s cubic-bezier(0.2, 0.1, 0.2, 1) forwards'
          }}
        />
      )}

      <style>{`
        .book-flip-overlay {
          perspective: 3200px;
          transform-style: preserve-3d;
        }

        .page-sheet {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          transform-origin: left center;
          animation: page-turn 2.2s cubic-bezier(0.18, 0.08, 0.18, 1) forwards;
          filter: drop-shadow(0 18px 30px rgba(15, 23, 42, 0.15));
          border-bottom-right-radius: 22% 8%;
          transform: translateZ(0);
        }

        .page-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          background: hsl(var(--background));
        }

        .page-front {
          transform: translateZ(0.8px);
        }

        .page-back {
          transform: rotateY(180deg) translateZ(0.8px);
          background: hsl(var(--background));
        }

        .page-back-paper {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(120deg, rgba(15,23,42,0.08), transparent 45%),
            radial-gradient(60% 80% at 10% 50%, rgba(15,23,42,0.08), transparent 70%),
            repeating-linear-gradient(
              0deg,
              rgba(15,23,42,0.03) 0px,
              rgba(15,23,42,0.03) 1px,
              transparent 1px,
              transparent 4px
            );
          opacity: 0.7;
        }

        .page-edge {
          position: absolute;
          top: 0;
          bottom: 0;
          right: -1px;
          width: 8px;
          background: linear-gradient(
            to right,
            rgba(15,23,42,0.25),
            rgba(255,255,255,0.45),
            rgba(15,23,42,0.15)
          );
          transform: translateZ(1.6px);
          opacity: 0.85;
        }

        .page-curl {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 160px;
          background: linear-gradient(
            to left,
            rgba(15,23,42,0.35) 0%,
            rgba(15,23,42,0.18) 18%,
            rgba(255,255,255,0.15) 38%,
            transparent 100%
          );
          mix-blend-mode: multiply;
          opacity: 0.75;
          transform: translateZ(1px);
          animation: page-curl 2.2s cubic-bezier(0.18, 0.08, 0.18, 1) forwards;
          clip-path: path("M0 0 Q 120 12 160 0 L 160 1000 Q 120 980 0 1000 Z");
        }

        .page-light-sweep {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            rgba(255,255,255,0.0) 25%,
            rgba(255,255,255,0.25) 50%,
            rgba(255,255,255,0.0) 75%
          );
          opacity: 0.7;
          transform: translateZ(1.2px);
          animation: light-sweep 2.2s ease-in-out forwards;
        }

        @keyframes page-turn {
          0% {
            transform: perspective(3200px) rotateY(0deg) rotateX(0deg) rotateZ(0deg) translateX(0%) translateY(0%);
            opacity: 1;
          }
          18% {
            transform: perspective(3200px) rotateY(-18deg) rotateX(2deg) rotateZ(-0.2deg) translateX(0.2%) translateY(-0.2%);
          }
          40% {
            transform: perspective(3200px) rotateY(-52deg) rotateX(4deg) rotateZ(-0.5deg) translateX(0.6%) translateY(-0.4%);
          }
          62% {
            transform: perspective(3200px) rotateY(-96deg) rotateX(5deg) rotateZ(-0.8deg) translateX(1.1%) translateY(-0.3%);
            opacity: 0.95;
          }
          82% {
            transform: perspective(3200px) rotateY(-138deg) rotateX(4deg) rotateZ(-0.9deg) translateX(1.7%) translateY(-0.1%);
            opacity: 0.6;
          }
          100% {
            transform: perspective(3200px) rotateY(-180deg) rotateX(3deg) rotateZ(-0.7deg) translateX(2.2%) translateY(0%);
            opacity: 0;
          }
        }

        @keyframes page-curl {
          0% { opacity: 0.15; transform: scaleX(0.6) translateZ(1px) translateY(0%); }
          25% { opacity: 0.75; transform: scaleX(1.2) translateZ(1px) translateY(0.5%); }
          55% { opacity: 0.6; transform: scaleX(1.55) translateZ(1px) translateY(1.2%); }
          80% { opacity: 0.35; transform: scaleX(1.15) translateZ(1px) translateY(1.6%); }
          100% { opacity: 0; transform: scaleX(0.2) translateZ(1px) translateY(1.8%); }
        }

        @keyframes light-sweep {
          0% { opacity: 0.0; transform: translateX(-15%) translateZ(1.2px); }
          30% { opacity: 0.45; transform: translateX(0%) translateZ(1.2px); }
          60% { opacity: 0.25; transform: translateX(10%) translateZ(1.2px); }
          100% { opacity: 0.0; transform: translateX(20%) translateZ(1.2px); }
        }

        @keyframes shadow-sweep {
          0% { opacity: 0; transform: translateX(-10%); }
          25% { opacity: 0.8; transform: translateX(0%); }
          55% { opacity: 0.55; transform: translateX(30%); }
          85% { opacity: 0.2; transform: translateX(70%); }
          100% { opacity: 0; transform: translateX(100%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .page-sheet,
          .page-curl,
          .page-light-sweep {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PageTransition;
