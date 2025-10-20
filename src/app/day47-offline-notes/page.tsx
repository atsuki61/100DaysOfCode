'use client';

import { useEffect, useMemo, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>; 
}

export default function Day47OfflineNotesPage() {
  const titleKey = 'day47-offline-notes-title';
  const contentKey = 'day47-offline-notes-content';

  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [isInstallAvailable, setIsInstallAvailable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedTitle = localStorage.getItem(titleKey);
      const savedContent = localStorage.getItem(contentKey);
      if (savedTitle) setNoteTitle(savedTitle);
      if (savedContent) setNoteContent(savedContent);
    } catch {}

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    const onBIP = (e: Event) => {
      e.preventDefault();
      const evt = e as BeforeInstallPromptEvent;
      setDeferredPrompt(evt);
      setIsInstallAvailable(true);
    };
    window.addEventListener('beforeinstallprompt', onBIP);

    const onInstalled = () => setIsInstallAvailable(false);
    window.addEventListener('appinstalled', onInstalled);

    const onlineHandler = () => setIsOnline(true);
    const offlineHandler = () => setIsOnline(false);
    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBIP);
      window.removeEventListener('appinstalled', onInstalled);
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    };
  }, []);

  const save = () => {
    try {
      localStorage.setItem(titleKey, noteTitle);
      localStorage.setItem(contentKey, noteContent);
      setSavedAt(Date.now());
    } catch {}
  };

  const clearAll = () => {
    setNoteTitle('');
    setNoteContent('');
    try {
      localStorage.removeItem(titleKey);
      localStorage.removeItem(contentKey);
      setSavedAt(Date.now());
    } catch {}
  };

  const lastSaved = useMemo(() => {
    if (!savedAt) return null;
    const d = new Date(savedAt);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }, [savedAt]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    try {
      await deferredPrompt.userChoice;
    } finally {
      setDeferredPrompt(null);
      setIsInstallAvailable(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs text-gray-600 dark:text-gray-300">
          {isOnline ? 'オンライン' : 'オフライン'}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 space-y-4">
        <div className="flex gap-2 flex-wrap">
          {isInstallAvailable && (
            <button onClick={handleInstall} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              アプリをインストール
            </button>
          )}
          <button onClick={save} className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            保存
          </button>
          <button onClick={clearAll} className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            全消去
          </button>
        </div>

        <input
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="タイトル"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        />

        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="ここにメモを書いてください（オフラインでもOK）"
          className="w-full min-h-[320px] px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        />

        <div className="text-right text-xs text-gray-500 dark:text-gray-400">
          {lastSaved ? `保存しました: ${lastSaved}` : '未保存'}
        </div>
      </div>
    </div>
  );
}




