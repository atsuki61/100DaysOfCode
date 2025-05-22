import { ReactNode } from 'react'; 

//RootLayout コンポーネントの props　型定義
type Day1LayoutProps = {
  children: ReactNode; //ReactNodeの型注釈ページの中身を受け取る
};

//コンポーネント本体を定義
export default function Day1Layout({ children }: Day1LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 背景青色(600の濃さ)　文字色を白色　p4=16px*/}
      <header className="bg-blue-600 text-white p-4">
        {/*文字サイズ特大(extra large)*/}
        <h1 className="text-xl">my counter app</h1>
      </header>
      {/* 余ったスペースを埋める 24pxのパディング 背景薄灰色*/}
      {/* メイン領域（各ページの children がここに入る） */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
      {/*  背景薄灰色 　テキストを中央揃え　余白8px 文字小さく */}
      <footer className="bg-gray-200 text-center p-2 text-sm">
        <p>© 2025 MyApp</p>
      </footer>
    </div>
  );
}
