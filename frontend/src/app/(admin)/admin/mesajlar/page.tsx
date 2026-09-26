"use client";
import React, { useEffect, useState } from "react";
import { Mail, Trash2, CheckCircle, Loader2, Circle, X, User, Phone, Info, Clock, AlignLeft, Eye } from "lucide-react";
import { useConfirm } from "@/context/ConfirmContext";
import toast from "react-hot-toast";

const decodeText = (text: string) => {
  if (!text) return '';
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
};

export default function MessagesAdminPage() {
  const { confirm } = useConfirm();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<any>(null);

  const fetchMessages = () => {
    fetch("/api/strapi/contact-messages")
      .then(res => res.json())
      .then(data => { setItems(data.data || []); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (documentId: string) => {
    const isConfirmed = await confirm({
      title: "Emin misiniz?",
      message: "Bu işlemi geri alamazsınız!",
      confirmText: "Evet, Sil!"
    });
    if (!isConfirmed) return;
    try {
      const res = await fetch(`/api/strapi/contact-messages/${documentId}`, { method: "DELETE" });
      if(res.ok) {
        setItems(prev => prev.filter(h => h.documentId !== documentId));
        toast.success("Kayıt başarıyla silindi!");
      } else {
        toast.error("Silme işlemi başarısız!");
      }
    } catch (err) { 
      console.error(err); 
      toast.error("Bir hata oluştu!");
    }
  };

  const handleToggleRead = async (documentId: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/strapi/contact-messages/${documentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { isRead: !currentStatus } })
      });
      if(res.ok) {
        setItems(prev => prev.map(item => item.documentId === documentId ? { ...item, isRead: !currentStatus } : item));
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white flex items-center gap-3">
          <Mail className="text-[#6A4C93] dark:text-[#D4AF37]" />Gelen Mesajlar
        </h1>
        <div className="text-sm text-gray-500 font-medium">Toplam {items.length} mesaj</div>
      </div>
      
      <div className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 flex justify-center text-[#6A4C93]"><Loader2 className="animate-spin w-8 h-8" /></div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-3">
            <Mail className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-2" />
            Henüz hiç mesaj yok.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#6A4C93]/5 dark:bg-white/5 border-b border-[#6A4C93]/10 dark:border-white/5">
              <tr>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2] w-12 text-center">Durum</th>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Gönderen</th>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">İletişim</th>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Konu</th>
                <th className="p-4 font-semibold text-[#3D154B] dark:text-[#E0CFF2]">Mesaj Özeti</th>
                <th className="p-4 font-semibold text-center text-[#3D154B] dark:text-[#E0CFF2] w-32">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr 
                  key={item.documentId} 
                  className={`border-b border-[#6A4C93]/5 dark:border-white/5 transition-all group hover:bg-[#6A4C93]/5 dark:hover:bg-white/10 cursor-pointer
                    ${item.isRead ? 'opacity-80 bg-gray-50/50 dark:bg-transparent' : 'bg-white/80 dark:bg-[#2A2436]/60 font-semibold shadow-[inset_4px_0_0_0_#D4AF37] dark:shadow-[inset_4px_0_0_0_#D4AF37]'}`}
                  onClick={() => setSelectedMsg(item)}
                >
                  <td className="p-4 text-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleToggleRead(item.documentId, item.isRead); }}
                      title={item.isRead ? "Okunmadı İşaretle" : "Okundu İşaretle"}
                      className={`p-1.5 rounded-full transition-transform hover:scale-110 ${item.isRead ? 'text-[#10B981]' : 'text-[#6A4C93] dark:text-[#D4AF37]'}`}
                    >
                      {item.isRead ? <CheckCircle size={20} /> : <Circle size={20} className="fill-current" />}
                    </button>
                  </td>
                  <td className="p-4 text-[#3D154B] dark:text-white whitespace-nowrap">{decodeText(item.name) || 'İsimsiz'}</td>
                  <td className="p-4 text-[#3D154B] dark:text-white whitespace-nowrap">{decodeText(item.contact)}</td>
                  <td className="p-4 text-[#3D154B] dark:text-[#D4AF37] whitespace-nowrap text-sm">{decodeText(item.subject) || '-'}</td>
                  <td className="p-4 text-[#5A5260] dark:text-[#B2AAC0] max-w-xs xl:max-w-md truncate">
                    {decodeText(item.message)}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedMsg(item); }} 
                        className="p-2 text-[#6A4C93] dark:text-[#E0CFF2] hover:bg-[#6A4C93]/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                        title="Detayları Gör"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(item.documentId); }} 
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Sil"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mesaj Detay Modalı */}
      {selectedMsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedMsg(null)}>
          <div 
            className="bg-white dark:bg-[#1A1622] border border-[#6A4C93]/10 dark:border-white/10 rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-white/95 dark:bg-[#1A1622]/95 backdrop-blur-md border-b border-[#6A4C93]/10 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedMsg.isRead ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#D4AF37]/10 text-[#D4AF37]'}`}>
                  <Mail size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#3D154B] dark:text-white">Mesaj Detayı</h2>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {selectedMsg.isRead ? 'Okundu' : 'Yeni / Okunmadı'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMsg(null)}
                className="p-2 text-gray-400 hover:text-[#3D154B] dark:hover:text-white bg-gray-100 dark:bg-white/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#F8F9FA] dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/5">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">
                    <User size={12} /> Gönderen
                  </div>
                  <div className="font-semibold text-[#3D154B] dark:text-white text-base">
                    {decodeText(selectedMsg.name) || 'İsimsiz / Gizli Başvuru'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">
                    <Phone size={12} /> İletişim Bilgisi
                  </div>
                  <div className="font-semibold text-[#3D154B] dark:text-[#D4AF37] text-base">
                    {decodeText(selectedMsg.contact)}
                  </div>
                </div>
                {selectedMsg.subject && (
                  <div className="sm:col-span-2">
                    <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">
                      <Info size={12} /> Başvuru Konusu
                    </div>
                    <div className="inline-block px-3 py-1 bg-[#3D154B]/10 dark:bg-[#D4AF37]/10 text-[#3D154B] dark:text-[#D4AF37] rounded-lg font-bold text-sm">
                      {decodeText(selectedMsg.subject)}
                    </div>
                  </div>
                )}
                {selectedMsg.createdAt && (
                  <div className="sm:col-span-2 border-t border-gray-200 dark:border-white/10 pt-4 mt-2">
                    <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1">
                      <Clock size={12} /> Gönderim Zamanı
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {new Date(selectedMsg.createdAt).toLocaleString('tr-TR')}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-gray-400 uppercase mb-3">
                  <AlignLeft size={12} /> Mesaj İçeriği
                </div>
                <div className="bg-white dark:bg-black/20 border border-gray-100 dark:border-white/10 rounded-2xl p-6 text-[#18151A] dark:text-[#E0CFF2] leading-relaxed whitespace-pre-wrap shadow-inner font-medium">
                  {decodeText(selectedMsg.message)}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-8 py-5 bg-gray-50 dark:bg-black/20 border-t border-[#6A4C93]/10 dark:border-white/5 flex justify-end gap-3 rounded-b-[2rem]">
              {!selectedMsg.isRead && (
                <button 
                  onClick={() => {
                    handleToggleRead(selectedMsg.documentId, selectedMsg.isRead);
                    setSelectedMsg({ ...selectedMsg, isRead: true });
                  }}
                  className="px-6 py-2.5 bg-[#3D154B] hover:bg-[#2F0F3A] dark:bg-[#D4AF37] dark:hover:bg-[#C39F2A] text-white dark:text-[#18151A] font-bold rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm"
                >
                  <CheckCircle size={16} /> Okundu İşaretle
                </button>
              )}
              <button 
                onClick={() => setSelectedMsg(null)}
                className="px-6 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition-all active:scale-95 text-sm"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
