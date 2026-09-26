'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { GalleryItem, SectionTitles } from '@/types/cms';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FieldGallerySectionProps {
  sections: SectionTitles;
  galleryItems: ReadonlyArray<GalleryItem>;
  onSelectGallery: (item: GalleryItem) => void;
}

export default function FieldGallerySection({ sections, galleryItems, onSelectGallery }: FieldGallerySectionProps): React.JSX.Element {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!galleryRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - galleryRef.current.offsetLeft);
    setScrollLeft(galleryRef.current.scrollLeft);
  };

  const handleMouseLeave = (): void => setIsDown(false);
  const handleMouseUp = (): void => setIsDown(false);

  const handleMouseMoveGallery = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDown || !galleryRef.current) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    galleryRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollLeftBy = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRightBy = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="galeri" className="py-24 relative z-10 border-t border-[#EADFCF] dark:border-white/5 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end animate-cinematic-reveal">
        <div>
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#10B981] uppercase mb-4">{sections.galleryTitle}</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-black text-[#18151A] dark:text-white">{sections.gallerySub}</h3>
        </div>
        
        {/* Navigation Buttons */}
        <div className="hidden md:flex gap-4">
          <button 
            onClick={scrollLeftBy} 
            className="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 hover:bg-[#3D154B] hover:text-white dark:hover:bg-[#10B981] transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={scrollRightBy} 
            className="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 hover:bg-[#3D154B] hover:text-white dark:hover:bg-[#10B981] transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <div
        ref={galleryRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMoveGallery}
        className="flex gap-6 overflow-x-auto px-6 max-w-7xl mx-auto no-scrollbar pb-6 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollBehavior: isDown ? 'auto' : 'smooth' }}
      >
        {galleryItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectGallery(item)}
            className="flex-shrink-0 w-[300px] md:w-[400px] h-[450px] relative rounded-[2.5rem] overflow-hidden group shadow-xl glass-panel border border-black/5 dark:border-white/10 cursor-pointer transform hover:-translate-y-2 transition-all duration-500"
          >
            <Image
              src={item.imgUrl}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 300px, 400px"
              className="object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C12] via-transparent opacity-90" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between items-start z-10">
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/10">{item.category}</span>
              <h4 className="text-xl md:text-2xl font-serif font-black text-white leading-tight">{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
