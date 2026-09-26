'use client';

import React, { useState } from 'react';
import Image from 'next/image';





import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';
import { NAV_TRANSLATIONS } from '@/constants/cms-database';

export default function EkibimizPage(): React.JSX.Element {
  const { lang, setLang } = useLanguage();
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);
  const [dynamicTeam, setDynamicTeam] = useState<any[]>([]);

  React.useEffect(() => {
    fetch(`/api/strapi/team-members?filters[lang][$eq]=TR`)
      .then(res => res.json())
      .then(data => {
        if (data && data.data) {
          const sorted = data.data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
          const formatted = sorted.map((item: any) => ({
            id: `strapi-${item.documentId}`,
            name: item.name,
            title: item.title,
            imageUrl: item.imageUrl
          }));
          setDynamicTeam(formatted);
        }
      })
      .catch(console.error);
  }, [lang]);

  const { pageData, loading } = useCMS();

  if (!pageData) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-12 h-12 border-4 border-[#6A4C93] border-t-transparent rounded-full"></div></div>;
  }
  const nt = NAV_TRANSLATIONS[lang] || NAV_TRANSLATIONS['TR'];

  return (
    <>
      
      

      <div className="pt-32 pb-24 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 animate-cinematic-reveal">
            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#18151A] dark:text-white mb-6">
              {nt.subEkibimiz}
            </h1>

            
            {dynamicTeam.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {dynamicTeam.map((member: any, index: number) => (
                  <div key={member.id} className="bg-white/60 dark:bg-[#1A1622]/60 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-3xl p-6 shadow-xl shadow-[#6A4C93]/5 flex flex-col items-center animate-cinematic-reveal text-center group hover:-translate-y-2 transition-transform duration-500" style={{ animationDelay: `${index * 150}ms` }}>
                    <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-white dark:border-[#2A2436] shadow-lg relative">
                      <Image 
                        src={member.imageUrl || '/image_2.png'} 
                        alt={member.name} 
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    </div>
                    <h3 className="text-xl font-bold text-[#3D154B] dark:text-white mb-2">{member.name}</h3>
                    <p className="text-[#6A4C93] dark:text-[#D4AF37] font-medium">{member.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/60 dark:bg-[#1A1622]/60 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-3xl p-12 shadow-xl shadow-[#6A4C93]/5 animate-cinematic-reveal" style={{ animationDelay: '200ms' }}>
                <div className="w-16 h-16 bg-gradient-to-tr from-[#D4AF37] to-[#FF6B6B] rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg transform rotate-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-[#3D154B] dark:text-white mb-4">
                  Çok Yakında
                </h2>
                <p className="text-lg text-[#5A5260] dark:text-[#B2AAC0] leading-relaxed">
                  Kadın hakları ve toplumsal cinsiyet eşitliği mücadelesinde yan yana yürüdüğümüz, derneğimize güç katan ekibimizin profilleri en kısa sürede bu sayfada yerini alacaktır.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      
      
      
      
    </>
  );
}
