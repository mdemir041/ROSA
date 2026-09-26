"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

const languages = [
  { code: 'TR', label: 'Türkçe', short: 'TR' },
  { code: 'EN', label: 'English', short: 'EN' },
  { code: 'KU', label: 'Kurdî', short: 'KU' },
  { code: 'DE', label: 'Deutsch', short: 'DE' },
  { code: 'FR', label: 'Français', short: 'FR' },
];

export default function LanguageSelector({ value, onChange, className = "" }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = languages.find(l => l.code === value) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative z-50 ${className}`} ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full min-w-[150px] bg-white/80 dark:bg-[#18151A]/80 backdrop-blur-md border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-2.5 outline-none hover:border-[#6A4C93]/50 dark:hover:border-white/30 hover:shadow-md transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg text-[11px] font-black tracking-wider bg-gradient-to-br from-[#6A4C93] to-[#3D154B] dark:from-[#D4AF37] dark:to-[#8B7322] text-white shadow-sm shadow-[#6A4C93]/20 transition-transform group-hover:scale-105">
            {selected.short}
          </div>
          <span className="font-bold text-[#3D154B] dark:text-white text-sm">{selected.label}</span>
        </div>
        <ChevronDown size={16} className={`text-[#6A4C93] dark:text-[#D4AF37] transition-transform duration-300 ml-2 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 md:left-0 min-w-full w-max bg-white/95 dark:bg-[#1A1622]/95 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top z-[100]">
          <div className="flex flex-col p-2 gap-1">
            {languages.map((lang) => {
              const isSelected = value === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    onChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={`group flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-[#6A4C93]/10 to-transparent dark:from-[#D4AF37]/10' 
                      : 'hover:bg-[#6A4C93]/5 dark:hover:bg-white/5'
                  }`}
                >
                  <div className={`flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-black tracking-wider transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#6A4C93] dark:bg-[#D4AF37] text-white dark:text-[#1A1622] shadow-sm'
                      : 'bg-[#6A4C93]/10 dark:bg-white/5 text-[#6A4C93] dark:text-gray-400 group-hover:bg-[#6A4C93]/20 dark:group-hover:bg-white/10 group-hover:text-[#3D154B] dark:group-hover:text-white'
                  }`}>
                    {lang.short}
                  </div>
                  <span className={`${
                    isSelected 
                      ? 'text-[#6A4C93] dark:text-[#D4AF37]' 
                      : 'text-[#3D154B]/70 dark:text-gray-400 group-hover:text-[#3D154B] dark:group-hover:text-white'
                  }`}>
                    {lang.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
