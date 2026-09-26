import React from 'react';
import HaberlerClient from './HaberlerClient';

export const revalidate = 10; // Enables ISR (revalidates every 10 seconds)

// Server Component (runs entirely on the server)
export default async function HaberlerPage() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
  
  let initialNews = [];
  try {
    // SSR fetch to Strapi. 
    // This will run on the server, resulting in zero loading spinner for the user.
    const res = await fetch(`${strapiUrl}/api/habers?sort=createdAt:desc`, {
      next: { revalidate: 10 }
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data && data.data && data.data.length > 0) {
        initialNews = data.data.map((item: any) => ({
          ...item,
          id: `strapi-${item.documentId}`,
          imgUrl: item.imageUrl || null,
        }));
      }
    }
  } catch (error) {
    console.error('Sunucu tarafında haberler çekilirken hata oluştu:', error);
  }

  return <HaberlerClient initialNews={initialNews} />;
}
