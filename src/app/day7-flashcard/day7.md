# Day 7: 単語フラッシュカードアプリ

## 📚 アプリ概要

TOEIC頻出単語を効率的に学習できるフラッシュカードアプリです。

### 主な機能
- **フラッシュカード表示**: 英単語 ⇔ 日本語意味の切り替え
- **ナビゲーション**: 前後のカード移動
- **シャッフル機能**: ランダムな順序で学習
- **進捗表示**: 現在位置と学習進捗の可視化
- **キーボード操作**: スペースキー、矢印キーでの操作
- **レスポンシブデザイン**: PC・スマートフォン対応

## 🎯 学習ポイント

### React の基本概念
- **useState**: 複数の状態管理（カードインデックス、表示状態、データ配列）
- **useEffect**: キーボードイベントリスナーの登録・削除
- **配列操作**: Fisher-Yatesアルゴリズムによるシャッフル
- **条件付きレンダリング**: カードの表面・裏面切り替え
- **イベント処理**: クリック、キーボード操作

### TypeScript の型安全性
- **interface定義**: WordCard、FlashcardState、Props型
- **Generics**: useState<WordCard[]>による型推論
- **型アノテーション**: イベントハンドラの型指定

### コンポーネント設計
- **関心事の分離**: FlashCard、NavigationControls の分離
- **Props の設計**: 適切なデータ受け渡し
- **再利用性**: 汎用的なコンポーネント設計

## 🛠️ 技術実装

### 1. データ構造設計
```typescript
interface WordCard {
  id: number;
  word: string;        // 英単語
  meaning: string;     // 日本語の意味
  pronunciation: string; // 発音記号
  example: string;     // 例文
  level: 'basic' | 'intermediate' | 'advanced'; // 難易度
}
```

### 2. 状態管理パターン
```typescript
const [words, setWords] = useState<WordCard[]>(toeicWords);
const [currentIndex, setCurrentIndex] = useState(0);
const [isRevealed, setIsRevealed] = useState(false);
```

### 3. Fisher-Yatesシャッフルアルゴリズム
```typescript
const handleShuffle = () => {
  const shuffledWords = [...words];
  for (let i = shuffledWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
  }
  setWords(shuffledWords);
};
```

### 4. キーボードイベント処理
```typescript
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'Space': handleCardClick(); break;
      case 'ArrowLeft': handlePrevious(); break;
      case 'ArrowRight': handleNext(); break;
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [currentIndex, words.length, isRevealed]);
```

## 💡 設計の工夫

### UX設計
- **直感的操作**: クリック・キーボード両対応
- **視覚的フィードバック**: カードの状態変化をアニメーションで表現
- **進捗の可視化**: プログレスバーと統計情報
- **アクセシビリティ**: キーボードナビゲーション対応

### パフォーマンス最適化
- **メモリ効率**: useEffectの依存配列による適切な再レンダリング制御
- **イベントリスナー管理**: コンポーネントアンマウント時のクリーンアップ

### データ設計
- **実用的コンテンツ**: 実際のTOEIC頻出単語を使用
- **段階的学習**: 難易度レベル（Basic/Intermediate/Advanced）
- **包括的情報**: 発音記号・例文付きで実践的

## 🎨 UI/UX デザイン

### カラーパレット
- **Basic**: 緑系（初級者向け）
- **Intermediate**: 黄系（中級者向け）  
- **Advanced**: 赤系（上級者向け）
- **メイン**: 青・紫のグラデーション

### インタラクション
- **カードフリップ**: スムーズなトランジション
- **ホバー効果**: ボタンとカードの反応
- **プログレス表示**: リアルタイム進捗更新

## 📊 データサンプル

15個のTOEIC頻出単語を収録:
- **ビジネス語彙**: revenue, budget, negotiate
- **学術用語**: analyze, implement, strategy  
- **日常業務**: schedule, conference, proposal

## 🔄 今後の拡張可能性

1. **学習記録**: 正答率・学習時間の記録
2. **カテゴリ分け**: 分野別単語グループ
3. **音声再生**: 発音確認機能
4. **復習システム**: 間違った単語の再出題
5. **難易度調整**: ユーザーレベルに応じた出題

## 📚 参考・引用

- **データソース**: TOEIC公式単語リスト参考
- **UI参考**: 人気の語学学習アプリのUXパターン
- **アルゴリズム**: Fisher-Yates shuffle（均等なランダム化）

---

**開発時間**: 約3時間  
**ファイル数**: 8ファイル（コンポーネント2、データ1、型定義1、レイアウト1、メインページ1、学習記録1、インデックス1）  
**学習効果**: ⭐⭐⭐⭐☆
