# Day 51: メモ保存アプリ (Go + SQLite + GORM)

## 📝 概要

Go言語でバックエンドAPIを構築し、SQLiteデータベースとGORMを使用してメモを保存・取得するアプリケーションです。Day51では、Create（作成）とRead（全件取得・個別取得）の基本的なCRUD操作を実装しました。

## 🎯 学習目標

### バックエンド学習ポイント (Go)
- **データベース基礎 (SQLite)**: 軽量なデータベースの導入と基本的な使い方
- **ORM (GORM) 導入**: Goの人気ORMライブラリの基本的な使い方
- **モデル定義**: データベーススキーマをGoの構造体で定義
- **マイグレーション基礎**: データベーステーブルの自動生成
- **Create処理**: 新規データの作成
- **Read処理**: 全件取得とID指定での個別取得

### フロントエンド学習ポイント
- RESTful APIへのHTTPリクエスト（GET, POST）
- 非同期データフェッチングと状態管理
- サーバー状態の確認とエラーハンドリング

## 🚀 使用技術

- **フロントエンド**: React, Next.js 15, TypeScript, TailwindCSS
- **バックエンド**: Go 1.25
- **データベース**: SQLite
- **ORM**: GORM v1.31.0
- **その他**: CORS対応、ロギングミドルウェア

## 📁 プロジェクト構造

```
server/
├── main.go                 # アプリケーションエントリーポイント
├── models/
│   └── memo.go            # メモのデータモデル定義
├── handlers/
│   └── memo.go            # メモAPIのハンドラー
├── database/
│   └── db.go              # データベース接続とマイグレーション
└── middleware/
    └── logging.go         # ロギングミドルウェア

src/app/day51-memo-app/
├── page.tsx               # メインページコンポーネント
├── layout.tsx             # レイアウト設定
└── README.md              # このファイル
```

## 🛠️ セットアップと起動方法

### 1. 依存関係のインストール

```bash
# プロジェクトルートで実行
go mod tidy
```

### 2. Goサーバーの起動

```bash
# serverディレクトリに移動
cd server

# サーバーを起動
go run main.go
```

サーバーが起動すると、以下のようなログが表示されます：

```
Database connection established
Database migration completed
Server listening on :8080
Middleware enabled: Logging, Recovery, CORS
Available endpoints:
  GET    /hello
  GET    /api/memos
  POST   /api/memos
  GET    /api/memos/{id}
```

### 3. Next.jsアプリケーションの起動

別のターミナルを開いて：

```bash
# プロジェクトルートで実行
npm run dev
```

ブラウザで http://localhost:3000/day51-memo-app にアクセスしてください。

## 📡 実装されたAPI

### 1. メモ一覧取得 (Read All)

```
GET http://localhost:8080/api/memos
```

**レスポンス例:**
```json
[
  {
    "id": 1,
    "title": "買い物リスト",
    "content": "牛乳、卵、パン",
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-01-15T10:30:00Z"
  }
]
```

### 2. メモ作成 (Create)

```
POST http://localhost:8080/api/memos
Content-Type: application/json

{
  "title": "メモのタイトル",
  "content": "メモの内容"
}
```

**レスポンス例:**
```json
{
  "id": 2,
  "title": "メモのタイトル",
  "content": "メモの内容",
  "createdAt": "2025-01-15T11:00:00Z",
  "updatedAt": "2025-01-15T11:00:00Z"
}
```

### 3. メモ個別取得 (Read by ID)

```
GET http://localhost:8080/api/memos/1
```

**レスポンス例:**
```json
{
  "id": 1,
  "title": "買い物リスト",
  "content": "牛乳、卵、パン",
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T10:30:00Z"
}
```

## 💡 主要な実装ポイント

### 1. GORMモデル定義

```go
type Memo struct {
    ID        uint           `gorm:"primarykey" json:"id"`
    Title     string         `gorm:"size:100;not null" json:"title"`
    Content   string         `gorm:"type:text;not null" json:"content"`
    CreatedAt time.Time      `json:"createdAt"`
    UpdatedAt time.Time      `json:"updatedAt"`
    DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}
```

### 2. データベース初期化

```go
// SQLiteデータベースに接続
DB, err = gorm.Open(sqlite.Open("memos.db"), &gorm.Config{
    Logger: logger.Default.LogMode(logger.Info),
})

// 自動マイグレーション
err = DB.AutoMigrate(&models.Memo{})
```

### 3. Create処理

```go
memo := models.Memo{
    Title:   req.Title,
    Content: req.Content,
}
db.Create(&memo)
```

### 4. Read処理

```go
// 全件取得（新しい順）
db.Order("created_at DESC").Find(&memos)

// ID指定取得
db.First(&memo, id)
```

## 🎨 機能

- ✅ メモの新規作成
- ✅ メモ一覧の表示（新しい順）
- ✅ メモ詳細の表示
- ✅ サーバー接続状態の確認
- ✅ エラーハンドリング
- ✅ レスポンシブデザイン

## 🔜 次のステップ（Day 52-54で実装予定）

- [ ] メモの更新機能（Update）
- [ ] メモの削除機能（Delete）
- [ ] Next.jsからの完全なCRUD操作
- [ ] ページネーション
- [ ] 検索機能

## 📚 学んだこと

1. **Go言語でのWeb API開発**
   - net/httpパッケージの基本的な使い方
   - JSONのエンコード/デコード
   - HTTPステータスコードの適切な使用

2. **GORM（Go ORM）**
   - モデルの定義とタグの使い方
   - 自動マイグレーション
   - 基本的なCRUD操作
   - クエリビルダーの使用

3. **SQLite**
   - ファイルベースの軽量データベース
   - 開発環境での利用に最適
   - SQLサーバー不要で手軽に使える

4. **RESTful API設計**
   - エンドポイントの命名規則
   - HTTPメソッドの使い分け
   - レスポンスの構造化

5. **フロントエンド・バックエンド連携**
   - CORS設定の重要性
   - 非同期通信の実装
   - エラーハンドリングの実践

## 🐛 トラブルシューティング

### サーバーが起動しない場合

1. Goのバージョンを確認: `go version`
2. 依存関係を再インストール: `go mod tidy`
3. ポート8080が使用されていないか確認

### フロントエンドでCORSエラーが出る場合

サーバー側でCORSミドルウェアが正しく設定されているか確認してください。
`server/middleware/logging.go`のCORSMiddleware関数を確認。

### データベースファイルの場所

SQLiteデータベース `memos.db` は `server` ディレクトリに作成されます。

## 📖 参考資料

- [GORM公式ドキュメント](https://gorm.io/docs/)
- [Go公式ドキュメント](https://go.dev/doc/)
- [SQLiteドキュメント](https://www.sqlite.org/docs.html)

## 🎓 今日の成果

- ✅ Go言語でのRESTful API実装の基礎を習得
- ✅ ORMを使ったデータベース操作の理解
- ✅ バックエンド開発の基本的な流れを体験
- ✅ フロントエンドとバックエンドの連携を実装

---

**Day 51/100 完了！** 🎉

