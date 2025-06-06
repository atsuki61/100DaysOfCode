# 銀フレ（TOEIC L&R TEST 出る単特急 銀のフレーズ）単語データ

## 📚 概要

このフォルダには「TOEIC L&R TEST 出る単特急 銀のフレーズ」に収録されている単語データが整理されています。  
**銀フレは TOEIC 300-600点レベルの学習者を対象とした単語集**です。

## 📁 フォルダ構成

```
銀フレ/
├── word/                           # メイン単語データ
│   ├── 1~400 基礎の400語.txt       # 初級レベル（300-450点）
│   ├── 400~700 頻出の300語.txt     # 中級レベル（450-550点）  
│   ├── 701~900 必須の200語.txt     # 上級レベル（550-600点）
│   └── 901~1000 発展の100語.txt    # 最上級レベル（600点超）
├── Supplement/                     # 補完単語データ
│   ├── Supplement1 設問に出る単語・表現.txt
│   ├── Supplement2 パート1重要語50.txt
│   ├── Supplement3 注意すべき日常単語.txt
│   ├── Supplement4 前置詞・接続詞・接続副詞.txt
│   ├── Supplement5 部署・職業・専攻名.txt
│   └── Supplement6 定型表現100.txt
└── README.md                       # このファイル
```

## 🎯 レベル分類

### 基礎の400語（1-400）
- **対象レベル**: TOEIC 300-450点
- **特徴**: ビジネス英語の基本単語
- **学習目標**: 確実に覚えて基礎を固める

### 頻出の300語（401-700）  
- **対象レベル**: TOEIC 450-550点
- **特徴**: 頻繁に出題される重要単語
- **学習目標**: スコアアップの要となる語彙

### 必須の200語（701-900）
- **対象レベル**: TOEIC 550-600点  
- **特徴**: 600点突破に必要な語彙
- **学習目標**: 目標スコア達成への最終段階

### 発展の100語（901-1000）
- **対象レベル**: TOEIC 600点超（参考レベル）
- **特徴**: 600点を超えるための発展語彙
- **学習目標**: さらなる高得点を目指す上級者向け

## 📊 統計情報

| カテゴリ | 単語数 | 累積 | 対象レベル |
|---------|--------|------|-----------|
| 基礎の400語 | 400語 | 400語 | 300-450点 |
| 頻出の300語 | 300語 | 700語 | 450-550点 |
| 必須の200語 | 200語 | 900語 | 550-600点 |
| 発展の100語 | 100語 | 1000語 | 600点超 |
| **メイン合計** | **1000語** | - | - |
| Supplement1 | 25語 | - | 設問対策 |
| Supplement2 | 50語 | - | パート1対策 |
| Supplement3 | 50語 | - | 日常語彙 |
| Supplement4 | 41語 | - | 接続語 |
| Supplement5 | 100語 | - | 職業関連 |
| Supplement6 | 100語 | - | 定型表現 |
| **補完合計** | **366語** | - | - |
| **総合計** | **1366語** | - | - |

## 🔄 データ形式

各txtファイルは以下の形式で記録されています：

```
番号
通し番号 - 英単語



例：
1
001 - begin

2
002 - work
```

## 📝 活用方法

### 1. フラッシュカードアプリでの利用
- `ginFrame.ts` でReactアプリ用のデータに変換済み
- カテゴリ別の学習が可能
- 学習進捗の記録機能付き

### 2. レベル別学習
1. **初心者（300-450点目標）**: 基礎の400語から開始
2. **中級者（450-550点目標）**: 頻出の300語を重点学習  
3. **上級者（550-600点目標）**: 必須の200語をマスター
4. **発展学習（600点超目標）**: 発展の100語に挑戦

### 3. パート別対策
- **リスニング対策**: Supplement2（パート1重要語）
- **リーディング対策**: Supplement1（設問に出る単語）
- **語彙力強化**: Supplement3-6（関連語彙の拡充）

## 🎨 学習のコツ

### 効率的な学習順序
1. **基礎固め**: 1-400語（基礎）- TOEIC 300-450点
2. **スコアアップ**: 401-700語（頻出）- TOEIC 450-550点  
3. **目標達成**: 701-900語（必須）- TOEIC 550-600点
4. **さらなる向上**: 901-1000語（発展）- TOEIC 600点超

### 学習期間の目安
- **基礎の400語**: 2-3週間
- **頻出の300語**: 2-3週間  
- **必須の200語**: 1-2週間
- **発展の100語**: 1週間
- **Supplement**: 1-2週間

### 復習サイクル
- **1日目**: 新規20-30語
- **3日目**: 1回目復習
- **7日目**: 2回目復習  
- **30日目**: 3回目復習

### 記憶定着のポイント
- **音読**: 発音と一緒に覚える
- **例文**: 文脈での使用方法を理解
- **分類**: 品詞・テーマ別でグループ化
- **実践**: 模擬問題での活用

## 🔧 技術的な使用方法

### TypeScriptでの読み込み
```typescript
import { 
  basicWords,        // 基礎の400語
  frequentWords,     // 頻出の300語  
  essentialWords,    // 必須の200語
  advancedWords,     // 発展の100語
  allGinFrameWords   // 全単語統合
} from './ginFrame';
```

### カテゴリ別の学習
```typescript
// カテゴリ別学習モード
const currentCategory = 'basic'; // 'basic' | 'frequent' | 'essential' | 'advanced'
const wordsForCategory = ginFrameCategories[currentCategory];
```

## 📚 参考文献

- **書籍**: 「TOEIC L&R TEST 出る単特急 銀のフレーズ」
- **著者**: TEX加藤
- **出版社**: 朝日新聞出版
- **ISBN**: 978-4023315686
- **対象レベル**: TOEIC 300-600点

---

**Last Updated**: 2024年12月
**Data Version**: 1.0.0
**Status**: ✅ 整理完了 