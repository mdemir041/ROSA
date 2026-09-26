'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';
import { PageData } from '@/types/cms';
import { CMS_DATABASE } from '@/constants/cms-database'; // Fallback if fetch fails

interface CMSContextType {
  pageData: PageData;
  loading: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang } = useLanguage();
  const [pageData, setPageData] = useState<PageData>(CMS_DATABASE[lang] || CMS_DATABASE['TR']);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const FETCH_LANG = lang;
        const [
          slidersRes,
          modulesRes,
          galleriesRes,
          announcementsRes,
          faqsRes,
          mediasRes,
          settingsRes,
          navRes
        ] = await Promise.all([
          fetch(`/api/strapi/sliders?filters[lang][$eq]=${FETCH_LANG}`, { cache: 'no-store' }).then(r => r.json()),
          fetch(`/api/strapi/modules?filters[lang][$eq]=${FETCH_LANG}`, { cache: 'no-store' }).then(r => r.json()),
          fetch(`/api/strapi/gallerys?filters[lang][$eq]=${FETCH_LANG}`, { cache: 'no-store' }).then(r => r.json()),
          fetch(`/api/strapi/announcements?filters[lang][$eq]=${FETCH_LANG}`, { cache: 'no-store' }).then(r => r.json()),
          fetch(`/api/strapi/faqs?filters[lang][$eq]=${FETCH_LANG}`, { cache: 'no-store' }).then(r => r.json()),
          fetch(`/api/strapi/medias?filters[lang][$eq]=${FETCH_LANG}`, { cache: 'no-store' }).then(r => r.json()),
          fetch(`/api/strapi/site-settings?filters[lang][$eq]=${FETCH_LANG}`, { cache: 'no-store' }).then(r => r.json()),
          fetch(`/api/strapi/nav-translations?filters[lang][$eq]=${FETCH_LANG}`, { cache: 'no-store' }).then(r => r.json())
        ]);

        // Construct pageData from Strapi payload
        const dynamicData: any = {};

        // Nav Translations
        if (navRes?.data && navRes.data.length > 0) {
          dynamicData.nav = navRes.data[0].data;
        } else {
          dynamicData.nav = null;
        }

        // Settings (Single Type with ALL languages)
        const currentLangSettings = settingsRes?.data?.[0];
        
        if (currentLangSettings && currentLangSettings.data) {
          const s = currentLangSettings.data;
          dynamicData.sections = s.sections;
          dynamicData.stats = s.stats;
          dynamicData.contact = s.contact;
          dynamicData.ui = s.ui;
        } else {
          // Fallback to static if no settings found
          const fallback = CMS_DATABASE[lang] || CMS_DATABASE['TR'];
          dynamicData.sections = fallback.sections;
          dynamicData.stats = fallback.stats;
          dynamicData.contact = fallback.contact;
          dynamicData.ui = fallback.ui;
        }

        // Helper to get fallback data
        const fallback = CMS_DATABASE[lang] || CMS_DATABASE['TR'];

        // Sliders
        if (slidersRes?.data && slidersRes.data.length > 0) {
          dynamicData.hero = { slides: slidersRes.data };
        } else {
          dynamicData.hero = fallback.hero;
        }

        // Modules
        if (modulesRes?.data && modulesRes.data.length > 0) {
          dynamicData.modules = modulesRes.data;
        } else {
          dynamicData.modules = fallback.modules;
        }

        // Galleries
        if (galleriesRes?.data && galleriesRes.data.length > 0) {
          dynamicData.galleryItems = galleriesRes.data;
        } else {
          dynamicData.galleryItems = fallback.galleryItems;
        }

        // Announcements
        if (announcementsRes?.data && announcementsRes.data.length > 0) {
          dynamicData.announcementItems = announcementsRes.data;
        } else {
          dynamicData.announcementItems = fallback.announcementItems;
        }

        // FAQs
        if (faqsRes?.data && faqsRes.data.length > 0) {
          dynamicData.questionItems = faqsRes.data;
        } else {
          dynamicData.questionItems = fallback.questionItems;
        }

        // Media & Reports
        if (mediasRes?.data && mediasRes.data.length > 0) {
          dynamicData.mediaItems = mediasRes.data;
        } else {
          dynamicData.mediaItems = fallback.mediaItems;
        }

        // We leave newsItems empty because they are fetched dynamically in the components
        dynamicData.newsItems = [];

        setPageData(dynamicData as PageData);
      } catch (err) {
        console.error("Error fetching CMS data from Strapi:", err);
        setPageData(CMS_DATABASE[lang] || CMS_DATABASE['TR']); // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [lang]);

  return (
    <CMSContext.Provider value={{ pageData, loading }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = (): CMSContextType => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
