'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';





import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';
import { NAV_TRANSLATIONS } from '@/constants/cms-database';

export default function ReportsPage(): React.JSX.Element {
  const { lang, setLang } = useLanguage();
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);
  const [dynamicReports, setDynamicReports] = useState<any[]>([]);

  const { pageData, loading } = useCMS();

  React.useEffect(() => {
    fetch('/api/strapi/rapors')
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          const formatted = data.data.map((item: any) => ({
            id: `strapi-${item.documentId}`,
            title: item.title,
            desc: item.desc,
            imgUrl: item.imgUrl,
            link: item.link
          }));
          setDynamicReports(formatted);
        }
      })
      .catch(console.error);
  }, []);

  if (!pageData) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-12 h-12 border-4 border-[#6A4C93] border-t-transparent rounded-full"></div></div>;
  }
  const nt = pageData.ui;

  const finalReports = dynamicReports.length > 0 ? dynamicReports : (pageData.reportsItems || []);

  return (
    <>
      
      

      <div className="pt-32 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16 animate-cinematic-reveal">
            <h1 className="text-4xl md:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1F0933] via-[#6A4C93] to-[#1F0933] dark:from-[#FDE68A] dark:via-[#D4AF37] dark:to-[#FDE68A] mb-6 drop-shadow-sm">
              {pageData.sections.mediaTitle === 'Medya & Raporlar' ? 'Raporlar' : pageData.sections.mediaTitle}
            </h1>
            <p className="text-lg text-[#5A5260] dark:text-[#B2AAC0] max-w-2xl mx-auto">
              {pageData.sections.mediaSub}
            </p>
          </div>

          <div className="flex flex-col gap-10 max-w-5xl mx-auto">
            {finalReports.map((item: any, index: number) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel rounded-[2rem] border border-black/5 dark:border-white/5 transition-all duration-500 transform hover:-translate-y-2 flex flex-col md:flex-row overflow-hidden animate-cinematic-reveal group shadow-md hover:shadow-xl"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-64 md:h-auto md:w-2/5 overflow-hidden bg-gray-100 dark:bg-[#1A1520] shrink-0">
                  <Image 
                    src={item.imgUrl} 
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent opacity-50" />
                </div>

                <div className="p-8 md:p-10 flex-1 flex flex-col justify-center relative bg-white/50 dark:bg-[#1A1520]/50 backdrop-blur-md">
                  <div>
                    <h4 className="text-2xl md:text-3xl font-serif font-black text-[#18151A] dark:text-white mb-4 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-base text-[#5A5260] dark:text-[#B2AAC0] font-medium line-clamp-4 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                    <span className="text-sm font-black uppercase tracking-widest text-[#3D154B] dark:text-[#FF6B5B] group-hover:translate-x-2 transition-transform flex items-center gap-3">
                      {nt.btnReadReport} <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>

      
      
      
      
    </>
  );
}
