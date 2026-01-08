const ScrapbookBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Decorative tape strips */}
      <div 
        className="absolute top-20 left-10 w-24 h-6 bg-primary/20 rotate-12"
        style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)" }}
      />
      <div 
        className="absolute top-40 right-20 w-20 h-5 bg-accent/40 -rotate-6"
        style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)" }}
      />
      <div 
        className="absolute bottom-32 left-1/4 w-16 h-4 bg-primary/30 rotate-45"
        style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)" }}
      />
      
      {/* Decorative stars */}
      <svg className="absolute top-1/4 right-1/4 w-8 h-8 text-primary/40" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <svg className="absolute bottom-1/3 left-1/6 w-6 h-6 text-accent-foreground/30" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      
      {/* Scribble lines */}
      <svg className="absolute top-1/2 right-10 w-24 h-16 text-primary/20" viewBox="0 0 100 50">
        <path 
          d="M5 25 Q 20 10, 35 25 T 65 25 T 95 25" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Heart doodles */}
      <svg className="absolute bottom-20 right-1/3 w-10 h-10 text-primary/30" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
};

export default ScrapbookBackground;
