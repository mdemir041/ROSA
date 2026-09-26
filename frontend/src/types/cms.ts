export type LanguageCode = 'TR' | 'KU' | 'EN' | 'DE' | 'FR';

export type IconString = 'Scale' | 'Brain' | 'Leaf' | 'BookOpen' | 'ShieldCheck';

export type ThemeColor = 'purple' | 'orange' | 'green' | 'yellow';

export interface ThemeClassDefinition {
  gradient: string;
  glow: string;
  border: string;
}

export interface MediaThemeDefinition {
  badge: string;
  border: string;
}

export interface SlideItem {
  readonly id: number;
  readonly badge: string;
  readonly title: string;
  readonly highlightText: string;
  readonly desc: string;
  readonly imgUrl: string;
  readonly btnType: 'support' | 'explore';
}

export interface HeroContent {
  readonly slides: ReadonlyArray<SlideItem>;
}

export interface SectionTitles {
  readonly workAreasTitle: string;
  readonly workAreasSub: string;
  readonly galleryTitle: string;
  readonly gallerySub: string;
  readonly mediaTitle: string;
  readonly mediaSub: string;
  readonly aboutTitle: string;
  readonly aboutSub: string;
  readonly aboutDesc: string;
}

export interface StatsContent {
  readonly stat1Val: string;
  readonly stat1Label: string;
  readonly stat2Val: string;
  readonly stat2Label: string;
}

export interface ContactContent {
  readonly title: string;
  readonly desc: string;
  readonly phoneTitle: string;
  readonly phone: string;
  readonly emailTitle: string;
  readonly email: string;
  readonly addressTitle: string;
  readonly address: string;
}

export interface UIStrings {
  readonly btnSupport: string;
  readonly btnExplore: string;
  readonly btnReadReport: string;
  readonly tabNews: string;
  readonly tabAnnouncements: string;
  readonly tabQuestions: string;
  readonly btnAllNews: string;
  readonly btnAllAnnouncements: string;
  readonly cardTitle: string;
  readonly cardDesc: string;
  readonly cardActive: string;
  readonly cardSub: string;
  readonly btnDetails: string;
  readonly btnClose: string;
  readonly btnSend: string;
  readonly btnNewMsg: string;
  readonly formTitle: string;
  readonly labelName: string;
  readonly labelChan: string;
  readonly labelMsg: string;
  readonly pl1: string;
  readonly pl2: string;
  readonly pl3: string;
  readonly formError: string;
  readonly formSending: string;
  readonly formSuccessTitle: string;
  readonly formSuccessDesc: string;
  readonly socialMedia: string;
  readonly footer: string;
  readonly footerQuickMenu: string;
  readonly footerHome: string;
  readonly footerAbout: string;
  readonly footerWork: string;
  readonly footerContact: string;
  readonly footerFaq: string;
  readonly footerContracts: string;
  readonly footerKVKK: string;
  readonly footerTerms: string;
  readonly footerPrivacy: string;
  readonly footerCookies: string;
  readonly footerBank: string;
  readonly bankName: string;
  readonly accountHolderLabel: string;
  readonly accountHolderName: string;
  readonly donateModalTitle: string;
  readonly donateModalSub: string;
  readonly donateModalDesc: string;
  readonly donateModalAccountType: string;
  readonly donateModalIbanLabel: string;
  readonly donateModalCopy: string;
  readonly donateModalCopied: string;
  readonly donateModalSecurityInfo: string;
  readonly ariaThemeToggle: string;
  readonly ariaMenuToggle: string;
  readonly ariaPrevSlide: string;
  readonly ariaNextSlide: string;
  readonly ariaScrollTop: string;
  readonly callUs: string;
  readonly eventsTitle: string;
  readonly eventsOnDate: string;
  readonly latestEvents: string;
  readonly seeAllEvents: string;
  readonly noEventsFound: string;
  readonly showAllEvents: string;
  readonly reportsTitle: string;
  readonly seeAllReports: string;
  readonly viewReport: string;
  readonly noReportsFound: string;
  readonly months: readonly string[];
  readonly daysMin: readonly string[];
}

export interface WorkModule {
  readonly id: string;
  readonly dbIconStr: IconString;
  readonly colorTheme: ThemeColor;
  readonly title: string;
  readonly badge: string;
  readonly desc: string;
  readonly extra: string;
}

export interface GalleryItem {
  readonly id: number;
  readonly title: string;
  readonly category: string;
  readonly imgUrl: string;
}

export interface MediaItem {
  readonly id: number;
  readonly typeCode: 'news' | 'report' | 'campaign';
  readonly badge: string;
  readonly date: string;
  readonly title: string;
  readonly desc: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  imgUrl: string;
  link?: string;
  hasVideo?: boolean;
  videoUrl?: string;
}

export interface AnnouncementItem {
  id: number;
  title: string;
  date: string;
  link?: string;
}

export interface ReportItem {
  id: number;
  title: string;
  desc: string;
  imgUrl: string;
  link: string;
}

export interface PageData {
  readonly nav?: NavTranslation;
  readonly hero: HeroContent;
  readonly sections: SectionTitles;
  readonly stats: StatsContent;
  readonly contact: ContactContent;
  readonly ui: UIStrings;
  readonly modules: ReadonlyArray<WorkModule>;
  readonly reportsItems: ReadonlyArray<ReportItem>;
  readonly newsItems: ReadonlyArray<NewsItem>;
  readonly announcementItems: ReadonlyArray<AnnouncementItem>;
  readonly questionItems: ReadonlyArray<AnnouncementItem>;
  readonly galleryItems: ReadonlyArray<GalleryItem>;
  readonly mediaItems: ReadonlyArray<MediaItem>;
}

export interface NavTranslation {
  kurumsal: string;
  dayanisma: string;
  galeri: string;
  haberler: string;
  raporlar: string;
  iletisim: string;
  bagis: string;
  destek: string;
  subHakkimizda: string;
  subEkibimiz: string;
  subSss: string;
  subBankaHesaplari: string;
  icerikler: string;
  bilgilendirme: string;
}

export interface ActiveModalState extends WorkModule {
  readonly theme: ThemeClassDefinition;
}

export interface ContactFormData {
  name: string;
  contact: string;
  message: string;
}

export interface FormSubmissionStatus {
  state: 'idle' | 'submitting' | 'success' | 'error';
  error: string;
}
