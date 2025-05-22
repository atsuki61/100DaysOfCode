import Link from 'next/link';

export default function HomePage() {
  const apps = [
    { id: 'day1', name: 'Day 1: カウンターアプリ', path: '/day1-counter' },
    // ここに新しいアプリを追加していきます
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
      <header className="mb-10">
        <h1 className="text-5xl font-bold text-center text-indigo-700">
          100日コーディングチャレンジ！
        </h1>
      </header>
      <main className="w-full max-w-2xl px-4">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          作成したアプリ一覧
        </h2>
        {apps.length > 0 ? (
          <ul className="space-y-4">
            {apps.map((app) => (
              <li key={app.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                <Link href={app.path} legacyBehavior>
                  <a className="text-2xl font-medium text-blue-600 hover:text-blue-800 hover:underline">
                    {app.id}: {app.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            まだアプリはありません。最初のアプリを作成しましょう！
          </p>
        )}
      </main>
      <footer className="mt-12 text-center text-gray-500">
        <p>&copy; 2024 100DaysOfCode</p>
      </footer>
    </div>
  );
}
