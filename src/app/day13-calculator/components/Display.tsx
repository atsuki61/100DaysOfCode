interface DisplayProps {
  value: string;
  formula: string;
}

export default function Display({ value, formula }: DisplayProps) {
  const displayValue = value || '0';
  
  // 文字数に応じてフォントサイズを調整（スマホとデスクトップで分ける）
  const getFontSize = () => {
    if (displayValue.length > 12) return 'text-xl sm:text-2xl';
    if (displayValue.length > 10) return 'text-2xl sm:text-3xl';
    if (displayValue.length > 8) return 'text-3xl sm:text-4xl';
    return 'text-4xl sm:text-5xl';
  };

  return (
    <div className="bg-gray-900 text-white p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 border-2 border-gray-700">
      <div className="text-right">
        <div className="text-xs sm:text-sm text-gray-400 font-mono mb-2 min-h-4 sm:min-h-5 flex items-center justify-end overflow-hidden">
          {formula || ' '}
        </div>
        <div className={`${getFontSize()} font-mono font-bold leading-tight min-h-12 sm:min-h-14 flex items-center justify-end break-all`}>
          {displayValue}
        </div>
      </div>
    </div>
  );
} 