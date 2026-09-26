"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Building2, Trash2, Edit, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useConfirm } from "@/context/ConfirmContext";
import toast from "react-hot-toast";

interface BankaHesabi {
  id: number;
  documentId: string;
  bankName: string;
  accountHolder: string;
  iban: string;
  branch?: string;
  isActive: boolean;
}

export default function BankaHesaplariPage() {
  const { confirm } = useConfirm();
  const [hesaplar, setHesaplar] = useState<BankaHesabi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/strapi/banka-hesabis')
      .then(res => res.json())
      .then(data => {
        setHesaplar(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Banka hesapları çekilirken hata oluştu:", err);
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
      const res = await fetch(`/api/strapi/banka-hesabis/${documentId}`, {
        method: 'DELETE'
      });
      if(res.ok) {
        setHesaplar(prev => prev.filter(h => h.documentId !== documentId));
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
      
      <div className="flex justify-between items-center bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-[#6A4C93]/5">
        <div>
          <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white flex items-center gap-3">
            <Building2 className="text-amber-500" />
            Banka Hesapları Yönetimi
          </h1>
          <p className="text-[#6A4C93] dark:text-gray-400 mt-1">Bağış ve aidat hesaplarınızı buradan ekleyebilir ve güncelleyebilirsiniz.</p>
        </div>
        
        <Link 
          href="/admin/banka-hesaplari/ekle" 
          className="flex items-center gap-2 bg-gradient-to-tr from-amber-500 to-orange-400 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          <Plus size={20} />
          Yeni Hesap Ekle
        </Link>
      </div>

      <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl shadow-xl shadow-[#6A4C93]/5 overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-[#6A4C93] dark:text-[#E0CFF2]">
            <Loader2 size={32} className="animate-spin mb-4" />
            <p>Banka hesapları yükleniyor...</p>
          </div>
        ) : hesaplar.length === 0 ? (
          <div className="p-12 text-center text-gray-500">Henüz hiç banka hesabı eklenmemiş.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-[#6A4C93]/5 dark:bg-white/5 border-b border-[#6A4C93]/10 dark:border-white/5">
              <tr>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Banka Adı</th>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Hesap Sahibi</th>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">IBAN</th>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Durum</th>
                <th className="p-4 font-semibold text-right text-[#3D154B] dark:text-[#E0CFF2]">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {hesaplar.map((hesap) => (
                <tr key={hesap.documentId} className="border-b border-[#6A4C93]/5 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-[#3D154B] dark:text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <Building2 size={20} />
                    </div>
                    {hesap.bankName}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{hesap.accountHolder}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400 font-mono text-sm">{hesap.iban}</td>
                  <td className="p-4">
                    {hesap.isActive ? (
                      <span className="flex items-center gap-1 text-emerald-500 text-sm font-medium"><CheckCircle2 size={16}/> Aktif</span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-400 text-sm font-medium"><AlertCircle size={16}/> Pasif</span>
                    )}
                  </td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    <Link href={`/admin/banka-hesaplari/duzenle/${hesap.documentId}`} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(hesap.documentId)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
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
