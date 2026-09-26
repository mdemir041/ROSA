"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, FileText, Trash2, Edit, Loader2 } from "lucide-react";
import { useConfirm } from "@/context/ConfirmContext";
import toast from "react-hot-toast";

export default function RaporlarPage() {
  const { confirm } = useConfirm();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/strapi/rapors?sort=createdAt:desc")
      .then(res => res.json())
      .then(data => { setItems(data.data || []); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const handleDelete = async (documentId: string) => {
    const isConfirmed = await confirm({
      title: "Emin misiniz?",
      message: "Bu işlemi geri alamazsınız!",
      confirmText: "Evet, Sil!"
    });
    if (!isConfirmed) return;
    
    try {
      const res = await fetch(`/api/strapi/rapors/${documentId}`, { method: "DELETE" });
      if(res.ok) {
        setItems(prev => prev.filter(h => h.documentId !== documentId));
        toast.success("Kayıt başarıyla silindi!");
      } else {
        toast.error("Silme işlemi başarısız!");
      }
    } catch (err) { 
      console.error(err); 
      toast.error("Silme işlemi başarısız!");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white flex items-center gap-3">
          <FileText className="text-[#6A4C93] dark:text-[#D4AF37]" />Rapor Yönetimi
        </h1>
        <Link href="/admin/raporlar/ekle" className="flex items-center gap-2 bg-gradient-to-tr from-[#6A4C93] to-[#D4AF37] hover:from-[#5A3C83] hover:to-[#C49F27] transition-all text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl">
          <Plus size={20} /> Yeni Rapor Ekle
        </Link>
      </div>

      <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center text-[#6A4C93]"><Loader2 className="animate-spin" /></div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-gray-500">Kayıt bulunamadı.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-[#6A4C93]/5 dark:bg-white/5 border-b border-[#6A4C93]/10 dark:border-white/5">
              <tr>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Başlık</th>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Açıklama</th>
                <th className="p-4 font-semibold text-right text-[#3D154B] dark:text-[#E0CFF2]">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.documentId} className="border-b border-[#6A4C93]/5 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-[#3D154B] dark:text-white w-1/3">{item.title}</td>
                  <td className="p-4 text-[#3D154B]/80 dark:text-white/80 w-1/2">
                    {item.desc && item.desc.length > 80 ? item.desc.substring(0, 80) + "..." : item.desc}
                  </td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    <button onClick={() => handleDelete(item.documentId)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
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
