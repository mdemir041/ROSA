import React from 'react';
import Image from 'next/image';
import { Sparkles, Flame, ShieldCheck, Heart, History, BookOpen } from 'lucide-react';

export default function HistoryOfWomenStruggle() {
  return (
    <article className="w-full">
      {/* Hero Section inside Article */}
      <div className="relative w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-12 shadow-2xl group">
        <Image 
          src="/image_2.png" 
          alt="Kadın Mücadelesinin Tarihi" 
          fill 
          unoptimized
          className="object-contain p-12 transition-transform duration-1000 group-hover:scale-105 bg-white dark:bg-[#120F16]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F0933]/90 via-[#3D154B]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-1 bg-[#D4AF37] rounded-full"></span>
            <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-xs md:text-sm">TARİHSEL HAFIZA</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-tight drop-shadow-lg max-w-4xl">
            Kadın Mücadelesinin Tarihi
          </h1>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert prose-purple max-w-none prose-headings:font-serif prose-headings:text-[#3D154B] dark:prose-headings:text-[#D4AF37]">
        <p className="text-xl md:text-2xl font-serif italic text-[#6A4C93] dark:text-[#D4AF37] leading-relaxed mb-12 text-center max-w-4xl mx-auto">
          "Vardık, varız, var olacağız!" şiarı, yüzyıllar boyunca sömürüye, şiddete ve yok sayılmaya maruz kalan kadınların ortak isyanıdır. 
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
              <History className="w-8 h-8 text-[#D4AF37]" /> Ataerkil Sisteme Karşı Kökler
            </h2>
            <p>
              Kadınların binlerce yıldır süregelen eşitsizliğe ve ataerkil düzene karşı yürüttüğü mücadele; sadece bir cinsiyetin hak arayışı değil, tüm insanlığın özgürleşme serüvenidir. Tarihsel süreçte kadının toplumsal yaşamdan, üretimden ve karar mekanizmalarından dışlanmasına karşı ilk isyan kıvılcımları, eşit işe eşit ücret ve insanca yaşam talepleriyle atılmıştır.
            </p>
            <p>
              8 Mart'ı yaratan dokuma işçisi kadınların direnişi, Clara Zetkin ve Rosa Luxemburg gibi öncü kadınların entelektüel ve pratik mücadelesiyle küresel bir hak arayışına dönüşmüş, dünya genelinde kadın kitlelerini cesaretlendirmiştir.
            </p>
          </div>
          <div className="relative h-[300px] rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#120F16]">
            <Image src="/image_2.png" alt="Tarihsel Direniş" fill className="object-contain p-8" unoptimized />
            <div className="absolute inset-0 bg-[#6A4C93]/10 mix-blend-multiply pointer-events-none" />
          </div>
        </div>

        <div className="bg-[#FAF8F5] dark:bg-[#201C29] rounded-3xl p-8 md:p-12 mb-16 shadow-inner border border-gray-100 dark:border-white/5">
          <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
            <Flame className="w-8 h-8 text-[#FF6B6B]" /> Kürdistan ve Türkiye'de Kadın Hareketi
          </h2>
          <p>
            Yaşadığımız coğrafyada kadın mücadelesi, hem küresel feminist hareketin kazanımlarını hem de yerel direniş dinamiklerini harmanlayarak eşsiz bir güç oluşturmuştur. 1980'lerden itibaren sokağa çıkan, beden politikalarına, ev içi görünmeyen emeğe ve devlet şiddetine karşı ses yükselten kadınlar, bugün milyonları alanlarda birleştiren sarsılmaz bir iradeye dönüşmüştür.
          </p>
          <p>
            Özellikle Kürt kadın hareketinin dünya literatürüne ve mücadele tarihine kazandırdığı <strong>"Jin, Jiyan, Azadî"</strong> (Kadın, Yaşam, Özgürlük) felsefesi; kadının özgürleşmediği bir toplumun hiçbir zaman özgürleşemeyeceği gerçeğini tüm dünyaya haykırmaktadır. Bu felsefe, salt bir slogan olmanın ötesinde, yeni ve eşitlikçi bir yaşam inşasının temel direğidir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div className="order-2 md:order-1 relative h-[300px] rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#120F16]">
            <Image src="/image_2.png" alt="Rosa Kadın Derneği" fill className="object-contain p-8" unoptimized />
            <div className="absolute inset-0 bg-[#3D154B]/5 mix-blend-multiply pointer-events-none" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="flex items-center gap-3 text-3xl font-bold mb-6">
              <ShieldCheck className="w-8 h-8 text-[#10B981]" /> Rosa Kadın Derneği'nin Rolü
            </h2>
            <p>
              Adımızı, inançları uğruna boyun eğmeyen direnişçi kadınlardan ve Rosa Luxemburg'un kararlı mücadelesinden alıyoruz. Dün dokuma tezgahlarında, sokaklarda, meydanlarda direnen kadınların mirasını; bugün Diyarbakır'da, mahkemelerde ve dayanışma atölyelerinde yaşatıyoruz.
            </p>
            <p>
              Rosa Kadın Derneği olarak, şiddetsiz bir dünya tahayyülünü gerçeğe dönüştürmek, her türlü ayrımcılığa karşı durmak ve kadınların sosyal, hukuki, psikolojik haklarını savunmak için bu köklü tarihten güç alıyoruz.
            </p>
          </div>
        </div>

        <div className="text-center mt-12 bg-gradient-to-r from-[#1F0933] via-[#6A4C93] to-[#1F0933] text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/image_2.png')] opacity-10 bg-cover bg-center mix-blend-overlay" />
          <Heart className="w-16 h-16 text-[#D4AF37] mx-auto mb-6 drop-shadow-lg" />
          <h3 className="text-3xl font-serif font-black mb-4">Mücadele Devam Ediyor</h3>
          <p className="text-lg text-white/90 font-medium max-w-2xl mx-auto">
            Bizler, eşit ve özgür bir yaşam inşa edene dek bu tarihi yazmaya devam edeceğiz. Çünkü biliyoruz ki: Kadınların birleşik mücadelesi, tüm engelleri aşacak tek güçtür.
          </p>
        </div>
      </div>
    </article>
  );
}
