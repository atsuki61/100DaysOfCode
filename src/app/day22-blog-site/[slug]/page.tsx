import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostData, getAllPostIds } from '../lib/posts';

interface BlogPostPageProps {//BlogPostPageProps型を定義
  params: Promise<{//paramsはPromise型のオブジェクト
    slug: string;//slugはstring型
  }>;
}

// 静的サイト生成用のパス一覧を生成
export async function generateStaticParams() {
  const paths = getAllPostIds();//投稿IDの一覧を取得
  return paths.map((path) => ({//pathsをmapで処理
    slug: path.params.slug,//path.params.slugを返す
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {//BlogPostPageProps型のオブジェクトを受け取る
  try {
    const resolvedParams = await params;//paramsを解決
    const post = await getPostData(resolvedParams.slug);//resolvedParams.slugをgetPostDataで取得

    return (
      <div className="container mx-auto px-4 py-8"> {/* 中央寄せコンテナ, 水平余白4, 垂直余白8 */}
        <div className="max-w-4xl mx-auto"> {/* 最大幅4xl, 中央寄せ */}
          {/* ナビゲーション */}
          <nav className="mb-8"> {/* 下余白8 */}
            <Link 
              href="/day22-blog-site"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors" /* インラインフレックス, アイテム中央, 青文字, ホバーで濃青, 色変化 */
            >
              <svg 
                className="mr-2 w-4 h-4" /* 右余白2, 幅4, 高さ4 */
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
              記事一覧に戻る
            </Link>
          </nav>

          {/* 記事ヘッダー */}
          <header className="mb-8"> {/* 下余白8 */}
            <time className="text-sm text-gray-500 mb-2 block"> {/* 小文字, 薄灰文字, 下余白2, ブロック表示 */}
              {new Date(post.date).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight"> {/* 文字大4xl, 太字, 濃灰文字, 行間タイト */}
              {post.title}
            </h1>
          </header>

          {/* 記事コンテンツ */}
          <article className="bg-white rounded-lg shadow-sm p-8"> {/* 白背景, 角丸lg, 薄影, 内側余白8 */}
            <div 
              className="markdown-content max-w-none
                         [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-6 [&>h1]:mt-8 [&>h1]:first:mt-0
                         [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h2]:mb-4 [&>h2]:mt-8 [&>h2]:border-b [&>h2]:border-gray-200 [&>h2]:pb-2
                         [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mb-3 [&>h3]:mt-6
                         [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-gray-900 [&>h4]:mb-2 [&>h4]:mt-4
                         [&>p]:text-gray-700 [&>p]:leading-relaxed [&>p]:mb-4 [&>p]:text-base
                         [&>ul]:my-4 [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:list-disc
                         [&>ol]:my-4 [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:list-decimal
                         [&>li]:text-gray-700 [&>li]:leading-relaxed
                         [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:bg-blue-50 [&>blockquote]:p-4 [&>blockquote]:my-4 [&>blockquote]:italic [&>blockquote]:text-gray-700
                         [&>code]:bg-gray-100 [&>code]:text-gray-800 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono
                         [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:rounded-lg [&>pre]:p-4 [&>pre]:my-4 [&>pre]:overflow-x-auto [&>pre]:text-sm
                         [&>pre>code]:bg-transparent [&>pre>code]:text-gray-100 [&>pre>code]:p-0
                         [&>a]:text-blue-600 [&>a]:hover:text-blue-800 [&>a]:underline [&>a]:transition-colors
                         [&>strong]:font-semibold [&>strong]:text-gray-900
                         [&>em]:italic [&>em]:text-gray-700
                         [&>hr]:border-gray-300 [&>hr]:my-8
                         [&>table]:w-full [&>table]:border-collapse [&>table]:my-4
                         [&>table_th]:border [&>table_th]:border-gray-300 [&>table_th]:bg-gray-50 [&>table_th]:p-2 [&>table_th]:text-left [&>table_th]:font-semibold
                         [&>table_td]:border [&>table_td]:border-gray-300 [&>table_td]:p-2" /* マークダウンコンテンツのカスタムスタイリング */
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* フッターナビゲーション */}
          <footer className="mt-12 pt-8 border-t border-gray-200"> {/* 上余白12, 上パディング8, 上境界線 */}
            <div className="flex justify-center"> {/* フレックス, 中央寄せ */}
              <Link 
                href="/day22-blog-site"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium" /* インラインフレックス, アイテム中央, 水平余白6, 垂直余白3, 青背景, 白文字, 角丸lg, ホバーで濃青, 色変化, 中太字 */
              >
                他の記事を読む
                <svg 
                  className="ml-2 w-4 h-4" /* 左余白2, 幅4, 高さ4 */
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </Link>
            </div>
          </footer>
        </div>
      </div>
    );
  } catch {
    // 記事が見つからない場合は404ページを表示
    notFound();
  }
} 