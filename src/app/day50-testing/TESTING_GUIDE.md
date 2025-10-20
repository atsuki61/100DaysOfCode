# 🧪 テスト完全ガイド - ゼロから学ぶフロントエンドテスト

> **対象**: プログラミング初心者、テストを書いたことがない学生向け

---

## 📚 目次

1. [テストとは何か？](#1-テストとは何か)
2. [なぜテストが必要なのか？](#2-なぜテストが必要なのか)
3. [テストの種類](#3-テストの種類)
4. [Jest とは？](#4-jest-とは)
5. [React Testing Library とは？](#5-react-testing-library-とは)
6. [テストの基本構造](#6-テストの基本構造)
7. [実践：Counter のテストを理解する](#7-実践counter-のテストを理解する)
8. [よく使う関数一覧](#8-よく使う関数一覧)
9. [テストを書く手順](#9-テストを書く手順)
10. [つまづきやすいポイント](#10-つまづきやすいポイント)

---

## 1. テストとは何か？

### 🤔 簡単に言うと

**テスト = プログラムが正しく動くか自動で確認すること**

### 例え話

あなたが計算機アプリを作ったとします。

**手動テスト（今までのやり方）**:
```
1. ブラウザを開く
2. 「2」をクリック
3. 「+」をクリック
4. 「3」をクリック
5. 「=」をクリック
6. 結果が「5」になっているか目で確認
```

**自動テスト（これから学ぶ）**:
```javascript
test('2 + 3 = 5 になる', () => {
  // テストコードが自動でチェックしてくれる！
})
```

### メリット

- ⚡ **高速**: 何度でも一瞬で確認できる
- 🔄 **繰り返し**: 何百回でも実行できる
- 🛡️ **安心**: 修正しても他の機能が壊れていないか確認できる

---

## 2. なぜテストが必要なのか？

### 🎯 実際の開発現場で起こること

#### シナリオ 1: バグの発見

```javascript
// ❌ テストなし
function add(a, b) {
  return a - b  // バグ！足し算なのに引き算
}

// 問題: 実際に使ってみないと気づかない
```

```javascript
// ✅ テストあり
test('足し算が正しく動く', () => {
  expect(add(2, 3)).toBe(5)  // ❌ テスト失敗！バグ発見！
})
```

#### シナリオ 2: 修正による影響

```javascript
// Aさんがログイン機能を修正
// → 知らない間に登録機能が壊れた！

// ✅ テストがあれば
// → すぐに「登録機能のテストが失敗しました」と教えてくれる
```

---

## 3. テストの種類

### 🏗️ ピラミッド型の理解

```
        /\
       /  \      ← E2E テスト（少ない）
      /----\       実際のユーザー操作をシミュレート
     /      \    
    /--------\   ← 統合テスト（中くらい）
   /          \    複数の機能を組み合わせてテスト
  /------------\
 /--------------\ ← ユニットテスト（たくさん）
/________________\  個々の小さな機能をテスト
```

### 1️⃣ ユニットテスト

**一つの関数やコンポーネントだけ**をテスト

```javascript
// ✅ ユニットテスト
test('足し算関数が正しく動く', () => {
  expect(add(2, 3)).toBe(5)
})
```

**メリット**: 速い、書きやすい、問題箇所を特定しやすい

### 2️⃣ 統合テスト

**複数の機能を組み合わせて**テスト

```javascript
// ✅ 統合テスト
test('フォームに入力して送信すると成功メッセージが表示される', () => {
  // 1. 名前を入力
  // 2. メールを入力
  // 3. 送信ボタンをクリック
  // 4. 成功メッセージが出るか確認
})
```

**メリット**: 実際の使い方に近い、複数機能の連携を確認できる

### 3️⃣ E2E テスト

**実際のブラウザで**ユーザーの操作全体をテスト

```javascript
// E2E テスト（今回は扱いません）
// - ブラウザを開く
// - ログインする
// - 商品を選ぶ
// - カートに入れる
// - 購入する
```

---

## 4. Jest とは？

### 🃏 Jest = テストを実行するツール

**公式サイト**: https://jestjs.io/

### 何ができるの？

```javascript
// Jest が提供する機能

// 1. テストの実行
npm test

// 2. テストの書き方
test('説明', () => {
  // テストコード
})

// 3. 結果の検証
expect(結果).toBe(期待値)
```

### イメージ

```
あなた: テストコードを書く人
Jest: テストを実行してくれる先生

Jest「テストを始めます！」
Jest「✅ テスト1: 成功」
Jest「✅ テスト2: 成功」
Jest「❌ テスト3: 失敗（期待: 5、実際: 3）」
```

---

## 5. React Testing Library とは？

### 🎯 RTL = React コンポーネントをテストするツール

**公式サイト**: https://testing-library.com/react

### 哲学

> **「ユーザーの視点」でテストを書く**

```javascript
// ❌ 内部実装に依存
expect(component.state.count).toBe(5)

// ✅ ユーザーが見るものをテスト
expect(screen.getByText('5')).toBeInTheDocument()
```

### 何ができるの？

1. **コンポーネントを表示**
2. **要素を見つける**
3. **ユーザー操作をシミュレート**
4. **結果を確認**

---

## 6. テストの基本構造

### 📝 テストの書き方

```javascript
// 基本の形
test('テストの説明', () => {
  // 1. 準備 (Arrange)
  // 2. 実行 (Act)
  // 3. 確認 (Assert)
})
```

### 実例

```javascript
test('ボタンをクリックすると数が増える', () => {
  // 1. 準備: コンポーネントを表示
  render(<Counter />)
  
  // 2. 実行: ボタンをクリック
  const button = screen.getByRole('button', { name: '+' })
  fireEvent.click(button)
  
  // 3. 確認: 数が増えたか
  expect(screen.getByText('1')).toBeInTheDocument()
})
```

---

## 7. 実践：Counter のテストを理解する

### 🎮 Counter コンポーネント

```javascript
// Counter.tsx
function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
```

### テスト 1: 初期値のテスト

```javascript
test('初期値として0が表示される', () => {
  // 1️⃣ 準備: Counter を画面に表示
  render(<Counter />)
  
  // 2️⃣ 確認: 「0」というテキストが表示されているか
  expect(screen.getByText('0')).toBeInTheDocument()
})
```

**一行ずつ解説**:

```javascript
render(<Counter />)
```
→ 「Counter コンポーネントを仮想的な画面に表示してください」

```javascript
screen.getByText('0')
```
→ 「画面から『0』というテキストを探してください」

```javascript
.toBeInTheDocument()
```
→ 「画面に存在しますか？」

### テスト 2: ボタンクリックのテスト

```javascript
test('+ ボタンをクリックすると値が1増える', () => {
  // 1️⃣ 準備: Counter を表示
  render(<Counter />)
  
  // 2️⃣ 実行: ボタンを探す
  const button = screen.getByRole('button', { name: '+' })
  
  // 3️⃣ 実行: ボタンをクリック
  fireEvent.click(button)
  
  // 4️⃣ 確認: 「1」が表示されているか
  expect(screen.getByText('1')).toBeInTheDocument()
})
```

**一行ずつ解説**:

```javascript
screen.getByRole('button', { name: '+' })
```
→ 「『+』という名前のボタンを探してください」

```javascript
fireEvent.click(button)
```
→ 「そのボタンをクリックしてください」

---

## 8. よく使う関数一覧

### 🔍 要素を探す関数

| 関数 | 使い方 | いつ使う？ |
|------|--------|-----------|
| `getByText` | `screen.getByText('送信')` | テキストで探す |
| `getByRole` | `screen.getByRole('button')` | ボタン、見出しなどを探す |
| `getByLabelText` | `screen.getByLabelText('名前')` | フォームのラベルから探す |
| `getByPlaceholderText` | `screen.getByPlaceholderText('メールアドレス')` | プレースホルダーから探す |
| `getByTestId` | `screen.getByTestId('count')` | data-testid で探す |

### ✅ 確認する関数

| 関数 | 意味 | 例 |
|------|------|-----|
| `toBeInTheDocument()` | 画面に存在する | `expect(button).toBeInTheDocument()` |
| `toBe()` | 値が一致する | `expect(count).toBe(5)` |
| `toHaveValue()` | 入力欄の値 | `expect(input).toHaveValue('test')` |
| `toHaveTextContent()` | テキスト内容 | `expect(div).toHaveTextContent('Hello')` |
| `toBeChecked()` | チェックされている | `expect(checkbox).toBeChecked()` |

### 🎭 ユーザー操作の関数

| 関数 | 何をする？ | 例 |
|------|-----------|-----|
| `fireEvent.click(button)` | クリック | ボタンを押す |
| `fireEvent.change(input, { target: { value: 'text' } })` | 入力 | テキストを入力 |
| `userEvent.type(input, 'text')` | タイピング | より実際に近い入力 |
| `userEvent.click(button)` | クリック | より実際に近いクリック |

---

## 9. テストを書く手順

### 📋 ステップバイステップ

#### ステップ 1: テスト対象を決める

```
例: 「ログインフォームをテストしたい」
```

#### ステップ 2: 何をテストするか決める

```
✅ メールアドレスを入力できる
✅ パスワードを入力できる
✅ 送信ボタンをクリックできる
✅ 空のまま送信するとエラーが出る
```

#### ステップ 3: 一つずつテストを書く

```javascript
// テスト1
test('メールアドレスを入力できる', () => {
  render(<LoginForm />)
  const emailInput = screen.getByLabelText('メールアドレス')
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
  expect(emailInput).toHaveValue('test@example.com')
})

// テスト2
test('空のまま送信するとエラーが出る', () => {
  render(<LoginForm />)
  const submitButton = screen.getByRole('button', { name: '送信' })
  fireEvent.click(submitButton)
  expect(screen.getByText('メールアドレスは必須です')).toBeInTheDocument()
})
```

#### ステップ 4: テストを実行

```bash
npm test
```

#### ステップ 5: 結果を確認

```
✅ 成功 → OK！
❌ 失敗 → コードを修正 → 再度テスト
```

---

## 10. つまづきやすいポイント

### ❓ Q1: 要素が見つからない

```javascript
// ❌ エラー: Unable to find element
const button = screen.getByText('送信')
```

**原因と解決策**:

```javascript
// 1. 大文字小文字が違う
screen.getByText('送信')  // ❌
screen.getByText('送信')  // ✅

// 2. まだ表示されていない（非同期）
const button = await screen.findByText('送信')  // ✅ findBy を使う

// 3. 実際には存在しない
// → ブラウザで確認して、正しいテキストを探す
```

### ❓ Q2: 非同期処理のテスト

```javascript
// ❌ これだとエラー
test('ボタンを押すとメッセージが出る', () => {
  render(<Component />)
  fireEvent.click(button)
  expect(screen.getByText('成功！')).toBeInTheDocument()  // まだ表示されてない！
})

// ✅ 正しい書き方
test('ボタンを押すとメッセージが出る', async () => {
  render(<Component />)
  fireEvent.click(button)
  const message = await screen.findByText('成功！')  // 表示されるまで待つ
  expect(message).toBeInTheDocument()
})
```

### ❓ Q3: どの関数を使えばいい？

**迷ったら、この優先順位で選ぶ**:

1. `getByRole` ← **最優先**（アクセシビリティにも良い）
2. `getByLabelText` ← フォーム要素に最適
3. `getByPlaceholderText` ← ラベルがない場合
4. `getByText` ← 普通のテキストを探す
5. `getByTestId` ← 最終手段

```javascript
// ✅ 良い例
const button = screen.getByRole('button', { name: '送信' })

// ⚠️ あまり良くない
const button = screen.getByTestId('submit-button')
```

---

## 🎓 学習の進め方

### 初心者におすすめの順番

1. **Week 1**: このガイドを読む
2. **Week 2**: Counter.test.tsx を写経する
3. **Week 3**: UserForm.test.tsx を写経する
4. **Week 4**: 自分で簡単なテストを書いてみる

### 📚 さらに学ぶためのリソース

- [Jest 公式ドキュメント（日本語）](https://jestjs.io/ja/)
- [Testing Library 公式チュートリアル](https://testing-library.com/docs/react-testing-library/intro/)
- [Kent C. Dodds のブログ](https://kentcdodds.com/blog)（英語だけど分かりやすい）

---

## 🤝 よくある質問

### Q: テストは全部書かないとダメ？

A: **いいえ！** 重要な機能だけでOK。最初は：
- ログイン機能
- 決済機能
- データ保存機能
など、「壊れたら困る」ものから始める。

### Q: テストを書くのに時間がかかる...

A: 最初は普通です！慣れると：
- 開発時間: 10分
- テスト時間: 5分
くらいになります。

### Q: 100% カバレッジを目指すべき？

A: **いいえ！** 70-80% で十分。重要なのは：
- 重要な機能がテストされているか
- バグを防げているか

---

## 🎉 まとめ

### テストとは

- プログラムが正しく動くか**自動で確認**すること
- 手動テストより**速くて確実**
- バグを**早期に発見**できる

### 基本の流れ

```javascript
// 1. 準備
render(<Component />)

// 2. 実行
fireEvent.click(button)

// 3. 確認
expect(result).toBe(expected)
```

### 大切なこと

- ✅ ユーザーの視点で書く
- ✅ 小さく始める
- ✅ 失敗を恐れない

---

## 💪 練習問題

### レベル 1: Counter をテストしてみよう

```javascript
// あなたのタスク: このテストを完成させてください

test('- ボタンをクリックすると値が減る', () => {
  render(<Counter />)
  
  // TODO: ボタンを探す
  const button = screen.getByRole(/* ここを埋める */)
  
  // TODO: クリックする
  fireEvent./* ここを埋める */
  
  // TODO: 結果を確認
  expect(screen.getByText(/* ここを埋める */)).toBeInTheDocument()
})
```

### レベル 2: フォームをテストしてみよう

```javascript
// あなたのタスク: 名前入力フォームのテストを書いてください

test('名前を入力できる', () => {
  // ここから書いてみよう！
})
```

---

## 🌟 最後に

テストは最初は難しく感じるかもしれませんが、**一度身につけば一生使えるスキル**です。

小さな成功体験を積み重ねて、少しずつ慣れていきましょう！

**頑張ってください！ 🚀**

---

**作成日**: 2025年10月20日  
**対象**: Day 50 - フロントエンドテスト入門  
**レベル**: 初級〜中級

