## はじめに

Day3:ReactでBMI計算機アプリを作成しました！
## 完成したアプリの機能

- 📏 身長・体重の入力機能
- 🧮 BMI値の自動計算
- 🏷️ BMIカテゴリの判定（低体重・標準体重・過体重・肥満）
- 🎨 カテゴリ別の色分け表示
- 📊 BMI判定基準表の表示
- 🔄 入力値のリセット機能
- ✅ 入力値のバリデーション
- 📱 レスポンシブデザイン対応

## 1. データ構造の設計

BMI計算機で管理する状態を定義します。

```typescript
const [height, setHeight] = useState<string>('')      // 身長（文字列）
const [weight, setWeight] = useState<string>('')      // 体重（文字列）
const [bmi, setBMI] = useState<number | null>(null)   // BMI値（数値またはnull）
const [bmiCategory, setBMICategory] = useState<string>('')  // BMIカテゴリ（文字列）
```

🎯 **設計のポイント**
- **入力値は文字列**: ユーザー入力を直接管理
- **BMI値はnull許可**: 計算前は未定義状態
- **型安全性**: TypeScriptで明確な型定義

## 2. BMI計算ロジック

BMIの計算式を実装します。

```typescript
const calculateBMI = () => {
  const heightInMeters = parseFloat(height) / 100  // cmをmに変換
  const weightInKg = parseFloat(weight)            // 体重を数値に変換

  if (heightInMeters > 0 && weightInKg > 0) {      // バリデーション
    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters)  // BMI計算
    setBMI(calculatedBMI)                          // 結果を状態に保存
    setBMICategory(getBMICategory(calculatedBMI))  // カテゴリを判定
  }
}
```

### 🧮 計算の具体例

```typescript
// 例: 身長170cm、体重65kgの場合
height = "170"
weight = "65"

// ステップ1: 文字列を数値に変換
heightInMeters = parseFloat("170") / 100 = 170 / 100 = 1.7
weightInKg = parseFloat("65") = 65

// ステップ2: BMI計算
calculatedBMI = 65 / (1.7 * 1.7) = 65 / 2.89 = 22.49

// ステップ3: 結果
BMI = 22.5 (小数点第1位まで表示)
カテゴリ = "標準体重"
```

**`parseFloat`の重要性**
```typescript
// 文字列から数値への変換
parseFloat("170")    // 170
parseFloat("65.5")   // 65.5
parseFloat("abc")    // NaN (Not a Number)
parseFloat("")       // NaN
```

## 3. BMIカテゴリ判定ロジック

WHO基準に基づいてカテゴリを判定します。

```typescript
const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return '低体重'      // 18.5未満
  if (bmi < 25) return '標準体重'      // 18.5以上25未満
  if (bmi < 30) return '過体重'        // 25以上30未満
  return '肥満'                        // 30以上
}
```

### 🎯 判定ロジックの詳細

```typescript
// 条件分岐の流れ
function getBMICategory(bmi) {
  // 第1条件: BMI < 18.5
  if (bmi < 18.5) return '低体重'
  
  // 第2条件: 18.5 <= BMI < 25 (第1条件をクリアしているため)
  if (bmi < 25) return '標準体重'
  
  // 第3条件: 25 <= BMI < 30 (第1,2条件をクリアしているため)
  if (bmi < 30) return '過体重'
  
  // 最終条件: BMI >= 30 (全ての条件をクリアしているため)
  return '肥満'
}
```

**具体的な判定例**
```typescript
getBMICategory(17.0)  // "低体重"  (17.0 < 18.5)
getBMICategory(22.5)  // "標準体重" (18.5 <= 22.5 < 25)
getBMICategory(27.3)  // "過体重"   (25 <= 27.3 < 30)
getBMICategory(32.1)  // "肥満"     (32.1 >= 30)
```

## 4. 色分け表示ロジック

カテゴリに応じて色を動的に変更します。

```typescript
const getBMIColor = (category: string): string => {
  switch (category) {
    case '低体重': return 'text-blue-600'    // 青色
    case '標準体重': return 'text-green-600'  // 緑色
    case '過体重': return 'text-yellow-600'   // 黄色
    case '肥満': return 'text-red-600'        // 赤色
    default: return 'text-gray-600'           // グレー色
  }
}
```

