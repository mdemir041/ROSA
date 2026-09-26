"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminTopbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const isDarkMode = theme === 'dark';
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageInfo = () => {
    if (pathname.includes('/banka-hesaplari')) {
      return { title: 'Banka Hesapları', desc: 'Bağış ve aidat hesaplarınızı yönetin' };
    }
    if (pathname.includes('/haberler')) {
      return { title: 'Haber Yönetimi', desc: 'Sistemdeki tüm haberleri yönetin' };
    }
    if (pathname.includes('/raporlar')) {
      return { title: 'Rapor Yönetimi', desc: 'Dernek raporlarını ve dosyalarını yönetin' };
    }
    if (pathname.includes('/kullanicilar')) {
      return { title: 'Kullanıcı Yönetimi', desc: 'Sistem yöneticileri ve yetkilendirmeleri' };
    }
    if (pathname.includes('/iletisim')) {
      return { title: 'İletişim Bilgileri', desc: 'Sitedeki tüm iletişim kanallarını ve adres bilgilerini yönetin' };
    }
    if (pathname.includes('/ayarlar')) {
      return { title: 'Sistem Ayarları', desc: 'Genel yapılandırma ve loglar' };
    }
    return { title: 'Dashboard', desc: 'Sisteme genel bakış ve istatistikler' };
  };

  const { title, desc } = getPageInfo();

  return (
    <header className="h-20 w-full sticky top-0 bg-white/40 dark:bg-[#1A1622]/40 backdrop-blur-2xl border-b border-[#6A4C93]/10 px-8 flex items-center justify-between z-40 transition-colors duration-500">
      <div>
        <h1 className="text-2xl font-bold text-[#3D154B] dark:text-[#E0CFF2]">{title}</h1>
        <p className="text-sm text-[#6A4C93] dark:text-[#D4AF37]">{desc}</p>
      </div>

      <div className="flex items-center gap-4">
        <button 
          className="p-2.5 rounded-xl bg-white/50 dark:bg-[#2A2436]/50 text-[#3D154B] dark:text-[#D4AF37] hover:bg-[#6A4C93]/10 dark:hover:bg-[#D4AF37]/20 transition-all border border-[#6A4C93]/10"
        >
          <Bell size={20} />
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-white/50 dark:bg-[#2A2436]/50 text-[#3D154B] dark:text-[#D4AF37] hover:bg-[#6A4C93]/10 dark:hover:bg-[#D4AF37]/20 transition-all border border-[#6A4C93]/10"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white/50 dark:bg-[#2A2436]/50 border border-[#6A4C93]/10 hover:bg-[#6A4C93]/5 dark:hover:bg-[#D4AF37]/10 transition-all"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#6A4C93] to-[#D4AF37] flex items-center justify-center text-white font-bold shadow-lg shadow-[#6A4C93]/20 border-2 border-white dark:border-[#2A2436]">
              A
            </div>
            <div className="flex flex-col items-start hidden md:flex">
              <span className="text-sm font-bold text-[#3D154B] dark:text-[#E0CFF2] leading-none mb-1">Admin</span>
              <span className="text-[10px] text-[#6A4C93] dark:text-[#D4AF37] font-semibold tracking-wider uppercase leading-none">Yönetici</span>
            </div>
            <ChevronDown size={16} className={`text-[#3D154B] dark:text-[#D4AF37] transition-transform duration-300 ml-1 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#1A1622] rounded-2xl shadow-[0_10px_40px_rgba(106,76,147,0.15)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-[#6A4C93]/10 dark:border-white/5 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-50">
              <div className="p-2 space-y-1">
                <Link 
                  href="/admin/profil" 
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#3D154B] dark:text-[#E0CFF2] hover:bg-[#6A4C93]/5 dark:hover:bg-white/5 transition-colors"
                >
                  <User size={18} className="text-[#6A4C93] dark:text-[#D4AF37]" />
                  Profili Düzenle
                </Link>
                <Link 
                  href="/admin/ayarlar" 
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#3D154B] dark:text-[#E0CFF2] hover:bg-[#6A4C93]/5 dark:hover:bg-white/5 transition-colors"
                >
                  <Settings size={18} className="text-[#6A4C93] dark:text-[#D4AF37]" />
                  Ayarlar
                </Link>
              </div>
              <div className="p-2 border-t border-[#6A4C93]/10 dark:border-white/5">
                <button 
                  onClick={() => {
                    setIsProfileOpen(false);
                    // Clear any auth tokens/state
                    try {
                      localStorage.clear();
                      sessionStorage.clear();
                      document.cookie.split(";").forEach((c) => {
                        document.cookie = c
                          .replace(/^ +/, "")
                          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                      });
                    } catch (e) {}
                    
                    // Redirect to login page
                    router.push('/admin-giris');
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={18} />
                  Çıkış Yap
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
