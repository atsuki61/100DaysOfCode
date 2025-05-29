## はじめに

Day6:Reactでストップウォッチアプリを作成しました！

## 完成したアプリの機能

- ⏱️ 精密な時間計測（10ms間隔での更新）
- ▶️ 開始・停止機能
- 🔄 リセット機能
- 📊 分:秒.センチ秒形式での時間表示
- 🎯 視覚的な動作状態表示
- 📱 レスポンシブデザイン対応

## 1. データ構造の設計

ストップウォッチで管理する状態を定義します。

```typescript
const [time, setTime] = useState(0)              // 経過時間（ミリ秒）
const [isRunning, setIsRunning] = useState(false) // 動作状態
const intervalRef = useRef<NodeJS.Timeout | null>(null) // インターバルID保持
```

この3つの状態が、ストップウォッチの核となります。`time`は実際の経過時間、`isRunning`は現在動作中かどうか、`intervalRef`はタイマーを制御するためのIDを保持します。

🎯 **設計のポイント**
- **`time`**: ミリ秒単位で管理（精密な時間計測のため）
- **`isRunning`**: boolean型で動作状態を管理
- **`intervalRef`**: useRefでインターバルIDを保持（メモリリーク防止）

## 2. タイマー処理の核心（useEffect）

ストップウォッチの心臓部となるタイマー処理です。

```typescript
useEffect(() => {
  if (isRunning) {
    // タイマー開始
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 10)  // 10ms間隔で時間を加算
    }, 10)
  } else {
    // タイマー停止
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // クリーンアップ関数（重要！）
  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }
}, [isRunning])  // isRunningが変化したときに実行
```

これがストップウォッチの「エンジン」部分です。`isRunning`がtrueになるとタイマーが開始され、falseになると停止します。`useEffect`の依存配列に`[isRunning]`を指定することで、この状態が変化したときのみ実行されます。

### 🔍 詳細解説

**`setInterval`の仕組み**
```typescript
// setIntervalは定期実行のIDを返す
const intervalId = setInterval(() => {
  console.log('10ms経過')
}, 10)

// 停止するときはIDを使ってclearInterval
clearInterval(intervalId)
```

`setInterval`は「定期的に関数を実行する」ための仕組みです。第1引数に実行したい関数、第2引数に間隔（ミリ秒）を指定します。

**なぜ10ms間隔？**
- **精密さ**: 1ms間隔では負荷が高すぎる
- **滑らかさ**: 100ms間隔では動きがカクカクする
- **バランス**: 10msは精密さとパフォーマンスの良いバランス

### 🚨 クリーンアップ関数の重要性

```typescript
// ❌ クリーンアップなしの場合
useEffect(() => {
  setInterval(() => {
    // タイマー処理
  }, 10)
}, [isRunning])
// → コンポーネントが消えてもタイマーが残り続ける（メモリリーク）

// ✅ クリーンアップありの場合
useEffect(() => {
  const intervalId = setInterval(() => {
    // タイマー処理
  }, 10)
  
  return () => clearInterval(intervalId)  // 必ずクリーンアップ
}, [isRunning])
```

クリーンアップ関数は、コンポーネントが「お片付け」をするために必要です。これがないと、ページを離れてもタイマーが動き続けてしまいます。

## 3. useRefによる値の保持

通常の変数とuseRefの違いを理解しましょう。

```typescript
// ❌ 通常の変数では失敗
let intervalId = null
useEffect(() => {
  intervalId = setInterval(/* ... */)  // 再レンダリング時に値が失われる
}, [isRunning])

// ✅ useRefなら成功
const intervalRef = useRef(null)
useEffect(() => {
  intervalRef.current = setInterval(/* ... */)  // 値が保持される
}, [isRunning])
```

通常の変数だと、コンポーネントが再レンダリングされるたびに値がリセットされてしまいます。`useRef`を使うことで、値を「記憶」し続けることができます。

### 🎯 useRefの特徴

```typescript
const myRef = useRef(initialValue)

// 特徴1: 値が再レンダリング間で保持される
myRef.current = 'new value'  // 値を変更

// 特徴2: 変更してもコンポーネントは再レンダリングされない
myRef.current = 'another value'  // 再レンダリングは発生しない

// 特徴3: DOM要素への参照にも使える
const inputRef = useRef(null)
<input ref={inputRef} />
```

`useRef`は「箱」のようなもので、`.current`でその中身にアクセスできます。中身を変更しても画面は更新されません。

## 4. 時間フォーマット関数

