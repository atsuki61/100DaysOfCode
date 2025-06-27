export default function Day12Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark:bg-gray-900 min-h-screen">
      {children}
    </div>
  );
} 