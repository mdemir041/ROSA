"use client";
import { toast } from 'react-hot-toast';

import React, { useEffect, useState } from "react";
import { Save, Loader2, Navigation, Layers, Grid, Zap, MessageSquare } from "lucide-react";
import { NAV_TRANSLATIONS } from "@/constants/cms-database";
import LanguageSelector from '@/components/admin/LanguageSelector';

const FIELD_LABELS: Record<string, string> = {
  kurumsal: "Kurumsal Menü",
  dayanisma: "Dayanışma Menü",
  galeri: "Galeri Menü",
  haberler: "Haberler Menü",
  raporlar: "Raporlar Menü",
  iletisim: "İletişim Menü",
  destek: "Destek Al Butonu",
  subHakkimizda: "Hakkımızda",
  subEkibimiz: "Ekibimiz",
  subSss: "Sıkça Sorulan Sorular",
  subBankaHesaplari: "Banka Hesaplarımız",
  icerikler: "İçerikler (Açılır Menü Başlığı)",
  bilgilendirme: "Bilgilendirme (Açılır Menü Başlığı)",
  icerik_tarih: "Kadın Mücadelesinin Tarihi (İçerikler)",
  icerik_anma: "Katledilen Kadınlar Anısına (İçerikler)",
  icerik_oncu: "Öncü Kadınların Öyküleri (İçerikler)",
  icerik_yerel: "Yerel Kadın Direnişleri (İçerikler)",
  bilgi_nafaka: "Nafaka Hakkı (Bilgilendirme)",
  bilgi_istanbul: "İstanbul Sözleşmesi (Bilgilendirme)",
  bilgi_yoksulluk: "Kadın Yoksulluğu (Bilgilendirme)",
  bilgi_6284: "6284 Sayılı Kanun (Bilgilendirme)",
  bilgi_haklar: "Haklarınız (Bilgilendirme)"
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
          const fallbackData = NAV_TRANSLATIONS[lang as keyof typeof NAV_TRANSLATIONS] || NAV_TRANSLATIONS["TR"];
          setFormData({ ...fallbackData, ...data.data[0].data });
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
  const buttonKeys = ['destek'];
  
  const icerikKeys = ['icerik_tarih', 'icerik_anma', 'icerik_oncu', 'icerik_yerel'];
  const bilgiKeys = ['bilgi_nafaka', 'bilgi_istanbul', 'bilgi_yoksulluk', 'bilgi_6284', 'bilgi_haklar'];
  
  const allKnownKeys = [...mainKeys, ...subKeys, ...buttonKeys, ...icerikKeys, ...bilgiKeys];
  const otherKeys = Object.keys(formData).filter(key => !allKnownKeys.includes(key) && key !== 'bagis');

  const renderInput = (key: string) => (
    <div key={key} className="group flex flex-col relative">
      <label htmlFor={`input-${key}`} className="cursor-pointer block text-[11px] font-black uppercase tracking-[0.15em] text-[#6A4C93] dark:text-[#D4AF37] mb-2.5 ml-1 drop-shadow-sm transition-colors group-hover:text-[#3D154B] dark:group-hover:text-white">
        {FIELD_LABELS[key] || key}
      </label>
      <input
        id={`input-${key}`}
        type="text"
        value={formData[key] || ""}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        className="w-full bg-white dark:bg-[#120F16] border border-[#6A4C93]/15 dark:border-white/10 rounded-xl px-5 py-3.5 text-[#3D154B] dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all shadow-sm group-hover:border-[#6A4C93]/40 dark:group-hover:border-white/30 group-hover:shadow-md"
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6A4C93] to-[#3D154B] dark:from-[#D4AF37] dark:to-[#8B7322] flex items-center justify-center shadow-lg text-white dark:text-[#1A1520]">
               <Navigation size={20} />
            </div>
            Menü & Navigasyon Yönetimi
          </h1>
          <p className="text-[#6A4C93] dark:text-gray-400 mt-2 font-medium text-sm">Platformun üst menüsündeki ve alt başlıklardaki tüm navigasyon terimlerini çok dilli olarak, anlık güncelleyebilirsiniz.</p>
        </div>
      </div>

      <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl shadow-[#6A4C93]/5 relative overflow-hidden">
        
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6A4C93]/5 dark:bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none -z-10 translate-x-1/2 -translate-y-1/2" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#6A4C93]/10 dark:border-white/10 relative z-10">
          <div className="flex items-center gap-4 bg-white/80 dark:bg-black/30 p-2 pl-5 rounded-2xl border border-[#6A4C93]/20 dark:border-white/10 shadow-inner">
            <label className="font-black text-[#3D154B] dark:text-[#D4AF37] text-sm uppercase tracking-wider">Dil Seçimi:</label>
            <LanguageSelector value={lang} onChange={setLang} />
          </div>
          {/* Sadece görsellik için */}
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-[#6A4C93] dark:text-[#D4AF37] uppercase tracking-[0.2em] bg-[#6A4C93]/10 dark:bg-[#D4AF37]/10 px-4 py-2.5 rounded-xl border border-[#6A4C93]/20 dark:border-[#D4AF37]/20 shadow-sm">
            Aktif Dil: {lang}
          </div>
        </div>

        {initLoading ? (
          <div className="py-32 flex flex-col items-center justify-center text-[#6A4C93]">
            <Loader2 className="w-12 h-12 animate-spin mb-6 text-[#6A4C93] dark:text-[#D4AF37] drop-shadow-md" />
            <p className="font-bold text-lg tracking-wide dark:text-gray-300">Menü verileri yükleniyor...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
            
            {/* Ana Menü */}
            <section>
              <h3 className="text-lg font-black text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
                <Grid className="text-blue-500" /> Ana Navigasyon (Header)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-blue-500/5 dark:bg-blue-500/10 p-6 sm:p-8 rounded-[2rem] border border-blue-500/20 shadow-inner">
                {mainKeys.map(key => renderInput(key))}
              </div>
            </section>

            {/* Alt Menüler */}
            <section>
              <h3 className="text-lg font-black text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
                <Layers className="text-purple-500" /> Kurumsal Alt Menüleri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-purple-500/5 dark:bg-purple-500/10 p-6 sm:p-8 rounded-[2rem] border border-purple-500/20 shadow-inner">
                {subKeys.map(key => renderInput(key))}
              </div>
            </section>

            {/* İçerikler ve Bilgilendirme Alt Menüleri */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <section>
                <h3 className="text-lg font-black text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
                  <Layers className="text-pink-500" /> İçerikler Alt Menüleri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-pink-500/5 dark:bg-pink-500/10 p-6 sm:p-8 rounded-[2rem] border border-pink-500/20 shadow-inner">
                  {icerikKeys.map(key => renderInput(key))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-black text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
                  <Layers className="text-cyan-500" /> Bilgilendirme Alt Menüleri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-cyan-500/5 dark:bg-cyan-500/10 p-6 sm:p-8 rounded-[2rem] border border-cyan-500/20 shadow-inner">
                  {bilgiKeys.map(key => renderInput(key))}
                </div>
              </section>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Aksiyon Butonları */}
              <section>
                <h3 className="text-lg font-black text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
                  <Zap className="text-amber-500" /> Aksiyon Butonları (Call to Action)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-500/5 dark:bg-amber-500/10 p-6 sm:p-8 rounded-[2rem] border border-amber-500/20 shadow-inner">
                  {buttonKeys.map(key => renderInput(key))}
                </div>
              </section>

              {/* Diğer Metinler */}
              {otherKeys.length > 0 && (
                <section>
                  <h3 className="text-lg font-black text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="text-emerald-500" /> Genel Arayüz Metinleri
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-emerald-500/5 dark:bg-emerald-500/10 p-6 sm:p-8 rounded-[2rem] border border-emerald-500/20 shadow-inner">
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
