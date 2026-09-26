'use client';

import React, { useState, useEffect } from 'react';

export default function SpotlightBackground(): React.JSX.Element {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    let ticking = false;

    const handleMouseMove = (e: MouseEvent): void => {
      if (!ticking) {
        animationFrameId = requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Background glow meshes using extreme blur. Removed mix-blend-mode to vastly improve FPS. */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Yellow/Gold glow positioned on the left side (behind the main text) */}
        <div className="absolute top-[30%] left-[-15%] w-[50vw] h-[50vw] bg-[#D4AF37] rounded-full filter blur-[120px] opacity-20 dark:opacity-[0.15]" />
        
        {/* Purple glow on the right side around the phoenix */}
        <div className="absolute top-[10%] right-[-15%] w-[70vw] h-[70vw] bg-[#6A4C93] rounded-full filter blur-[120px] opacity-30 dark:opacity-30" />
        
        {/* Extra magenta/purple glow specifically behind the phoenix bird for more dark mode details */}
        <div className="absolute top-[40%] right-[0%] w-[40vw] h-[60vw] bg-[#9D4EDD] rounded-full filter blur-[140px] opacity-0 dark:opacity-20" />

        {/* Green glow positioned gently in the center */}
        <div className="absolute top-[25%] left-[25%] w-[50vw] h-[50vw] bg-[#10B981] rounded-full filter blur-[130px] opacity-20 dark:opacity-[0.1]" />
      </div>
      
      {/* Increased dark:opacity to make the Phoenix bird highly visible in dark mode, removed desaturation */}
      <div className="fixed top-[10%] right-[-5%] lg:right-0 w-[800px] h-[90vh] pointer-events-none z-10 opacity-30 dark:opacity-15 transition-all duration-700">
        <img src="/about.png" alt="Rosa Anka" className="w-full h-full object-contain object-right-top" />
      </div>
    </>
  );
}
