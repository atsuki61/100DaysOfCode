import Link from 'next/link';
import Image from 'next/image'; // Next.jsのImageコンポーネントをインポート

export default function HomePage() {
  const apps = [
    {
      id: 'day1',
      name: 'Day 1: カウンターアプリ',
      path: '/day1-counter',
      imageUrl: '/images/day1-counter.png',
      description: 'シンプルなカウンターアプリです。ReactのuseStateフックの練習を目的として作成しました。',
      tags: ['React, Next.js, TypeScript, TailwindCSS'],
    },
    {
      id: 'day2',
      name: 'Day 2: アニメ視聴リスト',
      path: '/day2-anime-watchlist',
      imageUrl: '/images/day2-anime-watchlist.png',
      description: 'アニメのタイトル一覧と視聴済みチェック機能を持つアプリです。リストレンダリングとmap関数の練習として作成しました。',
      tags: ['React, Next.js, TypeScript, TailwindCSS'],
    },
    {
      id: 'day3',
      name: 'Day 3: BMI計算機',
      path: '/day3-bmi-calculator',
      imageUrl: '/images/day3-bmi-calculator.png',
      description: 'BMI計算機です。身長と体重を入力するとBMI値が計算されます。フォーム入力の状態管理、単純な計算ロジック、入力値の型制御を練習しました。',
      tags: ['React, Next.js, TypeScript, TailwindCSS'],
    },
    // ここに新しいアプリを追加していきます
  ];

  return (
    <div className="min-h-screen bg-background py-12 flex flex-col items-center text-foreground"> {/* 最小高さ画面, 背景色, 縦方向パディング, Flexコンテナ, アイテム中央寄せ(垂直), 文字色 */}
      <header className="mb-12"> {/* 下マージン */}
        <h1 className="text-5xl font-bold text-center text-primary"> {/* 文字サイズ5xl, 太字, 中央揃え, プライマリテキスト色 */}
        100 Days Of Code Projects
        </h1>
      </header>
      <main className="w-full max-w-7xl px-4"> {/* 横幅いっぱい, 最大横幅7xl, 横方向パディング */}
        {apps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5"> {/* グリッドレイアウト, 1列 (md以上で3列), ギャップ5 */}
            {apps.map((app) => (
              <div key={app.id} className="bg-card rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-primary/50"> {/* カード背景色, 角丸xl, 影2xl, はみ出し非表示, 全プロパティにトランジション, ホバー時プライマリ色の影 */}
                <Link href={app.path} className="block group"> {/* ブロック要素, グループ化 */}
                  <div className="w-full h-56 bg-muted flex items-center justify-center overflow-hidden"> {/* 横幅いっぱい, 高さ56, ミューテッド背景色, Flexコンテナ, アイテム中央寄せ(垂直・水平), はみ出し非表示 */}
                    {app.imageUrl ? (
                      <Image
                        src={app.imageUrl}
                        alt={`${app.name} のプレビュー画像`}
                        width={400}
                        height={224}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" // アスペクト比維持して全体表示, 横幅いっぱい, 高さいっぱい, グループホバー時拡大, transformにトランジション */}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted-foreground"> {/* Flexコンテナ(縦), アイテム中央寄せ(垂直・水平), ミューテッド前景色 */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"> {/* 高さ16, 横幅16, 下マージン2 */}
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-lg font-semibold">No Image</span> {/* 文字サイズlg, 太字 */}
                      </div>
                    )}
                  </div>
                  <div className="p-6"> {/* 全方向パディング6 */}
                    <h3 className="text-2xl font-semibold mb-2 text-primary group-hover:text-primary/80 transition-colors duration-200"> {/* 文字サイズ2xl, 太字, 下マージン2, プライマリテキスト色, グループホバー時プライマリ色(不透明度80%), 色にトランジション */}
                      {app.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed h-16 overflow-hidden"> {/* ミューテッド前景色, 下マージン4, 文字サイズsm, 行間ゆったり, 高さ16, はみ出し非表示 */}
                      {app.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4"> {/* Flexコンテナ, 折り返しあり, ギャップ2, 下マージン4 */}
                      {app.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full" // 横パディング3, 縦パディング1, セカンダリ背景色, セカンダリ前景色, 文字サイズxs, 太字, 角丸(円形) */}
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
          <p className="text-center text-muted-foreground text-lg"> {/* 中央揃え, ミューテッド前景色, 文字サイズlg */}
            まだアプリはありません。最初のアプリを作成しましょう！
          </p>
        )}
      </main>
      <footer className="mt-16 text-center text-muted-foreground"> {/* 上マージン16, 中央揃え, ミューテッド前景色 */}
        <p>&copy; 2025 100DaysOfCode</p>
      </footer>
    </div>
  );
}