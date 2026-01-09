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
    <div className="relative min-h-screen overflow-hidden" style={{ perspective: '3000px' }}>
      {/* New page content underneath */}
      <div className="min-h-screen">
        {getPageForPath(currentPath)}
      </div>
      
      {/* Flipping page overlay - shows OLD page content */}
      {isFlipping && flippingPath && (
        <div
          className="fixed inset-0 z-50 min-h-screen bg-background"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'left center',
            animation: 'page-turn-away 2.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
            backfaceVisibility: 'hidden'
          }}
        >
          {getPageForPath(flippingPath)}
          
          {/* Paper curl effect on the right edge */}
          <div 
            className="absolute inset-y-0 right-0 pointer-events-none"
            style={{
              width: '120px',
              background: `
                linear-gradient(to left, 
                  rgba(236,72,153,0.2) 0%, 
                  rgba(236,72,153,0.1) 20%,
                  rgba(255,255,255,0.1) 40%,
                  transparent 100%
                )
              `,
              animation: 'paper-curl 2.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
              boxShadow: 'inset -10px 0 30px rgba(236,72,153,0.15)'
            }}
          />
          
          {/* Subtle paper texture lines */}
          <div 
            className="absolute inset-y-0 right-0 pointer-events-none"
            style={{
              width: '80px',
              background: `repeating-linear-gradient(
                to left,
                transparent 0px,
                transparent 3px,
                rgba(236,72,153,0.03) 3px,
                rgba(236,72,153,0.03) 4px
              )`,
              animation: 'paper-curl 2.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards'
            }}
          />
        </div>
      )}
      
      {/* Shadow cast on the new page */}
      {isFlipping && (
        <div 
          className="fixed inset-0 pointer-events-none z-40"
          style={{
            background: 'linear-gradient(to right, rgba(236,72,153,0.2) 0%, rgba(236,72,153,0.08) 30%, transparent 60%)',
            animation: 'shadow-sweep 2.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards'
          }}
        />
      )}

      <style>{`
        @keyframes page-turn-away {
          0% {
            transform: perspective(3000px) rotateY(0deg) scaleX(1);
            opacity: 1;
          }
          10% {
            transform: perspective(3000px) rotateY(-8deg) scaleX(1.01);
            opacity: 1;
          }
          25% {
            transform: perspective(3000px) rotateY(-25deg) scaleX(1.02);
            opacity: 1;
          }
          40% {
            transform: perspective(3000px) rotateY(-45deg) scaleX(1.03);
            opacity: 1;
          }
          55% {
            transform: perspective(3000px) rotateY(-70deg) scaleX(1.02);
            opacity: 0.95;
          }
          70% {
            transform: perspective(3000px) rotateY(-100deg) scaleX(1.01);
            opacity: 0.7;
          }
          85% {
            transform: perspective(3000px) rotateY(-140deg) scaleX(1);
            opacity: 0.3;
          }
          100% {
            transform: perspective(3000px) rotateY(-180deg) scaleX(1);
            opacity: 0;
          }
        }
        
        @keyframes paper-curl {
          0% {
            opacity: 0.3;
            transform: scaleX(0.5);
          }
          20% {
            opacity: 1;
            transform: scaleX(1.5);
          }
          50% {
            opacity: 0.9;
            transform: scaleX(2);
          }
          80% {
            opacity: 0.5;
            transform: scaleX(1.2);
          }
          100% {
            opacity: 0;
            transform: scaleX(0);
          }
        }
        
        @keyframes shadow-sweep {
          0% {
            opacity: 0;
            transform: translateX(-10%);
          }
          20% {
            opacity: 0.8;
            transform: translateX(0%);
          }
          50% {
            opacity: 0.6;
            transform: translateX(30%);
          }
          80% {
            opacity: 0.3;
            transform: translateX(70%);
          }
          100% {
            opacity: 0;
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default PageTransition;
