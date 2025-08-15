# Day 38: お絵かきアプリ（簡易ペイント）

## プロジェクト概要
ブラウザ上で自由に線を描けるお絵かきアプリを作成しました。まるで紙にペンで描くように、マウスやタッチで線を描画できます。色や太さを変更したり、キャンバスをクリアする機能も備えています。

## 学習目標
- **Canvas API**: HTML5の強力な描画機能を理解する
- **イベント処理**: マウスとタッチの両方に対応した統一的な処理
- **カスタムフック**: 複雑な状態管理をフックで整理する
- **リアルタイム描画**: スムーズな描画体験の実現

## 主な技術・概念

### 1. HTML5 Canvas API
Canvas（キャンバス）は、JavaScript を使って図形や画像を動的に描画できるHTML要素です。お絵かきアプリには最適な技術です。

#### Canvas の基本概念
```javascript
// Canvas要素を取得
const canvas = document.getElementById('myCanvas');
// 2Dコンテキストを取得（描画用のツール）
const ctx = canvas.getContext('2d');

// 線の設定
ctx.lineCap = 'round';     // 線の端を丸くする
ctx.lineJoin = 'round';    // 線の接続部分を丸くする
ctx.strokeStyle = '#000';  // 線の色
ctx.lineWidth = 4;         // 線の太さ

// 描画の手順
ctx.beginPath();           // 新しいパスを開始
ctx.moveTo(x1, y1);       // ペンを移動（描画せず）
ctx.lineTo(x2, y2);       // 線を引く（描画はまだ）
ctx.stroke();             // 実際に描画を実行
```

### 2. マウス・タッチイベントの統一処理

#### 座標計算の仕組み
ブラウザのイベントで取得できる座標は「画面全体での座標」ですが、Canvas内での描画には「Canvas内での相対座標」が必要です。

```javascript
const getPos = (e: MouseEvent | TouchEvent) => {
  const canvas = canvasRef.current!;
  const rect = canvas.getBoundingClientRect(); // Canvas の画面上での位置

  // マウスとタッチで座標取得方法が異なる
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

  // Canvas内での相対座標に変換
  return { 
    x: clientX - rect.left,  // Canvas左端からの距離
    y: clientY - rect.top    // Canvas上端からの距離
  };
};
```

#### なぜこの計算が必要？
例えば、Canvas が画面の (100, 50) の位置にあり、マウスが画面の (200, 150) をクリックした場合：
- Canvas内での座標は (200-100, 150-50) = (100, 100) になります

### 3. 描画の流れ（3段階）

#### 1段階目: ポインターダウン（描画開始）
```javascript
const onPointerDown = (e: MouseEvent | TouchEvent) => {
  setIsDrawing(true);           // 描画モードをON
  const { x, y } = getPos(e);   // クリック位置を取得
  ctx.beginPath();              // 新しい線を開始
  ctx.moveTo(x, y);            // その位置にペンを移動
};
```

#### 2段階目: ポインタームーブ（描画中）
```javascript
const onPointerMove = (e: MouseEvent | TouchEvent) => {
  if (!isDrawing) return;       // 描画モードでなければ何もしない
  const { x, y } = getPos(e);   // 現在の位置を取得
  ctx.lineTo(x, y);            // 前の位置から線を引く
  ctx.stroke();                // 実際に描画
};
```

#### 3段階目: ポインターアップ（描画終了）
```javascript
const onPointerUp = () => {
  setIsDrawing(false);          // 描画モードをOFF
  ctx.closePath();             // パスを閉じる
};
```

### 4. useDrawing カスタムフック

複雑な描画ロジックを一箇所にまとめることで、コンポーネントがシンプルになります。

```javascript
export function useDrawing() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [style, setStyle] = useState<StrokeStyle>({ 
    color: '#111827', 
    width: 4 
  });

  // Canvas要素とコンテキストの設定
  const setCanvas = useCallback((el: HTMLCanvasElement | null) => {
    canvasRef.current = el;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    
    // 線の設定
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.width;
    ctxRef.current = ctx;
  }, [style.color, style.width]);

  // 他の機能（clear、イベントハンドラ等）
  // ...
}
```

