import Link from 'next/link';

interface BackToHomeButtonProps {
  className?: string;
}

export default function BackToHomeButton({ className = '' }: BackToHomeButtonProps) {
  // スタイルを「白背景、黒テキスト、黒枠線、ホバー時薄いグレー」に変更
  const baseStyle = "inline-flex items-center gap-2 px-2 sm:px-4 py-2 bg-white text-black border border-black hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium";
  
  const combinedClassName = `${baseStyle} ${className}`.trim();// スタイルを結合して、余分なスペースを削除

  return (
    <Link 
      href="/" 
      className={combinedClassName}
    >
      {/* 戻るアイコン */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" // アイコンサイズを少し大きく
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span className="hidden sm:inline">Projectsへ</span>
    </Link>
  );
}
