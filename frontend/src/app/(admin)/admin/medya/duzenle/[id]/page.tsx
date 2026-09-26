"use client";
import toast from 'react-hot-toast';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Save, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const medyaSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalıdır."),
  desc: z.string().min(5, "Açıklama zorunludur."),
  typeCode: z.enum(["news", "report", "campaign"], { required_error: "Tür seçilmelidir." }),
  badge: z.string().min(2, "Etiket zorunludur."),
  date: z.string().min(1, "Tarih zorunludur."),
  lang: z.string().min(2, "Dil zorunludur.")
});

type MedyaFormData = z.infer<typeof medyaSchema>;

export default function MedyaDuzenlePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<MedyaFormData>({
    resolver: zodResolver(medyaSchema)
  });

  useEffect(() => {
    fetch(`/api/strapi/medias/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          reset({
            title: data.data.title,
            desc: data.data.desc,
            typeCode: data.data.typeCode as any,
            badge: data.data.badge,
            date: data.data.date,
            lang: data.data.lang || 'TR'
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Medya detayı çekilirken hata:", err);
        setLoading(false);
      });
  }, [id, reset]);

  const onSubmit = async (data: MedyaFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/strapi/medias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });
      
      if (res.ok) {
        toast.success("İşlem başarıyla tamamlandı!");
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/medya');
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

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-[#6A4C93]" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex items-center gap-4">
        <Link href="/admin/medya" className="p-2 bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl rounded-xl border border-[#6A4C93]/10 dark:border-white/5 hover:bg-white dark:hover:bg-[#2A2436] transition-colors text-[#3D154B] dark:text-[#E0CFF2]">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white">Medya İçeriğini Düzenle</h1>
          <p className="text-[#6A4C93] dark:text-gray-400 mt-1">İçeriği güncelleyin.</p>
        </div>
      </div>

      <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-8 shadow-xl shadow-[#6A4C93]/5 relative overflow-hidden">
        
        {success && (
          <div className="absolute inset-0 z-10 bg-white/80 dark:bg-[#1A1622]/90 backdrop-blur-sm flex flex-col items-center justify-center text-emerald-500 animate-in fade-in zoom-in duration-500">
            <CheckCircle2 size={64} className="mb-4" />
            <h2 className="text-2xl font-bold">Başarıyla Güncellendi!</h2>
            <p className="text-sm mt-2 text-gray-500">Listeye yönlendiriliyorsunuz...</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] mb-2">Başlık</label>
            <input 
              {...register('title')} 
              className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
              placeholder="Örn: 2026 Kadın Hakları Raporu"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] mb-2">Kısa Açıklama</label>
            <textarea 
              {...register('desc')} 
              rows={3}
              className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
              placeholder="Medya veya rapor hakkında kısa özet..."
            />
            {errors.desc && <p className="text-red-500 text-xs mt-1">{errors.desc.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] mb-2">Tür</label>
              <select 
                {...register('typeCode')} 
                className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
              >
                <option value="news">Haber / News</option>
                <option value="report">Rapor / Report</option>
                <option value="campaign">Kampanya / Campaign</option>
              </select>
              {errors.typeCode && <p className="text-red-500 text-xs mt-1">{errors.typeCode.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] mb-2">Etiket (Badge)</label>
              <input 
                {...register('badge')} 
                className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                placeholder="Örn: YENİ, ÖNEMLİ, PDF"
              />
              {errors.badge && <p className="text-red-500 text-xs mt-1">{errors.badge.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] mb-2">Tarih</label>
              <input 
                {...register('date')} 
                className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                placeholder="Örn: 27 Temmuz 2026"
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] mb-2">Dil</label>
              <select 
                {...register('lang')} 
                className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
              >
                <option value="TR">TR</option>
                <option value="KUR">KUR</option>
                <option value="EN">EN</option>
                <option value="DE">DE</option>
                <option value="FR">FR</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-tr from-[#6A4C93] to-[#D4AF37] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#6A4C93]/20 hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 disabled:scale-100"
          >
            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            {isSubmitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>

        </form>
      </div>
    </div>
  );
}
