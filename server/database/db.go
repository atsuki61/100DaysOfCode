package database

import (
	"100daysofcode/server/models"
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	_ "modernc.org/sqlite" // pure Go SQLite driver (CGO不要)
)

var DB *gorm.DB

// InitDB はデータベース接続を初期化し、マイグレーションを実行する
func InitDB() error {
	var err error
	
	// SQLiteデータベースに接続（modernc.org/sqliteを使用、CGO不要）
	// DSNに"sqlite:"プレフィックスを付けることでmodernc.org/sqliteを使用
	DB, err = gorm.Open(sqlite.Open("sqlite:memos.db"), &gorm.Config{
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

