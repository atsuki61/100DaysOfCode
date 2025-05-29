interface TimeDisplayProps {
  time: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function TimeDisplay({ 
  time, 
  label = '分:秒.センチ秒',
  size = 'xl',
  className = '' 
}: TimeDisplayProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
    xl: 'text-6xl'
  };

  return (
    <div className={`text-center ${className}`}>
      <div className={`font-mono font-bold text-gray-800 mb-2 ${sizeClasses[size]}`}>
        {time}
      </div>
      {label && (
        <div className="text-sm text-gray-500">
          {label}
        </div>
      )}
    </div>
  );
} 