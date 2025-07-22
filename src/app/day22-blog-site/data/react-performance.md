---
title: "Reactアプリのパフォーマンス最適化テクニック"
date: "2024-01-20"
excerpt: "Reactアプリケーションのパフォーマンスを向上させる実践的なテクニックをまとめました。"
---

# Reactアプリのパフォーマンス最適化テクニック

Reactアプリケーションが重くなってきた時に効果的なパフォーマンス最適化テクニックを紹介します。

## 1. React.memo でコンポーネントの再レンダリングを防ぐ

不要な再レンダリングを防ぐために`React.memo`を使用しましょう。

```javascript
import React from 'react'

const UserCard = React.memo(({ user, onEdit }) => {
  console.log('UserCard rendered')
  
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>編集</button>
    </div>
  )
})

// カスタムの比較関数を使用
const UserCard = React.memo(({ user, onEdit }) => {
  // コンポーネントの内容
}, (prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id &&
         prevProps.user.name === nextProps.user.name
})
```

## 2. useMemo と useCallback でキャッシュを活用

重い計算や関数の再作成を避けるために、`useMemo`と`useCallback`を使用します。

```javascript
import { useMemo, useCallback, useState } from 'react'

function UserList({ users }) {
  const [search, setSearch] = useState('')

  // 重い計算をキャッシュ
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [users, search])

  // 関数をキャッシュ
  const handleSearch = useCallback((event) => {
    setSearch(event.target.value)
  }, [])

  return (
    <div>
      <input onChange={handleSearch} placeholder="ユーザーを検索" />
      {filteredUsers.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

## 3. コードスプリッティングで初期ロードを軽量化

`React.lazy`と`Suspense`を使用して、必要な時にコンポーネントを読み込みます。

```javascript
import { lazy, Suspense } from 'react'

// 遅延読み込み
const AdminPanel = lazy(() => import('./AdminPanel'))
const UserDashboard = lazy(() => import('./UserDashboard'))

function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <div>
      <Suspense fallback={<div>読み込み中...</div>}>
        {isAdmin ? <AdminPanel /> : <UserDashboard />}
      </Suspense>
    </div>
  )
}
```

## 4. 仮想化で大量データを効率的に表示

大量のリストを表示する際は、仮想化ライブラリを使用しましょう。

```javascript
import { FixedSizeList as List } from 'react-window'

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <div className="list-item">
        {items[index].name}
      </div>
    </div>
  )

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </List>
  )
}
```

## 5. React DevTools Profilerでボトルネックを特定

React DevTools Profilerを使用して、実際のパフォーマンス問題を特定しましょう。

1. Chrome拡張のReact DevToolsをインストール
2. Profilerタブを開く
3. 記録開始 → 操作実行 → 記録停止
4. 重いコンポーネントや頻繁な再レンダリングを確認

## 6. 画像の最適化

Next.jsの`Image`コンポーネントを使用して画像を最適化します。

```javascript
import Image from 'next/image'

function ProductCard({ product }) {
  return (
    <div>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={300}
        height={200}
        priority={product.featured} // 重要な画像は優先読み込み
        placeholder="blur" // ぼかしプレースホルダー
      />
      <h3>{product.name}</h3>
    </div>
  )
}
```

## まとめ

パフォーマンス最適化は、まず計測から始めることが重要です。React DevTools Profilerで実際の問題を特定してから、適切な最適化手法を適用しましょう。すべてを最適化する必要はなく、ユーザー体験に影響する部分に注力することが大切です。 