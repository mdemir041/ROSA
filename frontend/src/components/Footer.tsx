"use client";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { UIStrings, ContactContent } from '@/types/cms';

interface FooterProps {
  ui: UIStrings;
  contact: ContactContent;
  onOpenDonateModal: () => void;
}

export default function Footer({ ui, contact: initialContact, onOpenDonateModal }: FooterProps): React.JSX.Element {
  const [socials, setSocials] = useState({ 
    instagram: 'https://instagram.com/rosakadindernegi', 
    twitter: 'https://twitter.com/rosakadinderne1', 
    facebook: 'https://www.facebook.com/rosakadin',
    youtube: 'https://youtube.com',
    pinterest: 'https://pinterest.com',
    telegram: 'https://telegram.org'
  });

  useEffect(() => {
    fetch('/api/strapi/iletisims')
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          const item = data.data[0];
          setSocials(prev => ({
            instagram: item.instagram || prev.instagram,
            twitter: item.twitter || prev.twitter,
            facebook: item.facebook || prev.facebook,
            youtube: item.youtube || prev.youtube,
            pinterest: item.pinterest || prev.pinterest,
            telegram: item.telegram || prev.telegram
          }));
        }
      })
      .catch(console.error);
  }, []);

  return (
    <footer className="relative z-10 bg-gradient-to-b from-[#FAF8F5] to-white dark:from-[#0F0C12] dark:to-[#050505] pt-24 md:pt-32 pb-8 overflow-hidden border-t border-[#3D154B]/10 dark:border-white/5">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D4AF37] opacity-10 dark:opacity-5 mix-blend-multiply dark:mix-blend-screen blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center relative z-10">
        
        {/* Big Typography / Logo */}
        <div className="text-center mb-10 flex justify-center transform hover:scale-[1.02] transition-transform duration-700">
          <Link href="/" className="relative flex justify-center items-center">
            <Image 
              src="/image_2.png" 
              alt="Rosa Kadın Derneği" 
              width={320}
              height={140}
              className="h-24 md:h-32 lg:h-40 w-auto object-contain drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              priority
            />
          </Link>
        </div>

        {/* Thin Divider Line */}
        <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-[#6A4C93]/30 dark:via-white/10 to-transparent mb-12" />

        {/* Social Media Icons (Centered) */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
          {socials.facebook && (
            <Link href={socials.facebook} className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-white/50 dark:bg-white/5 shadow-sm border border-[#6A4C93]/15 dark:border-white/10 hover:-translate-y-2 hover:bg-[#6A4C93] dark:hover:bg-white/10 hover:border-[#6A4C93] dark:hover:border-white/20 transition-all duration-300 group">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#6A4C93] dark:text-[#B2AAC0] group-hover:text-white dark:group-hover:text-[#D4AF37] transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
          {socials.youtube && (
            <Link href={socials.youtube} className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-white/50 dark:bg-white/5 shadow-sm border border-[#6A4C93]/15 dark:border-white/10 hover:-translate-y-2 hover:bg-[#6A4C93] dark:hover:bg-white/10 hover:border-[#6A4C93] dark:hover:border-white/20 transition-all duration-300 group">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#6A4C93] dark:text-[#B2AAC0] group-hover:text-white dark:group-hover:text-[#D4AF37] transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
          {socials.instagram && (
            <Link href={socials.instagram} className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-white/50 dark:bg-white/5 shadow-sm border border-[#6A4C93]/15 dark:border-white/10 hover:-translate-y-2 hover:bg-[#6A4C93] dark:hover:bg-white/10 hover:border-[#6A4C93] dark:hover:border-white/20 transition-all duration-300 group">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#6A4C93] dark:text-[#B2AAC0] group-hover:text-white dark:group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
          )}
          {socials.twitter && (
            <Link href={socials.twitter} className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-white/50 dark:bg-white/5 shadow-sm border border-[#6A4C93]/15 dark:border-white/10 hover:-translate-y-2 hover:bg-[#6A4C93] dark:hover:bg-white/10 hover:border-[#6A4C93] dark:hover:border-white/20 transition-all duration-300 group">
              <svg className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] text-[#6A4C93] dark:text-[#B2AAC0] group-hover:text-white dark:group-hover:text-[#D4AF37] transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
          )}
          {socials.pinterest && (
            <Link href={socials.pinterest} className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-white/50 dark:bg-white/5 shadow-sm border border-[#6A4C93]/15 dark:border-white/10 hover:-translate-y-2 hover:bg-[#6A4C93] dark:hover:bg-white/10 hover:border-[#6A4C93] dark:hover:border-white/20 transition-all duration-300 group">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#6A4C93] dark:text-[#B2AAC0] group-hover:text-white dark:group-hover:text-[#D4AF37] transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.601 0 12.017 0z"/>
              </svg>
            </Link>
          )}
          {socials.telegram && (
            <Link href={socials.telegram} className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-white/50 dark:bg-white/5 shadow-sm border border-[#6A4C93]/15 dark:border-white/10 hover:-translate-y-2 hover:bg-[#6A4C93] dark:hover:bg-white/10 hover:border-[#6A4C93] dark:hover:border-white/20 transition-all duration-300 group">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#6A4C93] dark:text-[#B2AAC0] group-hover:text-white dark:group-hover:text-[#D4AF37] transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.18-.08-.05-.19-.02-.27 0l-3.85 2.42c-.52.34-1.01.5-1.46.48-.48-.01-1.42-.27-2.12-.5-.85-.28-.96-.44-.9-.94.03-.23.18-.47.46-.72l8.28-3.19c.38-.15.75-.29 1.13-.29.25 0 .49.06.66.2.14.12.18.3.16.55z" />
              </svg>
            </Link>
          )}
        </div>

        {/* Minimal Links Row */}
        <div className="w-full flex flex-wrap items-center justify-center gap-x-6 md:gap-x-10 gap-y-4 mb-10 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
          <Link href="/hakkimizda" className="text-[#6A4C93] dark:text-[#B2AAC0] hover:text-[#3D154B] dark:hover:text-[#D4AF37] transition-colors relative group">
            {ui.footerAbout}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-[#3D154B] dark:bg-[#D4AF37] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/#dayanisma" className="text-[#6A4C93] dark:text-[#B2AAC0] hover:text-[#3D154B] dark:hover:text-[#D4AF37] transition-colors relative group">
            {ui.footerWork}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-[#3D154B] dark:bg-[#D4AF37] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/iletisim" className="text-[#6A4C93] dark:text-[#B2AAC0] hover:text-[#3D154B] dark:hover:text-[#D4AF37] transition-colors relative group">
            {ui.footerContact}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-[#3D154B] dark:bg-[#D4AF37] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/sss" className="text-[#6A4C93] dark:text-[#B2AAC0] hover:text-[#3D154B] dark:hover:text-[#D4AF37] transition-colors relative group">
            {ui.footerFaq || "SSS"}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-[#3D154B] dark:bg-[#D4AF37] transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Bottom Row: Copyright, Credits, Legal */}
        <div className="w-full pt-6 border-t border-black/5 dark:border-white/5 grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-0 pb-4">
          
          {/* Left: Copyright */}
          <div className="flex justify-center md:justify-start order-3 md:order-1">
            <p className="text-[10px] md:text-[11px] font-medium tracking-[0.15em] text-[#6A4C93]/70 dark:text-[#B2AAC0]/60 uppercase flex items-center gap-2">
              <span>{ui.accountHolderName || "ROSA KADIN DERNEĞİ"}</span>
              <span className="opacity-50 font-light">-</span>
              <span className="font-light tracking-widest opacity-80">© {new Date().getFullYear()}</span>
            </p>
          </div>

          {/* Center: Designed By Credit */}
          <div className="flex flex-col items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-700 order-1 md:order-2">
            <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] text-[#6A4C93]/60 dark:text-[#B2AAC0]/60 mb-1 block pl-[0.4em]">
              DESIGNED BY
            </span>
            <div className="flex items-center">
              <span className="text-xs md:text-[13px] font-black uppercase tracking-[0.25em] bg-gradient-to-r from-[#6A4C93] via-[#B59477] to-[#D4AF37] dark:from-[#A297B1] dark:via-[#D4AF37] dark:to-[#F3E5AB] bg-clip-text text-transparent drop-shadow-sm pl-[0.25em]">
                GONDWANA YAZILIM
              </span>
            </div>
          </div>

          {/* Right: Legal Links */}
          <div className="flex items-center justify-center md:justify-end gap-3 md:gap-4 order-2 md:order-3 text-[10px] md:text-[11px] font-medium tracking-[0.15em] text-[#6A4C93]/70 dark:text-[#B2AAC0]/60 uppercase">
            <Link href="/kvkk" className="hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors duration-300 relative group">
              {ui.footerKVKK || "KVKK"}
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-px bg-[#D4AF37] transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
            </Link>
            <span className="text-[#6A4C93]/30 dark:text-white/20 font-light text-xs">-</span>
            <Link href="/cerez-politikasi" className="hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors duration-300 relative group">
              {ui.footerCookies || "ÇEREZ POLİTİKASI"}
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-px bg-[#D4AF37] transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
