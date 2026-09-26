"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Users, Trash2, Edit, Loader2 } from "lucide-react";
import { useConfirm } from "@/context/ConfirmContext";
import toast from "react-hot-toast";

export default function EkipPage() {
  const { confirm } = useConfirm();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/strapi/team-members")
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
      const res = await fetch(`/api/strapi/team-members/${documentId}`, { method: "DELETE" });
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

  const [selectedLang, setSelectedLang] = useState<string>("TÜMÜ");

  const uniqueLangs = ["TÜMÜ", ...Array.from(new Set(items.map((item) => item.lang).filter(Boolean)))];
  const filteredItems = selectedLang === "TÜMÜ" ? items : items.filter((item) => item.lang === selectedLang);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white flex items-center gap-3">
          <Users className="text-[#6A4C93] dark:text-[#D4AF37]" /> Takım Üyeleri (Ekibimiz)
        </h1>
        <Link href="/admin/ekip/ekle" className="flex items-center gap-2 bg-gradient-to-tr from-[#6A4C93] to-[#D4AF37] hover:from-[#5A3C83] hover:to-[#C49F27] transition-all text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl">
          <Plus size={20} /> Yeni Ekle
        </Link>
      </div>

      {/* Language Filter Tabs */}
      {!loading && items.length > 0 && (
        <div className="flex items-center gap-2 bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-2 overflow-x-auto custom-scrollbar">
          {uniqueLangs.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                selectedLang === lang 
                  ? "bg-gradient-to-r from-[#6A4C93] to-[#D4AF37] text-white shadow-md" 
                  : "bg-transparent text-[#3D154B] dark:text-[#E0CFF2] hover:bg-[#6A4C93]/10 dark:hover:bg-white/5"
              }`}
            >
              {lang === "TÜMÜ" ? "TÜM DİLLER" : lang}
            </button>
          ))}
        </div>
      )}

      <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl overflow-hidden">
        {loading ? <div className="p-12 flex justify-center text-[#6A4C93]"><Loader2 className="animate-spin" /></div> : filteredItems.length === 0 ? <div className="p-12 text-center text-gray-500">Bu dilde kayıt bulunamadı.</div> : (
          <table className="w-full text-left">
            <thead className="bg-[#6A4C93]/5 dark:bg-white/5 border-b border-[#6A4C93]/10 dark:border-white/5">
              <tr>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">İsim</th>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Unvan</th>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Dil</th>
                <th className="p-4 font-semibold text-right text-[#3D154B] dark:text-[#E0CFF2]">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.documentId} className="border-b border-[#6A4C93]/5 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-[#3D154B] dark:text-white flex items-center gap-3">
                    <img src={item.imageUrl || '/image_2.png'} alt="Kapak" className="w-10 h-10 rounded-lg object-cover" />
                    {item.name}
                  </td>
                  <td className="p-4 font-medium text-[#3D154B] dark:text-white">{item.title}</td>
                  <td className="p-4 font-medium"><span className="px-3 py-1 bg-[#6A4C93]/10 dark:bg-white/10 text-[#6A4C93] dark:text-[#D4AF37] rounded-lg text-xs font-bold">{item.lang}</span></td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    <Link href={`/admin/ekip/duzenle/${item.documentId}`} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                      <Edit size={18} />
                    </Link>
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
