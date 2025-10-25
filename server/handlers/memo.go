package handlers

import (
	"100daysofcode/server/database"
	"100daysofcode/server/models"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"
)

// CreateMemo はメモを作成するハンドラー
func CreateMemo(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.CreateMemoRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// バリデーション
	if strings.TrimSpace(req.Title) == "" {
		http.Error(w, "Title is required", http.StatusBadRequest)
		return
	}
	if strings.TrimSpace(req.Content) == "" {
		http.Error(w, "Content is required", http.StatusBadRequest)
		return
	}

	memo := models.Memo{
		Title:   req.Title,
		Content: req.Content,
	}

	db := database.GetDB()
	if err := db.Create(&memo).Error; err != nil {
		log.Printf("Failed to create memo: %v", err)
		http.Error(w, "Failed to create memo", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(memo)
}

// GetMemos はすべてのメモを取得するハンドラー
func GetMemos(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var memos []models.Memo
	db := database.GetDB()
	
	// 新しい順に取得
	if err := db.Order("created_at DESC").Find(&memos).Error; err != nil {
		log.Printf("Failed to get memos: %v", err)
		http.Error(w, "Failed to get memos", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	json.NewEncoder(w).Encode(memos)
}

// GetMemoByID はIDでメモを取得するハンドラー
func GetMemoByID(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// URLパスからIDを取得 (/api/memos/{id})
	pathParts := strings.Split(strings.TrimPrefix(r.URL.Path, "/api/memos/"), "/")
	if len(pathParts) == 0 || pathParts[0] == "" {
		http.Error(w, "Memo ID is required", http.StatusBadRequest)
		return
	}

	id, err := strconv.ParseUint(pathParts[0], 10, 32)
	if err != nil {
		http.Error(w, "Invalid memo ID", http.StatusBadRequest)
		return
	}

	var memo models.Memo
	db := database.GetDB()
	
	if err := db.First(&memo, id).Error; err != nil {
		log.Printf("Failed to get memo: %v", err)
		http.Error(w, "Memo not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	json.NewEncoder(w).Encode(memo)
}

