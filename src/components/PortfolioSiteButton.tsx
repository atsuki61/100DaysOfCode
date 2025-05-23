interface PortfolioSiteButtonProps {
  className?: string;
}

export default function PortfolioSiteButton({ className = '' }: PortfolioSiteButtonProps) {
  // BackToHomeButtonと同じスタイルを使用
  const baseStyle = "inline-flex items-center gap-2 px-4 py-2 bg-white text-black border border-black hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium";
  
  const combinedClassName = `${baseStyle} ${className}`.trim();

  return (
    <a 
      href="https://my-portfolio-drab-zeta-67.vercel.app/" 
      target="_blank"
      rel="noopener noreferrer"
      className={combinedClassName}
    >
      {/* 外部リンクアイコン */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4" // 高さ4, 幅4
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" // text-black を継承してアイコンも黒になります
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      ポートフォリオサイトへ
    </a>
  );
} 