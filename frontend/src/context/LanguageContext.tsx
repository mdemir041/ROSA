'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { LanguageCode } from '@/types/cms';

interface LanguageContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LanguageCode>('TR');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('rosa_lang') as LanguageCode | null;
    if (savedLang) {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: LanguageCode): void => {
    setLangState(newLang);
    localStorage.setItem('rosa_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang: mounted ? lang : 'TR', setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
