# Day 50: フロントエンドテスト入門（Jest + React Testing Library）

## 概要

このプロジェクトでは、Jest と React Testing Library を使用して、React コンポーネントのテストを作成する方法を学びます。ユニットテスト、統合テスト、ユーザーイベントのテストなど、フロントエンド開発に不可欠なテスト手法を実践します。

![Day 50 Preview](/images/no-image.svg)

## 学習内容

### フロントエンド
- ✅ Jest の導入と設定
- ✅ React Testing Library の基本
- ✅ ユニットテストの作成
- ✅ 統合テストの作成
- ✅ ユーザーイベントのテスト
- ✅ テストカバレッジの確認
- ✅ モックとアサーション
- ✅ スナップショットテスト

### バックエンド（Go）
- ✅ ロギングミドルウェアの作成
- ✅ リカバリーミドルウェアの実装
- ✅ CORS ミドルウェアの実装
- ✅ カスタム ResponseWriter の作成

## プロジェクト構成

```
src/app/day50-testing/
├── page.tsx                        # メインページ
├── components/
│   ├── Counter.tsx                 # カウンターコンポーネント
│   ├── UserForm.tsx                # ユーザーフォームコンポーネント
│   ├── TodoList.tsx                # Todo リストコンポーネント
│   └── __tests__/
│       ├── Counter.test.tsx        # Counter のテスト
│       ├── UserForm.test.tsx       # UserForm のテスト
│       └── TodoList.test.tsx       # TodoList のテスト
└── README.md

server/
├── main.go                         # Go サーバー
└── middleware/
    └── logging.go                  # ミドルウェア実装
```

## 使用技術

- **フロントエンド**: React, Next.js, TypeScript, TailwindCSS
- **テスト**: Jest, React Testing Library, @testing-library/user-event
- **バックエンド**: Go (標準ライブラリ)

## セットアップ

### 1. 依存関係のインストール

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest
```

### 2. Jest の設定

`jest.config.js` と `jest.setup.js` が自動的に設定されています。

## テストの実行方法

### すべてのテストを実行

```bash
npm test
```

### ウォッチモードで実行

```bash
npm run test:watch
```

### カバレッジレポートを生成

```bash
npm run test:coverage
```

## テストコンポーネント

### 1. Counter コンポーネント

シンプルなカウンターアプリで以下をテスト：
- 初期値の表示
- インクリメント機能
- デクリメント機能
- リセット機能
- 複数操作の組み合わせ

**テスト数**: 6 個

### 2. UserForm コンポーネント

ユーザー登録フォームで以下をテスト：
- フォーム要素のレンダリング
- 入力フィールドの操作
- バリデーションエラーの表示
- 成功時の送信処理
- アクセシビリティ（role 属性）

**テスト数**: 10 個

### 3. TodoList コンポーネント

Todo リストアプリで以下をテスト：
- 空の状態の表示
- Todo の追加（ボタン/Enterキー）
- Todo の完了/未完了切り替え
- Todo の削除
- 統計情報の表示
- 複数 Todo の管理

**テスト数**: 13 個

## Jest と React Testing Library の主要概念

### 1. レンダリング

```typescript
import { render, screen } from '@testing-library/react'

render(<MyComponent />)
```

### 2. 要素の取得

```typescript
// テキストで検索
screen.getByText('送信')

// ラベルで検索
screen.getByLabelText('ユーザー名')

// Role で検索
screen.getByRole('button', { name: '追加' })

// TestId で検索
screen.getByTestId('count-value')
```

### 3. ユーザーイベント

```typescript
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()
await user.click(button)
await user.type(input, 'テキスト')
```

### 4. アサーション

```typescript
expect(element).toBeInTheDocument()
expect(element).toHaveTextContent('Hello')
expect(element).toHaveValue('test')
expect(checkbox).toBeChecked()
```

### 5. 非同期テスト

```typescript
// 要素が表示されるまで待つ
const message = await screen.findByText('成功！')

// 条件が満たされるまで待つ
await waitFor(() => {
  expect(screen.getByText('送信成功！')).toBeInTheDocument()
})
```

## Go ミドルウェア

### ロギングミドルウェア

すべての HTTP リクエストをログに記録：
- メソッド
- パス
- ステータスコード
- レスポンス時間
- クライアント IP

### リカバリーミドルウェア

パニックから回復し、500 エラーを返す

### CORS ミドルウェア

Cross-Origin Resource Sharing を有効にする

### 使用方法

```bash
cd server
go run main.go
```

サーバーが起動したら、`http://localhost:8080/hello` にアクセスしてログを確認できます。

## テストのベストプラクティス

1. **意味のあるテスト名**: テストの内容が一目でわかる名前を付ける
2. **独立したテスト**: 各テストは他のテストに依存しない
3. **ユーザーの視点**: ユーザーが実際に操作するようにテストを書く
4. **アクセシビリティ**: role や aria-label を使って要素を取得
5. **非同期処理**: findBy や waitFor を適切に使用

## テストカバレッジ

現在のテストカバレッジ：
- **Counter**: 100%
- **UserForm**: 100%
- **TodoList**: 100%

## 今後の拡張案

- [ ] E2E テスト（Playwright / Cypress）
- [ ] ビジュアルリグレッションテスト
- [ ] パフォーマンステスト
- [ ] API モックの高度な利用
- [ ] Redux / Context のテスト

## 参考リンク

- [Jest 公式ドキュメント](https://jestjs.io/)
- [React Testing Library 公式ドキュメント](https://testing-library.com/react)
- [Testing Library クエリの優先順位](https://testing-library.com/docs/queries/about#priority)
- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 作成日

2025年10月20日

## コミット推奨タイミング

1. ✅ **Jest + React Testing Library のセットアップ**
   ```
   feat(day50): Jest と React Testing Library をセットアップ
   ```

2. ✅ **コンポーネントとテストの作成**
   ```
   feat(day50): Counter, UserForm, TodoList コンポーネントとテストを作成
   ```

3. ✅ **Go ミドルウェアの実装**
   ```
   feat(day50): Go のロギング・リカバリー・CORS ミドルウェアを実装
   ```

4. ✅ **ドキュメントの作成**
   ```
   docs(day50): README とテストドキュメントを作成
   ```

