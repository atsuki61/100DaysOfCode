import Link from 'next/link';

interface BackToHomeButtonProps {
  className?: string;
}

export default function BackToHomeButton({ className = '' }: BackToHomeButtonProps) {
  // スタイルを「白背景、黒テキスト、黒枠線、ホバー時薄いグレー」に変更
  const baseStyle = "inline-flex items-center gap-2 px-4 py-2 bg-white text-black border border-black hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium";
  
  const combinedClassName = `${baseStyle} ${className}`.trim();// スタイルを結合して、余分なスペースを削除

  return (
    <Link 
      href="/" 
      className={combinedClassName}
    >
      {/* 戻るアイコン */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4" // 高さ4, 幅4
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" // text-black を継承してアイコンも黒になります
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Projectsへ
    </Link>
  );
}
