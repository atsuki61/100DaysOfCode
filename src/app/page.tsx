import Link from 'next/link';
import Image from 'next/image'; // Next.jsのImageコンポーネントをインポート
import Header from '../components/common/Header'; // 共通ヘッダーをインポート

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
    {
      id: 'day4',
      name: 'Day 4: ToDoリスト',
      path: '/day4-todo-list',
      imageUrl: '/images/day4-todo-list.png',
      description: 'タスクを追加・削除できるシンプルなToDoアプリです。配列状態の管理（追加、削除）、フォーム入力とイベント処理、コンポーネント分割の基礎を練習しました。',
      tags: ['React, Next.js, TypeScript, TailwindCSS'],
    },
     {
       id: 'day5',
       name: 'Day 5: じゃんけんゲーム',
       path: '/day5-janken',
       imageUrl: '/images/day5-janken-game.png',
       description: 'ユーザーとコンピュータが対戦するじゃんけんゲームです。乱数生成、条件分岐によるゲームロジック、簡単なUIのインタラクションを練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS'],
     },
     {
       id: 'day6',
       name: 'Day 6: ストップウォッチ',
       path: '/day6-stopwatch',
       imageUrl: '/images/day6-stopwatch.png',
       description: '開始・停止・リセットができるタイマーアプリです。useEffectを使ったタイマー処理（setInterval, clearInterval）、クリーンアップ関数、時間のフォーマットを練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS'],
     },
     {
       id: 'day7',
       name: 'Day 7: 単語フラッシュカード',
       path: '/day7-flashcard',
       imageUrl: '/images/day7-flashcard.png',
       description: 'TOEIC用英単語の暗記カードです。クリックで意味を表示します。配列データの扱い、状態による表示切替、イベント処理、シンプルなデータ構造を練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS'],
     },
     {
       id: 'day8',
       name: 'Day 8: アニメキャラ検索',
       path: '/day8-anime-character-search',
       imageUrl: '/images/day8-anime-character-search.png',
       description: 'アニメキャラクターのリストを名前でフィルタ検索できます。リストフィルタリング、制御された入力(検索フィールドの状態管理)、文字列操作を練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS'],
     },
    // {
    //   id: 'day9',
    //   name: 'Day 9: アニメ名言ジェネレーター',
    //   path: '/day9-anime-quote-generator',
    //   imageUrl: '/images/day9-anime-quote-generator.png',
    //   description: '毎回ランダムなアニメの名言を表示するアプリです（固定データまたは簡易APIモックから）。APIからのデータ取得(fetch/axiosの基本、非同期処理Promise/async/awaitの基礎）、JSONデータの扱い、エラーハンドリングの基本を練習しました。',
    //   tags: ['React, Next.js, TypeScript, TailwindCSS'],
    // },
    // {
    //   id: 'day10',
    //   name: 'Day 10: 支出管理アプリ',
    //   path: '/day10-expense-tracker',
    //   imageUrl: '/images/day10-expense-tracker.png',
    //   description: '簡易な家計簿として収支アイテムを追加・集計できます。複数状態の管理、配列操作(追加・削除・集計)、数値入力の扱いを練習しました。',
    //   tags: ['React, Next.js, TypeScript, TailwindCSS'],
    // },
    // ここに新しいアプリを追加していきます
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header追加 */}
      <Header title="100 Days Of Code Projects" showPortfolioLink={true} showHomeLink={false} />
      
      <div className="py-12 flex flex-col items-center"> {/* 縦方向パディング, Flexコンテナ, アイテム中央寄せ(垂直) */}
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
    </div>
  );
}