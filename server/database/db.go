package database

import (
	"100daysofcode/server/models"
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// InitDB はデータベース接続を初期化し、マイグレーションを実行する
func InitDB() error {
	var err error
	
	// SQLiteデータベースに接続
	DB, err = gorm.Open(sqlite.Open("memos.db"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	
	if err != nil {
		return err
	}

	log.Println("Database connection established")

	// 自動マイグレーション
	err = DB.AutoMigrate(&models.Memo{})
	if err != nil {
		return err
	}

	log.Println("Database migration completed")
	
	return nil
}

// GetDB はデータベースのインスタンスを返す
func GetDB() *gorm.DB {
	return DB
}

