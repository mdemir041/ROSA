'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageCode } from '@/types/cms';

const COOKIE_TRANSLATIONS: Record<LanguageCode, any> = {
  TR: {
    title: "Çerez Politikası",
    subtitle: "Web Sitemizdeki Çerezlerin Kullanımına Dair Bilgilendirme",
    sec1Title: "1. Çerez (Cookie) Nedir?",
    sec1Desc: "Çerezler, bir web sitesini ziyaret ettiğinizde cihazınıza (bilgisayar, tablet veya mobil cihaz) tarayıcınız aracılığıyla depolanan küçük metin dosyalarıdır. Çerezler, web sitesinin daha verimli çalışmasını sağlamak, tercihlerinizi hatırlamak ve kullanıcı deneyiminizi geliştirmek amacıyla kullanılmaktadır.",
    sec2Title: "2. Hangi Çerezleri Kullanıyoruz?",
    sec2Desc: <><strong>Rosa Kadın Derneği</strong> olarak web sitemizde gizliliğinizi en üst düzeyde koruyacak şekilde, yalnızca sistemin çalışması için temel olan çerezleri kullanmaktayız. Kesinlikle reklam veya pazarlama amaçlı üçüncü parti izleme çerezleri <u>kullanılmamaktadır</u>.</>,
    sec2Items: [
      <><strong>Zorunlu (Temel) Çerezler:</strong> Web sitemizin düzgün çalışması, menülerin ve sayfaların yüklenmesi, ayrıca güvenliğinizin sağlanması için zorunludur. (Örn: Dil tercihiniz ve koyu/açık tema (dark mode) seçiminiz).</>,
      <><strong>Performans Çerezleri (Opsiyonel):</strong> Web sitesinin nasıl kullanıldığını analiz ederek performansı artırmamıza yardımcı olan anonim verilerdir (sayfa yüklenme hızları vb.). Kimliğinizi tespit etmez.</>
    ],
    sec3Title: "3. Çerez Yönetimi ve Kontrolü",
    sec3Desc: "Tarayıcınızın ayarlarını değiştirerek çerezlere ilişkin tercihlerinizi kişiselleştirebilirsiniz. Çerezleri tamamen reddedebilir veya cihazınıza bir çerez gönderildiğinde uyarı almayı seçebilirsiniz. Çerezleri reddetmeniz durumunda sitemizin bazı fonksiyonlarının tam olarak çalışmayabileceğini (örneğin tema tercihinizin hatırlanmayacağını) belirtmek isteriz.",
    sec4Title: "4. İletişim",
    sec4Desc: <>Kişisel verilerinizin işlenmesi ve çerez politikamız ile ilgili sorularınız için bizimle <strong>rosakadindernegi@gmail.com</strong> e-posta adresi üzerinden iletişime geçebilirsiniz. Haklarınıza ilişkin daha detaylı bilgiye KVKK Aydınlatma Metnimiz üzerinden ulaşabilirsiniz.</>,
    lastUpdate: "Son Güncelleme Tarihi: 26 Ağustos 2026"
  },
  KU: {
    title: "Siyaseta Çerezan (Cookies)",
    subtitle: "Agahdarkirina li ser Bikaranîna Çerezan li Malpera Me",
    sec1Title: "1. Çerez (Cookie) Çi ye?",
    sec1Desc: "Çerez, pelên nivîsê yên piçûk in ku dema hûn serdana malperek dikin, bi riya geroka we li ser cîhaza we (kompîtur, tablet an têlefona destan) têne tomarkirin. Çerez ji bo ku malper baştir bixebite, tercîhên we bîne bîra xwe û ezmûna we ya bikarhêneriyê pêş bixe têne bikaranîn.",
    sec2Title: "2. Em Kîjan Çerezan Bikar Tînin?",
    sec2Desc: <>Wekî <strong>Komeleya Jinan a Rosa</strong>, em li malpera xwe tenê çerezên bingehîn ên ku ji bo xebitandina pergalê pêwîst in bikar tînin da ku nehêniya we di asta herî bilind de biparêzin. Çerezên şopandinê yên aliyê sêyemîn ên ji bo armancên reklam an kirrûbirrê qet <u>nayên bikaranîn</u>.</>,
    sec2Items: [
      <><strong>Çerezên Mecbûrî (Bingehîn):</strong> Ji bo xebitandina rast a malpera me, barkirina menu û rûpelan, û her weha ji bo dabînkirina ewlehiya we mecbûrî ne. (Mînak: Tercîha we ya ziman û hilbijartina temaya tarî/ronahî).</>,
      <><strong>Çerezên Performansê (Vebijarkî):</strong> Ew daneyên anonîm in ku bi analîzkirina çawaniya bikaranîna malperê alîkariya me dikin ku performansa xwe zêde bikin (leza barkirina rûpelê, hwd.). Ew nasnameya we eşkere nakin.</>
    ],
    sec3Title: "3. Rêvebirin û Kontrolkirina Çerezan",
    sec3Desc: "Hûn dikarin bi guhertina mîhengên geroka xwe, tercîhên xwe yên derbarê çerezan de kesane bikin. Hûn dikarin çerezan bi tevahî red bikin an jî hilbijêrin ku dema çerezek ji cîhaza we re tê şandin hişyariyekê bistînin. Em dixwazin diyar bikin ku heke hûn çerezan red bikin, dibe ku hin fonksiyonên malpera me bi tevahî nexebitin.",
    sec4Title: "4. Têkilî",
    sec4Desc: <>Ji bo pirsên we yên derbarê bikaranîna daneyên we yên kesane û siyaseta me ya çerezan de, hûn dikarin bi riya navnîşana e-nameyê <strong>rosakadindernegi@gmail.com</strong> bi me re têkevin têkiliyê. Hûn dikarin ji Metna Ronahîkirinê ya KVKK'ê agahiyên berfirehtir bistînin.</>,
    lastUpdate: "Dîroka Nûvekirina Dawî: 26 Tebax 2026"
  },
  EN: {
    title: "Cookie Policy",
    subtitle: "Information on the Use of Cookies on Our Website",
    sec1Title: "1. What is a Cookie?",
    sec1Desc: "Cookies are small text files that are stored on your device (computer, tablet, or mobile device) through your browser when you visit a website. Cookies are used to make the website work more efficiently, remember your preferences, and improve your user experience.",
    sec2Title: "2. Which Cookies Do We Use?",
    sec2Desc: <>As the <strong>Rosa Women's Association</strong>, we use only the essential cookies required for the system to function in order to protect your privacy at the highest level on our website. Third-party tracking cookies for advertising or marketing purposes are strictly <u>not used</u>.</>,
    sec2Items: [
      <><strong>Strictly Necessary (Essential) Cookies:</strong> They are mandatory for our website to function properly, for menus and pages to load, and for ensuring your security. (e.g., Your language preference and dark/light theme selection).</>,
      <><strong>Performance Cookies (Optional):</strong> These are anonymous data that help us improve performance by analyzing how the website is used (page load speeds, etc.). They do not identify you.</>
    ],
    sec3Title: "3. Cookie Management and Control",
    sec3Desc: "You can personalize your preferences regarding cookies by changing your browser settings. You can reject cookies completely or choose to receive a warning when a cookie is sent to your device. We would like to state that if you reject cookies, some functions of our site may not work fully.",
    sec4Title: "4. Contact",
    sec4Desc: <>For your questions regarding the processing of your personal data and our cookie policy, you can contact us via the e-mail address <strong>rosakadindernegi@gmail.com</strong>. You can find more detailed information on your rights in our PDPL Clarification Text.</>,
    lastUpdate: "Last Update Date: August 26, 2026"
  },
  DE: {
    title: "Cookie-Richtlinie",
    subtitle: "Informationen zur Verwendung von Cookies auf unserer Website",
    sec1Title: "1. Was ist ein Cookie?",
    sec1Desc: "Cookies sind kleine Textdateien, die beim Besuch einer Website über Ihren Browser auf Ihrem Gerät (Computer, Tablet oder Mobilgerät) gespeichert werden. Cookies werden verwendet, um die Website effizienter zu gestalten, Ihre Präferenzen zu speichern und Ihre Benutzererfahrung zu verbessern.",
    sec2Title: "2. Welche Cookies verwenden wir?",
    sec2Desc: <>Als <strong>Rosa Frauenverein</strong> verwenden wir auf unserer Website nur die unbedingt notwendigen Cookies, die für das Funktionieren des Systems erforderlich sind, um Ihre Privatsphäre auf höchstem Niveau zu schützen. Tracking-Cookies von Drittanbietern für Werbe- oder Marketingzwecke werden strengstens <u>nicht verwendet</u>.</>,
    sec2Items: [
      <><strong>Unbedingt erforderliche (essenzielle) Cookies:</strong> Sie sind zwingend erforderlich, damit unsere Website ordnungsgemäß funktioniert, Menüs und Seiten geladen werden und Ihre Sicherheit gewährleistet ist. (z.B. Ihre Sprachpräferenz und die Auswahl des dunklen/hellen Themas).</>,
      <><strong>Leistungs-Cookies (Optional):</strong> Dies sind anonyme Daten, die uns helfen, die Leistung zu verbessern, indem wir analysieren, wie die Website genutzt wird (Seitenladezeiten usw.). Sie identifizieren Sie nicht.</>
    ],
    sec3Title: "3. Cookie-Verwaltung und -Kontrolle",
    sec3Desc: "Sie können Ihre Präferenzen in Bezug auf Cookies personalisieren, indem Sie Ihre Browsereinstellungen ändern. Sie können Cookies vollständig ablehnen oder sich warnen lassen, wenn ein Cookie an Ihr Gerät gesendet wird. Wir möchten darauf hinweisen, dass bei Ablehnung von Cookies einige Funktionen unserer Seite möglicherweise nicht vollständig funktionieren.",
    sec4Title: "4. Kontakt",
    sec4Desc: <>Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten und zu unserer Cookie-Richtlinie können Sie uns über die E-Mail-Adresse <strong>rosakadindernegi@gmail.com</strong> kontaktieren. Detailliertere Informationen zu Ihren Rechten finden Sie in unserem KVKK-Informationstext.</>,
    lastUpdate: "Letztes Aktualisierungsdatum: 26. August 2026"
  },
  FR: {
    title: "Politique relative aux cookies",
    subtitle: "Informations sur l'utilisation des cookies sur notre site Web",
    sec1Title: "1. Qu'est-ce qu'un Cookie ?",
    sec1Desc: "Les cookies sont de petits fichiers texte qui sont stockés sur votre appareil (ordinateur, tablette ou appareil mobile) via votre navigateur lorsque vous visitez un site Web. Les cookies sont utilisés pour rendre le site Web plus efficace, mémoriser vos préférences et améliorer votre expérience utilisateur.",
    sec2Title: "2. Quels Cookies utilisons-nous ?",
    sec2Desc: <>En tant qu'<strong>Association des Femmes Rosa</strong>, nous n'utilisons que les cookies essentiels requis pour le fonctionnement du système afin de protéger votre vie privée au plus haut niveau sur notre site Web. Les cookies de suivi tiers à des fins publicitaires ou de marketing ne sont strictement <u>pas utilisés</u>.</>,
    sec2Items: [
      <><strong>Cookies strictement nécessaires (essentiels):</strong> Ils sont obligatoires pour le bon fonctionnement de notre site Web, le chargement des menus et des pages, et pour assurer votre sécurité. (Ex: Votre préférence de langue et la sélection du thème sombre/clair).</>,
      <><strong>Cookies de performance (Optionnels):</strong> Ce sont des données anonymes qui nous aident à améliorer les performances en analysant l'utilisation du site Web (vitesse de chargement des pages, etc.). Ils ne vous identifient pas.</>
    ],
    sec3Title: "3. Gestion et contrôle des cookies",
    sec3Desc: "Vous pouvez personnaliser vos préférences concernant les cookies en modifiant les paramètres de votre navigateur. Vous pouvez rejeter complètement les cookies ou choisir de recevoir un avertissement lorsqu'un cookie est envoyé à votre appareil. Nous tenons à préciser que si vous refusez les cookies, certaines fonctions de notre site pourraient ne pas fonctionner pleinement.",
    sec4Title: "4. Contact",
    sec4Desc: <>Pour vos questions concernant le traitement de vos données personnelles et notre politique relative aux cookies, vous pouvez nous contacter via l'adresse e-mail <strong>rosakadindernegi@gmail.com</strong>. Vous trouverez des informations plus détaillées sur vos droits dans notre Texte d'Information KVKK.</>,
    lastUpdate: "Date de la dernière mise à jour : 26 août 2026"
  }
};

