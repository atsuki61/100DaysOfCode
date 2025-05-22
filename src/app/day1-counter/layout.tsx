import { ReactNode } from 'react'; 

//RootLayout コンポーネントの props　型定義
type Day1LayoutProps = {
  children: ReactNode; //ReactNodeの型注釈ページの中身を受け取る
};

//コンポーネント本体を定義
export default function Day1Layout({ children }: Day1LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col"> {/* 最小画面高, フレックスコンテナ(縦並び) */}
      {/* 背景プライマリ, 文字プライマリ前景, パディング4 */}
      <header className="bg-primary text-primary-foreground p-4">
        {/*文字サイズ特大(extra large)*/}
        <h1 className="text-xl">my counter app</h1>
      </header>
      {/* 余ったスペースを埋める, パディング6, 背景色 */}
      {/* メイン領域（各ページの children がここに入る） */}
      <main className="flex-1 p-6 bg-background">{children}</main>
      {/* 背景ミューテッド, テキストを中央揃え, パディング2, 文字小さく */}
      <footer className="bg-muted text-center p-2 text-sm text-muted-foreground">
        <p>© 2025 MyApp</p>
      </footer>
    </div>
  );
}
