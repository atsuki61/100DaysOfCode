interface PortfolioSiteButtonProps {
  className?: string;
}

export default function PortfolioSiteButton({ className = '' }: PortfolioSiteButtonProps) {
  // ダークモード対応のスタイル
  const baseStyle = "inline-flex items-center gap-1 px-2 py-1 text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white border border-black dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 font-medium";
  
  const combinedClassName = `${baseStyle} ${className}`.trim();

  return (
    <a 
      href="https://my-portfolio-drab-zeta-67.vercel.app/" 
      target="_blank"
      rel="noopener noreferrer"
      className={combinedClassName}
      aria-label="ポートフォリオサイトへ"
      title="ポートフォリオサイトへ"
    >
      {/* 外部リンクアイコン */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-3 w-3" // 高さ3, 幅3
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" // text-black を継承してアイコンも黒になります
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      <span className="hidden sm:inline">ポートフォリオサイトへ</span>
    </a>
  );
} 