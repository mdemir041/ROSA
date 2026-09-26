"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Newspaper, Trash2, Edit, Loader2 } from 'lucide-react';
import { useConfirm } from "@/context/ConfirmContext";
import toast from "react-hot-toast";

interface MediaItem {
  id: number;
  documentId: string;
  title: string;
  desc: string;
  typeCode: string;
  badge: string;
  date: string;
  lang: string;
}

export default function MedyaPage() {
  const { confirm } = useConfirm();
  const [medyalar, setMedyalar] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/strapi/medias')
      .then(res => res.json())
      .then(data => {
        setMedyalar(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Medya içerikleri çekilirken hata oluştu:", err);
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
      const res = await fetch(`/api/strapi/medias/${documentId}`, {
        method: 'DELETE'
      });
      if(res.ok) {
        setMedyalar(prev => prev.filter(m => m.documentId !== documentId));
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
            Medya & Raporlar Yönetimi
          </h1>
          <p className="text-[#6A4C93] dark:text-gray-400 mt-1">Ana sayfadaki öne çıkan Medya ve Raporlar bölümünü yönetin.</p>
        </div>
        
        <Link 
          href="/admin/medya/ekle" 
          className="flex items-center gap-2 bg-gradient-to-tr from-[#6A4C93] to-[#D4AF37] text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          <Plus size={20} />
          Yeni Medya Ekle
        </Link>
      </div>

      <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl shadow-xl shadow-[#6A4C93]/5 overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-[#6A4C93] dark:text-[#E0CFF2]">
            <Loader2 size={32} className="animate-spin mb-4" />
            <p>Medya içerikleri yükleniyor...</p>
          </div>
        ) : medyalar.length === 0 ? (
          <div className="p-12 text-center text-gray-500">Henüz hiç medya içeriği eklenmemiş.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-[#6A4C93]/5 dark:bg-white/5 border-b border-[#6A4C93]/10 dark:border-white/5">
              <tr>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Başlık</th>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Tür</th>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Tarih</th>
                <th className="p-4 font-semibold text-right text-[#3D154B] dark:text-[#E0CFF2]">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {medyalar.map((medya) => (
                <tr key={medya.documentId} className="border-b border-[#6A4C93]/5 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-[#3D154B] dark:text-white">
                    {medya.title}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-xs uppercase font-bold tracking-wider">{medya.typeCode}</span>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{medya.date}</td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    <Link href={`/admin/medya/duzenle/${medya.documentId}`} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(medya.documentId)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
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
