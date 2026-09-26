"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingSocialSidebar from '@/components/FloatingSocialSidebar';
import FloatingContactButtons from '@/components/FloatingContactButtons';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import DonateModal from '@/components/DonateModal';
import SpotlightBackground from '@/components/SpotlightBackground';
import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { lang, setLang } = useLanguage();
  const { pageData } = useCMS();
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <SpotlightBackground />
      <Navbar 
        currentLang={lang} 
        onLangChange={setLang} 
        onOpenDonateModal={() => setIsDonateModalOpen(true)} 
      />
      
      {/* 
        The children here will be wrapped by (public)/template.tsx
        so ONLY the page content animates, while Navbar and Footer stay fixed!
      */}
      {children}
      
      {pageData && (
        <Footer 
          ui={pageData.ui} 
          contact={pageData.contact} 
          onOpenDonateModal={() => setIsDonateModalOpen(true)} 
        />
      )}
      <FloatingSocialSidebar />
      <FloatingContactButtons />
      <ScrollToTopButton />
      
      {isDonateModalOpen && pageData && (
        <DonateModal 
          isOpen={isDonateModalOpen} 
          ui={pageData.ui} 
          onClose={() => setIsDonateModalOpen(false)} 
        />
      )}
    </div>
  );
}
