import React from 'react';
import { Metadata } from 'next';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import { ConfirmProvider } from '@/context/ConfirmContext';

export const metadata: Metadata = {
  title: "Rosa Kadın Derneği",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfirmProvider>
      <div className="flex h-screen w-full bg-[#FAF8F5] dark:bg-[#0F0C12] overflow-hidden">
        {/* Özel Arka Plan Halesi (Aesthetic Glow) */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#6A4C93]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <AdminSidebar />
        
        <div className="flex flex-col flex-1 relative z-10 overflow-hidden">
          <AdminTopbar />
          
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </ConfirmProvider>
  );
}
