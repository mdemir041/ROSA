'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Image as ImageIcon, FileText } from 'lucide-react';
import { GalleryItem, MediaItem, SectionTitles, UIStrings } from '@/types/cms';
import { getMediaTheme } from '@/constants/cms-database';

interface CombinedMediaGallerySectionProps {
  sections: SectionTitles;
  ui: UIStrings;
  galleryItems: ReadonlyArray<GalleryItem>;
  mediaItems: ReadonlyArray<MediaItem>;
  onSelectGallery: (item: GalleryItem) => void;
  onSelectMedia: (item: MediaItem) => void;
}

export default function CombinedMediaGallerySection({
  sections,
  ui,
  galleryItems,
  mediaItems,
  onSelectGallery,
  onSelectMedia
}: CombinedMediaGallerySectionProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<'gallery' | 'media'>('gallery');
  
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
  const scrollLeftBy = () => galleryRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
  const scrollRightBy = () => galleryRef.current?.scrollBy({ left: 400, behavior: 'smooth' });

  return (
    <section id="medya-galeri" className="py-24 relative z-10 border-t border-[#EADFCF] dark:border-white/5 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 mb-12 animate-cinematic-reveal">
        {/* Section Header with Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div>
            <h2 className="text-sm font-bold tracking-[0.3em] text-[#6A4C93] dark:text-[#D4AF37] uppercase mb-4">
              Medya & Saha
            </h2>
            <h3 className="text-3xl md:text-5xl font-serif font-black text-[#18151A] dark:text-white transition-all duration-300">
              {activeTab === 'gallery' ? sections.gallerySub : sections.mediaSub}
            </h3>
          </div>
          
          <div className="flex bg-white/50 dark:bg-[#18151A]/50 backdrop-blur-md p-1.5 rounded-2xl border border-[#6A4C93]/10 dark:border-white/10 shrink-0 shadow-lg shadow-[#6A4C93]/5">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-[#6A4C93] to-[#3D154B] dark:from-[#D4AF37] dark:to-[#8B7322] text-white shadow-md'
                  : 'text-[#6A4C93] dark:text-gray-400 hover:bg-[#6A4C93]/5 dark:hover:bg-white/5'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              {sections.galleryTitle || "Sahadan Kareler"}
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === 'media'
                  ? 'bg-gradient-to-r from-[#6A4C93] to-[#3D154B] dark:from-[#D4AF37] dark:to-[#8B7322] text-white shadow-md'
                  : 'text-[#6A4C93] dark:text-gray-400 hover:bg-[#6A4C93]/5 dark:hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              {sections.mediaTitle || "Medya & Raporlar"}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative w-full transition-all duration-500 min-h-[500px]">
          
          {/* GALLERY VIEW */}
          {activeTab === 'gallery' && (
            <div className="w-full animate-fade-in-up">
              {/* Navigation Buttons for Gallery */}
              <div className="flex justify-end gap-4 mb-6">
                <button 
                  onClick={scrollLeftBy}
                  className="w-12 h-12 rounded-full border border-[#6A4C93]/20 dark:border-white/10 flex items-center justify-center text-[#6A4C93] dark:text-white hover:bg-[#6A4C93]/5 dark:hover:bg-white/5 transition-colors"
                  aria-label={ui.ariaPrevSlide}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={scrollRightBy}
                  className="w-12 h-12 rounded-full border border-[#6A4C93]/20 dark:border-white/10 flex items-center justify-center text-[#6A4C93] dark:text-white hover:bg-[#6A4C93]/5 dark:hover:bg-white/5 transition-colors"
                  aria-label={ui.ariaNextSlide}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div 
                ref={galleryRef}
                className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMoveGallery}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {galleryItems.map((item, index) => (
                  <div 
                    key={item.id}
                    onClick={() => onSelectGallery(item)}
                    className="min-w-[320px] md:min-w-[400px] h-[480px] rounded-[2rem] overflow-hidden relative snap-center shrink-0 cursor-pointer group animate-cinematic-reveal"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <Image 
                      src={item.imgUrl} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18151A]/90 via-[#18151A]/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/20">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h4 className="text-2xl font-serif font-black text-white mb-2 leading-tight">{item.title}</h4>
                      <div className="w-0 h-0.5 bg-[#D4AF37] group-hover:w-12 transition-all duration-500 delay-100 mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MEDIA VIEW */}
          {activeTab === 'media' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
              {mediaItems.map((item, index) => {
                const mediaTheme = getMediaTheme(item.typeCode);
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectMedia(item)}
                    className={`glass-panel p-8 rounded-[2.5rem] border border-[#6A4C93]/15 dark:border-white/5 transition-all duration-500 transform hover:-translate-y-3 cursor-pointer flex flex-col justify-between ${mediaTheme.border} animate-cinematic-reveal`}
                    style={{ animationDelay: `${index * 150}ms`, minHeight: '340px' }}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${mediaTheme.badge}`}>{item.badge}</span>
                        <span className="text-xs font-bold text-[#6A4C93] dark:text-[#B2AAC0]">{item.date}</span>
                      </div>
                      <h4 className="text-2xl font-serif font-black text-[#18151A] dark:text-white mb-4">{item.title}</h4>
                      <p className="text-sm text-[#6A4C93] dark:text-[#B2AAC0] font-medium">{item.desc}</p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#6A4C93] dark:text-[#D4AF37] hover:translate-x-1 transition-all">
                      <span>{ui.btnExplore}</span> <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
