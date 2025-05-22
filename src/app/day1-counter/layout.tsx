import { ReactNode } from 'react';

// RootLayout コンポーネントの props 型定義
type Day1LayoutProps = {
  children: ReactNode; // ReactNodeの型注釈ページの中身を受け取る
};

// コンポーネント本体を定義
export default function Day1Layout({ children }: Day1LayoutProps) {
  return (
    // Day1Layout全体をFlexboxコンテナ（縦並び）として機能させるためのdiv
    // flex: Flexboxコンテナを有効化
    // flex-col: 子要素を縦方向に配置
    // min-h-screen: このdivの最小の高さを画面全体の高さに設定します。
    //               これにより、コンテンツの量に関わらずフッターが画面下部に配置されます。
    <div className="flex flex-col min-h-screen">
      {/* ヘッダー */}
      {/* 背景プライマリ, 文字プライマリ前景, パディング4 */}
      <header className="bg-primary text-primary-foreground p-4">
        {/*文字サイズ特大(extra large)*/}
        <h1 className="text-xl">my counter app</h1>
      </header>

      {/* メイン領域（各ページの children がここに入る） */}
      {/* flex-1: 親のFlexboxコンテナ内で、利用可能な残りの垂直方向のスペースを全て埋める */}
      {/* flex: このmain要素自体もFlexboxコンテナとして機能させる */}
      {/* justify-center: Flexboxの子要素を水平方向の中央に配置 */}
      {/* items-center: Flexboxの子要素を垂直方向の中央に配置 */}
      {/* p-4 sm:p-6: 内側のパディング */}
      <main className="flex-1 flex justify-center items-center p-4 sm:p-6">
        {children}
      </main>

      {/* フッター */}
      {/* main要素がflex-1で伸びるため、フッターは自然とmainの下、つまりコンテナの一番下に配置される */}
      {/* 背景ミューテッド, テキストを中央揃え, パディング2, 文字小さく */}
      <footer className="bg-muted text-muted-foreground text-center p-2 text-sm">
        <p>© 2025 MyApp</p>
      </footer>
    </div>
  );
}
