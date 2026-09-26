import React from 'react';
import Image from 'next/image';
import { SectionTitles, StatsContent } from '@/types/cms';

interface AboutSectionProps {
  sections: SectionTitles;
  stats: StatsContent;
}

export default function AboutSection({ sections, stats }: AboutSectionProps): React.JSX.Element {
  return (
    <section id="kurumsal" className="py-24 border-y border-[#EADFCF] dark:border-white/5 relative z-10 overflow-hidden bg-[#FAF8F5]/80 dark:bg-[#0F0C12]/80">
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-end pr-20 lg:pr-32 translate-y-16 lg:translate-y-24 opacity-30 dark:opacity-15">
        <Image src="/about.png" alt="Rosa Anka Watermark" width={800} height={800} className="w-[600px] lg:w-[800px] h-auto object-contain animate-float opacity-80" />
      </div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <div className="space-y-8 animate-cinematic-reveal">
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#76BA5B] uppercase">{sections.aboutTitle}</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-black text-[#18151A] dark:text-white leading-tight">{sections.aboutSub}</h3>
          <p className="text-[#5A5260] dark:text-[#B2AAC0] text-lg leading-relaxed font-medium">{sections.aboutDesc}</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="glass-panel p-8 rounded-[2rem] text-center border-t-2 border-[#3D154B] dark:border-[#FF6B5B] shadow-xl backdrop-blur-md animate-cinematic-reveal">
            <div className="text-5xl md:text-6xl font-black text-[#3D154B] dark:text-white mb-2">{stats.stat1Val}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5A5260] dark:text-[#B2AAC0]">{stats.stat1Label}</div>
          </div>
          <div className="glass-panel p-8 rounded-[2rem] text-center border-t-2 border-[#FF6B5B] dark:border-[#E8A838] shadow-xl backdrop-blur-md animate-cinematic-reveal">
            <div className="text-5xl md:text-6xl font-black text-[#FF6B5B] dark:text-white mb-2">{stats.stat2Val}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5A5260] dark:text-[#B2AAC0]">{stats.stat2Label}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
