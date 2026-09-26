"use client";
import React, { useState } from 'react';
import { User, Save, Lock, Mail, Camera, Shield, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProfilPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Static dummy data for now
  const [name, setName] = useState("Admin Yönetici");
  const [email, setEmail] = useState("admin@rosakadindernegi.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSave = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setIsSubmitting(false);
      toast.success("Profil bilgileri başarıyla güncellendi.");
      setTimeout(() => setSuccess(false), 3000);
      setCurrentPassword("");
      setNewPassword("");
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-[#6A4C93]/5">
        <div>
          <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white flex items-center gap-3">
            <User className="text-[#D4AF37]" />
            Profil Ayarları
          </h1>
          <p className="text-[#6A4C93] dark:text-gray-400 mt-1">Kişisel bilgilerinizi ve hesap güvenliğinizi yönetin.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-gradient-to-tr from-[#3D154B] to-[#6A4C93] text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-70 disabled:scale-100"
        >
          {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : (success ? <CheckCircle2 size={20} className="text-emerald-400" /> : <Save size={20} />)}
          {isSubmitting ? 'Kaydediliyor...' : (success ? 'Kaydedildi' : 'Değişiklikleri Kaydet')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sol Sütun - Avatar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-[#6A4C93]/5 flex flex-col items-center justify-center text-center">
            <div className="relative group cursor-pointer mb-6">
              <div className="h-32 w-32 rounded-3xl bg-gradient-to-tr from-[#6A4C93] to-[#D4AF37] flex items-center justify-center text-white font-bold text-5xl shadow-2xl shadow-[#6A4C93]/20 border-4 border-white dark:border-[#2A2436]">
                A
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <Camera className="text-white" size={32} />
              </div>
            </div>
            <h2 className="text-xl font-bold text-[#3D154B] dark:text-white">{name}</h2>
            <p className="text-sm text-[#6A4C93] dark:text-[#D4AF37] font-medium mt-1">Sistem Yöneticisi</p>
          </div>


        </div>

        {/* Sağ Sütun - Formlar */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Kişisel Bilgiler */}
          <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-[#6A4C93]/5">
            <h3 className="font-bold text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
              <User size={18} className="text-[#6A4C93]" /> Kişisel Bilgiler
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#6A4C93] dark:text-gray-400 mb-2">Ad Soyad</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-[#6A4C93]/50" />
                  </div>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl pl-11 pr-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#6A4C93] dark:text-gray-400 mb-2">E-Posta Adresi</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-[#6A4C93]/50" />
                  </div>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl pl-11 pr-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* Şifre Değiştirme */}
          <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-[#6A4C93]/5">
            <h3 className="font-bold text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
              <Lock size={18} className="text-[#D4AF37]" /> Şifre Değiştirme
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#6A4C93] dark:text-gray-400 mb-2">Mevcut Şifre</label>
                <input type="password" placeholder="••••••••" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all placeholder:text-[#6A4C93]/30" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#6A4C93] dark:text-gray-400 mb-2">Yeni Şifre</label>
                <input type="password" placeholder="••••••••" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all placeholder:text-[#6A4C93]/30" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
