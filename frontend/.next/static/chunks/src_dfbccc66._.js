(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/context/ThemeContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const ThemeProvider = (param)=>{
    let { children } = param;
    _s();
    const [theme, setThemeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('light');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            setMounted(true);
            try {
                const savedTheme = localStorage.getItem('rosa_theme');
                if (savedTheme === 'dark' || savedTheme === 'light') {
                    setThemeState(savedTheme);
                    if (savedTheme === 'dark') {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                }
            } catch (_) {}
        }
    }["ThemeProvider.useEffect"], []);
    const setTheme = (newTheme)=>{
        // Disable CSS transitions temporarily to prevent lag/stutter during theme swap
        const css = document.createElement('style');
        css.type = 'text/css';
        css.appendChild(document.createTextNode('* { -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; -ms-transition: none !important; transition: none !important; }'));
        document.head.appendChild(css);
        setThemeState(newTheme);
        localStorage.setItem('rosa_theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Force a browser reflow before re-enabling transitions
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = window.getComputedStyle(document.body).opacity;
        setTimeout(()=>{
            document.head.removeChild(css);
        }, 10);
    };
    const toggleTheme = ()=>{
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme: mounted ? theme : 'light',
            toggleTheme,
            setTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/ThemeContext.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ThemeProvider, "8EJlfNZEM7Rz4lnQSGQ4gv329RU=");
_c = ThemeProvider;
const useTheme = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
_s1(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/LanguageContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const LanguageProvider = (param)=>{
    let { children } = param;
    _s();
    const [lang, setLangState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('TR');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            setMounted(true);
            const savedLang = localStorage.getItem('rosa_lang');
            if (savedLang) {
                setLangState(savedLang);
            }
        }
    }["LanguageProvider.useEffect"], []);
    const setLang = (newLang)=>{
        setLangState(newLang);
        localStorage.setItem('rosa_lang', newLang);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            lang: mounted ? lang : 'TR',
            setLang
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/LanguageContext.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LanguageProvider, "Pdvc6q3So2xkHqlBw9uE8ohj8tE=");
_c = LanguageProvider;
const useLanguage = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
_s1(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/constants/cms-database.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CMS_DATABASE",
    ()=>CMS_DATABASE,
    "NAV_TRANSLATIONS",
    ()=>NAV_TRANSLATIONS,
    "getMediaTheme",
    ()=>getMediaTheme,
    "getThemeClasses",
    ()=>getThemeClasses
]);
const NAV_TRANSLATIONS = {
    TR: {
        kurumsal: "Kurumsal",
        dayanisma: "Dayanışma",
        galeri: "Galeri",
        haberler: "Haberler",
        raporlar: "Raporlar",
        iletisim: "İletişim",
        bagis: "Bağış Yap",
        destek: "Destek Al",
        subHakkimizda: "Hakkımızda",
        subEkibimiz: "Ekibimiz",
        subSss: "Sıkça Sorulan Sorular",
        subBankaHesaplari: "Banka Hesaplarımız",
        icerikler: "İçerikler",
        bilgilendirme: "Bilgilendirme"
    },
    KU: {
        kurumsal: "Sazî",
        dayanisma: "Piştgirî",
        galeri: "Galeri",
        haberler: "Nûçeyan",
        raporlar: "Rapor",
        iletisim: "Têkilî",
        bagis: "Bexş Bike",
        destek: "Alîkarî",
        subHakkimizda: "Derbarê Me De",
        subEkibimiz: "Tîma Me",
        subSss: "Pirsên Pir Tên Pirsîn",
        subBankaHesaplari: "Hesabên Me Yên Bankeyê",
        icerikler: "Naverok",
        bilgilendirme: "Agahî"
    },
    EN: {
        kurumsal: "About Us",
        dayanisma: "Solidarity",
        galeri: "Gallery",
        haberler: "News",
        raporlar: "Reports",
        iletisim: "Contact",
        bagis: "Donate",
        destek: "Support",
        subHakkimizda: "Who We Are",
        subEkibimiz: "Our Team",
        subSss: "FAQ",
        subBankaHesaplari: "Bank Accounts",
        icerikler: "Contents",
        bilgilendirme: "Information"
    },
    DE: {
        kurumsal: "Über Uns",
        dayanisma: "Solidarität",
        galeri: "Galerie",
        haberler: "Nachrichten",
        raporlar: "Berichte",
        iletisim: "Kontakt",
        bagis: "Spenden",
        destek: "Hilfe",
        subHakkimizda: "Wer wir sind",
        subEkibimiz: "Unser Team",
        subSss: "FAQ",
        subBankaHesaplari: "Bankkonten",
        icerikler: "Inhalte",
        bilgilendirme: "Informationen"
    },
    FR: {
        kurumsal: "À Propos",
        dayanisma: "Solidarité",
        galeri: "Galerie",
        haberler: "Actualités",
        raporlar: "Rapports",
        iletisim: "Contact",
        bagis: "Faire un don",
        destek: "Soutien",
        subHakkimizda: "Qui sommes-nous",
        subEkibimiz: "Notre Équipe",
        subSss: "FAQ",
        subBankaHesaplari: "Comptes bancaires",
        icerikler: "Contenus",
        bilgilendirme: "Informations"
    }
};
const CMS_DATABASE = {
    TR: {
        hero: {
            slides: [
                {
                    id: 1,
                    badge: 'GÜVENLİ DAYANIŞMA AĞI',
                    title: "Yerel Rosa'lardan Evrensel Rosa'lara.",
                    highlightText: 'Bağımsız Kadın Mücadelesi',
                    desc: '09.11.2018 yılında Diyarbakır ilinde kurulan Rosa Kadın Derneği; kadını ve yaşamı temel alan toplumsal cinsiyet eşitliği ağlarını büyütür.',
                    imgUrl: '/image_2.png',
                    btnType: 'support'
                },
                {
                    id: 2,
                    badge: 'ŞİDDETSİZ YAŞAM İNŞASI',
                    title: 'Şiddetsiz Bir Dünya Mümkün.',
                    highlightText: 'Hukuki & Psikososyal Güvence',
                    desc: 'Şiddete maruz bırakılan kadınların adli yardım mekanizmalarına erişimini destekliyor, mutlak gizlilik esasıyla yanlarında duruyoruz.',
                    imgUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80',
                    btnType: 'explore'
                },
                {
                    id: 3,
                    badge: 'EKOLOJİK MÜCADELE',
                    title: 'Doğayı, Kadını ve Yaşamı Savunuyoruz.',
                    highlightText: 'Ekoloji & Barış Kültürü',
                    desc: 'Ekolojik bir yaşam inşasını sağlamak, doğayı korumak ve sivil alanda eşitlikçi demokrasi kültürünü yaygınlaştırmak için çalışıyoruz.',
                    imgUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80',
                    btnType: 'support'
                }
            ]
        },
        sections: {
            workAreasTitle: "Çalışma Alanlarımız",
            workAreasSub: "Şiddetsiz Bir Dünya İçin Dayanışma Ağlarımız.",
            galleryTitle: "Sahadan Kareler",
            gallerySub: "Dayanışmanın ve Mücadelenin Canlı Hafızası",
            mediaTitle: "Medya & Raporlar",
            mediaSub: "Sahadan Güncel Veriler ve Hak İhlali Çeteleri",
            aboutTitle: "Rosa Kadın Derneği",
            aboutSub: "Kuruluş Amacımız ve İlkesel Duruşumuz",
            aboutDesc: "Rosa Kadın Derneği 09.11.2018 yılında Diyarbakır ilinde kurulmuştur. Kuruluş amacı; kadına yönelik toplumsal, siyasal, sosyal, kültürel, ekonomik, cinsel, psikolojik her türlü şiddetle mücadele etmek, kadına yönelik her türlü ayrımcılığın ortadan kaldırılmasını sağlayacak çalışmalar yürütmek, toplumsal cinsiyet eşitliğini yaygınlaştırmak için projeler geliştirmek, uygulamak, sivil toplum ve kadın örgütleri ile dayanışmak ve doğayı-doğal yaşamı korumak, ekolojik bir yaşam inşasını sağlamak, demokrasi ve barış kültürünü yaymak ve gerçekleştirmektir."
        },
        stats: {
            stat1Val: "160+",
            stat1Label: "Resmi Şiddet Mağduru Başvurusu",
            stat2Val: "%100",
            stat2Label: "Mutlak Gizlilik ve Güvenlik Esası"
        },
        contact: {
            title: "Yalnız Değilsiniz.",
            desc: "Şiddete maruz kaldığınızda, hak ihlaline uğradığınızda ya da hukuki/psikolojik desteğe ihtiyaç duyduğunuzda merkezimize gelebilir veya resmi iletişim hatlarımızdan bize güvenle ulaşabilirsiniz.",
            phoneTitle: "Resmi Başvuru Hattı",
            phone: "0552 466 86 21",
            emailTitle: "Resmi E-Posta Adresi",
            email: "rosakadindernegi@gmail.com",
            addressTitle: "Merkez Adresi",
            address: "Yenişehir Mahallesi Lise Caddesi Çavuşoğlu 6 sitesi No:10/A/D:6 Yenişehir / DİYARBAKIR"
        },
        ui: {
            btnSupport: "Destek Al",
            btnExplore: "Derneği İncele",
            btnReadReport: "Raporu İncele",
            tabNews: "Haberler",
            tabAnnouncements: "Duyurular",
            tabQuestions: "Sorular",
            btnAllNews: "Tüm Haberler",
            btnAllAnnouncements: "Tümünü Gör",
            cardTitle: "%100 Güvenli Alan.",
            cardDesc: "Derneğimize yapılan tüm başvurular ve dayanışma süreçleri mutlak gizlilik esasıyla, uzman avukat ve psikologlarımız tarafından titizlikle yürütülür.",
            cardActive: "● 7/24 Aktif Kriz Hattı",
            cardSub: "Şiddetsiz Yaşam",
            btnDetails: "Detayları İncele",
            btnClose: "Kapat",
            btnSend: "Güvenle Gönder",
            btnNewMsg: "Yeni Mesaj Gönder",
            formTitle: "Güvenli Başvuru ve İletişim Portalı",
            labelName: "Rumuz veya İsim",
            labelChan: "İletişim Kanalı (Telefon / E-posta)",
            labelMsg: "Mesajınız veya Destek Talebiniz",
            pl1: "Kimliğinizi tamamen gizli tutabilirsiniz...",
            pl2: "E-posta veya Telefon Numarası...",
            pl3: "Paylaştığınız tüm bilgiler yasal koruma ve mutlak gizlilik altındadır...",
            formError: "Lütfen iletişim kanalı ve mesaj alanını doldurun.",
            formSending: "Güvenli Bağlantı Kuruluyor...",
            formSuccessTitle: "Mesajınız Güvenle İletildi.",
            formSuccessDesc: "Uzman dayanışma ekiplerimiz en kısa sürede sizinle iletişime geçecektir. Asla yalnız değilsiniz.",
            socialMedia: "Sosyal Medya Hesaplarımız",
            footer: "Bu web sitesi Haklara Destek programı kapsamında Avrupa Birliği desteği ile hazırlanmıştır. İçeriğin sorumluluğu tamamıyla Rosa Kadın Derneği’ne aittir ve AB’nin görüşlerini yansıtmamaktadır. © 2026 Rosa Kadın Derneği.",
            footerQuickMenu: "Hızlı Menü",
            footerHome: "Ana Sayfa",
            footerAbout: "Hakkımızda",
            footerWork: "Çalışma Alanlarımız",
            footerContact: "İletişim & Başvuru",
            footerFaq: "SSS",
            footerContracts: "Sözleşmeler",
            footerKVKK: "KVKK Aydınlatma Metni",
            footerTerms: "Kullanım Şartları",
            footerPrivacy: "Gizlilik Politikası",
            footerCookies: "Çerez Politikası",
            footerBank: "Banka Hesaplarımız",
            bankName: "Ziraat Bankası",
            accountHolderLabel: "Hesap Sahibi:",
            accountHolderName: "Rosa Kadın Derneği",
            donateModalTitle: "Banka İrtibat ve Bağış Hesapları",
            donateModalSub: "Dayanışmayı Büyüt",
            donateModalDesc: "Yapacağınız her bağış; şiddete maruz kalan kadınların adli yardım süreçlerine, psikososyal destek seanslarına ve kadın hakları savunuculuğuna özgüç sağlar.",
            donateModalAccountType: "Resmi Dernek Hesabı",
            donateModalIbanLabel: "IBAN Numarası",
            donateModalCopy: "Kopyala",
            donateModalCopied: "Kopyalandı!",
            donateModalSecurityInfo: "Tüm bağışlar resmi dernek tüzüğü ve şeffaf denetim standartlarına tabidir.",
            ariaThemeToggle: "Tema Değiştir",
            ariaMenuToggle: "Menüyü Aç/Kapat",
            ariaPrevSlide: "Önceki Slayt",
            ariaNextSlide: "Sonraki Slayt",
            ariaScrollTop: "Yukarı Çık",
            callUs: "Bizi Arayın",
            eventsTitle: "Etkinlikler",
            eventsOnDate: "{date} Etkinlikleri",
            latestEvents: "Son Etkinlikler",
            seeAllEvents: "Tüm Etkinlikleri Gör",
            noEventsFound: "Bu tarihe ait etkinlik bulunamadı.",
            showAllEvents: "Tüm etkinlikleri göster",
            reportsTitle: "Raporlar",
            seeAllReports: "Tüm Raporlar",
            viewReport: "Raporu Görüntüle",
            noReportsFound: "Henüz rapor bulunmuyor.",
            months: [
                "OCAK",
                "ŞUBAT",
                "MART",
                "NİSAN",
                "MAYIS",
                "HAZİRAN",
                "TEMMUZ",
                "AĞUSTOS",
                "EYLÜL",
                "EKİM",
                "KASIM",
                "ARALIK"
            ],
            daysMin: [
                "PT",
                "SA",
                "ÇA",
                "PE",
                "CU",
                "CT",
                "PZ"
            ]
        },
        modules: [
            {
                id: "hukuki",
                dbIconStr: "Scale",
                colorTheme: "purple",
                title: "Hukuki Danışmanlık ve Hak Arama Ağları",
                badge: "Adli Destek Hukuk Ağı",
                desc: "Kadına yönelik her türlü şiddetle mücadele etmek, hak ihlallerini raporlamak ve adli süreçlerde kadınların adli yardım mekanizmalarına erişimini desteklemek amacıyla kurulan hukuk ağı.",
                extra: "Hukuk komisyonumuz; derneğimize başvuran kadınların adli yardım süreçlerini koordine eder, duruşma takiplerini gerçekleştirir, hak ihlallerini uluslararası standartlarda raporlar ve kadın hakları savunuculuğu yapar."
            },
            {
                id: "psikolojik",
                dbIconStr: "Brain",
                colorTheme: "orange",
                title: "Psikososyal Destek ve Sağaltım Dayanışması",
                badge: "Travma Sonrası Destek",
                desc: "Şiddete maruz bırakılan kadınların uğradıkları zararları gidermek, şiddetin etkilerinden kurtulmalarını ve sağaltılmalarını sağlamak amacıyla yürütülen psikososyal takip ağı.",
                extra: "Psikososyal dayanışma ağımız; şiddet başvurularını titizlikle alır, kadınların sağaltım süreçlerine destek olur ve travma sonrasındaki stres, anksiyete, izolasyon döngülerini kırmak adına takipler gerçekleştirir."
            },
            {
                id: "ekoloji",
                dbIconStr: "Leaf",
                colorTheme: "green",
                title: "Ekolojik Yaşam ve Doğal Denge İnşası",
                badge: "Ekolojik",
                desc: "Doğayı ve doğal yaşamı korumayı, ekolojik bir yaşamın inşasını sağlamayı, sivil alanda örgütlenmeyi, demokrasi ve barış kültürünü gerçekleştirmeyi hedefleyen ekoloji çalışmaları.",
                extra: "Ekoloji birimimiz; kadının doğayla bütünleşik bağını savunur, çevre hakları ihlallerine karşı sivil alanda ses çıkarır ve ekolojik yaşam atölyeleri üretir."
            },
            {
                id: "akademi",
                dbIconStr: "BookOpen",
                colorTheme: "yellow",
                title: "Toplumsal Cinsiyet Eşitliği ve Akademi",
                badge: "Hak Bilinci & Örgütlenme",
                desc: "Toplumsal cinsiyet eşitliğini yaygınlaştırmak amacıyla projeler geliştirmek, farkındalık atölyeleri, paneller, eğitimler düzenlemek ve sivil kadın örgütlenmelerini güçlendirmek.",
                extra: "Akademi komisyonumuz; kadın emeğinin görünürlüğü, toplumsal cinsiyet rolleri ve hak temelli örgütlenme modelleri üzerine akademik incelemeler, seminerler ve eğitim programları organize eder."
            }
        ],
        galleryItems: [
            {
                id: 1,
                title: "Saha Çalışmaları ve Mahalle Kadın Toplantıları",
                category: "Saha",
                imgUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 2,
                title: "Kadın Hakları Akademisi Sertifika Programları",
                category: "Eğitim",
                imgUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 3,
                title: "Ekoloji ve Yerel Tarım Atölyeleri",
                category: "Ekoloji",
                imgUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 4,
                title: "Uluslararası Dayanışma ve Hak Savunuculuğu Panelleri",
                category: "Akademi",
                imgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
            }
        ],
        mediaItems: [
            {
                id: 1,
                typeCode: "news",
                badge: "Duyuru",
                date: "08.03.2026",
                title: "8 Mart Alanlarındayız: Haklarımızdan Vazgeçmiyoruz",
                desc: "Rosa Kadın Derneği olarak, Diyarbakır sokaklarında kadınların özgürlük, eşitlik ve şiddetsiz bir yaşam talebini haykırmak için yürütülen kitlesel etkinliklerimize dair kurumsal deklarasyonumuz."
            },
            {
                id: 2,
                typeCode: "report",
                badge: "Şiddet Çetelesi",
                date: "30.06.2026",
                title: "Doğu ve Güneydoğu Anadolu Kadın Hakları İhlal Raporu",
                desc: "Yılın ilk yarısında derneğimize ve bölgedeki adli mercilere yansıyan kadına yönelik şiddet vakalarının, hak ihlallerinin ve kurumsal ihmallerin istatistiksel verilerle detaylandırılmış resmi çetelesi."
            },
            {
                id: 3,
                typeCode: "campaign",
                badge: "Kampanya",
                date: "15.05.2026",
                title: "İstanbul Sözleşmesi Yaşatır: Yerel Farkındalık Hareketi",
                desc: "Uluslararası sözleşmelerin yerelde uygulanması ve mahalle bazlı hak bilincinin oluşturulması adına Diyarbakır'ın tüm ilçelerinde başlattığımız interaktif bilgilendirme kampanyası."
            }
        ],
        reportsItems: [
            {
                id: 1,
                title: "Kürt Kadın Hak Savunucularına Yönelik Yargı Tacizi Raporu",
                desc: "Tarafınızca özel olarak ilgilenilecek başlıklar arasında “kadınlara, özellikle kadın insan hakları savunucular...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-29-19-1432624050.jpg",
                link: "/raporlar/kkhsyyt.pdf"
            },
            {
                id: 2,
                title: "DİYARBAKIR ŞİDDETLE MÜCADELE AĞI KASIM AYI 2020 RAPORU",
                desc: "Saygıdeğer basın emekçileri, 8 Mart 2019’da kuruluşunu deklare eden Diyarbakır Şiddetle Mücadele Ağı olarak...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-26-44-886473420.jpg",
                link: "/raporlar/dsmar2020.pdf"
            },
            {
                id: 3,
                title: "DİYARBAKIR KADINA YÖNELİK ŞİDDETLE MÜCADELE AĞI RAPORU",
                desc: "7 Mart 2019 da 3 maddelik protokolü imzalayarak kadına yönelik şiddete karşı ortak çalışma yürüteceğini deklar...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-22-30-1083148832.jpg",
                link: "/raporlar/dksmar2019.pdf"
            },
            {
                id: 4,
                title: "DİYARBAKIR ŞİDDETLE MÜCADELE AĞI 2023 YILI RAPORU",
                desc: "Bu rapor Diyarbakır’da kadın, çocuk ve LGBTİ+ hakları alanında çalışma yürüten şiddetle mücadele ağı bileşenle...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-10-13-365402844.jpg",
                link: "/raporlar/dsma2023.pdf"
            }
        ],
        newsItems: [
            {
                id: 1,
                title: "Kadına Yönelik Şiddetle Mücadele Ağı Ortak Basın Açıklaması Gerçekleştirildi",
                date: "27 Temmuz 2026 Pazartesi",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 2,
                title: "Rosa Kadın Derneği Sahada: Dayanışma Atölyeleri Başladı",
                date: "20 Temmuz 2026 Pazartesi",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 3,
                title: "Örnek Haber Başlığı 3",
                date: "15 Temmuz 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 4,
                title: "Örnek Haber Başlığı 4",
                date: "12 Temmuz 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 5,
                title: "Örnek Haber Başlığı 5",
                date: "10 Temmuz 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 6,
                title: "Örnek Haber Başlığı 6",
                date: "08 Temmuz 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 7,
                title: "Örnek Haber Başlığı 7",
                date: "05 Temmuz 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 8,
                title: "Örnek Haber Başlığı 8",
                date: "01 Temmuz 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 9,
                title: "Örnek Haber Başlığı 9",
                date: "28 Haziran 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 10,
                title: "Örnek Haber Başlığı 10",
                date: "20 Haziran 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 11,
                title: "Örnek Haber Başlığı 11",
                date: "15 Haziran 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 12,
                title: "Örnek Haber Başlığı 12",
                date: "10 Haziran 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            }
        ],
        announcementItems: [
            {
                id: 1,
                title: "8 Mart Dünya Emekçi Kadınlar Günü Etkinlik Takvimi",
                date: "9 Temmuz 2026",
                link: "/haberler"
            },
            {
                id: 2,
                title: "Toplumsal Cinsiyet Eşitliği Atölyesi Başvuruları Başladı",
                date: "3 Temmuz 2026",
                link: "/haberler"
            },
            {
                id: 3,
                title: "Hukuki Destek Semineri: Haklarımızı Biliyoruz",
                date: "29 Haziran 2026",
                link: "/haberler"
            },
            {
                id: 4,
                title: "Kadın Dayanışma Ağı Aylık Değerlendirme Toplantısı",
                date: "17 Haziran 2026",
                link: "/haberler"
            }
        ],
        questionItems: [
            {
                id: 1,
                title: "Şiddete maruz kaldığımda derneğinize nasıl ulaşabilirim?",
                date: "1 Temmuz 2026",
                link: "/sss"
            },
            {
                id: 2,
                title: "Hukuki danışmanlık hizmetleriniz ücretli mi?",
                date: "2 Temmuz 2026",
                link: "/sss"
            },
            {
                id: 3,
                title: "Görüşmelerde kimliğimin gizli tutulacağından nasıl emin olabilirim?",
                date: "3 Temmuz 2026",
                link: "/sss"
            },
            {
                id: 4,
                title: "Dernekteki psikologlarla nasıl görüşebilirim?",
                date: "4 Temmuz 2026",
                link: "/sss"
            }
        ]
    },
    KU: {
        hero: {
            slides: [
                {
                    id: 1,
                    badge: 'TORA PIŞTGIRIYÊ YA EWLE',
                    title: "Ji Rosa'yên Herêmî Ber Bi Rosa'yên Gerdûnî Ve.",
                    highlightText: 'Têkoşîna Jinê Ya Serbixwe',
                    desc: 'Komeleya Jinan a Rosa ku di 09.11.2018’an de li Amedê hat avakirin; torên wekheviya zayendî yên civakî ku jin û jiyanê esas digirin mezin dike.',
                    imgUrl: '/image_2.png',
                    btnType: 'support'
                },
                {
                    id: 2,
                    badge: 'AVAKIRINA JIYANÊN BÊTUNDÎ',
                    title: 'Cîhanek Bêtundî Pêkan E.',
                    highlightText: 'Ewlehiya Hiqûqî û Psîkososyal',
                    desc: 'Em piştgirî didin jinên ku rastî tundiyê tên da ku bigihîjin mekanîzmayên alîkariya hiqûqî û bi hinceta veşartiya mitleq em li cem wan disekinin.',
                    imgUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80',
                    btnType: 'explore'
                },
                {
                    id: 3,
                    badge: 'TÊKOŞÎNA EKOLOJÎK',
                    title: 'Em Xwezayê, Jinê Û Jiyanê Diparêzin.',
                    highlightText: 'Eko-Femînîzm & Çanda Aştiyê',
                    desc: 'Em ji bo avakirina jiyaneke ekolojîk, parastina xwezayê û belavkirina çanda demokrasiya wekhevîparêz a di qada sivîl de dixebitin.',
                    imgUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80',
                    btnType: 'support'
                }
            ]
        },
        sections: {
            workAreasTitle: "Qadên Xebatê",
            workAreasSub: "Ji Bo Cîhaneke Bêtundî Torên Me Yên Piştgiriyê.",
            galleryTitle: "Wêne Ji Qadê",
            gallerySub: "Bîra Zindî ya Piştgirî û Têkoşînê",
            mediaTitle: "Medya & Rapor",
            mediaSub: "Daneyên Rojane yên Ji Qadê û Bîlançoyên Binpêkirina Mafan",
            aboutTitle: "Komeleya Jinan a Rosa",
            aboutSub: "Armanca Avakirinê û Rêgezên Me",
            aboutDesc: "Komeleya Jinan a Rosa di 09.11.2018an de li Amedê hatiye avakirin. Armanca avakirinê; têkoşîna li dijî her cûre tundiya civakî, siyasî, çandî, aborî, zayendî û psîkolojîk a li ser jinan, meşandina xebatên ku dê her cûre cihêkariya li dijî jinan ji holê rake, pêşvebirin û cîbicîkirina projeyan ji bo belavkirina wekheviya zayendî ya civakî, hevgirtina bi rêxistinên civaka sivîl û jinan re û parastina xweza û jiyana xwezayî, dabînkirina avakirina jiyaneke ekolojîk û belavkirin û pêkanîna çanda demokrasî û aştiyê ye."
        },
        stats: {
            stat1Val: "160+",
            stat1Label: "Serlêdanên Tundiyê",
            stat2Val: "%100",
            stat2Label: "Rêgeza Nepenîtiya Mutlak"
        },
        contact: {
            title: "Hûn Ne Tenê Ne.",
            desc: "Dema ku hûn rastî tundiyê hatin, rastî binpêkirina mafan hatin, an jî dema ku we pêwîstî bi piştgiriya hiqûqî/psîkolojîk dît, hûn dikarin werin navenda me an jî bi rêya xetên me yên ragihandinê yên fermî bi ewlehî bi me re têkilî deynin.",
            phoneTitle: "Xeta Serlêdanê ya Fermî",
            phone: "0552 466 86 21",
            emailTitle: "Navnîşana E-Posteyê ya Fermî",
            email: "rosakadindernegi@gmail.com",
            addressTitle: "Navnîşana Navendê",
            address: "Yenişehir Mahallesi Lise Caddesi Çavuşoğlu 6 sitesi No:10/A/D:6 Yenişehir / AMED"
        },
        ui: {
            btnSupport: "Piştgirî Bistîne",
            btnExplore: "Kêşf Bikin",
            btnReadReport: "Raporê Bixwîne",
            tabNews: "Nûçeyan",
            tabAnnouncements: "Daxuyanî",
            tabQuestions: "Pirsan",
            btnAllNews: "Hemû Nûçeyan",
            btnAllAnnouncements: "Hemû Daxuyanî",
            cardTitle: "Qada Ewle.",
            cardDesc: "Hemû serlêdan li ser bingeha nepenîtiyê têne meşandin.",
            cardActive: "● 7/24 Aktîf",
            cardSub: "Jiyana Bê Tundî",
            btnDetails: "Hûrgulî",
            btnClose: "Girtin",
            btnSend: "Bişîne",
            btnNewMsg: "Peyamek Nû",
            formTitle: "Portala Ewle",
            labelName: "Nasnav",
            labelChan: "Kanala Têkilî",
            labelMsg: "Peyama We",
            pl1: "Nasnameya xwe veşartî bigirin...",
            pl2: "Telefon an E-post",
            pl3: "Nepenîtiya mutlak...",
            formError: "Dagirin.",
            formSending: "Tê Şandin...",
            formSuccessTitle: "Hate Şandin.",
            formSuccessDesc: "Dê bi we re têkilî daynin.",
            socialMedia: "Medyaya Civakî",
            footer: "Ev malper di çarçoveya bernameya Haklara Destek de bi piştevaniya Yekîtiya Ewropayê hatiye amadekirin. © 2026 Komeleya Rosa.",
            footerQuickMenu: "Pêşeka Bilez",
            footerHome: "Malper",
            footerAbout: "Derbarê Me",
            footerWork: "Qadên Xebatê",
            footerContact: "Têkilî & Serlêdan",
            footerFaq: "Pirsên Pir Tên Pirsîn",
            footerContracts: "Peymanan",
            footerKVKK: "Daxuyaniya KVKK",
            footerTerms: "Mercên Bikaranînê",
            footerPrivacy: "Polîtîkaya Nepenîtiyê",
            footerCookies: "Polîtîkaya Çerezan",
            footerBank: "Hesabên Bankê",
            bankName: "Ziraat Bankası",
            accountHolderLabel: "Xwediyê Hesabê:",
            accountHolderName: "Komeleya Jinan a Rosa",
            donateModalTitle: "Hesabên Têkilî û Bexşînê yên Bankê",
            donateModalSub: "Piştgiriyê Mezin Bikin",
            donateModalDesc: "Her bexşîna ku hûn dikin; piştgirî dide pêvajoyên alîkariya hiqûqî, danişînên piştgiriya psîkososyal û parastina mafên jinan ên jinên ku rastî tundiyê tên.",
            donateModalAccountType: "Hesabê Komeleyê yê Fermî",
            donateModalIbanLabel: "Hejmara IBAN",
            donateModalCopy: "Kopî",
            donateModalCopied: "Kopî bû!",
            donateModalSecurityInfo: "Hemî bexş di bin rêziknameya fermî ya komeleyê û standardên kontrolê yên zelal de ne.",
            ariaThemeToggle: "Mijarê Biguhêre",
            ariaMenuToggle: "Pêşek Veke/Bigre",
            ariaPrevSlide: "Slayda Pêş",
            ariaNextSlide: "Slayda Paş",
            ariaScrollTop: "Biçe Jor",
            callUs: "Telefonî Me Bikin",
            eventsTitle: "Bûyeran",
            eventsOnDate: "Bûyerên {date}",
            latestEvents: "Bûyerên Dawî",
            seeAllEvents: "Hemû Bûyeran Bibîne",
            noEventsFound: "Di vê dîrokê de bûyer nehat dîtin.",
            showAllEvents: "Hemû bûyeran nîşan bide",
            reportsTitle: "Rapor",
            seeAllReports: "Hemû Rapor",
            viewReport: "Raporê Bixwîne",
            noReportsFound: "Hîn rapor tune.",
            months: [
                "RÊBENDAN",
                "REŞEMÎ",
                "ADAR",
                "AVRÊL",
                "GULAN",
                "PÛŞPER",
                "TÎRMEH",
                "TEBAX",
                "ÎLON",
                "COTMEH",
                "MIJDAR",
                "BERFANBAR"
            ],
            daysMin: [
                "DŞ",
                "SŞ",
                "ÇR",
                "PŞ",
                "ÎN",
                "ŞM",
                "YŞ"
            ]
        },
        modules: [
            {
                id: "hukuki",
                dbIconStr: "Scale",
                colorTheme: "purple",
                title: "Şêwirmendiya Hiqûqî û Torên Lêgerîna Mafan",
                badge: "Tora Hiqûqê",
                desc: "Tora hiqûqî ya ku ji bo têkoşîna li dijî her cure tundiya li ser jinê, raporkirina binpêkirinên mafan û piştgirîkirina gihîştina jinan a mekanîzmayên alîkariya hiqûqî di pêvajoyên adlî de hatiye avakirin.",
                extra: "Komîsyona me ya hiqûqî; pêvajoyên alîkariya hiqûqî yên jinên ku serî li komeleya me didin koordîne dike, danişînan dişopîne, di standardên navneteweyî de binpêkirinên mafan radigihîne û parastina mafên jinan dike."
            },
            {
                id: "psikolojik",
                dbIconStr: "Brain",
                colorTheme: "orange",
                title: "Piştgiriya Psîkososyal û Hevgirtina Qencbûnê",
                badge: "Qada Ewle",
                desc: "Tora şopandina psîkososyal a ku ji bo telafîkirina zirarên jinên rastî tundiyê hatine, ji bo ku jin ji bandorên tundiyê xilas bibin û qenc bibin tê meşandin.",
                extra: "Tora me ya piştevaniya psîkososyal; bi hûrgilî serlêdanên tundiyê werdigire, piştgirî dide pêvajoyên qencbûna jinan û ji bo şikandina çerxên stres, fikar û îzolasyonê yên piştî trawmayê şopandinê pêk tîne."
            },
            {
                id: "ekoloji",
                dbIconStr: "Leaf",
                colorTheme: "green",
                title: "Jiyana Ekolojîk û Avakirina Hevsengiya Xwezayî",
                badge: "Ekolojîk",
                desc: "Xebatên ekolojiyê yên ku parastina xweza û jiyana xwezayî, dabînkirina avakirina jiyaneke ekolojîk, rêxistinbûna li qada sivîl, pêkanîna çanda demokrasî û aştiyê armanc dike.",
                extra: "Yekîneya me ya ekolojiyê; li ser bingeha girêdana entegre ya jinê bi xwezayê re diparêze, li qada sivîl li dijî binpêkirinên mafên jîngehê dengê xwe bilind dike û atolyeyên jiyana ekolojîk hildiberîne."
            },
            {
                id: "akademi",
                dbIconStr: "BookOpen",
                colorTheme: "yellow",
                title: "Wekheviya Zayendî ya Civakî û Akademî",
                badge: "Hişyaryarî",
                desc: "Ji bo berbelavkirina wekheviya zayendî ya civakî pêşxistina projeyan, organîzekirina atolyeyên hişyariyê, panel, perwerde û xurtkirina rêxistinên sivîl ên jinan.",
                extra: "Komîsyona me ya akademiyê; li ser dîtina keda jinê, rolên zayendî û modelên rêxistinbûna li ser bingeha mafan, lêkolînên akademîk, semîner û bernameyên perwerdehiyê organîze dike."
            }
        ],
        galleryItems: [
            {
                id: 1,
                title: "Xebatên Qadê",
                category: "Qad",
                imgUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 2,
                title: "Akademî",
                category: "Akademî",
                imgUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 3,
                title: "Ekolojî",
                category: "Ekolojî",
                imgUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 4,
                title: "Panel",
                category: "Panel",
                imgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
            }
        ],
        mediaItems: [
            {
                id: 1,
                typeCode: "news",
                badge: "Duyurî",
                date: "08.03.2026",
                title: "Em Li Qadên 8'ê Adarê Ne: Em Ji Mafên Xwe Dest Bernadin",
                desc: "Weke Komeleya Jinan a Rosa, daxuyaniya me ya kurumsal derbarê çalakiyên me yên girseyî yên ku li kolanên Amedê ji bo qîrîna daxwaza jinan a azadî, wekhevî û jiyaneke bêtundî tên lidarxistin."
            },
            {
                id: 2,
                typeCode: "report",
                badge: "Çetle",
                date: "30.06.2026",
                title: "Rapora Binpêkirina Mafên Jinan li Herêma Rojhilat û Başûrê Rojhilatê Anadoluyê",
                desc: "Bîlançoya fermî ya ku bi daneyên îstatîstîkî yên bûyerên tundiya li ser jinê, binpêkirinên mafan û xemsariyên kurumsal ên ku di nîvê yekem a salê de di nav komeleya me û meqamên dadwerî yên herêmê de hatine xuyakirin, bi hûrgilî tê de cih digire."
            },
            {
                id: 3,
                typeCode: "campaign",
                badge: "Kampanya",
                date: "15.05.2026",
                title: "Peymana Stenbolê Dide Jiyîn: Tevgera Hişyariya Herêmî",
                desc: "Kampanyaya agahdarkirina înteraktîf a ku me li hemû navçeyên Amedê ji bo pêkanîna peymanên navneteweyî yên li herêmê û avakirina hişmendiya mafan a li ser bingeha taxan daye destpêkirin."
            }
        ],
        reportsItems: [
            {
                id: 1,
                title: "Rapora Tacîza Darazê ya li dijî Parêzvanên Mafên Jinên Kurd",
                desc: "Di nav sernavên ku dê ji hêla we ve bi taybetî werin lêkolîn kirin de 'jin, nemaze parêzvanên mafên mirovan ên jin...'",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-29-19-1432624050.jpg",
                link: "/raporlar/kkhsyyt.pdf"
            },
            {
                id: 2,
                title: "RAPORA MIJDAR 2020 YA TORA TÊKOŞÎNA LI DIJÎ TUNDIYÊ YA AMEDÊ",
                desc: "Kedkarên hêja yên çapemeniyê, wekî Tora Têkoşîna li Dijî Tundiyê ya Amedê ku avabûna xwe di 8ê Adara 2019an de ragihand...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-26-44-886473420.jpg",
                link: "/raporlar/dsmar2020.pdf"
            },
            {
                id: 3,
                title: "RAPORA TORA TÊKOŞÎNA LI DIJÎ TUNDIYA LI SER JINÊ YA AMEDÊ",
                desc: "Bi îmzekirina protokola 3 xalî di 7ê Adara 2019an de, me ragihand ku em ê li dijî tundiya li ser jinê xebatên hevpar bimeşînin...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-22-30-1083148832.jpg",
                link: "/raporlar/dksmar2019.pdf"
            },
            {
                id: 4,
                title: "RAPORA SALA 2023AN YA TORA TÊKOŞÎNA LI DIJÎ TUNDIYÊ YA AMEDÊ",
                desc: "Ev rapor ji aliyê pêkhateyên tora têkoşîna li dijî tundiyê yên ku di qada mafên jin, zarok û LGBTÎ+an de li Amedê xebat dikin ve...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-10-13-365402844.jpg",
                link: "/raporlar/dsma2023.pdf"
            }
        ],
        newsItems: [
            {
                id: 1,
                title: "Daxuyaniya Çapemeniyê ya Hevpar a Tora Têkoşîna Li Dijî Tundiya Li Ser Jinê",
                date: "27 Tîrmeh 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 2,
                title: "Komeleya Jinan a Rosa li Qadê: Atolyeyên Piştgiriyê Dest Pê Kir",
                date: "20 Tîrmeh 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 3,
                title: "Nûçeya Mînak 3",
                date: "15 Tîrmeh 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 4,
                title: "Nûçeya Mînak 4",
                date: "12 Tîrmeh 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 5,
                title: "Nûçeya Mînak 5",
                date: "10 Tîrmeh 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 6,
                title: "Nûçeya Mînak 6",
                date: "08 Tîrmeh 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 7,
                title: "Nûçeya Mînak 7",
                date: "05 Tîrmeh 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 8,
                title: "Nûçeya Mînak 8",
                date: "01 Tîrmeh 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 9,
                title: "Nûçeya Mînak 9",
                date: "28 Pûşper 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 10,
                title: "Nûçeya Mînak 10",
                date: "20 Pûşper 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 11,
                title: "Nûçeya Mînak 11",
                date: "15 Pûşper 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 12,
                title: "Nûçeya Mînak 12",
                date: "10 Pûşper 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            }
        ],
        announcementItems: [
            {
                id: 1,
                title: "Salnameya Çalakiya 8'ê Adarê Roja Jinên Kedkar ên Cîhanê",
                date: "9 Tîrmeh 2026",
                link: "/haberler"
            },
            {
                id: 2,
                title: "Serlêdanên Atolyeya Wekheviya Zayendî ya Civakî Dest Pê Kirin",
                date: "3 Tîrmeh 2026",
                link: "/haberler"
            },
            {
                id: 3,
                title: "Semînera Piştgiriya Hiqûqî: Em Mafên Xwe Dizanin",
                date: "29 Pûşper 2026",
                link: "/haberler"
            },
            {
                id: 4,
                title: "Civîna Nirxandina Mehane ya Tora Piştevaniya Jinan",
                date: "17 Pûşper 2026",
                link: "/haberler"
            }
        ],
        questionItems: [
            {
                id: 1,
                title: "Dema ku ez rastî tundiyê bêm ez çawa dikarim xwe bigihînim komeleya we?",
                date: "1 Tîrmeh 2026",
                link: "/sss"
            },
            {
                id: 2,
                title: "Gelo xizmetên we yên şêwirmendiya hiqûqî bi pere ne?",
                date: "2 Tîrmeh 2026",
                link: "/sss"
            },
            {
                id: 3,
                title: "Ez çawa dikarim pê bawer bim ku di hevdîtinan de nasnameya min wê veşartî bimîne?",
                date: "3 Tîrmeh 2026",
                link: "/sss"
            },
            {
                id: 4,
                title: "Ez çawa dikarim bi psîkologên komeleyê re hevdîtin pêk bînim?",
                date: "4 Tîrmeh 2026",
                link: "/sss"
            }
        ]
    },
    EN: {
        hero: {
            slides: [
                {
                    id: 1,
                    badge: 'SAFE SOLIDARITY NETWORK',
                    title: "From Local Rosas to Universal Rosas.",
                    highlightText: 'Independent Women\'s Struggle',
                    desc: 'Founded in Diyarbakır on 09.11.2018, Rosa Women\'s Association expands gender equality networks based on women and life.',
                    imgUrl: '/image_2.png',
                    btnType: 'support'
                },
                {
                    id: 2,
                    badge: 'BUILDING A VIOLENCE-FREE LIFE',
                    title: 'A Violence-Free World is Possible.',
                    highlightText: 'Legal & Psychosocial Assurance',
                    desc: 'We support women subjected to violence in accessing legal aid mechanisms and stand by them with absolute confidentiality.',
                    imgUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80',
                    btnType: 'explore'
                },
                {
                    id: 3,
                    badge: 'ECOLOGICAL STRUGGLE',
                    title: 'We Defend Nature, Women and Life.',
                    highlightText: 'Eco-Feminism & Peace Culture',
                    desc: 'We work to build an ecological life, protect nature, and disseminate an egalitarian democratic culture in the civil sphere.',
                    imgUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80',
                    btnType: 'support'
                }
            ]
        },
        sections: {
            workAreasTitle: "Our Work Areas",
            workAreasSub: "Our Solidarity Networks for a Violence-Free World.",
            galleryTitle: "Field Archives",
            gallerySub: "The Living Memory of Solidarity and Struggle",
            mediaTitle: "Media & Reports",
            mediaSub: "Current Data from the Field and Rights Violation Reports",
            aboutTitle: "Rosa Women's Association",
            aboutSub: "Our Founding Purpose and Principled Stance",
            aboutDesc: "Rosa Women's Association was founded in Diyarbakır on November 9, 2018. Its founding purpose is to combat all forms of social, political, cultural, economic, sexual, and psychological violence against women; to carry out activities that will eliminate all forms of discrimination against women; to develop and implement projects to promote gender equality; to stand in solidarity with civil society and women's organizations; to protect nature and natural life; to ensure the construction of an ecological life; and to spread and realize the culture of democracy and peace."
        },
        stats: {
            stat1Val: "160+",
            stat1Label: "Survivor Applications",
            stat2Val: "100%",
            stat2Label: "Absolute Confidentiality"
        },
        contact: {
            title: "You Are Not Alone.",
            desc: "When you are subjected to violence, suffer a rights violation, or need legal/psychological support, you can confidently come to our center or contact us securely through our official communication lines.",
            phoneTitle: "Official Application Line",
            phone: "0552 466 86 21",
            emailTitle: "Official E-Mail Address",
            email: "rosakadindernegi@gmail.com",
            addressTitle: "Headquarters Address",
            address: "Yenisehir Mahallesi Lise Caddesi Cavusoglu 6 sitesi No:10/A/D:6 Yenisehir / DIYARBAKIR"
        },
        ui: {
            btnSupport: "Get Support",
            btnExplore: "Explore",
            btnReadReport: "Read Report",
            tabNews: "News",
            tabAnnouncements: "Announcements",
            tabQuestions: "Questions",
            btnAllNews: "All News",
            btnAllAnnouncements: "View All",
            cardTitle: "100% Safe Space.",
            cardDesc: "Absolute confidentiality by expert lawyers and psychologists.",
            cardActive: "● 24/7 Active Crisis Line",
            cardSub: "Non-Violent Life",
            btnDetails: "Details",
            btnClose: "Close",
            btnSend: "Submit",
            btnNewMsg: "New Message",
            formTitle: "Secure Portal",
            labelName: "Pseudonym",
            labelChan: "Channel",
            labelMsg: "Message",
            pl1: "Hide identity...",
            pl2: "Email or Phone",
            pl3: "Legal protection...",
            formError: "Fill required fields.",
            formSending: "Sending...",
            formSuccessTitle: "Delivered.",
            formSuccessDesc: "We will contact you.",
            socialMedia: "Social Media",
            footer: "This website was produced with the financial support of the European Union under the Haklara Destek Program. © 2026 Rosa Women's Association.",
            footerQuickMenu: "Quick Menu",
            footerHome: "Home",
            footerAbout: "About Us",
            footerWork: "Work Areas",
            footerContact: "Contact",
            footerFaq: "FAQ",
            footerContracts: "Agreements",
            footerKVKK: "KVKK Text",
            footerTerms: "Terms of Use",
            footerPrivacy: "Privacy Policy",
            footerCookies: "Cookie Policy",
            footerBank: "Bank Accounts",
            bankName: "Ziraat Bank",
            accountHolderLabel: "Account Holder:",
            accountHolderName: "Rosa Women's Association",
            donateModalTitle: "Bank Contact and Donation Accounts",
            donateModalSub: "Grow Solidarity",
            donateModalDesc: "Every donation you make empowers the legal aid processes, psychosocial support sessions, and women's rights advocacy of women subjected to violence.",
            donateModalAccountType: "Official Association Account",
            donateModalIbanLabel: "IBAN Number",
            donateModalCopy: "Copy",
            donateModalCopied: "Copied!",
            donateModalSecurityInfo: "All donations are subject to official association bylaws and transparent audit standards.",
            ariaThemeToggle: "Toggle Theme",
            ariaMenuToggle: "Toggle Menu",
            ariaPrevSlide: "Previous Slide",
            ariaNextSlide: "Next Slide",
            ariaScrollTop: "Scroll to Top",
            callUs: "Call Us",
            eventsTitle: "Events",
            eventsOnDate: "Events on {date}",
            latestEvents: "Latest Events",
            seeAllEvents: "See All Events",
            noEventsFound: "No events found for this date.",
            showAllEvents: "Show all events",
            reportsTitle: "Reports",
            seeAllReports: "All Reports",
            viewReport: "View Report",
            noReportsFound: "No reports found yet.",
            months: [
                "JANUARY",
                "FEBRUARY",
                "MARCH",
                "APRIL",
                "MAY",
                "JUNE",
                "JULY",
                "AUGUST",
                "SEPTEMBER",
                "OCTOBER",
                "NOVEMBER",
                "DECEMBER"
            ],
            daysMin: [
                "MO",
                "TU",
                "WE",
                "TH",
                "FR",
                "SA",
                "SU"
            ]
        },
        modules: [
            {
                id: "hukuki",
                dbIconStr: "Scale",
                colorTheme: "purple",
                title: "Legal Consultancy and Rights Search Networks",
                badge: "Legal Support Network",
                desc: "A legal network established to combat all forms of violence against women, report rights violations, and support women's access to legal aid mechanisms in judicial processes.",
                extra: "Our legal commission coordinates the legal aid processes of women who apply to our association, follows up on hearings, reports rights violations at international standards, and advocates for women's rights."
            },
            {
                id: "psikolojik",
                dbIconStr: "Brain",
                colorTheme: "orange",
                title: "Psychosocial Support and Recovery Solidarity",
                badge: "Post-Trauma Support",
                desc: "A psychosocial follow-up network carried out to repair the damages suffered by women subjected to violence, ensure their recovery from the effects of violence, and heal them.",
                extra: "Our psychosocial solidarity network meticulously receives violence applications, supports women's recovery processes, and conducts follow-ups to break the post-trauma cycles of stress, anxiety, and isolation."
            },
            {
                id: "ekoloji",
                dbIconStr: "Leaf",
                colorTheme: "green",
                title: "Ecological Life and Natural Balance Construction",
                badge: "Ecological",
                desc: "Ecology studies aimed at protecting nature and natural life, ensuring the construction of an ecological life, organizing in the civil sphere, and realizing a culture of democracy and peace.",
                extra: "Our ecology unit defends women's integrated bond with nature speaks out in the civil sphere against environmental rights violations, and produces ecological life workshops."
            },
            {
                id: "akademi",
                dbIconStr: "BookOpen",
                colorTheme: "yellow",
                title: "Gender Equality and Academy",
                badge: "Rights Awareness & Organization",
                desc: "Developing projects to disseminate gender equality, organizing awareness workshops, panels, and trainings, and strengthening civil women's organizations.",
                extra: "Our academy commission organizes academic studies, seminars, and training programs on the visibility of women's labor, gender roles, and rights-based organizational models."
            }
        ],
        galleryItems: [
            {
                id: 1,
                title: "Fieldwork",
                category: "Field",
                imgUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 2,
                title: "Academy",
                category: "Academy",
                imgUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 3,
                title: "Ecology",
                category: "Ecology",
                imgUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 4,
                title: "Panels",
                category: "Panels",
                imgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
            }
        ],
        mediaItems: [
            {
                id: 1,
                typeCode: "news",
                badge: "Announcement",
                date: "08.03.2026",
                title: "We Are in the March 8 Squares: We Do Not Give Up Our Rights",
                desc: "As Rosa Women's Association, our corporate declaration regarding our mass events carried out in the streets of Diyarbakır to shout out women's demand for freedom, equality, and a violence-free life."
            },
            {
                id: 2,
                typeCode: "report",
                badge: "Violence Tally",
                date: "30.06.2026",
                title: "Eastern and Southeastern Anatolia Women's Rights Violation Report",
                desc: "The official tally, detailed with statistical data, of violence against women cases, rights violations, and institutional negligence reflected to our association and regional judicial authorities in the first half of the year."
            },
            {
                id: 3,
                typeCode: "campaign",
                badge: "Campaign",
                date: "15.05.2026",
                title: "Istanbul Convention Saves Lives: Local Awareness Movement",
                desc: "An interactive information campaign we launched in all districts of Diyarbakır to ensure the local implementation of international conventions and create neighborhood-based rights awareness."
            }
        ],
        reportsItems: [
            {
                id: 1,
                title: "Report on Judicial Harassment against Kurdish Women Human Rights Defenders",
                desc: "Among the topics that will be of special interest to you are 'women, especially women human rights defenders...'",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-29-19-1432624050.jpg",
                link: "/raporlar/kkhsyyt.pdf"
            },
            {
                id: 2,
                title: "DIYARBAKIR COMBATING VIOLENCE NETWORK NOVEMBER 2020 REPORT",
                desc: "Esteemed members of the press, as the Diyarbakır Combating Violence Network, which declared its establishment on March 8, 2019...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-26-44-886473420.jpg",
                link: "/raporlar/dsmar2020.pdf"
            },
            {
                id: 3,
                title: "DIYARBAKIR COMBATING VIOLENCE AGAINST WOMEN NETWORK REPORT",
                desc: "By signing a 3-article protocol on March 7, 2019, we declared that we would carry out joint work against violence against women...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-22-30-1083148832.jpg",
                link: "/raporlar/dksmar2019.pdf"
            },
            {
                id: 4,
                title: "DIYARBAKIR COMBATING VIOLENCE NETWORK 2023 REPORT",
                desc: "This report was prepared by the components of the combating violence network working in the field of women's, children's and LGBTI+ rights in Diyarbakır...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-10-13-365402844.jpg",
                link: "/raporlar/dsma2023.pdf"
            }
        ],
        newsItems: [
            {
                id: 1,
                title: "Joint Press Release of the Network for Combating Violence Against Women",
                date: "July 27, 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 2,
                title: "Rosa Women's Association in the Field: Solidarity Workshops Started",
                date: "July 20, 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 3,
                title: "Sample News Title 3",
                date: "July 15, 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 4,
                title: "Sample News Title 4",
                date: "July 12, 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 5,
                title: "Sample News Title 5",
                date: "July 10, 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 6,
                title: "Sample News Title 6",
                date: "July 08, 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 7,
                title: "Sample News Title 7",
                date: "July 05, 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 8,
                title: "Sample News Title 8",
                date: "July 01, 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 9,
                title: "Sample News Title 9",
                date: "June 28, 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 10,
                title: "Sample News Title 10",
                date: "June 20, 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 11,
                title: "Sample News Title 11",
                date: "June 15, 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 12,
                title: "Sample News Title 12",
                date: "June 10, 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            }
        ],
        announcementItems: [
            {
                id: 1,
                title: "March 8 International Working Women's Day Event Calendar",
                date: "July 9, 2026",
                link: "/haberler"
            },
            {
                id: 2,
                title: "Gender Equality Workshop Applications Started",
                date: "July 3, 2026",
                link: "/haberler"
            },
            {
                id: 3,
                title: "Legal Support Seminar: We Know Our Rights",
                date: "June 29, 2026",
                link: "/haberler"
            },
            {
                id: 4,
                title: "Women's Solidarity Network Monthly Evaluation Meeting",
                date: "June 17, 2026",
                link: "/haberler"
            }
        ],
        questionItems: [
            {
                id: 1,
                title: "How can I reach your association when I am subjected to violence?",
                date: "July 1, 2026",
                link: "/sss"
            },
            {
                id: 2,
                title: "Are your legal consultancy services paid?",
                date: "July 2, 2026",
                link: "/sss"
            },
            {
                id: 3,
                title: "How can I be sure that my identity will be kept confidential during interviews?",
                date: "July 3, 2026",
                link: "/sss"
            },
            {
                id: 4,
                title: "How can I meet with the psychologists at the association?",
                date: "July 4, 2026",
                link: "/sss"
            }
        ]
    },
    DE: {
        hero: {
            slides: [
                {
                    id: 1,
                    badge: 'SICHERES SOLIDARITÄTSNETZWERK',
                    title: "Von lokalen Rosas zu universellen Rosas.",
                    highlightText: 'Unabhängiger Frauenkampf',
                    desc: 'Der am 09.11.2018 in Diyarbakır gegründete Rosa Frauenverein erweitert auf Frauen und Leben basierende Netzwerke zur Geschlechtergleichstellung.',
                    imgUrl: '/image_2.png',
                    btnType: 'support'
                },
                {
                    id: 2,
                    badge: 'AUFBAU EINES GEWALTFREIEN LEBENS',
                    title: 'Eine gewaltfreie Welt ist möglich.',
                    highlightText: 'Rechtliche & psychosoziale Sicherheit',
                    desc: 'Wir unterstützen gewaltbetroffene Frauen beim Zugang zu Rechtshilfemechanismen und stehen ihnen unter absoluter Vertraulichkeit zur Seite.',
                    imgUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80',
                    btnType: 'explore'
                },
                {
                    id: 3,
                    badge: 'ÖKOLOGISCHER KAMPF',
                    title: 'Wir verteidigen Natur, Frauen und Leben.',
                    highlightText: 'Ökologie & Friedenskultur',
                    desc: 'Wir setzen uns für den Aufbau eines ökologischen Lebens, den Schutz der Natur und die Verbreitung einer egalitären demokratischen Kultur ein.',
                    imgUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80',
                    btnType: 'support'
                }
            ]
        },
        sections: {
            workAreasTitle: "Unsere Arbeitsbereiche",
            workAreasSub: "Unsere Solidaritätsnetzwerke für eine gewaltfreie Welt.",
            galleryTitle: "Feldarchiv",
            gallerySub: "Das lebendige Gedächtnis von Solidarität und Kampf",
            mediaTitle: "Medien & Berichte",
            mediaSub: "Aktuelle Daten aus dem Feld und Berichte über Rechtsverletzungen",
            aboutTitle: "Rosa Frauenverein",
            aboutSub: "Unser Gründungszweck und prinzipielle Haltung",
            aboutDesc: "Der Rosa Frauenverein wurde am 9. November 2018 in Diyarbakır gegründet. Sein Gründungszweck ist es, alle Formen von sozialer, politischer, kultureller, wirtschaftlicher, sexueller und psychologischer Gewalt gegen Frauen zu bekämpfen; Aktivitäten durchzuführen, die jegliche Form von Diskriminierung von Frauen beseitigen; Projekte zur Förderung der Gleichstellung der Geschlechter zu entwickeln und umzusetzen; sich mit der Zivilgesellschaft und Frauenorganisationen zu solidarisieren; Natur und natürliches Leben zu schützen; den Aufbau eines ökologischen Lebens sicherzustellen; und die Kultur von Demokratie und Frieden zu verbreiten und zu verwirklichen."
        },
        stats: {
            stat1Val: "160+",
            stat1Label: "Anträge",
            stat2Val: "100%",
            stat2Label: "Absolute Vertraulichkeit"
        },
        contact: {
            title: "Sie sind nicht allein.",
            desc: "Wenn Sie Gewalt ausgesetzt sind, eine Rechtsverletzung erleiden oder rechtliche/psychologische Unterstützung benötigen, können Sie vertrauensvoll in unser Zentrum kommen oder uns sicher über unsere offiziellen Kommunikationsleitungen kontaktieren.",
            phoneTitle: "Offizielle Hotline",
            phone: "0552 466 86 21",
            emailTitle: "Offizielle E-Mail-Adresse",
            email: "rosakadindernegi@gmail.com",
            addressTitle: "Adresse der Zentrale",
            address: "Yenisehir Mahallesi Lise Caddesi Cavusoglu 6 sitesi No:10/A/D:6 Yenisehir / DIYARBAKIR"
        },
        ui: {
            btnSupport: "Hilfe Erhalten",
            btnExplore: "Entdecken",
            btnReadReport: "Bericht Lesen",
            tabNews: "Nachrichten",
            tabAnnouncements: "Ankündigungen",
            tabQuestions: "Fragen",
            btnAllNews: "Alle Nachrichten",
            btnAllAnnouncements: "Alle Anzeigen",
            cardTitle: "Sicherer Raum.",
            cardDesc: "100% Vertraulichkeit.",
            cardActive: "● 24/7 Aktiv",
            cardSub: "Gewaltfrei",
            btnDetails: "Details",
            btnClose: "Schließen",
            btnSend: "Senden",
            btnNewMsg: "Nachricht",
            formTitle: "Portal",
            labelName: "Name",
            labelChan: "Kanal",
            labelMsg: "Nachricht",
            pl1: "Anonym...",
            pl2: "E-Mail/Tel",
            pl3: "Schutz...",
            formError: "Füllen...",
            formSending: "Senden...",
            formSuccessTitle: "Gesendet.",
            formSuccessDesc: "Wir melden uns.",
            socialMedia: "Soziale Medien",
            footer: "Rosa Frauenverein © 2026.",
            footerQuickMenu: "Schnellmenü",
            footerHome: "Startseite",
            footerAbout: "Über Uns",
            footerWork: "Arbeitsbereiche",
            footerContact: "Kontakt",
            footerFaq: "FAQ",
            footerContracts: "Vereinbarungen",
            footerKVKK: "KVKK-Text",
            footerTerms: "Nutzungsbedingungen",
            footerPrivacy: "Datenschutz",
            footerCookies: "Cookie-Richtlinie",
            footerBank: "Bankkonten",
            bankName: "Ziraat Bankası",
            accountHolderLabel: "Kontoinhaber:",
            accountHolderName: "Rosa Frauenverein",
            donateModalTitle: "Bankkontakt und Spendenkonten",
            donateModalSub: "Solidarität Stärken",
            donateModalDesc: "Jede Ihrer Spenden stärkt die Prozesskostenhilfe, die psychosozialen Unterstützungssitzungen und die Frauenrechtsvertretung von gewaltbetroffenen Frauen.",
            donateModalAccountType: "Offizielles Vereinskonto",
            donateModalIbanLabel: "IBAN-Nummer",
            donateModalCopy: "Kopieren",
            donateModalCopied: "Kopiert!",
            donateModalSecurityInfo: "Alle Spenden unterliegen den offiziellen Vereinsstatuten und transparenten Prüfungsstandards.",
            ariaThemeToggle: "Thema wechseln",
            ariaMenuToggle: "Menü umschalten",
            ariaPrevSlide: "Vorherige Folie",
            ariaNextSlide: "Nächste Folie",
            ariaScrollTop: "Oben",
            callUs: "Rufen Sie uns an",
            eventsTitle: "Ereignisse",
            eventsOnDate: "Ereignisse am {date}",
            latestEvents: "Letzte Ereignisse",
            seeAllEvents: "Alle Ereignisse ansehen",
            noEventsFound: "Keine Ereignisse für dieses Datum gefunden.",
            showAllEvents: "Alle Ereignisse anzeigen",
            reportsTitle: "Berichte",
            seeAllReports: "Alle Berichte",
            viewReport: "Bericht ansehen",
            noReportsFound: "Noch keine Berichte gefunden.",
            months: [
                "JANUAR",
                "FEBRUAR",
                "MÄRZ",
                "APRIL",
                "MAI",
                "JUNI",
                "JULI",
                "AUGUST",
                "SEPTEMBER",
                "OKTOBER",
                "NOVEMBER",
                "DEZEMBER"
            ],
            daysMin: [
                "MO",
                "DI",
                "MI",
                "DO",
                "FR",
                "SA",
                "SO"
            ]
        },
        modules: [
            {
                id: "hukuki",
                dbIconStr: "Scale",
                colorTheme: "purple",
                title: "Rechtsberatung und Rechtshilfenetzwerke",
                badge: "Rechtshilfenetzwerk",
                desc: "Ein Rechtsnetzwerk, das gegründet wurde, um alle Formen von Gewalt gegen Frauen zu bekämpfen, Rechtsverletzungen zu melden und den Zugang von Frauen zu Rechtshilfemechanismen in Gerichtsverfahren zu unterstützen.",
                extra: "Unsere Rechtskommission koordiniert die Rechtshilfeprozesse von Frauen, die sich an unseren Verein wenden, verfolgt Anhörungen, meldet Rechtsverletzungen nach internationalen Standards und setzt sich für Frauenrechte ein."
            },
            {
                id: "psikolojik",
                dbIconStr: "Brain",
                colorTheme: "orange",
                title: "Psychosoziale Unterstützung und Genesungssolidarität",
                badge: "Posttraumatische Unterstützung",
                desc: "Ein psychosoziales Nachsorgenetzwerk, das durchgeführt wird, um die Schäden zu beheben, die Frauen erlitten haben, die Gewalt ausgesetzt waren, ihre Genesung von den Auswirkungen der Gewalt sicherzustellen und sie zu heilen.",
                extra: "Unser psychosoziales Solidaritätsnetzwerk nimmt Gewaltanträge sorgfältig entgegen, unterstützt die Genesungsprozesse von Frauen und führt Nachuntersuchungen durch, um die posttraumatischen Zyklen von Stress, Angst und Isolation zu durchbrechen."
            },
            {
                id: "ekoloji",
                dbIconStr: "Leaf",
                colorTheme: "green",
                title: "Ökologisches Leben und Aufbau eines natürlichen Gleichgewichts",
                badge: "Ökologisch",
                desc: "Ökologiestudien zum Schutz der Natur und des natürlichen Lebens, zur Sicherstellung des Aufbaus eines ökologischen Lebens, zur Organisation im zivilen Bereich und zur Verwirklichung einer Kultur der Demokratie und des Friedens.",
                extra: "Unsere Ökologieabteilung verteidigt die integrierte Bindung der Frauen an die Natur erhebt ihre Stimme im zivilen Bereich gegen Verletzungen von Umweltrechten und veranstaltet Workshops zum ökologischen Leben."
            },
            {
                id: "akademi",
                dbIconStr: "BookOpen",
                colorTheme: "yellow",
                title: "Geschlechtergleichstellung und Akademie",
                badge: "Rechtsbewusstsein & Organisation",
                desc: "Entwicklung von Projekten zur Verbreitung der Gleichstellung der Geschlechter, Organisation von Sensibilisierungsworkshops, Panels und Schulungen sowie Stärkung ziviler Frauenorganisationen.",
                extra: "Unsere Akademiekommission organisiert wissenschaftliche Studien, Seminare und Schulungsprogramme zur Sichtbarkeit von Frauenarbeit, Geschlechterrollen und rechtsbasierten Organisationsmodellen."
            }
        ],
        galleryItems: [
            {
                id: 1,
                title: "Feld",
                category: "Feld",
                imgUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 2,
                title: "Akademie",
                category: "Akademie",
                imgUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 3,
                title: "Ökologie",
                category: "Ökologie",
                imgUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 4,
                title: "Panels",
                category: "Panels",
                imgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
            }
        ],
        mediaItems: [
            {
                id: 1,
                typeCode: "news",
                badge: "Ankündigung",
                date: "08.03.2026",
                title: "Wir sind auf den Plätzen des 8. März: Wir geben unsere Rechte nicht auf",
                desc: "Als Rosa Frauenverein unsere gemeinsame Erklärung zu unseren Massenveranstaltungen auf den Straßen von Diyarbakır, um die Forderung der Frauen nach Freiheit, Gleichheit und einem gewaltfreien Leben herauszuschreien."
            },
            {
                id: 2,
                typeCode: "report",
                badge: "Gewaltstatistik",
                date: "30.06.2026",
                title: "Bericht über Verletzungen von Frauenrechten in Ost- und Südostanatolien",
                desc: "Die offizielle und mit statistischen Daten detaillierte Zählung von Fällen von Gewalt gegen Frauen, Rechtsverletzungen und institutioneller Fahrlässigkeit, die unserem Verein und den regionalen Justizbehörden in der ersten Jahreshälfte gemeldet wurden."
            },
            {
                id: 3,
                typeCode: "campaign",
                badge: "Kampagne",
                date: "15.05.2026",
                title: "Die Istanbul-Konvention rettet Leben: Lokale Sensibilisierungsbewegung",
                desc: "Eine interaktive Informationskampagne, die wir in allen Bezirken von Diyarbakır gestartet haben, um die lokale Umsetzung internationaler Konventionen sicherzustellen und ein nachbarschaftsbasiertes Rechtsbewusstsein zu schaffen."
            }
        ],
        reportsItems: [
            {
                id: 1,
                title: "Bericht über gerichtliche Schikanen gegen kurdische Frauenrechtsverteidigerinnen",
                desc: "Zu den Themen, die Sie besonders interessieren werden, gehören 'Frauen, insbesondere Frauenrechtsverteidigerinnen...'",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-29-19-1432624050.jpg",
                link: "/raporlar/kkhsyyt.pdf"
            },
            {
                id: 2,
                title: "DIYARBAKIR NETZWERK ZUR BEKÄMPFUNG VON GEWALT BERICHT NOVEMBER 2020",
                desc: "Sehr geehrte Pressevertreter, als Netzwerk zur Bekämpfung von Gewalt in Diyarbakır, das seine Gründung am 8. März 2019 bekannt gab...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-26-44-886473420.jpg",
                link: "/raporlar/dsmar2020.pdf"
            },
            {
                id: 3,
                title: "DIYARBAKIR NETZWERK ZUR BEKÄMPFUNG VON GEWALT GEGEN FRAUEN BERICHT",
                desc: "Mit der Unterzeichnung eines 3-Punkte-Protokolls am 7. März 2019 haben wir erklärt, dass wir gemeinsame Arbeit gegen Gewalt an Frauen leisten werden...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-22-30-1083148832.jpg",
                link: "/raporlar/dksmar2019.pdf"
            },
            {
                id: 4,
                title: "DIYARBAKIR NETZWERK ZUR BEKÄMPFUNG VON GEWALT BERICHT 2023",
                desc: "Dieser Bericht wurde von den Komponenten des Netzwerks zur Bekämpfung von Gewalt erstellt, die im Bereich der Frauen-, Kinder- und LGBTI+-Rechte in Diyarbakır arbeiten...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-10-13-365402844.jpg",
                link: "/raporlar/dsma2023.pdf"
            }
        ],
        newsItems: [
            {
                id: 1,
                title: "Gemeinsame Pressemitteilung des Netzwerks zur Bekämpfung von Gewalt gegen Frauen",
                date: "27. Juli 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 2,
                title: "Rosa Frauenverein im Einsatz: Solidaritätsworkshops haben begonnen",
                date: "20. Juli 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 3,
                title: "Beispiel-Nachrichtentitel 3",
                date: "15. Juli 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 4,
                title: "Beispiel-Nachrichtentitel 4",
                date: "12. Juli 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 5,
                title: "Beispiel-Nachrichtentitel 5",
                date: "10. Juli 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 6,
                title: "Beispiel-Nachrichtentitel 6",
                date: "08. Juli 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 7,
                title: "Beispiel-Nachrichtentitel 7",
                date: "05. Juli 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 8,
                title: "Beispiel-Nachrichtentitel 8",
                date: "01. Juli 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 9,
                title: "Beispiel-Nachrichtentitel 9",
                date: "28. Juni 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 10,
                title: "Beispiel-Nachrichtentitel 10",
                date: "20. Juni 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 11,
                title: "Beispiel-Nachrichtentitel 11",
                date: "15. Juni 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 12,
                title: "Beispiel-Nachrichtentitel 12",
                date: "10. Juni 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            }
        ],
        announcementItems: [
            {
                id: 1,
                title: "Veranstaltungskalender zum Internationalen Frauentag am 8. März",
                date: "9. Juli 2026",
                link: "/haberler"
            },
            {
                id: 2,
                title: "Bewerbungen für den Workshop zur Geschlechtergleichstellung gestartet",
                date: "3. Juli 2026",
                link: "/haberler"
            },
            {
                id: 3,
                title: "Seminar zur rechtlichen Unterstützung: Wir kennen unsere Rechte",
                date: "29. Juni 2026",
                link: "/haberler"
            },
            {
                id: 4,
                title: "Monatliches Auswertungstreffen des Frauensolidaritätsnetzwerks",
                date: "17. Juni 2026",
                link: "/haberler"
            }
        ],
        questionItems: [
            {
                id: 1,
                title: "Wie kann ich Ihren Verein erreichen, wenn ich Gewalt ausgesetzt bin?",
                date: "1. Juli 2026",
                link: "/sss"
            },
            {
                id: 2,
                title: "Sind Ihre Rechtsberatungsdienste kostenpflichtig?",
                date: "2. Juli 2026",
                link: "/sss"
            },
            {
                id: 3,
                title: "Wie kann ich sicher sein, dass meine Identität bei Gesprächen vertraulich behandelt wird?",
                date: "3. Juli 2026",
                link: "/sss"
            },
            {
                id: 4,
                title: "Wie kann ich die Psychologen im Verein treffen?",
                date: "4. Juli 2026",
                link: "/sss"
            }
        ]
    },
    FR: {
        hero: {
            slides: [
                {
                    id: 1,
                    badge: 'RÉSEAU DE SOLIDARITÉ SÉCURISÉ',
                    title: "Des Rosas locales aux Rosas universelles.",
                    highlightText: 'Lutte Indépendante des Femmes',
                    desc: 'L\'association de femmes Rosa, fondée le 09.11.2018 à Diyarbakır, développe des réseaux d\'égalité des sexes basés sur les femmes et la vie.',
                    imgUrl: '/image_2.png',
                    btnType: 'support'
                },
                {
                    id: 2,
                    badge: 'CONSTRUIRE UNE VIE SANS VIOLENCE',
                    title: 'Un Monde Sans Violence Est Possible.',
                    highlightText: 'Garantie Juridique et Psychosociale',
                    desc: 'Nous aidons les femmes victimes de violence à accéder à l\'aide juridique et nous les soutenons dans la plus stricte confidentialité.',
                    imgUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80',
                    btnType: 'explore'
                },
                {
                    id: 3,
                    badge: 'LUTTE ÉCOLOGIQUE',
                    title: 'Nous Défendons la Nature, les Femmes et la Vie.',
                    highlightText: 'Éco-Féminisme & Culture de Paix',
                    desc: 'Nous travaillons pour construire une vie écologique, protéger la nature et diffuser une culture démocratique égalitaire.',
                    imgUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80',
                    btnType: 'support'
                }
            ]
        },
        sections: {
            workAreasTitle: "Nos Domaines d'Intervention",
            workAreasSub: "Nos réseaux de solidarité pour un monde sans violence.",
            galleryTitle: "Archives de Terrain",
            gallerySub: "La mémoire vivante de la solidarité et de la lutte",
            mediaTitle: "Médias et Rapports",
            mediaSub: "Données actuelles sur le terrain et rapports sur les violations des droits",
            aboutTitle: "Association des Femmes Rosa",
            aboutSub: "Notre Objectif Fondateur et Notre Position de Principe",
            aboutDesc: "L'Association des Femmes Rosa a été fondée à Diyarbakır le 9 novembre 2018. Son objectif fondateur est de combattre toutes les formes de violence sociale, politique, culturelle, économique, sexuelle et psychologique contre les femmes ; de mener des activités visant à éliminer toutes les formes de discrimination à l'égard des femmes ; de développer et mettre en œuvre des projets pour promouvoir l'égalité des sexes ; de se solidariser avec la société civile et les organisations de femmes ; de protéger la nature et la vie naturelle ; d'assurer la construction d'une vie écologique ; et de diffuser et concrétiser la culture de la démocratie et de la paix."
        },
        stats: {
            stat1Val: "160+",
            stat1Label: "Demandes",
            stat2Val: "100%",
            stat2Label: "Confidentialité Absolue"
        },
        contact: {
            title: "Vous n'êtes pas seule.",
            desc: "Lorsque vous subissez des violences, une violation de vos droits ou que vous avez besoin d'un soutien juridique ou psychologique, vous pouvez venir en toute confiance dans notre centre ou nous contacter en toute sécurité via nos lignes de communication officielles.",
            phoneTitle: "Ligne d'Assistance Officielle",
            phone: "0552 466 86 21",
            emailTitle: "Adresse E-mail Officielle",
            email: "rosakadindernegi@gmail.com",
            addressTitle: "Adresse du Siège",
            address: "Yenisehir Mahallesi Lise Caddesi Cavusoglu 6 sitesi No:10/A/D:6 Yenisehir / DIYARBAKIR"
        },
        ui: {
            btnSupport: "Obtenir de l'aide",
            btnExplore: "Explorer l'ONG",
            btnReadReport: "Lire le Rapport",
            tabNews: "Actualités",
            tabAnnouncements: "Annonces",
            tabQuestions: "Questions",
            btnAllNews: "Toutes les Actualités",
            btnAllAnnouncements: "Voir Tout",
            cardTitle: "Espace Sûr.",
            cardDesc: "100% Confidentialité.",
            cardActive: "● 24/7 Active",
            cardSub: "Vie Sans Violence",
            btnDetails: "Détails",
            btnClose: "Fermer",
            btnSend: "Envoyer",
            btnNewMsg: "Nouveau",
            formTitle: "Portail",
            labelName: "Nom",
            labelChan: "Canal",
            labelMsg: "Message",
            pl1: "Anonyme...",
            pl2: "E-mail/Tél",
            pl3: "Protection...",
            formError: "Remplir...",
            formSending: "Envoi...",
            formSuccessTitle: "Livré.",
            formSuccessDesc: "Nous reviendrons.",
            socialMedia: "Réseaux Sociaux",
            footer: "Rosa Association © 2026.",
            footerQuickMenu: "Menu Rapide",
            footerHome: "Accueil",
            footerAbout: "À Propos",
            footerWork: "Domaines",
            footerContact: "Contact",
            footerFaq: "FAQ",
            footerContracts: "Contrats",
            footerKVKK: "Texte KVKK",
            footerTerms: "Conditions",
            footerPrivacy: "Confidentialité",
            footerCookies: "Cookies",
            footerBank: "Comptes bancaires",
            bankName: "Ziraat Bankası",
            accountHolderLabel: "Titulaire:",
            accountHolderName: "Association Rosa",
            donateModalTitle: "Contacts Bancaires et Comptes de Dons",
            donateModalSub: "Développer la Solidarité",
            donateModalDesc: "Chaque don que vous faites renforce les processus d'aide juridique, les séances de soutien psychosocial et la défense des droits des femmes victimes de violence.",
            donateModalAccountType: "Compte Officiel de l'Association",
            donateModalIbanLabel: "Numéro IBAN",
            donateModalCopy: "Copier",
            donateModalCopied: "Copié !",
            donateModalSecurityInfo: "Tous les dons sont soumis aux statuts officiels de l'association et à des normes d'audit transparentes.",
            ariaThemeToggle: "Changer de thème",
            ariaMenuToggle: "Basculer le menu",
            ariaPrevSlide: "Diapositive précédente",
            ariaNextSlide: "Diapositive suivante",
            ariaScrollTop: "Faire défiler vers le haut",
            callUs: "Appelez-nous",
            eventsTitle: "Événements",
            eventsOnDate: "Événements du {date}",
            latestEvents: "Derniers Événements",
            seeAllEvents: "Voir Tous Les Événements",
            noEventsFound: "Aucun événement trouvé pour cette date.",
            showAllEvents: "Afficher tous les événements",
            reportsTitle: "Rapports",
            seeAllReports: "Tous Les Rapports",
            viewReport: "Voir Le Rapport",
            noReportsFound: "Aucun rapport trouvé pour le moment.",
            months: [
                "JANVIER",
                "FÉVRIER",
                "MARS",
                "AVRIL",
                "MAI",
                "JUIN",
                "JUILLET",
                "AOÛT",
                "SEPTEMBRE",
                "OCTOBRE",
                "NOVEMBRE",
                "DÉCEMBRE"
            ],
            daysMin: [
                "LU",
                "MA",
                "ME",
                "JE",
                "VE",
                "SA",
                "DI"
            ]
        },
        modules: [
            {
                id: "hukuki",
                dbIconStr: "Scale",
                colorTheme: "purple",
                title: "Conseil Juridique et Réseaux de Recherche de Droits",
                badge: "Réseau de Soutien Juridique",
                desc: "Un réseau juridique créé pour lutter contre toutes les formes de violence à l'égard des femmes, signaler les violations des droits et soutenir l'accès des femmes aux mécanismes d'aide juridique dans le cadre de procédures judiciaires.",
                extra: "Notre commission juridique coordonne les processus d'aide juridique des femmes qui s'adressent à notre association, assure le suivi des audiences, signale les violations des droits selon les normes internationales et défend les droits des femmes."
            },
            {
                id: "psikolojik",
                dbIconStr: "Brain",
                colorTheme: "orange",
                title: "Soutien Psychosocial et Solidarité de Rétablissement",
                badge: "Soutien Post-Traumatique",
                desc: "Un réseau de suivi psychosocial mis en place pour réparer les dommages subis par les femmes victimes de violences, assurer leur rétablissement des effets de la violence et les guérir.",
                extra: "Notre réseau de solidarité psychosociale reçoit méticuleusement les demandes concernant les violences, soutient les processus de rétablissement des femmes et effectue des suivis pour briser les cycles post-traumatiques de stress, d'anxiété et d'isolement."
            },
            {
                id: "ekoloji",
                dbIconStr: "Leaf",
                colorTheme: "green",
                title: "Vie Écologique et Construction de l'Équilibre Naturel",
                badge: "Écologique",
                desc: "Études écologiques visant à protéger la nature et la vie naturelle, à assurer la construction d'une vie écologique, à s'organiser dans la sphère civile et à réaliser une culture de démocratie et de paix.",
                extra: "Notre unité d'écologie défend le lien intégré des femmes avec la nature s'exprime dans la sphère civile contre les violations des droits environnementaux et produit des ateliers sur la vie écologique."
            },
            {
                id: "akademi",
                dbIconStr: "BookOpen",
                colorTheme: "yellow",
                title: "Égalité des Sexes et Académie",
                badge: "Sensibilisation aux Droits",
                desc: "Développer des projets pour diffuser l'égalité des sexes, organiser des ateliers de sensibilisation, des panels et des formations, et renforcer les organisations de femmes de la société civile.",
                extra: "Notre commission académique organise des études académiques, des séminaires et des programmes de formation sur la visibilité du travail des femmes, les rôles de genre et les modèles d'organisation fondés sur les droits."
            }
        ],
        galleryItems: [
            {
                id: 1,
                title: "Terrain",
                category: "Terrain",
                imgUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 2,
                title: "Académie",
                category: "Académie",
                imgUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 3,
                title: "Écologie",
                category: "Écologie",
                imgUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 4,
                title: "Panels",
                category: "Panels",
                imgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
            }
        ],
        mediaItems: [
            {
                id: 1,
                typeCode: "news",
                badge: "Annonce",
                date: "08.03.2026",
                title: "Nous Sommes sur les Places du 8 Mars : Nous N'abandonnons Pas Nos Droits",
                desc: "En tant qu'Association des Femmes Rosa, notre déclaration commune concernant nos événements de masse organisés dans les rues de Diyarbakır pour crier la demande des femmes de liberté, d'égalité et d'une vie sans violence."
            },
            {
                id: 2,
                typeCode: "report",
                badge: "Bilan des Violences",
                date: "30.06.2026",
                title: "Rapport sur les Violations des Droits des Femmes en Anatolie Orientale et du Sud-Est",
                desc: "Le décompte officiel, détaillé avec des données statistiques, des cas de violence contre les femmes, des violations des droits et des négligences institutionnelles signalés à notre association et aux autorités judiciaires régionales au premier semestre de l'année."
            },
            {
                id: 3,
                typeCode: "campaign",
                badge: "Campagne",
                date: "15.05.2026",
                title: "La Convention d'Istanbul Sauve des Vies : Mouvement de Sensibilisation Local",
                desc: "Une campagne d'information interactive que nous avons lancée dans tous les districts de Diyarbakır pour assurer la mise en œuvre locale des conventions internationales et créer une sensibilisation aux droits dans les quartiers."
            }
        ],
        reportsItems: [
            {
                id: 1,
                title: "Rapport sur le harcèlement judiciaire contre les défenseuses kurdes des droits humains",
                desc: "Parmi les sujets qui vous intéresseront particulièrement, il y a 'les femmes, en particulier les défenseuses des droits humains...'",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-29-19-1432624050.jpg",
                link: "https://rosakadindernegi.org/raporlar/kkhsyyt"
            },
            {
                id: 2,
                title: "RAPPORT DE NOVEMBRE 2020 DU RÉSEAU DE LUTTE CONTRE LA VIOLENCE DE DIYARBAKIR",
                desc: "Chers membres de la presse, en tant que Réseau de lutte contre la violence de Diyarbakır, qui a déclaré sa création le 8 mars 2019...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-26-44-886473420.jpg",
                link: "https://rosakadindernegi.org/raporlar/dsmar2020"
            },
            {
                id: 3,
                title: "RAPPORT DU RÉSEAU DE LUTTE CONTRE LA VIOLENCE FAITE AUX FEMMES DE DIYARBAKIR",
                desc: "En signant un protocole de 3 articles le 7 mars 2019, nous avons déclaré que nous mènerions un travail conjoint contre la violence faite aux femmes...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-22-30-1083148832.jpg",
                link: "https://rosakadindernegi.org/raporlar/dksmar2019"
            },
            {
                id: 4,
                title: "RAPPORT 2023 DU RÉSEAU DE LUTTE CONTRE LA VIOLENCE DE DIYARBAKIR",
                desc: "Ce rapport a été préparé par les composantes du réseau de lutte contre la violence travaillant dans le domaine des droits des femmes, des enfants et des LGBTI+ à Diyarbakır...",
                imgUrl: "https://rosakadindernegi.org/Public/Uploads/Upload_01-02-2025-14-10-13-365402844.jpg",
                link: "https://rosakadindernegi.org/raporlar/dsma2023"
            }
        ],
        newsItems: [
            {
                id: 1,
                title: "Communiqué de presse conjoint du Réseau de lutte contre la violence à l'égard des femmes",
                date: "27 juillet 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 2,
                title: "L'Association des Femmes Rosa sur le terrain : Début des ateliers de solidarité",
                date: "20 juillet 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 3,
                title: "Exemple de titre d'actualité 3",
                date: "15 juillet 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 4,
                title: "Exemple de titre d'actualité 4",
                date: "12 juillet 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 5,
                title: "Exemple de titre d'actualité 5",
                date: "10 juillet 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 6,
                title: "Exemple de titre d'actualité 6",
                date: "08 juillet 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 7,
                title: "Exemple de titre d'actualité 7",
                date: "05 juillet 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 8,
                title: "Exemple de titre d'actualité 8",
                date: "01 juillet 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 9,
                title: "Exemple de titre d'actualité 9",
                date: "28 juin 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 10,
                title: "Exemple de titre d'actualité 10",
                date: "20 juin 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 11,
                title: "Exemple de titre d'actualité 11",
                date: "15 juin 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            },
            {
                id: 12,
                title: "Exemple de titre d'actualité 12",
                date: "10 juin 2026",
                imgUrl: "/image_2.png",
                link: "/haberler"
            }
        ],
        announcementItems: [
            {
                id: 1,
                title: "Calendrier des événements de la Journée internationale des droits des femmes du 8 mars",
                date: "9 juillet 2026",
                link: "/haberler"
            },
            {
                id: 2,
                title: "Début des candidatures pour l'atelier sur l'égalité des sexes",
                date: "3 juillet 2026",
                link: "/haberler"
            },
            {
                id: 3,
                title: "Séminaire de soutien juridique : Nous connaissons nos droits",
                date: "29 juin 2026",
                link: "/haberler"
            },
            {
                id: 4,
                title: "Réunion d'évaluation mensuelle du réseau de solidarité des femmes",
                date: "17 juin 2026",
                link: "/haberler"
            }
        ],
        questionItems: [
            {
                id: 1,
                title: "Comment puis-je contacter votre association lorsque je subis des violences ?",
                date: "1 juillet 2026",
                link: "/sss"
            },
            {
                id: 2,
                title: "Vos services de conseil juridique sont-ils payants ?",
                date: "2 juillet 2026",
                link: "/sss"
            },
            {
                id: 3,
                title: "Comment puis-je être sûre que mon identité restera confidentielle lors des entretiens ?",
                date: "3 juillet 2026",
                link: "/sss"
            },
            {
                id: 4,
                title: "Comment puis-je rencontrer les psychologues de l'association ?",
                date: "4 juillet 2026",
                link: "/sss"
            }
        ]
    }
};
function getThemeClasses(colorTheme) {
    switch(colorTheme){
        case 'purple':
            return {
                gradient: 'from-[#3D154B] to-[#6A4C93]',
                glow: 'shadow-[0_0_40px_rgba(106,76,147,0.4)]',
                border: 'hover:border-[#6A4C93]/60 hover:bg-[#6A4C93]/5 dark:hover:bg-[#6A4C93]/5'
            };
        case 'orange':
            // Repurposed to Emerald for a unified theme
            return {
                gradient: 'from-[#059669] to-[#10B981]',
                glow: 'shadow-[0_0_40px_rgba(16,185,129,0.4)]',
                border: 'hover:border-[#10B981]/60 hover:bg-[#10B981]/5 dark:hover:bg-[#10B981]/5'
            };
        case 'green':
            // Repurposed to Gold for a unified theme
            return {
                gradient: 'from-[#B8860B] to-[#D4AF37]',
                glow: 'shadow-[0_0_40px_rgba(212,175,55,0.4)]',
                border: 'hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/5 dark:hover:bg-[#D4AF37]/5'
            };
        case 'yellow':
            // Repurposed to Dark Emerald/Purple mix (Holographic/Monochrome alternative)
            return {
                gradient: 'from-[#3D154B] to-[#10B981]',
                glow: 'shadow-[0_0_40px_rgba(16,185,129,0.4)]',
                border: 'hover:border-[#10B981]/60 hover:bg-[#10B981]/5 dark:hover:bg-[#10B981]/5'
            };
        default:
            return {
                gradient: 'from-[#5A5260] to-[#B2AAC0]',
                glow: '',
                border: ''
            };
    }
}
function getMediaTheme(typeCode) {
    switch(typeCode){
        case 'news':
            return {
                badge: 'bg-[#6A4C93]/10 text-[#6A4C93] dark:text-[#D4AF37]',
                border: 'hover:border-[#6A4C93]/40'
            };
        case 'report':
            return {
                badge: 'bg-[#10B981]/10 text-[#10B981] dark:text-[#10B981]',
                border: 'hover:border-[#10B981]/40'
            };
        case 'campaign':
            return {
                badge: 'bg-[#D4AF37]/10 text-[#B8860B] dark:text-[#D4AF37]',
                border: 'hover:border-[#D4AF37]/40'
            };
        default:
            return {
                badge: 'bg-gray-500/10 text-gray-500',
                border: 'hover:border-gray-500'
            };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/CMSContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CMSProvider",
    ()=>CMSProvider,
    "useCMS",
    ()=>useCMS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/LanguageContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cms$2d$database$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/cms-database.ts [app-client] (ecmascript)"); // Fallback if fetch fails
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const CMSContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const CMSProvider = (param)=>{
    let { children } = param;
    _s();
    const { lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [pageData, setPageData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cms$2d$database$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CMS_DATABASE"][lang] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cms$2d$database$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CMS_DATABASE"]['TR']);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CMSProvider.useEffect": ()=>{
            const fetchAllData = {
                "CMSProvider.useEffect.fetchAllData": async ()=>{
                    setLoading(true);
                    try {
                        var _settingsRes_data;
                        const FETCH_LANG = lang;
                        const [slidersRes, modulesRes, galleriesRes, announcementsRes, faqsRes, mediasRes, settingsRes, navRes] = await Promise.all([
                            fetch("/api/strapi/sliders?filters[lang][$eq]=".concat(FETCH_LANG), {
                                cache: 'no-store'
                            }).then({
                                "CMSProvider.useEffect.fetchAllData": (r)=>r.json()
                            }["CMSProvider.useEffect.fetchAllData"]),
                            fetch("/api/strapi/modules?filters[lang][$eq]=".concat(FETCH_LANG), {
                                cache: 'no-store'
                            }).then({
                                "CMSProvider.useEffect.fetchAllData": (r)=>r.json()
                            }["CMSProvider.useEffect.fetchAllData"]),
                            fetch("/api/strapi/gallerys?filters[lang][$eq]=".concat(FETCH_LANG), {
                                cache: 'no-store'
                            }).then({
                                "CMSProvider.useEffect.fetchAllData": (r)=>r.json()
                            }["CMSProvider.useEffect.fetchAllData"]),
                            fetch("/api/strapi/announcements?filters[lang][$eq]=".concat(FETCH_LANG), {
                                cache: 'no-store'
                            }).then({
                                "CMSProvider.useEffect.fetchAllData": (r)=>r.json()
                            }["CMSProvider.useEffect.fetchAllData"]),
                            fetch("/api/strapi/faqs?filters[lang][$eq]=".concat(FETCH_LANG), {
                                cache: 'no-store'
                            }).then({
                                "CMSProvider.useEffect.fetchAllData": (r)=>r.json()
                            }["CMSProvider.useEffect.fetchAllData"]),
                            fetch("/api/strapi/medias?filters[lang][$eq]=".concat(FETCH_LANG), {
                                cache: 'no-store'
                            }).then({
                                "CMSProvider.useEffect.fetchAllData": (r)=>r.json()
                            }["CMSProvider.useEffect.fetchAllData"]),
                            fetch("/api/strapi/site-settings?filters[lang][$eq]=".concat(FETCH_LANG), {
                                cache: 'no-store'
                            }).then({
                                "CMSProvider.useEffect.fetchAllData": (r)=>r.json()
                            }["CMSProvider.useEffect.fetchAllData"]),
                            fetch("/api/strapi/nav-translations?filters[lang][$eq]=".concat(FETCH_LANG), {
                                cache: 'no-store'
                            }).then({
                                "CMSProvider.useEffect.fetchAllData": (r)=>r.json()
                            }["CMSProvider.useEffect.fetchAllData"])
                        ]);
                        // Construct pageData from Strapi payload
                        const dynamicData = {};
                        // Nav Translations
                        if ((navRes === null || navRes === void 0 ? void 0 : navRes.data) && navRes.data.length > 0) {
                            dynamicData.nav = navRes.data[0].data;
                        } else {
                            dynamicData.nav = null;
                        }
                        // Settings (Single Type with ALL languages)
                        const currentLangSettings = settingsRes === null || settingsRes === void 0 ? void 0 : (_settingsRes_data = settingsRes.data) === null || _settingsRes_data === void 0 ? void 0 : _settingsRes_data[0];
                        if (currentLangSettings && currentLangSettings.data) {
                            const s = currentLangSettings.data;
                            dynamicData.sections = s.sections;
                            dynamicData.stats = s.stats;
                            dynamicData.contact = s.contact;
                            dynamicData.ui = s.ui;
                        } else {
                            // Fallback to static if no settings found
                            const fallback = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cms$2d$database$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CMS_DATABASE"][lang] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cms$2d$database$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CMS_DATABASE"]['TR'];
                            dynamicData.sections = fallback.sections;
                            dynamicData.stats = fallback.stats;
                            dynamicData.contact = fallback.contact;
                            dynamicData.ui = fallback.ui;
                        }
                        // Helper to get fallback data
                        const fallback = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cms$2d$database$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CMS_DATABASE"][lang] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cms$2d$database$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CMS_DATABASE"]['TR'];
                        // Sliders
                        if ((slidersRes === null || slidersRes === void 0 ? void 0 : slidersRes.data) && slidersRes.data.length > 0) {
                            dynamicData.hero = {
                                slides: slidersRes.data
                            };
                        } else {
                            dynamicData.hero = fallback.hero;
                        }
                        // Modules
                        if ((modulesRes === null || modulesRes === void 0 ? void 0 : modulesRes.data) && modulesRes.data.length > 0) {
                            dynamicData.modules = modulesRes.data;
                        } else {
                            dynamicData.modules = fallback.modules;
                        }
                        // Galleries
                        if ((galleriesRes === null || galleriesRes === void 0 ? void 0 : galleriesRes.data) && galleriesRes.data.length > 0) {
                            dynamicData.galleryItems = galleriesRes.data;
                        } else {
                            dynamicData.galleryItems = fallback.galleryItems;
                        }
                        // Announcements
                        if ((announcementsRes === null || announcementsRes === void 0 ? void 0 : announcementsRes.data) && announcementsRes.data.length > 0) {
                            dynamicData.announcementItems = announcementsRes.data;
                        } else {
                            dynamicData.announcementItems = fallback.announcementItems;
                        }
                        // FAQs
                        if ((faqsRes === null || faqsRes === void 0 ? void 0 : faqsRes.data) && faqsRes.data.length > 0) {
                            dynamicData.questionItems = faqsRes.data;
                        } else {
                            dynamicData.questionItems = fallback.questionItems;
                        }
                        // Media & Reports
                        if ((mediasRes === null || mediasRes === void 0 ? void 0 : mediasRes.data) && mediasRes.data.length > 0) {
                            dynamicData.mediaItems = mediasRes.data;
                        } else {
                            dynamicData.mediaItems = fallback.mediaItems;
                        }
                        // We leave newsItems empty because they are fetched dynamically in the components
                        dynamicData.newsItems = [];
                        setPageData(dynamicData);
                    } catch (err) {
                        console.error("Error fetching CMS data from Strapi:", err);
                        setPageData(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cms$2d$database$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CMS_DATABASE"][lang] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cms$2d$database$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CMS_DATABASE"]['TR']); // Fallback
                    } finally{
                        setLoading(false);
                    }
                }
            }["CMSProvider.useEffect.fetchAllData"];
            fetchAllData();
        }
    }["CMSProvider.useEffect"], [
        lang
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CMSContext.Provider, {
        value: {
            pageData,
            loading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/CMSContext.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CMSProvider, "GOD6Jp6nc8Bz1ekFZuRPQAqRLcw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = CMSProvider;
const useCMS = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CMSContext);
    if (!context) {
        throw new Error('useCMS must be used within a CMSProvider');
    }
    return context;
};
_s1(useCMS, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CMSProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ToastProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToastProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ThemeContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ToastProvider() {
    _s();
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
        position: "bottom-right",
        toastOptions: {
            className: 'font-sans font-medium shadow-xl border backdrop-blur-xl',
            style: {
                background: theme === 'dark' ? 'rgba(42, 36, 54, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                color: theme === 'dark' ? '#fff' : '#3D154B',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(106, 76, 147, 0.15)'
            },
            success: {
                iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff'
                }
            },
            error: {
                iconTheme: {
                    primary: '#FF6B5B',
                    secondary: '#fff'
                }
            }
        }
    }, void 0, false, {
        fileName: "[project]/src/components/ToastProvider.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_s(ToastProvider, "JkSxfi8+JQlqgIgDOc3wQN+nVIw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = ToastProvider;
var _c;
__turbopack_context__.k.register(_c, "ToastProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_dfbccc66._.js.map