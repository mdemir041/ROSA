'use client';

import React from 'react';

const SOCIAL_LINKS = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
      </svg>
    ),
    link: 'https://www.facebook.com/rosakadin'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M21.582 6.186a2.68 2.68 0 00-1.884-1.895C17.973 3.846 12 3.846 12 3.846s-5.973 0-7.698.445a2.68 2.68 0 00-1.884 1.895C1.973 7.925 1.973 12 1.973 12s0 4.075.445 5.814a2.68 2.68 0 001.884 1.895c1.725.445 7.698.445 7.698.445s5.973 0 7.698-.445a2.68 2.68 0 001.884-1.895c.445-1.739.445-5.814.445-5.814s0-4.075-.445-5.814zM9.96 15.494V8.506L16.039 12l-6.079 3.494z" />
      </svg>
    ),
    link: 'https://youtube.com'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.048 1.067.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.067.048-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 2.16c-2.67 0-2.987.01-4.042.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.042 0 2.67.01 2.987.058 4.042.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.042.058 2.67 0 2.987-.01 4.042-.058.975-.045 1.504-.207 1.857-.344.467-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.042 0-2.67-.01-2.987-.058-4.042-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.042-.058zm0 2.67a5.17 5.17 0 100 10.339 5.17 5.17 0 000-10.34zm0 8.18a3.01 3.01 0 110-6.02 3.01 3.01 0 010 6.02zM17.338 7.9a1.44 1.44 0 11-2.879 0 1.44 1.44 0 012.879 0z" />
      </svg>
    ),
    link: 'https://instagram.com/rosakadindernegi'
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    link: 'https://twitter.com/rosakadinderne1'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 0a12 12 0 0 0-4.37 23.17c-.03-.83-.06-2.11.01-3 .07-.82 1.38-5.83 1.38-5.83s-.35-.71-.35-1.75c0-1.64.95-2.86 2.13-2.86 1 0 1.49.76 1.49 1.66 0 1.01-.64 2.53-.98 3.93-.28 1.18.6 2.14 1.75 2.14 2.1 0 3.71-2.21 3.71-5.4 0-2.82-2.03-4.8-4.93-4.8-3.36 0-5.33 2.52-5.33 5.12 0 1.02.39 2.11.88 2.7.1.12.11.22.08.34l-.32 1.34c-.05.22-.17.27-.39.16-1.47-.68-2.4-2.83-2.4-4.57 0-3.72 2.71-7.14 7.83-7.14 4.1 0 7.28 2.92 7.28 6.82 0 4.07-2.57 7.35-6.14 7.35-1.2 0-2.32-.62-2.71-1.36l-.74 2.8c-.27 1.03-.99 2.32-1.48 3.1 1.11.34 2.27.53 3.5.53 6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
      </svg>
    ),
    link: 'https://pinterest.com'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.55 8.16l-1.93 9.06c-.14.65-.53.81-1.08.5l-3-2.21-1.44 1.39c-.16.16-.3.3-.61.3l.21-3.05 5.56-5.02c.24-.22-.05-.34-.38-.12l-6.87 4.33-2.96-.93c-.64-.2-.65-.64.14-.95l11.55-4.45c.54-.2 1.02.13.86.95z" />
      </svg>
    ),
    link: 'https://telegram.org'
  }
];

export default function FloatingSocialSidebar() {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 animate-cinematic-reveal hidden md:flex flex-col gap-4">
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.id}
          href={social.link}
          target="_blank"
          rel="noreferrer"
          aria-label={social.name}
          className="group relative flex items-center justify-center w-[52px] h-[52px] rounded-2xl bg-white/90 dark:bg-[#18151A]/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-[#6A4C93]/10 dark:border-[#E0CFF2]/10 hover:border-[#D4AF37]/50 dark:hover:border-[#D4AF37]/50 hover:shadow-lg hover:shadow-[#D4AF37]/20 hover:-translate-y-1 transition-all duration-500 overflow-visible"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent to-transparent group-hover:to-[#D4AF37]/10 dark:group-hover:to-[#D4AF37]/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none transition-colors duration-500" />
          
          {/* Icon */}
          <div className="relative z-10 text-[#6A4C93]/80 dark:text-[#E0CFF2]/60 group-hover:text-[#D4AF37] group-hover:scale-[1.15] transition-all duration-500 drop-shadow-sm">
            {social.icon}
          </div>
          
          {/* Custom Tooltip */}
          <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#3D154B] dark:bg-[#E0CFF2] text-[#E0CFF2] dark:text-[#3D154B] text-[11px] font-bold uppercase tracking-[0.2em] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap shadow-xl transform -translate-x-2 group-hover:translate-x-0 border border-[#D4AF37]/30 pointer-events-none">
            {social.name}
            {/* Arrow */}
            <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 border-y-[5px] border-y-transparent border-r-[5px] border-r-[#3D154B] dark:border-r-[#E0CFF2]" />
          </div>
        </a>
      ))}
    </div>
  );
}
