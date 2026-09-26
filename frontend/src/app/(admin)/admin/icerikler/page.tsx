"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, FileText } from 'lucide-react';

interface Article {
  documentId: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  createdAt: string;
}

export default function IceriklerPage() {
  const [icerikler, setIcerikler] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/strapi/articles?sort=createdAt:desc')
      .then(res => res.json())
      .then(data => {
        setIcerikler(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("İçerikler yüklenirken hata:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (documentId: string) => {
    if (confirm("Bu içeriği silmek istediğinize emin misiniz?")) {
      try {
        await fetch(`/api/strapi/articles/${documentId}`, { method: 'DELETE' });
        setIcerikler(icerikler.filter(h => h.documentId !== documentId));
      } catch (err) {
        console.error("Silme hatası:", err);
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Yükleniyor...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3D154B] dark:text-white flex items-center gap-3">
            <FileText className="w-8 h-8 text-[#6A4C93]" />
            İçerikler & Bilgilendirme
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Sitenin menülerinde yer alan uzun metinleri yönetin</p>
        </div>
        <Link 
          href="/admin/icerikler/ekle" 
          className="flex items-center gap-2 bg-[#6A4C93] hover:bg-[#523A73] text-white px-5 py-2.5 rounded-xl transition-colors font-medium shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Yeni Ekle
        </Link>
      </div>

      <div className="bg-white dark:bg-[#1A1622] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-[#201C29] border-b border-gray-100 dark:border-gray-800">
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Başlık</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Kategori</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Tarih</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {icerikler.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">Henüz içerik bulunmuyor.</td>
              </tr>
            ) : (
              icerikler.map((b) => (
                <tr key={b.documentId} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-[#201C29]/50">
                  <td className="p-4 font-medium text-gray-900 dark:text-white">{b.title}</td>
                  <td className="p-4">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold">{b.category}</span>
                  </td>
                  <td className="p-4 text-gray-500 dark:text-gray-400">
                    {new Date(b.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link href={`/admin/icerikler/duzenle/${b.documentId}`} className="inline-block p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                      <Edit2 className="w-5 h-5" />
                    </Link>
                    <button onClick={() => handleDelete(b.documentId)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
