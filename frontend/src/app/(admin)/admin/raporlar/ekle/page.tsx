"use client";
import { toast } from 'react-hot-toast';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2, FileText } from "lucide-react";
import Link from "next/link";
import ImageUploadField from '@/components/admin/ImageUploadField';

export default function RaporEklePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    imgUrl: "/image_2.png", // Default resim
    link: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/strapi/rapors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData })
      });
      if (res.ok) {
        toast.success("Rapor başarıyla eklendi!");
        router.push("/admin/raporlar");
      } else {
        toast.error("Kaydedilirken bir hata oluştu!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Sunucu bağlantı hatası!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href="/admin/raporlar" className="p-2 hover:bg-white/50 dark:hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft className="text-[#3D154B] dark:text-white" />
        </Link>
        <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white flex items-center gap-2">
          <FileText className="text-[#6A4C93] dark:text-[#D4AF37]" size={24} />
          Yeni Rapor Ekle
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-8 space-y-6 shadow-xl shadow-[#6A4C93]/5">
        
        <div>
          <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">Başlık</label>
          <input
            required
            type="text"
            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6A4C93] dark:text-white"
            placeholder="Rapor başlığını giriniz..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">Açıklama / İçerik Özeti</label>
          <textarea
            required
            className="w-full h-32 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6A4C93] dark:text-white resize-none"
            placeholder="Raporun özetini veya açıklamasını giriniz..."
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">PDF / Rapor Bağlantısı (URL)</label>
          <input
            required
            type="url"
            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6A4C93] dark:text-white"
            placeholder="Örn: https://siteniz.com/uploads/rapor.pdf"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          />
          <p className="text-xs text-gray-400 mt-2">Raporun barındırıldığı bağlantıyı (PDF linki) buraya yapıştırın.</p>
        </div>

        <div className="pt-2">
          <ImageUploadField 
            label="Kapak Görseli"
            value={formData.imgUrl}
            onChange={(val) => setFormData({...formData, imgUrl: val})}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-tr from-[#6A4C93] to-[#D4AF37] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save />} Kaydet
        </button>
      </form>
    </div>
  );
}