### 5. イベントリスナーの管理

useEffect を使ってイベントリスナーを適切に追加・削除します。これはメモリリークを防ぐために重要です。

```javascript
useEffect(() => {
  const el = wrapperRef.current;
  if (!el) return;

  // イベントハンドラを定義
  const onDown = (e: MouseEvent) => onPointerDown(e);
  const onMove = (e: MouseEvent) => onPointerMove(e);
  const onUp = () => onPointerUp();

  // イベントリスナーを追加
  el.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);

  // クリーンアップ関数（コンポーネント削除時に実行）
  return () => {
    el.removeEventListener('mousedown', onDown);
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
  };
}, [onPointerDown, onPointerMove, onPointerUp]);
```

#### なぜ window にイベントを追加？
- `mousedown`: Canvas内でクリックしたときのみ反応すればよい → Canvas要素に追加
- `mousemove`, `mouseup`: Canvas外でも反応する必要がある → window に追加

これにより、Canvas外にマウスを動かしても線が描け、Canvas外でマウスを離しても正しく描画が終了します。

### 6. TypeScript での型安全性

```javascript
// 描画スタイルの型定義
export type StrokeStyle = {
  color: string;    // 16進数カラーコード
  width: number;    // 線の太さ（ピクセル）
};

// Props の型定義
type Props = {
  width?: number;   // Canvas の幅（デフォルト: 800）
  height?: number;  // Canvas の高さ（デフォルト: 500）
};
```

### 7. UI コンポーネントの分離

#### Toolbar コンポーネント
```javascript
// 色選択、太さ調整、クリア機能を提供
<input
  type="color"                    // HTML5のカラーピッカー
  value={style.color}
  onChange={(e) => setStyle(s => ({ ...s, color: e.target.value }))}
/>

<input
  type="range"                    // HTML5のスライダー
  min={1} max={24}
  value={style.width}
  onChange={(e) => setStyle(s => ({ ...s, width: Number(e.target.value) }))}
/>
```

#### CanvasBoard コンポーネント
```javascript
// 描画専用のコンポーネント
<canvas 
  ref={setCanvas} 
  width={width} 
  height={height} 
  className="rounded-md bg-gray-50" 
/>
```

## 実装のポイント

### 1. パフォーマンス最適化
- `useCallback` でイベントハンドラをメモ化
- 不要な再レンダリングを防止
- Canvas描画は直接DOMを操作するため高速

### 2. レスポンシブ対応
- タッチデバイスでも同じように動作
- `{ passive: false }` でデフォルトのタッチ動作を無効化

### 3. ユーザビリティ
- 線の端が丸く滑らか（`lineCap: 'round'`）
- リアルタイムフィードバック（描画中すぐに表示）
- 直感的なツールバー

## 発展的な機能

### 1. 履歴機能（Undo/Redo）
```javascript
// ImageData を配列で保存
const saveState = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  history.push(imageData);
};

// 復元
const undo = () => {
  const prevState = history.pop();
  if (prevState) {
    ctx.putImageData(prevState, 0, 0);
  }
};
```

### 2. 画像保存機能
```javascript
const saveAsImage = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  
  // Canvas を画像データに変換
  const dataURL = canvas.toDataURL('image/png');
  
  // ダウンロードリンクを作成
  const link = document.createElement('a');
  link.download = 'drawing.png';
  link.href = dataURL;
  link.click();
};
```

### 3. 背景画像機能
```javascript
const loadBackgroundImage = (imageUrl: string) => {
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  img.src = imageUrl;
};
```

## まとめ

このお絵かきアプリでは、Canvas API の基本的な使い方から、イベント処理、状態管理まで、フロントエンド開発の重要な概念を幅広く学べます。特に：

- **Canvas API**: 2D描画の基礎
- **イベント処理**: マウス・タッチの統一的な扱い
- **カスタムフック**: ロジックの分離と再利用
- **TypeScript**: 型安全な開発

これらの技術は、ゲーム開発、データ可視化、画像編集ツールなど、様々なアプリケーション開発に応用できます。
