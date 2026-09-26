"use client";
import toast from 'react-hot-toast';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Save, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUploadField from '@/components/admin/ImageUploadField';
import FileUploadField from '@/components/admin/FileUploadField';

const raporSchema = z.object({
  title: z.string().min(5, "Başlık en az 5 karakter olmalıdır."),
  desc: z.string().min(10, "Açıklama en az 10 karakter olmalıdır."),
  imgUrl: z.string().min(1, "Kapak görseli zorunludur."),
  link: z.string().min(1, "PDF dosyası yüklenmelidir."),
});

type RaporFormData = z.infer<typeof raporSchema>;

export default function RaporDuzenlePage({ params }: { params: Promise<{ documentId: string }> }) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const documentId = unwrappedParams.documentId;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<RaporFormData>({
    resolver: zodResolver(raporSchema)
  });

  useEffect(() => {
    fetch(`/api/strapi/rapors/${documentId}`)
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          reset({
            title: data.data.title,
            desc: data.data.desc,
            imgUrl: data.data.imgUrl,
            link: data.data.link
          });
        }
        setLoadingData(false);
      })
      .catch(err => {
        console.error("Rapor getirilirken hata:", err);
        setLoadingData(false);
      });
  }, [documentId, reset]);

  const onSubmit = async (data: RaporFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/strapi/rapors/${documentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });
      
      if (res.ok) {
        toast.success("İşlem başarıyla tamamlandı!");
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/raporlar');
        }, 1500);
      } else {
        toast.error("Bir hata oluştu!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Bir hata oluştu!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-[#6A4C93] dark:text-[#D4AF37]">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="font-medium animate-pulse">Rapor bilgileri yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      
      {/* Premium Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/raporlar" className="p-2.5 bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl rounded-xl border border-[#6A4C93]/10 dark:border-white/5 hover:bg-white dark:hover:bg-[#2A2436] hover:scale-105 transition-all shadow-sm text-[#3D154B] dark:text-[#E0CFF2]">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-[#3D154B] dark:text-white tracking-tight">Raporu Düzenle</h1>
            <p className="text-[#6A4C93] dark:text-gray-400 mt-1 font-medium">Dernek raporunuzun detaylarını ve dosyasını güncelleyin.</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-[#1A1622]/80 backdrop-blur-3xl border border-[#6A4C93]/10 dark:border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none relative overflow-hidden">
        
        {/* Glow effect inside card */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6A4C93]/5 dark:bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none transform translate-x-1/2 -translate-y-1/2" />

        {success && (
          <div className="absolute inset-0 z-50 bg-white/90 dark:bg-[#1A1622]/95 backdrop-blur-md flex flex-col items-center justify-center text-[#6A4C93] dark:text-[#D4AF37] animate-in fade-in zoom-in duration-500 rounded-[2rem]">
            <div className="w-24 h-24 bg-[#6A4C93]/10 dark:bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
               <CheckCircle2 size={48} strokeWidth={2} />
            </div>
            <h2 className="text-3xl font-extrabold text-[#3D154B] dark:text-white mb-2">Başarıyla Güncellendi!</h2>
            <p className="text-base text-[#6A4C93] dark:text-gray-400 font-medium">Listeye yönlendiriliyorsunuz, lütfen bekleyin...</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
          
          {/* Sol Kolon: Metin Bilgileri */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#3D154B] dark:text-white border-b border-gray-100 dark:border-white/5 pb-4">Genel Bilgiler</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#3D154B] dark:text-[#E0CFF2] ml-1">Rapor Başlığı</label>
                <div className="relative group">
                  <input 
                    {...register('title')} 
                    placeholder="Örn: 2026 Kadın Hakları Raporu"
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6A4C93] dark:focus:ring-[#D4AF37] focus:border-transparent transition-all group-hover:bg-white dark:group-hover:bg-black/40 shadow-sm"
                  />
                </div>
                {errors.title && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#3D154B] dark:text-[#E0CFF2] ml-1">Kısa Açıklama</label>
                <div className="relative group">
                  <textarea 
                    {...register('desc')} 
                    rows={4}
                    placeholder="Raporun içeriği hakkında kısa bir özet..."
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6A4C93] dark:focus:ring-[#D4AF37] focus:border-transparent transition-all group-hover:bg-white dark:group-hover:bg-black/40 shadow-sm resize-none"
                  />
                </div>
                {errors.desc && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.desc.message}</p>}
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-gray-100 dark:border-white/5">
              <h3 className="text-xl font-bold text-[#3D154B] dark:text-white">PDF Dokümanı</h3>
              <FileUploadField 
                label="Rapor Dosyası (PDF)"
                value={watch('link')}
                onChange={(val) => setValue('link', val, { shouldValidate: true })}
                error={errors.link?.message}
                accept="application/pdf"
              />
            </div>
          </div>

          {/* Sağ Kolon: Görsel ve Aksiyon */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6 bg-gray-50/50 dark:bg-black/10 p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-white/5">
              <h3 className="text-xl font-bold text-[#3D154B] dark:text-white border-b border-gray-200 dark:border-white/5 pb-4">Görsel Yönetimi</h3>
              
              <ImageUploadField 
                label="Kapak Görseli"
                value={watch('imgUrl')}
                onChange={(val) => setValue('imgUrl', val, { shouldValidate: true })}
                error={errors.imgUrl?.message}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#3D154B] to-[#6A4C93] dark:from-[#D4AF37] dark:to-[#F3D77A] text-white dark:text-[#3D154B] py-5 rounded-2xl font-extrabold text-lg shadow-[0_10px_25px_-5px_rgba(106,76,147,0.4)] dark:shadow-[0_10px_25px_-5px_rgba(212,175,55,0.3)] hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:scale-100"
            >
              {isSubmitting ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
              {isSubmitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
