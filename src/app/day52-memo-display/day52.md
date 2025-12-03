# Day 52: メモ表示アプリ - Next.js + Go API連携

## 概要

Day 52では、Day 51で作成したGo API（メモ保存アプリのバックエンド）をNext.jsフロントエンドから呼び出し、メモ一覧と詳細を表示するアプリを作成しました。

このプロジェクトでは、**外部APIとの連携**、**データフェッチング**、**状態管理**、**エラーハンドリング**の基本を学習します。

## 学習ポイント

### 1. 外部APIへのデータフェッチング

```typescript
const fetchMemos = async () => {
  const response = await fetch(`${API_BASE_URL}/api/memos`);
  const data: Memo[] = await response.json();
  setMemos(data || []);
};
```

**ポイント:**
- `fetch` APIを使ってGoサーバーからデータを取得
- `async/await`で非同期処理を扱う
- レスポンスをJSON形式でパース

### 2. useEffectフックを使った状態管理

```typescript
const [memos, setMemos] = useState<Memo[]>([]);
const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
```

**ポイント:**
- `useState`で複数の状態を管理
- 型安全性を保つためにTypeScriptの型を指定
- ローディング状態とエラー状態も管理

### 3. useEffectでコンポーネントマウント時の処理

```typescript
useEffect(() => {
  fetchMemos();
}, []);
```

**ポイント:**
- コンポーネントがマウントされた時に自動的にメモ一覧を取得
- 依存配列が空なので、マウント時のみ実行

### 4. エラーハンドリング

```typescript
try {
  const response = await fetch(`${API_BASE_URL}/api/memos`);
  if (!response.ok) {
    throw new Error("メモの取得に失敗しました");
  }
  // 成功時の処理
} catch (err) {
  setError("メモの取得に失敗しました");
  console.error("エラー:", err);
}
```

**ポイント:**
- `try-catch`でエラーを捕捉
- レスポンスの`ok`プロパティで成功/失敗を判定
- ユーザーに分かりやすいエラーメッセージを表示

### 5. 条件付きレンダリング

```typescript
{loading && memos.length === 0 ? (
  <div>読み込み中...</div>
) : memos.length === 0 ? (
  <div>メモがまだありません</div>
) : (
  <div>{/* メモ一覧 */}</div>
)}
```

**ポイント:**
- 三項演算子で条件に応じた表示を切り替え
- ローディング中、データなし、データありの3つの状態を処理

### 6. イベントハンドリング

```typescript
onClick={() => fetchMemoDetail(memo.id)}
```

**ポイント:**
- クリックイベントでメモ詳細を取得
- アロー関数でイベントハンドラを定義

## コードの流れ

1. **コンポーネントマウント時**
   - `useEffect`が実行され、`fetchMemos()`が呼ばれる
   - Go APIからメモ一覧を取得
   - `setMemos()`で状態を更新

2. **メモ一覧の表示**
   - `memos`配列を`map`でループ
   - 各メモをカード形式で表示

3. **メモ詳細の取得**
   - メモカードをクリック
   - `fetchMemoDetail()`が呼ばれる
   - Go APIから指定IDのメモを取得
   - `setSelectedMemo()`で選択中のメモを更新

4. **エラー処理**
   - API呼び出しが失敗した場合、エラーメッセージを表示
   - ユーザーに状況を伝える

## 使用しているAPI

### GET /api/memos
- **説明**: 全メモを取得
- **レスポンス**: メモの配列

### GET /api/memos/:id
- **説明**: 指定IDのメモを取得
- **パラメータ**: `id` (メモのID)
- **レスポンス**: メモオブジェクト

## 実装のポイント

### シンプルな構造
- 1つのコンポーネントで完結
- 状態管理も最小限
- 学習しやすいコード構造

### 型安全性
- TypeScriptの型定義を活用
- コンパイル時にエラーを検出

### ユーザビリティ
- ローディング状態の表示
- エラーメッセージの表示
- 再読み込みボタン

## 次のステップ

- Day 53: メモの更新・削除機能を追加
- Day 54: フロントエンドに編集・削除UIを実装

## まとめ

Day 52では、Next.jsからGo APIを呼び出してデータを表示する基本的な流れを学習しました。このパターンは、フロントエンドとバックエンドを連携させる際の基本となります。

**重要なポイント:**
- 非同期処理（`async/await`）
- 状態管理（`useState`）
- エラーハンドリング
- 条件付きレンダリング

これらの概念を理解することで、より複雑なアプリケーション開発の基礎が身につきます。

