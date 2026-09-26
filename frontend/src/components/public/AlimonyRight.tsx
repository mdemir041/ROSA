import React from 'react';
import Image from 'next/image';
import { Scale, ShieldAlert, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AlimonyRight() {
  return (
    <article className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[350px] md:h-[500px] rounded-[3rem] overflow-hidden mb-16 shadow-[0_20px_50px_rgba(61,21,75,0.15)] group bg-[#FAF8F5] dark:bg-[#120F16]">
        
        {/* Abstract Justice Background */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20 z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="lines" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="60" stroke="#6A4C93" strokeWidth="2" strokeOpacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lines)" />
          </svg>
        </div>
        
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-[#3D154B]/5 to-transparent z-10" />

        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-10">
           <Image 
            src="/image_2.png" 
            alt="Rosa Kadın Derneği" 
            width={600}
            height={600}
            className="object-contain blur-[1px]"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0F0C12] dark:via-[#0F0C12]/80 z-10" />

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-[#6A4C93] rounded-full"></span>
            <span className="text-[#6A4C93] dark:text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-xs md:text-sm">HUKUKİ BİLGİLENDİRME</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#3D154B] via-[#6A4C93] to-[#D4AF37] dark:from-[#D4AF37] dark:via-[#FDE68A] dark:to-[#D4AF37] leading-tight drop-shadow-sm max-w-4xl mb-4">
            Nafaka Hakkı
          </h1>
          <p className="text-lg md:text-xl text-[#3D154B]/80 dark:text-white/80 font-medium max-w-2xl">
            Nafaka bir lütuf değil, ev içi emeğin ve eşitsiz düzenin hukuki bir telafisidir. Kadınların kazanılmış hakkıdır.
          </p>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert prose-p:text-gray-700 dark:prose-p:text-gray-300 max-w-none prose-headings:font-serif prose-headings:text-[#3D154B] dark:prose-headings:text-white">
        
        <div className="bg-white dark:bg-[#1A1622] p-8 md:p-12 rounded-[3rem] mb-16 shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
          <Scale className="absolute top-8 right-8 w-32 h-32 text-[#6A4C93]/5 -rotate-12" />
          <h2 className="text-3xl font-bold mb-6 text-[#6A4C93] dark:text-[#D4AF37] relative z-10">Nafaka Nedir? Neden Bir Haktır?</h2>
          <p className="relative z-10">
            Medeni Kanun'da düzenlenen <strong>Yoksulluk Nafakası</strong>, boşanma yüzünden yoksulluğa düşecek olan tarafın, diğer taraftan mali gücü oranında süresiz olarak isteyebileceği bir maddi destektir. Kanun maddesi cinsiyet belirtmese de, Türkiye'deki toplumsal cinsiyet eşitsizliği, istihdam oranları ve ev içi bakım yükü nedeniyle nafakayı talep eden taraf kahir ekseriyetle kadınlar olmaktadır.
          </p>
          <p className="relative z-10 mb-0">
            Kadınlar evlilik süresince ev işlerini, çocuk ve yaşlı bakımını üstlenmekte, çoğu zaman bu nedenle eğitimlerini veya kariyerlerini yarıda bırakmak zorunda kalmaktadır. Boşanma sonrasında erkeğin kariyeri ve birikimi artarken, kadının yıllarca harcadığı <em>"görünmeyen emek"</em> yok sayılmaktadır. Nafaka, işte bu sömürülen emeğin ve evlilik boyunca kaybedilen fırsatların asgari düzeyde telafi edilmesidir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-white dark:bg-[#120F16] border border-gray-100 dark:border-gray-800">
            <Image src="/image_2.png" alt="Rosa Logo" fill className="object-contain p-12" unoptimized />
            <div className="absolute inset-0 bg-[#3D154B]/5 mix-blend-multiply pointer-events-none" />
          </div>
          
          <div>
            <h2 className="flex items-center gap-4 text-3xl font-bold mb-6 text-[#3D154B] dark:text-white">
              <ShieldAlert className="w-10 h-10 text-[#FF3B30]" /> Nafaka Hakkına Yönelik Saldırılar
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Son yıllarda sistematik olarak yürütülen "süresiz nafaka mağduriyeti" kampanyaları, gerçeği yansıtmaktan tamamen uzaktır. Mahkemelerin bağladığı nafaka miktarları çoğunlukla asgari ücretin bile çok altındadır ve büyük bir kısmı erkekler tarafından ödenmemektedir.
            </p>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                <span>Nafakanın süreyle sınırlandırılması, kadınları şiddet gördükleri evliliklere mahkum etmek demektir.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                <span>Ekonomik bağımsızlığı olmayan kadının boşanma iradesini kırmak, ataerkil ailenin bekasını sağlamak için kurgulanmış politik bir hamledir.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                <span>Devlet, nafaka ödemeyen faili cezalandırmak yerine kadının kazanılmış hakkına göz dikmektedir.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#FAF8F5] dark:bg-[#201C29] p-8 md:p-12 rounded-[3rem] mb-16 shadow-inner border border-gray-200 dark:border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <FileText className="w-10 h-10 text-[#6A4C93] dark:text-[#D4AF37]" />
            <h3 className="text-2xl font-bold text-[#3D154B] dark:text-white m-0">Ne Talep Ediyoruz?</h3>
          </div>
          <p>
            Rosa Kadın Derneği olarak yoksulluk nafakasının sınırlandırılmasına veya evlilik süresine bağlanmasına kesinlikle karşıyız. <strong>Kazanılmış haklarımız pazarlık konusu yapılamaz.</strong>
          </p>
          <p>
            Sorunun çözümü nafaka hakkını gasp etmek değil; kadın istihdamını artırmak, ücretsiz kreşler açmak, eşit işe eşit ücret sağlamak ve ödenmeyen nafakalar için devletin bir <em>"Nafaka Garanti Fonu"</em> kurarak kadına ödeme yapması ve ardından erkeğe rücu etmesidir.
          </p>
        </div>

        <div className="text-center mt-12 bg-gradient-to-r from-[#1F0933] via-[#3D154B] to-[#1F0933] text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/image_2.png')] opacity-10 bg-contain bg-center bg-no-repeat mix-blend-overlay" />
          <h3 className="text-3xl font-serif font-black mb-6 relative z-10 text-white">Hukuki Destek Alın</h3>
          <p className="text-lg text-white/90 font-medium max-w-2xl mx-auto mb-8 relative z-10">
            Boşanma sürecindeyseniz, nafaka veya velayet hakkınız ihlal ediliyorsa yalnız değilsiniz. Adli Destek Hukuk Ağımız ile yanınızdayız.
          </p>
          <Link href="/iletisim" className="relative z-10 inline-flex items-center gap-2 bg-white text-[#3D154B] px-8 py-4 rounded-full font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-xl hover:shadow-2xl">
            Avukatlarımıza Ulaşın <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
