"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Newspaper, Trash2, Edit, Loader2 } from 'lucide-react';
import { useConfirm } from "@/context/ConfirmContext";
import toast from "react-hot-toast";

interface Haber {
  id: number;
  documentId: string;
  title: string;
  date: string;
  imageUrl: string;
  link: string;
}

export default function HaberlerPage() {
  const { confirm } = useConfirm();
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/strapi/habers')
      .then(res => res.json())
      .then(data => {
        setHaberler(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Haberler çekilirken hata oluştu:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (documentId: string) => {
    const isConfirmed = await confirm({
      title: "Emin misiniz?",
      message: "Bu işlemi geri alamazsınız!",
      confirmText: "Evet, Sil!"
    });
    if (!isConfirmed) return;

    try {
      const res = await fetch(`/api/strapi/habers/${documentId}`, {
        method: 'DELETE'
      });
      if(res.ok) {
        setHaberler(prev => prev.filter(h => h.documentId !== documentId));
        toast.success("Kayıt başarıyla silindi!");
      } else {
        toast.error("Silme işlemi başarısız!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Bir hata oluştu!");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex justify-between items-center bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-[#6A4C93]/5">
        <div>
          <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white flex items-center gap-3">
            <Newspaper className="text-[#6A4C93] dark:text-[#D4AF37]" />
            Haber Yönetimi
          </h1>
          <p className="text-[#6A4C93] dark:text-gray-400 mt-1">Sistemdeki tüm haberleri buradan yönetebilirsiniz.</p>
        </div>
        
        <Link 
          href="/admin/haberler/ekle" 
          className="flex items-center gap-2 bg-gradient-to-tr from-[#6A4C93] to-[#D4AF37] text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          <Plus size={20} />
          Yeni Haber Ekle
        </Link>
      </div>

      <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl shadow-xl shadow-[#6A4C93]/5 overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-[#6A4C93] dark:text-[#E0CFF2]">
            <Loader2 size={32} className="animate-spin mb-4" />
            <p>Haberler yükleniyor...</p>
          </div>
        ) : haberler.length === 0 ? (
          <div className="p-12 text-center text-gray-500">Henüz hiç haber eklenmemiş.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-[#6A4C93]/5 dark:bg-white/5 border-b border-[#6A4C93]/10 dark:border-white/5">
              <tr>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Başlık</th>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Tarih</th>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Yönlendirme Linki</th>
                <th className="p-4 font-semibold text-right text-[#3D154B] dark:text-[#E0CFF2]">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {haberler.map((haber) => (
                <tr key={haber.documentId} className="border-b border-[#6A4C93]/5 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-[#3D154B] dark:text-white flex items-center gap-3">
                    <img src={haber.imageUrl || '/image_2.png'} alt="Kapak" className="w-10 h-10 rounded-lg object-cover" />
                    {haber.title}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{haber.date}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{haber.link}</td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    <Link href={`/admin/haberler/duzenle/${haber.documentId}`} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(haber.documentId)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
