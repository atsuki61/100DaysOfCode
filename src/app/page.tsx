import Link from 'next/link';
import Image from 'next/image'; // Next.jsのImageコンポーネントをインポート

export default function HomePage() {
  const apps = [
    {
      id: 'day1',
      name: 'Day 1: カウンターアプリ',
      path: '/day1-counter',
      imageUrl: '/images/day1-counter-app.png',
      description: 'シンプルなカウンターアプリです。ReactのuseStateフックの練習を目的として作成しました。',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Hooks'],
    },
    {
      id: 'day2',
      name: 'Day 2: (新しいアプリ名)',
      path: '/day2-new-app',
      imageUrl: null,
      description: 'これは新しいアプリの説明です。機能Xと機能Yを実装しました。',
      tags: ['React', 'Vite', 'JavaScript'],
    },
    // ここに新しいアプリを追加していきます
  ];

  return (
    <div className="min-h-screen bg-background py-12 flex flex-col items-center text-foreground">
      <header className="mb-12">
        <h1 className="text-5xl font-bold text-center text-primary">
          Projects
        </h1>
      </header>
      <main className="w-full max-w-5xl px-4">
        {apps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {apps.map((app) => (
              <div key={app.id} className="bg-card rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-primary/50">
                <Link href={app.path} className="block group">
                  <div className="w-full h-56 bg-muted flex items-center justify-center overflow-hidden">
                    {app.imageUrl ? (
                      <Image
                        src={app.imageUrl}
                        alt={`${app.name} のプレビュー画像`}
                        width={400}
                        height={224}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-lg font-semibold">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2 text-primary group-hover:text-primary/80 transition-colors duration-200">
                      {app.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed h-16 overflow-hidden">
                      {app.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {app.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">
            まだアプリはありません。最初のアプリを作成しましょう！
          </p>
        )}
      </main>
      <footer className="mt-16 text-center text-muted-foreground">
        <p>&copy; 2025 100DaysOfCode</p>
      </footer>
    </div>
  );
}