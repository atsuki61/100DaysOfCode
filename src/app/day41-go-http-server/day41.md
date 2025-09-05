# Day 41: Go HTTPサーバー (net/http) と Next.js 連携

この日は、Go の標準ライブラリ net/http を使ってシンプルな API サーバーを立て、Next.js 側からフェッチして表示するところまで行います。

## 目標
- Go で `/hello` エンドポイントを用意し、`{"message":"Hello, Go!"}` を返す
- Next.js ページから `http://localhost:8080/hello` にアクセスして結果を表示
- 型安全（unknown → 型ガード）とエラーハンドリングを実施

## フォルダ構成（本日分）
```
src/app/day41-go-http-server/
├── layout.tsx   # Header/PageHeader/Footer の配置
├── page.tsx     # Goサーバーからのレスポンスを表示
└── day41.md     # 本ドキュメント
```

## Go サーバーのサンプルコード
以下の Go コードを `server/main.go` などに保存し、`go run ./server` として起動してください。

```go
package main

import (
    "encoding/json"
    "log"
    "net/http"
)

type helloResponse struct {
    Message string `json:"message"`
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json; charset=utf-8")
    resp := helloResponse{Message: "Hello, Go!"}
    if err := json.NewEncoder(w).Encode(resp); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/hello", helloHandler)

    addr := ":8080"
    log.Println("listening on", addr)
    if err := http.ListenAndServe(addr, mux); err != nil {
        log.Fatal(err)
    }
}
```

- ブラウザで `http://localhost:8080/hello` にアクセスし、`{"message":"Hello, Go!"}` が表示されればOKです。

## Next.js 側の動作
- `src/app/day41-go-http-server/page.tsx` はクライアントコンポーネントとして `useEffect` で `http://localhost:8080/hello` にアクセスします。
- レスポンスは unknown で受け取り、`message` が string のときにだけ表示します。
- 起動していないときは「起動していない可能性があります」と案内します。

## 検証項目
- Go サーバー起動中にページを開くと、JSON が UI に表示される
- サーバー停止中にページを開くと、エラーメッセージまたは未起動の案内が表示される

## 学びのポイント（初心者向け）
- Go の net/http は「ハガキの配達員」のようなもの。`/hello` という住所に来た人に、JSON という手紙を返すイメージ。
- Next.js はその手紙をポストに取りに行き（fetch）、中身（JSON）を読んで画面に表示します。
- 「相手が必ず決まった書式とは限らない」ので、まず unknown として受け取り、型ガードで中身を確かめてから使うのが安全。

## 起動手順まとめ
1. Go サーバーを起動: `go run ./server`
2. Next.js を起動: `npm run dev`
3. ブラウザで `http://localhost:3000/day41-go-http-server` を開く

