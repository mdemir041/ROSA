'use client';
import React, { useState } from 'react';
import { Target, Heart, Shield, Activity, Users, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';

export default function HakkimizdaPage(): React.JSX.Element {
  const { lang } = useLanguage();
  const { pageData, loading } = useCMS();

  if (!pageData) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-12 h-12 border-4 border-[#6A4C93] border-t-transparent rounded-full"></div></div>;
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#FAF8F5] dark:bg-[#0F0C12]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-20 animate-cinematic-reveal">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-1 bg-[#D4AF37] rounded-full"></span>
            <span className="text-[#D4AF37] font-bold tracking-[0.2em] uppercase text-sm">HAKKIMIZDA</span>
            <span className="w-8 h-1 bg-[#D4AF37] rounded-full"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-black text-[#3D154B] dark:text-white mb-6">
            Rosa Kadın Derneği
          </h1>
          <p className="text-xl text-[#6A4C93] dark:text-[#D4AF37] font-medium max-w-3xl mx-auto">
            Kadınların sosyal, hukuki ve psikolojik haklarını savunmak, eşit ve özgür bir yaşam inşa etmek için buradayız.
          </p>
        </div>

        {/* Kimdir & Ne Yapar? */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center">
          <div className="order-2 lg:order-1 space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-[#1A1622] p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 animate-cinematic-reveal">
            <h2 className="text-3xl font-bold text-[#3D154B] dark:text-white mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-[#6A4C93]" />
              Biz Kimiz?
            </h2>
            {pageData.sections.aboutDesc.split('\n').map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          
          <div className="order-1 lg:order-2 grid grid-cols-1 gap-6 animate-cinematic-reveal" style={{ animationDelay: '200ms' }}>
            {/* Vizyon */}
            <div className="bg-gradient-to-br from-[#3D154B] to-[#6A4C93] p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full transition-transform duration-700 group-hover:scale-150" />
              <Target className="w-12 h-12 text-[#D4AF37] mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Vizyonumuz</h3>
              <p className="text-white/80 leading-relaxed">
                Toplumsal cinsiyet eşitsizliğinin ortadan kalktığı, hiçbir kadının şiddete ve ayrımcılığa maruz kalmadığı, tüm kadınların özgürce kendi yaşamlarını tayin edebildiği adil bir dünya.
              </p>
            </div>
            
            {/* Misyon */}
            <div className="bg-white dark:bg-[#201C29] p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-bl-full transition-transform duration-700 group-hover:scale-150" />
              <Heart className="w-12 h-12 text-[#D4AF37] mb-6" />
              <h3 className="text-2xl font-bold text-[#3D154B] dark:text-white mb-4">Misyonumuz</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Kadınların her türlü hak ihlaline karşı mücadele etmek, onlara hukuki, psikolojik ve sosyal destek sunmak, farkındalık yaratan eğitimler ve projelerle dayanışma ağlarını güçlendirmek.
              </p>
            </div>
          </div>
        </div>

        {/* Çalışma Alanları Listesi */}
        <div className="mb-24 animate-cinematic-reveal" style={{ animationDelay: '400ms' }}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-black text-[#3D154B] dark:text-white mb-4">Çalışma Alanlarımız</h2>
            <p className="text-gray-600 dark:text-gray-400">Rosa Kadın Derneği olarak faaliyet yürüttüğümüz temel konular.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#1A1622] p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 group">
              <Shield className="w-10 h-10 text-[#6A4C93] mb-6 group-hover:-translate-y-2 transition-transform duration-500" />
              <h4 className="text-xl font-bold text-[#3D154B] dark:text-white mb-3">Hukuki Destek & Savunuculuk</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Şiddete maruz kalan kadınlara hukuki danışmanlık sağlar ve hak temelli dava takiplerini yürütürüz.</p>
            </div>
            
            <div className="bg-white dark:bg-[#1A1622] p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 group">
              <Activity className="w-10 h-10 text-[#D4AF37] mb-6 group-hover:-translate-y-2 transition-transform duration-500" />
              <h4 className="text-xl font-bold text-[#3D154B] dark:text-white mb-3">Psikolojik ve Sosyal Destek</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Travma sonrası süreçlerde kadınların güçlenmesi için uzmanlar eşliğinde destek mekanizmaları kurarız.</p>
            </div>
            
            <div className="bg-white dark:bg-[#1A1622] p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 group">
              <BookOpen className="w-10 h-10 text-[#6A4C93] mb-6 group-hover:-translate-y-2 transition-transform duration-500" />
              <h4 className="text-xl font-bold text-[#3D154B] dark:text-white mb-3">Eğitim & Farkındalık</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplumsal cinsiyet eşitliği, 6284 Sayılı Kanun ve uluslararası sözleşmeler hakkında atölye ve seminerler düzenleriz.</p>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 animate-cinematic-reveal" style={{ animationDelay: '600ms' }}>
          {[
            { label: pageData.stats.stat1Label, value: pageData.stats.stat1Val },
            { label: pageData.stats.stat2Label, value: pageData.stats.stat2Val },
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#6A4C93] dark:bg-[#201C29] border border-white/10 dark:border-[#3D154B]/50 rounded-3xl p-8 flex flex-col items-center justify-center shadow-lg group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-colors duration-700" />
              <h3 className="text-4xl md:text-5xl font-black text-[#D4AF37] mb-2">{stat.value}</h3>
              <p className="text-sm md:text-base font-bold text-white uppercase tracking-widest text-center">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
