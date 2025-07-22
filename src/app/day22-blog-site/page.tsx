import Link from 'next/link';
import { getAllPosts } from './lib/posts';

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8"> {/* 中央寄せコンテナ, 水平余白4, 垂直余白8 */}
      <div className="max-w-4xl mx-auto"> {/* 最大幅4xl, 中央寄せ */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8"> {/* 文字大3xl, 太字, 濃灰文字, 下余白8 */}
          ブログ記事一覧
        </h1>
        
        {posts.length === 0 ? (
          <p className="text-gray-600 text-center py-8"> {/* 灰文字, 中央寄せ, 垂直余白8 */}
            記事がありません
          </p>
        ) : (
          <div className="space-y-6"> {/* 垂直間隔6 */}
            {posts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden" /* 白背景, 角丸lg, 影付き, ホバーで影強化, トランジション, はみ出し隠し */
              >
                <div className="p-6"> {/* 内側余白6 */}
                  <div className="flex items-center justify-between mb-3"> {/* フレックス, アイテム中央, 左右端寄せ, 下余白3 */}
                    <time className="text-sm text-gray-500"> {/* 小文字, 薄灰文字 */}
                      {new Date(post.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors"> {/* 文字大xl, 中太字, 濃灰文字, 下余白3, ホバーで青文字, 色変化 */}
                    <Link href={`/day22-blog-site/${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed"> {/* 灰文字, 下余白4, 行間ゆったり */}
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    href={`/day22-blog-site/${post.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors" /* インラインフレックス, アイテム中央, 青文字, ホバーで濃青, 中太字, 色変化 */
                  >
                    続きを読む
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
              </article>
            ))}
          </div>
        )}
        
        {posts.length > 0 && (
          <div className="mt-12 text-center"> {/* 上余白12, 中央寄せ */}
            <p className="text-gray-500 text-sm"> {/* 薄灰文字, 小文字 */}
              全 {posts.length} 件の記事
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 