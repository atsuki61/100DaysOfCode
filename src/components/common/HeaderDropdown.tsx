"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type QuickJumpItem = { label: string; href: string };

type HeaderDropdownProps = {
  items?: QuickJumpItem[];
};

export default function HeaderDropdown({ items }: HeaderDropdownProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!items || items.length === 0) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-800 border border-slate-200/60 dark:border-gray-700/60 shadow-sm text-sm"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Quick Jump
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>

      <div
        className={`absolute right-0 mt-2 w-72 rounded-md bg-white dark:bg-gray-900 border border-slate-200/60 dark:border-gray-700/60 shadow-xl overflow-hidden transition-all ${
          open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"
        }`}
        role="menu"
      >
        <ul className="max-h-96 overflow-auto py-1">
          {items.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-2 hover:bg-slate-100 dark:hover:bg-gray-800 text-sm"
              >
                <span className="truncate pr-3">{item.label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


