package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"100daysofcode/server/database"
	"100daysofcode/server/handlers"
	"100daysofcode/server/middleware"
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

// memoRouter はメモAPIのルーティングを処理する
func memoRouter(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/api/memos")
	
	// /api/memos
	if path == "" || path == "/" {
		switch r.Method {
		case http.MethodGet:
			handlers.GetMemos(w, r)
		case http.MethodPost:
			handlers.CreateMemo(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
		return
	}
	
	// /api/memos/{id}
	if strings.HasPrefix(path, "/") {
		handlers.GetMemoByID(w, r)
		return
	}
	
	http.NotFound(w, r)
}

func main() {
	// データベース初期化
	if err := database.InitDB(); err != nil {
		log.Fatal("Failed to initialize database:", err)
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/hello", helloHandler)
	mux.HandleFunc("/api/memos", memoRouter)
	mux.HandleFunc("/api/memos/", memoRouter)

	// ミドルウェアを適用
	var handler http.Handler = mux
	handler = middleware.LoggingMiddleware(handler)
	handler = middleware.RecoveryMiddleware(handler)
	handler = middleware.CORSMiddleware(handler)

	addr := ":8080"
	log.Println("Server listening on", addr)
	log.Println("Middleware enabled: Logging, Recovery, CORS")
	log.Println("Available endpoints:")
	log.Println("  GET    /hello")
	log.Println("  GET    /api/memos")
	log.Println("  POST   /api/memos")
	log.Println("  GET    /api/memos/{id}")
	if err := http.ListenAndServe(addr, handler); err != nil {
		log.Fatal(err)
	}
}