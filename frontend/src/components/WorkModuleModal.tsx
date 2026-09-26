'use client';

import React, { useEffect } from 'react';
import { X, Scale, Brain, Leaf, BookOpen, ShieldCheck, LucideIcon } from 'lucide-react';
import { ActiveModalState, IconString, UIStrings } from '@/types/cms';

interface WorkModuleModalProps {
  activeModal: ActiveModalState | null;
  ui: UIStrings;
  onClose: () => void;
}

function getDynamicIcon(iconString: IconString): LucideIcon {
  switch (iconString) {
    case 'Scale':
      return Scale;
    case 'Brain':
      return Brain;
    case 'Leaf':
      return Leaf;
    case 'BookOpen':
      return BookOpen;
    default:
      return ShieldCheck;
  }
}

export default function WorkModuleModal({ activeModal, ui, onClose }: WorkModuleModalProps): React.JSX.Element | null {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (activeModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeModal, onClose]);

  if (!activeModal) return null;

  const IconComponent = getDynamicIcon(activeModal.dbIconStr);

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#F9F6FF] dark:bg-[#0A0418] border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-cinematic-reveal">
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-6 right-6 p-2 bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-white/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeModal.theme.gradient} flex items-center justify-center text-white mb-6 shadow-lg`}>
          <IconComponent className="w-8 h-8" />
        </div>
        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#4A2B87] dark:text-[#A874FF] block mb-2">{activeModal.badge}</span>
        <h3 className="text-3xl font-serif font-black text-gray-900 dark:text-white mb-6">{activeModal.title}</h3>
        <div className="space-y-4 text-gray-600 dark:text-white/60 text-lg leading-relaxed font-medium">
          <p>{activeModal.desc}</p>
          <p className="pt-4 border-t border-gray-200 dark:border-white/10 mt-4 text-sm font-semibold text-gray-800 dark:text-white/80">{activeModal.extra}</p>
        </div>
        <div className="mt-10 flex gap-4">
          <button
            onClick={onClose}
            className="bg-gray-900 dark:bg-white text-white dark:text-[#04010A] font-black uppercase tracking-widest py-4 px-8 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all w-full text-sm"
          >
            {ui.btnClose}
          </button>
        </div>
      </div>
    </div>
  );
}
