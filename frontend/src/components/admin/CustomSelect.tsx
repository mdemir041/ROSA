"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  placeholder?: string;
}

export default function CustomSelect({ value, onChange, options, placeholder = "Seçiniz..." }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm text-[#3D154B] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer flex items-center justify-between group hover:border-[#D4AF37]/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? "text-[#3D154B] dark:text-white font-medium" : "text-gray-400 dark:text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={14} className={`text-gray-400 group-hover:text-[#D4AF37] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1.5 bg-white/95 dark:bg-[#1A1622]/95 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-xl shadow-xl overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-200 origin-top">
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <div
                key={option.value}
                className={`px-3 py-2 text-sm cursor-pointer transition-colors flex items-center justify-between mx-1.5 rounded-md
                  ${isSelected 
                    ? "bg-[#6A4C93]/10 dark:bg-[#D4AF37]/15 text-[#6A4C93] dark:text-[#D4AF37] font-bold" 
                    : "text-[#3D154B] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#6A4C93] dark:hover:text-[#D4AF37] font-medium"
                  }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <span>{option.label}</span>
                {isSelected && <Check size={14} strokeWidth={3} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
