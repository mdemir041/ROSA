'use client';

import React, { useState, useEffect } from 'react';
import { PhoneCall } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { useLanguage } from '@/context/LanguageContext';

export default function FloatingContactButtons() {
  const { lang } = useLanguage();
  const { pageData, loading } = useCMS();

  const defaultContact = pageData?.contact || { phone: '' };
  const [phone, setPhone] = useState(defaultContact.phone);

  useEffect(() => {
    fetch('/api/strapi/iletisims')
      .then(res => {
        if (!res.ok) throw new Error('API yanıt vermedi (Strapi kapalı olabilir)');
        return res.json();
      })
      .then(data => {
        if (data.data && data.data.length > 0 && data.data[0].phone) {
          setPhone(data.data[0].phone);
        }
      })
      .catch(err => console.warn('İletişim bilgileri çekilemedi:', err.message));
  }, []);

  const rawPhone = phone.replace(/\s+/g, '');

  if (!pageData) return null;

  return (
    <div className="fixed bottom-28 right-6 z-[98] flex flex-col gap-5 animate-cinematic-reveal">
      
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${rawPhone.replace('+', '')}`}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Exact WhatsApp Solid Logo */}
        <svg 
          viewBox="0 0 24 24" 
          width="32" 
          height="32" 
          fill="currentColor" 
          className="relative z-10"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>

        {/* Tooltip */}
        <span className="absolute right-full mr-4 px-4 py-2 bg-white dark:bg-[#1E1926] text-[#18151A] dark:text-white text-sm font-bold rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap shadow-lg border border-black/5 dark:border-white/10">
          WhatsApp
          {/* Arrow */}
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-white dark:border-l-[#1E1926]"></span>
        </span>
      </a>

      {/* Phone Button */}
      <a
        href={`tel:${rawPhone}`}
        className="group relative flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#3D154B] border border-[#D4AF37]/30 text-[#D4AF37] shadow-[0_8px_25px_rgba(61,21,75,0.4)] hover:bg-[#D4AF37] hover:text-[#3D154B] hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <PhoneCall className="w-7 h-7 relative z-10 transition-colors duration-300" strokeWidth={2} />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 px-4 py-2 bg-[#3D154B] text-[#D4AF37] text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap shadow-xl border border-[#D4AF37]/30">
          {(pageData.ui?.callUs && pageData.ui.callUs.trim() !== '') ? pageData.ui.callUs : (lang === 'EN' ? 'CALL US' : lang === 'KU' ? 'LI ME BIGERIN' : lang === 'DE' ? 'RUFEN SIE UNS AN' : lang === 'FR' ? 'APPELEZ-NOUS' : 'BİZİ ARAYIN')}
          {/* Arrow */}
          <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[6px] border-l-[#3D154B]"></span>
        </span>
      </a>
    </div>
  );
}
