import React, { useEffect, useState } from 'react';
import { Download, WifiOff } from 'lucide-react';

export const PWAInstall: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const standalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    if (standalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      {/* PWA Install Button floating on bottom right if installable */}
      {deferredPrompt && !isInstalled && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-white px-4 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 text-xs font-bold"
          >
            <Download className="w-4 h-4" />
            <span>تثبيت تطبيق مختبر الطاقة</span>
          </button>
        </div>
      )}

      {/* Offline Indicator banner if offline */}
      {!isOnline && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-500 text-white px-4 py-2 text-xs font-bold shadow-lg animate-bounce">
          <WifiOff className="w-4 h-4" />
          <span>أنت تعمل حالياً بدون اتصال (البيانات محفوظة محلياً).</span>
        </div>
      )}
    </>
  );
};
