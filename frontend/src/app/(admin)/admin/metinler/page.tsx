"use client";
import React, { useEffect, useState } from 'react';
import { Languages, Save, Loader2, CheckCircle2, Type, Contact, LayoutPanelLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import LanguageSelector from '@/components/admin/LanguageSelector';
import { CMS_DATABASE } from '@/constants/cms-database';

const FIELD_LABELS: Record<string, string> = {
  // Sections
  workAreasTitle: 'Çalışma Alanları Başlığı',
  workAreasSub: 'Çalışma Alanları Alt Başlığı',
  galleryTitle: 'Galeri Başlığı',
  gallerySub: 'Galeri Alt Başlığı',
  mediaTitle: 'Medya & Raporlar Başlığı',
  mediaSub: 'Medya & Raporlar Alt Başlığı',
  aboutTitle: 'Hakkımızda Başlığı',
  aboutSub: 'Hakkımızda Alt Başlığı',
  aboutDesc: 'Hakkımızda Açıklaması',

  // Stats
  stat1Val: '1. İstatistik Değeri',
  stat1Label: '1. İstatistik Etiketi',
  stat2Val: '2. İstatistik Değeri',
  stat2Label: '2. İstatistik Etiketi',

  // Contact
  title: 'İletişim Başlığı',
  desc: 'İletişim Açıklaması',
  phoneTitle: 'Telefon Başlığı',
  phone: 'Telefon Numarası',
  emailTitle: 'E-Posta Başlığı',
  email: 'E-Posta Adresi',
  addressTitle: 'Adres Başlığı',
  address: 'Açık Adres',

  // UI Strings (Buttons & Tabs)
  btnSupport: 'Destek Butonu Metni (Acil Destek vb.)',
  btnExplore: 'İncele Butonu Metni',
  btnReadReport: 'Rapor Oku Butonu',
  tabNews: 'Haberler Sekmesi',
  tabAnnouncements: 'Duyurular Sekmesi',
  tabQuestions: 'Sorular Sekmesi',
  btnAllNews: 'Tüm Haberler Butonu',
  btnAllAnnouncements: 'Tüm Duyurular Butonu',
  
  // UI Strings (Cards & Modals)
  cardTitle: 'Destek Kartı Başlığı',
  cardDesc: 'Destek Kartı Açıklaması',
  cardActive: 'Destek Kartı Durumu',
  cardSub: 'Destek Kartı Alt Başlığı',
  btnDetails: 'Detaylar Butonu',
  btnClose: 'Kapat Butonu',
  
  // UI Strings (Contact Form)
  formTitle: 'İletişim Formu Başlığı',
  labelName: 'Form: İsim Etiketi',
  labelChan: 'Form: İletişim Kanalı Etiketi',
  labelMsg: 'Form: Mesaj Etiketi',
  pl1: 'Form: İsim Placeholder',
  pl2: 'Form: İletişim Kanalı Placeholder',
  pl3: 'Form: Mesaj Placeholder',
  btnSend: 'Gönder Butonu',
  btnNewMsg: 'Yeni Mesaj Butonu',
  formError: 'Form Hata Mesajı',
  formSending: 'Form Gönderiliyor Mesajı',
  formSuccessTitle: 'Form Başarılı Başlığı',
  formSuccessDesc: 'Form Başarılı Açıklaması',

  // UI Strings (Footer & Misc)
  socialMedia: 'Sosyal Medya Başlığı',
  footer: 'Footer Telif Metni',
  footerQuickMenu: 'Footer Hızlı Menü',
  footerHome: 'Footer Ana Sayfa',
  footerAbout: 'Footer Hakkımızda',
  footerWork: 'Footer Neler Yapıyoruz',
  footerContact: 'Footer İletişim',
  footerFaq: 'Footer SSS',
  footerContracts: 'Footer Sözleşmeler Başlığı',
  footerKVKK: 'Footer KVKK Metni',
  footerTerms: 'Footer Kullanım Şartları',
  footerPrivacy: 'Footer Gizlilik',
  footerCookies: 'Footer Çerez Politikası',
  footerBank: 'Footer Banka Hesapları',
  
  // UI Strings (Donation & Bank)
  bankName: 'Banka Adı',
  accountHolderLabel: 'Hesap Sahibi Etiketi',
  accountHolderName: 'Hesap Sahibi Adı',
  donateModalTitle: 'Bağış Modal Başlığı',
  donateModalSub: 'Bağış Modal Alt Başlığı',
  donateModalDesc: 'Bağış Modal Açıklaması',
  donateModalAccountType: 'Hesap Türü Etiketi',
  donateModalIbanLabel: 'IBAN Etiketi',
  donateModalCopy: 'Kopyala Butonu',
  donateModalCopied: 'Kopyalandı Mesajı',
  donateModalSecurityInfo: 'Bağış Güvenlik Metni',
  
  // UI Strings (Accessibility)
  ariaThemeToggle: 'Tema Değiştir (Aria)',
  ariaMenuToggle: 'Menü Aç/Kapat (Aria)',
  ariaPrevSlide: 'Önceki Slayt (Aria)',
  ariaNextSlide: 'Sonraki Slayt (Aria)',
  ariaScrollTop: 'Başa Dön (Aria)',
  callUs: 'Bizi Arayın Metni',
  
  // Events & Reports List
  eventsTitle: 'Etkinlikler Sayfa Başlığı',
  eventsOnDate: 'Etkinlik Tarih Ön Eki',
  latestEvents: 'Son Etkinlikler Başlığı',
  seeAllEvents: 'Tüm Etkinlikleri Gör',
  noEventsFound: 'Etkinlik Bulunamadı Mesajı',
  showAllEvents: 'Tümünü Göster',
  reportsTitle: 'Raporlar Sayfa Başlığı',
  seeAllReports: 'Tüm Raporları Gör',
  viewReport: 'Raporu İncele',
  noReportsFound: 'Rapor Bulunamadı Mesajı',
};

export default function MetinlerPage() {
  const [lang, setLang] = useState('TR');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  
  const [documentId, setDocumentId] = useState("");
  const [formData, setFormData] = useState<any>({
    sections: {},
    stats: {},
    contact: {},
    ui: {}
  });

  useEffect(() => {
    setInitLoading(true);
    fetch(`/api/strapi/site-settings?filters[lang][$eq]=${lang}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          const item = data.data[0];
          setDocumentId(item.documentId);
          setFormData({
            sections: item.data?.sections || {},
            stats: item.data?.stats || {},
            contact: item.data?.contact || {},
            ui: item.data?.ui || {}
          });
        } else {
          // Fallback to static CMS_DATABASE
          const fallbackData = CMS_DATABASE[lang as keyof typeof CMS_DATABASE] || CMS_DATABASE['TR'];
          setDocumentId("");
          setFormData({
            sections: fallbackData.sections || {},
            stats: fallbackData.stats || {},
            contact: fallbackData.contact || {},
            ui: fallbackData.ui || {}
          });
        }
        setInitLoading(false);
      })
      .catch(err => {
        console.error(err);
        setInitLoading(false);
      });
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (documentId) {
        const res = await fetch(`/api/strapi/site-settings/${documentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: { lang, data: formData } })
        });
        
        if (res.ok) {
          setSuccess(true);
          toast.success("Metinler güncellendi");
          setTimeout(() => setSuccess(false), 3000);
        } else {
          toast.error("Kaydedilemedi");
        }
      } else {
        const res = await fetch(`/api/strapi/site-settings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: { lang, data: formData } })
        });
        
        if (res.ok) {
          const resData = await res.json();
          setDocumentId(resData.data.documentId);
          setSuccess(true);
          toast.success("Metinler başarıyla oluşturuldu");
          setTimeout(() => setSuccess(false), 3000);
        } else {
          toast.error("Kaydedilemedi");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Sunucu hatası");
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (category: string, key: string, val: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: val
      }
    }));
  };

  const renderInput = (category: string, key: string, isTextarea: boolean = false, colSpan: boolean = false) => (
    <div key={key} className={`group flex flex-col ${colSpan ? 'md:col-span-2 lg:col-span-3' : ''}`}>
      <label htmlFor={`input-${category}-${key}`} className="cursor-pointer block text-xs font-bold uppercase tracking-wider text-[#6A4C93] dark:text-gray-400 mb-2 ml-1">
        {FIELD_LABELS[key] || key}
      </label>
      {isTextarea ? (
        <textarea 
          id={`input-${category}-${key}`}
          rows={4} 
          className="w-full bg-white dark:bg-[#120F16] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all shadow-sm group-hover:border-[#6A4C93]/40 dark:group-hover:border-white/30 resize-y" 
          value={formData[category][key] || ""} 
          onChange={(e) => handleChange(category, key, e.target.value)} 
          placeholder={`${FIELD_LABELS[key] || key} girin...`}
        />
      ) : (
        <input 
          id={`input-${category}-${key}`}
          type="text" 
          className="w-full bg-white dark:bg-[#120F16] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all shadow-sm group-hover:border-[#6A4C93]/40 dark:group-hover:border-white/30" 
          value={formData[category][key] || ""} 
          onChange={(e) => handleChange(category, key, e.target.value)} 
          placeholder={`${FIELD_LABELS[key] || key} girin...`}
        />
      )}
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-[#6A4C93]/5">
        <div>
          <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white flex items-center gap-3">
            <Languages className="text-[#D4AF37]" />
            Site Metinleri & Çeviri Yönetimi
          </h1>
          <p className="text-[#6A4C93] dark:text-gray-400 mt-1 font-medium">Sitedeki sabit yazıların, başlıkların ve çevirilerin profesyonel yönetimi.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-3xl p-8 lg:p-10 space-y-12 shadow-xl shadow-[#6A4C93]/5 relative">
        
        {/* Dil Seçimi */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#6A4C93]/10 dark:border-white/10 relative z-50">
          <div className="flex items-center gap-4 bg-white/50 dark:bg-black/20 p-2 pl-4 rounded-2xl border border-[#6A4C93]/10 dark:border-white/5">
            <label className="font-bold text-[#3D154B] dark:text-white">Çeviri Dili:</label>
            <LanguageSelector value={lang} onChange={setLang} />
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#6A4C93] dark:text-[#D4AF37] uppercase tracking-wider bg-[#6A4C93]/5 dark:bg-[#D4AF37]/10 px-4 py-2 rounded-xl">
            Aktif Dil: {lang}
          </div>
        </div>

        <div className="relative z-10 space-y-12">
          
          {/* Sections */}
          {formData?.sections && Object.keys(formData.sections).length > 0 && (
            <section>
              <h3 className="text-lg font-black text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
                <Type className="text-blue-500" /> Bölüm Başlıkları ve Hakkımızda
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white/30 dark:bg-black/10 p-6 rounded-2xl border border-white/40 dark:border-white/5">
                {Object.keys(formData.sections).map(key => 
                  renderInput('sections', key, key.includes('Desc'), key.includes('Desc'))
                )}
              </div>
            </section>
          )}

          {/* Contact */}
          {formData?.contact && Object.keys(formData.contact).length > 0 && (
            <section>
              <h3 className="text-lg font-black text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
                <Contact className="text-purple-500" /> İletişim Alanı Metinleri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-purple-500/5 dark:bg-purple-500/5 p-6 rounded-2xl border border-purple-500/10">
                {Object.keys(formData.contact).map(key => 
                  renderInput('contact', key, key === 'address', key === 'address' || key === 'desc')
                )}
              </div>
            </section>
          )}

          {/* UI Strings */}
          {formData?.ui && Object.keys(formData.ui).length > 0 && (
            <section>
              <h3 className="text-lg font-black text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
                <LayoutPanelLeft className="text-amber-500" /> Arayüz Çevirileri (Butonlar, Linkler)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-amber-500/5 dark:bg-amber-500/5 p-6 rounded-2xl border border-amber-500/10">
                {Object.keys(formData.ui).map(key => 
                  renderInput('ui', key)
                )}
              </div>
            </section>
          )}
        </div>

        {/* Alt Kontrol Çubuğu */}
        <div className="flex items-center justify-between pt-8 border-t border-[#6A4C93]/10 dark:border-white/10 mt-12 relative z-10">
          <p className="text-sm text-[#6A4C93] dark:text-gray-400">
            Tüm değişiklikler site geneline anında yansır.
          </p>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-3 bg-gradient-to-r from-[#3D154B] to-[#6A4C93] text-white px-10 py-4 rounded-xl font-bold shadow-[0_10px_20px_-10px_rgba(106,76,147,0.5)] hover:shadow-[0_10px_30px_-5px_rgba(106,76,147,0.7)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : (success ? <CheckCircle2 size={20} className="text-emerald-400" /> : <Save size={20} />)}
            {isSubmitting ? 'Kaydediliyor...' : (success ? 'Kaydedildi' : 'Değişiklikleri Kaydet')}
          </button>
        </div>

      </form>
    </div>
  );
}
