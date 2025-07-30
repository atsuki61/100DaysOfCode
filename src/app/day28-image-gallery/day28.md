# Day 28: 画像ギャラリー（モーダル表示）

## 📋 プロジェクト概要

アニメキャラクター画像を一覧表示し、クリックで拡大表示できるモーダル付きギャラリーアプリを作成しました。

### 🎯 主な機能

1. **レスポンシブ画像グリッド** - 画面サイズに応じて1-4列で表示
2. **画像カード** - ホバー効果と拡大アイコン付き
3. **フルスクリーンモーダル** - 画像の詳細表示
4. **ナビゲーション機能** - 前/次の画像へ移動
5. **カテゴリフィルター** - アニメ作品別での絞り込み
6. **キーボード操作** - ESC、矢印キーでの操作
7. **画像最適化** - Next.js Imageコンポーネント使用

## 🛠️ 使用技術

- **React**: 18.0+ (useState, useEffect, useCallback, useMemo)
- **Next.js**: 15.3.2 (App Router, Image最適化)
- **TypeScript**: 型安全性の確保
- **Tailwind CSS**: グリッドレイアウト、モーダル、アニメーション

## 📁 ファイル構成

```
src/app/day28-image-gallery/
├── page.tsx              # メインページ
├── layout.tsx            # レイアウト設定
├── types.ts              # 型定義
├── day28.md             # 学習記録（このファイル）
├── data/
│   └── images.ts        # 画像データとユーティリティ関数
├── components/
│   ├── ImageCard.tsx    # 画像カードコンポーネント
│   ├── ImageGrid.tsx    # 画像グリッドコンポーネント
│   ├── ImageModal.tsx   # モーダルウィンドウコンポーネント
│   └── CategoryFilter.tsx # カテゴリフィルターコンポーネント
└── hooks/
    └── useGallery.ts    # ギャラリー状態管理フック
```

## 🔧 主要な技術実装

### 1. 型定義（types.ts）

```typescript
export interface GalleryImage {
  id: string
  src: string
  alt: string
  title: string
  description?: string
  category?: string
  width?: number
  height?: number
}

export interface ModalState {
  isOpen: boolean
  currentImageIndex: number
}
```

### 2. 画像データ管理（data/images.ts）

```typescript
export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/anime-characters/goku.jpg',
    alt: '悟空',
    title: '孫悟空',
    description: 'ドラゴンボールの主人公。サイヤ人の戦士',
    category: 'ドラゴンボール',
    width: 800,
    height: 600
  },
  // ... 他の画像データ
]

// ユーティリティ関数
export const getImageById = (id: string): GalleryImage | undefined => {
  return galleryImages.find(image => image.id === id)
}

export const getImagesByCategory = (category: string): GalleryImage[] => {
  return galleryImages.filter(image => image.category === category)
}
```

### 3. レスポンシブグリッドレイアウト（ImageGrid.tsx）

```typescript
return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {images.map((image, index) => (
      <ImageCard
        key={image.id}
        image={image}
        onClick={() => onImageClick(index)}
      />
    ))}
  </div>
)
```

### 4. Next.js Image最適化（ImageCard.tsx）

```typescript
<Image
  src={image.src}
  alt={image.alt}
  fill
  className="object-cover transition-transform duration-300 group-hover:scale-110"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### 5. モーダルとキーボード操作（ImageModal.tsx）

```typescript
const handleKeyPress = useCallback((event: KeyboardEvent) => {
  if (!isOpen) return

  switch (event.key) {
    case 'Escape':
      onClose()
      break
    case 'ArrowLeft':
      onPrevious()
      break
    case 'ArrowRight':
      onNext()
      break
  }
}, [isOpen, onClose, onPrevious, onNext])

