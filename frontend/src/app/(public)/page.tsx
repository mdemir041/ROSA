import React from 'react';
import HomeClient from './HomeClient';

// Server Component
export default async function HomePage() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
  
  let initialNews = [];
  try {
    // Sunucu tarafında SSR ile haberleri anında çek
    const res = await fetch(`${strapiUrl}/api/habers?sort=createdAt:desc&pagination[limit]=10`, {
      next: { revalidate: 10 } // 10 saniyede bir ISR önbelleği
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data && data.data && data.data.length > 0) {
        initialNews = data.data.map((item: any) => ({
          id: `strapi-${item.documentId}`,
          title: item.title,
          date: item.date,
          imgUrl: item.imageUrl || null,
          link: '/haberler'
        }));
      }
    }
  } catch (error) {
    console.error('Anasayfa haberleri SSR çekilirken hata oluştu:', error);
  }

  return <HomeClient initialNews={initialNews} />;
}
