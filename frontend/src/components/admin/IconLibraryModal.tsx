"use client";

import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Search } from "lucide-react";
import { icons as LucideIcons } from "lucide-react";
import * as FaIcons from "react-icons/fa6";

interface IconLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (iconName: string) => void;
}

export default function IconLibraryModal({ isOpen, onClose, onSelect }: IconLibraryModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"fontawesome" | "lucide">("lucide");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter icons based on search
  const filteredIcons = useMemo(() => {
    let allIconEntries: [string, any][] = [];

    if (activeTab === "lucide") {
      if (LucideIcons) {
        allIconEntries = Object.entries(LucideIcons).filter(([name, iconObj]) => {
          return typeof iconObj === 'object' || typeof iconObj === 'function';
        });
      }
    } else if (activeTab === "fontawesome") {
      if (FaIcons) {
        allIconEntries = Object.entries(FaIcons);
      }
    }

    if (!searchTerm) {
      return allIconEntries.slice(0, 250);
    }

    const term = searchTerm.toLowerCase();
    return allIconEntries.filter(([name]) => name.toLowerCase().includes(term)).slice(0, 250);
  }, [searchTerm, activeTab]);

  const totalIconsCount = activeTab === "lucide" 
    ? Object.keys(LucideIcons || {}).length 
    : Object.keys(FaIcons || {}).length;

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-5xl bg-[#f8f9fa] dark:bg-[#1a1b1e] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#6A4C93] rounded-full"></div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">İkon Kütüphanesi</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Top Bar (Tabs & Search) */}
        <div className="p-6 pb-2 border-b border-gray-200 dark:border-white/10 space-y-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab("fontawesome")}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${activeTab === "fontawesome" ? "bg-white dark:bg-black/20 shadow-sm border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent"}`}
            >
              FontAwesome
            </button>
            <button 
              onClick={() => setActiveTab("lucide")}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${activeTab === "lucide" ? "bg-white dark:bg-black/20 shadow-sm border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent"}`}
            >
              Lucide
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="İkon ara... (örn. heart, building)"
                className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A4C93] dark:text-white"
              />
            </div>
            <div className="text-sm font-semibold text-gray-500">
              {searchTerm ? `${filteredIcons.length} sonuç bulundu` : `${totalIconsCount} ikon`}
            </div>
          </div>
        </div>

        {/* Icon Grid */}
        <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 dark:hover:[&::-webkit-scrollbar-thumb]:bg-white/30">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
            {filteredIcons.map(([name, IconComponent]) => {
              // Ensure it is a valid React component
              if (typeof IconComponent !== 'object' && typeof IconComponent !== 'function') return null;
              // Exclude createLucideIcon
              if (name === 'createLucideIcon' || name === 'default') return null;

              const RenderedIcon = IconComponent as React.ElementType;

              return (
                <button
                  key={name}
                  onClick={() => {
                    onSelect(name);
                    onClose();
                  }}
                  className="flex flex-col items-center justify-center gap-3 p-4 bg-white dark:bg-[#2A2436]/40 border border-gray-200 dark:border-white/5 rounded-2xl hover:border-[#6A4C93] hover:shadow-md hover:-translate-y-1 transition-all group"
                >
                  <div className="text-gray-600 dark:text-gray-300 group-hover:text-[#6A4C93] group-hover:scale-110 transition-transform">
                    <RenderedIcon size={24} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 text-center truncate w-full group-hover:text-[#6A4C93] font-medium" title={name}>
                    {name}
                  </span>
                </button>
              );
            })}
            
            {filteredIcons.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500 font-medium">
                Aramanızla eşleşen ikon bulunamadı.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
