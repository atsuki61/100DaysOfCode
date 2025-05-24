# Next.js + ShadCN/UIで作るモダンなBMI計算機 - 初学者向け完全解説

## はじめに

今回は、React/Next.jsの学習の一環として「BMI計算機」を作成しました。単純な計算アプリでありながら、モダンなWebアプリケーション開発で必要な要素がぎっしり詰まった実践的なプロジェクトです。

この記事では、**初学者の方でも理解できるよう**、使用した技術やデザインの考え方を詳しく解説していきます。

## 🛠️ 使用技術

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **ShadCN/UI**
- **Tailwind CSS v4**

## 🎯 完成イメージ

2つのカードが横に並んだ、クリーンで使いやすいBMI計算機です：

- **左側**: BMI計算機本体（入力フォーム + 計算ボタン + 結果表示）
- **右側**: BMI判定基準の目安表（色分けされた視覚的なガイド）

## 🏗️ コンポーネント構成の解説

### 1. レスポンシブレイアウト設計

```tsx
{/* 2カラムレイアウト: デスクトップは横並び, モバイルは縦積み */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

**ポイント:**
- `grid-cols-1`: デフォルト（モバイル）では1列表示
- `lg:grid-cols-2`: 大画面（1024px以上）では2列表示
- `gap-8`: カード間に適切な余白を確保

**初学者向け補足:**
CSSグリッドを使うことで、画面サイズに応じて自動的にレイアウトが変わります。これを「レスポンシブデザイン」と呼び、現代のWebアプリでは必須の考え方です。

### 2. ShadCN/UIコンポーネントの活用

#### Cardコンポーネント
```tsx
<Card className="shadow-lg">
  <CardHeader className="text-center">
    <CardTitle className="text-2xl font-bold text-gray-800">
      BMI計算機
    </CardTitle>
    <CardDescription className="text-gray-600">
      身長と体重を入力してBMIを計算しましょう
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-6">
    {/* フォーム内容 */}
  </CardContent>
</Card>
```

**ShadCN/UIの利点:**
- **統一感**: 全てのコンポーネントが同じデザインシステムに基づいている
- **アクセシビリティ**: 画面読み上げソフトなどに対応済み
- **カスタマイズ性**: Tailwind CSSで簡単に見た目を調整可能

#### Input + Labelコンポーネント
```tsx
<div className="space-y-2">
  <Label htmlFor="height" className="text-sm font-medium">
    身長 (cm)
  </Label>
  <Input
    id="height"
    type="number"
    placeholder="170"
    value={height}
    onChange={(e) => setHeight(e.target.value)}
    className="text-lg"
  />
</div>
```

**初学者向けポイント:**
- `htmlFor`と`id`を一致させることで、ラベルクリック時に入力欄にフォーカスが移る
- `type="number"`で数値のみ入力可能にする
- `placeholder`で入力例を表示して使いやすさ向上

### 3. 状態管理とロジック

#### React Hooksによる状態管理
```tsx
const [height, setHeight] = useState<string>('')
const [weight, setWeight] = useState<string>('')
const [bmi, setBMI] = useState<number | null>(null)
const [bmiCategory, setBMICategory] = useState<string>('')
```

**設計の考え方:**
- 入力値は文字列（`string`）で管理
- 計算結果は数値（`number | null`）で型安全性を確保
- カテゴリは文字列で日本語表示

#### BMI計算ロジック
```tsx
const calculateBMI = () => {
  const heightInMeters = parseFloat(height) / 100
  const weightInKg = parseFloat(weight)

  if (heightInMeters > 0 && weightInKg > 0) {
    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters)
    setBMI(calculatedBMI)
    setBMICategory(getBMICategory(calculatedBMI))
  }
}
```

**初学者向けポイント:**
- `parseFloat()`で文字列を数値に変換
- バリデーション（0より大きい値かチェック）を必ず実装
- 身長をcmからmに変換（÷100）する処理

### 4. 視覚的に優れた目安表デザイン

#### カテゴリ別色分け実装
```tsx
{/* 標準体重の例 */}
<div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
  <span className="font-medium text-green-700">標準体重</span>
  <span className="text-sm text-green-600">18.5 - 24.9</span>
