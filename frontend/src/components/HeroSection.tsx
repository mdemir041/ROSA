'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight } from 'lucide-react';
import { HeroContent, UIStrings } from '@/types/cms';

interface HeroSectionProps {
  hero: HeroContent;
  ui: UIStrings;
}

interface SlideItem {
  id: number;
  badge: string;
  title: string;
  highlightText: string;
  desc: string;
  imgUrl: string;
  btnText: string;
}

export default function HeroSection({ hero, ui }: HeroSectionProps): React.JSX.Element {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = hero?.slides || [];

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = (): void => {
    if (!slides || slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = (): void => {
    if (!slides || slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (!slides || slides.length === 0) {
    return (
      <section id="hero" className="relative min-h-[90vh] lg:min-h-screen pt-32 lg:pt-40 pb-16 flex flex-col overflow-hidden z-10 items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#6A4C93]/20 border-t-[#6A4C93] dark:border-[#D4AF37]/20 dark:border-t-[#D4AF37] rounded-full animate-spin"></div>
      </section>
    );
  }

  const slide = slides[currentSlide];

  return (
    <section id="hero" className="relative min-h-[90vh] lg:min-h-screen pt-32 lg:pt-40 pb-16 flex flex-col overflow-hidden z-10">
      
      {/* Cinematic Mesh Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gradient-to-r from-[#10B981]/10 to-[#3D154B]/5 rounded-full blur-[120px] mesh-bg-layer opacity-70" />
        <div className="absolute bottom-[5%] -right-[5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-gradient-to-l from-[#3D154B]/20 to-[#D4AF37]/5 rounded-full blur-[100px] mesh-bg-layer-reverse opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto relative z-10">
        
        {/* Left Slide Content */}
        <div key={`text-${currentSlide}`} className="lg:col-span-5 space-y-6 sm:space-y-8 animate-cinematic-reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/10 dark:bg-[#10B981]/15 text-[#047857] dark:text-[#10B981] border border-[#10B981]/30 text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(16,185,129,0.1)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>{slide.badge}</span>
          </div>

          <div className="min-h-[160px] sm:min-h-[220px]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-gradient-gold-purple dark:text-gradient-gold leading-[1.15] tracking-tight drop-shadow-sm">
              {slide.title}
            </h1>
            <p className="mt-3 text-lg sm:text-xl md:text-2xl font-serif italic text-[#3D154B] dark:text-[#E0CFF2] opacity-90">
              {slide.highlightText}
            </p>
          </div>

          <p className="text-[#625368] dark:text-[#B2AAC0] text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl min-h-[70px]">
            {slide.desc}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <a
              href="/iletisim"
              className="group relative bg-[#3D154B] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#3D154B] font-black text-[11px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] py-3.5 px-6 sm:px-7 rounded-full shadow-[0_10px_40px_rgba(61,21,75,0.3)] dark:shadow-[0_10px_40px_rgba(212,175,55,0.2)] transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 overflow-hidden border border-[#D4AF37]/20 dark:border-transparent whitespace-nowrap"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
              <span className="relative z-10">{slide.btnType === 'support' ? ui.btnSupport : ui.btnExplore}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#kurumsal"
              className="group relative glass-panel text-[#3D154B] dark:text-white font-bold text-[11px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] py-3.5 px-6 sm:px-7 rounded-full transition-all duration-500 hover:bg-[#3D154B]/5 dark:hover:bg-white/10 hover:scale-[1.03] hover:-translate-y-1 active:scale-95 flex items-center justify-center text-center shadow-md hover:shadow-xl border border-[#3D154B]/10 dark:border-white/10 whitespace-nowrap"
            >
              <span className="relative z-10">{ui.btnExplore}</span>
            </a>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                aria-label={ui.ariaPrevSlide}
                className="p-2.5 rounded-full glass-panel text-[#6A4C93] dark:text-white hover:bg-[#6A4C93]/10 dark:hover:bg-white/10 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label={ui.ariaNextSlide}
                className="p-2.5 rounded-full glass-panel text-[#6A4C93] dark:text-white hover:bg-[#6A4C93]/10 dark:hover:bg-white/10 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Dot Indicators */}
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Slayt ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-500 ${currentSlide === idx ? 'w-8 bg-[#D4AF37] animate-breathe' : 'w-2.5 bg-gray-300 dark:bg-white/20'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Slide Graphic */}
        <div className="lg:col-span-7 relative flex items-center justify-end mt-10 lg:mt-0 px-4 sm:px-0">
          {/* Balanced Horizontal 3:2 Rectangle */}
          <div className="relative w-full aspect-[3/2] rounded-[2rem] overflow-hidden border border-white/20 dark:border-white/10 shadow-[0_30px_80px_rgba(61,21,75,0.25)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.8)] group transition-all duration-700 hover:shadow-[0_40px_100px_rgba(212,175,55,0.2)] hover:-translate-y-2">
            {/* Frosted Glass Backdrop */}
            <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-md z-0" />
            {/* Elegant Inner Glow */}
            <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/20 z-10 pointer-events-none" />
            
            {/* Image Layer */}
            <Image
              key={slide.imgUrl}
              src={slide.imgUrl}
              alt={slide.title}
              fill
              priority
              className="object-cover z-20 transition-transform duration-[2.5s] ease-out group-hover:scale-105 animate-cinematic-reveal"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