🎨 **色の意味**
- **青（低体重）**: 注意が必要な状態
- **緑（標準体重）**: 健康的な状態
- **黄（過体重）**: 警告の状態
- **赤（肥満）**: 危険な状態

## 5. 入力バリデーション

安全な計算のための入力チェックです。

```typescript
const isValidInput = height !== '' && weight !== '' && 
                    parseFloat(height) > 0 && parseFloat(weight) > 0
```

### 🔍 バリデーションの詳細

```typescript
// 4つの条件をすべて満たす必要がある
const isValidInput = 
  height !== '' &&              // 身長が空でない
  weight !== '' &&              // 体重が空でない
  parseFloat(height) > 0 &&     // 身長が正の数値
  parseFloat(weight) > 0        // 体重が正の数値
```

**バリデーション例**
```typescript
// ✅ 有効な入力
height="170", weight="65" → isValidInput = true

// ❌ 無効な入力
height="", weight="65"     → false (身長が空)
height="170", weight=""    → false (体重が空)
height="0", weight="65"    → false (身長が0)
height="abc", weight="65"  → false (身長が数値でない)
```

## 6. リセット機能

すべての状態を初期化します。

```typescript
const resetCalculator = () => {
  setHeight('')        // 身長を空に
  setWeight('')        // 体重を空に
  setBMI(null)         // BMIを未計算状態に
  setBMICategory('')   // カテゴリを空に
}
```

🔄 **リセットの効果**
- 入力フィールドがクリア
- 計算結果が非表示
- 初期状態に完全復帰

## 7. レスポンシブレイアウト設計

画面サイズに応じて2カラムレイアウトを調整します。

```typescript
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <div>{/* 左側: BMI計算機 */}</div>
  <div>{/* 右側: BMI判定基準表 */}</div>
</div>
```

📱 **レスポンシブの動作**
- **モバイル（〜1024px）**: 縦積み（1列）
- **デスクトップ（1024px〜）**: 横並び（2列）

### shadcn/uiコンポーネントの活用

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
```

🎯 **コンポーネントのメリット**
- **統一感**: 一貫したデザインシステム
- **アクセシビリティ**: 標準的なHTML属性を自動設定
- **保守性**: スタイルの一元管理

## 8. 条件付きレンダリング

計算結果がある場合のみ結果を表示します。

```typescript
{bmi && (
  <Card className="bg-gray-50 border-2">
    <CardContent className="pt-6 text-center">
      <div className="text-3xl font-bold text-gray-800 mb-2">
        {bmi.toFixed(1)}  {/* 小数点第1位まで表示 */}
      </div>
      <div className={`text-lg font-semibold ${getBMIColor(bmiCategory)}`}>
        {bmiCategory}
      </div>
    </CardContent>
  </Card>
)}
```

### 🎯 条件付きレンダリングの仕組み

```typescript
// bmiがnullまたは0の場合、falsy値なので表示されない
bmi = null  → false → 結果カード非表示
bmi = 0     → false → 結果カード非表示
bmi = 22.5  → true  → 結果カード表示
```

## 9. 数値フォーマット

BMI値を適切な形式で表示します。

```typescript
{bmi.toFixed(1)}  // 小数点第1位まで表示
```

**フォーマット例**
```typescript
22.456789.toFixed(1)  // "22.5"
18.0.toFixed(1)       // "18.0"
30.toFixed(1)         // "30.0"
```

## まとめ

このBMI計算機アプリで学べるReactの重要概念：

1. **数値計算**: 文字列から数値への変換と計算処理
2. **条件分岐**: if文とswitch文を使った判定ロジック
3. **バリデーション**: 安全な入力チェックの実装
4. **条件付きレンダリング**: 状態に応じた表示制御
5. **レスポンシブデザイン**: グリッドレイアウトの活用
6. **コンポーネントライブラリ**: shadcn/uiの効果的な使用
7. **状態管理**: 複数の関連する状態の管理
8. **数値フォーマット**: 適切な表示形式の実装

## 追加検討機能

- 📊 BMI履歴の記録機能
- 📈 グラフ表示機能
- 🎯 目標BMI設定機能
- 📱 PWA対応
- 🌍 多言語対応
- 💾 データの永続化

実用的な計算アプリケーションの基礎がしっかり学べるアプリです！
数値処理とバリデーションの重要性を理解できます 🚀
