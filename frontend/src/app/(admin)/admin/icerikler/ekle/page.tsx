"use client";
import { toast } from 'react-hot-toast';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Save, Loader2, CheckCircle2, Type, FileText, LayoutTemplate, Link2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUploadField from '@/components/admin/ImageUploadField';

const icerikSchema = z.object({
  title: z.string().min(5, "Başlık en az 5 karakter olmalıdır."),
  slug: z.string().min(3, "Slug zorunludur."),
  category: z.enum(["Icerik", "Bilgilendirme"], { required_error: "Kategori zorunludur." }),
  subcategory: z.string().optional(),
  content: z.string().optional(),
  imgUrl: z.string().optional().nullable(),
});

type IcerikFormData = z.infer<typeof icerikSchema>;

const generateSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export default function IcerikEklePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IcerikFormData>({
    resolver: zodResolver(icerikSchema),
    defaultValues: {
      category: "Icerik"
    }
  });

  const watchTitle = watch("title");
  const watchImgUrl = watch("imgUrl");

  // Auto-generate slug when title changes
  useEffect(() => {
    if (watchTitle) {
      setValue("slug", generateSlug(watchTitle), { shouldValidate: true });
    }
  }, [watchTitle, setValue]);

  const onSubmit = async (data: IcerikFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/strapi/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });
      
      if (res.ok) {
        setSuccess(true);
        toast.success("İşlem başarıyla tamamlandı!");
        setTimeout(() => {
          router.push('/admin/icerikler');
        }, 1500);
      } else {
        toast.error("Kaydedilirken bir hata oluştu.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Bağlantı hatası!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-[#0F0C12]/90 backdrop-blur-md animate-in fade-in duration-500">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gradient-to-tr from-[#6A4C93] to-[#D4AF37] rounded-full flex items-center justify-center shadow-2xl shadow-[#6A4C93]/30 mb-6 animate-bounce">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <h2 className="text-4xl font-black text-[#3D154B] dark:text-white mb-2 font-serif">Harika!</h2>
          <p className="text-xl text-[#6A4C93] dark:text-gray-300">İçerik yayına hazır, yönlendiriliyorsunuz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl rounded-2xl border border-[#6A4C93]/10 dark:border-white/5 p-6 shadow-xl shadow-[#6A4C93]/5">
        <div className="flex items-center gap-4">
          <Link href="/admin/icerikler" className="p-3 bg-white/80 dark:bg-black/20 rounded-xl hover:bg-[#6A4C93] hover:text-white transition-all text-[#3D154B] dark:text-[#E0CFF2]">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-[#3D154B] dark:text-white font-serif tracking-tight">Yeni İçerik Ekle</h1>
            <p className="text-[#6A4C93] dark:text-gray-400 font-medium mt-1">Sisteme makale veya bilgi yazısı ekleyin.</p>
          </div>
        </div>
        
        <button 
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#6A4C93] to-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={24} />}
          Kaydet ve Yayınla
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sol Sütun: Ana İçerik */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-[2rem] p-8 shadow-xl shadow-[#6A4C93]/5">
            <h2 className="text-xl font-bold text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
              <Type className="text-[#D4AF37]" /> Temel İçerik
            </h2>
            
            <div className="space-y-8">
              {/* Başlık Alanı */}
              <div>
                <input 
                  {...register('title')} 
                  className="w-full bg-transparent border-b-2 border-gray-200 dark:border-white/10 px-2 py-4 text-3xl md:text-5xl font-black text-[#3D154B] dark:text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-700 font-serif"
                  placeholder="İçerik Başlığını Buraya Yazın..."
                />
                {errors.title && <p className="text-red-500 text-sm mt-2 font-medium">{errors.title.message}</p>}
              </div>

              {/* İçerik Metni */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-lg font-bold text-[#3D154B] dark:text-[#E0CFF2] flex items-center gap-2">
                    <FileText size={20} /> Detaylı İçerik (Makale)
                  </label>
                </div>
                
                <textarea 
                  {...register('content')} 
                  rows={15}
                  className="w-full bg-white dark:bg-[#1A1622] border border-gray-200 dark:border-white/5 rounded-2xl px-6 py-6 text-lg text-[#3D154B] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] resize-y leading-relaxed"
                  placeholder="Okuyucularınızı bilgilendirecek metni buraya yazın..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Sütun: Medya ve Ayarlar */}
        <div className="space-y-6">
          
          {/* Görsel Kutusu */}
          <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-[2rem] p-8 shadow-xl shadow-[#6A4C93]/5">
            <ImageUploadField 
              label="Kapak Görseli"
              value={watchImgUrl || ""}
              onChange={(val) => setValue('imgUrl', val)}
              error={errors.imgUrl?.message}
            />
          </div>

          {/* Ayarlar Kutusu */}
          <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-[2rem] p-8 shadow-xl shadow-[#6A4C93]/5">
            <h2 className="text-xl font-bold text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
              <LayoutTemplate className="text-[#D4AF37]" /> Yayın Ayarları
            </h2>
            
            <div className="space-y-6">
              
              <div>
                <label className="block text-sm font-bold text-[#3D154B] dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Link2 size={16} /> URL Kısaltması (Slug)
                </label>
                <input 
                  {...register('slug')} 
                  className="w-full bg-white dark:bg-[#1A1622] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                  placeholder="ornek-icerik-slug"
                />
                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3D154B] dark:text-gray-300 mb-2">Kategori</label>
                <select 
                  {...register('category')}
                  className="w-full bg-white dark:bg-[#1A1622] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none"
                >
                  <option value="Icerik">Genel İçerik</option>
                  <option value="Bilgilendirme">Bilgilendirme Kılavuzu</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3D154B] dark:text-gray-300 mb-2">Alt Kategori (Opsiyonel)</label>
                <input 
                  {...register('subcategory')} 
                  className="w-full bg-white dark:bg-[#1A1622] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6A4C93] transition-all"
                  placeholder="Örn: Psikolojik Destek"
                />
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
