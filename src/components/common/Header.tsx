"use client";

import { useState, useCallback } from 'react';
import BackToHomeButton from '../BackToHomeButton';
import PortfolioSiteButton from '../PortfolioSiteButton';
import SideMenu from './SideMenu';
import HeaderDropdown from './HeaderDropdown';
import { dayRoutes } from './dayRoutes';
import { dayLabels } from './dayLabels';

type QuickJumpItem = { label: string; href: string };

type HeaderProps = {
  title: string;
  showHomeLink?: boolean;
  showPortfolioLink?: boolean;
  className?: string;
  quickJumpItems?: QuickJumpItem[];
};

export default function Header({ title, showHomeLink = true, showPortfolioLink = false, quickJumpItems }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const items = quickJumpItems && quickJumpItems.length > 0
    ? quickJumpItems
    : Object.keys(dayRoutes)
        .map((k) => Number(k))
        .sort((a, b) => a - b)
        .map((day) => ({ label: dayLabels[day] ?? `Day ${day}`, href: dayRoutes[day] }));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-slate-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-xl border-b border-slate-200/50 dark:border-gray-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
      {/* Gradient shimmer line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent animate-pulse opacity-80"></div>
      
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Open menu"
              onClick={openMenu}
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {showPortfolioLink ? (
              <PortfolioSiteButton />
            ) : showHomeLink ? (
              <BackToHomeButton />
            ) : null}
          </div>
          
          <div className="flex items-center">
            <div className="relative group cursor-default">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 dark:from-gray-200 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight transition-all duration-300 group-hover:scale-105">
                {title}
              </h1>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 text-lg sm:text-xl font-bold text-blue-600/20 dark:text-blue-400/20 blur-sm -z-10 transition-opacity duration-300 group-hover:opacity-40">
                {title}
              </div>
              {/* Animated underline */}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <HeaderDropdown items={items} />
          </div>
        </div>
      </div>
      <SideMenu isOpen={menuOpen} onClose={closeMenu} />
    </nav>
  );
} 