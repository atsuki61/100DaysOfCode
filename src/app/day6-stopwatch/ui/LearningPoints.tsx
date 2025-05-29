interface LearningPointsProps {
  dayNumber: number;
  points: string[];
  className?: string;
}

export default function LearningPoints({ 
  dayNumber, 
  points, 
  className = '' 
}: LearningPointsProps) {
  return (
    <div className={`p-4 bg-gray-50 rounded-lg ${className}`}>
      <h3 className="text-sm font-semibold text-gray-600 mb-2">
        📚 Day {dayNumber} 学習ポイント
      </h3>
      <ul className="text-xs text-gray-500 text-left space-y-1">
        {points.map((point, index) => (
          <li key={index}>• {point}</li>
        ))}
      </ul>
    </div>
  );
} 