"use client";

import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { createPortal } from 'react-dom';

interface CinematicVideoPlayerProps {
  isOpen: boolean;
  videoUrl: string;
  onClose: () => void;
  title?: string;
}

export default function CinematicVideoPlayer({ isOpen, videoUrl, onClose, title }: CinematicVideoPlayerProps) {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Reset state when opened with a new video
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsPlaying(true);
      videoRef.current.play().catch(e => console.log('Auto-play prevented:', e));
    }
  }, [isOpen, videoUrl]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const clickedValue = (x / rect.width) * videoRef.current.duration;
      videoRef.current.currentTime = clickedValue;
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  if (!mounted || !isOpen || !videoUrl) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center animate-in fade-in duration-500">
      {/* Cinematic Dark Glass Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl transition-opacity"
        onClick={onClose}
      />
      
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-[10000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all hover:scale-110 hover:rotate-90"
      >
        <X size={24} />
      </button>

      {title && (
        <div className="absolute top-8 left-8 z-[10000] max-w-2xl">
          <h2 className="text-white text-2xl font-bold tracking-wide drop-shadow-lg">{title}</h2>
        </div>
      )}

      {/* Video Container */}
      <div className="relative w-[90%] max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.15)] group animate-in zoom-in-95 duration-500">
        
        <video 
          ref={videoRef}
          src={videoUrl} 
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
          playsInline
        />

        {/* Custom Controls Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 pt-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          
          {/* Progress Bar */}
          <div 
            className="w-full h-1.5 bg-white/20 rounded-full mb-6 cursor-pointer overflow-hidden group/progress relative"
            onClick={handleProgressClick}
          >
            <div 
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#D4AF37] to-[#E5C667] rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            {/* Hover thumb could be added here */}
          </div>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-6">
              <button onClick={togglePlay} className="hover:text-[#D4AF37] hover:scale-110 transition-all">
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
              </button>
              
              <button onClick={toggleMute} className="hover:text-[#D4AF37] hover:scale-110 transition-all">
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
            </div>

            <button onClick={toggleFullScreen} className="hover:text-[#D4AF37] hover:scale-110 transition-all">
              <Maximize size={24} />
            </button>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
