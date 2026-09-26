import React from 'react';
import Image from 'next/image';
import { Coins, TrendingDown, EyeOff, Briefcase, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function WomenPoverty() {
  return (
    <article className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[350px] md:h-[500px] rounded-[3rem] overflow-hidden mb-16 shadow-[0_20px_50px_rgba(212,175,55,0.15)] group bg-[#18151A]">
        
        {/* Abstract Economic Background */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30 z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="chart-lines" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 0 100 Q 25 50 50 75 T 100 0" fill="none" stroke="#D4AF37" strokeWidth="2" strokeOpacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#chart-lines)" />
          </svg>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#18151A] via-[#3D154B]/80 to-transparent z-10" />

        <div className="absolute inset-0 flex items-center justify-end z-0 opacity-30 pr-12">
           <Image 
            src="/image_2.png" 
            alt="Rosa Kadın Derneği" 
            width={600}
            height={600}
            className="object-contain grayscale blur-[2px] opacity-20"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-1 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"></span>
            <span className="text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-xs md:text-sm drop-shadow-md">EKONOMİK ŞİDDET VE EŞİTSİZLİK</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-[#D4AF37] leading-tight drop-shadow-lg max-w-4xl mb-4">
            Kadın Yoksulluğu
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl drop-shadow-md">
            Yoksulluğun bir cinsiyeti vardır. Dünyadaki ve ülkemizdeki ekonomik krizlerin en ağır bedelini, güvencesiz ve esnek çalışmaya itilen kadınlar ödemektedir.
          </p>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert prose-p:text-gray-700 dark:prose-p:text-gray-300 max-w-none prose-headings:font-serif prose-headings:text-[#3D154B] dark:prose-headings:text-white">
        
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6A4C93] dark:text-[#D4AF37] mb-6">
            Yoksulluğun Kadınlaşması
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            Ekonomik kaynaklara erişimdeki eşitsizlik, mirastan pay alamama, eğitim hakkından mahrum bırakılma ve istihdamdaki ayrımcılık; yoksulluğu yapısal olarak <strong>"kadınlaştırmaktadır"</strong>. Kadınlar, kapitalist-ataerkil sistemin en alt basamağında, en ucuz iş gücü olarak konumlandırılmaktadır.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white dark:bg-[#1A1622] p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-500 group">
            <EyeOff className="w-12 h-12 text-[#6A4C93] dark:text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-[#3D154B] dark:text-white mb-4 m-0">Görünmeyen Ev İçi Emek</h3>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Çocuk, hasta ve yaşlı bakımı ile ev işleri tamamen kadının omuzlarına yüklenmiştir. Karşılığı ödenmeyen bu devasa emek sömürüsü, kadının kamusal alana ve ücretli istihdama katılımını engellemektedir.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1A1622] p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-500 group">
            <Briefcase className="w-12 h-12 text-[#6A4C93] dark:text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-[#3D154B] dark:text-white mb-4 m-0">Güvencesiz Çalışma</h3>
            <p className="text-base text-gray-600 dark:text-gray-400">
              İstihdama dahil olabilen kadınlar ise genellikle merdiven altı atölyelerde, tarım işçiliğinde veya hizmet sektöründe sigortasız, sendikasız ve asgari ücretin çok altında koşullarda çalışmaya mecbur bırakılmaktadır.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1A1622] p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-500 group">
            <TrendingDown className="w-12 h-12 text-[#6A4C93] dark:text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-[#3D154B] dark:text-white mb-4 m-0">Ücret Eşitsizliği</h3>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Aynı işi yapmalarına rağmen kadınlar, erkek meslektaşlarından sistematik olarak daha az ücret almaktadır. Cam tavanlar ve terfi engelleri, ekonomik bağımsızlığın önündeki en büyük engellerden biridir.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20 bg-[#FAF8F5] dark:bg-[#201C29] p-8 md:p-12 rounded-[3rem] shadow-inner border border-yellow-100 dark:border-white/5">
          <div className="lg:w-1/2 relative h-[400px] w-full rounded-[2rem] overflow-hidden shadow-2xl bg-white dark:bg-[#120F16]">
            <Image src="/image_2.png" alt="Rosa Logo" fill className="object-contain p-12" unoptimized />
            <div className="absolute inset-0 bg-[#D4AF37]/5 mix-blend-multiply pointer-events-none" />
          </div>
          <div className="lg:w-1/2">
            <h3 className="flex items-center gap-4 text-3xl font-bold mb-6 text-[#3D154B] dark:text-white">
              <Coins className="w-8 h-8 text-[#D4AF37]" /> Ekonomik Şiddet
            </h3>
            <p className="text-lg leading-relaxed">
              Fiziksel şiddet kadar yaygın olan ancak daha az görünür kılınan şiddet türü: <strong>Ekonomik Şiddet</strong>. Kadının çalışmasına izin vermemek, kazandığı paraya veya mirasına el koymak, evin bütçesi hakkında bilgi vermemek veya kadını temel ihtiyaçlardan mahrum bırakmak ekonomik şiddettir.
            </p>
            <p className="text-lg leading-relaxed mb-0">
              Kadın yoksulluğu politik bir tercihtir. Yoksullaştırılan kadın, şiddet sarmalından çıkmak için ihtiyaç duyduğu maddi zemini kaybeder. Bu nedenle ekonomik özgürlük, şiddetsiz bir yaşamın en temel ön koşuludur.
            </p>
          </div>
        </div>

        <div className="text-center mt-12 bg-gradient-to-r from-[#3D154B] via-[#6A4C93] to-[#3D154B] text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/image_2.png')] opacity-10 bg-contain bg-center bg-no-repeat mix-blend-overlay" />
          <ShieldCheck className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
          <h3 className="text-3xl font-serif font-black mb-6 relative z-10 text-white">Ekonomik Şiddete Karşı Dayanışma</h3>
          <p className="text-lg text-white/90 font-medium max-w-2xl mx-auto mb-8 relative z-10">
            Ekonomik şiddete maruz kalıyor veya çalışma hakkınız engelleniyorsa, yasal haklarınız mevcuttur. Rosa Kadın Derneği olarak, ekonomik bağımsızlığınızı kazanma sürecinizde hukuki ve sosyal destek ağlarımızla yanınızdayız.
          </p>
          <Link href="/iletisim" className="relative z-10 inline-flex items-center gap-2 bg-[#D4AF37] text-[#3D154B] px-8 py-4 rounded-full font-bold tracking-widest uppercase hover:bg-white transition-colors shadow-xl hover:shadow-2xl">
            Destek Talep Edin <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
