package models

import (
	"time"
)

type User struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	Name       string    `json:"name"`
	Nip        string    `json:"nip"`
	Email      string    `json:"email"`
	Phone      string    `json:"phone"`
	Password   string    `json:"password"`
	Department string    `json:"department"`
	CreatedAt  time.Time `json:"created_at"`
}
