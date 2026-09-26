"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { AlertTriangle, X } from "lucide-react";

type ConfirmOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
};

type ConfirmContextType = {
  confirm: (options?: ConfirmOptions | string) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});
  const [resolver, setResolver] = useState<(value: boolean) => void>();

  const confirm = useCallback((opts?: ConfirmOptions | string) => {
    return new Promise<boolean>((resolve) => {
      if (typeof opts === "string") {
        setOptions({ message: opts });
      } else {
        setOptions(opts || {});
      }
      setResolver(() => resolve);
      setIsOpen(true);
    });
  }, []);

  const handleConfirm = () => {
    if (resolver) resolver(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (resolver) resolver(false);
    setIsOpen(false);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-[#3D154B]/40 dark:bg-black/60 backdrop-blur-md"
            onClick={handleCancel}
          />
          
          {/* Modal Container */}
          <div className="relative w-full max-w-md bg-white dark:bg-[#1A1622] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-[#6A4C93]/20 dark:border-white/10">
            {/* Header */}
            <div className="bg-red-50 dark:bg-red-900/20 p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-900 dark:text-red-200">
                  {options.title || "Emin misiniz?"}
                </h3>
                <p className="text-red-700/80 dark:text-red-300/80 mt-1 font-medium">
                  {options.message || "Bu işlemi geri alamazsınız!"}
                </p>
              </div>
              <button onClick={handleCancel} className="text-red-400 hover:text-red-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Footer / Actions */}
            <div className="p-6 bg-white dark:bg-[#1A1622] flex gap-3 justify-end">
              <button 
                onClick={handleCancel}
                className="px-6 py-2.5 rounded-xl font-semibold text-[#3D154B] dark:text-white bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                {options.cancelText || "İptal"}
              </button>
              <button 
                onClick={handleConfirm}
                className="px-6 py-2.5 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all"
              >
                {options.confirmText || "Evet, Sil!"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (context === undefined) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
}
