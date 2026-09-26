'use client';

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Calendar as CalendarIcon, Clock, MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCMS } from '@/context/CMSContext';
import { useLanguage } from '@/context/LanguageContext';

interface Event {
  documentId: string;
  title: string;
  date: string;
  type: string;
  locationOrLink: string;
  imageUrl?: string;
  isFree?: boolean; // We'll infer this or mock if not in DB
}

interface Publication {
  documentId: string;
  title: string;
  desc: string;
  imgUrl: string;
  link: string;
}

export default function UpcomingEventsSection() {
  const { pageData } = useCMS();
  const { lang } = useLanguage();
  const ui = pageData?.ui;
  const localeMap: Record<string, string> = { TR: 'tr-TR', KU: 'tr-TR', EN: 'en-US', DE: 'de-DE', FR: 'fr-FR' };
  const locale = localeMap[lang] || 'tr-TR';

  const [events, setEvents] = useState<Event[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activePubIndex, setActivePubIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Fetch Events
    fetch('/api/strapi/events?sort=date:asc&pagination[limit]=20')
      .then(res => res.json())
      .then(data => {
        if (data && data.data) {
          setEvents(data.data);
        }
      })
      .catch(err => console.warn("Etkinlikler yüklenemedi:", err));

    // Fetch Publications (Rapors)
    fetch('/api/strapi/rapors?sort=createdAt:desc&pagination[limit]=5')
      .then(res => res.json())
      .then(data => {
        if (data && data.data) {
          setPublications(data.data);
        }
      })
      .catch(err => console.warn("Yayınlar yüklenemedi:", err));
  }, []);

  // --- REPORTS CAROUSEL AUTOPLAY ---
  useEffect(() => {
    if (publications.length <= 1 || isHovering) return;
    const timer = setInterval(() => {
      setActivePubIndex(prev => (prev === publications.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [publications.length, isHovering]);

  // --- CALENDAR LOGIC ---
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert Sunday=0 to Monday=0
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  
  const prevMonthDays = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth() - 1);
  
  const days = [];
  // Previous month trailing days
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.unshift({ date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthDays - i), isCurrentMonth: false });
  }
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i), isCurrentMonth: true });
  }
  // Next month leading days (to complete grid)
  const remainingCells = (Math.ceil(days.length / 7) * 7) - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({ date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i), isCurrentMonth: false });
  }

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const hasEventOnDate = (date: Date) => {
    return events.some(e => {
      const eDate = new Date(e.date);
      return eDate.getDate() === date.getDate() && eDate.getMonth() === date.getMonth() && eDate.getFullYear() === date.getFullYear();
    });
  };

  const isSameDate = (d1: Date, d2: Date) => {
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
  };

  const toggleSelectDate = (date: Date) => {
    if (selectedDate && isSameDate(selectedDate, date)) {
      setSelectedDate(null); // Unselect if already selected
    } else {
      setSelectedDate(date);
    }
  };

  // --- EVENTS FILTERING ---
  const filteredEvents = selectedDate 
    ? events.filter(e => isSameDate(new Date(e.date), selectedDate))
    : events;

  // Render Event Card
  const renderEventCard = (event: Event) => {
    const eventDate = new Date(event.date);
    const day = eventDate.toLocaleDateString(locale, { day: '2-digit' });
    const monthName = eventDate.toLocaleDateString(locale, { month: 'long' });
    const year = eventDate.getFullYear();
    const time = eventDate.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    
    // Default image if missing
    const imgUrl = event.imageUrl || '/image_2.png';
    const tagBg = event.type === 'Dava' ? 'bg-[#3D154B]' : 'bg-[#D4AF37]';

    return (
      <div key={event.documentId} className="flex bg-white dark:bg-[#1A1622] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow h-36 shrink-0">
        {/* Left Image */}
        <div className="w-1/3 relative bg-gray-100 dark:bg-white/5 flex items-center justify-center p-2 overflow-hidden">
           <div className="relative w-full h-full rounded-lg overflow-hidden">
             <Image src={imgUrl} alt={event.title} fill unoptimized className="object-cover" />
           </div>
        </div>
        
        {/* Right Content */}
        <div className="w-2/3 p-3 flex flex-col justify-between relative">

          
          <div className="flex flex-col gap-1 pr-14">
            <span className={`text-[10px] text-white font-bold px-2 py-0.5 rounded-sm w-max uppercase ${tagBg}`}>
              {event.type}
            </span>
            <h4 className="font-bold text-[#3D154B] dark:text-white text-sm line-clamp-2 leading-tight mt-1">
              {event.title}
            </h4>
          </div>

          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-[11px] font-medium mt-2">
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              <span>{day} {monthName} {year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const monthNamesTr = ui?.months || ["OCAK", "ŞUBAT", "MART", "NİSAN", "MAYIS", "HAZİRAN", "TEMMUZ", "AĞUSTOS", "EYLÜL", "EKİM", "KASIM", "ARALIK"];

  if (!ui) return null;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
          
          {/* COLUMN 1: CALENDAR */}
          <div className="flex flex-col">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-2 mb-6">
              <h3 className="text-2xl font-bold text-[#D4AF37] border-b-[3px] border-[#D4AF37] inline-block pb-1.5 -mb-[3px] uppercase tracking-wide">
                {ui.eventsTitle || 'ETKİNLİK TAKVİMİ'}
              </h3>
            </div>
            
            <div className="bg-white dark:bg-[#1A1622] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={handlePrevMonth} className="w-8 h-8 rounded-md bg-[#3D154B] text-white flex items-center justify-center hover:bg-[#3D154B]/90 transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h4 className="text-lg font-bold text-[#3D154B] dark:text-white">
                  {monthNamesTr[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h4>
                <button onClick={handleNextMonth} className="w-8 h-8 rounded-md bg-[#3D154B] text-white flex items-center justify-center hover:bg-[#3D154B]/90 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Weekdays */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {(ui.daysMin || ['PT', 'SA', 'ÇA', 'PE', 'CU', 'CT', 'PZ']).map(day => (
                  <div key={day} className="text-center text-xs font-bold text-[#3D154B] dark:text-[#D4AF37] bg-gray-50 dark:bg-white/5 py-2 rounded-md">
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((d, i) => {
                  const hasEvent = hasEventOnDate(d.date);
                  const isSelected = selectedDate && isSameDate(d.date, selectedDate);
                  const isToday = isSameDate(d.date, new Date());
                  
                  return (
                    <button 
                      key={i}
                      onClick={() => toggleSelectDate(d.date)}
                      className={`
                        relative w-full aspect-square flex items-center justify-center rounded-lg text-sm font-semibold transition-all
                        ${!d.isCurrentMonth ? 'text-gray-300 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'}
                        ${isSelected ? 'bg-[#D4AF37] text-white shadow-md hover:bg-[#D4AF37]' : ''}
                        ${isToday && !isSelected ? 'ring-2 ring-[#3D154B] ring-inset' : ''}
                      `}
                    >
                      {d.date.getDate()}
                      {hasEvent && (
                        <span className={`absolute bottom-1.5 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[#E30A17]'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLUMN 2: RECENT EVENTS */}
          <div className="flex flex-col">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-2 mb-6 flex justify-between items-end relative">
              <div className="flex flex-col relative">
                <h3 className="text-2xl font-bold text-[#3D154B] dark:text-white pb-1.5">
                  {selectedDate ? (ui.eventsOnDate || '{date} Etkinlikleri').replace('{date}', selectedDate.toLocaleDateString(locale)) : (ui.latestEvents || 'Son Etkinlikler')}
                </h3>
                {/* Arrow pointing down like screenshot */}
                <div className="absolute -bottom-[6px] left-0 w-3 h-3 bg-[#3D154B] dark:bg-white" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
              </div>
              <Link href="/etkinlikler" className="text-sm text-gray-500 hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
                {ui.seeAllEvents} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="flex flex-col gap-4 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(renderEventCard)
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500 bg-white dark:bg-[#1A1622] rounded-xl border border-dashed border-gray-200 dark:border-gray-800 h-full">
                  <CalendarIcon className="w-12 h-12 mb-3 opacity-20" />
                  <p>{ui.noEventsFound}</p>
                  {selectedDate && (
                    <button onClick={() => setSelectedDate(null)} className="text-[#D4AF37] mt-2 text-sm hover:underline font-bold">
                      {ui.showAllEvents}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 3: RAPORLAR */}
          <div className="flex flex-col">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-2 mb-6 flex justify-between items-end relative">
              <h3 className="text-2xl font-bold text-[#D4AF37] border-b-[3px] border-[#D4AF37] inline-block pb-1.5 -mb-[3px] uppercase tracking-wide">
                {ui.reportsTitle || 'RAPORLAR'}
              </h3>
              <Link href="/raporlar" className="text-sm text-[#6A4C93] dark:text-gray-400 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] flex items-center gap-1 transition-colors font-medium">
                {ui.seeAllReports || 'Tümünü Gör'} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {publications.length > 0 ? (
              <div 
                className="flex flex-col items-center relative h-[440px] w-full pt-4"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Carousel Display */}
                <div className="relative w-full h-[280px] flex items-center justify-center perspective-1000">
                   {publications.map((pub, index) => {
                     let diff = index - activePubIndex;
                     if (diff > Math.floor(publications.length / 2)) diff -= publications.length;
                     if (diff < -Math.floor(publications.length / 2)) diff += publications.length;
                     
                     const isCenter = diff === 0;
                     const isLeft = diff === -1;
                     const isRight = diff === 1;
                     const isHiddenLeft = diff < -1;
                     const isHiddenRight = diff > 1;

                     return (
                       <div 
                         key={pub.documentId}
                         onClick={() => {
                           if (isCenter && pub.link) {
                             window.open(pub.link, '_blank', 'noopener,noreferrer');
                           } else if (!isHiddenLeft && !isHiddenRight) {
                             setActivePubIndex(index);
                           }
                         }}
                         className={`absolute transition-all duration-700 ease-out cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-[#1A1622] group
                           ${isCenter 
                             ? 'z-20 scale-100 opacity-100 w-[200px] shadow-[0_20px_40px_-15px_rgba(106,76,147,0.4)] dark:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.3)] hover:-translate-y-2' 
                             : 'w-[170px]'}
                           ${isLeft ? 'z-10 scale-[0.80] opacity-40 -translate-x-[65%] rotate-y-[15deg] shadow-sm hover:opacity-70 pointer-events-auto' : ''}
                           ${isRight ? 'z-10 scale-[0.80] opacity-40 translate-x-[65%] -rotate-y-[15deg] shadow-sm hover:opacity-70 pointer-events-auto' : ''}
                           ${isHiddenLeft ? 'z-0 scale-50 opacity-0 -translate-x-[150%] pointer-events-none' : ''}
                           ${isHiddenRight ? 'z-0 scale-50 opacity-0 translate-x-[150%] pointer-events-none' : ''}
                         `}
                       >
                         <div className="aspect-[3/4] w-full relative overflow-hidden">
                           <Image src={pub.imgUrl || '/image_2.png'} alt={pub.title} fill unoptimized className="object-cover border border-gray-100 dark:border-white/5" />
                           {/* Subtle gradient overlay for better contrast */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                         </div>
                         
                         {isCenter && (
                           <div className="absolute inset-0 bg-[#3D154B]/80 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                             <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                               <ExternalLink className="w-6 h-6 text-[#D4AF37]" />
                             </div>
                             <span className="font-bold text-sm tracking-wide">{ui.viewReport}</span>
                           </div>
                         )}
                       </div>
                     );
                   })}
                </div>

                {/* Active Report Title & Desc */}
                <div className="w-full text-center mt-6 h-[50px] px-2 flex items-center justify-center">
                   <h4 className="font-bold text-[#3D154B] dark:text-white text-base line-clamp-2 leading-tight transition-all duration-300">
                     {publications[activePubIndex]?.title}
                   </h4>
                </div>
                
                {/* Carousel Controls */}
                <div className="flex items-center gap-4 mt-2">
                   <button 
                     onClick={() => setActivePubIndex(prev => (prev === 0 ? publications.length - 1 : prev - 1))}
                     className="text-[#D4AF37] hover:scale-125 transition-transform"
                   >
                     <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
                   </button>
                   
                   <div className="flex gap-2">
                     {publications.map((_, i) => (
                       <button 
                         key={i} 
                         onClick={() => setActivePubIndex(i)}
                         className={`w-2 h-2 rounded-full transition-all duration-500 ${i === activePubIndex ? 'bg-[#3D154B] dark:bg-[#D4AF37] w-6' : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'}`}
                       />
                     ))}
                   </div>

                   <button 
                     onClick={() => setActivePubIndex(prev => (prev === publications.length - 1 ? 0 : prev + 1))}
                     className="text-[#D4AF37] hover:scale-125 transition-transform"
                   >
                     <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
                   </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400 bg-white dark:bg-[#1A1622] rounded-xl border border-dashed border-gray-200 h-[440px]">
                <p>{ui.noReportsFound}</p>
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* Global Scrollbar style specific to this component */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(61, 21, 75, 0.15);
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.15);
        }
      `}} />
    </section>
  );
}
