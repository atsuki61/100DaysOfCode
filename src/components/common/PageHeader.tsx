type PageHeaderProps = {
  icon?: string;
  title: string;
  description: string;
  className?: string;
};

export default function PageHeader({ 
  icon, 
  title, 
  description, 
  className = "" 
}: PageHeaderProps) {
  return (
    <header className={`text-center pb-8 pt-24 ${className}`}> {/* Headerの高さ分を考慮したトップパディング */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </header>
  );
} 