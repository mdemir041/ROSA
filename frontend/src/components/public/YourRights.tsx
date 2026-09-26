import React from 'react';
import Image from 'next/image';
import { Scale, HeartHandshake, Briefcase, Hand, ArrowRight, Info } from 'lucide-react';
import Link from 'next/link';

export default function YourRights() {
  return (
    <article className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[350px] md:h-[500px] rounded-[3rem] overflow-hidden mb-16 shadow-[0_20px_50px_rgba(212,175,55,0.15)] group bg-[#3D154B]">
        
        {/* Abstract Rights Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1F0933] via-[#3D154B] to-[#D4AF37] opacity-80" />
          <svg className="absolute w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circles" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="30" fill="none" stroke="#FDE68A" strokeWidth="2" strokeOpacity="0.3"/>
                <circle cx="40" cy="40" r="10" fill="#FDE68A" fillOpacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circles)" />
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-10">
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
            <span className="w-12 h-1 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"></span>
            <span className="text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-xs md:text-sm drop-shadow-md">YASAL GÜVENCELERİNİZ</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-[#D4AF37] leading-tight drop-shadow-lg max-w-4xl mb-4">
            Haklarınızı Bilin
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl drop-shadow-md">
            Medeni, ekonomik ve sosyal haklarınız lütuf değildir. Kanunlarla güvence altına alınmış haklarınızı bilmek, şiddete ve eşitsizliğe karşı en büyük silahınızdır.
          </p>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert prose-p:text-gray-700 dark:prose-p:text-gray-300 max-w-none prose-headings:font-serif prose-headings:text-[#3D154B] dark:prose-headings:text-white">
        
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6A4C93] dark:text-[#D4AF37] mb-6">
            Hiçbir Kadın Çaresiz Değildir
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            Ataerkil sistem, kadınları haklarından bihaber bırakarak sindirmeyi amaçlar. "Boşanırsan çocukları göremezsin", "Seni beş parasız sokağa atarım" gibi tehditlerin hukuki hiçbir geçerliliği yoktur. <strong>Kanunlar sizin yanınızdadır.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white dark:bg-[#1A1622] p-8 md:p-10 rounded-[3rem] shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-shadow relative overflow-hidden group">
            <Scale className="absolute -top-4 -right-4 w-32 h-32 text-[#6A4C93]/5 group-hover:text-[#6A4C93]/10 transition-colors -rotate-12" />
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="bg-[#6A4C93]/10 p-4 rounded-2xl">
                <HeartHandshake className="w-8 h-8 text-[#6A4C93]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3D154B] dark:text-white m-0">Medeni Haklarınız</h3>
            </div>
            <ul className="list-disc pl-5 space-y-3 text-gray-600 dark:text-gray-400 relative z-10">
              <li>Evlilik içinde edinilen mallar <strong>ortaktır</strong>. Boşanma durumunda malların yarısı (katılma alacağı) sizindir.</li>
              <li>Boşanma davası açtığınız an itibarıyla, hakimden barınma, kendiniz ve çocuklarınız için tedbir nafakası talep edebilirsiniz.</li>
              <li>Velayet kararlarında çocuğun üstün yararı gözetilir. Çalışmıyor olmanız, velayeti alamayacağınız anlamına gelmez.</li>
              <li>Kendi soyadınızı kullanma hakkınız vardır.</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-[#1A1622] p-8 md:p-10 rounded-[3rem] shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-shadow relative overflow-hidden group">
            <Briefcase className="absolute -top-4 -right-4 w-32 h-32 text-[#D4AF37]/5 group-hover:text-[#D4AF37]/10 transition-colors rotate-12" />
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="bg-[#D4AF37]/10 p-4 rounded-2xl">
                <Briefcase className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3D154B] dark:text-white m-0">Çalışma Hayatındaki Haklarınız</h3>
            </div>
            <ul className="list-disc pl-5 space-y-3 text-gray-600 dark:text-gray-400 relative z-10">
              <li>İş yerinde cinsiyetiniz, medeni haliniz veya hamileliğiniz nedeniyle size farklı bir muamele yapılamaz, işten çıkarılamazsınız (Eşitlik ilkesi).</li>
              <li>Aynı veya eşit değerde bir iş için erkek meslektaşınızdan daha düşük ücret verilemez.</li>
              <li>Ücretli doğum izni (toplam 16 hafta) ve çocuğunuz 1 yaşına gelene kadar günde 1.5 saat süt izni hakkınız yasal güvence altındadır.</li>
              <li>İş yerinde mobbing veya cinsel taciz <strong>suçtur</strong> ve iş sözleşmenizi haklı nedenle derhal feshetme (kıdem tazminatını alma) hakkı verir.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20 bg-[#FAF8F5] dark:bg-[#201C29] p-8 md:p-12 rounded-[3rem] shadow-inner border border-purple-100 dark:border-white/5">
          <div className="lg:w-1/2">
            <h3 className="flex items-center gap-4 text-3xl font-bold mb-6 text-[#3D154B] dark:text-white">
              <Hand className="w-8 h-8 text-[#FF3B30]" /> Şiddete Karşı Haklarınız
            </h3>
            <p className="text-lg leading-relaxed">
              Fiziksel, psikolojik, cinsel veya ekonomik şiddete maruz kalıyorsanız, 6284 sayılı kanun kapsamında derhal uzaklaştırma, koruma ve iletişim engeli kararları aldırabilirsiniz.
            </p>
            <div className="bg-white dark:bg-[#120F16] p-6 rounded-2xl border-l-4 border-[#FF3B30] mt-6">
              <h4 className="flex items-center gap-2 text-lg font-bold text-[#FF3B30] m-0 mb-3">
                <Info className="w-5 h-5" /> Adli Yardım Hakkı
              </h4>
              <p className="text-sm m-0">
                Avukat tutacak maddi gücünüz yoksa, bulunduğunuz ilin Barosu size <strong>ücretsiz avukat</strong> atamak zorundadır. Şiddet mağduru kadınlar barolardan adli yardım (ücretsiz avukat) talep edebilir. Ayrıca mahkeme masraflarından muafiyet isteyebilirsiniz.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative h-[400px] w-full rounded-[2rem] overflow-hidden shadow-2xl bg-white dark:bg-[#120F16]">
            <Image src="/image_2.png" alt="Rosa Logo" fill className="object-contain p-12" unoptimized />
            <div className="absolute inset-0 bg-[#3D154B]/10 mix-blend-multiply pointer-events-none" />
          </div>
        </div>

        <div className="text-center mt-12 bg-gradient-to-r from-[#1F0933] via-[#6A4C93] to-[#1F0933] text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/image_2.png')] opacity-10 bg-contain bg-center bg-no-repeat mix-blend-overlay" />
          <h3 className="text-3xl font-serif font-black mb-6 relative z-10 text-white">Yalnız Yürümeyeceksiniz</h3>
          <p className="text-lg text-white/90 font-medium max-w-2xl mx-auto mb-10 relative z-10">
            Haklarınızı bilmek ilk adımdır. Onları kullanmak için gereken gücü ise dayanışmadan alırız. Rosa Kadın Derneği Hukuk Komisyonu, adliye koridorlarında yanınızda olmak için var.
          </p>
          <Link href="/iletisim" className="relative z-10 inline-flex items-center gap-2 bg-white text-[#3D154B] px-8 py-4 rounded-full font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-xl hover:shadow-2xl">
            Bize Ulaşın <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
