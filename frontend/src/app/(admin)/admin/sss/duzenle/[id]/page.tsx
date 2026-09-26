"use client";
import { toast } from 'react-hot-toast';
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, ArrowLeft, Loader2, HelpCircle } from "lucide-react";
import Link from "next/link";
import LanguageSelector from "@/components/admin/LanguageSelector";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [formData, setFormData] = useState({ lang: "TR", title: "", desc: "", link: "" });

  useEffect(() => {
    if (!id) return;
    fetch(`/api/strapi/faqs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setFormData({
            lang: data.data.lang || "TR",
            title: data.data.title || "",
            desc: data.data.desc || "",
            link: data.data.link || ""
          });
        }
        setInitLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setInitLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/strapi/faqs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: Object.fromEntries(
            Object.entries(formData).filter(([k]) => !['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt'].includes(k))
          )
        })
      });
      if (res.ok) {
        toast.success("S.S.S. maddesi başarıyla güncellendi!");
        router.push("/admin/sss");
      } else {
        const errData = await res.json().catch(() => ({}));
        toast.error(errData?.error?.message || "İşlem sırasında bir hata oluştu!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "İşlem sırasında bir hata oluştu!");
    }
    setLoading(false);
  };

  if (initLoading) {
    return (
      <div className="p-12 flex justify-center items-center">
        <Loader2 className="animate-spin w-10 h-10 text-[#6A4C93] dark:text-[#D4AF37]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href="/admin/sss" className="p-2 hover:bg-white/50 dark:hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft className="text-[#3D154B] dark:text-white" />
        </Link>
        <h1 className="text-2xl font-bold text-[#3D154B] dark:text-white flex items-center gap-2">
          <HelpCircle className="text-[#6A4C93] dark:text-[#D4AF37]" size={24} />
          S.S.S. Maddesini Düzenle
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/60 dark:bg-[#2A2436]/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/5 rounded-2xl p-8 space-y-6 shadow-xl shadow-[#6A4C93]/5">
        <div>
          <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">Dil</label>
          <LanguageSelector value={formData.lang} onChange={(val) => setFormData({ ...formData, lang: val })} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">Soru</label>
          <input
            required
            type="text"
            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6A4C93] dark:text-white"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">Cevap</label>
          <textarea
            required
            rows={5}
            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6A4C93] dark:text-white"
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#3D154B] dark:text-gray-300 mb-2">Ek Bağlantı / Link (İsteğe Bağlı)</label>
          <input
            type="text"
            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6A4C93] dark:text-white"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-tr from-[#6A4C93] to-[#D4AF37] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save />} Güncelle
        </button>
      </form>
    </div>
  );
}
