interface DisplayProps {
  value: string;
}

export default function Display({ value }: DisplayProps) {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg mb-4 border-2 border-gray-700">
      <div className="text-right">
        <div className="text-4xl font-mono font-bold leading-tight min-h-12 flex items-center justify-end">
          {value || '0'}
        </div>
      </div>
    </div>
  );
} 