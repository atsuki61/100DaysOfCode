---
title: Day 34 - 英単語当てゲーム (ハングマン)
description: 文字列・配列操作、ユーザー入力判定ロジック、状態管理を学ぶ
---

# Day 34 - 英単語当てゲーム (ハングマン)

この日は、英単語を一文字ずつ推測して当てる「ハングマン」を実装しました。キーボード入力とオンスクリーンキーボードの両方に対応し、状態に基づく表示切り替えとゲームロジックを整理して作っています。

## 学習ポイント（詳説）

1. 状態設計と思考の流れ
   - 必要な状態は以下に分解:
     - `answer`: 出題単語（固定配列から乱択）
     - `guessedLetters`: 推測済み文字の集合（`Set<string>`）
     - `wrongGuesses`: ミス回数（最大値で敗北判定）
   - 勝敗判定は「導出状態（派生）」として `useMemo` に分離し、UIレンダリングの根拠を明確化。

2. Set を使う理由と注意
   - 推測文字の重複登録を防ぎ、`O(1)` で含有判定が可能。
   - React では `Set` を直接ミューテートせず、新しい `Set` を生成して渡す（不変性の担保）。

3. 導出値のメモ化（`useMemo`）
   - マスク表示（`maskedWord`）やステータス（`won/lost/playing`）は、入力（`answer`, `guessedLetters`, `wrongGuesses`）が変わる時のみ再計算。
   - 冗長な再レンダリングと無駄な計算を抑制。

4. 入力ハンドリング（キーボード + クリック）
   - `onKeyDown` で `[a-z]` のみ許可。`tabIndex={0}` を付与してフォーカス可能に。
   - 画面上のキーボードでは、すでに使った文字とゲーム終了時に `disabled` を適用。

5. 描画の段階的更新（SVG）
   - ミス回数に応じて SVG の各パーツを条件付きレンダリング。
   - UI の段階表現は「進捗の可視化」として理解が進む良い題材。

6. 型安全性とリーダビリティ
   - `GameStatus` をユニオン型で定義し、分岐の漏れを抑止。
   - 変数名は役割が伝わる語を選ぶ（可読性向上）。

## つまずきやすいポイントと対処

1. `Set` の更新で再レンダリングされない
   - 既存の `Set` に `.add()` するのではなく、`new Set(prev).add(letter)` のように新規インスタンスを返す。

2. フォーカスが外れて `onKeyDown` が動かない
   - ルート要素に `tabIndex={0}` を設定し、クリックでフォーカスしてからタイプする運用に。
   - 代替として `window.addEventListener('keydown', ...)` もあるが、クリーンアップが必要で扱いが増える。

3. 勝敗の境界条件
   - 「勝利」優先か「敗北」優先かを明確に。今回は「全て判明→勝ち」「ミスが上限→負け」の順で評価。

## 発展課題

- ヒント機能（未使用文字の中から1つ開示）
- 単語カテゴリや難易度（文字数、上限ミス）
- スコアリング（勝利時の残りミスに応じた加点）と履歴保存（localStorage）
- 多言語化（UIテキストの i18n 化）

## 主要コード抜粋

```tsx
// 勝敗判定の導出
const status: GameStatus = useMemo(() => {
  const allRevealed = answer.split('').every((ch) => guessedLetters.has(ch));
  if (allRevealed) return 'won';
  if (wrongGuesses >= maxWrong) return 'lost';
  return 'playing';
}, [answer, guessedLetters, wrongGuesses]);
```

```tsx
// Set の不変更新
setGuessedLetters((prev) => new Set(prev).add(letter));
```

---

この題材は、条件分岐ロジックと UI の連動、導出状態の設計、入力イベントの扱いを一通り実践できます。ゲームとしてもフィードバックが明快で学習効果が高いです。


