'use client';
import { Toaster } from 'react-hot-toast';
import { useTheme } from '@/context/ThemeContext';

export default function ToastProvider() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: 'font-sans font-medium shadow-xl border backdrop-blur-xl',
        style: {
          background: theme === 'dark' ? 'rgba(42, 36, 54, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          color: theme === 'dark' ? '#fff' : '#3D154B',
          borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(106, 76, 147, 0.15)',
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#FF6B5B',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}
