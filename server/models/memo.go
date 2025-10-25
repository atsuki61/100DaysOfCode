package models

import (
	"time"

	"gorm.io/gorm"
)

// Memo はメモのデータモデル
type Memo struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	Title     string         `gorm:"size:100;not null" json:"title"`
	Content   string         `gorm:"type:text;not null" json:"content"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

// CreateMemoRequest はメモ作成時のリクエストボディ
type CreateMemoRequest struct {
	Title   string `json:"title" binding:"required"`
	Content string `json:"content" binding:"required"`
}

// UpdateMemoRequest はメモ更新時のリクエストボディ
type UpdateMemoRequest struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

