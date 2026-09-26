"use client";

import React from 'react';
import { Users, ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export default function KullanicilarPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex justify-between items-center bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-[#6A4C93]/5">
        <div>
          <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white flex items-center gap-3">
            <Users className="text-[#6A4C93]" />
            Kullanıcı Yönetimi
          </h1>
          <p className="text-[#6A4C93] dark:text-gray-400 mt-1">Sistem yöneticileri ve yetkilendirmeleri.</p>
        </div>
      </div>

      <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-12 lg:p-20 shadow-xl shadow-[#6A4C93]/5 flex flex-col items-center justify-center text-center relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6A4C93]/5 dark:bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-[#6A4C93]/20 dark:bg-[#D4AF37]/20 blur-xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
          <div className="w-24 h-24 bg-gradient-to-br from-[#3D154B] to-[#1A1622] rounded-2xl flex items-center justify-center shadow-2xl relative z-10 transform group-hover:scale-105 transition-transform duration-500">
            <ShieldCheck size={48} className="text-[#D4AF37]" />
          </div>
        </div>



        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337'}/admin/settings/users`}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#3D154B] hover:bg-[#6A4C93] text-white px-8 py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <Lock size={18} />
            Yöneticileri Yönet
          </a>
          <a 
            href={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337'}/admin`}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white dark:bg-[#1A1622] text-[#3D154B] dark:text-white px-8 py-3.5 rounded-xl font-medium shadow-md hover:shadow-lg border border-[#6A4C93]/10 dark:border-white/10 hover:border-[#6A4C93]/30 transition-all duration-300"
          >
            Strapi Paneline Git
            <ExternalLink size={18} className="text-[#D4AF37]" />
          </a>
        </div>

      </div>

    </div>
  );
}
