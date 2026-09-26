'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import HistoryOfWomenStruggle from '@/components/public/HistoryOfWomenStruggle';
import MemorialPage from '@/components/public/MemorialPage';
import PioneeringWomen from '@/components/public/PioneeringWomen';
import LocalWomenResistance from '@/components/public/LocalWomenResistance';

export default function IcerikPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/strapi/articles?filters[slug][$eq]=${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          setArticle(data.data[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  // Removed full-page blocking loader to prevent layout shift and FOUC

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#FAF8F5] dark:bg-[#0F0C12]">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-[#6A4C93] dark:text-[#D4AF37] hover:underline font-bold mb-8">
          <ArrowLeft className="w-4 h-4" />
          Ana Sayfaya Dön
        </Link>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-[#6A4C93] border-t-transparent rounded-full"></div>
          </div>
        ) : slug === 'kadin-mucadelesinin-tarihi' ? (
          <HistoryOfWomenStruggle />
        ) : slug === 'katledilen-kadinlar-icin-anma-sayfalari' ? (
          <MemorialPage />
        ) : slug === 'oncu-kadinlarin-yasam-oykuleri' ? (
          <PioneeringWomen />
        ) : slug === 'yerel-kadin-direnisleri' ? (
          <LocalWomenResistance />
        ) : article ? (
          <article className="bg-white dark:bg-[#1A1622] rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800 animate-cinematic-reveal">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#6A4C93]/10 text-[#6A4C93] dark:bg-[#D4AF37]/20 dark:text-[#D4AF37] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                İçerik
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#3D154B] dark:text-white font-serif mb-8 leading-tight">
              {article.title}
            </h1>
            
            {article.imgUrl && (
              <div className="w-full h-[400px] rounded-3xl overflow-hidden mb-10 shadow-lg">
                <img src={article.imgUrl} alt={article.title} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div 
              className="prose prose-lg dark:prose-invert prose-purple max-w-none prose-headings:font-serif prose-headings:text-[#3D154B] dark:prose-headings:text-[#D4AF37]"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content || '<p>İçerik henüz eklenmedi.</p>') }}
            />
          </article>
        ) : (
          <div className="text-center py-20 animate-cinematic-reveal">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-500">İçerik Bulunamadı</h2>
            <p className="text-gray-400 mt-2">Aradığınız içerik henüz panele eklenmemiş olabilir. (Slug: {slug})</p>
          </div>
        )}
      </div>
    </div>
  );
}
