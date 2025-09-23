# Day 43: Go Webフレームワーク導入 (Gin) - Hello World

本日は Gin（または Echo）といった Go の Web フレームワークを導入し、`/hello` にアクセスすると JSON を返す最小アプリを作り、Next.js 側から取得して表示します。

## 目標
- Gin で `/hello` を実装して `{ "message": "Hello from Gin" }` を返す
- Next.js の `app/day43-go-gin-hello` ページでレスポンスを取得・表示
- unknown からの型ガードとエラーハンドリング

## ディレクトリ
```
src/app/day43-go-gin-hello/
├── layout.tsx   # Header/PageHeader/Footer
├── page.tsx     # Gin API の結果を表示
└── day43.md     # 本ドキュメント
```

## Gin サーバーの最小コード例
`go get github.com/gin-gonic/gin` をインストールし、以下を `server/main.go` に配置して `go run ./server` で起動します。

```go
package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.GET("/hello", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "Hello from Gin"})
    })
    r.Run(":8080")
}
```

## Next.js 側
- `fetch("/api/day43-hello")` でモックAPIを叩く（Vercel等でも動作するように）
- レスポンスは unknown として受け、型ガードで `{ message: string }` の時だけ表示

## 検証
- Gin 起動時: JSON が画面に表示される
- 未起動時: エラー/案内メッセージ表示

## 学びのポイント（比喩）
- Gin は「配達所の仕分け係」。`/hello` という棚に来た荷物（リクエスト）に、決まった箱（JSON）で返す。
- Next.js はその箱を受け取って画面に並べる係。中身の検品（型ガード）をしてから陳列するので安全。


