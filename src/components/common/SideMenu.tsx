"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { getDayPath } from "./dayRoutes";

type SideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[60] ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`absolute top-0 left-0 h-screen w-[18rem] sm:w-72 max-w-[90vw] bg-white dark:bg-gray-900 shadow-2xl border-r border-slate-200/60 dark:border-gray-700/60 transform transition-transform duration-300 will-change-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200/60 dark:border-gray-700/60">
          <span className="font-semibold text-gray-800 dark:text-gray-100">プロジェクトメニュー</span>
          <button
            type="button"
            aria-label="Close menu"
            className="p-2 rounded hover:bg-slate-100 dark:hover:bg-gray-800"
            onClick={onClose}
          >
            {/* X icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-4rem)] overscroll-none touch-pan-y">
          {/* Quick Links */}
          <div className="space-y-2 text-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Quick Links</div>
            <nav className="grid gap-1">
              <Link href="/" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-gray-800">ホーム</Link>
              <Link href="/100DaysOfCode.html" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-gray-800">計画表を見る</Link>
            </nav>
          </div>

          {/* Filter by Tech (クエリパラメータ) */}
          <div className="space-y-2 text-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Filter by Tech</div>
            <div className="flex flex-wrap gap-2">
              {['React','Next.js','TypeScript','TailwindCSS','Go','Redux Toolkit','Context API','Canvas','Audio','Image','API','SSR','SSG'].map((t) => (
                <Link
                  key={t}
                  href={`/?tag=${encodeURIComponent(t)}`}
                  className="px-3 py-1.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 dark:bg-gray-900 dark:hover:bg-gray-800"
                  onClick={onClose}
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>

          {/* Jump to Day */}
          <div className="space-y-2 text-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Jump to Day</div>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 49 }, (_, i) => i + 1).map((d) => (
                <Link
                  key={d}
                  href={getDayPath(d)}
                  className="px-2 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-center"
                  onClick={onClose}
                  aria-label={`Open Day ${d}`}
                >
                  {d}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


