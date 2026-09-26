import React from 'react';
import Image from 'next/image';
import { BookOpen, Shield, AlertCircle, ArrowRight, CheckSquare } from 'lucide-react';
import Link from 'next/link';

export default function IstanbulConvention() {
  return (
    <article className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[350px] md:h-[500px] rounded-[3rem] overflow-hidden mb-16 shadow-[0_20px_50px_rgba(106,76,147,0.2)] group bg-[#3D154B]">
        
        {/* Cinematic Purple Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1F0933] via-[#3D154B] to-[#6A4C93] opacity-90" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-[0.05]">
           <Image 
            src="/image_2.png" 
            alt="Rosa Kadın Derneği" 
            width={600}
            height={600}
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
            <span className="text-white font-bold tracking-[0.4em] uppercase text-xs md:text-sm drop-shadow-md">Vazgeçmediğimiz Kırmızı Çizgimiz</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-[#D4AF37] leading-tight drop-shadow-lg max-w-4xl mb-4">
            İstanbul Sözleşmesi
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl drop-shadow-md">
            Kadınlara yönelik şiddeti ve ev içi şiddeti önleme, koruma, kovuşturma ve politika üretme yükümlülüğü getiren en kapsamlı uluslararası metin.
          </p>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert prose-p:text-gray-700 dark:prose-p:text-gray-300 max-w-none prose-headings:font-serif prose-headings:text-[#3D154B] dark:prose-headings:text-white">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#6A4C93] dark:text-[#D4AF37] mb-6">
            İstanbul Sözleşmesi Yaşatır!
          </h2>
          <p className="text-xl italic text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Bir gece yarısı kararnamesiyle hukuksuzca çıkılan bu sözleşme, kadınların can simididir. Bizler için bu sözleşme yürürlüktedir ve uygulanana kadar mücadelemiz sürecektir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h3 className="flex items-center gap-3 text-3xl font-bold mb-6 text-[#3D154B] dark:text-white">
              <BookOpen className="w-8 h-8 text-[#D4AF37]" /> Sözleşme Bize Ne Söylüyor?
            </h3>
            <p>
              Avrupa Konseyi Kadınlara Yönelik Şiddet ve Aile İçi Şiddetin Önlenmesi ve Bunlarla Mücadeleye İlişkin Sözleşme (İstanbul Sözleşmesi), şiddetin toplumsal cinsiyet eşitsizliğinden kaynaklandığını açıkça kabul eden ilk uluslararası belgedir.
            </p>
            <p>
              Sözleşme devlete şu <strong>4 temel yükümlülüğü</strong> yükler:
            </p>
            <ul className="list-none pl-0 space-y-4 mt-6">
              <li className="flex items-start gap-3 bg-white dark:bg-[#1A1622] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <CheckSquare className="w-6 h-6 text-[#6A4C93] shrink-0" />
                <span><strong>Önleme:</strong> Toplumsal cinsiyet eşitsizliğini ortadan kaldıracak eğitim ve politikalar üretmek.</span>
              </li>
              <li className="flex items-start gap-3 bg-white dark:bg-[#1A1622] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <CheckSquare className="w-6 h-6 text-[#6A4C93] shrink-0" />
                <span><strong>Koruma:</strong> Şiddet tehlikesi altındaki kadını (sığınak, koruma kararı vb.) amasız fakatsız korumak.</span>
              </li>
              <li className="flex items-start gap-3 bg-white dark:bg-[#1A1622] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <CheckSquare className="w-6 h-6 text-[#6A4C93] shrink-0" />
                <span><strong>Kovuşturma:</strong> Faili caydırıcı cezalarla, iyi hal veya tahrik indirimi uygulamadan yargılamak.</span>
              </li>
              <li className="flex items-start gap-3 bg-white dark:bg-[#1A1622] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <CheckSquare className="w-6 h-6 text-[#6A4C93] shrink-0" />
                <span><strong>Bütüncül Politika:</strong> Tüm kamu kurumlarının koordineli bir şekilde şiddetle mücadele etmesi.</span>
              </li>
            </ul>
          </div>
          <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#120F16]">
            <Image src="/image_2.png" alt="Rosa Logo" fill className="object-contain p-16" unoptimized />
            <div className="absolute inset-0 bg-[#6A4C93]/5 mix-blend-multiply pointer-events-none" />
          </div>
        </div>

        <div className="bg-[#FAF8F5] dark:bg-[#201C29] p-8 md:p-12 rounded-[3rem] mb-16 shadow-inner border border-purple-100 dark:border-purple-900/30">
          <div className="flex items-center gap-4 mb-6">
            <AlertCircle className="w-10 h-10 text-[#FF3B30]" />
            <h3 className="text-2xl font-bold text-[#3D154B] dark:text-white m-0">Hukuksuz Fesih Kararına Dair</h3>
          </div>
          <p className="text-lg">
            Meclis onayıyla yürürlüğe giren uluslararası bir insan hakları sözleşmesinden, tek kişilik bir kararname ile çıkılamaz. Bu işlem Anayasa'ya ve uluslararası hukuka açıkça aykırıdır. 
          </p>
          <p className="text-lg">
            Sözleşmeden çıkılması; şiddet faillerini cesaretlendirmiş, cezasızlık politikasını devlet nezdinde onaylamış ve kadınların yaşam hakkını pazarlık masasına yatırmıştır. <em>Rosa Kadın Derneği olarak, bu kararı tanımıyor ve sözleşmenin yeniden yürürlüğe girmesi için alanlarda, mahkemelerde direnmeye devam ediyoruz.</em>
          </p>
        </div>

        <div className="text-center mt-12 bg-white dark:bg-[#120F16] border-2 border-[#6A4C93] dark:border-[#D4AF37] p-12 rounded-[3rem] shadow-xl relative overflow-hidden">
          <Shield className="w-16 h-16 text-[#6A4C93] dark:text-[#D4AF37] mx-auto mb-6" />
          <h3 className="text-3xl font-serif font-black mb-6 text-[#3D154B] dark:text-white">Haklarınızı Öğrenin, Savunun</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto mb-8">
            İstanbul Sözleşmesi'nden doğan haklarımız anayasada ve ulusal mevzuatta da yer almaktadır. Şiddet karşısında susmak zorunda değilsiniz. Haklarınızı birlikte savunalım.
          </p>
          <Link href="/iletisim" className="relative inline-flex items-center gap-2 bg-[#6A4C93] text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase hover:bg-[#3D154B] transition-colors shadow-lg hover:shadow-xl">
            Hukuki Danışmanlık Alın <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
