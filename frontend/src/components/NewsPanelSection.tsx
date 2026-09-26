import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NewsItem, AnnouncementItem, UIStrings } from '@/types/cms';
import { PlayCircle } from 'lucide-react';
import CinematicVideoPlayer from './CinematicVideoPlayer';

interface NewsPanelSectionProps {
  newsItems: ReadonlyArray<NewsItem>;
  announcementItems: ReadonlyArray<AnnouncementItem>;
  questionItems: ReadonlyArray<AnnouncementItem>;
  ui: UIStrings;
}

export default function NewsPanelSection({
  newsItems,
  announcementItems,
  questionItems,
  ui
}: NewsPanelSectionProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<'announcements' | 'questions'>('announcements');
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const activeNews = newsItems[activeNewsIndex];
  const activeList = activeTab === 'announcements' ? announcementItems : questionItems;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Side: News Slider */}
          <div className="lg:col-span-7 flex flex-col h-full">
            {/* Header with fixed height to ensure alignment */}
            <div className="mb-6 border-b-2 border-transparent h-12 flex items-end">
              <h3 className="text-2xl font-serif font-black text-[#6A4C93] dark:text-white inline-block pb-2 border-b-4 border-[#10B981]">
                {ui.tabNews}
              </h3>
            </div>
            
            {activeNews ? (
              <div className="relative w-full flex-1 min-h-[450px] md:min-h-[550px] rounded-[2.5rem] overflow-hidden shadow-xl group border border-[#6A4C93]/10 dark:border-white/10 bg-white dark:bg-[#1A1622]">
                {/* Preload and Crossfade Images for Zero Lag */}
                {newsItems.map((news, idx) => (
                  <div key={news.id || idx} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === activeNewsIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}>
                    <Image 
                      src={news.imgUrl || '/image_2.png'} 
                      alt={news.title} 
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    
                    {/* Cinematic Video Play Overlay */}
                    {news.hasVideo && news.videoUrl && idx === activeNewsIndex && (
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center z-10">
                        <button 
                          onClick={() => setIsVideoOpen(true)}
                          className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 hover:bg-[#D4AF37]/90 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-500 cursor-pointer group/play"
                        >
                          <PlayCircle size={40} className="ml-1 group-hover/play:scale-110 transition-transform" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Context-Aware Gradient Overlay: White in Light Mode, Dark in Dark Mode */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 dark:from-[#1A1622]/95 dark:via-[#1A1622]/80 to-transparent z-10 pointer-events-none transition-colors duration-500"></div>
                
                {/* Floating Action Button (Top Right) */}
                <Link href="/haberler" className="absolute top-6 right-6 z-20 px-5 py-2.5 rounded-full bg-white/70 dark:bg-white/15 hover:bg-white dark:hover:bg-white/25 backdrop-blur-md border border-[#6A4C93]/20 dark:border-white/30 text-[#6A4C93] dark:text-white text-[11px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all duration-300 hover:pr-4 shadow-sm dark:shadow-md group/btn">
                  {ui.btnAllNews} 
                  <span className="text-[#D4AF37] text-lg leading-none transform transition-transform group-hover/btn:translate-x-1">→</span>
                </Link>
                
                {/* Content Area */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-8 flex flex-col justify-end">
                  {/* Date Badge */}
                  <div className="mb-4">
                    <span 
                      key={`date-${activeNews.id}`} 
                      className="inline-block bg-white/80 dark:bg-[#3D154B]/50 backdrop-blur-md border border-[#6A4C93]/10 dark:border-white/20 text-[#6A4C93] dark:text-white text-[10px] md:text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm dark:shadow-lg"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] mr-2"></span>
                      {activeNews.date}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <div className="mb-8 max-w-3xl">
                    <Link href={activeNews.link || '/haberler'} className="block group/link">
                      <h4 
                        key={`title-${activeNews.id}`} 
                        className="text-3xl md:text-4xl lg:text-[42px] font-black text-[#3D154B] dark:text-white leading-[1.15] drop-shadow-sm dark:drop-shadow-lg group-hover/link:text-[#D4AF37] transition-colors"
                      >
                        {activeNews.title}
                      </h4>
                    </Link>
                  </div>

                  {/* Floating Glassmorphism Pagination Dock */}
                  <div className="w-full bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-[#6A4C93]/10 dark:border-white/20 rounded-2xl p-2 flex items-center gap-1 md:gap-2 overflow-x-auto scrollbar-hide shadow-md dark:shadow-xl">
                    {newsItems.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveNewsIndex(i)}
                        className={`shrink-0 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-300
                          ${activeNewsIndex === i 
                            ? 'w-14 bg-gradient-to-r from-[#3D154B] to-[#6A4C93] dark:from-[#10B981] dark:to-[#059669] text-white shadow-md' 
                            : 'w-10 bg-transparent text-[#6A4C93] dark:text-white/60 hover:bg-[#6A4C93]/10 dark:hover:bg-white/15'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full flex-1 min-h-[450px] md:min-h-[550px] rounded-[2.5rem] overflow-hidden shadow-xl flex flex-col items-center justify-center border border-[#6A4C93]/10 dark:border-white/10 bg-white/50 dark:bg-[#1A1622]/50 p-8 text-center">
                <p className="text-gray-400 font-medium">Haber bulunamadı.</p>
              </div>
            )}
          </div>

          {/* Right Side: Announcements & Questions Tabs */}
          <div className="lg:col-span-5 flex flex-col h-full">
            {/* Tabs Header with fixed height to ensure alignment */}
            <div className="flex gap-8 mb-6 border-b border-[#6A4C93]/20 dark:border-white/10 h-12 items-end">
              <button 
                onClick={() => setActiveTab('announcements')}
                className={`pb-2 px-2 text-xl md:text-2xl font-serif font-black transition-all border-b-4 ${activeTab === 'announcements' ? 'text-[#6A4C93] dark:text-[#D4AF37] border-[#10B981]' : 'text-[#6A4C93] dark:text-[#B2AAC0] border-transparent hover:text-[#6A4C93] dark:hover:text-white'}`}
              >
                {ui.tabAnnouncements}
              </button>
              <button 
                onClick={() => setActiveTab('questions')}
                className={`pb-2 px-2 text-xl md:text-2xl font-serif font-black transition-all border-b-4 ${activeTab === 'questions' ? 'text-[#6A4C93] dark:text-[#D4AF37] border-[#10B981]' : 'text-[#6A4C93] dark:text-[#B2AAC0] border-transparent hover:text-[#6A4C93] dark:hover:text-white'}`}
              >
                {ui.tabQuestions}
              </button>
            </div>

            <div className="glass-panel p-6 md:p-8 rounded-[2.5rem] border border-white/60 dark:border-white/10 bg-white/70 dark:bg-[#1A1622]/70 backdrop-blur-md shadow-xl flex-1 flex flex-col relative">
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col">
                <div className="flex-1 overflow-y-auto pr-4 space-y-3 scrollbar-thin scrollbar-thumb-[#6A4C93]/20 dark:scrollbar-thumb-white/10 hover:scrollbar-thumb-[#D4AF37] scrollbar-track-transparent">
                  {activeList.map((item) => (
                    <div key={item.id} className="group relative p-4 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-white/5 border border-transparent hover:border-[#6A4C93]/10 dark:hover:border-white/10 hover:shadow-md overflow-hidden">
                      {/* Hover Gradient Line */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#10B981] to-[#059669] transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></div>
                      
                      <Link href={item.link || '#'} className="block pl-2">
                        <h5 className="font-bold text-[#3D154B] dark:text-gray-100 text-[15px] group-hover:text-[#6A4C93] dark:group-hover:text-[#D4AF37] transition-colors leading-snug mb-2">
                          {item.title}
                        </h5>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#6A4C93]/5 dark:bg-[#D4AF37]/10 text-[11px] text-[#6A4C93] dark:text-[#D4AF37] font-semibold tracking-wide">
                          {item.date}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
                
                <div className="pt-6 mt-4 border-t border-[#6A4C93]/10 dark:border-white/10 flex justify-end">
                  <Link href={activeTab === 'announcements' ? '/haberler' : '/sss'} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6A4C93]/5 hover:bg-[#6A4C93] dark:bg-white/5 dark:hover:bg-white/10 text-[11px] uppercase tracking-widest font-bold text-[#6A4C93] dark:text-white hover:text-white transition-all duration-300 group/link">
                    {ui.btnAllAnnouncements}
                    <span className="text-lg leading-none transform transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cinematic Video Player Portal */}
      {activeNews && activeNews.hasVideo && activeNews.videoUrl && (
        <CinematicVideoPlayer 
          isOpen={isVideoOpen}
          videoUrl={activeNews.videoUrl}
          title={activeNews.title}
          onClose={() => setIsVideoOpen(false)}
        />
      )}
    </section>
  );
}
