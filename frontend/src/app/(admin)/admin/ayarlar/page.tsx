"use client";
import { toast } from 'react-hot-toast';

import React, { useEffect, useState } from 'react';
import { Settings, Save, Globe, Paintbrush, Bell, Shield, Loader2, CheckCircle2, Sun, Moon, ToggleLeft, ToggleRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function AyarlarPage() {
  const { theme, setTheme } = useTheme();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [documentId, setDocumentId] = useState("");
  const [siteData, setSiteData] = useState<any>(null);

  const [seoTitle, setSeoTitle] = useState("Rosa Kadın Derneği");
  const [email, setEmail] = useState("info@rosakadindernegi.com");
  
  const [notifications, setNotifications] = useState({
    haber: true,
    hata: true,
    banka: false
  });

  useEffect(() => {
    // Load local notification preferences
    const savedNotifs = localStorage.getItem('rosa_notifications');
    if (savedNotifs) {
      setNotifications(JSON.parse(savedNotifs));
    }

    // Fetch site-settings from Strapi
    fetch('/api/strapi/site-settings?filters[lang][$eq]=TR', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          const item = data.data[0];
          setDocumentId(item.documentId);
          setSiteData(item.data);
          
          if (item.data?.contact) {
            setSeoTitle(item.data.contact.title || "Rosa Kadın Derneği");
            setEmail(item.data.contact.email || "info@rosakadindernegi.com");
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsSubmitting(true);
    
    // Save notifications to local storage
    localStorage.setItem('rosa_notifications', JSON.stringify(notifications));

    // Save site settings to Strapi
    if (documentId && siteData) {
      try {
        const updatedData = { ...siteData };
        if (!updatedData.contact) updatedData.contact = {};
        updatedData.contact.title = seoTitle;
        updatedData.contact.email = email;

        const res = await fetch(`/api/strapi/site-settings/${documentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: { data: updatedData } })
        });
        
        if (res.ok) {
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        } else {
          toast.error("Ayarlar kaydedilirken hata oluştu.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Sunucu hatası.");
      }
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    
    setIsSubmitting(false);
  };

  // Custom Toggle Component Helper
  const renderToggle = (checked: boolean, onChange: () => void, label: string) => (
    <div 
      onClick={onChange}
      className="flex items-center justify-between p-4 hover:bg-white/60 dark:hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-[#6A4C93]/10 dark:hover:border-white/10 cursor-pointer shadow-sm hover:shadow-md"
    >
      <span className="text-sm font-semibold text-[#3D154B] dark:text-[#E8C3F5]">{label}</span>
      <div className={`w-12 h-6 rounded-full transition-colors duration-300 relative flex items-center px-1 ${checked ? 'bg-gradient-to-r from-[#D4AF37] to-[#6A4C93]' : 'bg-gray-200 dark:bg-gray-700'}`}>
        <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      
      <div className="flex justify-between items-center bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-[#6A4C93]/5">
        <div>
          <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white flex items-center gap-3">
            <Settings className="text-[#D4AF37]" />
            Sistem Ayarları
          </h1>
          <p className="text-[#6A4C93] dark:text-gray-400 mt-1 font-medium">Platformun temel görünüm ve iletişim tercihlerini yönetin.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSubmitting || loading}
          className="flex items-center gap-2 bg-gradient-to-r from-[#3D154B] to-[#6A4C93] text-white px-8 py-3.5 rounded-xl font-bold shadow-[0_10px_20px_-10px_rgba(106,76,147,0.5)] hover:shadow-[0_10px_30px_-5px_rgba(106,76,147,0.7)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : (success ? <CheckCircle2 size={20} className="text-emerald-400" /> : <Save size={20} />)}
          {isSubmitting ? 'Kaydediliyor...' : (success ? 'Ayarları Kaydedildi' : 'Ayarları Kaydet')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sol Sütun - Ayar Kategorileri */}
        <div className="space-y-6">
          <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-[#6A4C93]/5">
            <h3 className="font-bold text-[#3D154B] dark:text-white mb-6 flex items-center gap-2 border-b border-[#6A4C93]/10 dark:border-white/10 pb-4">
              <Globe size={18} className="text-blue-500" /> Site Bilgileri
            </h3>
            {loading ? <div className="flex justify-center p-4"><Loader2 className="animate-spin text-[#6A4C93]" /></div> : (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-[#6A4C93] dark:text-gray-400 mb-2">Site Başlığı (SEO)</label>
                  <input type="text" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} className="w-full bg-white/80 dark:bg-[#120F16]/80 backdrop-blur-sm border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#6A4C93] dark:text-gray-400 mb-2">İletişim E-Postası</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/80 dark:bg-[#120F16]/80 backdrop-blur-sm border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all shadow-sm" />
                </div>
              </div>
            )}
          </div>

          <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-[#6A4C93]/5">
            <h3 className="font-bold text-[#3D154B] dark:text-white mb-6 flex items-center gap-2 border-b border-[#6A4C93]/10 dark:border-white/10 pb-4">
              <Paintbrush size={18} className="text-purple-500" /> Görünüm (Tema)
            </h3>
            <div className="space-y-4">
              <div className="flex gap-2 p-1.5 bg-gray-100/50 dark:bg-black/40 rounded-xl border border-[#6A4C93]/10 dark:border-white/5 shadow-inner">
                <button 
                  onClick={() => setTheme('light')} 
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${theme === 'light' ? 'bg-white dark:bg-[#2A2436] text-[#3D154B] dark:text-white shadow-md scale-[1.02]' : 'text-[#6A4C93]/70 dark:text-gray-400 hover:text-[#6A4C93] dark:hover:text-gray-200'}`}
                >
                  <Sun size={16} className={theme === 'light' ? 'text-[#D4AF37]' : ''} /> Açık
                </button>
                <button 
                  onClick={() => setTheme('dark')} 
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${theme === 'dark' ? 'bg-white dark:bg-[#2A2436] text-[#3D154B] dark:text-white shadow-md scale-[1.02]' : 'text-[#6A4C93]/70 dark:text-gray-400 hover:text-[#6A4C93] dark:hover:text-gray-200'}`}
                >
                  <Moon size={16} className={theme === 'dark' ? 'text-[#D4AF37]' : ''} /> Koyu
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Sütun */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-[#6A4C93]/5">
            <h3 className="font-bold text-[#3D154B] dark:text-white mb-6 flex items-center gap-2 border-b border-[#6A4C93]/10 dark:border-white/10 pb-4">
              <Bell size={18} className="text-amber-500" /> Bildirim Tercihleri
            </h3>
            <div className="space-y-3 bg-white/30 dark:bg-black/20 p-2 rounded-2xl border border-white/40 dark:border-white/5 shadow-inner">
              {renderToggle(notifications.haber, () => setNotifications(prev => ({...prev, haber: !prev.haber})), "Yeni Haber Eklendiğinde Beni Uyar")}
              {renderToggle(notifications.hata, () => setNotifications(prev => ({...prev, hata: !prev.hata})), "Sistem Hata Kayıtlarını Raporla")}
              {renderToggle(notifications.banka, () => setNotifications(prev => ({...prev, banka: !prev.banka})), "Banka Hesabı Değişikliklerinde Onay İste")}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
