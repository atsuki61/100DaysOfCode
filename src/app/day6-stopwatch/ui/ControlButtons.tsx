interface ControlButtonsProps {
  isRunning: boolean;
  onStartStop: () => void;
  onReset: () => void;
  className?: string;
}

export default function ControlButtons({ 
  isRunning, 
  onStartStop, 
  onReset, 
  className = '' 
}: ControlButtonsProps) {
  return (
    <div className={`flex gap-4 justify-center ${className}`}>
      <button
        onClick={onStartStop}
        className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
          isRunning
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isRunning ? '⏸️ 停止' : '▶️ 開始'}
      </button>
      
      <button
        onClick={onReset}
        className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors duration-200"
      >
        🔄 リセット
      </button>
    </div>
  );
} 