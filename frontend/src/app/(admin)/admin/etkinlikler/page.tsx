"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Calendar, Trash2, Edit, Loader2, MapPin, Clock } from 'lucide-react';
import { useConfirm } from "@/context/ConfirmContext";
import toast from "react-hot-toast";

interface Event {
  documentId: string;
  title: string;
  date: string;
  type: string;
  locationOrLink: string;
  lang: string;
  createdAt: string;
}

export default function EtkinliklerPage() {
  const { confirm } = useConfirm();
  const [etkinlikler, setEtkinlikler] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLang, setActiveLang] = useState('TR');

  useEffect(() => {
    fetch('/api/strapi/events?sort=date:desc')
      .then(res => res.json())
      .then(data => {
        setEtkinlikler(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Etkinlikler çekilirken hata oluştu:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (documentId: string) => {
    const isConfirmed = await confirm({
      title: "Emin misiniz?",
      message: "Bu etkinliği silmek istediğinize emin misiniz? Bu işlem geri alınamaz!",
      confirmText: "Evet, Sil!"
    });
    if (!isConfirmed) return;

    try {
      const res = await fetch(`/api/strapi/events/${documentId}`, {
        method: 'DELETE'
      });
      if(res.ok) {
        setEtkinlikler(prev => prev.filter(h => h.documentId !== documentId));
        toast.success("Etkinlik başarıyla silindi!");
      } else {
        toast.error("Silme işlemi başarısız!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Bir hata oluştu!");
    }
  };

  const filteredEvents = etkinlikler.filter(e => (e.lang || 'TR') === activeLang);

  // Format Date Helper
  const formatTableDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' })} - ${d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto p-4 md:p-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-xl shadow-[#6A4C93]/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#3D154B] dark:text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-[#6A4C93] dark:text-[#D4AF37]" />
            Etkinlik ve Dava Takvimi
          </h1>
          <p className="text-[#6A4C93] dark:text-gray-400 mt-2">Sitede gösterilecek yaklaşan etkinlikleri ve dava tarihlerini yönetin.</p>
        </div>
        
        <Link 
          href="/admin/etkinlikler/ekle" 
          className="flex items-center gap-2 bg-gradient-to-tr from-[#6A4C93] to-[#D4AF37] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all shrink-0"
        >
          <Plus size={20} />
          Yeni Ekle
        </Link>
      </div>

      {/* Language Filter Tabs */}
      <div className="flex items-center gap-2 bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-xl p-2 w-max">
        {['TR', 'EN', 'KU'].map((l) => (
          <button
            key={l}
            onClick={() => setActiveLang(l)}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
              activeLang === l 
                ? 'bg-[#3D154B] text-white shadow-md' 
                : 'text-[#6A4C93] dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5'
            }`}
          >
            {l === 'TR' ? 'Türkçe' : l === 'EN' ? 'English' : 'Kurdî'}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl shadow-xl shadow-[#6A4C93]/5 overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-[#6A4C93] dark:text-[#E0CFF2]">
            <Loader2 size={32} className="animate-spin mb-4" />
            <p className="font-medium">Etkinlikler yükleniyor...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#6A4C93]/10 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-[#6A4C93] opacity-50" />
            </div>
            <p className="text-[#3D154B] dark:text-gray-400 font-medium text-lg">Bu dilde henüz hiç etkinlik eklenmemiş.</p>
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-[#6A4C93]/5 dark:bg-white/5 border-b border-[#6A4C93]/10 dark:border-white/5">
                <tr>
                  <th className="p-5 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Başlık</th>
                  <th className="p-5 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Tarih</th>
                  <th className="p-5 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Tip</th>
                  <th className="p-5 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Konum / Link</th>
                  <th className="p-5 font-semibold text-right text-[#3D154B] dark:text-[#E0CFF2]">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.documentId} className="border-b border-[#6A4C93]/5 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/5 transition-colors group">
                    <td className="p-5 font-bold text-[#3D154B] dark:text-white">
                      <div className="max-w-[250px] truncate" title={event.title}>
                        {event.title}
                      </div>
                    </td>
                    <td className="p-5 text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      {formatTableDate(event.date)}
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        event.type === 'Dava' 
                          ? 'bg-[#3D154B]/10 text-[#3D154B] dark:bg-[#6A4C93]/30 dark:text-[#E0CFF2]' 
                          : 'bg-[#D4AF37]/10 text-[#D4AF37] dark:bg-[#D4AF37]/20'
                      }`}>
                        {event.type || 'Etkinlik'}
                      </span>
                    </td>
                    <td className="p-5 text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2 max-w-[250px]">
                        <MapPin className="w-4 h-4 shrink-0 opacity-50" />
                        <span className="truncate" title={event.locationOrLink}>{event.locationOrLink || '-'}</span>
                      </div>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/etkinlikler/duzenle/${event.documentId}`} className="p-2 text-[#6A4C93] hover:bg-[#6A4C93]/10 dark:text-blue-400 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                          <Edit size={18} />
                        </Link>
                        <button onClick={() => handleDelete(event.documentId)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(106, 76, 147, 0.2); border-radius: 10px; }
      `}} />
    </div>
  );
}