export default function CerezPolitikasiPage(): React.JSX.Element {
  const { lang } = useLanguage();
  const t = COOKIE_TRANSLATIONS[lang] || COOKIE_TRANSLATIONS['TR'];

  return (
    <div className="pt-32 pb-24 min-h-screen relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 animate-cinematic-reveal">
          <h1 className="text-3xl md:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#6A4C93] dark:from-[#D4AF37] dark:to-[#E8C3F5] mb-6 tracking-tight">
            {t.title}
          </h1>
          <p className="text-lg text-[#5A5260] dark:text-[#B2AAC0] max-w-2xl mx-auto font-medium">
            {t.subtitle}
          </p>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-[2rem] shadow-xl text-[#3D154B] dark:text-[#F5F3F7] animate-cinematic-reveal space-y-8" style={{ animationDelay: '200ms' }}>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#6A4C93] dark:text-[#D4AF37]">{t.sec1Title}</h2>
            <p className="leading-relaxed opacity-90">{t.sec1Desc}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#6A4C93] dark:text-[#D4AF37]">{t.sec2Title}</h2>
            <p className="leading-relaxed opacity-90 mb-3">{t.sec2Desc}</p>
            <ul className="list-disc pl-6 space-y-3 opacity-90">
              {t.sec2Items.map((item: React.ReactNode, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#6A4C93] dark:text-[#D4AF37]">{t.sec3Title}</h2>
            <p className="leading-relaxed opacity-90">{t.sec3Desc}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#6A4C93] dark:text-[#D4AF37]">{t.sec4Title}</h2>
            <p className="leading-relaxed opacity-90">{t.sec4Desc}</p>
          </section>

          <div className="mt-12 p-6 bg-[#6A4C93]/5 dark:bg-[#D4AF37]/5 border border-[#6A4C93]/20 dark:border-[#D4AF37]/20 rounded-xl text-center">
            <p className="text-sm opacity-80">{t.lastUpdate}</p>
          </div>

        </div>
      </div>
    </div>
  );
}
