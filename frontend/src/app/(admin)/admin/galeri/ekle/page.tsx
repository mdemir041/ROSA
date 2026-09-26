"use client";
import { toast } from 'react-hot-toast';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import ImageUploadField from '@/components/admin/ImageUploadField';
import LanguageSelector from '@/components/admin/LanguageSelector';

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ lang: "TR", title: "", category: "Saha Eylemleri", imgUrl: "" });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true);
    try {
      const res = await fetch("/api/strapi/gallerys", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ data: formData }) 
      });
      if(res.ok) {
        toast.success("Görsel başarıyla eklendi!");
        router.push("/admin/galeri");
      } else {
        toast.error("Bir hata oluştu!");
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
        <Link href="/admin/galeri" className="p-2 hover:bg-white/50 dark:hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft className="text-[#3D154B] dark:text-white" />
        </Link>
        <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white flex items-center gap-2">
          <ImageIcon className="text-[#6A4C93] dark:text-[#D4AF37]" size={24} />
          Yeni Galeri Görseli Ekle
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-8 space-y-6 shadow-xl shadow-[#6A4C93]/5">
        <div>
          <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">Dil</label>
          <LanguageSelector value={formData.lang} onChange={(val) => setFormData({ ...formData, lang: val })} />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">Başlık</label>
          <input
            required
            type="text"
            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6A4C93] dark:text-white"
            placeholder="Fotoğraf başlığı veya etkinlik adı..."
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">Kategori</label>
          <input
            type="text"
            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6A4C93] dark:text-white"
            placeholder="Örn: Saha Eylemleri, Basın Açıklamaları, Atölyeler"
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
          />
        </div>
        
        <div className="pt-2">
          <ImageUploadField 
            label="Galeri Görseli"
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