ミリ秒を読みやすい形式に変換します。

```typescript
const formatTime = (timeInMs: number) => {
  const totalSeconds = Math.floor(timeInMs / 1000)        // 総秒数
  const minutes = Math.floor(totalSeconds / 60)           // 分
  const seconds = totalSeconds % 60                       // 秒
  const centiseconds = Math.floor((timeInMs % 1000) / 10) // センチ秒

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`
}
```

この関数は「数字の魔法」を使って、65430ミリ秒を「01:05.43」という見やすい形式に変換します。計算の順序が重要で、大きな単位から順番に計算していきます。

### 🧮 計算の具体例

```typescript
// 例: 65,430ms（1分5秒43センチ秒）の場合

// ステップ1: 総秒数を計算
totalSeconds = Math.floor(65430 / 1000) = Math.floor(65.43) = 65

// ステップ2: 分を計算
minutes = Math.floor(65 / 60) = Math.floor(1.08) = 1

// ステップ3: 秒を計算（余り）
seconds = 65 % 60 = 5

// ステップ4: センチ秒を計算
centiseconds = Math.floor((65430 % 1000) / 10) = Math.floor(430 / 10) = 43

// 結果: "01:05.43"
```

**`padStart`メソッドの役割**
```typescript
"5".padStart(2, '0')    // "05" （2桁になるよう左側に0を追加）
"12".padStart(2, '0')   // "12" （既に2桁なので変更なし）
"123".padStart(2, '0')  // "123"（2桁を超えていても切り詰めない）
```

`padStart`は「桁数を揃える」ためのメソッドです。時計の表示では「05:03」のように0で埋めるのが一般的ですね。

## 5. 開始・停止・リセット機能

ユーザーの操作に応じた状態変更を処理します。

```typescript
// 開始/停止の切り替え
const handleStartStop = () => {
  setIsRunning(!isRunning)  // 現在の状態を反転
}

// リセット処理
const handleReset = () => {
  setIsRunning(false)  // まず停止
  setTime(0)          // 時間を0に戻す
}
```

`handleStartStop`は「現在と逆の状態にする」というシンプルな処理です。動いていれば止める、止まっていれば動かす。`handleReset`では、まず確実に停止してから時間を0に戻します。

### 🎯 操作の流れ

```typescript
// 初期状態
isRunning = false, time = 0

// 1. 開始ボタンをクリック
handleStartStop() → setIsRunning(true) → useEffectでタイマー開始

// 2. 停止ボタンをクリック
handleStartStop() → setIsRunning(false) → useEffectでタイマー停止

// 3. リセットボタンをクリック
handleReset() → setIsRunning(false) + setTime(0) → 初期状態に戻る
```

## 6. 条件付きレンダリング

状態に応じてUIを動的に変更します。

```typescript
// ボタンの表示と色
<button
  onClick={handleStartStop}
  className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
    isRunning
      ? 'bg-red-500 hover:bg-red-600'    // 動作中は赤色（停止ボタン）
      : 'bg-green-500 hover:bg-green-600' // 停止中は緑色（開始ボタン）
  }`}
>
  {isRunning ? '⏸️ 停止' : '▶️ 開始'}
</button>
```

同じボタンでも、状態によって見た目と文字が変わります。これにより、ユーザーは「今何ができるのか」を直感的に理解できます。

### 🎨 視覚的フィードバック

```typescript
// 状態インジケーター
<div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
  isRunning 
    ? 'bg-green-100 text-green-800'  // 動作中は緑系
    : 'bg-gray-100 text-gray-800'    // 停止中はグレー系
}`}>
  <div className={`w-2 h-2 rounded-full mr-2 ${
    isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
  }`}></div>
  {isRunning ? '動作中' : '停止中'}
</div>
```

小さな円が点滅することで、「生きている」感を表現しています。これは家電製品の電源ランプと同じ考え方です。

**`animate-pulse`の効果**
- **動作中**: 緑の点が点滅して「生きている」感を演出
- **停止中**: グレーの点が静止して「停止」を視覚的に表現

## 7. 関数型更新の活用

状態更新で前の値を確実に取得します。

```typescript
// ❌ 直接更新（推奨されない）
setTime(time + 10)

// ✅ 関数型更新（推奨）
setTime(prevTime => prevTime + 10)
```

関数型更新は「前の値を確実に取得する」ための方法です。特に高速で実行される処理では重要になります。

### 🚨 なぜ関数型更新が必要？

```typescript
// 問題のあるケース
const handleClick = () => {
  setTime(time + 10)  // time = 1000
  setTime(time + 10)  // time = 1000（同じ値！）
  // 結果: 1020ではなく1010になってしまう
}