</div>
```

**デザインシステムの考え方:**
- **低体重**: 青系（`bg-blue-50`, `text-blue-700`）
- **標準体重**: 緑系（健康的なイメージ）
- **過体重**: 黄系（注意のイメージ）
- **肥満**: 赤系（警告のイメージ）

**初学者向けTailwindのポイント:**
- `bg-green-50`: 薄い緑の背景色
- `border-green-200`: 少し濃い緑の境界線
- `text-green-700`: さらに濃い緑の文字色
- 数字が大きいほど色が濃くなる仕組み

### 5. 動的スタイリング

```tsx
const getBMIColor = (category: string): string => {
  switch (category) {
    case '低体重': return 'text-blue-600'
    case '標準体重': return 'text-green-600'
    case '過体重': return 'text-yellow-600'
    case '肥満': return 'text-red-600'
    default: return 'text-gray-600'
  }
}

// 使用箇所
<div className={`text-lg font-semibold ${getBMIColor(bmiCategory)}`}>
  {bmiCategory}
</div>
```

**ポイント:**
計算結果に応じて、表示色が動的に変わります。これにより、ユーザーは一目で自分の状態を理解できます。

## 🎨 デザインの工夫

### 1. グラデーション背景
```tsx
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
```
- `bg-gradient-to-br`: 右下方向へのグラデーション
- 薄い青系の色合いで、清潔感と信頼感を演出

### 2. カードの影とレイヤー感
```tsx
<Card className="shadow-lg">
```
- `shadow-lg`: 大きな影でカードが浮いているような効果
- ユーザーの注意をコンテンツに向ける

### 3. 適切な余白設計
```tsx
<CardContent className="space-y-6">
  <div className="space-y-2">
```
- `space-y-6`: 大きな要素間は広めの余白
- `space-y-2`: 関連する要素間は狭めの余白
- 視覚的なグループ化で情報整理

## 🔧 実装のコツとベストプラクティス

### 1. TypeScriptの活用
```tsx
const getBMICategory = (bmi: number): string => {
  // 型注釈により、引数と戻り値の型を明確化
}
```

### 2. バリデーション
```tsx
const isValidInput = height !== '' && weight !== '' && 
                    parseFloat(height) > 0 && parseFloat(weight) > 0
```
- 空文字チェック
- 数値の有効性チェック
- ボタンの有効/無効状態を制御

### 3. ユーザビリティの配慮
- プレースホルダーで入力例を表示
- リセット機能の提供
- 医療免責事項の明記

## 📱 レスポンシブ対応の詳細

### ブレークポイント戦略
- **モバイル（～1023px）**: 1列表示、縦スクロールで目安表を確認
- **デスクトップ（1024px～）**: 2列表示、一画面で全情報を確認可能

### 画面サイズ別の調整
```tsx
<div className="max-w-4xl mx-auto pt-12">
```
- `max-w-4xl`: 最大幅を制限して読みやすさを確保
- `mx-auto`: 中央揃えで美しいレイアウト

## 🚀 学習ポイント

この実装を通じて学べること：

1. **React Hooks**: `useState`による状態管理
2. **TypeScript**: 型安全なコード記述
3. **Tailwind CSS**: ユーティリティファーストなCSS
4. **ShadCN/UI**: モダンなUIライブラリの活用
5. **レスポンシブデザイン**: 複数デバイス対応
6. **ユーザビリティ**: 使いやすいUI設計

## 🎯 まとめ

シンプルなBMI計算機でも、モダンなWeb開発の多くの技術を組み合わせることで、プロフェッショナルなアプリケーションを作ることができます。

特に重要なのは：
- **ユーザー体験**: 直感的で使いやすいインターフェース
- **視覚的デザイン**: 情報を効果的に伝える色とレイアウト
- **技術的品質**: 型安全性とエラーハンドリング

このような小さなプロジェクトの積み重ねが、大きなアプリケーション開発のスキル向上につながります。

---

**次回は、このBMI計算機に履歴機能やグラフ表示を追加して、さらに高機能なアプリに発展させていく予定です！**
