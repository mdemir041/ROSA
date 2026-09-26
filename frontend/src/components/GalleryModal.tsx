'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Camera, Tag } from 'lucide-react';
import { GalleryItem, UIStrings } from '@/types/cms';

interface GalleryModalProps {
  item: GalleryItem | null;
  ui: UIStrings;
  onClose: () => void;
}

export default function GalleryModal({ item, ui, onClose }: GalleryModalProps): React.JSX.Element | null {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-fade-in">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] dark:bg-[#1A1520] border border-[#EADFCF] dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-cinematic-reveal flex flex-col md:flex-row max-h-[90vh]">
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-4 right-4 z-20 p-2.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full md:w-3/5 h-64 md:h-auto min-h-[300px]">
          <Image
            src={item.imgUrl}
            alt={item.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[#FF6B5B]/10 text-[#FF6B5B] border border-[#FF6B5B]/20 flex items-center gap-1.5">
                <Tag className="w-3 h-3" />
                {item.category}
              </span>
            </div>

            <h3 className="text-2xl font-serif font-black text-[#18151A] dark:text-white leading-tight mb-4">
              {item.title}
            </h3>

            <p className="text-xs text-[#5A5260] dark:text-[#B2AAC0] leading-relaxed mb-6 font-medium">
              {ui.cardDesc}
            </p>

            <div className="p-4 rounded-xl glass-panel text-[11px] text-[#3D154B] dark:text-white/90 font-semibold space-y-1">
              <div className="flex items-center gap-1.5 text-[#76BA5B]">
                <Camera className="w-4 h-4" />
                <span>{ui.btnExplore || "Arşiv"}</span>
              </div>
              <p className="text-[10px] text-[#5A5260] dark:text-[#B2AAC0]">{item.category}</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full bg-[#3D154B] dark:bg-white text-white dark:text-[#0F0C12] font-black uppercase tracking-widest py-3.5 px-6 rounded-xl hover:bg-[#5A206E] dark:hover:bg-gray-200 transition-all text-xs"
            >
              {ui.btnClose}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
