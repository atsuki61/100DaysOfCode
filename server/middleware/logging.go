package middleware

import (
	"log"
	"net/http"
	"time"
)

// ResponseWriter は http.ResponseWriter をラップしてステータスコードを記録する
type responseWriter struct {
	http.ResponseWriter
	statusCode int
}

// WriteHeader はステータスコードを記録する
func (rw *responseWriter) WriteHeader(code int) {
	rw.statusCode = code
	rw.ResponseWriter.WriteHeader(code)
}

// LoggingMiddleware はHTTPリクエストをログに記録するミドルウェア
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		// ResponseWriter をラップしてステータスコードを記録できるようにする
		wrapped := &responseWriter{
			ResponseWriter: w,
			statusCode:     http.StatusOK, // デフォルトは200
		}

		// 次のハンドラーを呼び出す
		next.ServeHTTP(wrapped, r)

		// リクエスト情報をログに出力
		duration := time.Since(start)
		log.Printf(
			"[%s] %s %s - Status: %d - Duration: %v - IP: %s",
			r.Method,
			r.URL.Path,
			r.Proto,
			wrapped.statusCode,
			duration,
			r.RemoteAddr,
		)
	})
}

// RecoveryMiddleware はパニックから回復するミドルウェア
func RecoveryMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Printf("panic recovered: %v", err)
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			}
		}()
		next.ServeHTTP(w, r)
	})
}

// CORSMiddleware はCORSヘッダーを設定するミドルウェア
func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// プリフライトリクエストの場合は200を返す
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

