import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, BookOpen, Quote, ArrowRight, Award } from 'lucide-react';

export default function PioneeringWomen() {
  return (
    <article className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[350px] md:h-[500px] rounded-[3rem] overflow-hidden mb-16 shadow-[0_20px_50px_rgba(212,175,55,0.15)] group bg-[#FAF8F5] dark:bg-[#120F16]">
        {/* Soft, warm abstract background */}
        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[120%] bg-gradient-to-bl from-[#D4AF37]/20 to-transparent rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[100%] bg-gradient-to-tr from-[#6A4C93]/20 to-transparent rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-1000" />
        
        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-10 dark:opacity-[0.03]">
           <Image 
            src="/image_2.png" 
            alt="Öncü Kadınlar Logosu" 
            width={600}
            height={600}
            className="object-contain"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent dark:from-[#0F0C12]/90 dark:via-[#0F0C12]/40 z-10" />

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-[#6A4C93] rounded-full"></span>
            <span className="text-[#6A4C93] dark:text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-xs md:text-sm">İLHAM VERENLER</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#3D154B] via-[#6A4C93] to-[#D4AF37] dark:from-[#D4AF37] dark:via-[#FDE68A] dark:to-[#D4AF37] leading-tight drop-shadow-sm max-w-4xl mb-4">
            Öncü Kadınların Öyküleri
          </h1>
          <p className="text-lg md:text-xl text-[#3D154B]/80 dark:text-white/80 font-medium max-w-2xl">
            Sınırları çizenlere inat, kendi ufkunu yaratanların hikayesi.
          </p>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert prose-p:text-gray-700 dark:prose-p:text-gray-300 max-w-none prose-headings:font-serif prose-headings:text-[#3D154B] dark:prose-headings:text-white">
        
        <div className="bg-white dark:bg-[#1A1622] border border-gray-100 dark:border-gray-800 rounded-[3rem] p-10 md:p-16 mb-16 shadow-xl relative overflow-hidden">
          <Quote className="absolute top-8 right-8 w-24 h-24 text-[#D4AF37]/10 rotate-12" />
          <p className="text-2xl md:text-3xl font-serif text-center max-w-3xl mx-auto text-[#3D154B] dark:text-[#D4AF37] leading-relaxed relative z-10">
            "Kuşatılmış bir dünyada, düşünmek ve üretmek en büyük isyandır. Bizler, bizden önce yürüyenlerin açtığı o aydınlık yoldan ilerliyoruz."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#D4AF37]/20 to-[#6A4C93]/20 rounded-[3rem] blur-xl opacity-50" />
            <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden border-2 border-white dark:border-white/10 shadow-2xl bg-white dark:bg-[#120F16] flex items-center justify-center">
              <Image src="/image_2.png" alt="Rosa Logo" fill className="object-contain p-16" unoptimized />
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="flex items-center gap-4 text-4xl font-bold mb-8 text-[#3D154B] dark:text-white">
              <Star className="w-10 h-10 text-[#D4AF37]" /> Tarihe Yön Verenler
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Bilimde, sanatta, siyasette ve toplumsal mücadele alanlarında "yapamazsın" denileni yapan, tabuları yıkan ve kendi küllerinden doğan kadınlar, insanlık tarihinin gerçek mimarlarıdır.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              Onların hikayeleri sadece geçmişin tozlu raflarında kalmış anılar değil; bugün sokakta hakkını arayan, fabrikada eşit ücret talep eden, akademide var olma savaşı veren her bir kadının taşıdığı bayraktır.
            </p>
            <div className="bg-[#FAF8F5] dark:bg-[#201C29] p-6 rounded-2xl border-l-4 border-[#6A4C93] dark:border-[#D4AF37]">
              <h4 className="font-bold text-[#3D154B] dark:text-[#D4AF37] flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5" /> İlham Kaynağı
              </h4>
              <p className="text-sm m-0">
                Rosa Kadın Derneği olarak, öncü kadınların biyografilerini, eserlerini ve mücadele pratiklerini bir rehber olarak kabul ediyor, yeni nesil kadınlara aktarmayı görev biliyoruz.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#3D154B] dark:text-white flex justify-center items-center gap-3">
              <Award className="w-8 h-8 text-[#D4AF37]" /> Mirasımızı Devraldığımız Alanlar
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Bilim ve Keşif", desc: "Laboratuvar kapılarından kovulsalar da pes etmeyen, evrenin sırlarını çözen kadın bilim insanlarının inatçı zekası." },
              { title: "Sanat ve Edebiyat", desc: "Erkek egemen sanat dünyasında kendi fırçasını, kendi kalemini yaratan ve hislerini kitlelere ulaştıran yaratıcı kadınlar." },
              { title: "Siyasal Mücadele", desc: "Seçme ve seçilme hakkı için zindanları göze alan Süfrajetler'den, bugün eşitlik için direnen siyasetçi kadınlara..." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-[#1A1622] p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-500 group">
                <h4 className="text-xl font-bold text-[#6A4C93] dark:text-[#D4AF37] mb-4 group-hover:text-[#D4AF37] transition-colors">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 bg-gradient-to-br from-[#6A4C93] to-[#3D154B] text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/image_2.png')] opacity-5 bg-contain bg-center bg-no-repeat mix-blend-overlay" />
          <h3 className="text-3xl font-serif font-black mb-6 relative z-10 text-white">Hikaye Henüz Bitmedi</h3>
          <p className="text-lg text-white/90 font-medium max-w-2xl mx-auto mb-8 relative z-10">
            Geçmişin öncü kadınları bizlere dev bir miras bıraktı. Şimdi o mirası devralıp, kendi isimlerimizi özgürlüğün tarihine altın harflerle yazdırma sırası bizde.
          </p>
          <Link href="/iletisim" className="relative z-10 inline-flex items-center gap-2 bg-white text-[#3D154B] px-8 py-4 rounded-full font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-xl hover:shadow-2xl">
            Kendi Öykünü Yarat <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
