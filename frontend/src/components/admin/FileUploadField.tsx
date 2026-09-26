"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Link as LinkIcon, FileText, Loader2, X, File as FileIcon, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface FileUploadFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  accept?: string;
}

export default function FileUploadField({ 
  value, 
  onChange, 
  label = "PDF Dosyası", 
  error,
  accept = "application/pdf"
}: FileUploadFieldProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    let file: File | undefined;
    
    if ('dataTransfer' in e) {
      file = e.dataTransfer.files?.[0];
    } else {
      file = e.target.files?.[0];
    }
    
    if (!file) return;

    if (accept === "application/pdf" && file.type !== "application/pdf") {
      toast.error("Lütfen sadece PDF dosyası yükleyin.");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("files", file);

      const res = await fetch("/api/strapi/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Yükleme başarısız oldu");
      }

      const data = await res.json();
      if (data && data.length > 0) {
        onChange(data[0].url);
        toast.success("Dosya başarıyla yüklendi!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Dosya yüklenirken bir hata oluştu.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    handleFileChange(e);
  };

  const getFileName = (url: string) => {
    try {
      return url.split('/').pop() || "Dosya";
    } catch {
      return "Dosya";
    }
  };

  return (
    <div className="w-full space-y-3">
      <label className="text-[15px] font-bold text-[#3D154B] dark:text-[#E0CFF2] flex items-center gap-2 mb-2">
        <FileText size={18} className="text-[#6A4C93] dark:text-[#D4AF37]" /> {label}
      </label>

      {/* Önizleme Alanı */}
      {value ? (
        <div className="relative w-full rounded-2xl overflow-hidden border border-[#6A4C93]/20 dark:border-white/10 shadow-md bg-white dark:bg-[#1A1622] p-6 flex flex-col sm:flex-row items-center gap-6 justify-between group transition-all hover:shadow-lg">
          
          <div className="flex items-center gap-4 flex-1 overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0 border border-red-100 dark:border-red-500/20 shadow-inner group-hover:scale-105 transition-transform duration-300">
               <FileIcon size={32} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
               <h4 className="font-bold text-[#3D154B] dark:text-white truncate">
                 {getFileName(value)}
               </h4>
               <p className="text-xs text-[#6A4C93] dark:text-gray-400 mt-1 truncate max-w-[200px] sm:max-w-full">
                 {value}
               </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
             <a 
               href={value} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-[#3D154B] dark:text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
             >
               Görüntüle
             </a>
             <button
                type="button"
                onClick={() => onChange("")}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <X size={16} /> Kaldır
             </button>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white dark:bg-[#1A1622] border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
          
          {/* Tabs */}
          <div className="flex items-center border-b border-gray-100 dark:border-white/5">
            <button
              type="button"
              onClick={() => setActiveTab("upload")}
              className={`flex-1 py-3.5 px-4 text-sm font-bold transition-colors flex items-center justify-center gap-2 relative ${activeTab === "upload" ? "text-[#3D154B] dark:text-[#D4AF37]" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}
            >
              <UploadCloud size={16} /> Cihazdan Yükle
              {activeTab === "upload" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3D154B] dark:bg-[#D4AF37]" />}
            </button>
            <div className="w-[1px] h-6 bg-gray-200 dark:bg-white/10" />
            <button
              type="button"
              onClick={() => setActiveTab("url")}
              className={`flex-1 py-3.5 px-4 text-sm font-bold transition-colors flex items-center justify-center gap-2 relative ${activeTab === "url" ? "text-[#3D154B] dark:text-[#D4AF37]" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}
            >
              <LinkIcon size={16} /> Link (URL) Gir
              {activeTab === "url" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3D154B] dark:bg-[#D4AF37]" />}
            </button>
          </div>

          <div className="p-6">
            {activeTab === "upload" ? (
              <div 
                className={`w-full min-h-[220px] flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden group
                  ${isDragActive ? "border-[#3D154B] bg-[#3D154B]/5 dark:border-[#D4AF37] dark:bg-[#D4AF37]/10" : "border-gray-300 dark:border-gray-700 bg-gray-50 hover:bg-gray-100 dark:bg-black/20 dark:hover:bg-black/40 hover:border-[#6A4C93] dark:hover:border-gray-500"}
                `}
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef} 
                  accept={accept}
                  onChange={handleFileChange}
                />
                
                {isUploading ? (
                  <div className="flex flex-col items-center gap-4 text-[#6A4C93] dark:text-[#D4AF37] z-10">
                    <Loader2 size={40} className="animate-spin" />
                    <span className="font-bold text-sm tracking-wide">YÜKLENİYOR...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center z-10 pointer-events-none">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${isDragActive ? "bg-[#3D154B] text-white scale-110 shadow-lg" : "bg-white dark:bg-black/50 text-[#6A4C93] dark:text-gray-400 shadow-sm group-hover:scale-110 group-hover:text-[#3D154B] dark:group-hover:text-[#D4AF37]"}`}>
                      <FileIcon size={32} strokeWidth={1.5} />
                    </div>
                    <p className="font-bold text-gray-800 dark:text-gray-200 text-base mb-1">
                      {isDragActive ? "PDF'i Buraya Bırakın" : "Tıklayın veya Sürükleyin"}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">Sadece PDF (Max 10MB)</p>
                  </div>
                )}
                
                {/* Subtle animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#6A4C93]/0 to-transparent group-hover:via-[#6A4C93]/5 dark:group-hover:via-[#D4AF37]/5 transition-all duration-700 pointer-events-none" />
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center min-h-[220px] rounded-xl px-6 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5">
                <div className="w-full max-w-md">
                  <div className="flex items-center gap-3 mb-3 text-[#3D154B] dark:text-[#E0CFF2]">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 shadow-sm flex items-center justify-center">
                      <LinkIcon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Doğrudan Link Ekle</h4>
                      <p className="text-xs text-gray-500">PDF dosyasının URL adresini yapıştırın</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input 
                      type="url" 
                      placeholder="https://ornek.com/dosya.pdf"
                      className="w-full bg-white dark:bg-[#1A1622] border border-gray-200 dark:border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#6A4C93] dark:focus:ring-[#D4AF37] dark:text-white shadow-sm transition-all"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const val = e.currentTarget.value;
                          if (val) onChange(val);
                        }
                      }}
                      onBlur={(e) => {
                        const val = e.target.value;
                        if (val) onChange(val);
                      }}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <CheckCircle2 size={18} />
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3 text-center">URL'yi yapıştırın ve klavyeden Enter'a basın</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
          <X size={14} strokeWidth={3} /> {error}
        </div>
      )}
    </div>
  );
}
