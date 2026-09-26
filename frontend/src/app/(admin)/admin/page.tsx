"use client";

import React, { useEffect, useState } from 'react';
import { 
  FileText, Newspaper, TrendingUp, AlertCircle, Building2, 
  MessageSquare, Bell, Image as ImageIcon, Briefcase, Mail, Activity, ChevronRight, Users, Phone, HelpCircle
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    haber: 0,
    banka: 0,
    mesaj: 0,
    duyuru: 0,
    modul: 0,
    ekip: 0,
    etkinlik: 0,
    icerik: 0,
    slider: 0,
    sss: 0,
    rapor: 0
  });
  
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          haberRes, bankaRes, mesajRes, duyuruRes, modulRes, ekipRes, etkinlikRes, icerikRes, recentMsgRes, sliderRes, sssRes, raporRes
        ] = await Promise.all([
          fetch('/api/strapi/habers').then(r => r.json()),
          fetch('/api/strapi/banka-hesabis').then(r => r.json()),
          fetch('/api/strapi/contact-messages').then(r => r.json()),
          fetch('/api/strapi/announcements').then(r => r.json()),
          fetch('/api/strapi/modules').then(r => r.json()),
          fetch('/api/strapi/team-members').then(r => r.json()),
          fetch('/api/strapi/events').then(r => r.json()),
          fetch('/api/strapi/articles').then(r => r.json()),
          fetch('/api/strapi/contact-messages?sort=createdAt:desc&pagination[limit]=5').then(r => r.json()),
          fetch('/api/strapi/sliders').then(r => r.json().catch(() => ({}))),
          fetch('/api/strapi/faqs').then(r => r.json().catch(() => ({}))),
          fetch('/api/strapi/rapors').then(r => r.json().catch(() => ({})))
        ]);

        setStats({
          haber: haberRes.data?.length || 0,
          banka: bankaRes.data?.length || 0,
          mesaj: mesajRes.data?.length || 0,
          duyuru: duyuruRes.data?.length || 0,
          modul: modulRes.data?.length || 0,
          ekip: ekipRes.data?.length || 0,
          etkinlik: etkinlikRes.data?.length || 0,
          icerik: icerikRes.data?.length || 0,
          slider: sliderRes.data?.length || 0,
          sss: sssRes.data?.length || 0,
          rapor: raporRes.data?.length || 0
        });

        if (recentMsgRes.data) {
          setRecentMessages(recentMsgRes.data);
        }
      } catch (err) {
        console.error("Dashboard verileri alınırken hata oluştu:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const statCards = [
    { label: 'Gelen Mesajlar', value: stats.mesaj.toString(), icon: Mail, href: '/admin/mesajlar' },
    { label: 'Slider Yönetimi', value: stats.slider.toString(), icon: ImageIcon, href: '/admin/slider' },
    { label: 'Çalışma Alanları', value: stats.modul.toString(), icon: Briefcase, href: '/admin/alanlar' },
    { label: 'Ekibimiz (Kişi)', value: stats.ekip.toString(), icon: Users, href: '/admin/ekip' },
    { label: 'Toplam Haber', value: stats.haber.toString(), icon: Newspaper, href: '/admin/haberler' },
    { label: 'Toplam Rapor', value: stats.rapor.toString(), icon: FileText, href: '/admin/raporlar' },
    { label: 'Duyurular', value: stats.duyuru.toString(), icon: Bell, href: '/admin/duyurular' },
    { label: 'S.S.S.', value: stats.sss.toString(), icon: HelpCircle, href: '/admin/sss' },
    { label: 'Banka Hesapları', value: stats.banka.toString(), icon: Building2, href: '/admin/banka-hesaplari' },
    { label: 'İletişim Ayarları', value: '-', icon: Phone, href: '/admin/iletisim' },
    { label: 'Site Metinleri', value: '-', icon: FileText, href: '/admin/metinler' },
    { label: 'Menü Yönetimi', value: '-', icon: FileText, href: '/admin/menuler' },
    { label: 'Kullanıcılar', value: '-', icon: Users, href: '/admin/kullanicilar' },
    { label: 'Genel Ayarlar', value: '-', icon: FileText, href: '/admin/ayarlar' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* İstatistik Kartları Grid (Premium Design) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link key={i} href={stat.href} className="group relative bg-[#F8F9FA]/80 dark:bg-[#18151A]/80 backdrop-blur-xl border border-[#3D154B]/5 dark:border-[#E0CFF2]/5 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-[#D4AF37]/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden">
              {/* Subtle Gold Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-[#D4AF37]/0 group-hover:to-[#D4AF37]/5 transition-colors duration-500 rounded-2xl" />
              
              <div className="relative flex justify-between items-start mb-4 z-10">
                <div>
                  <p className="text-[#6A4C93] dark:text-[#E0CFF2]/70 font-medium text-xs tracking-widest uppercase mb-2">{stat.label}</p>
                  <h3 className="text-4xl font-light text-[#3D154B] dark:text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                    {loading ? <span className="animate-pulse opacity-50">...</span> : stat.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-full bg-white dark:bg-[#2A2436] border border-[#3D154B]/10 dark:border-[#E0CFF2]/10 group-hover:border-[#D4AF37]/50 shadow-sm transition-all duration-300 group-hover:scale-110`}>
                  <Icon size={20} className="text-[#3D154B] dark:text-[#E0CFF2] group-hover:text-[#D4AF37] transition-colors" />
                </div>
              </div>
              
              <div className="relative mt-auto flex items-center justify-between z-10 pt-4 border-t border-[#3D154B]/5 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#10B981] uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                  </span>
                  Aktif ve Yayında
                </div>
                <span className="text-xs font-semibold text-[#D4AF37] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1">
                  YÖNET <ChevronRight size={14} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
