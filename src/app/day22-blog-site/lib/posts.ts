import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/app/day22-blog-site/data');

export interface PostData {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export interface PostMeta {
  id: string;
  title: string;
  date: string;
  excerpt: string;
}

// すべての投稿のメタデータを取得
export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        title: matterResult.data.title || '',
        date: matterResult.data.date || '',
        excerpt: matterResult.data.excerpt || '',
      };
    });

  // 日付順にソート（新しい順）
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {/* 日付aがbより古い場合 */
      return 1;// 1を返すとbがaより前に来る
    } else {
      return -1;// -1を返すとaがbより前に来る
    }
  });
}

// 特定の投稿の詳細データを取得
export async function getPostData(id: string): Promise<PostData> {//idは投稿のファイル名（ファイル名は投稿のidと同じ）
  const fullPath = path.join(postsDirectory, `${id}.md`);//ファイルのパスを取得
  const fileContents = fs.readFileSync(fullPath, 'utf8');//ファイルの内容を取得
  const matterResult = matter(fileContents);//ファイルの内容をパース

  // MarkdownをHTMLに変換
  const processedContent = await remark()//remarkを使ってMarkdownをパース
    .use(html)//htmlを使ってHTMLに変換
    .process(matterResult.content);//matterResult.contentをパース
  const contentHtml = processedContent.toString();//processedContentを文字列に変換

  return {//PostData型のオブジェクトを返す
    id,//idを返す
    title: matterResult.data.title || '',//titleを返す
    date: matterResult.data.date || '',//dateを返す
    excerpt: matterResult.data.excerpt || '',//excerptを返す
    content: contentHtml,//contentを返す
  };
}

// 投稿IDの一覧を取得（動的ルーティング用）
export function getAllPostIds() {//投稿IDの一覧を取得
  const fileNames = fs.readdirSync(postsDirectory);//ファイルの名前を取得
  return fileNames
    .filter((name) => name.endsWith('.md'))//ファイルの名前が.mdで終わるものを取得
    .map((fileName) => ({
      params: {
        slug: fileName.replace(/\.md$/, ''),//ファイルの名前から.mdを削除
      },
    }));
} 