useEffect(() => {
  if (isOpen) {
    document.addEventListener('keydown', handleKeyPress)
    document.body.style.overflow = 'hidden' // スクロール無効化
  }

  return () => {
    document.removeEventListener('keydown', handleKeyPress)
    document.body.style.overflow = 'unset'
  }
}, [isOpen, handleKeyPress])
```

### 6. 状態管理カスタムフック（useGallery.ts）

```typescript
export function useGallery({ images }: UseGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    currentImageIndex: 0
  })

  // フィルタリングされた画像
  const filteredImages = useMemo(() => {
    if (!selectedCategory) return images
    return images.filter(image => image.category === selectedCategory)
  }, [images, selectedCategory])

  // モーダル操作関数
  const openModal = (index: number) => {
    setModalState({
      isOpen: true,
      currentImageIndex: index
    })
  }

  // ナビゲーション機能
  const goToNext = () => {
    setModalState(prev => ({
      ...prev,
      currentImageIndex: 
        prev.currentImageIndex < filteredImages.length - 1 
          ? prev.currentImageIndex + 1 
          : 0
    }))
  }

  return {
    selectedCategory,
    modalState,
    filteredImages,
    categories,
    currentImage,
    openModal,
    closeModal,
    goToPrevious,
    goToNext,
    handleCategoryChange
  }
}
```

## 🎨 デザインとUX特徴

### カードホバー効果
- `group-hover:scale-110` - 画像の拡大
- `hover:shadow-xl hover:scale-105` - カード全体の浮き上がり
- オーバーレイとアイコンのフェードイン

### モーダルUI
- 背景オーバーレイクリックで閉じる
- フルスクリーンレスポンシブ表示
- ナビゲーションボタンの配置
- 画像情報の表示

### アクセシビリティ
- キーボード操作サポート
- 適切なalt属性
- フォーカス管理

## 📱 レスポンシブデザイン

| 画面サイズ | グリッド列数 | 対応クラス |
|-----------|------------|-----------|
| スマホ     | 1列        | `grid-cols-1` |
| タブレット | 2列        | `sm:grid-cols-2` |
| PC小      | 3列        | `lg:grid-cols-3` |
| PC大      | 4列        | `xl:grid-cols-4` |

## 🚀 パフォーマンス最適化

1. **Next.js Image最適化**
   - 自動フォーマット変換
   - レスポンシブ画像
   - 遅延読み込み

2. **React最適化**
   - `useMemo`でフィルタリング最適化
   - `useCallback`でイベントハンドラー最適化

3. **CSS最適化**
   - `transition-*`でスムーズなアニメーション
   - `object-cover`で画像アスペクト比維持

## 🎓 学習ポイント

### 新しく学んだこと

1. **Grid Layout設計**
   - レスポンシブグリッドの実装
   - Tailwind CSSのグリッドシステム

2. **モーダルウィンドウ実装**
   - ポータルを使わないシンプルな実装
   - z-indexとオーバーレイ管理
   - body scroll制御

3. **キーボードナビゲーション**
   - イベントリスナーの適切な管理
   - useEffect cleanup関数の活用

4. **画像最適化**
   - Next.js Imageコンポーネントの詳細設定
   - sizesプロパティの理解

5. **状態管理パターン**
   - カスタムフックでのロジック分離
   - 複数状態の効率的な管理

### 改善できる点

1. **無限スクロール** - 大量画像の対応
2. **画像検索機能** - タイトルや説明での検索
3. **お気に入り機能** - ローカルストレージ活用
4. **画像アップロード** - ユーザーが画像追加可能
5. **スライドショー** - 自動再生機能

## 🔗 関連リンク

- [Next.js Image Documentation](https://nextjs.org/docs/api-reference/next/image)
- [Tailwind CSS Grid](https://tailwindcss.com/docs/grid-template-columns)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)

## 📝 感想

Day28では、画像ギャラリーの実装を通じてモーダルウィンドウとグリッドレイアウトの実装方法を深く学ぶことができました。特に、Next.js Imageコンポーネントの最適化機能と、キーボードナビゲーションの実装は実用的な知識として大変有用でした。

モーダルの状態管理やキーボードイベントの適切な処理など、ユーザビリティを考慮した実装の重要性を実感しました。また、レスポンシブデザインとパフォーマンス最適化の両立も重要な学びとなりました。 