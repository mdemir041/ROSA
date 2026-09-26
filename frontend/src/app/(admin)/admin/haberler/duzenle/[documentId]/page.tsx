"use client";
import { toast } from 'react-hot-toast';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Save, Loader2, CheckCircle2, Image as ImageIcon, Calendar, Link2, Type, FileText, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import IconLibraryModal from '@/components/admin/IconLibraryModal';
import ImageUploadField from '@/components/admin/ImageUploadField';
import VideoUploadField from '@/components/admin/VideoUploadField';
import RichTextEditor from '@/components/admin/RichTextEditor';
import CustomSelect from '@/components/admin/CustomSelect';

const haberSchema = z.object({
  title: z.string().min(5, "Başlık en az 5 karakter olmalıdır."),
  content: z.string().optional(),
  category: z.string().optional(),
  date: z.string().min(1, "Tarih zorunludur."),
  imageUrl: z.string().min(1, "Görsel URL zorunludur."),
  link: z.string().min(1, "Link (Bağlantı) zorunludur."),
  hasVideo: z.boolean().optional(),
  videoUrl: z.string().optional(),
  author: z.string().optional(),
});

type HaberFormData = z.infer<typeof haberSchema>;

export default function HaberDuzenlePage({ params }: { params: Promise<{ documentId: string }> }) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const documentId = unwrappedParams.documentId;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<HaberFormData>({
    resolver: zodResolver(haberSchema),
    defaultValues: {
      hasVideo: false,
    }
  });

  const watchImageUrl = watch("imageUrl");
  const watchHasVideo = watch("hasVideo");
  const watchVideoUrl = watch("videoUrl");
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);

  const handleIconSelect = (iconName: string) => {
    const currentText = watch('content') || "";
    setValue('content', currentText + ` [icon:${iconName}]`, { shouldDirty: true, shouldValidate: true });
    setIsIconModalOpen(false);
  };

  useEffect(() => {
    fetch(`/api/strapi/habers/${documentId}`)
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          reset({
            title: data.data.title,
            content: data.data.content || "",
            category: data.data.category || "",
            date: data.data.date,
            imageUrl: data.data.imageUrl,
            link: data.data.link,
            hasVideo: data.data.hasVideo || false,
            videoUrl: data.data.videoUrl || "",
            author: data.data.author || "Rosa Haber Masası"
          });
        }
        setLoadingData(false);
      })
      .catch(err => {
        console.error("Haber getirilirken hata:", err);
        setLoadingData(false);
      });
  }, [documentId, reset]);

  const onSubmit = async (data: HaberFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/strapi/habers/${documentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });
      
      if (res.ok) {
        setSuccess(true);
        toast.success("İşlem başarıyla tamamlandı!");
        setTimeout(() => {
          router.push('/admin/haberler');
        }, 1500);
      } else {
        const errorData = await res.json().catch(() => null);
        const errorMessage = errorData?.error?.message || `Hata Kodu: ${res.status}`;
        toast.error(`Kaydedilemedi: ${errorMessage}`);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(`Bağlantı hatası: ${err.message || "Bilinmeyen hata"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-[#6A4C93] dark:text-[#E0CFF2]">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="text-xl font-bold">Haber içeriği yükleniyor...</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-[#0F0C12]/90 backdrop-blur-md animate-in fade-in duration-500">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gradient-to-tr from-[#6A4C93] to-[#D4AF37] rounded-full flex items-center justify-center shadow-2xl shadow-[#6A4C93]/30 mb-6 animate-bounce">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <h2 className="text-4xl font-black text-[#3D154B] dark:text-white mb-2 font-serif">Harika!</h2>
          <p className="text-xl text-[#6A4C93] dark:text-gray-300">Haber başarıyla güncellendi, yönlendiriliyorsunuz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-6">
      
      <IconLibraryModal 
        isOpen={isIconModalOpen} 
        onClose={() => setIsIconModalOpen(false)} 
        onSelect={handleIconSelect} 
      />
      
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <Link href="/admin/haberler" className="p-1.5 bg-white dark:bg-[#1A1622] rounded-lg shadow-sm hover:shadow-md transition-all text-[#3D154B] dark:text-white group border border-gray-100 dark:border-white/5">
            <ArrowLeft size={16} />
          </Link>
          <h1 className="text-xl font-extrabold text-[#3D154B] dark:text-white tracking-tight">Haberi Düzenle</h1>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-[#1A1622]/80 backdrop-blur-3xl border border-[#6A4C93]/10 dark:border-white/10 rounded-2xl p-3 md:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none relative">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6A4C93]/5 dark:bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none transform translate-x-1/2 -translate-y-1/2 overflow-hidden" />

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-3">
              <h2 className="text-base font-bold text-[#3D154B] dark:text-white border-b border-gray-100 dark:border-white/5 pb-1.5 flex items-center gap-1.5">
                <Type className="text-[#D4AF37]" size={20} /> Temel İçerik
              </h2>
              
              <div className="space-y-2">
                <input 
                  {...register('title')} 
                  className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 px-1 py-1 text-xl md:text-2xl font-black text-[#3D154B] dark:text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-700 font-serif"
                  placeholder="Çarpıcı Manşetinizi Buraya Yazın..."
                />
                {errors.title && <p className="text-red-500 text-sm mt-2 font-medium">{errors.title.message}</p>}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-base font-bold text-[#3D154B] dark:text-[#E0CFF2] flex items-center gap-1.5">
                    <FileText size={16} /> Haber Metni (Makale)
                  </label>
                </div>
                
                <RichTextEditor 
                  value={watch('content') || ""}
                  onChange={(val) => setValue('content', val, { shouldDirty: true, shouldValidate: true })}
                  onOpenIconModal={() => setIsIconModalOpen(true)}
                  placeholder="Okuyucularınızı büyüleyecek o harika hikayeyi buraya yazmaya başlayın..."
                />
              </div>

              {/* Yayın Ayarları - Sol Kolon Altı */}
              <div className="space-y-3 bg-gray-50/50 dark:bg-black/10 p-3 md:p-4 rounded-xl border border-gray-100 dark:border-white/5 mt-6">
                <h2 className="text-base font-bold text-[#3D154B] dark:text-white border-b border-gray-200 dark:border-white/5 pb-1.5 flex items-center gap-1.5">
                  <Calendar className="text-[#D4AF37]" size={16} /> Yayın Ayarları
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-[#3D154B] dark:text-[#E0CFF2] mb-1 ml-1">Tarih</label>
                    <input 
                      {...register('date')} 
                      className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm text-[#3D154B] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      placeholder="Örn: 27 Temmuz 2026"
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1 ml-1">{errors.date.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#3D154B] dark:text-[#E0CFF2] mb-1 ml-1">Yazar</label>
                    <input 
                      {...register('author')} 
                      className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm text-[#3D154B] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      placeholder="Rosa Haber Masası"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#3D154B] dark:text-[#E0CFF2] mb-1 ml-1">Kategori</label>
                    <CustomSelect 
                      value={watch('category') || ""}
                      onChange={(val) => setValue('category', val, { shouldDirty: true, shouldValidate: true })}
                      placeholder="Kategori Seçin..."
                      options={[
                        { value: "basin", label: "Basın Açıklaması" },
                        { value: "etkinlik", label: "Etkinlik" },
                        { value: "duyuru", label: "Duyuru" }
                      ]}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#3D154B] dark:text-[#E0CFF2] mb-1 ml-1">
                      Yönlendirme Linki
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                        <Link2 size={14} className="text-gray-400" />
                      </div>
                      <input 
                        {...register('link')} 
                        className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-sm text-[#3D154B] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#6A4C93] transition-all"
                        placeholder="/haberler veya https://..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-3 bg-gray-50/50 dark:bg-black/10 p-3 md:p-4 rounded-xl border border-gray-100 dark:border-white/5">
              <h2 className="text-base font-bold text-[#3D154B] dark:text-white border-b border-gray-200 dark:border-white/5 pb-1.5 flex items-center gap-1.5">
                <ImageIcon className="text-[#D4AF37]" size={16} /> Medya Yönetimi
              </h2>
              
              <ImageUploadField 
                label="Kapak Görseli"
                value={watchImageUrl}
                onChange={(val) => setValue('imageUrl', val, { shouldValidate: true })}
                error={errors.imageUrl?.message}
              />

              <div className="pt-4 border-t border-gray-200 dark:border-white/5">
                <label className="relative inline-flex items-center cursor-pointer group mb-4">
                  <input
                    type="checkbox"
                    {...register('hasVideo')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-black/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6A4C93] dark:peer-checked:bg-[#D4AF37]"></div>
                  <span className="ml-3 text-sm font-bold text-[#3D154B] dark:text-[#E0CFF2] group-hover:text-[#6A4C93] dark:group-hover:text-[#D4AF37] transition-colors">Videolu Haber</span>
                </label>

                {watchHasVideo && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <VideoUploadField
                      label="Haber Videosu"
                      value={watchVideoUrl || ""}
                      onChange={(val) => setValue('videoUrl', val, { shouldValidate: true })}
                      error={errors.videoUrl?.message}
                    />
                  </div>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#3D154B] to-[#6A4C93] dark:from-[#D4AF37] dark:to-[#F3D77A] text-white dark:text-[#3D154B] py-2 rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:scale-100 mt-2"
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
