import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MediaItem, SectionTitles, UIStrings } from '@/types/cms';
import { getMediaTheme } from '@/constants/cms-database';

interface MediaReportsSectionProps {
  sections: SectionTitles;
  ui: UIStrings;
  mediaItems: ReadonlyArray<MediaItem>;
  onSelectMedia: (item: MediaItem) => void;
}

export default function MediaReportsSection({ sections, ui, mediaItems, onSelectMedia }: MediaReportsSectionProps): React.JSX.Element {
  return (
    <section className="py-24 relative z-10 border-t border-[#EADFCF] dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 animate-cinematic-reveal">
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#6A4C93] dark:text-[#D4AF37] uppercase mb-4">{sections.mediaTitle}</h2>
          <h3 className="text-4xl font-serif font-black text-[#18151A] dark:text-white">{sections.mediaSub}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
}
