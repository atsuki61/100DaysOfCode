# Day 10: 支出管理アプリ - 初心者向け解説

## はじめに
10日目のチャレンジでは、簡易的な「支出管理アプリ」を作成しました。このアプリでは、日々の収入と支出を記録し、現在の残高を自動で計算して表示できます。さらに、入力したデータがブラウザをリロードしても消えないように、`localStorage`という技術を使ってデータを保存する機能を実装しました。

このプロジェクトを通して、Reactにおける状態管理、コンポーネントの分割、そしてブラウザ機能との連携方法について実践的に学ぶことができます。

## 学習のポイント
- **`useState`フック**: 取引リストなど、動的に変化するデータをコンポーネント内で保持する方法。
- **`useEffect`フック**: コンポーネントのライフサイクル（初回表示時や更新時）に合わせて特定の処理（例: `localStorage`からのデータ読み込み）を実行する方法。
- **コンポーネント分割**: UIを「残高表示」「取引フォーム」「取引リスト」といった機能単位の部品（コンポーネント）に分け、それぞれを独立して管理する設計。
- **Propsによるデータ伝達**: 親コンポーネントから子コンポーネントへ、データや関数を渡す方法。
- **`localStorage`によるデータ永続化**: ユーザーのブラウザにデータを保存し、ページを再読み込みしてもデータが保持される仕組み。
- **クライアントサイドレンダリングの考慮**: `localStorage`など、ブラウザ環境でしか使えない機能をNext.jsで安全に扱うためのテクニック。

## ファイル構成
今回のアプリは、以下のファイルで構成されています。

```
src/app/day10-expense-tracker/
├── page.tsx          # アプリのメインページ
├── layout.tsx        # ページの共通レイアウト（ヘッダー・フッター）
├── types.ts          # TypeScriptの型定義ファイル
└── components/       # アプリ専用コンポーネント
    ├── ExpenseTracker.tsx  # 全体を統括するメインコンポーネント
    ├── Balance.tsx         # 残高、収入、支出の合計表示
    ├── TransactionList.tsx # 取引履歴のリスト
    ├── TransactionItem.tsx # 個々の取引項目
    └── TransactionForm.tsx # 新しい取引を追加するフォーム
```

## 中核となるロジックの解説

### 1. 状態管理 (`useState`)
このアプリの中心となるのは、取引のリストです。このリストを管理するために`useState`フックを使用しています。

`ExpenseTracker.tsx`内
```tsx
const [transactions, setTransactions] = useState<Transaction[]>([]);
```
- `transactions`: 現在の取引リスト（配列）が格納される状態変数。
- `setTransactions`: `transactions`を更新するための関数。この関数を使うことで、Reactに再描画を指示します。

### 2. データ永続化 (`useEffect` と `localStorage`)
入力したデータが消えないように、`localStorage`に保存します。これはブラウザが提供する簡単なキー・バリュー形式の保存領域です。

#### データの読み込み (初回表示時)
`useEffect`を使って、ページが最初に表示されたときに一度だけ`localStorage`からデータを読み込みます。

`ExpenseTracker.tsx`内
```tsx
useEffect(() => {
  // localStorageから'transactions'というキーで保存されたデータを取得
  const storedTransactions = localStorage.getItem('transactions');
  if (storedTransactions) {
    // データがあれば、JSON文字列からJavaScriptの配列に戻して状態を更新
    setTransactions(JSON.parse(storedTransactions));
  }
}, []); // 第2引数の配列が空なので、この処理は初回レンダリング時に1回だけ実行される
```

#### データの保存 (取引リスト更新時)
もう一つの`useEffect`を使い、`transactions`の状態が変化するたびに、その最新のリストを`localStorage`に保存します。

`ExpenseTracker.tsx`内
```tsx
useEffect(() => {
  // 'transactions'の状態をJSON文字列に変換してlocalStorageに保存
  localStorage.setItem('transactions', JSON.stringify(transactions));
}, [transactions]); // 第2引数にtransactionsを指定。transactionsが変更されるたびに実行
```

#### クライアントサイドでの実行を保証
`localStorage`はブラウザにしか存在しないため、サーバーサイドでレンダリングされる可能性があるNext.jsでは注意が必要です。そこで、「クライアント（ブラウザ）で実行されているか」を判定するための状態`isClient`を用意し、`localStorage`を安全に扱っています。

`ExpenseTracker.tsx`内
```tsx
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true); // 初回レンダリング後、クライアントで実行されたらtrueにする
}, []);

if (!isClient) {
  return <div className="text-center p-10">Loading...</div>; // サーバーではローディング表示
}

// isClientがtrueになった後、以下のコンポーネントが表示される
return (
  // ...
);
```

### 3. 取引の追加と削除
- **追加**: `TransactionForm`で入力されたデータを元に、新しい取引オブジェクトを作成し、`setTransactions`を使ってリストの先頭に追加します。
- **削除**: `TransactionList`内の各`TransactionItem`にある削除ボタンがクリックされたら、その取引の`id`を元にリストから該当の取引をフィルタリングで除外して状態を更新します。

## まとめ
10日目は、Reactの基本的なフックを組み合わせ、実用的なアプリケーションを作成する良い練習となりました。特に、コンポーネントを適切に分割し、それぞれに役割を持たせることの重要性や、`localStorage`を使ってユーザー体験を向上させる方法を学べた点が大きな収穫です。

この構造を理解すれば、より複雑なアプリケーションにも応用していくことができます。
