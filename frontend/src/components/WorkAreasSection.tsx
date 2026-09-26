import React from 'react';
import { Scale, Brain, Leaf, BookOpen, ShieldCheck, ArrowRight, LucideIcon } from 'lucide-react';
import { WorkModule, SectionTitles, UIStrings, IconString, ActiveModalState } from '@/types/cms';
import { getThemeClasses } from '@/constants/cms-database';

interface WorkAreasSectionProps {
  sections: SectionTitles;
  ui: UIStrings;
  modules: ReadonlyArray<WorkModule>;
  onSelectModule: (modalState: ActiveModalState) => void;
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

export default function WorkAreasSection({ sections, ui, modules, onSelectModule }: WorkAreasSectionProps): React.JSX.Element {
  return (
    <section id="dayanisma" className="py-24 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20 animate-cinematic-reveal">
          <h2 className="text-sm font-black tracking-[0.3em] text-[#6A4C93] dark:text-[#D4AF37] uppercase mb-4">{sections.workAreasTitle}</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#3D154B] dark:text-white">{sections.workAreasSub}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((mod, index) => {
            const IconComponent = getDynamicIcon(mod.dbIconStr);
            const theme = getThemeClasses(mod.colorTheme);
            return (
              <div
                key={mod.id}
                onClick={() => onSelectModule({ ...mod, theme })}
                className={`glass-panel p-8 rounded-[2rem] transition-all duration-500 group cursor-pointer border border-[#6A4C93]/15 dark:border-white/5 ${theme.border} hover:-translate-y-4 animate-cinematic-reveal flex flex-col justify-between`}
                style={{ animationDelay: `${index * 100}ms`, minHeight: '320px' }}
              >
                <div>
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white mb-8 transition-all duration-500 group-hover:scale-110`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 dark:text-white/30 block mb-2">{mod.badge}</span>
                  <h4 className="text-xl font-serif font-black text-gray-900 dark:text-white mb-4">{mod.title}</h4>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10 flex items-center justify-between group-hover:border-transparent transition-colors">
                  <span className="text-xs font-black uppercase tracking-widest text-[#6A4C93] dark:text-[#D4AF37] flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    {ui.btnDetails} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
