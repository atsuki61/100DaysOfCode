# Day 44: Go (Gin) のパス/クエリパラメータ

`/users/:id` と `/search?q=keyword` を Gin で実装し、Next.js から取得して表示します。

## 目標
- Gin: パスパラメータとクエリパラメータの取得
- Next.js: モックAPI経由で型ガードとエラーハンドリング

## ディレクトリ
```
src/app/day44-go-params/
├── layout.tsx
├── page.tsx
└── day44.md
```

## Gin (例)
```go
r.GET("/users/:id", func(c *gin.Context) {
    id := c.Param("id")
    c.JSON(200, gin.H{"id": id, "name": "User-" + id})
})

r.GET("/search", func(c *gin.Context) {
    q := c.Query("q")
    c.JSON(200, gin.H{"q": q, "count": len(q)})
})
```

## Next.js 側
- `/api/day44-users/[id]`, `/api/day44-search` をモック実装
- それぞれ unknown から型ガードして表示


