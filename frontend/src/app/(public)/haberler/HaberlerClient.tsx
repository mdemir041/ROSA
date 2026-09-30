'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import parse, { DOMNode, Element, Text } from 'html-react-parser';
import { icons as LucideIcons } from 'lucide-react';
import * as FaIcons from 'react-icons/fa6';
import DOMPurify from 'isomorphic-dompurify';
import CustomVideoPlayer from '@/components/public/CustomVideoPlayer';
import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';

export default function HaberlerClient({ initialNews }: { initialNews: any[] }): React.JSX.Element {
  const { lang } = useLanguage();
  const [selectedNews, setSelectedNews] = useState<any>(null);

  React.useEffect(() => {
    if (selectedNews) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedNews]);

  return (
    <>
      <div className="min-h-screen pt-32 pb-20 bg-transparent transition-colors duration-500 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#6A4C93]/5 to-transparent blur-[120px] dark:from-[#D4AF37]/10" />
          <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-[#3D154B]/5 to-transparent blur-[100px] dark:from-[#6A4C93]/10" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {initialNews && initialNews.length > 0 ? (
            <div className="max-w-6xl mx-auto">
              {/* Featured News (Ana Kısım) */}
              <div 
                onClick={() => setSelectedNews(initialNews[0])}
                className="w-full h-auto min-h-[400px] lg:h-[500px] mb-16 rounded-[2.5rem] overflow-hidden relative group cursor-pointer shadow-2xl border border-white/20 dark:border-white/10"
              >
                {initialNews[0].imgUrl ? (
                  <Image src={initialNews[0].imgUrl} alt={initialNews[0].title} fill unoptimized className="object-cover transform transition-transform duration-[2s] group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 bg-gray-100 dark:bg-[#1A1622] flex items-center justify-center">
                    <Image src="/image_2.png" alt="Rosa" fill unoptimized className="opacity-10 object-contain p-20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-block px-4 py-2 bg-[#D4AF37] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                      En Güncel
                    </span>
                    <span className="text-white/80 text-xs lg:text-sm font-bold tracking-[0.2em] uppercase">{initialNews[0].date}</span>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-serif font-black text-white leading-tight max-w-4xl group-hover:text-[#D4AF37] transition-colors duration-500">
                    {initialNews[0].title}
                  </h2>
                </div>
              </div>

              {/* Smaller List for the Rest */}
              {initialNews.length > 1 && (
                <div className="w-full flex flex-col border-t-2 border-[#3D154B]/10 dark:border-white/5">
                  {initialNews.slice(1).map((item: any, index: number) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedNews(item)}
                      className="cursor-pointer group relative w-full py-8 lg:py-10 border-b border-[#3D154B]/10 dark:border-white/5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:bg-gradient-to-r hover:from-transparent hover:via-[#3D154B]/[0.02] hover:to-transparent dark:hover:via-white/[0.02] transition-all duration-700 px-4 lg:px-8 overflow-visible"
                    >
                      {/* Animated Bottom Border */}
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#6A4C93] to-[#D4AF37] group-hover:w-full transition-all duration-1000 ease-out z-20" />

                      {/* Left: Number & Date */}
                      <div className="lg:w-[15%] shrink-0 flex flex-col gap-1">
                        <span className="text-[9px] lg:text-[10px] font-black text-[#D4AF37] tracking-[0.3em] uppercase opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                          0{index + 2}
                        </span>
                        <div className="text-[11px] lg:text-xs font-bold text-[#6A4C93] dark:text-white/60 group-hover:text-[#3D154B] dark:group-hover:text-white tracking-[0.2em] uppercase transition-colors duration-500">
                          {item.date}
                        </div>
                      </div>

                      {/* Center: Scaled Title - Strictly 50% */}
                      <div className="lg:w-[50%] shrink-0 pr-4 lg:pr-12 relative z-40 pointer-events-none transform group-hover:translate-x-4 transition-transform duration-700 ease-out">
                        <h3 className="text-xl lg:text-2xl xl:text-3xl font-serif font-black text-[#18151A] dark:text-[#F5F3F7] leading-[1.2] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6A4C93] group-hover:to-[#D4AF37] transition-all duration-500 line-clamp-2 drop-shadow-sm">
                          {item.title}
                        </h3>
                      </div>

                      {/* Right: Floating Image & Arrow - Strictly 35% */}
                      <div className="lg:w-[35%] shrink-0 flex justify-end items-center relative mt-4 lg:mt-0 z-50">
                        
                        {/* Always-visible but blurry image that sharpens and animates on hover */}
                        {item.imgUrl && (
                          <div className="absolute right-24 xl:right-32 top-1/2 -translate-y-1/2 w-48 h-32 lg:w-64 lg:h-40 xl:w-72 xl:h-48 rounded-[1.5rem] overflow-hidden opacity-70 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-6 group-hover:rotate-2 group-hover:shadow-[0_20px_40px_rgba(106,76,147,0.3)] dark:group-hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-lg z-50 hidden lg:block border border-transparent group-hover:border-white/40 dark:group-hover:border-white/20">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                            <Image src={item.imgUrl} alt={item.title} fill unoptimized className="object-cover transform scale-110 group-hover:scale-100 transition-all duration-[1s] ease-out blur-[2px] saturate-50 group-hover:!blur-none group-hover:!saturate-100" />
                          </div>
                        )}

                        {/* Arrow Button */}
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-[#3D154B]/10 dark:border-white/10 flex items-center justify-center group-hover:border-transparent group-hover:bg-gradient-to-tr group-hover:from-[#6A4C93] group-hover:to-[#D4AF37] transition-all duration-500 z-50 bg-white/30 dark:bg-black/30 backdrop-blur-xl group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#3D154B] dark:text-white group-hover:text-white transform -rotate-45 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto w-full py-24 px-8 bg-white/40 dark:bg-white/5 rounded-[2.5rem] shadow-xl border border-white/50 dark:border-white/10 backdrop-blur-md flex items-center justify-center animate-cinematic-reveal">
              <p className="text-xl font-medium text-[#3D154B]/60 dark:text-white/60">Henüz haber eklenmemiş.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- IMMERSIVE MODAL (Açılır Sayfa) --- */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 animate-in fade-in duration-500">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#FAF8F5]/90 dark:bg-[#151218]/95 backdrop-blur-2xl"
            onClick={() => setSelectedNews(null)}
          />
          
          {/* Modal Container */}
          <div className="relative w-full max-w-5xl h-[95vh] lg:h-[85vh] bg-white dark:bg-[#120F16] rounded-[2rem] lg:rounded-[3rem] shadow-[0_30px_100px_rgba(61,21,75,0.3)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-cinematic-reveal border border-white/50 dark:border-white/5">
            
            {/* Scrollable Inner Content */}
            <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col scroll-smooth no-scrollbar relative">
              
              {/* Close Button */}
              <div className="absolute top-6 right-6 z-50 flex justify-end pointer-events-none">
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="w-14 h-14 bg-black/20 backdrop-blur-xl border border-white/20 hover:bg-[#D4AF37] hover:border-transparent rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl group pointer-events-auto"
                >
                  <svg className="w-6 h-6 text-white transform group-hover:rotate-90 transition-transform duration-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Header / Hero - Seamless White Fade Style */}
              <div className="relative w-full h-[45vh] min-h-[350px] shrink-0 -mt-8">
                {selectedNews.imgUrl ? (
                  <Image src={selectedNews.imgUrl} alt={selectedNews.title} fill unoptimized className="object-cover object-center" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#F5F3F7] dark:bg-[#1A1622]">
                     <Image src="/image_2.png" alt="Rosa Logo" fill unoptimized className="opacity-10 object-contain p-20" />
                  </div>
                )}
                
                {/* Seamless Fade Gradient to White */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-[#120F16] dark:via-[#120F16]/50" />
              </div>

              {/* Editorial Content Area */}
              <div className="w-full max-w-4xl mx-auto px-6 lg:px-16 pb-16 flex flex-col relative z-20 -mt-20">
                
                {/* Meta Strip (Positioned on the fade boundary) */}
                <div className="flex flex-wrap items-center gap-6 lg:gap-10 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6A4C93] to-[#8C6BB1] shadow-[0_10px_20px_rgba(106,76,147,0.3)] flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-[#6A4C93] dark:text-[#D4AF37] tracking-[0.2em] uppercase mb-0.5">Yazar</span>
                      <span className="text-[15px] font-bold text-[#18151A] dark:text-white leading-none">{selectedNews.author || 'Rosa Haber Masası'}</span>
                    </div>
                  </div>
                  <div className="w-[1px] h-10 bg-[#3D154B]/10 dark:bg-white/10 hidden sm:block"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1A1622] border border-[#3D154B]/10 dark:border-white/10 shadow-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#6A4C93] dark:text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-[#6A4C93] dark:text-[#D4AF37] tracking-[0.2em] uppercase mb-0.5">Tarih</span>
                      <span className="text-[15px] font-bold text-[#18151A] dark:text-white leading-none">{selectedNews.date}</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#18151A] dark:text-white leading-[1.1] mb-12 tracking-tight">
                  {selectedNews.title}
                </h2>
                
                {/* Text Content with Drop Cap */}
                {selectedNews.content && (
                  <div className="prose prose-lg sm:prose-xl dark:prose-invert max-w-none break-words text-[#3D154B]/80 dark:text-white/70 font-medium leading-relaxed mb-16 prose-p:first-of-type:first-letter:text-7xl prose-p:first-of-type:first-letter:font-black prose-p:first-of-type:first-letter:text-[#6A4C93] dark:prose-p:first-of-type:first-letter:text-[#D4AF37] prose-p:first-of-type:first-letter:float-left prose-p:first-of-type:first-letter:mr-4 prose-p:first-of-type:first-letter:leading-[0.8] prose-a:text-[#D4AF37] prose-a:no-underline hover:prose-a:underline">
                    {parse(DOMPurify.sanitize(selectedNews.content), {
                      replace: (domNode) => {
                        if (domNode.type === 'text' && (domNode as Text).data) {
                          const textNode = domNode as Text;
                          const text = textNode.data;
                          if (/\[icon:([a-zA-Z0-9]+)\]/.test(text)) {
                            const parts = text.split(/(\[icon:[a-zA-Z0-9]+\])/);
                            return (
                              <React.Fragment>
                                {parts.map((part, index) => {
                                  const match = part.match(/\[icon:([a-zA-Z0-9]+)\]/);
                                  if (match) {
                                    const iconName = match[1];
                                    let IconComponent: any = null;
                                    if (iconName in LucideIcons) IconComponent = (LucideIcons as any)[iconName];
                                    else if (iconName in FaIcons) IconComponent = (FaIcons as any)[iconName];
                                    
                                    if (IconComponent) {
                                      return <IconComponent key={index} size={24} className="inline-block mx-1 align-middle text-[#6A4C93] dark:text-[#D4AF37]" />;
                                    }
                                    return part;
                                  }
                                  return part;
                                })}
                              </React.Fragment>
                            );
                          }
                        }
                        return undefined;
                      }
                    })}
                  </div>
                )}

                {/* Video Player */}
                {selectedNews.hasVideo && selectedNews.videoUrl && (
                  <div className="w-full flex flex-col items-center justify-center mb-16">
                     <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#6A4C93]/20 dark:via-white/10 to-transparent mb-12" />
                     <h4 className="text-xl font-bold text-[#6A4C93] dark:text-[#D4AF37] mb-6 self-start tracking-wide uppercase flex items-center gap-3">
                       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                       Haber Videosu
                     </h4>
                     {selectedNews.videoUrl.includes('youtube.com') || selectedNews.videoUrl.includes('youtu.be') ? (
                       <iframe 
                         src={selectedNews.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/')} 
                         className="w-full aspect-video rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-200 dark:border-white/5" 
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                         allowFullScreen 
                       />
                     ) : (
                       <CustomVideoPlayer src={selectedNews.videoUrl} />
                     )}
                  </div>
                )}

                {/* Empty State if neither exists */}
                {!selectedNews.content && (!selectedNews.hasVideo || !selectedNews.videoUrl) && (
                  <div className="w-full flex items-center justify-center py-16 mb-12">
                    <p className="text-2xl text-[#3D154B]/40 dark:text-white/20 font-serif italic text-center">
                      İçerik hazırlanıyor...
                    </p>
                  </div>
                )}

                {/* Previous & Next Navigation (Editorial Image Reveal) */}
                <div className="w-full mt-12 flex flex-col sm:flex-row items-stretch justify-between border-t border-[#3D154B]/10 dark:border-white/10 pt-8 gap-4 sm:gap-0">
                  
                  {/* Previous */}
                  {initialNews.findIndex((n: any) => n.id === selectedNews.id) > 0 ? (() => {
                    const prevNews = initialNews[initialNews.findIndex((n: any) => n.id === selectedNews.id) - 1];
                    return (
                      <div 
                        onClick={() => setSelectedNews(prevNews)}
                        className="group relative flex-1 cursor-pointer p-6 sm:p-8 sm:-ml-8 rounded-[2rem] overflow-hidden transition-all duration-500"
                      >
                        {/* Hover Image Background */}
                        {prevNews.imgUrl && (
                          <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem] overflow-hidden">
                             <Image src={prevNews.imgUrl} alt="" fill unoptimized className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out" />
                             <div className="absolute inset-0 bg-black/60" />
                          </div>
                        )}
                        
                        <div className="relative z-10 flex flex-col items-start w-full">
                          <div className="flex items-center gap-3 mb-4 transform group-hover:translate-x-2 transition-transform duration-500">
                            <div className="w-10 h-10 rounded-full border border-[#3D154B]/20 dark:border-white/20 group-hover:border-white/30 flex items-center justify-center transition-colors duration-500 backdrop-blur-sm">
                               <svg className="w-5 h-5 text-[#3D154B] dark:text-white group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </div>
                            <span className="text-[10px] font-bold text-[#6A4C93] dark:text-[#D4AF37] group-hover:text-[#D4AF37] tracking-[0.3em] uppercase transition-colors">Önceki Haber</span>
                          </div>
                          <h3 className="text-xl lg:text-2xl font-serif font-black text-[#18151A] dark:text-white group-hover:text-white transition-colors duration-500 line-clamp-2 transform group-hover:translate-x-2">
                            {prevNews.title}
                          </h3>
                        </div>
                      </div>
                    );
                  })() : <div className="flex-1 hidden sm:block" />}

                  {/* Next */}
                  {initialNews.findIndex((n: any) => n.id === selectedNews.id) < initialNews.length - 1 ? (() => {
                    const nextNews = initialNews[initialNews.findIndex((n: any) => n.id === selectedNews.id) + 1];
                    return (
                      <div 
                        onClick={() => setSelectedNews(nextNews)}
                        className="group relative flex-1 cursor-pointer p-6 sm:p-8 sm:-mr-8 rounded-[2rem] overflow-hidden transition-all duration-500 sm:text-right"
                      >
                        {/* Hover Image Background */}
                        {nextNews.imgUrl && (
                          <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem] overflow-hidden">
                             <Image src={nextNews.imgUrl} alt="" fill unoptimized className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out" />
                             <div className="absolute inset-0 bg-black/60" />
                          </div>
                        )}
                        
                        <div className="relative z-10 flex flex-col sm:items-end w-full">
                          <div className="flex items-center sm:justify-end gap-3 mb-4 transform sm:group-hover:-translate-x-2 group-hover:translate-x-2 sm:group-hover:translate-x-0 transition-transform duration-500">
                            <span className="text-[10px] font-bold text-[#6A4C93] dark:text-[#D4AF37] group-hover:text-[#D4AF37] tracking-[0.3em] uppercase transition-colors order-2 sm:order-1">Sonraki Haber</span>
                            <div className="w-10 h-10 rounded-full border border-[#3D154B]/20 dark:border-white/20 group-hover:border-white/30 flex items-center justify-center transition-colors duration-500 backdrop-blur-sm order-1 sm:order-2">
                               <svg className="w-5 h-5 text-[#3D154B] dark:text-white group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </div>
                          </div>
                          <h3 className="text-xl lg:text-2xl font-serif font-black text-[#18151A] dark:text-white group-hover:text-white transition-colors duration-500 line-clamp-2 transform sm:group-hover:-translate-x-2 group-hover:translate-x-2 sm:group-hover:translate-x-0">
                            {nextNews.title}
                          </h3>
                        </div>
                      </div>
                    );
                  })() : <div className="flex-1 hidden sm:block" />}

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
