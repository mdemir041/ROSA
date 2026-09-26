"use client";
import { toast } from 'react-hot-toast';

import React, { useEffect, useState } from "react";
import { Save, Loader2, Navigation, Layers, Grid, Zap, MessageSquare } from "lucide-react";
import { NAV_TRANSLATIONS } from "@/constants/cms-database";
import LanguageSelector from '@/components/admin/LanguageSelector';

const FIELD_LABELS: Record<string, string> = {
  kurumsal: "Kurumsal",
  dayanisma: "Dayanışma",
  galeri: "Galeri",
  haberler: "Haberler",
  raporlar: "Raporlar",
  iletisim: "İletişim",
  bagis: "Bağış Yap Butonu",
  destek: "Destek Al Butonu",
  subHakkimizda: "Hakkımızda",
  subEkibimiz: "Ekibimiz",
  subSss: "Sıkça Sorulan Sorular",
  subBankaHesaplari: "Banka Hesaplarımız",
  icerikler: "İçerikler (Label)",
  bilgilendirme: "Bilgilendirme (Label)"
};

export default function MenulerPage() {
  const [lang, setLang] = useState("TR");
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [documentId, setDocumentId] = useState("");
  
  const [formData, setFormData] = useState<any>(NAV_TRANSLATIONS["TR"]);

  useEffect(() => {
    const fetchData = async () => {
      setInitLoading(true);
      try {
        const res = await fetch(`/api/strapi/nav-translations?filters[lang][$eq]=${lang}`);
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setFormData(data.data[0].data);
          setDocumentId(data.data[0].documentId);
        } else {
          setFormData(NAV_TRANSLATIONS[lang as keyof typeof NAV_TRANSLATIONS] || NAV_TRANSLATIONS["TR"]);
          setDocumentId("");
        }
      } catch (err) {
        console.error(err);
      }
      setInitLoading(false);
    };
    fetchData();
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (documentId) {
        await fetch(`/api/strapi/nav-translations/${documentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: { lang, data: formData } })
        });
        toast.success("Başarıyla güncellendi");
      } else {
        const res = await fetch(`/api/strapi/nav-translations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: { lang, data: formData } })
        });
        if(res.ok) {
          const resData = await res.json();
          setDocumentId(resData.data.documentId);
          toast.success("Başarıyla kaydedildi");
        } else {
          toast.error("Hata oluştu");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Sunucu hatası");
    } finally {
      setLoading(false);
    }
  };

  // Kategorilere göre alanları bölüyoruz
  const mainKeys = ['kurumsal', 'dayanisma', 'galeri', 'haberler', 'raporlar', 'iletisim'];
  const subKeys = ['subHakkimizda', 'subEkibimiz', 'subSss', 'subBankaHesaplari'];
  const buttonKeys = ['bagis', 'destek'];
  
  const allKnownKeys = [...mainKeys, ...subKeys, ...buttonKeys];
  const otherKeys = Object.keys(formData).filter(key => !allKnownKeys.includes(key));

  const renderInput = (key: string) => (
    <div key={key} className="group flex flex-col">
      <label htmlFor={`input-${key}`} className="cursor-pointer block text-xs font-bold uppercase tracking-wider text-[#6A4C93] dark:text-gray-400 mb-2 ml-1">
        {FIELD_LABELS[key] || key}
      </label>
      <input
        id={`input-${key}`}
        type="text"
        value={formData[key] || ""}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        className="w-full bg-white dark:bg-[#120F16] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all shadow-sm group-hover:border-[#6A4C93]/40 dark:group-hover:border-white/30"
        placeholder={`${FIELD_LABELS[key] || key} girin...`}
      />
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-[#6A4C93]/5">
        <div>
          <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white flex items-center gap-3">
            <Navigation className="text-[#D4AF37]" /> Menü Yönetimi
          </h1>
          <p className="text-[#6A4C93] dark:text-gray-400 mt-1 font-medium">Platformun üst menüsündeki ve alt başlıklardaki navigasyon terimlerini çok dilli olarak yönetin.</p>
        </div>
      </div>

      <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-3xl p-8 lg:p-10 shadow-xl shadow-[#6A4C93]/5 relative">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#6A4C93]/10 dark:border-white/10 relative z-50">
          <div className="flex items-center gap-4 bg-white/50 dark:bg-black/20 p-2 pl-4 rounded-2xl border border-[#6A4C93]/10 dark:border-white/5">
            <label className="font-bold text-[#3D154B] dark:text-white">Dil Seçimi:</label>
            <LanguageSelector value={lang} onChange={setLang} />
          </div>
          {/* Sadece görsellik için */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#6A4C93] dark:text-[#D4AF37] uppercase tracking-wider bg-[#6A4C93]/5 dark:bg-[#D4AF37]/10 px-4 py-2 rounded-xl">
            Aktif Dil: {lang}
          </div>
        </div>

        {initLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-[#6A4C93]">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#D4AF37]" />
            <p className="font-medium">Menü verileri yükleniyor...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
            
            {/* Ana Menü */}
            <section>
              <h3 className="text-lg font-black text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
                <Grid className="text-blue-500" /> Ana Navigasyon (Header)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white/30 dark:bg-black/10 p-6 rounded-2xl border border-white/40 dark:border-white/5">
                {mainKeys.map(key => renderInput(key))}
              </div>
            </section>

            {/* Alt Menüler */}
            <section>
              <h3 className="text-lg font-black text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
                <Layers className="text-purple-500" /> Açılır Menü Başlıkları (Dropdowns)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white/30 dark:bg-black/10 p-6 rounded-2xl border border-white/40 dark:border-white/5">
                {subKeys.map(key => renderInput(key))}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Aksiyon Butonları */}
              <section>
                <h3 className="text-lg font-black text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
                  <Zap className="text-amber-500" /> Aksiyon Butonları (Call to Action)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-500/5 dark:bg-amber-500/5 p-6 rounded-2xl border border-amber-500/20">
                  {buttonKeys.map(key => renderInput(key))}
                </div>
              </section>

              {/* Diğer Metinler */}
              {otherKeys.length > 0 && (
                <section>
                  <h3 className="text-lg font-black text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="text-emerald-500" /> Genel Arayüz Metinleri
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-emerald-500/5 dark:bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/20">
                    {otherKeys.map(key => renderInput(key))}
                  </div>
                </section>
              )}
            </div>
            
            {/* Alt Kontrol Çubuğu */}
            <div className="flex items-center justify-between pt-8 border-t border-[#6A4C93]/10 dark:border-white/10 mt-12">
              <p className="text-sm text-[#6A4C93] dark:text-gray-400">
                Lütfen kaydedilen kelimelerin sayfa tasarımlarına uygun uzunlukta olmasına dikkat edin.
              </p>
              <button 
                type="submit" 
                disabled={loading} 
                className="flex items-center gap-3 bg-gradient-to-r from-[#3D154B] to-[#6A4C93] text-white px-10 py-4 rounded-xl font-bold shadow-[0_10px_20px_-10px_rgba(106,76,147,0.5)] hover:shadow-[0_10px_30px_-5px_rgba(106,76,147,0.7)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                {loading ? 'Sisteme Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
