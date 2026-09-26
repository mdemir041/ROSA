'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sun, Moon, Globe, ChevronDown, X, Menu } from 'lucide-react';
import { LanguageCode } from '@/types/cms';
import { useTheme } from '@/context/ThemeContext';
import { useCMS } from '@/context/CMSContext';
import { NAV_TRANSLATIONS } from '@/constants/cms-database';

interface NavbarProps {
  currentLang: LanguageCode;
  onLangChange: (lang: LanguageCode) => void;
  onOpenDonateModal?: () => void;
}

export default function Navbar({ currentLang, onLangChange, onOpenDonateModal }: NavbarProps): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();
  const [isLangOpen, setIsLangOpen] = useState<boolean>(false);
  const [isKurumsalOpen, setIsKurumsalOpen] = useState<boolean>(false);
  const [isIceriklerOpen, setIsIceriklerOpen] = useState<boolean>(false);
  const [isBilgilendirmeOpen, setIsBilgilendirmeOpen] = useState<boolean>(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const [dynamicIcerikler, setDynamicIcerikler] = useState<any[]>([]);
  const [dynamicBilgilendirme, setDynamicBilgilendirme] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/strapi/articles?filters[lang][$eq]=${currentLang}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          const icerikler = data.data.filter((item: any) => item.category === 'Icerik');
          const bilgilendirme = data.data.filter((item: any) => item.category === 'Bilgilendirme');
          setDynamicIcerikler(icerikler);
          setDynamicBilgilendirme(bilgilendirme);
        } else {
          setDynamicIcerikler([]);
          setDynamicBilgilendirme([]);
        }
      })
      .catch(err => console.warn('Nav makaleleri çekilemedi:', err));
  }, [currentLang]);

  const defaultIcerikler = [
    { id: '1', slug: 'kadin-mucadelesinin-tarihi', title: 'Kadın Mücadelesinin Tarihi' },
    { id: '2', slug: 'katledilen-kadinlar-icin-anma-sayfalari', title: 'Katledilen Kadınlar Anısına' },
    { id: '3', slug: 'oncu-kadinlarin-yasam-oykuleri', title: 'Öncü Kadınların Öyküleri' },
    { id: '4', slug: 'yerel-kadin-direnisleri', title: 'Yerel Kadın Direnişleri' }
  ];

  const defaultBilgilendirme = [
    { id: '1', slug: 'nafaka-hakki', title: 'Nafaka Hakkı' },
    { id: '2', slug: 'istanbul-sozlesmesi', title: 'İstanbul Sözleşmesi' },
    { id: '3', slug: 'kadin-yoksullugu', title: 'Kadın Yoksulluğu' },
    { id: '4', slug: '6284-sayili-kanun', title: '6284 Sayılı Kanun' },
    { id: '5', slug: 'haklariniz', title: 'Haklarınız' }
  ];

  const displayIcerikler = dynamicIcerikler.length > 0 ? dynamicIcerikler : defaultIcerikler;
  const displayBilgilendirme = dynamicBilgilendirme.length > 0 ? dynamicBilgilendirme : defaultBilgilendirme;

  const { pageData, loading } = useCMS();
  const nt = pageData?.nav || NAV_TRANSLATIONS[currentLang] || NAV_TRANSLATIONS['TR'];

  const selectLanguage = (selectedLang: LanguageCode): void => {
    onLangChange(selectedLang);
    setIsLangOpen(false);
    setIsMobileMenuOpen(false);
  };

  const languages: ReadonlyArray<LanguageCode> = ['TR', 'KU', 'EN', 'DE', 'FR'];

  useEffect(() => {
    let animationFrameId: number;
    let ticking = false;

    // Scroll to top on page load if no hash
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }

    const handleScroll = (): void => {
      if (!ticking) {
        animationFrameId = requestAnimationFrame(() => {
          const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
          setIsScrolled(scrollPos > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Return a simplified version or a loader if data is not yet available, to prevent crashes
  if (!pageData) {
    return <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#FAF8F5]/80 dark:bg-[#0F0C12]/80 backdrop-blur-md h-20" />;
  }

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ease-out ${isScrolled ? 'bg-white/95 dark:bg-[#1A1520]/95 backdrop-blur-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border-b border-gray-200/50 dark:border-white/10' : 'bg-transparent border-b border-transparent'}`}>
      <div 
        className={`max-w-7xl w-full mx-auto px-6 flex items-center justify-between gap-3 xl:gap-6 transition-all duration-500 ease-out ${isScrolled ? 'h-[5.5rem]' : 'h-[8rem]'}`}
      >
        
        {/* Left: Logo */}
        <Link href="/" className="relative group cursor-pointer flex-shrink-0 flex items-center justify-center h-full py-2">
          <img 
            src="/image_2.png" 
            alt="Rosa Logo" 
            className={`relative w-auto object-contain transition-all duration-500 ease-out group-hover:scale-105 ${isScrolled ? 'h-[4.5rem]' : 'h-[6.5rem]'}`}
          />
        </Link>

        {/* Center: Desktop Menu */}
        <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-1 whitespace-nowrap h-full">
          
          <div className="relative group flex items-center h-full">
            <button className="relative font-bold text-[14px] xl:text-[16px] tracking-wider uppercase text-[#3D154B] dark:text-[#F5F3F7] hover:text-[#6A4C93] dark:hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-1.5 py-2">
              <span className="notranslate" style={{display: 'none'}}>{/* Google Translate anchor */}</span>
              <span>{nt.kurumsal}</span>
              <ChevronDown className="w-4 h-4 xl:w-5 xl:h-5 group-hover:rotate-180 transition-transform duration-300" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#6A4C93] dark:bg-[#D4AF37] transition-all duration-300 group-hover:w-full rounded-full" />
            </button>
            <div className="absolute top-[calc(100%-1rem)] left-0 mt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white/95 dark:bg-[#1A1520]/95 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0 flex flex-col overflow-hidden before:content-[''] before:absolute before:-top-6 before:left-0 before:w-full before:h-6">
              <Link href="/hakkimizda" className="px-5 py-3.5 text-[14.5px] font-bold text-[#3D154B] dark:text-[#F5F3F7] hover:bg-[#F5EFEA] hover:text-[#6A4C93] dark:hover:bg-white/5 dark:hover:text-[#D4AF37] transition-all duration-300 border-b border-gray-100 dark:border-white/5 uppercase tracking-wider relative group/item overflow-hidden">
                <span className="relative z-10">{nt.subHakkimizda}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#6A4C93]/5 to-transparent dark:from-[#D4AF37]/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link href="/ekibimiz" className="px-5 py-3.5 text-[14.5px] font-bold text-[#3D154B] dark:text-[#F5F3F7] hover:bg-[#F5EFEA] hover:text-[#6A4C93] dark:hover:bg-white/5 dark:hover:text-[#D4AF37] transition-all duration-300 border-b border-gray-100 dark:border-white/5 uppercase tracking-wider relative group/item overflow-hidden">
                <span className="relative z-10">{nt.subEkibimiz}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#6A4C93]/5 to-transparent dark:from-[#D4AF37]/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link href="/sss" className="px-5 py-3.5 text-[14.5px] font-bold text-[#3D154B] dark:text-[#F5F3F7] hover:bg-[#F5EFEA] hover:text-[#6A4C93] dark:hover:bg-white/5 dark:hover:text-[#D4AF37] transition-all duration-300 border-b border-gray-100 dark:border-white/5 uppercase tracking-wider relative group/item overflow-hidden">
                <span className="relative z-10">{nt.subSss}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#6A4C93]/5 to-transparent dark:from-[#D4AF37]/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link href="/banka-hesaplarimiz" className="px-5 py-3.5 text-[14.5px] font-bold text-[#3D154B] dark:text-[#F5F3F7] hover:bg-[#F5EFEA] hover:text-[#6A4C93] dark:hover:bg-white/5 dark:hover:text-[#D4AF37] transition-all duration-300 uppercase tracking-wider relative group/item overflow-hidden">
                <span className="relative z-10">{nt.subBankaHesaplari}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#6A4C93]/5 to-transparent dark:from-[#D4AF37]/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </div>
          
          <div className="relative flex items-center h-full">
            <Link href="/haberler" className="relative font-bold text-[14px] xl:text-[16px] tracking-wider uppercase text-[#3D154B] dark:text-[#F5F3F7] hover:text-[#6A4C93] dark:hover:text-[#D4AF37] transition-colors duration-300 group py-2 flex items-center">
              <span>{nt.haberler}</span>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#6A4C93] dark:bg-[#D4AF37] transition-all duration-300 group-hover:w-full rounded-full" />
            </Link>
          </div>
          
          <div className="relative group flex items-center h-full">
            <button className="relative font-bold text-[14px] xl:text-[16px] tracking-wider uppercase text-[#3D154B] dark:text-[#F5F3F7] hover:text-[#6A4C93] dark:hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-1.5 py-2">
              <span>{nt.icerikler}</span>
              <ChevronDown className="w-4 h-4 xl:w-5 xl:h-5 group-hover:rotate-180 transition-transform duration-300" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#6A4C93] dark:bg-[#D4AF37] transition-all duration-300 group-hover:w-full rounded-full" />
            </button>
            <div className="absolute top-[calc(100%-1rem)] left-0 mt-4 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white/95 dark:bg-[#1A1520]/95 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0 flex flex-col overflow-hidden before:content-[''] before:absolute before:-top-6 before:left-0 before:w-full before:h-6">
              {displayIcerikler.map((item) => (
                <Link key={item.documentId || item.id} href={`/icerikler/${item.slug}`} className="px-5 py-3.5 text-[14.5px] font-bold text-[#3D154B] dark:text-[#F5F3F7] hover:bg-[#F5EFEA] hover:text-[#6A4C93] dark:hover:bg-white/5 dark:hover:text-[#D4AF37] transition-all duration-300 border-b border-gray-100 dark:border-white/5 uppercase tracking-wider relative group/item overflow-hidden">
                  <span className="relative z-10">{item.title}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#6A4C93]/5 to-transparent dark:from-[#D4AF37]/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
              <Link href="/raporlar" className="px-5 py-3.5 text-[14.5px] font-bold text-[#3D154B] dark:text-[#F5F3F7] hover:bg-[#F5EFEA] hover:text-[#6A4C93] dark:hover:bg-white/5 dark:hover:text-[#D4AF37] transition-all duration-300 uppercase tracking-wider relative group/item overflow-hidden">
                <span className="relative z-10">{nt.raporlar}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#6A4C93]/5 to-transparent dark:from-[#D4AF37]/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </div>
          
          <div className="relative group flex items-center h-full">
            <button className="relative font-bold text-[14px] xl:text-[16px] tracking-wider uppercase text-[#3D154B] dark:text-[#F5F3F7] hover:text-[#6A4C93] dark:hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-1.5 py-2">
              <span>{nt.bilgilendirme}</span>
              <ChevronDown className="w-4 h-4 xl:w-5 xl:h-5 group-hover:rotate-180 transition-transform duration-300" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#6A4C93] dark:bg-[#D4AF37] transition-all duration-300 group-hover:w-full rounded-full" />
            </button>
            <div className="absolute top-[calc(100%-1rem)] left-0 mt-4 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white/95 dark:bg-[#1A1520]/95 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0 flex flex-col overflow-hidden before:content-[''] before:absolute before:-top-6 before:left-0 before:w-full before:h-6">
              {displayBilgilendirme.map((item) => (
                <Link key={item.documentId || item.id} href={`/bilgilendirme/${item.slug}`} className="px-5 py-3.5 text-[14.5px] font-bold text-[#3D154B] dark:text-[#F5F3F7] hover:bg-[#F5EFEA] hover:text-[#6A4C93] dark:hover:bg-white/5 dark:hover:text-[#D4AF37] transition-all duration-300 border-b border-gray-100 dark:border-white/5 uppercase tracking-wider relative group/item overflow-hidden">
                  <span className="relative z-10">{item.title}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#6A4C93]/5 to-transparent dark:from-[#D4AF37]/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="relative flex items-center h-full">
            <Link href="/iletisim" className="relative font-bold text-[14px] xl:text-[16px] tracking-wider uppercase text-[#3D154B] dark:text-[#F5F3F7] hover:text-[#6A4C93] dark:hover:text-[#D4AF37] transition-colors duration-300 group py-2 flex items-center">
              <span>{nt.iletisim}</span>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#6A4C93] dark:bg-[#D4AF37] transition-all duration-300 group-hover:w-full rounded-full" />
            </Link>
          </div>
          
        </div>

        {/* Right: Controls */}
        <div className="hidden lg:flex items-center justify-end gap-2 flex-shrink-0">
          <button 
            onClick={toggleTheme} 
            aria-label="Toggle Theme"
            className="relative w-11 h-11 rounded-full flex items-center justify-center bg-[#F5EFEA] dark:bg-[#2A2432] hover:scale-110 active:scale-95 transition-all duration-300 group shadow-sm border border-black/5 dark:border-white/5 overflow-hidden flex-shrink-0"
          >
            <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            {theme === 'dark' ? <Sun className="w-5 h-5 text-[#E8A838] relative z-10" strokeWidth={2.5} /> : <Moon className="w-5 h-5 text-[#6A4C93] relative z-10" strokeWidth={2.5} />}
          </button>

          <div className="relative" ref={langDropdownRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)} 
              aria-expanded={isLangOpen} 
              className="flex items-center justify-center gap-2 px-3 xl:px-4 h-11 rounded-full bg-[#F5EFEA] dark:bg-[#2A2432] text-[#6A4C93] dark:text-white hover:scale-105 active:scale-95 transition-all duration-300 font-bold text-xs xl:text-sm tracking-widest shadow-sm border border-black/5 dark:border-white/5 flex-shrink-0"
            >
              <Globe className="w-4 h-4 xl:w-5 xl:h-5" strokeWidth={2.5} /> 
              {currentLang} 
              <ChevronDown className={`w-3.5 h-3.5 xl:w-4 xl:h-4 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} strokeWidth={3} />
            </button>

            <div className={`absolute top-[calc(100%+12px)] right-0 w-36 bg-white/95 dark:bg-[#1A1520]/95 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 transition-all duration-300 origin-top-right ${isLangOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'}`}>
              <div className="p-2 flex flex-col gap-1">
                {languages.map((l) => (
                  <button 
                    key={l} 
                    onClick={() => selectLanguage(l)} 
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs xl:text-sm font-black tracking-widest rounded-xl transition-all duration-300 ${currentLang === l ? 'bg-[#6A4C93] text-white shadow-md' : 'text-[#18151A] dark:text-[#F5F3F7] hover:bg-[#F5EFEA] dark:hover:bg-white/5'}`}
                  >
                    {l}
                    {currentLang === l && <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />}
                  </button>
                ))}
              </div>
            </div>
          </div>



          <Link 
            href="/iletisim"
            className="h-11 flex items-center justify-center px-5 xl:px-6 rounded-full bg-transparent border border-[#10B981]/50 shadow-sm text-[#10B981] font-black text-xs xl:text-sm uppercase tracking-wider transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#10B981] hover:text-[#1A1520] hover:border-transparent hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 active:translate-y-0 flex-shrink-0 whitespace-nowrap"
          >
            {pageData?.ui?.btnSupport || nt.destek || 'DESTEK OL'}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button 
            onClick={toggleTheme} 
            aria-label="Toggle Theme"
            className="relative w-10 h-10 rounded-full flex items-center justify-center bg-[#F5EFEA] dark:bg-[#2A2432] hover:scale-110 active:scale-95 transition-all duration-300 group shadow-sm border border-black/5 dark:border-white/5 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            {theme === 'dark' ? <Sun className="w-5 h-5 text-[#E8A838] relative z-10" strokeWidth={2.5} /> : <Moon className="w-5 h-5 text-[#6A4C93] relative z-10" strokeWidth={2.5} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={pageData?.ui?.ariaMenuToggle || "Menüyü Aç/Kapat"} className="text-[#6A4C93] dark:text-white p-2 focus:outline-none transition-colors relative z-[99]">
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 w-full h-screen bg-[#FAF8F5]/95 dark:bg-[#0F0C12]/95 backdrop-blur-3xl flex flex-col justify-center px-8 z-[90]">
          <div className="flex flex-col gap-6 text-left">
            <div className="flex flex-col">
              <button 
                onClick={() => setIsKurumsalOpen(!isKurumsalOpen)} 
                className="text-4xl font-serif font-black tracking-tight text-[#18151A] dark:text-white text-left flex justify-between items-center w-full"
              >
                {nt.kurumsal} <ChevronDown className={`w-8 h-8 transition-transform ${isKurumsalOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`flex-col gap-4 mt-6 ml-4 pl-4 border-l-2 border-[#3D154B]/10 dark:border-white/10 overflow-hidden transition-all duration-300 ${isKurumsalOpen ? 'flex max-h-[400px] opacity-100' : 'max-h-0 opacity-0 hidden'}`}>
                <Link href="/hakkimizda" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">{nt.subHakkimizda}</Link>
                <Link href="/ekibimiz" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">{nt.subEkibimiz}</Link>
                <Link href="/sss" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">{nt.subSss}</Link>
                <Link href="/banka-hesaplarimiz" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">{nt.subBankaHesaplari}</Link>
              </div>
            </div>
            
            <Link href="/haberler" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-serif font-black tracking-tight text-[#18151A] dark:text-white">{nt.haberler}</Link>
            
            <div className="flex flex-col">
              <button 
                onClick={() => setIsIceriklerOpen(!isIceriklerOpen)} 
                className="text-4xl font-serif font-black tracking-tight text-[#18151A] dark:text-white text-left flex justify-between items-center w-full"
              >
                {nt.icerikler} <ChevronDown className={`w-8 h-8 transition-transform ${isIceriklerOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`flex-col gap-4 mt-6 ml-4 pl-4 border-l-2 border-[#3D154B]/10 dark:border-white/10 overflow-hidden transition-all duration-300 ${isIceriklerOpen ? 'flex max-h-[500px] opacity-100' : 'max-h-0 opacity-0 hidden'}`}>
                {displayIcerikler.map((item) => (
                  <Link key={item.documentId || item.id} href={`/icerikler/${item.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">{item.title}</Link>
                ))}
                <Link href="/raporlar" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">{nt.raporlar}</Link>
              </div>
            </div>

            <div className="flex flex-col">
              <button 
                onClick={() => setIsBilgilendirmeOpen(!isBilgilendirmeOpen)} 
                className="text-4xl font-serif font-black tracking-tight text-[#18151A] dark:text-white text-left flex justify-between items-center w-full"
              >
                {nt.bilgilendirme} <ChevronDown className={`w-8 h-8 transition-transform ${isBilgilendirmeOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`flex-col gap-4 mt-6 ml-4 pl-4 border-l-2 border-[#3D154B]/10 dark:border-white/10 overflow-hidden transition-all duration-300 ${isBilgilendirmeOpen ? 'flex max-h-[600px] opacity-100' : 'max-h-0 opacity-0 hidden'}`}>
                {displayBilgilendirme.map((item) => (
                  <Link key={item.documentId || item.id} href={`/bilgilendirme/${item.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">{item.title}</Link>
                ))}
              </div>
            </div>
            
            <Link href="/iletisim" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-serif font-black tracking-tight text-[#18151A] dark:text-white">{nt.iletisim}</Link>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-8 mt-8 border-t border-gray-200 dark:border-white/10">
            {languages.map((l) => (
              <button key={l} onClick={() => selectLanguage(l)} className={`px-3 py-2.5 text-xs font-black tracking-widest rounded-full flex-1 min-w-[55px] transition-all ${currentLang === l ? 'bg-[#D4AF37] animate-breathe text-white shadow-md scale-105' : 'bg-gray-200 dark:bg-white/5 text-gray-700 dark:text-white'}`}>{l}</button>
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-8">

            <Link 
              href="/iletisim"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center bg-transparent border border-[#10B981]/50 text-[#10B981] font-black text-sm uppercase tracking-wider py-4 rounded-full shadow-sm text-center hover:bg-[#10B981] hover:text-[#1A1520] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-500"
            >
              {pageData?.ui?.btnSupport || nt.destek || 'DESTEK OL'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
