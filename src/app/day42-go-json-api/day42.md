# Day 42: Go JSONレスポンス API と Next.js 連携

本日は、GoでJSONを返すAPIを想定し、Next.js側でモックAPI（`/api/day42-data`）を叩いて表示します。Day41の発展として、配列データの検証と表示までを行います。

## 目標
- Goの`/api/data`のようなJSONエンドポイントを想定
- Next.js側では`/api/day42-data`（モック）をフェッチして表示
- 外部入力（unknown）の型ガードを実施して安全に処理

## フォルダ構成（本日分）
```
src/app/day42-go-json-api/
├── layout.tsx   # Header/PageHeader/Footer 配置
├── page.tsx     # モックAPIから取得して表示
└── day42.md     # 本ドキュメント
```

## Go サンプル（参考）
```go
package main

import (
    "encoding/json"
    "net/http"
)

type item struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

type response struct {
    Title string `json:"title"`
    Items []item `json:"items"`
}

func dataHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json; charset=utf-8")
    json.NewEncoder(w).Encode(response{
        Title: "Day 42 JSON",
        Items: []item{{1, "Alpha"}, {2, "Beta"}, {3, "Gamma"}},
    })
}

func main() {
    http.HandleFunc("/api/data", dataHandler)
    http.ListenAndServe(":8080", nil)
}
```

## Next.js 側のポイント
- App RouterのAPIルートでモックJSONを返し、ページは`useEffect`で取得
- unknown→型ガードで安全に整形
- レイアウトには共通のHeader/PageHeader/Footerを配置し、背景色を`main`で統一

---
以上。

