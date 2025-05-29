interface StatusIndicatorProps {
  isRunning: boolean;
  className?: string;
}

export default function StatusIndicator({ isRunning, className = '' }: StatusIndicatorProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        isRunning 
          ? 'bg-green-100 text-green-800' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        <div className={`w-2 h-2 rounded-full mr-2 ${
          isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
        }`}></div>
        {isRunning ? '動作中' : '停止中'}
      </div>
    </div>
  );
} 