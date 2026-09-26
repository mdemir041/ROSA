"use client";
import toast from 'react-hot-toast';

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import ImageUploadField from '@/components/admin/ImageUploadField';
import LanguageSelector from '@/components/admin/LanguageSelector';

export default function EkipDuzenlePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [formData, setFormData] = useState({
    lang: "TR",
    name: "",
    title: "",
    imageUrl: "",
    order: 0
  });

  useEffect(() => {
    fetch(`/api/strapi/team-members/${id}`)
      .then(res => res.json())
      .then(data => {
        if(data.data) {
          const item = data.data;
          setFormData({
            lang: item.lang || "TR",
            name: item.name || "",
            title: item.title || "",
            imageUrl: item.imageUrl || "",
            order: item.order || 0
          });
        }
        setInitLoading(false);
      })
      .catch(err => {
        console.error(err);
        setInitLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/strapi/team-members/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData })
      });
      if(res.ok) {
        toast.success("İşlem başarıyla tamamlandı!");
        router.push("/admin/ekip");
      } else {
        toast.error("Bir hata oluştu!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Bir hata oluştu!");
    } finally {
      setLoading(false);
    }
  };

  if(initLoading) {
    return <div className="flex justify-center p-12 text-[#6A4C93]"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/ekip" className="flex items-center gap-2 text-[#6A4C93] hover:text-[#3D154B] transition-colors font-medium">
          <ArrowLeft size={20} /> Listeye Dön
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-8 shadow-xl shadow-[#6A4C93]/5 space-y-6">
        <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white mb-6">Takım Üyesini Düzenle</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#6A4C93] dark:text-gray-400 mb-1">Dil</label>
            <LanguageSelector value={formData.lang} onChange={(val) => setFormData({ ...formData, lang: val })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6A4C93] dark:text-gray-400 mb-1">Sıra (Görünüm Sırası)</label>
            <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})} className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-2 text-[#3D154B] dark:text-white focus:ring-2 focus:ring-[#D4AF37]" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#6A4C93] dark:text-gray-400 mb-1">İsim Soyisim</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-2 text-[#3D154B] dark:text-white focus:ring-2 focus:ring-[#D4AF37]" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#6A4C93] dark:text-gray-400 mb-1">Unvan / Görev</label>
            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white dark:bg-[#1A1622] border border-[#6A4C93]/20 dark:border-white/10 rounded-xl px-4 py-2 text-[#3D154B] dark:text-white focus:ring-2 focus:ring-[#D4AF37]" />
          </div>
          <div className="md:col-span-2 pt-2">
            <ImageUploadField 
              label="Kişi Görseli"
              value={formData.imageUrl}
              onChange={(val) => setFormData({...formData, imageUrl: val})}
            />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-[#6A4C93]/10 dark:border-white/5 mt-8">
          <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#3D154B] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#6A4C93] transition-colors disabled:opacity-50">
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            {loading ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
