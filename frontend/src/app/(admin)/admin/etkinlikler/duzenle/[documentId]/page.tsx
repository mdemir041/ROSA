"use client";
import { toast } from 'react-hot-toast';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Save, Loader2, CheckCircle2, Calendar, MapPin, Type, FileText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUploadField from '@/components/admin/ImageUploadField';

const etkinlikSchema = z.object({
  title: z.string().min(5, "Başlık en az 5 karakter olmalıdır."),
  date: z.string().min(1, "Tarih zorunludur."),
  type: z.enum(["Etkinlik", "Dava"], { required_error: "Tür seçimi zorunludur." }),
  description: z.string().optional(),
  locationOrLink: z.string().optional(),
  imgUrl: z.string().optional().nullable(),
  lang: z.enum(["TR", "EN", "KU"], { required_error: "Dil seçimi zorunludur." }),
});

type EtkinlikFormData = z.infer<typeof etkinlikSchema>;

export default function EtkinlikDuzenlePage({ params }: { params: Promise<{ documentId: string }> }) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const documentId = unwrappedParams.documentId;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<EtkinlikFormData>({
    resolver: zodResolver(etkinlikSchema)
  });

  const watchImgUrl = watch("imgUrl");

  useEffect(() => {
    fetch(`/api/strapi/events/${documentId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.data) {
          const item = data.data;
          reset({
            title: item.title || "",
            date: item.date ? item.date.substring(0, 16) : "",
            type: item.type || "Etkinlik",
            description: item.description || "",
            locationOrLink: item.locationOrLink || "",
            imgUrl: item.imgUrl || "",
            lang: item.lang || "TR",
          });
        } else {
          toast.error("Kayıt bulunamadı!");
          router.push('/admin/etkinlikler');
        }
        setLoadingData(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Veri çekilemedi!");
        setLoadingData(false);
      });
  }, [documentId, reset, router]);

  const onSubmit = async (data: EtkinlikFormData) => {
    setIsSubmitting(true);
    try {
      const formattedData = {
        ...data,
        date: data.date ? new Date(data.date).toISOString() : data.date
      };
      
      const res = await fetch(`/api/strapi/events/${documentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formattedData })
      });
      
      if (res.ok) {
        setSuccess(true);
        toast.success("Kayıt başarıyla güncellendi!");
        setTimeout(() => {
          router.push('/admin/etkinlikler');
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
          <p className="text-xl text-[#6A4C93] dark:text-gray-300">Etkinlik güncellendi, yönlendiriliyorsunuz...</p>
        </div>
      </div>
    );
  }

  if (loadingData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#6A4C93] animate-spin mb-4" />
        <p className="text-[#6A4C93] font-medium">Veri yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl rounded-2xl border border-[#6A4C93]/10 dark:border-white/5 p-6 shadow-xl shadow-[#6A4C93]/5">
        <div className="flex items-center gap-4">
          <Link href="/admin/etkinlikler" className="p-3 bg-white/80 dark:bg-black/20 rounded-xl hover:bg-[#6A4C93] hover:text-white transition-all text-[#3D154B] dark:text-[#E0CFF2]">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-[#3D154B] dark:text-white font-serif tracking-tight">Etkinlik Düzenle</h1>
            <p className="text-[#6A4C93] dark:text-gray-400 font-medium mt-1">Sistemdeki etkinliği güncelliyorsunuz.</p>
          </div>
        </div>
        
        <button 
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#6A4C93] to-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={24} />}
          Değişiklikleri Kaydet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sol Sütun: Ana İçerik */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-[2rem] p-8 shadow-xl shadow-[#6A4C93]/5">
            <h2 className="text-xl font-bold text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
              <Type className="text-[#D4AF37]" /> Etkinlik Detayları
            </h2>
            
            <div className="space-y-8">
              {/* Başlık Alanı */}
              <div>
                <input 
                  {...register('title')} 
                  className="w-full bg-transparent border-b-2 border-gray-200 dark:border-white/10 px-2 py-4 text-3xl md:text-5xl font-black text-[#3D154B] dark:text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-700 font-serif"
                  placeholder="Etkinlik veya Dava Başlığı..."
                />
                {errors.title && <p className="text-red-500 text-sm mt-2 font-medium">{errors.title.message}</p>}
              </div>

              {/* Açıklama Alanı */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-lg font-bold text-[#3D154B] dark:text-[#E0CFF2] flex items-center gap-2">
                    <FileText size={20} /> Etkinlik Açıklaması
                  </label>
                </div>
                
                <textarea 
                  {...register('description')} 
                  rows={8}
                  className="w-full bg-white dark:bg-[#1A1622] border border-gray-200 dark:border-white/5 rounded-2xl px-6 py-6 text-lg text-[#3D154B] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] resize-y leading-relaxed"
                  placeholder="Bu etkinlik veya dava hakkında kısa bilgi verin..."
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
              label="Kapak Görseli (Opsiyonel)"
              value={watchImgUrl || ""}
              onChange={(val) => setValue('imgUrl', val)}
              error={errors.imgUrl?.message}
            />
          </div>

          {/* Ayarlar Kutusu */}
          <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-[2rem] p-8 shadow-xl shadow-[#6A4C93]/5">
            <h2 className="text-xl font-bold text-[#3D154B] dark:text-white mb-6 flex items-center gap-2">
              <Calendar className="text-[#D4AF37]" /> Tarih ve Tür
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#3D154B] dark:text-gray-300 mb-2">Tarih / Saat</label>
                <input 
                  type="datetime-local"
                  {...register('date')} 
                  className="w-full bg-white dark:bg-[#1A1622] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3D154B] dark:text-gray-300 mb-2">Tür</label>
                <select 
                  {...register('type')}
                  className="w-full bg-white dark:bg-[#1A1622] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none"
                >
                  <option value="Etkinlik">Etkinlik</option>
                  <option value="Dava">Dava</option>
                </select>
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3D154B] dark:text-gray-300 mb-2">Dil</label>
                <select 
                  {...register('lang')}
                  className="w-full bg-white dark:bg-[#1A1622] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none"
                >
                  <option value="TR">Türkçe (TR)</option>
                  <option value="EN">English (EN)</option>
                  <option value="KU">Kurdî (KU)</option>
                </select>
                {errors.lang && <p className="text-red-500 text-sm mt-1">{errors.lang.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3D154B] dark:text-gray-300 mb-2 flex items-center gap-2">
                  <MapPin size={16} /> Konum veya Link
                </label>
                <input 
                  {...register('locationOrLink')} 
                  className="w-full bg-white dark:bg-[#1A1622] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6A4C93] transition-all"
                  placeholder="Diyarbakır Adliyesi veya Online Link"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
