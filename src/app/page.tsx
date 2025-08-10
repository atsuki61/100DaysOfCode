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
    {
      id: 'day9',
      name: 'Day 9: アニメ名言ジェネレーター',
      path: '/day9-anime-quote-generator',
      imageUrl: '/images/day9-anime-quote-generator.png',
      description: '毎回ランダムなアニメの名言を表示するアプリです（固定データまたは簡易APIモックから）。APIからのデータ取得(fetch/axiosの基本、非同期処理Promise/async/awaitの基礎）、JSONデータの扱い、エラーハンドリングの基本を練習しました。',
      tags: ['React, Next.js, TypeScript, TailwindCSS'],
    },
     {
       id: 'day10',
       name: 'Day 10: 支出管理アプリ',
       path: '/day10-expense-tracker',
       imageUrl: '/images/day10-expense-tracker.png',
       description: '簡易な家計簿として収支アイテムを追加・集計できます。複数状態の管理、配列操作(追加・削除・集計)、数値入力の扱いを練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS'],
     },
     {
       id: 'day11',
       name: 'Day 11: 天気予報アプリ',
       path: '/day11-weather',
       imageUrl: '/images/day11-weather.png',
       description: '都市名から現在の天気を表示するシンプルなアプリです。外部APIの利用(fetch/axios)、非同期処理と状態更新、APIキーの扱い（環境変数基礎）、TypeScriptでのAPIレスポンスの型定義を練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS'],
     },
     {
       id: 'day12',
       name: 'Day 12: ダークモード切替アプリ',
       path: '/day12-darkmode',
       imageUrl: '/images/day12-darkmode.png',
       description: 'ボタンでサイトのライト/ダークテーマを切り替え可能です。Context APIによるグローバル状態管理、Tailwind CSSのダークモード機能の利用、localStorageによるテーマ永続化を練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS'],
     },
     {
       id: 'day13',
       name: 'Day 13: 電卓アプリ',
       path: '/day13-calculator',
       imageUrl: '/images/day13-calculator.png',
       description: '四則演算ができるシンプルな電卓です。複数状態の管理(useState複数利用)、ボタンクリックによる計算ロジック、UIイベントの詳細な制御を練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS'],
     },
     {
       id: 'day14',
       name: 'Day 14: 英単語辞書アプリ',
       path: '/day14-english-dictionary',
       imageUrl: '/images/day14-dictionary.png',
       description: '英単語を入力すると意味を表示する辞書アプリです（外部辞書API利用）。外部辞書APIの利用、非同期データ取得、より複雑なJSONデータの表示、ローディング状態の管理を練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS'],
     },
     {
       id: 'day15',
       name: 'Day 15: ワークアウトプランナー',
       path: '/day15-workout-planner',
       imageUrl: '/images/day15-workout-planner.png',
       description: 'トレーニング種目をリストに追加し管理するアプリです（簡易プラン作成）。複数フィールドのフォーム処理、localStorageを使ったデータ永続化（複数項目）、入力バリデーションの基礎を練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS'],
     },
     {
       id: 'day16',
       name: 'Day 16: 音楽検索アプリ',
       path: '/day16-music-search',
       imageUrl: '/images/day16-music-search.png',
       description: 'アーティスト名や曲名で音楽を検索し、結果一覧を表示するアプリです（iTunes APIなど利用）。動的クエリによるAPI取得、JSON結果のリスト表示、ページネーションの概念を練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS'],
     },
     {
       id: 'day17',
       name: 'Day 17: ○×ゲーム',
       path: '/day17-tic-tac-toe',
       imageUrl: '/images/day17-tic-tac-toe.png',
       description: '二人対戦の三目並べゲームです。勝敗判定付き。二次元配列の状態管理、勝利条件の判定ロジック、状態リフトアップ、コンポーネント間の連携を練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS'],
     },
     {
       id: 'day18',
       name: 'Day 18: 学習進捗チャート',
       path: '/day18-progress-chart',
       imageUrl: '/images/day18-progress-chart.png',
       description: '過去のTOEICスコア推移をグラフで表示するアプリです。グラフライブラリの導入（例: Chart.js, Recharts）、データ可視化、配列データ操作と整形を練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS, Recharts'],
     },
     {
       id: 'day19',
       name: 'Day 19: クイズアプリ',
       path: '/day19-quiz-app',
       imageUrl: '/images/day19-quiz.png',
       description: '選択式のクイズを出題し、回答後に得点を表示するアプリです（例:アニメクイズ）。useStateによる問題/スコア管理、配列からの選択肢表示、条件による結果表示、コンポーネントの再利用を練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS'],
     },
     {
       id: 'day20',
       name: 'Day 20: 神経衰弱ゲーム',
       path: '/day20-memory-game',
       imageUrl: '/images/day20-memory-game.png',
       description: 'カードをめくって同じ絵柄を当てる記憶ゲームです。配列のシャッフル、複数要素の状態管理(選択カード)、一定時間後の裏返し処理(useEffect, setTimeout)、CSSアニメーション/トランジションの基礎を練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS'],
     },
     {
       id: 'day21',
       name: 'Day 21: ショッピングカート',
       path: '/day21-shopping-cart',
       imageUrl: '/images/day21-shopping-cart.png',
       description: '商品一覧からカートに追加・削除し、合計金額を表示するアプリです。Context APIによるグローバル状態管理、複数コンポーネント間のデータ共有、合計計算、カート内商品の数量変更を練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS, Context API'],
     },
     {
       id: 'day22',
       name: 'Day 22: ブログサイト',
       path: '/day22-blog-site',
       imageUrl: '/images/day22-blog-site.png',
       description: 'Next.js App Routerを使用した静的ブログサイトです。Markdownファイルの読み込みとパース、動的ルーティング、静的サイト生成(SSG)を練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS, Markdown, SSG'],
     },
          {
       id: 'day23',
       name: 'Day 23: 暗号通貨価格表示',
       path: '/day23-crypto-prices',
       imageUrl: '/images/day23-crypto-prices.png',
       description: 'Next.js SSR (getServerSideProps)で暗号通貨の現在価格をリアルタイム表示するアプリです。CoinGecko API連携、環境変数管理、動的データフェッチ、エラーハンドリングを練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS, SSR, API'],
     },
     {
       id: 'day24',
       name: 'Day 24: ポケモン図鑑',
       path: '/day24-pokemon-pokedex',
       imageUrl: '/images/day24-pokemon-pokedex.png',
       description: 'Next.jsの動的ルーティングとPokéAPIを使用したポケモン図鑑アプリです。動的ルーティング、外部API連携、検索機能、レスポンシブデザイン、TypeScript型安全性を練習しました。',
       tags: ['React, Next.js, TypeScript, TailwindCSS, Dynamic Routing, API'],
     },
     {
       id: 'day25',
       name: 'Day 25: 現在地マップ',
       path: '/day25-current-location-map',
       imageUrl: '/images/day25-current-location-map.png',
       description: 'Geolocation APIと地図ライブラリを使って現在地を地図上に表示するアプリ',
       tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Leaflet'],
     },
     {
       id: 'day26',
       name: 'Day 26: パスワードジェネレーター',
       path: '/day26-password-generator',
       imageUrl: '/images/day26-password-generator.png',
       description: '指定した条件（長さ、文字種）でランダムなパスワードを生成し、クリップボードAPIによるコピー機能も含むアプリです。文字列操作と乱数、UIでのオプション選択を練習しました。',
       tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Clipboard API'],
     },
     {
       id: 'day27',
       name: 'Day 27: タイピング速度テスト',
       path: '/day27-typing-speed-test',
       imageUrl: '/images/day27-typing-speed-test.png',
       description: '出された文章を入力してWPM(打鍵数/分)を計測するタイピング速度テストアプリです。キー入力イベント処理、useEffectによるタイマー計測、速度と正確性の計算、入力テキストと課題テキストの比較を練習しました。',
       tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Real-time', 'Performance'],
     },
     {
       id: 'day28',
       name: 'Day 28: 画像ギャラリー',
       path: '/day28-image-gallery',
       imageUrl: '/images/day28-image-gallery.png',
       description: '複数画像を一覧表示し、クリックで拡大表示できるモーダル付きギャラリーアプリです。グリッドレイアウト(Tailwind CSS Grid/Flexbox)、モーダルウィンドウの実装と状態管理、Next.jsのnext/imageコンポーネントによる画像最適化を練習しました。',
       tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Image', 'Modal', 'Grid Layout'],
     },
     {
       id: 'day29',
       name: 'Day 29: カレンダーアプリ',
       path: '/day29-calendar',
       imageUrl: '/images/day29-calendar.png',
       description: '当月の日付をカレンダー形式で表示し、イベントの日を強調表示するカレンダーアプリです。Date APIの利用、二次元配列でのカレンダー生成、条件付きレンダリング、UIコンポーネントの設計を練習しました。',
       tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Date API', 'Calendar', 'Event Management'],
     },
     {
       id: 'day30',
       name: 'Day 30: 15パズルゲーム',
       path: '/day30-15-puzzle',
       imageUrl: '/images/day30-15-puzzle.png',
       description: '数字タイルをスライドして正しい順序に並べる15パズルゲームです。タイルの移動、盤面の状態管理、ゲームの進行と終了、統計情報の表示を練習しました。',
       tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Game Logic', 'State Management'],
     },
     {
       id: 'day31',
       name: 'Day 31: Redux Toolkit ToDoアプリ',
       path: '/day31-redux-todo',
       imageUrl: '/images/day31-redux-todo.png',
       description: 'Redux Toolkitを用いてグローバルに状態管理するToDoリストアプリです。createSlice、configureStore、useSelector、useDispatchを使用した状態管理を練習しました。',
       tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Redux Toolkit', 'State Management'],
     },
     {
       id: 'day32',
       name: 'Day 32: ユーザー登録フォーム',
       path: '/day32-user-registration-form',
       imageUrl: '/images/day32-user-registration-form.png',
       description: 'React Hook FormとYupを使用した高度なバリデーション機能付きのユーザー登録フォームです。リアルタイムで入力値の検証を行い、ユーザビリティを向上させています。',
       tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'React Hook Form', 'Yup'],
     },
     {
       id: 'day33',
       name: 'Day 33: 画像検索アプリ（無限スクロール）',
       path: '/day33-image-search',
       imageUrl: '/images/day33-image-search.png',
       description: 'キーワードで画像を検索し、スクロールで結果を追加読み込みできるアプリです。IntersectionObserver APIによる無限スクロール実装、APIクエリ処理、非同期処理の制御を練習しました。',
       tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'IntersectionObserver', 'API'],
     },
      {
        id: 'day34',
        name: 'Day 34: 英単語当てゲーム (ハングマン)',
        path: '/day34-hangman',
        imageUrl: '/images/day34-hangman.png',
        description: '英単語を一文字ずつ推測するハングマンゲーム。文字列・配列操作、状態管理、条件付きレンダリング、SVG描画を練習しました。',
        tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Game Logic'],
      },
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