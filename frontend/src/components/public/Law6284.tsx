import React from 'react';
import Image from 'next/image';
import { Shield, FileWarning, Scale, ArrowRight, CheckSquare, BellRing } from 'lucide-react';
import Link from 'next/link';

export default function Law6284() {
  return (
    <article className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[350px] md:h-[500px] rounded-[3rem] overflow-hidden mb-16 shadow-[0_20px_50px_rgba(255,59,48,0.15)] group bg-[#1A1520]">
        
        {/* Abstract Protection Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0F0C12] via-[#2A1115] to-[#4A1525] opacity-90" />
          <svg className="absolute w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="shield-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 5 L50 15 L50 35 C50 45 40 55 30 55 C20 55 10 45 10 35 L10 15 Z" fill="none" stroke="#FF3B30" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#shield-pattern)" />
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-[0.03]">
           <Image 
            src="/image_2.png" 
            alt="Rosa Kadın Derneği" 
            width={600}
            height={600}
            className="object-contain grayscale"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-1 bg-[#FF3B30] rounded-full shadow-[0_0_10px_rgba(255,59,48,0.8)]"></span>
            <span className="text-[#FF3B30] font-bold tracking-[0.4em] uppercase text-xs md:text-sm drop-shadow-md">KORUYUCU VE ÖNLEYİCİ KALKANIMIZ</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-[#FF3B30] leading-tight drop-shadow-lg max-w-4xl mb-4">
            6284 Sayılı Kanun
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl drop-shadow-md">
            Şiddet karşısında susmak zorunda değilsiniz. 6284 Sayılı Kanun, şiddete uğrayan veya uğrama tehlikesi bulunan kadınların en güçlü yasal güvencesidir.
          </p>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert prose-p:text-gray-700 dark:prose-p:text-gray-300 max-w-none prose-headings:font-serif prose-headings:text-[#3D154B] dark:prose-headings:text-white">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#FF3B30] mb-6 drop-shadow-sm">
            6284 Yaşatır!
          </h2>
          <p className="text-xl italic text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            "Ailenin Korunması ve Kadına Karşı Şiddetin Önlenmesine Dair Kanun", kadın hareketinin yıllarca süren mücadelesi sonucunda kazanılmış hayati bir haktır. Tartışmaya açılamaz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-start">
          <div className="bg-white dark:bg-[#1A1622] p-8 md:p-10 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-800 relative h-full">
            <Shield className="absolute top-8 right-8 w-24 h-24 text-[#FF3B30]/10" />
            <h3 className="flex items-center gap-3 text-2xl font-bold mb-6 text-[#3D154B] dark:text-white relative z-10">
              <Scale className="w-8 h-8 text-[#FF3B30]" /> Kanun Neleri Kapsar?
            </h3>
            <p className="relative z-10 text-base">
              6284 sayılı kanun, şiddetin fiziksel olması şartını aramaz. Psikolojik, cinsel, ekonomik veya sözlü şiddet durumlarında da derhal uygulanır. <strong>En önemli özelliği; koruma kararı almak için darp raporu veya delil aranmamasıdır.</strong> Kadının beyanı esastır.
            </p>
            <p className="relative z-10 text-base">
              Sağladığı başlıca tedbirler:
            </p>
            <ul className="list-none pl-0 space-y-3 mt-4 relative z-10">
              <li className="flex items-start gap-3">
                <CheckSquare className="w-5 h-5 text-[#FF3B30] shrink-0 mt-1" />
                <span className="text-sm">Failin evden veya iş yerinden <strong>uzaklaştırılması</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckSquare className="w-5 h-5 text-[#FF3B30] shrink-0 mt-1" />
                <span className="text-sm">İletişim araçlarıyla (telefon, mesaj) rahatsız etmesinin engellenmesi.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckSquare className="w-5 h-5 text-[#FF3B30] shrink-0 mt-1" />
                <span className="text-sm">Adres ve kimlik bilgilerinin resmi kayıtlarda <strong>gizlenmesi</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckSquare className="w-5 h-5 text-[#FF3B30] shrink-0 mt-1" />
                <span className="text-sm">Geçici maddi yardım (nafaka) bağlanması ve barınma yeri (sığınak) sağlanması.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#FAF8F5] dark:bg-[#201C29] p-8 md:p-10 rounded-[3rem] shadow-inner border border-gray-200 dark:border-white/5 h-full">
            <h3 className="flex items-center gap-3 text-2xl font-bold mb-6 text-[#3D154B] dark:text-white">
              <FileWarning className="w-8 h-8 text-[#6A4C93] dark:text-[#D4AF37]" /> Nasıl Başvurulur?
            </h3>
            <p className="text-base">
              Şiddete maruz kaldığınızda veya tehdit altındayken vakit kaybetmeden koruma talep edebilirsiniz. Başvuru süreci tamamen <strong>ücretsizdir</strong>.
            </p>
            <div className="bg-white dark:bg-[#120F16] p-6 rounded-2xl shadow-sm my-6 border border-gray-100 dark:border-gray-800">
              <ul className="list-disc pl-5 m-0 space-y-2 text-sm">
                <li>En yakın Polis Merkezine veya Jandarma Karakoluna,</li>
                <li>Cumhuriyet Başsavcılığına (Adliye),</li>
                <li>ŞÖNİM'e (Şiddet Önleme ve İzleme Merkezi),</li>
                <li>Aile Mahkemesi Hakimliğine,</li>
                <li>KADES uygulaması üzerinden tek tuşla,</li>
                <li>ALO 183 veya 112 Acil Çağrı Merkezine başvurabilirsiniz.</li>
              </ul>
            </div>
            <div className="flex items-start gap-3 text-sm text-[#FF3B30] font-medium p-4 bg-[#FF3B30]/10 rounded-xl">
              <BellRing className="w-6 h-6 shrink-0" />
              <p className="m-0">Karakola gittiğinizde polislerin sizi barıştırmaya veya şikayetten vazgeçirmeye hakkı yoktur. Israrla "6284 kapsamında tedbir kararı istiyorum" demelisiniz.</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 bg-gradient-to-br from-[#2A1115] to-[#4A1525] text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden border border-red-900/30">
          <div className="absolute inset-0 bg-[url('/image_2.png')] opacity-5 bg-contain bg-center bg-no-repeat mix-blend-overlay" />
          <h3 className="text-3xl font-serif font-black mb-6 relative z-10 text-white">Yalnız Değilsiniz!</h3>
          <p className="text-lg text-white/90 font-medium max-w-2xl mx-auto mb-8 relative z-10">
            Kolluk kuvvetleri işlem yapmıyor mu? Nereye başvuracağınızı bilmiyor musunuz? Rosa Kadın Derneği avukatları, başvuru sürecinden mahkeme aşamasına kadar yanınızda.
          </p>
          <Link href="/iletisim" className="relative z-10 inline-flex items-center gap-2 bg-white text-[#4A1525] px-8 py-4 rounded-full font-bold tracking-widest uppercase hover:bg-[#FF3B30] hover:text-white transition-colors shadow-xl hover:shadow-2xl">
            Acil Hukuki Destek <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
