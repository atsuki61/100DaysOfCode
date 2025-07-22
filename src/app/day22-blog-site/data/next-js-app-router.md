---
title: "Next.js 13 App Routerで変わったこと"
date: "2024-01-15"
excerpt: "Next.js 13で導入されたApp Routerの主な変更点と移行のポイントを解説します。"
---

# Next.js 13 App Routerで変わったこと

Next.js 13で導入されたApp Routerは、従来のPages Routerから大きな変更をもたらしました。この記事では、主な変更点と移行のポイントについて解説します。

## 主な変更点

### 1. ファイルシステムルーティングの変更

従来のPages Routerでは`pages`ディレクトリにファイルを配置していましたが、App Routerでは`app`ディレクトリを使用します。

```
// Pages Router
pages/
  index.js          → /
  about.js          → /about
  blog/[slug].js    → /blog/[slug]

// App Router
app/
  page.js           → /
  about/page.js     → /about
  blog/[slug]/page.js → /blog/[slug]
```

### 2. Server Componentsがデフォルト

App Routerでは、すべてのコンポーネントがデフォルトでServer Componentsとして動作します。クライアントサイドでの処理が必要な場合は、`'use client'`ディレクティブを使用します。

```javascript
'use client'

import { useState } from 'react'

export default function ClientComponent() {
  const [count, setCount] = useState(0)
  // ...
}
```

### 3. データフェッチングの変更

`getStaticProps`や`getServerSideProps`は廃止され、Server Components内で直接データフェッチができるようになりました。

```javascript
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}
```

## メリット

1. **パフォーマンスの向上**: Server Componentsによりバンドルサイズが削減
2. **開発体験の向上**: 直感的なファイル構造とデータフェッチング
3. **SEOの改善**: サーバーサイドレンダリングの最適化

## まとめ

App Routerは学習コストがある一方で、モダンなWebアプリケーション開発により適した仕組みを提供します。新しいプロジェクトではApp Routerの採用を検討することをお勧めします。 