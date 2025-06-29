interface DisplayProps {
  value: string;
}

export default function Display({ value }: DisplayProps) {
  const displayValue = value || '0';
  
  // 文字数に応じてフォントサイズを調整
  const getFontSize = () => {
    if (displayValue.length > 10) return 'text-3xl';
    if (displayValue.length > 8) return 'text-4xl';
    return 'text-5xl';
  };

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg mb-6 border-2 border-gray-700">
      <div className="text-right">
        <div className={`${getFontSize()} font-mono font-bold leading-tight min-h-16 flex items-center justify-end break-all`}>
          {displayValue}
        </div>
      </div>
    </div>
  );
} 