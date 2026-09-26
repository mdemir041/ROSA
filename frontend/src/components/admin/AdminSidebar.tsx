"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Newspaper, 
  FileText, 
  Settings, 
  LogOut, 
  Building2,
  Users,
  Phone,
  Images,
  Briefcase,
  Image as ImageIcon,
  Bell,
  HelpCircle,
  Languages,
  Mail,
  Navigation
} from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Mesajlar', href: '/admin/mesajlar', icon: Mail },
  { name: 'Slider', href: '/admin/slider', icon: Images },
  { name: 'Çalışma Alanları', href: '/admin/alanlar', icon: Briefcase },
  { name: 'Ekibimiz', href: '/admin/ekip', icon: Users },
  { name: 'Haberler', href: '/admin/haberler', icon: Newspaper },
  { name: 'Raporlar', href: '/admin/raporlar', icon: FileText },
  { name: 'Duyurular', href: '/admin/duyurular', icon: Bell },
  { name: 'S.S.S.', href: '/admin/sss', icon: HelpCircle },
  { name: 'Banka Hesapları', href: '/admin/banka-hesaplari', icon: Building2 },
  { name: 'İletişim', href: '/admin/iletisim', icon: Phone },
  { name: 'Site Metinleri', href: '/admin/metinler', icon: Languages },
  { name: 'Menü Yönetimi', href: '/admin/menuler', icon: Navigation },
  { name: 'Kullanıcılar', href: '/admin/kullanicilar', icon: Users },
  { name: 'Ayarlar', href: '/admin/ayarlar', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col bg-white/40 dark:bg-[#1A1622]/40 backdrop-blur-2xl border-r border-[#6A4C93]/10 transition-colors duration-500 z-50">
      <Link href="/" target="_blank" className="p-6 flex items-center gap-3 border-b border-[#6A4C93]/10 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
        <div className="relative overflow-hidden rounded-full transform group-hover:scale-105 transition-transform duration-300">
          <Image src="/image_2.png" alt="Rosa Logo" width={40} height={40} className="rounded-full" />
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="group-hover:translate-x-1 transition-transform duration-300">
          <h2 className="text-[#3D154B] dark:text-[#E0CFF2] font-semibold text-lg leading-tight flex items-center gap-2">
            Rosa Admin
          </h2>
          <p className="text-[10px] uppercase tracking-wider text-[#6A4C93] dark:text-[#D4AF37] font-bold group-hover:text-[#D4AF37] transition-colors mt-0.5">Ana Sayfayı Gör ↗</p>
        </div>
      </Link>

      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.href === '/admin' 
            ? pathname === '/admin' 
            : pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-[#6A4C93] text-white shadow-lg shadow-[#6A4C93]/20' 
                  : 'text-[#3D154B]/70 dark:text-[#E0CFF2]/70 hover:bg-[#6A4C93]/10 dark:hover:bg-[#D4AF37]/10 hover:text-[#3D154B] dark:hover:text-[#D4AF37]'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-white' : 'opacity-80'} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-[#6A4C93]/10 dark:border-white/10 flex flex-col gap-2">
        <button 
          onClick={() => {
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
            window.location.assign('/admin-giris');
          }}
          className="flex w-full items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Çıkış Yap</span>
        </button>

        <div className="mt-4 flex flex-col items-center justify-center pb-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
          <p className="text-[8px] uppercase tracking-[0.5em] text-[#6A4C93]/50 dark:text-gray-500 font-bold mb-1.5">
            Designed By
          </p>
          <div className="flex items-center gap-3">
            <div className="w-4 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/60"></div>
            <p className="text-[11px] uppercase tracking-[0.25em] font-black bg-clip-text text-transparent bg-gradient-to-r from-[#6A4C93] to-[#D4AF37] dark:from-[#D4AF37] dark:to-[#FFF8D6]">
              GONDWANA YAZILIM
            </p>
            <div className="w-4 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/60"></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
