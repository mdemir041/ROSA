"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, User } from 'lucide-react';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call for login
    setTimeout(() => {
      setIsLoading(false);
      // Set tokens
      localStorage.setItem('admin_auth', 'true');
      document.cookie = "admin_auth=true; path=/; max-age=86400; SameSite=Strict";
      router.push('/admin');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FAF8F5] dark:bg-[#0F0C12] relative overflow-hidden">
      
      {/* Background Aesthetic Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6A4C93]/20 dark:bg-[#6A4C93]/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-10000" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/20 dark:bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-10000" style={{ animationDelay: '1s' }} />

      <div className="w-full max-w-md p-8 relative z-10">
        
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 mb-6 bg-white dark:bg-[#1A1622] rounded-2xl shadow-xl shadow-[#6A4C93]/10 border border-[#6A4C93]/10 dark:border-white/5 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#6A4C93]/20 to-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Image src="/image_2.png" alt="Rosa Logo" width={56} height={56} className="rounded-xl relative z-10" />
          </div>
          <h1 className="text-3xl font-bold text-[#3D154B] dark:text-[#E0CFF2] text-center tracking-tight transition-all">
            {mode === 'login' ? 'Yönetim Paneli' : 'Yeni Yönetici Kaydı'}
          </h1>
          <p className="text-[#6A4C93] dark:text-[#D4AF37] mt-2 text-sm font-medium transition-all">
            {mode === 'login' ? 'Sisteme giriş yapmak için bilgilerinizi girin' : 'Sisteme dahil olmak için bilgilerinizi doldurun'}
          </p>
        </div>

        {/* Login/Register Form */}
        <div className="bg-white/60 dark:bg-[#1A1622]/60 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl shadow-[#6A4C93]/10 border border-[#6A4C93]/10 dark:border-white/5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {mode === 'register' && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] ml-1">Ad Soyad</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6A4C93]/60 dark:text-gray-400 group-focus-within:text-[#6A4C93] dark:group-focus-within:text-[#D4AF37] transition-colors">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-[#0F0C12] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl outline-none focus:border-[#6A4C93] dark:focus:border-[#D4AF37] focus:ring-4 focus:ring-[#6A4C93]/10 dark:focus:ring-[#D4AF37]/10 transition-all text-[#3D154B] dark:text-white placeholder:text-gray-400 font-medium"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] ml-1">E-Posta Adresi</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6A4C93]/60 dark:text-gray-400 group-focus-within:text-[#6A4C93] dark:group-focus-within:text-[#D4AF37] transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-[#0F0C12] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl outline-none focus:border-[#6A4C93] dark:focus:border-[#D4AF37] focus:ring-4 focus:ring-[#6A4C93]/10 dark:focus:ring-[#D4AF37]/10 transition-all text-[#3D154B] dark:text-white placeholder:text-gray-400 font-medium"
                  placeholder="admin@rosakadindernegi.org"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Şifre</label>
                {mode === 'login' && (
                  <a href="#" className="text-xs font-semibold text-[#6A4C93] dark:text-[#D4AF37] hover:underline">Şifremi Unuttum</a>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6A4C93]/60 dark:text-gray-400 group-focus-within:text-[#6A4C93] dark:group-focus-within:text-[#D4AF37] transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 bg-white dark:bg-[#0F0C12] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl outline-none focus:border-[#6A4C93] dark:focus:border-[#D4AF37] focus:ring-4 focus:ring-[#6A4C93]/10 dark:focus:ring-[#D4AF37]/10 transition-all text-[#3D154B] dark:text-white placeholder:text-gray-400 font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#6A4C93]/60 dark:text-gray-400 hover:text-[#3D154B] dark:hover:text-[#E0CFF2] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#3D154B] hover:bg-[#6A4C93] text-white rounded-xl font-bold shadow-lg shadow-[#6A4C93]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck size={20} />
                  {mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
                  <ArrowRight size={18} className="ml-1 opacity-70" />
                </>
              )}
            </button>
            
            <div className="text-center mt-6">
              <p className="text-sm text-[#3D154B] dark:text-[#E0CFF2] font-medium">
                {mode === 'login' ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
                <button 
                  type="button" 
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="ml-2 text-[#6A4C93] dark:text-[#D4AF37] hover:underline font-bold"
                >
                  {mode === 'login' ? 'Kayıt Ol' : 'Giriş Yap'}
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center justify-center animate-in fade-in duration-1000 delay-300">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#6A4C93]/70 dark:text-gray-400 font-bold mb-2">
            DESIGNED BY
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/80"></div>
            <p className="text-xs uppercase tracking-[0.25em] font-black bg-clip-text text-transparent bg-gradient-to-r from-[#3D154B] to-[#D4AF37] dark:from-[#D4AF37] dark:to-[#FFF8D6]">
              GONDWANA YAZILIM
            </p>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/80"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
