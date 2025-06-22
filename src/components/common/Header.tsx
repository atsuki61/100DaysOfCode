"use client";


import BackToHomeButton from '../BackToHomeButton';
import PortfolioSiteButton from '../PortfolioSiteButton';

type HeaderProps = {
  title: string;
  showHomeLink?: boolean;
  showPortfolioLink?: boolean;
  className?: string;
};

export default function Header({ title, showHomeLink = true, showPortfolioLink = false }: HeaderProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-slate-50 to-white backdrop-blur-xl border-b border-slate-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
      {/* Gradient shimmer line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 via-purple-500/60 via-pink-500/60 to-transparent animate-pulse opacity-80"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {showPortfolioLink ? (
              <PortfolioSiteButton />
            ) : showHomeLink ? (
              <BackToHomeButton />
            ) : null}
          </div>
          
          <div className="flex items-center">
            <div className="relative group cursor-default">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight transition-all duration-300 group-hover:scale-105">
                {title}
              </h1>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 text-xl sm:text-2xl font-bold text-blue-600/20 blur-sm -z-10 transition-opacity duration-300 group-hover:opacity-40">
                {title}
              </div>
              {/* Animated underline */}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></div>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Decorative element */}
            <div className="hidden sm:flex items-center space-x-1">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse animate-float shadow-lg shadow-blue-500/50 hover:animate-ping"></div>
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse animate-float-delay-1 shadow-lg shadow-purple-500/50 hover:animate-ping"></div>
              <div className="w-1 h-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full animate-pulse animate-float-delay-2 shadow-lg shadow-pink-500/50 hover:animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 