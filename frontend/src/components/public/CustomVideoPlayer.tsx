"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

export default function CustomVideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [volume, setVolume] = useState(1);
  
  // Format time (e.g., 1:23)
  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

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

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      setCurrentTime(current);
      if (dur > 0) {
        setProgress((current / dur) * 100);
      }
    }
  };
  
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    if (videoRef.current && duration > 0) {
      videoRef.current.currentTime = (seekTo / 100) * duration;
      setProgress(seekTo);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        videoRef.current.volume = volume > 0 ? volume : 1;
        if (volume === 0) setVolume(1);
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const toggleFullScreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  if (!src) return null;

  if (hasError) {
    return (
      <div className="w-full aspect-video rounded-3xl bg-black/10 dark:bg-black/50 border border-gray-200 dark:border-white/10 flex flex-col items-center justify-center text-[#3D154B] dark:text-gray-400 p-6 text-center">
        <VolumeX size={32} className="mb-3 opacity-50" />
        <p className="font-medium text-sm">Video oynatılamıyor veya dosya formatı desteklenmiyor.</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-black group border border-gray-200 dark:border-white/10 transition-transform duration-500 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setHasError(true);
        }}
        playsInline
      />
      
      {/* Big Play Button Overlay (when paused) */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] pointer-events-none transition-all duration-500"
        >
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white pl-2 border border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.3)] transform transition-transform duration-500 group-hover:scale-110">
            <Play size={48} fill="currentColor" />
          </div>
        </div>
      )}

      {/* Custom Controls Bar */}
      <div className={`absolute bottom-0 left-0 w-full p-6 pt-24 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-4 transition-opacity duration-500 ${isPlaying && !isHovering ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Progress Bar */}
        <div className="w-full flex items-center group/progress cursor-pointer relative h-3">
           <input 
             type="range" 
             min="0" 
             max="100" 
             value={progress || 0} 
             onChange={handleSeek}
             className="absolute w-full h-full opacity-0 cursor-pointer z-20"
           />
           <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden z-10 pointer-events-none group-hover/progress:h-2.5 transition-all duration-300">
             <div 
               className="h-full bg-gradient-to-r from-[#6A4C93] to-[#D4AF37] relative"
               style={{ width: `${progress}%` }}
             />
           </div>
        </div>

        {/* Controls */}
        <div className="w-full flex items-center justify-between text-white">
          <div className="flex items-center gap-5">
            <button onClick={togglePlay} className="hover:text-[#D4AF37] transition-colors transform hover:scale-110 active:scale-95">
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
            </button>
            <div className="text-sm font-medium tabular-nums opacity-90 drop-shadow-md">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center group/volume">
              <button onClick={toggleMute} className="hover:text-[#D4AF37] transition-colors transform hover:scale-110 active:scale-95 z-10 mr-2">
                {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300 flex items-center opacity-0 group-hover/volume:opacity-100 h-6">
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={isMuted ? 0 : volume} 
                  onChange={handleVolumeChange}
                  className="w-16 h-1.5 accent-[#D4AF37] bg-white/20 rounded-full cursor-pointer"
                />
              </div>
            </div>
            <button onClick={toggleFullScreen} className="hover:text-[#D4AF37] transition-colors transform hover:scale-110 active:scale-95">
              <Maximize size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
