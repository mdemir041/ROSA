import React from 'react';
import Image from 'next/image';
import { Heart, Info, Scale, AlertTriangle, Moon } from 'lucide-react';

export default function MemorialPage() {
  return (
    <article className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group bg-[#0A080C]">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-20 z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-memorial" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6A4C93" strokeWidth="0.5" strokeOpacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-memorial)" />
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-0">
           <Image 
            src="/image_2.png" 
            alt="Anma Logosu" 
            width={400}
            height={400}
            className="object-contain opacity-5 grayscale blur-[2px]"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-[2px] bg-[#FF3B30] rounded-full"></span>
            <span className="text-[#FF3B30] font-bold tracking-[0.3em] uppercase text-xs md:text-sm">ASLA UNUTMAYACAĞIZ</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-tight drop-shadow-2xl max-w-4xl">
            Katledilen Kadınlar Anısına
          </h1>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert prose-p:text-gray-700 dark:prose-p:text-gray-300 max-w-none prose-headings:font-serif prose-headings:text-[#3D154B] dark:prose-headings:text-white">
        <p className="text-xl md:text-2xl font-serif italic text-center max-w-4xl mx-auto mb-16 text-gray-800 dark:text-gray-200">
          "Onlar sadece istatistik değil; çalınan hayatlar, yarım bırakılan hayaller ve isyanımızın haklı gerekçesidir."
        </p>

        <div className="bg-[#1A1520] text-white p-8 md:p-12 rounded-[2.5rem] mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF3B30]/10 rounded-bl-full blur-3xl pointer-events-none" />
          <h2 className="flex items-center gap-3 text-3xl font-bold mb-6 text-white border-b border-white/10 pb-4">
            <Moon className="w-8 h-8 text-[#FF3B30]" /> Bir İsimden Fazlası
          </h2>
          <p className="text-gray-300">
            Erkek şiddeti sonucu aramızdan koparılan her bir kadın, yaşam hakkı devletin koruma mekanizmaları ve toplum tarafından savunulamamış bir insandır. Medyanın onları birer rakama, cinayetleri ise sıradan "adli vakalara" dönüştürmesine izin vermeyeceğiz.
          </p>
          <p className="text-gray-300">
            Onların adlarını anmak, unutturmamak; yalnızca bir yas tutma biçimi değil, aynı zamanda hayatta kalan kadınlar için sürdürdüğümüz direnişin en sarsılmaz zeminidir. Katledilen her kadın için, şiddetsiz bir dünya kurma mücadelemizi daha da büyütüyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-bold mb-6 text-[#3D154B] dark:text-white">
              <Scale className="w-8 h-8 text-[#D4AF37]" /> Cezasızlık Politikaları ve Yargı
            </h2>
            <p>
              Kadın cinayetleri politiktir. Çünkü bir kadının katledilmesi, tesadüfi bir anın sonucu değil; ataerkil zihniyetin, eşitsiz güç ilişkilerinin ve failleri cesaretlendiren cezasızlık politikalarının doğrudan bir sonucudur.
            </p>
            <p>
              Mahkeme salonlarında uygulanan "haksız tahrik" ve "iyi hal" indirimleri, şiddet uygulayanları aklarken, diğer kadınların yaşam haklarını tehlikeye atmaktadır. Rosa Kadın Derneği olarak, adliye koridorlarında faillerin hak ettikleri cezayı almaları ve adaletin sağlanması için hukuki mücadelemizi her bir dosya için titizlikle yürütüyoruz.
            </p>
          </div>
          
          <div className="bg-white dark:bg-[#120F16] border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow relative">
            <div className="absolute -top-4 -left-4 bg-[#FF3B30] text-white p-3 rounded-full shadow-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#3D154B] dark:text-white mt-2">6284 Sayılı Kanun Yaşatır</h3>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Şiddeti önleme ve şiddet mağdurunu koruma amacıyla düzenlenen 6284 Sayılı Kanun'un etkin bir şekilde uygulanması hayati bir öneme sahiptir. Kanunun tartışmaya açılması, kadınların yaşam güvencesinin ellerinden alınması demektir. 
            </p>
          </div>
        </div>

        <div className="text-center mt-12 bg-[#0A080C] text-white p-12 rounded-[3rem] shadow-2xl relative border border-white/5">
          <Heart className="w-16 h-16 text-[#FF3B30] mx-auto mb-6 drop-shadow-[0_0_15px_rgba(255,59,48,0.5)]" />
          <h3 className="text-3xl font-serif font-black mb-4">Yaşatan Bir Dayanışma</h3>
          <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto mb-8">
            Katledilen tüm kadınların isyanını taşıyoruz. Hiçbir kadının kirpiği yere düşmeyene dek, birbirimizi savunmaktan ve omuz omuza durmaktan vazgeçmeyeceğiz.
          </p>
          
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase text-gray-300">
            <Info className="w-4 h-4 text-[#D4AF37]" />
            Bir kişi daha eksilmeyeceğiz
          </div>
        </div>
      </div>
    </article>
  );
}
