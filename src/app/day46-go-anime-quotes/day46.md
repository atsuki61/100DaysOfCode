# Day 46: Go アニメ名言ジェネレーター API と Next.js 連携

## 目的
- Goでアニメ名言を返すAPI（固定データ or 外部APIのプロキシ）を想定し、Next.jsから取得・表示する。
- 本リポジトリではデプロイ環境でも動くよう、Next.jsのAPIルートでモックを提供し、フロントの型安全とUIを実装する。

## フォルダ構成（本日分）
```
src/app/day46-go-anime-quotes/
├── layout.tsx   # Header / PageHeader / Footer
├── page.tsx     # 名言取得UI（取得ボタン、ローディング/エラー、結果表示）
└── day46.md     # 本ドキュメント（このファイル）
```

## 想定Goサーバー（参考）
- 例: `/quotes/random` で `{ anime, character, quote }` を返す。
- Next.js 側は `/api/day46-quotes` を経由して取得する想定にしておくことで、将来Goに差し替えが容易。

## Next.js 側のポイント
- フロントでは unknown で受け、型ガードで `{ anime: string; character: string; quote: string }` を検証してから利用。
- 取得ボタンで再取得できるようにし、ローディング/エラー表示を行う。

## 検証
- 取得ボタン押下で名言が表示される。
- エラー時はエラーメッセージが表示される。

## 学びのポイント（初心者向け）
- APIは「名言の倉庫」。`/quotes`に取りに行くと、箱（JSON）で名言が返ってくるイメージ。
- Next.jsは倉庫に取りに行く担当。中身は必ずしも決まった形とは限らないので、まずは unknown で受け取ってから安全確認（型ガード）して使うと事故が減る。


