'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageCode } from '@/types/cms';

const KVKK_TRANSLATIONS: Record<LanguageCode, any> = {
  TR: {
    title: "KVKK Aydınlatma Metni",
    subtitle: "Kişisel Verilerin Korunması ve İşlenmesi Hakkında Bilgilendirme",
    sec1Title: "1. Veri Sorumlusu",
    sec1Desc: <>6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, <strong>Rosa Kadın Derneği</strong> olarak, kişisel verilerinizi aşağıda açıklanan amaçlar kapsamında ve hukuka uygun olarak işlemekteyiz. Derneğimiz, kişisel verilerinizin gizliliğine ve güvenliğine büyük önem vermektedir.</>,
    sec2Title: "2. Kişisel Verilerin İşlenme Amacı",
    sec2Desc: "Toplanan kişisel verileriniz, derneğimizin tüzüğünde belirtilen amaçlar doğrultusunda şu faaliyetlerin yürütülmesi için işlenmektedir:",
    sec2Items: [
      "Kadına yönelik her türlü şiddetle mücadele kapsamında hukuki, psikolojik ve sosyal destek hizmetlerinin sağlanması,",
      "İletişim ve başvuru portalları üzerinden derneğimize ulaşan taleplerin karşılanması ve takibi,",
      "Etkinlik, panel, atölye ve eğitim süreçlerinin organizasyonu,",
      "Bağışçılarla ve gönüllülerle iletişimin sürdürülmesi, resmi kayıtların tutulması,",
      "Sivil toplum faaliyetlerimizin yasal mevzuata uygun olarak yürütülmesi."
    ],
    sec3Title: "3. İşlenen Kişisel Verilerin Aktarımı",
    sec3Desc: "Derneğimiz, kişisel verilerinizi mutlak gizlilik esasına dayanarak saklar. Ancak yasal yükümlülüklerin yerine getirilmesi amacıyla, yetkili kamu kurum ve kuruluşları ile kanunen yetkili özel kişilere mevzuatın izin verdiği ölçüde aktarılabilir. Hukuki ve psikososyal destek hizmetleri sırasında paylaşılan verileriniz, açık rızanız olmadan üçüncü şahıslarla paylaşılmaz.",
    sec4Title: "4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi",
    sec4Desc: "Kişisel verileriniz, internet sitemizdeki iletişim formları, destek başvuru formları, etkinlik kayıtları, e-posta veya dernek merkezimize yapılan fiziki başvurular aracılığıyla toplanmaktadır. Bu veriler, KVKK’nın 5. ve 6. maddelerinde belirtilen “kanunlarda açıkça öngörülmesi”, “veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi” ve “ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla meşru menfaatler için zorunlu olması” hukuki sebeplerine dayanılarak işlenmektedir.",
    sec5Title: "5. İlgili Kişinin Hakları",
    sec5Desc: "KVKK’nın 11. maddesi uyarınca veri sahipleri aşağıdaki haklara sahiptir:",
    sec5Items: [
      "Kişisel verilerinin işlenip işlenmediğini öğrenme,",
      "Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,",
      "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,",
      "Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,",
      "Kişisel verilerin silinmesini veya yok edilmesini talep etme."
    ],
    sec5Footer: <>Haklarınıza ilişkin taleplerinizi <strong>rosakadindernegi@gmail.com</strong> adresine iletebilir veya dernek merkezimize şahsen başvurabilirsiniz.</>,
    lastUpdate: "Son Güncelleme Tarihi: 26 Ağustos 2026"
  },
  KU: {
    title: "Metna Ronahîkirinê ya KVKK",
    subtitle: "Agahdarkirina li ser Parastin û Pêvajoya Daneyên Kesane",
    sec1Title: "1. Berpirsê Daneyan",
    sec1Desc: <>Li gorî Qanûna Parastina Daneyên Kesane ya bi hejmara 6698 ("KVKK"), wekî <strong>Komeleya Jinan a Rosa</strong>, em daneyên we yên kesane di çarçoveya armancên li jêr hatine diyarkirin de û li gorî qanûnê diparêzin. Komeleya me girîngiyeke mezin dide nehênî û ewlehiya daneyên we.</>,
    sec2Title: "2. Armanca Pêvajoya Daneyên Kesane",
    sec2Desc: "Daneyên we yên ku têne komkirin, ji bo meşandina van çalakiyan li gorî armancên ku di destûra komeleya me de hatine diyarkirin, têne bikaranîn:",
    sec2Items: [
      "Pêşkêşkirina xizmetên piştgiriya hiqûqî, psîkolojîk û civakî di çarçoveya têkoşîna li dijî her cûre tundiya li ser jinan de,",
      "Bersivdayîn û şopandina daxwazên ku bi riya portalên ragihandinê û serîlêdanê digihîjin komeleya me,",
      "Rêxistinkirina çalakî, panel, atolye û pêvajoyên perwerdeyê,",
      "Berdewamkirina peywendiya bi bexşkar û dilxwazan re, û girtina qeydên fermî,",
      "Rêvebirina çalakiyên civaka sivîl li gorî qanûnên fermî."
    ],
    sec3Title: "3. Veguhestina Daneyên Kesane",
    sec3Desc: "Komeleya me daneyên we yên kesane bi esasa nehêniya mutleq diparêze. Lê belê, ji bo pêkanîna erkên qanûnî, ew dikarin di sînorên ku zagon destûrê dide de, ji saziyên fermî û kesên qanûnî yên destûrdar re werin veguhestin. Daneyên we yên ku di dema xizmetên hiqûqî û psîkosoyal de têne parvekirin, bêyî razîbûna we ya eşkere bi kesên sêyemîn re nayên parvekirin.",
    sec4Title: "4. Rêbaz û Sedemên Hiqûqî yên Komkirina Daneyan",
    sec4Desc: "Daneyên we yên kesane bi riya formên pêwendiyê, formên serîlêdana piştgiriyê, qeydên çalakiyan, e-name yan jî serîlêdanên fîzîkî yên li navenda me têne komkirin. Ev dane li gorî xalên 5 û 6 yên KVKK'ê, li ser esasê 'di qanûnan de bi eşkereyî hatiye diyarkirin', 'pêkanîna berpirsiyariya hiqûqî ya berpirsê daneyan' û 'ji bo berjewendiyên meşrû yên berpirs mecbûrî ye bi şertê ku zirarê nede maf û azadiyên bingehîn ên kesê têkildar' têne xebitandin.",
    sec5Title: "5. Mafên Kesê Têkildar",
    sec5Desc: "Li gorî xala 11'an a KVKK'ê, xwediyên daneyan xwedî van mafan in:",
    sec5Items: [
      "Hînbûna ka daneyên kesane hatine bikaranîn an na,",
      "Heke daneyên kesane hatibin bikaranîn, daxwaza agahiyê li ser vê yekê,",
      "Hînbûna armanca bikaranînê û ka li gorî armancê hatine bikaranîn an na,",
      "Daxwaza rastkirina daneyan eger kêm an xelet hatibin bikaranîn,",
      "Daxwaza jêbirin an tunekirina daneyên kesane."
    ],
    sec5Footer: <>Hûn dikarin daxwazên xwe yên derbarê mafên xwe de ji navnîşana <strong>rosakadindernegi@gmail.com</strong> re bişînin an jî bi kesane serî li navenda komeleya me bidin.</>,
    lastUpdate: "Dîroka Nûvekirina Dawî: 26 Tebax 2026"
  },
  EN: {
    title: "PDPL Clarification Text",
    subtitle: "Information on the Protection and Processing of Personal Data",
    sec1Title: "1. Data Controller",
    sec1Desc: <>In accordance with the Personal Data Protection Law No. 6698 ("KVKK" / "PDPL"), as the <strong>Rosa Women's Association</strong>, we process your personal data in accordance with the law and for the purposes explained below. Our association attaches great importance to the privacy and security of your personal data.</>,
    sec2Title: "2. Purpose of Processing Personal Data",
    sec2Desc: "Your collected personal data is processed to carry out the following activities in line with the purposes specified in our association's statute:",
    sec2Items: [
      "Providing legal, psychological, and social support services within the scope of combating all forms of violence against women,",
      "Meeting and tracking requests reaching our association via communication and application portals,",
      "Organizing events, panels, workshops, and educational processes,",
      "Maintaining communication with donors and volunteers, keeping official records,",
      "Conducting our civil society activities in accordance with legal regulations."
    ],
    sec3Title: "3. Transfer of Processed Personal Data",
    sec3Desc: "Our association preserves your personal data based on absolute confidentiality. However, in order to fulfill legal obligations, it may be transferred to authorized public institutions and legally authorized private persons to the extent permitted by legislation. Your data shared during legal and psychosocial support services is never shared with third parties without your explicit consent.",
    sec4Title: "4. Method and Legal Reason for Collecting Personal Data",
    sec4Desc: "Your personal data is collected through contact forms on our website, support application forms, event registrations, e-mails, or physical applications made to our association center. This data is processed based on the legal reasons stated in Articles 5 and 6 of the KVKK: 'explicitly stipulated in the laws', 'necessary for the data controller to fulfill its legal obligation', and 'mandatory for legitimate interests, provided that it does not harm the fundamental rights and freedoms of the data subject.'",
    sec5Title: "5. Rights of the Data Subject",
    sec5Desc: "According to Article 11 of the KVKK, data subjects have the following rights:",
    sec5Items: [
      "To learn whether personal data is processed or not,",
      "To request information if personal data has been processed,",
      "To learn the purpose of processing and whether it is used in accordance with its purpose,",
      "To request correction of personal data if it is incomplete or incorrectly processed,",
      "To request the deletion or destruction of personal data."
    ],
    sec5Footer: <>You can send your requests regarding your rights to <strong>rosakadindernegi@gmail.com</strong> or apply in person to our association center.</>,
    lastUpdate: "Last Update Date: August 26, 2026"
  },
  DE: {
    title: "Informationstext zum Datenschutz (KVKK)",
    subtitle: "Informationen zum Schutz und zur Verarbeitung personenbezogener Daten",
    sec1Title: "1. Verantwortlicher",
    sec1Desc: <>Gemäß dem Gesetz zum Schutz personenbezogener Daten Nr. 6698 ("KVKK") verarbeiten wir als <strong>Rosa Frauenverein</strong> (Rosa Kadın Derneği) Ihre personenbezogenen Daten im Rahmen der unten erläuterten Zwecke und in Übereinstimmung mit dem Gesetz. Unser Verein legt großen Wert auf die Vertraulichkeit und Sicherheit Ihrer persönlichen Daten.</>,
    sec2Title: "2. Zweck der Datenverarbeitung",
    sec2Desc: "Ihre erhobenen personenbezogenen Daten werden verarbeitet, um die folgenden Aktivitäten im Einklang mit den in den Statuten unseres Vereins festgelegten Zwecken durchzuführen:",
    sec2Items: [
      "Bereitstellung von rechtlichen, psychologischen und sozialen Unterstützungsdiensten im Rahmen der Bekämpfung aller Formen von Gewalt gegen Frauen,",
      "Erfüllung und Verfolgung von Anfragen, die unseren Verein über Kommunikations- und Bewerbungsportale erreichen,",
      "Organisation von Veranstaltungen, Panels, Workshops und Bildungsprozessen,",
      "Aufrechterhaltung der Kommunikation mit Spendern und Freiwilligen, Führung offizieller Aufzeichnungen,",
      "Durchführung unserer zivilgesellschaftlichen Aktivitäten in Übereinstimmung mit den gesetzlichen Bestimmungen."
    ],
    sec3Title: "3. Übermittlung personenbezogener Daten",
    sec3Desc: "Unser Verein bewahrt Ihre personenbezogenen Daten auf der Grundlage absoluter Vertraulichkeit auf. Um jedoch rechtlichen Verpflichtungen nachzukommen, können sie in dem gesetzlich zulässigen Umfang an befugte öffentliche Einrichtungen und gesetzlich befugte Privatpersonen übermittelt werden. Ihre Daten, die während der rechtlichen und psychosozialen Unterstützung weitergegeben werden, werden ohne Ihre ausdrückliche Zustimmung niemals an Dritte weitergegeben.",
    sec4Title: "4. Methode und rechtlicher Grund",
    sec4Desc: "Ihre personenbezogenen Daten werden über Kontaktformulare auf unserer Website, Antragsformulare für Unterstützung, Veranstaltungsregistrierungen, E-Mails oder physische Anträge in unserem Vereinszentrum erhoben. Diese Daten werden auf Grundlage der in Artikel 5 und 6 des KVKK genannten rechtlichen Gründe verarbeitet: 'ausdrücklich in den Gesetzen vorgesehen', 'erforderlich, damit der Verantwortliche seiner rechtlichen Verpflichtung nachkommen kann' und 'zwingend für berechtigte Interessen erforderlich'.",
    sec5Title: "5. Rechte der betroffenen Person",
    sec5Desc: "Gemäß Artikel 11 des KVKK haben betroffene Personen folgende Rechte:",
    sec5Items: [
      "Zu erfahren, ob personenbezogene Daten verarbeitet werden oder nicht,",
      "Informationen anzufordern, wenn personenbezogene Daten verarbeitet wurden,",
      "Den Zweck der Verarbeitung zu erfahren und ob sie ihrem Zweck entsprechend verwendet werden,",
      "Die Berichtigung personenbezogener Daten zu verlangen, wenn diese fehlerhaft verarbeitet wurden,",
      "Die Löschung oder Vernichtung personenbezogener Daten zu verlangen."
    ],
    sec5Footer: <>Sie können Ihre Anfragen bezüglich Ihrer Rechte an <strong>rosakadindernegi@gmail.com</strong> senden oder sich persönlich an unser Vereinszentrum wenden.</>,
    lastUpdate: "Letztes Aktualisierungsdatum: 26. August 2026"
  },
  FR: {
    title: "Texte d'information (KVKK)",
    subtitle: "Informations sur la protection et le traitement des données personnelles",
    sec1Title: "1. Responsable du traitement",
    sec1Desc: <>Conformément à la loi n° 6698 sur la protection des données personnelles ("KVKK"), en tant qu'<strong>Association des Femmes Rosa</strong>, nous traitons vos données personnelles conformément à la loi et pour les finalités expliquées ci-dessous. Notre association attache une grande importance à la confidentialité et à la sécurité de vos données personnelles.</>,
    sec2Title: "2. Finalité du traitement",
    sec2Desc: "Vos données personnelles collectées sont traitées pour mener à bien les activités suivantes conformément aux finalités précisées dans les statuts de notre association :",
    sec2Items: [
      "Fournir des services de soutien juridique, psychologique et social dans le cadre de la lutte contre toutes les formes de violence à l'égard des femmes,",
      "Répondre et suivre les demandes parvenant à notre association via les portails de communication,",
      "Organiser des événements, panels, ateliers et processus éducatifs,",
      "Maintenir la communication avec les donateurs et les bénévoles, tenir des registres officiels,",
      "Mener nos activités de société civile conformément aux réglementations légales."
    ],
    sec3Title: "3. Transfert des données",
    sec3Desc: "Notre association conserve vos données personnelles sur la base d'une confidentialité absolue. Cependant, afin de remplir des obligations légales, elles peuvent être transférées à des institutions publiques autorisées et à des personnes privées légalement autorisées. Vos données partagées lors des services de soutien juridique et psychosocial ne sont jamais partagées avec des tiers sans votre consentement explicite.",
    sec4Title: "4. Méthode et motif légal",
    sec4Desc: "Vos données personnelles sont collectées via les formulaires de contact de notre site web, les formulaires de demande de soutien, les inscriptions aux événements, les e-mails ou les demandes physiques. Ces données sont traitées sur la base des motifs légaux énoncés dans les articles 5 et 6 de la KVKK : 'expressément stipulé dans les lois', 'nécessaire pour que le responsable du traitement remplisse son obligation légale', et 'obligatoire pour des intérêts légitimes'.",
    sec5Title: "5. Droits de la personne concernée",
    sec5Desc: "Selon l'article 11 de la KVKK, les personnes concernées ont les droits suivants :",
    sec5Items: [
      "Savoir si des données personnelles sont traitées ou non,",
      "Demander des informations si des données personnelles ont été traitées,",
      "Connaître la finalité du traitement et savoir si elles sont utilisées conformément à leur finalité,",
      "Demander la correction de données personnelles si elles sont incomplètes ou traitées de manière incorrecte,",
      "Demander la suppression ou la destruction de données personnelles."
    ],
    sec5Footer: <>Vous pouvez envoyer vos demandes concernant vos droits à <strong>rosakadindernegi@gmail.com</strong> ou vous présenter en personne à notre centre.</>,
    lastUpdate: "Date de la dernière mise à jour : 26 août 2026"
  }
};

export default function KVKKPage(): React.JSX.Element {
  const { lang } = useLanguage();
  const t = KVKK_TRANSLATIONS[lang] || KVKK_TRANSLATIONS['TR'];

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
            <ul className="list-disc pl-6 space-y-2 opacity-90">
              {t.sec2Items.map((item: string, idx: number) => (
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

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#6A4C93] dark:text-[#D4AF37]">{t.sec5Title}</h2>
            <p className="leading-relaxed opacity-90 mb-3">{t.sec5Desc}</p>
            <ul className="list-disc pl-6 space-y-2 opacity-90 mb-4">
              {t.sec5Items.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="leading-relaxed opacity-90">{t.sec5Footer}</p>
          </section>

          <div className="mt-12 p-6 bg-[#6A4C93]/5 dark:bg-[#D4AF37]/5 border border-[#6A4C93]/20 dark:border-[#D4AF37]/20 rounded-xl text-center">
            <p className="text-sm opacity-80">{t.lastUpdate}</p>
          </div>

        </div>
      </div>
    </div>
  );
}
