# Day 52: メモ表示アプリ - Next.js + Go API連携

## 📋 概要

Day 52では、Day 51で作成したGo API（メモ保存アプリのバックエンド）をNext.jsフロントエンドから呼び出し、メモ一覧と詳細を表示するアプリを作成しました。

このプロジェクトでは、**外部APIとの連携**、**データフェッチング**、**状態管理**、**エラーハンドリング**の基本を学習します。

## 🎯 学習ポイント

- Next.jsから外部API（自作Go API）へのデータフェッチング
- `useState`と`useEffect`を使った状態管理
- エラーハンドリングとローディング状態の管理
- サーバー接続状態の確認機能
- TypeScriptの型安全性

## 🛠️ 必要な環境

- Node.js 18以上
- Go 1.21以上
- MSYS2（WindowsでCGOを使用するため）
- GCCコンパイラ（MSYS2に含まれる）

## 📦 セットアップ手順

### 1. MSYS2のインストール（Windows環境の場合）

#### 1.1 MSYS2をダウンロード

1. [MSYS2公式サイト](https://www.msys2.org/)にアクセス
2. 「Download the installer」から最新のインストーラーをダウンロード
3. インストーラーを実行（デフォルトのインストール先 `C:\msys64` で問題ありません）

#### 1.2 MSYS2のパッケージを更新

1. 「MSYS2 MSYS」を起動
2. 以下のコマンドを実行：
   ```bash
   pacman -Syu
   ```
3. プロンプトが出たら「Y」を入力してEnter
4. 更新が完了したら、ウィンドウを閉じて再度開く

#### 1.3 MinGW-w64ツールチェーンをインストール

「MSYS2 MSYS」で以下を実行：

```bash
pacman -S mingw-w64-x86_64-gcc
```

#### 1.4 PATH環境変数に追加

PowerShellで以下を実行：

```powershell
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\msys64\mingw64\bin", "User")
```

または、手動で設定：

1. Windowsキーを押して「環境変数」と検索
2. 「環境変数を編集」を開く
3. 「システム環境変数」の「Path」を選択→「編集」
4. 「新規」をクリックして `C:\msys64\mingw64\bin` を追加
5. 「OK」で保存

#### 1.5 インストール確認

PowerShellを再起動して以下を実行：

```powershell
gcc --version
```

バージョン情報が表示されれば成功です。

### 2. Goサーバーの起動

#### 2.1 サーバーディレクトリに移動

```powershell
cd server
```

#### 2.2 CGOを有効にしてサーバーを起動

```powershell
$env:CGO_ENABLED="1"
go run main.go
```

または、1行で実行：

```powershell
$env:CGO_ENABLED="1"; go run main.go
```

#### 2.3 サーバーが起動したことを確認

以下のようなメッセージが表示されれば成功です：

```
2025/12/03 XX:XX:XX Database connection established
2025/12/03 XX:XX:XX Database migration completed
2025/12/03 XX:XX:XX Server listening on :8080
2025/12/03 XX:XX:XX Middleware enabled: Logging, Recovery, CORS
2025/12/03 XX:XX:XX Available endpoints:
2025/12/03 XX:XX:XX   GET    /hello
2025/12/03 XX:XX:XX   GET    /api/memos
2025/12/03 XX:XX:XX   POST   /api/memos
2025/12/03 XX:XX:XX   GET    /api/memos/{id}
```

### 3. Next.jsアプリの起動

別のPowerShellウィンドウで以下を実行：

```powershell
npm run dev
```

開発サーバーが `http://localhost:3000` で起動します。

### 4. アプリの動作確認

#### 4.1 Day51アプリでメモを作成

1. ブラウザで `http://localhost:3000/day51-memo-app` にアクセス
2. メモのタイトルと内容を入力
3. 「メモを保存」ボタンをクリック

#### 4.2 Day52アプリでメモを表示

1. ブラウザで `http://localhost:3000/day52-memo-display` にアクセス
2. 作成したメモが一覧に表示されることを確認
3. メモをクリックすると詳細が表示されることを確認

## 🔧 使用しているAPI

### GET /api/memos
- **説明**: 全メモを取得
- **レスポンス**: メモの配列
- **例**:
  ```json
  [
    {
      "id": 1,
      "title": "サンプルメモ",
      "content": "これはサンプルメモです",
      "createdAt": "2025-12-03T21:00:00Z",
      "updatedAt": "2025-12-03T21:00:00Z"
    }
  ]
  ```

### GET /api/memos/:id
- **説明**: 指定IDのメモを取得
- **パラメータ**: `id` (メモのID)
- **レスポンス**: メモオブジェクト
- **例**:
  ```json
  {
    "id": 1,
    "title": "サンプルメモ",
    "content": "これはサンプルメモです",
    "createdAt": "2025-12-03T21:00:00Z",
    "updatedAt": "2025-12-03T21:00:00Z"
  }
  ```

## 📁 プロジェクト構造

```
day52-memo-display/
├── page.tsx          # メインページコンポーネント
├── layout.tsx        # レイアウト（Header、PageHeader、Footer含む）
├── day52.md          # コード解説ドキュメント
└── README.md         # このファイル
```

## 🐛 トラブルシューティング

### GCCが見つからない

**症状**: `gcc: command not found` または `gcc: executable file not found`

**解決方法**:
1. PowerShellを再起動（PATH環境変数の変更を反映）
2. PATHに正しく追加されているか確認：
   ```powershell
   $env:PATH -split ';' | Select-String -Pattern "gcc|mingw"
   ```
3. 手動でPATHを追加：
   ```powershell
   $env:PATH += ";C:\msys64\mingw64\bin"
   ```

### CGOが有効にならない

**症状**: `Binary was compiled with 'CGO_ENABLED=0'` エラー

**解決方法**:
1. 環境変数を明示的に設定：
   ```powershell
   $env:CGO_ENABLED="1"
   go env CGO_ENABLED
   ```
2. `1` と表示されればOKです

### サーバーに接続できない

**症状**: Day52アプリで「Goサーバーが起動していません」と表示される

**解決方法**:
1. Goサーバーが起動しているか確認（`http://localhost:8080/hello` にアクセス）
2. サーバーが起動していない場合は、`server`ディレクトリで以下を実行：
   ```powershell
   $env:CGO_ENABLED="1"
   go run main.go
   ```
3. Day52アプリの「再接続を試みる」ボタンをクリック

### メモが表示されない

**症状**: Day52アプリでメモ一覧が空

**解決方法**:
1. Day51アプリでメモが作成されているか確認
2. ブラウザのコンソール（F12）でエラーを確認
3. サーバーのログを確認（メモ取得のリクエストが来ているか）

### ビルドエラーが発生する

**症状**: `npm run build` でエラーが発生

**解決方法**:
1. `.next`ディレクトリを削除して再ビルド：
   ```powershell
   Remove-Item -Recurse -Force .next
   npm run build
   ```
2. 開発サーバーでは動作する場合は、ビルドエラーは無視しても問題ありません

## 💡 便利なコマンド

### CGOを常に有効にする（PowerShellプロファイル）

毎回 `$env:CGO_ENABLED="1"` を設定するのが面倒な場合：

```powershell
# プロファイルを開く
notepad $PROFILE

# 以下の行を追加
$env:CGO_ENABLED="1"
```

### サーバーを起動するショートカット

PowerShellでエイリアスを作成：

```powershell
# プロファイルに追加
function Start-MemoServer {
    cd server
    $env:CGO_ENABLED="1"
    go run main.go
}

# 使用例
Start-MemoServer
```

## 📚 関連ドキュメント

- [day52.md](./day52.md) - コードの詳細な解説
- [Day51 README](../day51-memo-app/README.md) - バックエンドAPIの詳細

## 🎓 学習のポイント

### 1. 外部APIへのデータフェッチング

```typescript
const fetchMemos = async () => {
  const response = await fetch(`${API_BASE_URL}/api/memos`);
  const data: Memo[] = await response.json();
  setMemos(data || []);
};
```

### 2. useEffectを使った初期化

```typescript
useEffect(() => {
  checkServerStatus();
}, [checkServerStatus]);
```

### 3. エラーハンドリング

```typescript
try {
  const response = await fetch(`${API_BASE_URL}/api/memos`);
  if (!response.ok) {
    throw new Error(`HTTPエラー: ${response.status}`);
  }
  // 成功時の処理
} catch (err) {
  // エラー処理
  if (err instanceof TypeError && err.message === "Failed to fetch") {
    setError("Goサーバーに接続できません");
  }
}
```

### 4. 条件付きレンダリング

```typescript
{loading && memos.length === 0 ? (
  <div>読み込み中...</div>
) : memos.length === 0 ? (
  <div>メモがまだありません</div>
) : (
  <div>{/* メモ一覧 */}</div>
)}
```

## ✅ チェックリスト

- [ ] MSYS2がインストールされている
- [ ] GCCがPATHに追加されている
- [ ] `gcc --version` でバージョンが表示される
- [ ] Goサーバーが起動している（`http://localhost:8080/hello` にアクセス可能）
- [ ] Next.jsアプリが起動している（`http://localhost:3000` にアクセス可能）
- [ ] Day51アプリでメモが作成できる
- [ ] Day52アプリでメモ一覧が表示される
- [ ] メモをクリックすると詳細が表示される

## 🚀 次のステップ

- Day 53: メモの更新・削除機能を追加（バックエンド）
- Day 54: フロントエンドに編集・削除UIを実装

## 📝 まとめ

Day 52では、Next.jsからGo APIを呼び出してデータを表示する基本的な流れを学習しました。このパターンは、フロントエンドとバックエンドを連携させる際の基本となります。

**重要なポイント:**
- 非同期処理（`async/await`）
- 状態管理（`useState`）
- エラーハンドリング
- 条件付きレンダリング
- サーバー接続状態の管理

これらの概念を理解することで、より複雑なアプリケーション開発の基礎が身につきます。

