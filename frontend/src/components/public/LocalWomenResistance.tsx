import React from 'react';
import Image from 'next/image';
import { Leaf, Users, Megaphone, ArrowRight, Sun, Shield } from 'lucide-react';
import Link from 'next/link';

export default function LocalWomenResistance() {
  return (
    <article className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[350px] md:h-[500px] rounded-[3rem] overflow-hidden mb-16 shadow-[0_20px_50px_rgba(16,185,129,0.15)] group bg-[#111827]">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1F0933] via-[#3D154B] to-[#D4AF37] opacity-80" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A101D] via-[#0A101D]/70 to-transparent z-10" />
        
        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-10">
           <Image 
            src="/image_2.png" 
            alt="Rosa Kadın Derneği" 
            width={500}
            height={500}
            className="object-contain blur-[1px]"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-1 bg-[#10B981] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
            <span className="text-[#10B981] font-bold tracking-[0.4em] uppercase text-xs md:text-sm drop-shadow-md">TOPRAĞIN VE YAŞAMIN SAVUNUCULARI</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-[#10B981] leading-tight drop-shadow-lg max-w-4xl mb-4">
            Yerel Kadın Direnişleri
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl drop-shadow-md">
            Sokakta, tarlada, fabrikada ve mahallede; kendi emeğini ve yaşam alanını savunan kadınların yerel dayanışma ağları.
          </p>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert prose-p:text-gray-700 dark:prose-p:text-gray-300 max-w-none prose-headings:font-serif prose-headings:text-[#3D154B] dark:prose-headings:text-white">
        
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20 bg-white dark:bg-[#1A1622] p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-800">
          <div className="lg:w-1/2">
            <h2 className="flex items-center gap-4 text-3xl font-bold mb-6 text-[#10B981]">
              <Sun className="w-8 h-8" /> Köklerden Gelen Güç
            </h2>
            <p className="text-lg leading-relaxed">
              Kadın mücadelesi sadece büyük salonlarda veya uluslararası platformlarda değil; en çok da yerelde, mahalle aralarında, fabrikalarda ve tarlalarda filizlenir. Coğrafyamızın direniş geleneği, kadınların günlük yaşamdaki hak arayışlarıyla şekillenmiştir.
            </p>
            <p className="text-lg leading-relaxed mb-0">
              Devletin veya sermayenin doğaya, emeğe ve kadın kimliğine yönelik saldırılarına karşı en güçlü kalkan, yan yana gelen yerel kadın ağları olmuştur. Bir zeytin ağacına sarılan teyzeden, tekstil fabrikasında sendika kuran genç kadına kadar; direnişin en doğal ve en cesur hali yerelden yükselmektedir.
            </p>
          </div>
          <div className="lg:w-1/2 relative h-[350px] w-full rounded-[2rem] overflow-hidden shadow-inner bg-[#FAF8F5] dark:bg-[#120F16]">
            <Image src="/image_2.png" alt="Rosa Logo" fill className="object-contain p-12" unoptimized />
            <div className="absolute inset-0 bg-green-500/5 mix-blend-multiply pointer-events-none" />
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-[#3D154B] dark:text-white flex justify-center items-center gap-3">
              <Shield className="w-8 h-8 text-[#10B981]" /> Direnişin 3 Temel Sütunu
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#F0FDF4] to-white dark:from-[#111827] dark:to-[#1A1622] p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-green-100 dark:border-green-900/30 group">
              <Leaf className="w-10 h-10 text-[#10B981] mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-[#10B981] mb-4">Ekolojik Mücadele</h4>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Hes'lere, maden şirketlerine ve orman kıyımlarına karşı toprağını ve suyunu savunan kadınlar, ekolojik direnişin en ön safında yer alıyor. Çünkü doğanın sömürüsü ile kadının sömürüsü aynı ataerkil-kapitalist kaynaktan beslenir.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#FAF5FF] to-white dark:from-[#111827] dark:to-[#1A1622] p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-purple-100 dark:border-purple-900/30 group">
              <Users className="w-10 h-10 text-[#6A4C93] mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-[#6A4C93] mb-4">Emek ve Sınıf Dayanışması</h4>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Görünmeyen ev içi emekten, tarım işçiliğine; güvencesiz tekstil atölyelerinden ofis plazalarına kadar eşit işe eşit ücret ve insanca yaşam talebiyle örgütlenen kadınların grevleri ve hak arayışları.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#FFFBEB] to-white dark:from-[#111827] dark:to-[#1A1622] p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-yellow-100 dark:border-yellow-900/30 group">
              <Megaphone className="w-10 h-10 text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-[#D4AF37] mb-4">Mahalle Dayanışma Ağları</h4>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Kadına yönelik şiddete karşı kapı komşusunun çığlığına ses veren, sokakları güvenli hale getirmek için inisiyatif alan ve özsavunma bilincini tabandan geliştiren mahalle meclisleri.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#064E3B] text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-overlay" />
          <h3 className="text-3xl font-serif font-black mb-6 relative z-10 text-white">Yerelde Birleş, Evrensele Yürü</h3>
          <p className="text-lg text-white/90 font-medium max-w-2xl mx-auto mb-10 relative z-10">
            Rosa Kadın Derneği olarak, yerel dinamiklerden doğan her bir direnişi selamlıyor ve bu dayanışma ağlarının bir parçası olmaktan gurur duyuyoruz. Kendi sokağından başlayarak dünyayı değiştiren kadınların yanındayız.
          </p>
          <Link href="/iletisim" className="relative z-10 inline-flex items-center gap-2 bg-white text-[#064E3B] px-8 py-4 rounded-full font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-xl hover:shadow-2xl">
            Mahalle Ağlarımıza Katıl <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
