'use client';

import React, { useState } from 'react';





import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';
import { NAV_TRANSLATIONS } from '@/constants/cms-database';

export default function SssPage(): React.JSX.Element {
  const { lang, setLang } = useLanguage();
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);

  const { pageData, loading } = useCMS();

  const [openId, setOpenId] = useState<number | string | null>(null);

  const toggleAccordion = (id: number | string) => {
    setOpenId(openId === id ? null : id);
  };

  if (!pageData) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-12 h-12 border-4 border-[#6A4C93] border-t-transparent rounded-full"></div></div>;
  }
  const nt = NAV_TRANSLATIONS[lang] || NAV_TRANSLATIONS['TR'];

  return (
    <>
      
      

      <div className="pt-32 pb-24 min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16 animate-cinematic-reveal">
            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#18151A] dark:text-white mb-6">
              {nt.subSss}
            </h1>
            <p className="text-lg text-[#5A5260] dark:text-[#B2AAC0] max-w-2xl mx-auto">
              Merak ettiğiniz tüm soruların cevapları burada.
            </p>
          </div>

          <div className="space-y-4 animate-cinematic-reveal" style={{ animationDelay: '200ms' }}>
            {pageData.questionItems && pageData.questionItems.length > 0 ? (
              pageData.questionItems.map((q: any) => (
                <div key={q.documentId || q.id} className="bg-white/60 dark:bg-[#1A1622]/60 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl shadow-[#6A4C93]/5 transition-all">
                  <button
                    onClick={() => toggleAccordion(q.documentId || q.id)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none group hover:bg-[#6A4C93]/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-[#3D154B] dark:text-white pr-4 group-hover:text-[#6A4C93] dark:group-hover:text-[#D4AF37] transition-colors">
                      {q.title}
                    </h3>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-[#FAF8F5] dark:bg-black/30 text-[#6A4C93] dark:text-[#D4AF37] transition-transform duration-300 ${openId === (q.documentId || q.id) ? 'rotate-180 bg-[#6A4C93] text-white dark:bg-[#D4AF37] dark:text-black' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openId === (q.documentId || q.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 pt-0 text-[#5A5260] dark:text-[#B2AAC0] leading-relaxed border-t border-[#6A4C93]/5 dark:border-white/5 mt-2">
                      {q.desc || q.date || "Bu sorunun cevabı henüz eklenmedi."}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white/40 dark:bg-white/5 rounded-3xl border border-[#6A4C93]/10 dark:border-white/5 backdrop-blur-xl">
                <p className="text-xl font-medium text-[#3D154B]/60 dark:text-white/60">Henüz soru eklenmemiş.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      
      
      
      
    </>
  );
}
