import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { CMSProvider } from '@/context/CMSContext';
import ToastProvider from '@/components/ToastProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans-next',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display-next',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif-next',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  let title = "Rosa Kadın Derneği";
  let email = "rosakadindernegi@gmail.com";
  
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
    const res = await fetch(`${strapiUrl}/api/site-settings?filters[lang][$eq]=TR`, { next: { revalidate: 0 } });
    if (res.ok) {
      const json = await res.json();
      if (json?.data?.[0]?.data?.contact?.title) {
        title = json.data[0].data.contact.title;
      }
      if (json?.data?.[0]?.data?.contact?.email) {
        email = json.data[0].data.contact.email;
      }
    }
  } catch (err) {}

  const description = "29 Aralık 2018'den bu yana Diyarbakır merkezli bir sivil toplum örgütü olarak faaliyet gösteren Rosa Kadın Derneği; kadına yönelik şiddetle mücadele eden bağımsız bir dayanışma ağıdır.";

  return {
    title,
    description,
    keywords: ['Rosa Kadın Derneği', 'Kadın Hakları', 'Diyarbakır', 'Şiddetsiz Yaşam', 'Ekoloji', 'Toplumsal Cinsiyet Eşitliği'],
    authors: [{ name: title }],
    metadataBase: new URL('https://rosakadindernegi.org'),
    openGraph: {
      title,
      description,
      url: 'https://rosakadindernegi.org',
      siteName: title,
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="tr" className={`${inter.variable} ${plusJakarta.variable} ${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('rosa_theme') === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body { background-color: #FAF8F5; color: #18151A; }
              html.dark body { background-color: #0F0C12; color: #F5F3F7; }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] dark:bg-[#0F0C12] text-[#18151A] dark:text-[#F5F3F7] font-sans relative selection:bg-[#FF6B5B] selection:text-white overflow-x-hidden">
        <ThemeProvider>
          <LanguageProvider>
            <CMSProvider>
              <ToastProvider />
              {children}
            </CMSProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
