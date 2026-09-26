"use client";

import React, { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  ShieldCheck, 
  ExternalLink,
  Loader2,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';
import { contactSchema, ContactSchemaType } from '@/lib/security/contact-schema';
import { submitContactFormAction } from '@/app/actions/contact';

export default function IletisimPage() {
  const { lang } = useLanguage();
  const { pageData } = useCMS();
  const ui = pageData?.ui;
  const cmsContact = pageData?.contact;

  const [isPending, startTransition] = useTransition();
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSubjectDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const subjectOptions = [
    "Hukuki Destek Talebi",
    "Psikososyal Destek Talebi",
    "Şiddet / Acil Durum Bildirimi",
    "Gönüllülük / Dayanışma Ağı",
    "Basın / Medya İletişimi",
    "Diğer"
  ];

  const [contactInfo, setContactInfo] = useState({
    title: cmsContact?.title || "Rosa Kadın Derneği",
    desc: cmsContact?.desc || "Şiddete maruz kaldığınızda, hak ihlaline uğradığınızda ya da hukuki/psikolojik desteğe ihtiyaç duyduğunuzda merkezimize gelebilir veya resmi iletişim hatlarımızdan bize güvenle ulaşabilirsiniz.",
    phone: cmsContact?.phone || "0552 466 86 21",
    phoneTitle: cmsContact?.phoneTitle || "RESMİ BAŞVURU HATTI",
    email: cmsContact?.email || "rosakadindernegi@gmail.com",
    emailTitle: cmsContact?.emailTitle || "RESMİ E-POSTA ADRESİ",
  });

  const [socials, setSocials] = useState({
    facebook: 'https://www.facebook.com/rosakadin',
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com/rosakadindernegi',
    twitter: 'https://twitter.com/rosakadinderne1',
    pinterest: 'https://pinterest.com',
    telegram: 'https://telegram.org'
  });

  useEffect(() => {
    fetch('/api/strapi/iletisims')
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          const item = data.data[0];
          setContactInfo(prev => ({
            ...prev,
            title: item.title || prev.title,
            desc: item.desc || prev.desc,
            phone: item.phone || prev.phone,
            phoneTitle: item.phoneTitle || prev.phoneTitle,
            email: item.email || prev.email,
            emailTitle: item.emailTitle || prev.emailTitle,
          }));
          setSocials(prev => ({
            facebook: item.facebook || prev.facebook,
            youtube: item.youtube || prev.youtube,
            instagram: item.instagram || prev.instagram,
            twitter: item.twitter || prev.twitter,
            pinterest: item.pinterest || prev.pinterest,
            telegram: item.telegram || prev.telegram
          }));
        }
      })
      .catch(err => console.warn('İletişim bilgileri çekilemedi:', err));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      contact: '',
      subject: '',
      message: ''
    }
  });

  const selectedSubject = watch('subject');

  const onSubmit = (data: ContactSchemaType) => {
    const payload = new FormData();
    if (data.name) payload.append('name', data.name);
    payload.append('contact', data.contact);
    payload.append('subject', data.subject);
    payload.append('message', data.message);

    startTransition(async () => {
      try {
        const response = await submitContactFormAction(null, payload);
        if (response.success) {
          toast.success(response.message || 'Mesajınız güvenle iletildi.');
          setFormSuccess(true);
          reset();
        } else {
          toast.error(response.error || 'Mesaj iletilirken bir hata oluştu.');
        }
      } catch {
        toast.error('Sunucu bağlantı hatası oluştu.');
      }
    });
  };

  const rawPhone = contactInfo.phone.replace(/\s+/g, '');

  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Info & Contact Cards */}
          <div className="lg:col-span-6 space-y-8 animate-in fade-in slide-in-from-left-6 duration-700">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gradient-gold-purple dark:text-gradient-gold font-serif tracking-tight drop-shadow-sm mb-6 leading-[1.15]">
                {contactInfo.title}
              </h1>
              <p className="text-[#5A5260] dark:text-[#B2AAC0] text-base md:text-lg font-medium leading-relaxed max-w-xl">
                {contactInfo.desc}
              </p>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-[11px] font-black tracking-[0.25em] text-[#8C8295] dark:text-gray-400 uppercase mb-4">
                {ui?.socialMedia || "SOSYAL MEDYA HESAPLARIMIZ"}
              </h3>
              <div className="flex flex-wrap gap-3">
                {socials.facebook && (
                  <a
                    href={socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    title="Facebook"
                    className="w-11 h-11 rounded-full glass-panel flex items-center justify-center text-[#1877F2] shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z" />
                    </svg>
                  </a>
                )}
                {socials.youtube && (
                  <a
                    href={socials.youtube}
                    target="_blank"
                    rel="noreferrer"
                    title="YouTube"
                    className="w-11 h-11 rounded-full glass-panel flex items-center justify-center text-[#FF0000] shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                )}
                {socials.instagram && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    title="Instagram"
                    className="w-11 h-11 rounded-full glass-panel flex items-center justify-center text-[#E1306C] shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5 stroke-current fill-none stroke-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
                    </svg>
                  </a>
                )}
                {socials.twitter && (
                  <a
                    href={socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    title="Twitter / X"
                    className="w-11 h-11 rounded-full glass-panel flex items-center justify-center text-[#18151A] dark:text-white shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
                {socials.pinterest && (
                  <a
                    href={socials.pinterest}
                    target="_blank"
                    rel="noreferrer"
                    title="Pinterest"
                    className="w-11 h-11 rounded-full glass-panel flex items-center justify-center text-[#E60023] shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.182 0 7.433 2.981 7.433 6.963 0 4.156-2.63 7.502-6.282 7.502-1.222 0-2.367-.635-2.763-1.383l-.752 2.865c-.272 1.043-.999 2.348-1.491 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.633 0 12.017 0z" />
                    </svg>
                  </a>
                )}
                {socials.telegram && (
                  <a
                    href={socials.telegram}
                    target="_blank"
                    rel="noreferrer"
                    title="Telegram"
                    className="w-11 h-11 rounded-full glass-panel flex items-center justify-center text-[#0088cc] shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Official Contact Badges */}
            <div className="space-y-4 pt-2">
              <a
                href={`tel:${rawPhone}`}
                className="flex items-center justify-between p-5 rounded-2xl glass-panel hover:border-[#FF6B5B]/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFEFEA] dark:bg-[#FF6B5B]/15 flex items-center justify-center text-[#FF6B5B] group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5A5260] dark:text-[#B2AAC0] mb-1">
                      {contactInfo.phoneTitle}
                    </div>
                    <div className="text-xl font-black text-[#18151A] dark:text-white tracking-wide group-hover:text-[#FF6B5B] transition-colors">
                      {contactInfo.phone}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#FF6B5B] transition-colors" />
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center justify-between p-5 rounded-2xl glass-panel hover:border-[#10B981]/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF7EA] dark:bg-[#10B981]/15 flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5A5260] dark:text-[#B2AAC0] mb-1">
                      {contactInfo.emailTitle}
                    </div>
                    <div className="text-base md:text-lg font-black text-[#18151A] dark:text-white group-hover:text-[#10B981] transition-colors">
                      {contactInfo.email}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#10B981] transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column: Portal Card */}
          <div className="lg:col-span-6 relative z-10 animate-in fade-in slide-in-from-right-6 duration-700">
            <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
              
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="w-6 h-6 text-[#10B981]" />
                <h2 className="text-xl md:text-2xl font-black text-[#18151A] dark:text-white tracking-tight">
                  {ui?.formTitle || "Güvenli Başvuru ve İletişim Portalı"}
                </h2>
              </div>

              {formSuccess ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <CheckCircle2 className="w-16 h-16 text-[#10B981] mx-auto" />
                  <h3 className="text-2xl font-bold text-[#18151A] dark:text-white">
                    {ui?.formSuccessTitle || "Mesajınız İletildi"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300 text-sm max-w-md mx-auto">
                    {ui?.formSuccessDesc || "Başvurunuz mutlak gizlilik ilkelerimiz çerçevesinde güvenle kayıt altına alınmıştır."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSuccess(false)}
                    className="mt-6 bg-[#3D154B] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#2F0F3A] transition-colors"
                  >
                    {ui?.btnNewMsg || "Yeni Mesaj Gönder"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase mb-2">
                      {ui?.labelName || "RUMUZ VEYA İSİM"}
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      placeholder={ui?.pl1 || "Kimliğinizi tamamen gizli tutabilirsiniz..."}
                      className="w-full bg-white/50 dark:bg-black/20 border border-gray-200/80 dark:border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D154B] dark:focus:ring-[#D4AF37] dark:text-white placeholder:text-gray-400 font-medium transition-all"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase mb-2">
                      {ui?.labelChan || "İLETİŞİM KANALI (TELEFON / E-POSTA)"}
                    </label>
                    <input
                      type="text"
                      {...register('contact')}
                      placeholder={ui?.pl2 || "E-posta veya Telefon Numarası..."}
                      className="w-full bg-white/50 dark:bg-black/20 border border-gray-200/80 dark:border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D154B] dark:focus:ring-[#D4AF37] dark:text-white placeholder:text-gray-400 font-medium transition-all"
                    />
                    {errors.contact && (
                      <p className="text-red-500 text-xs mt-1 font-semibold">{errors.contact.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase mb-2">
                      BAŞVURU KONUSU
                    </label>
                    <div className="relative" ref={dropdownRef}>
                      <input type="hidden" {...register('subject')} />
                      <div 
                        onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
                        className="w-full bg-white/50 dark:bg-black/20 border border-gray-200/80 dark:border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D154B] dark:focus:ring-[#D4AF37] font-medium transition-all cursor-pointer flex justify-between items-center group"
                      >
                        <span className={selectedSubject ? "text-[#18151A] dark:text-white" : "text-gray-400"}>
                          {selectedSubject || "Lütfen Başvuru Konunuzu Seçin..."}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 group-hover:text-[#3D154B] dark:group-hover:text-[#D4AF37] transition-all duration-300 ${isSubjectDropdownOpen ? 'rotate-180 text-[#3D154B] dark:text-[#D4AF37]' : ''}`} />
                      </div>
                      
                      {isSubjectDropdownOpen && (
                        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white/95 dark:bg-[#1A1622]/95 backdrop-blur-xl border border-gray-200/80 dark:border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden animate-in fade-in zoom-in-95 duration-200 py-2">
                          {subjectOptions.map(opt => (
                            <div 
                              key={opt}
                              onClick={() => { setValue('subject', opt, { shouldValidate: true }); setIsSubjectDropdownOpen(false); }}
                              className={`px-5 py-3 text-sm cursor-pointer transition-colors flex items-center justify-between hover:bg-[#3D154B]/5 dark:hover:bg-white/5 ${selectedSubject === opt ? 'text-[#3D154B] dark:text-[#D4AF37] font-black bg-[#3D154B]/5 dark:bg-[#D4AF37]/10' : 'text-[#18151A] dark:text-gray-200 font-medium'}`}
                            >
                              <span>{opt}</span>
                              {selectedSubject === opt && <CheckCircle2 className="w-4 h-4 text-[#3D154B] dark:text-[#D4AF37]" />}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1 font-semibold">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase mb-2">
                      {ui?.labelMsg || "MESAJINIZ VEYA DESTEK TALEBİNİZ"}
                    </label>
                    <textarea
                      rows={4}
                      {...register('message')}
                      placeholder={ui?.pl3 || "Paylaştığınız tüm bilgiler yasal koruma ve mutlak gizlilik altındadır..."}
                      className="w-full bg-white/50 dark:bg-black/20 border border-gray-200/80 dark:border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D154B] dark:focus:ring-[#D4AF37] dark:text-white placeholder:text-gray-400 font-medium transition-all resize-none"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1 font-semibold">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#3D154B] hover:bg-[#2F0F3A] dark:bg-[#3D154B] dark:hover:bg-[#4E1C5F] text-white py-4 rounded-xl font-black text-sm tracking-[0.2em] uppercase transition-all shadow-lg hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>GÖNDERİLİYOR...</span>
                      </>
                    ) : (
                      <span>{ui?.btnSend || "GÜVENLE GÖNDER"}</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
