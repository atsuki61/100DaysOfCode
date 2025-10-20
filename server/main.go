package main

import (
	"encoding/json"
	"log"
	"net/http"

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

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/hello", helloHandler)

    // ミドルウェアを適用
    var handler http.Handler = mux
    handler = middleware.LoggingMiddleware(handler)
    handler = middleware.RecoveryMiddleware(handler)
    handler = middleware.CORSMiddleware(handler)

    addr := ":8080"
    log.Println("Server listening on", addr)
    log.Println("Middleware enabled: Logging, Recovery, CORS")
    if err := http.ListenAndServe(addr, handler); err != nil {
        log.Fatal(err)
    }
}