// 正しいケース
const handleClick = () => {
  setTime(prevTime => prevTime + 10)  // prevTime = 1000
  setTime(prevTime => prevTime + 10)  // prevTime = 1010
  // 結果: 正しく1020になる
}
```

「古い値を参照してしまう」問題を防ぐために、常に最新の値を使うようにします。

## 8. タイマーの精度について

ブラウザのタイマーの特性を理解しましょう。

```typescript
// タイマーの実際の動作
setInterval(() => {
  console.log('10ms経過')
}, 10)

// 実際は...
// 0ms: 開始
// 12ms: 実行（2ms遅れ）
// 21ms: 実行（1ms遅れ）
// 31ms: 実行（1ms遅れ）
```

ブラウザのタイマーは「だいたい正確」です。完璧に10msピッタリではなく、数ミリ秒の誤差があります。

**精度の向上策**
```typescript
// より正確な時間計測
const startTime = Date.now()

setInterval(() => {
  const elapsedTime = Date.now() - startTime
  setTime(elapsedTime)  // 累積誤差を防ぐ
}, 10)
```

より正確な計測が必要な場合は、開始時刻を記録しておいて、現在時刻との差を計算する方法があります。

## 9. メモリリーク対策

適切なクリーンアップでメモリリークを防ぎます。

```typescript
// メモリリークが発生するパターン
useEffect(() => {
  const timer = setInterval(() => {
    setTime(prevTime => prevTime + 10)
  }, 10)
  
  // ❌ クリーンアップを忘れる
  // return () => clearInterval(timer)  // これがないとリーク
}, [])

// 正しいパターン
useEffect(() => {
  const timer = setInterval(() => {
    setTime(prevTime => prevTime + 10)
  }, 10)
  
  // ✅ 必ずクリーンアップ
  return () => clearInterval(timer)
}, [])
```

メモリリークは「使い終わったものを片付けない」ことで起こります。タイマーも使い終わったら必ず停止する必要があります。

### 🔧 開発者ツールでの確認

```javascript
// ブラウザのコンソールで確認
console.log('アクティブなタイマー数:', 
  performance.getEntriesByType('measure').length)
```

開発者ツールでタイマーの状況を確認できます。デバッグの際に便利です。

## 10. カスタムフックでの再利用

ストップウォッチ機能を再利用可能にします。

```typescript
// useStopwatch.ts
export const useStopwatch = (options = {}) => {
  const { interval = 10, autoStart = false } = options
  
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(autoStart)
  const intervalRef = useRef(null)

  // タイマー処理...
  
  return {
    time,
    isRunning,
    start: () => setIsRunning(true),
    stop: () => setIsRunning(false),
    reset: () => { setIsRunning(false); setTime(0) },
    toggle: () => setIsRunning(prev => !prev),
    formatTime: (showMs = true) => { /* フォーマット処理 */ }
  }
}

// 使用例
const MyComponent = () => {
  const { time, isRunning, start, stop, reset, formatTime } = useStopwatch()
  
  return (
    <div>
      <div>{formatTime()}</div>
      <button onClick={start}>開始</button>
      <button onClick={stop}>停止</button>
      <button onClick={reset}>リセット</button>
    </div>
  )
}
```

カスタムフックを作ることで、ストップウォッチの機能を他のコンポーネントでも簡単に使えるようになります。「部品」として再利用可能にする重要なテクニックです。

## まとめ

このストップウォッチアプリで学べるReactの重要概念：

1. **useEffect**: 副作用（タイマー）の管理
2. **useRef**: 再レンダリング間での値の保持
3. **setInterval/clearInterval**: 定期実行の制御
4. **クリーンアップ関数**: メモリリーク防止
5. **関数型更新**: 安全な状態更新
6. **時間計算**: ミリ秒から時分秒への変換
7. **条件付きレンダリング**: 状態に応じたUI変更
8. **視覚的フィードバック**: ユーザビリティの向上

## 次のステップ

- ⏱️ ラップタイム機能
- 📊 計測履歴の保存
- 🔔 目標時間でのアラート
- 🎨 時間に応じた色変化
- 💾 ローカルストレージでの永続化
- ⌨️ キーボードショートカット
- 📱 PWA対応

タイマー処理とuseEffectの理解が深まる重要なアプリです！
非同期処理とメモリ管理の基礎を学べます 🚀 