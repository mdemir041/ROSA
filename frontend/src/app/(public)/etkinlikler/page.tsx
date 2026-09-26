'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar as CalendarIcon, Clock, MapPin, ArrowRight, Bell, ExternalLink, Activity } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCMS } from '@/context/CMSContext';

export default function EtkinliklerPage(): React.JSX.Element {
  const { lang } = useLanguage();
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedEvent]);

  useEffect(() => {
    fetch('/api/strapi/events?sort=date:desc')
      .then(res => {
        if (!res.ok) throw new Error('API yanıt vermedi');
        return res.json();
      })
      .then(data => {
        if (data && data.data) {
          setEvents(data.data);
        }
        setIsFetching(false);
      })
      .catch(err => {
        console.warn('Etkinlikler çekilemedi:', err.message);
        setIsFetching(false);
      });
  }, []);

  // Helper function to format the date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return { day: '', month: '', year: '', time: '', fullDate: '' };
    const d = new Date(dateStr);
    return {
      day: d.toLocaleDateString('tr-TR', { day: '2-digit' }),
      month: d.toLocaleDateString('tr-TR', { month: 'long' }),
      year: d.getFullYear(),
      time: d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      fullDate: d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
    };
  };

  // Helper function to check if string is a URL
  const isUrl = (str: string) => {
    if (!str) return false;
    // Catch http, https, www, or typical domain formats without spaces (e.g. google.com/maps)
    return str.startsWith('http') || str.includes('www.') || (str.includes('.') && !str.includes(' ') && str.length > 5);
  };

  const getHref = (str: string) => {
    if (str.startsWith('http')) return str;
    return `https://${str}`;
  };

  const spotlightEvent = events[0];
  const timelineEvents = events.slice(1);

  return (
    <>
      <div className="pt-32 pb-24 min-h-screen bg-[#FAF8F5] dark:bg-[#0A080C] overflow-hidden relative">
        
        {/* Abstract Architectural Background Lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 dark:opacity-40">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" className="text-[#3D154B] dark:text-[#D4AF37]" strokeWidth="0.5" strokeOpacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#6A4C93]/10 to-transparent rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#D4AF37]/5 to-transparent rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1F0933] via-[#6A4C93] to-[#1F0933] dark:from-[#FDE68A] dark:via-[#D4AF37] dark:to-[#FDE68A] mb-6 tracking-tight drop-shadow-sm">
              Zaman <span className="italic font-light">Çizelgesi</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Rosa Kadın Derneği'nin hukuki mücadele takvimi, emsal davalar ve yaklaşan tüm etkinliklerin kronolojik arşivi.
            </p>
          </div>

          {isFetching ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-[#6A4C93] border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <>
              {/* --- SPOTLIGHT EVENT (Redesigned) --- */}
              {spotlightEvent && (
            <div className="mb-32">
              <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start">
                <div className="w-12 h-[2px] bg-[#D4AF37]" />
                <span className="text-[#D4AF37] font-bold tracking-[0.2em] uppercase text-sm">Gündemdeki Dava / Etkinlik</span>
              </div>

              <div 
                onClick={() => setSelectedEvent(spotlightEvent)}
                className="group relative w-full rounded-none overflow-hidden cursor-pointer bg-white dark:bg-[#120F16] border-l-4 border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 hover:shadow-2xl"
              >
                <div className="flex flex-col lg:flex-row min-h-[400px]">
                  
                  {/* Left/Top Content Area */}
                  <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
                    
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                      <span className={`text-[11px] font-bold text-white px-4 py-1.5 rounded uppercase tracking-widest ${spotlightEvent.type === 'Dava' ? 'bg-[#3D154B]' : 'bg-[#D4AF37]'}`}>
                        {spotlightEvent.type || 'Etkinlik'}
                      </span>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold text-sm">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{formatDate(spotlightEvent.date).fullDate}</span>
                      </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-[#1A1622] dark:text-white leading-[1.2] mb-8 group-hover:text-[#D4AF37] transition-colors duration-500">
                      {spotlightEvent.title}
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-6 sm:items-center mt-auto pt-8 border-t border-gray-100 dark:border-white/10">
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-medium">
                        <Clock className="w-5 h-5 text-[#D4AF37]" />
                        <span>{formatDate(spotlightEvent.date).time}</span>
                      </div>
                      
                      {spotlightEvent.locationOrLink && (
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-medium">
                          {isUrl(spotlightEvent.locationOrLink) ? (
                            <>
                              <ExternalLink className="w-5 h-5 text-[#6A4C93]" />
                              <a href={getHref(spotlightEvent.locationOrLink)} target="_blank" rel="noreferrer" className="text-[#6A4C93] dark:text-[#E0CFF2] hover:underline underline-offset-4">Haritada Görüntüle</a>
                            </>
                          ) : (
                            <>
                              <MapPin className="w-5 h-5 text-[#6A4C93]" />
                              <span className="line-clamp-1 max-w-[300px] break-all">{spotlightEvent.locationOrLink}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Image / Abstract Art Area */}
                  <div className="w-full lg:w-[40%] xl:w-[45%] relative bg-[#F5F2F7] dark:bg-[#1A1622] flex items-center justify-center overflow-hidden min-h-[300px] lg:min-h-full">
                    {spotlightEvent.imgUrl || spotlightEvent.imageUrl ? (
                      <>
                        <Image 
                          src={spotlightEvent.imgUrl || spotlightEvent.imageUrl} 
                          alt={spotlightEvent.title} 
                          fill 
                          unoptimized 
                          className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/10 dark:bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6A4C93]/20 via-[#1A1622]/5 to-[#D4AF37]/20 dark:from-[#3D154B] dark:via-[#1A1622] dark:to-[#D4AF37]/30" />
                        <Activity className="w-32 h-32 text-[#6A4C93]/10 dark:text-white/5 transform -rotate-12 scale-150" strokeWidth={1} />
                        <div className="absolute inset-0 backdrop-blur-[60px]" />
                        <div className="relative z-10 w-24 h-24 border border-[#D4AF37]/30 rounded-full flex items-center justify-center group-hover:border-[#D4AF37] transition-colors duration-700">
                           <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full animate-ping absolute" />
                           <ArrowRight className="w-8 h-8 text-[#D4AF37] transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* --- TIMELINE (Redesigned) --- */}
          {timelineEvents.length > 0 && (
            <div className="relative mx-auto mt-20">
              
              {/* Elegant Thin Timeline Line */}
              <div className="absolute left-[24px] lg:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#D4AF37] via-gray-300 dark:via-white/10 to-transparent -translate-x-1/2 opacity-50" />

              <div className="space-y-16 lg:space-y-32">
                {timelineEvents.map((event, index) => {
                  const { day, month, year, time } = formatDate(event.date);
                  const isEven = index % 2 === 0;
                  const tagColor = event.type === 'Dava' ? 'text-[#3D154B] dark:text-[#E0CFF2] bg-[#3D154B]/10 dark:bg-[#3D154B]/50' : 'text-[#D4AF37] bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20';
                  
                  return (
                    <div key={event.documentId} className={`relative flex flex-col lg:flex-row items-start lg:items-center w-full group cursor-pointer`} onClick={() => setSelectedEvent(event)}>
                      
                      {/* Architectural Timeline Dot */}
                      <div className="absolute left-[24px] lg:left-1/2 top-10 lg:top-1/2 w-4 h-4 bg-[#FAF8F5] dark:bg-[#0A080C] border-2 border-[#D4AF37] rounded-none rotate-45 z-10 -translate-x-1/2 lg:-translate-y-1/2 group-hover:bg-[#D4AF37] group-hover:scale-125 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)]" />

                      {/* Clean Editorial Card */}
                      <div className={`w-full lg:w-[45%] pl-16 lg:pl-0 ${isEven ? 'lg:pr-20 lg:text-right' : 'lg:pl-20 lg:ml-auto'}`}>
                        <div className={`transition-transform duration-500 ease-out group-hover:-translate-y-2`}>
                           
                           <div className={`flex items-center gap-4 mb-4 ${isEven ? 'lg:justify-end' : 'justify-start'}`}>
                             <span className={`text-[10px] font-bold px-3 py-1 uppercase tracking-widest ${tagColor}`}>
                               {event.type || 'Etkinlik'}
                             </span>
                             <span className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-widest">{day} {month} {year}</span>
                           </div>

                           <h3 className="text-2xl lg:text-3xl font-serif font-black text-[#1A1622] dark:text-white leading-[1.3] mb-6 group-hover:text-[#6A4C93] dark:group-hover:text-[#D4AF37] transition-colors duration-300">
                             {event.title}
                           </h3>

                           <div className={`flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-400 font-medium ${isEven ? 'lg:items-end' : 'items-start'}`}>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#D4AF37]" />
                                <span>{time}</span>
                              </div>
                              {event.locationOrLink && (
                                <div className="flex items-center gap-2">
                                  {isUrl(event.locationOrLink) ? (
                                    <>
                                      <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                                      <a href={getHref(event.locationOrLink)} target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors hover:underline">Haritada Gör</a>
                                    </>
                                  ) : (
                                    <>
                                      <MapPin className="w-4 h-4 text-[#D4AF37]" />
                                      <span className="line-clamp-1 max-w-[280px] break-all">{event.locationOrLink}</span>
                                    </>
                                  )}
                                </div>
                              )}
                           </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
              {events.length === 0 && (
                <div className="text-center py-32 animate-cinematic-reveal">
                  <Activity className="w-16 h-16 text-gray-300 dark:text-white/10 mx-auto mb-6" />
                  <p className="text-2xl font-serif text-gray-400 dark:text-white/30">Yaklaşan etkinlik veya dava bulunmuyor.</p>
                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* --- EDITORIAL MODAL (True Premium) --- */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 animate-in fade-in zoom-in-95 duration-300">
          <div className="absolute inset-0 bg-[#FAF8F5]/90 dark:bg-[#0A080C]/95 backdrop-blur-xl" onClick={() => setSelectedEvent(null)} />
          
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#120F16] shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col border-t-4 border-[#D4AF37]">
            
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-gray-100 dark:bg-white/5 hover:bg-[#3D154B] dark:hover:bg-[#D4AF37] flex items-center justify-center transition-all duration-300 z-50 group"
            >
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-white transform group-hover:rotate-90 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Image ONLY if exists */}
            {(selectedEvent.imgUrl || selectedEvent.imageUrl) && (
              <div className="relative w-full h-[300px] shrink-0">
                <Image 
                  src={selectedEvent.imgUrl || selectedEvent.imageUrl} 
                  alt={selectedEvent.title} 
                  fill 
                  unoptimized 
                  className="object-cover" 
                />
              </div>
            )}

            {/* Modal Content */}
            <div className={`w-full p-8 md:p-12 ${!(selectedEvent.imgUrl || selectedEvent.imageUrl) ? 'pt-16' : ''}`}>
              
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-[10px] font-bold px-3 py-1 uppercase tracking-widest ${selectedEvent.type === 'Dava' ? 'text-white bg-[#3D154B]' : 'text-[#1A1622] bg-[#D4AF37]'}`}>
                  {selectedEvent.type || 'Etkinlik'}
                </span>
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                  {formatDate(selectedEvent.date).fullDate}
                </span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-serif font-black text-[#1A1622] dark:text-white leading-[1.2] mb-10">
                {selectedEvent.title}
              </h2>

              <div className="flex flex-col md:flex-row gap-8 mb-12 py-8 border-y border-gray-100 dark:border-white/10">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    <Clock className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Zaman</p>
                    <p className="text-lg font-medium text-[#1A1622] dark:text-white">{formatDate(selectedEvent.date).time}</p>
                  </div>
                </div>
                
                {selectedEvent.locationOrLink && (
                  <div className="flex items-start gap-4 flex-1 border-t md:border-t-0 md:border-l border-gray-100 dark:border-white/10 pt-6 md:pt-0 md:pl-8">
                    <div className="mt-1">
                      {isUrl(selectedEvent.locationOrLink) ? <ExternalLink className="w-6 h-6 text-[#D4AF37]" /> : <MapPin className="w-6 h-6 text-[#D4AF37]" />}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Konum / Bağlantı</p>
                      {isUrl(selectedEvent.locationOrLink) ? (
                        <a href={getHref(selectedEvent.locationOrLink)} target="_blank" rel="noreferrer" className="text-lg font-medium text-[#6A4C93] dark:text-[#E0CFF2] hover:underline underline-offset-4">
                          Haritada Görüntüle &rarr;
                        </a>
                      ) : (
                        <p className="text-lg font-medium text-[#1A1622] dark:text-white leading-snug break-all">{selectedEvent.locationOrLink}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {selectedEvent.description ? (
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 font-medium leading-relaxed whitespace-pre-wrap">
                  {selectedEvent.description}
                </div>
              ) : (
                <div className="py-8">
                  <p className="text-lg text-gray-400 dark:text-white/30 font-serif italic">
                    Bu kayıt için ek bir açıklama metni bulunmuyor.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
