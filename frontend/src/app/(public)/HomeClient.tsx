"use client";
import React, { useState } from 'react';


import HeroSection from '@/components/HeroSection';
import WorkAreasSection from '@/components/WorkAreasSection';
import NewsPanelSection from '@/components/NewsPanelSection';
import AboutSection from '@/components/AboutSection';
import UpcomingEventsSection from '@/components/UpcomingEventsSection';
import WorkModuleModal from '@/components/WorkModuleModal';

import { ActiveModalState } from '@/types/cms';
import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';

export default function HomeClient({ initialNews = [] }: { initialNews?: any[] }): React.JSX.Element {
  const { lang, setLang } = useLanguage();
  const [activeModal, setActiveModal] = useState<ActiveModalState | null>(null);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);

  const { pageData, loading } = useCMS();
  const finalNewsItems = initialNews.length > 0 ? initialNews : (pageData?.newsItems || []);

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] dark:bg-[#0F0C12]">
        <div className="animate-spin w-12 h-12 border-4 border-[#6A4C93] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      
      

      <HeroSection hero={pageData.hero} ui={pageData.ui} />
      
      <UpcomingEventsSection />

      <NewsPanelSection
        newsItems={finalNewsItems}
        announcementItems={pageData.announcementItems}
        questionItems={pageData.questionItems}
        ui={pageData.ui}
      />

      <WorkAreasSection
        sections={pageData.sections}
        ui={pageData.ui}
        modules={pageData.modules}
        onSelectModule={setActiveModal}
      />

      <AboutSection
        sections={pageData.sections}
        stats={pageData.stats}
      />

      <WorkModuleModal
        activeModal={activeModal}
        ui={pageData.ui}
        onClose={() => setActiveModal(null)}
      />

      

      

      
    </>
  );
}
