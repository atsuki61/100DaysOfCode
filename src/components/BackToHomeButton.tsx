import Link from 'next/link';

interface BackToHomeButtonProps {
  className?: string;
}

export default function BackToHomeButton({ className = '' }: BackToHomeButtonProps) {
  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors duration-200 font-medium ${className}`} // インライン要素, アイテム中央, ギャップ2, 横パディング4, 縦パディング2, プライマリ背景, プライマリ前景色, ホバー時薄く, 角丸, トランジション, フォント中太
    >
      {/* 戻るアイコン */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4" // 高さ4, 幅4
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Projectsへ
    </Link>
  );
} 