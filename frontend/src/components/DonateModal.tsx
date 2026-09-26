'use client';

import React, { useState, useEffect } from 'react';
import { X, Heart, Copy, Check, Building2, ShieldCheck } from 'lucide-react';
import { UIStrings } from '@/types/cms';

interface DonateModalProps {
  isOpen: boolean;
  ui: UIStrings;
  onClose: () => void;
}

export default function DonateModal({ isOpen, ui, onClose }: DonateModalProps): React.JSX.Element | null {
  const [copied, setCopied] = useState<boolean>(false);
  const [hesap, setHesap] = useState<any>(null);

  useEffect(() => {
    fetch('/api/strapi/banka-hesabis')
      .then(res => res.json())
      .then(data => {
        if (data && data.data) {
          const aktifHesaplar = data.data.filter((h: any) => h.isActive === true);
          if (aktifHesaplar.length > 0) {
            setHesap(aktifHesaplar[0]); // Show the first active account
          }
        }
      })
      .catch(console.error);
  }, []);

  const ibanNumber = hesap?.iban || 'TR001111222233334444555566';
  const formattedIban = ibanNumber.replace(/(.{4})/g, '$1 ').trim();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleCopyIban = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(ibanNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API restricted
    }
  };

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[#FAF8F5] dark:bg-[#1A1520] border border-[#EADFCF] dark:border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl animate-cinematic-reveal">
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-6 right-6 p-2.5 bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-white/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#FF6B5B]/10 text-[#FF6B5B] flex items-center justify-center border border-[#FF6B5B]/20">
            <Heart className="w-6 h-6 fill-current animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#76BA5B] block mb-0.5">{ui.donateModalSub}</span>
            <h3 className="text-2xl font-serif font-black text-[#18151A] dark:text-white">{ui.donateModalTitle}</h3>
          </div>
        </div>

        <p className="text-xs text-[#5A5260] dark:text-[#B2AAC0] leading-relaxed mb-6 font-medium">
          {ui.donateModalDesc}
        </p>

        <div className="p-6 rounded-2xl glass-panel border border-[#EADFCF] dark:border-white/10 space-y-4 mb-6">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#3D154B] dark:text-white">
              <Building2 className="w-4 h-4 text-[#FF6B5B]" />
              <span>{hesap?.bankName || ui.bankName}</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#3D154B]/10 text-[#3D154B] dark:text-[#FF6B5B]">
              {ui.donateModalAccountType}
            </span>
          </div>

          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[#5A5260] dark:text-[#B2AAC0] mb-1">
              {ui.accountHolderLabel}
            </div>
            <div className="text-sm font-black text-[#18151A] dark:text-white">
              {hesap?.accountHolder || ui.accountHolderName}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[#5A5260] dark:text-[#B2AAC0] mb-1">
              {ui.donateModalIbanLabel}
            </div>
            <div className="flex items-center justify-between bg-white dark:bg-black/40 p-3 rounded-xl border border-black/10 dark:border-white/10">
              <span className="font-mono text-xs md:text-sm font-bold text-[#18151A] dark:text-white tracking-wider select-all">
                {formattedIban}
              </span>
              <button
                onClick={handleCopyIban}
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF6B5B] hover:bg-[#e05647] text-white text-xs font-bold transition-all active:scale-95 shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? ui.donateModalCopied : ui.donateModalCopy}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-[#76BA5B]/10 border border-[#76BA5B]/20 text-[11px] text-[#599342] dark:text-[#76BA5B] font-semibold mb-6">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          <span>{ui.donateModalSecurityInfo}</span>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#3D154B] dark:bg-white text-white dark:text-[#0F0C12] font-black uppercase tracking-widest py-3.5 px-6 rounded-xl hover:bg-[#5A206E] dark:hover:bg-gray-200 transition-all text-xs"
        >
          {ui.btnClose}
        </button>
      </div>
    </div>
  );
}
