# Day 15: ワークアウトプランナー 💪

## 今日の学習内容

### 🎯 プロジェクト概要
トレーニング種目をリストに追加し管理するワークアウトプランナーアプリを作成しました。複数フィールドのフォーム処理、localStorageを使ったデータ永続化、入力バリデーションの基礎を学習しました。

### 📚 主な学習ポイント

#### 1. 複数フィールドのフォーム処理
- **動的フィールド表示**: エクササイズのカテゴリー（筋トレ、有酸素運動、ストレッチ、スポーツ）に応じて、適切な入力フィールドを動的に表示
- **フォーム状態管理**: 複数の入力フィールドを`useState`で効率的に管理
- **ユーザーエクスペリエンス**: カテゴリー変更時にリアルタイムでフォームが更新される

```typescript
// カテゴリーに応じた動的フィールド表示の例
const renderCategorySpecificFields = () => {
  switch (formData.category) {
    case 'strength':
      return (
        // セット数、回数、重量の入力フィールド
      );
    case 'cardio':
      return (
        // 時間、距離の入力フィールド
      );
    // ... 他のカテゴリー
  }
};
```

#### 2. localStorageを使ったデータ永続化
- **データの保存と読み込み**: ページを再読み込みしてもデータが保持される
- **エラーハンドリング**: localStorage が利用できない環境での適切な処理
- **型安全性**: TypeScript を使った型安全なデータ操作

```typescript
// localStorage操作の例
export const loadExercises = (): WorkoutExercise[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(EXERCISES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load exercises from localStorage:', error);
    return [];
  }
};
```

#### 3. 入力バリデーションの基礎
- **フィールド別バリデーション**: エクササイズ名、数値の範囲チェック、文字数制限
- **カテゴリー別ルール**: 筋トレと有酸素運動で異なるバリデーション
- **ユーザーフレンドリーなエラー表示**: 分かりやすい日本語エラーメッセージ

```typescript
// バリデーション例
if (!data.name.trim()) {
  errors.push({ field: 'name', message: 'エクササイズ名は必須です' });
} else if (data.name.trim().length < 2) {
  errors.push({ field: 'name', message: 'エクササイズ名は2文字以上で入力してください' });
}
```

### 🛠️ 技術スタック
- **React**: コンポーネント設計、状態管理
- **TypeScript**: 型安全性、インターフェース設計
- **Tailwind CSS**: レスポンシブデザイン、条件付きスタイリング
- **localStorage**: ブラウザでのデータ永続化

### 🏗️ アーキテクチャ設計

#### コンポーネント構成
```
day15-workout-planner/
├── types.ts              # 型定義
├── utils/
│   ├── localStorage.ts   # データ永続化
│   └── validation.ts     # バリデーション
├── components/
│   ├── ExerciseForm.tsx  # エクササイズ入力フォーム
│   ├── ExerciseList.tsx  # エクササイズ一覧表示
│   └── PlanForm.tsx      # プラン作成フォーム
├── layout.tsx            # レイアウト
└── page.tsx              # メインページ
```

#### データ設計
- **WorkoutExercise**: エクササイズの基本情報（名前、カテゴリー、詳細数値）
- **WorkoutPlan**: 複数のエクササイズをまとめたワークアウトプラン
- **フォームデータ**: ユーザー入力用の型（空文字列も許可）

### 💡 学習のポイント

#### 1. 状態管理の分離
```typescript
// フォーム状態とアプリケーション状態を明確に分離
const [formData, setFormData] = useState<ExerciseFormData>({...});
const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
const [errors, setErrors] = useState<ValidationError[]>([]);
```

#### 2. 条件付きレンダリング
```typescript
// カテゴリーに応じた表示の切り替え
{exercise.category === 'strength' && (
  <div>セット数: {exercise.sets}</div>
)}
{exercise.category === 'cardio' && (
  <div>時間: {exercise.duration}分</div>
)}
```

#### 3. ユーザビリティの向上
- エラー表示のタイミング：入力開始時にエラーをクリア
- 視覚的フィードバック：カテゴリー別の色分け、ローディング状態
- 操作性：確認ダイアログ、キャンセル機能

### 🎨 UI/UXのこだわり

#### 1. カテゴリー別色分け
- 筋トレ：赤系統
- 有酸素運動：青系統  
- ストレッチ：緑系統
- スポーツ：黄系統

#### 2. レスポンシブデザイン
```css
/* グリッドレイアウトの例 */
grid-cols-1 md:grid-cols-2 xl:grid-cols-3
/* 画面サイズに応じて1列→2列→3列に変化 */
```

#### 3. アクセシビリティ
- 適切な`label`と`input`の関連付け
- キーボード操作への対応
- 分かりやすいエラーメッセージ

### 🔍 今後の改善点

1. **エクササイズ検索機能**: 名前やカテゴリーでの絞り込み
2. **プラン機能の完全実装**: 複数エクササイズの組み合わせ
3. **データエクスポート**: CSV/JSON形式でのデータ出力
4. **統計機能**: 週間/月間の運動記録集計
5. **ソート機能**: 作成日時、名前、カテゴリーでの並び替え

### 🚀 応用アイデア

1. **タイマー機能**: セット間の休憩時間管理
2. **プログレス追跡**: 重量やタイムの記録と進捗表示
3. **SNS機能**: ワークアウトプランの共有
4. **AI推奨**: ユーザーの履歴に基づく次回プラン提案

### 📝 学習の感想

Day15では、より実用的なアプリケーション開発を通じて、以下のスキルが向上しました：

1. **複雑なフォーム処理**: 動的フィールド、条件付きバリデーション
2. **データ永続化**: ブラウザストレージの活用
3. **ユーザーエクスペリエンス**: 直感的な操作性の実現
4. **コード構造化**: 機能別のファイル分割、再利用可能なコンポーネント

特に、localStorageを使ったデータ永続化により、単なる一時的なアプリではなく、実際に使用価値のあるツールになったのが大きな成果です。バリデーション機能により、データの整合性も保たれ、実運用に耐えうる品質を実現できました。 