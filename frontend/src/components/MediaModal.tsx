'use client';

import React, { useEffect } from 'react';
import { X, Calendar, Newspaper, FileText, Megaphone } from 'lucide-react';
import { MediaItem, UIStrings } from '@/types/cms';
import { getMediaTheme } from '@/constants/cms-database';

interface MediaModalProps {
  item: MediaItem | null;
  ui: UIStrings;
  onClose: () => void;
}

export default function MediaModal({ item, ui, onClose }: MediaModalProps): React.JSX.Element | null {
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

  const mediaTheme = getMediaTheme(item.typeCode);

  const getIcon = () => {
    switch (item.typeCode) {
      case 'news':
        return <Newspaper className="w-8 h-8 text-[#3D154B] dark:text-[#FF6B5B]" />;
      case 'report':
        return <FileText className="w-8 h-8 text-[#FF6B5B]" />;
      case 'campaign':
        return <Megaphone className="w-8 h-8 text-[#76BA5B]" />;
      default:
        return <Newspaper className="w-8 h-8" />;
    }
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#1A1520] border border-[#EADFCF] dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-cinematic-reveal">
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-6 right-6 p-2 bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-white/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between mb-6">
          <span className={`text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${mediaTheme.badge}`}>
            {item.badge}
          </span>
          <div className="flex items-center gap-2 text-xs font-bold text-[#5A5260] dark:text-[#B2AAC0]">
            <Calendar className="w-4 h-4 text-[#FF6B5B]" />
            <span>{item.date}</span>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-2xl glass-panel flex-shrink-0">
            {getIcon()}
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-black text-[#18151A] dark:text-white leading-tight">
            {item.title}
          </h3>
        </div>

        <div className="space-y-4 text-[#5A5260] dark:text-[#B2AAC0] text-base md:text-lg leading-relaxed font-medium">
          <p>{item.desc}</p>
          <div className="p-4 rounded-2xl glass-panel text-xs text-[#18151A] dark:text-white/80 font-semibold border-l-4 border-[#FF6B5B]">
            {ui.cardDesc}
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={onClose}
            className="bg-[#3D154B] dark:bg-white text-white dark:text-[#0F0C12] font-black uppercase tracking-widest py-4 px-8 rounded-xl hover:bg-[#5A206E] dark:hover:bg-gray-200 transition-all w-full text-sm"
          >
            {ui.btnClose}
          </button>
        </div>
      </div>
    </div>
  );
}
