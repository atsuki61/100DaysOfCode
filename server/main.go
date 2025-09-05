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