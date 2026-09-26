"use client";
import { toast } from 'react-hot-toast';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import LanguageSelector from "@/components/admin/LanguageSelector";
import IconLibraryModal from "@/components/admin/IconLibraryModal";

const THEME_OPTIONS = [
  { value: "purple", label: "Mor (Asil Mor)", bg: "bg-[#6A4C93]" },
  { value: "orange", label: "Mercan (Umut)", bg: "bg-[#FF6B5B]" },
  { value: "green", label: "Yeşil (Dayanışma)", bg: "bg-[#10B981]" },
  { value: "yellow", label: "Altın (Özgürlük)", bg: "bg-[#D4AF37]" },
];

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    lang: "TR",
    title: "",
    badge: "",
    desc: "",
    extra: "",
    dbIconStr: "ShieldCheck",
    colorTheme: "purple",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/strapi/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });
      if (res.ok) {
        toast.success("Çalışma alanı başarıyla eklendi!");
        router.push("/admin/alanlar");
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
        <Link href="/admin/alanlar" className="p-2 hover:bg-white/50 dark:hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft className="text-[#3D154B] dark:text-white" />
        </Link>
        <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white">Yeni Çalışma Alanı Ekle</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-8 space-y-6 shadow-xl shadow-[#6A4C93]/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">Dil</label>
            <LanguageSelector value={formData.lang} onChange={(val) => setFormData({ ...formData, lang: val })} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">Renk Teması</label>
            <select
              value={formData.colorTheme}
              onChange={(e) => setFormData({ ...formData, colorTheme: e.target.value })}
              className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#6A4C93] dark:text-white font-medium"
            >
              {THEME_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">Başlık</label>
            <input
              required
              type="text"
              className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6A4C93] dark:text-white"
              placeholder="Örn: Hukuki Destek & Emsal Dava Takibi"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">Rozet (Badge)</label>
            <input
              type="text"
              className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6A4C93] dark:text-white"
              placeholder="Örn: Hukuk / Savunuculuk"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">İkon Seçimi</label>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 dark:text-white font-mono text-sm">
              {formData.dbIconStr || "İkon seçilmedi"}
            </div>
            <button
              type="button"
              onClick={() => setIsIconModalOpen(true)}
              className="flex items-center gap-2 bg-[#6A4C93]/10 hover:bg-[#6A4C93]/20 dark:bg-white/10 dark:hover:bg-white/20 text-[#6A4C93] dark:text-[#D4AF37] px-5 py-3 rounded-xl font-semibold transition-colors"
            >
              <Sparkles size={18} /> İkon Seç
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">Kısa Açıklama (Kart Metni)</label>
          <textarea
            required
            rows={3}
            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6A4C93] dark:text-white"
            placeholder="Kart üzerinde görünecek özet açıklama..."
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">Detaylı Açıklama (Modal İçi)</label>
          <textarea
            rows={5}
            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6A4C93] dark:text-white"
            placeholder="Modala tıklandığında açılacak kapsamlı bilgi..."
            value={formData.extra}
            onChange={(e) => setFormData({ ...formData, extra: e.target.value })}
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

      <IconLibraryModal
        isOpen={isIconModalOpen}
        onClose={() => setIsIconModalOpen(false)}
        onSelect={(iconName) => setFormData({ ...formData, dbIconStr: iconName })}
      />
    </div>
  );
}
