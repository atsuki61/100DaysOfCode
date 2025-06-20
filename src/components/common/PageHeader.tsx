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
    <header className={`text-center pb-8 ${className}`}>
      <h1 className="text-4xl font-bold text-gray-800 mb-2 pt-8">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h1>
      <p className="text-gray-600">
        {description}
      </p>
    </header>
  );
} 