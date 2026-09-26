'use client';
import { toast } from 'react-hot-toast';

import React, { useState } from 'react';





import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';
import { NAV_TRANSLATIONS } from '@/constants/cms-database';

export default function BankaHesaplarimizPage(): React.JSX.Element {
  const { lang, setLang } = useLanguage();
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);
  const [hesaplar, setHesaplar] = useState<any[]>([]);

  const { pageData, loading } = useCMS();

  React.useEffect(() => {
    fetch('/api/strapi/banka-hesabis')
      .then(res => {
        if (!res.ok) throw new Error('API yanıt vermedi');
        return res.json();
      })
      .then(data => {
        if (data && data.data) {
          // Sadece aktif olanları göster
          setHesaplar(data.data.filter((h: any) => h.isActive !== false));
        }
      })
      .catch(err => console.warn('Banka hesapları çekilemedi:', err.message));
  }, []);

  if (!pageData) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-12 h-12 border-4 border-[#6A4C93] border-t-transparent rounded-full"></div></div>;
  }
  const nt = NAV_TRANSLATIONS[lang] || NAV_TRANSLATIONS['TR'];

  return (
    <>
      
      

      <div className="pt-32 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-cinematic-reveal">
            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#18151A] dark:text-white mb-6">
              {nt.subBankaHesaplari}
            </h1>
            <p className="text-lg text-[#5A5260] dark:text-[#B2AAC0] max-w-2xl mx-auto">
              Derneğimize yapacağınız bağışlar ve aidatlar için aşağıdaki resmi hesap numaralarımızı kullanabilirsiniz.
            </p>
          </div>

          {hesaplar.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-cinematic-reveal" style={{ animationDelay: '200ms' }}>
              {hesaplar.map((hesap) => (
                <div key={hesap.documentId} className="bg-white/60 dark:bg-[#1A1622]/60 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-[#6A4C93]/5 hover:shadow-2xl transition-all group">
                  <div className="w-12 h-12 bg-gradient-to-tr from-[#D4AF37] to-[#FF6B6B] rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    {hesap.bankName?.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold text-[#3D154B] dark:text-white mb-1">{hesap.bankName}</h3>
                  <p className="text-sm font-medium text-[#6A4C93] dark:text-[#D4AF37] mb-4">{hesap.accountHolder}</p>
                  
                  <div className="bg-gray-50 dark:bg-black/30 rounded-lg p-3 border border-gray-100 dark:border-white/5 relative group/iban cursor-pointer" onClick={() => { navigator.clipboard.writeText(hesap.iban); toast.success('IBAN Kopyalandı!'); }}>
                    <p className="text-xs text-gray-500 mb-1">IBAN (Kopyalamak için tıklayın)</p>
                    <p className="font-mono text-sm sm:text-base text-[#18151A] dark:text-gray-300 font-semibold break-all">
                      {hesap.iban}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/40 dark:bg-white/5 rounded-3xl border border-[#6A4C93]/10 dark:border-white/5 backdrop-blur-xl">
              <p className="text-xl font-medium text-[#3D154B]/60 dark:text-white/60">Sistemde kayıtlı banka hesabı bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>

      
      
      
      
    </>
  );
}
