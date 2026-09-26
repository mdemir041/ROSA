"use client";
import { toast } from 'react-hot-toast';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, Loader2, Phone, Mail, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const iletisimSchema = z.object({
  phone: z.string().min(3, "Telefon numarası zorunludur"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  address: z.string().min(5, "Adres zorunludur"),
  instagram: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  youtube: z.string().optional().nullable(),
  pinterest: z.string().optional().nullable(),
  telegram: z.string().optional().nullable(),
});

type IletisimFormData = z.infer<typeof iletisimSchema>;

export default function IletisimAdminPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [documentId, setDocumentId] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IletisimFormData>({
    resolver: zodResolver(iletisimSchema),
    defaultValues: {
      phone: '',
      email: '',
      address: '',
      instagram: '',
      twitter: '',
      facebook: '',
      youtube: '',
      pinterest: '',
      telegram: ''
    }
  });

  useEffect(() => {
    fetch(`/api/strapi/iletisims`)
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          const item = data.data[0];
          setDocumentId(item.documentId);
          reset({
            phone: item.phone || '',
            email: item.email || '',
            address: item.address || '',
            instagram: item.instagram || '',
            twitter: item.twitter || '',
            facebook: item.facebook || '',
            youtube: item.youtube || '',
            pinterest: item.pinterest || '',
            telegram: item.telegram || ''
          });
        }
        setLoadingData(false);
      })
      .catch(err => {
        console.error("İletişim verisi getirilirken hata:", err);
        setLoadingData(false);
      });
  }, [reset]);

  const onSubmit = async (data: IletisimFormData) => {
    setIsSubmitting(true);
    setSuccess(false);
    try {
      let res;
      if (documentId) {
        // Update existing
        res = await fetch(`/api/strapi/iletisims/${documentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data })
        });
      } else {
        // Create new
        res = await fetch(`/api/strapi/iletisims`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data })
        });
        
        if (res.ok) {
          const responseData = await res.json();
          if (responseData.data) {
            setDocumentId(responseData.data.documentId);
          }
        }
      }

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        toast.error("Kaydedilirken bir hata oluştu.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Sunucu hatası.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex-1 bg-[#FAFAFA] dark:bg-[#120F16] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#6A4C93]" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#3D154B] dark:text-[#E0CFF2] mb-2">İletişim Bilgileri</h1>
          <p className="text-[#6A4C93]/80 dark:text-[#D4AF37]/80 font-medium">Sitedeki tüm iletişim kanallarını ve adres bilgilerini buradan yönetin.</p>
        </div>
      </div>

      <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl rounded-2xl shadow-xl shadow-[#6A4C93]/5 border border-[#6A4C93]/10 dark:border-white/5 p-6 lg:p-8">
          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-xl font-medium border border-green-200 dark:border-green-500/20">
              İletişim bilgileri başarıyla kaydedildi!
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] flex items-center gap-2">
                  <Phone size={16} /> Telefon Numarası
                </label>
                <input
                  {...register('phone')}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] dark:bg-[#120F16] border border-[#6A4C93]/10 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-[#6A4C93] dark:focus:ring-[#D4AF37] text-[#18151A] dark:text-white transition-all"
                  placeholder="0552 466 86 21"
                />
                {errors.phone && <p className="text-red-500 text-xs font-semibold">{errors.phone.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] flex items-center gap-2">
                  <Mail size={16} /> E-Posta Adresi
                </label>
                <input
                  {...register('email')}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] dark:bg-[#120F16] border border-[#6A4C93]/10 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-[#6A4C93] dark:focus:ring-[#D4AF37] text-[#18151A] dark:text-white transition-all"
                  placeholder="rosakadindernegi@gmail.com"
                />
                {errors.email && <p className="text-red-500 text-xs font-semibold">{errors.email.message}</p>}
              </div>

              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] flex items-center gap-2">
                  <MapPin size={16} /> Merkez Adresi
                </label>
                <textarea
                  {...register('address')}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] dark:bg-[#120F16] border border-[#6A4C93]/10 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-[#6A4C93] dark:focus:ring-[#D4AF37] text-[#18151A] dark:text-white transition-all resize-none"
                  placeholder="Yenişehir Mahallesi Lise Caddesi..."
                />
                {errors.address && <p className="text-red-500 text-xs font-semibold">{errors.address.message}</p>}
              </div>
            </div>

            <hr className="border-[#6A4C93]/10 dark:border-white/5 my-8" />

            <h3 className="text-lg font-bold text-[#3D154B] dark:text-[#E0CFF2] mb-4">Sosyal Medya Linkleri (Opsiyonel)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Instagram */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] flex items-center gap-2">
                  <Instagram size={16} /> Instagram
                </label>
                <input
                  {...register('instagram')}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] dark:bg-[#120F16] border border-[#6A4C93]/10 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-[#6A4C93] dark:focus:ring-[#D4AF37] text-[#18151A] dark:text-white transition-all"
                  placeholder="https://instagram.com/rosakadin"
                />
              </div>

              {/* Twitter */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] flex items-center gap-2">
                  <Twitter size={16} /> Twitter / X
                </label>
                <input
                  {...register('twitter')}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] dark:bg-[#120F16] border border-[#6A4C93]/10 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-[#6A4C93] dark:focus:ring-[#D4AF37] text-[#18151A] dark:text-white transition-all"
                  placeholder="https://twitter.com/rosakadinder"
                />
              </div>

              {/* Facebook */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] flex items-center gap-2">
                  <Facebook size={16} /> Facebook
                </label>
                <input
                  {...register('facebook')}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] dark:bg-[#120F16] border border-[#6A4C93]/10 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-[#6A4C93] dark:focus:ring-[#D4AF37] text-[#18151A] dark:text-white transition-all"
                  placeholder="https://www.facebook.com/rosakadin"
                />
              </div>

              {/* YouTube */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] flex items-center gap-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  YouTube
                </label>
                <input
                  {...register('youtube')}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] dark:bg-[#120F16] border border-[#6A4C93]/10 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-[#6A4C93] dark:focus:ring-[#D4AF37] text-[#18151A] dark:text-white transition-all"
                  placeholder="https://youtube.com/@rosakadin"
                />
              </div>

              {/* Pinterest */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] flex items-center gap-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.182 0 7.433 2.981 7.433 6.963 0 4.156-2.63 7.502-6.282 7.502-1.222 0-2.367-.635-2.763-1.383l-.752 2.865c-.272 1.043-.999 2.348-1.491 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.633 0 12.017 0z"/></svg>
                  Pinterest
                </label>
                <input
                  {...register('pinterest')}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] dark:bg-[#120F16] border border-[#6A4C93]/10 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-[#6A4C93] dark:focus:ring-[#D4AF37] text-[#18151A] dark:text-white transition-all"
                  placeholder="https://pinterest.com/rosakadin"
                />
              </div>

              {/* Telegram */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] flex items-center gap-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  Telegram
                </label>
                <input
                  {...register('telegram')}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] dark:bg-[#120F16] border border-[#6A4C93]/10 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-[#6A4C93] dark:focus:ring-[#D4AF37] text-[#18151A] dark:text-white transition-all"
                  placeholder="https://t.me/rosakadin"
                />
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-[#6A4C93] text-white rounded-xl font-bold hover:bg-[#5A3F7E] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#6A4C93]/20"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}
