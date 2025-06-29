import { ButtonType } from '../types';

interface ButtonProps {
  value: string;
  type: ButtonType;
  onClick: (value: string) => void;
  className?: string;
}

export default function Button({ value, type, onClick, className = '' }: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = 'h-20 min-h-[60px] text-2xl font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md touch-manipulation';
    
    switch (type) {
      case 'number':
      case 'decimal':
        return `${baseStyle} bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300`;
      case 'operator':
        return `${baseStyle} bg-blue-500 hover:bg-blue-600 text-white`;
      case 'equals':
        return `${baseStyle} bg-green-500 hover:bg-green-600 text-white`;
      case 'clear':
        return `${baseStyle} bg-red-500 hover:bg-red-600 text-white`;
      default:
        return baseStyle;
    }
  };

  return (
    <button
      onClick={() => onClick(value)}
      className={`${getButtonStyle()} ${className}`}
    >
      {value}
    </button>
  );
} 