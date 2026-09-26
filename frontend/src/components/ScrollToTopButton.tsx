'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
interface ScrollToTopButtonProps {
  ariaLabel?: string;
}

export default function ScrollToTopButton({ ariaLabel = 'Yukarı Çık' }: ScrollToTopButtonProps): React.JSX.Element | null {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    let animationFrameId: number;
    let ticking = false;

    const handleScroll = (): void => {
      if (!ticking) {
        animationFrameId = requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label={ariaLabel}
      title={ariaLabel}
      className="fixed bottom-6 right-6 z-[99] p-3.5 rounded-2xl glass-panel text-[#3D154B] dark:text-white border border-[#EADFCF] dark:border-white/10 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
    >
      <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
    </button>
  );
}
