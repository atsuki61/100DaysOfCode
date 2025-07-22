import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostData, getAllPostIds } from '../lib/posts';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// 静的サイト生成用のパス一覧を生成
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getPostData(params.slug);

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
              className="prose prose-lg max-w-none 
                         prose-headings:text-gray-900 
                         prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6
                         prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-4 prose-h2:mt-8
                         prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-6
                         prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                         prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1 prose-code:rounded
                         prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:overflow-x-auto
                         prose-strong:text-gray-900 prose-strong:font-semibold
                         prose-ul:my-4 prose-ol:my-4 prose-li:my-1" /* プロース(記事)スタイル適用 */
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