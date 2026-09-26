"use client";
import toast from 'react-hot-toast';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Save, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const bankaSchema = z.object({
  bankName: z.string().min(2, "Banka adı en az 2 karakter olmalıdır."),
  accountHolder: z.string().min(3, "Hesap sahibi zorunludur."),
  iban: z.string().min(26, "Geçerli bir IBAN giriniz (Boşluksuz)."),
  branch: z.string().optional(),
  isActive: z.boolean(),
});

type BankaFormData = z.infer<typeof bankaSchema>;

export default function BankaEklePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<BankaFormData>({
    resolver: zodResolver(bankaSchema),
    defaultValues: { isActive: true }
  });

  const onSubmit = async (data: BankaFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/strapi/banka-hesabis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });
      
      if (res.ok) {
        toast.success("İşlem başarıyla tamamlandı!");
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/banka-hesaplari');
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

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex items-center gap-4">
        <Link href="/admin/banka-hesaplari" className="p-2 bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl rounded-xl border border-[#6A4C93]/10 dark:border-white/5 hover:bg-white dark:hover:bg-[#2A2436] transition-colors text-[#3D154B] dark:text-[#E0CFF2]">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white">Yeni Banka Hesabı Ekle</h1>
          <p className="text-[#6A4C93] dark:text-gray-400 mt-1">Bağış ve aidatlar için resmi IBAN bilgilerini girin.</p>
        </div>
      </div>

      <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-8 shadow-xl shadow-[#6A4C93]/5 relative overflow-hidden">
        
        {success && (
          <div className="absolute inset-0 z-10 bg-white/80 dark:bg-[#1A1622]/90 backdrop-blur-sm flex flex-col items-center justify-center text-emerald-500 animate-in fade-in zoom-in duration-500">
            <CheckCircle2 size={64} className="mb-4" />
            <h2 className="text-2xl font-bold">Hesap Başarıyla Eklendi!</h2>
            <p className="text-sm mt-2 text-gray-500">Listeye yönlendiriliyorsunuz...</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] mb-2">Banka Adı</label>
            <input 
              {...register('bankName')} 
              className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              placeholder="Örn: Ziraat Bankası"
            />
            {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] mb-2">Hesap Sahibi</label>
            <input 
              {...register('accountHolder')} 
              className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              placeholder="Örn: Rosa Kadın Derneği"
            />
            {errors.accountHolder && <p className="text-red-500 text-xs mt-1">{errors.accountHolder.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] mb-2">IBAN</label>
            <input 
              {...register('iban')} 
              className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all font-mono"
              placeholder="TR00 0000 0000 0000 0000 0000 00"
            />
            {errors.iban && <p className="text-red-500 text-xs mt-1">{errors.iban.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3D154B] dark:text-[#E0CFF2] mb-2">Şube (Opsiyonel)</label>
            <input 
              {...register('branch')} 
              className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              placeholder="Örn: Yenişehir Şubesi"
            />
          </div>

          <div className="flex items-center gap-3 bg-[#6A4C93]/5 dark:bg-white/5 p-4 rounded-xl border border-[#6A4C93]/10 dark:border-white/5">
            <input 
              type="checkbox" 
              {...register('isActive')} 
              className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
            />
            <label className="text-sm font-medium text-[#3D154B] dark:text-[#E0CFF2]">
              Bu hesap aktif olarak bağış almaya açık
            </label>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-tr from-amber-500 to-orange-400 text-white py-4 rounded-xl font-bold shadow-lg shadow-amber-500/20 hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 disabled:scale-100"
          >
            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            {isSubmitting ? 'Kaydediliyor...' : 'Hesabı Kaydet'}
          </button>

        </form>
      </div>
    </div>
  );
}
