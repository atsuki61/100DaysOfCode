"use client";

import Link from 'next/link';
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
    <nav className="bg-white shadow-sm border-b border-gray-200">
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
            <h1 className="text-xl font-semibold text-gray-800">
              {title}
            </h1>
          </div>
          <div className="flex items-center">
            {/* 右側のスペース */}
          </div>
        </div>
      </div>
    </nav>
  );
} 