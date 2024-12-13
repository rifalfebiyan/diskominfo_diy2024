package models

import "time"

type Visitor struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Name        string    `json:"name"`
	Gender      string    `json:"gender"`
	Purpose     string    `json:"purpose"`
	Address     string    `json:"address"`
	Institution string    `json:"institution"`
	Phone       string    `json:"phone"`
	Email       string    `json:"email"` // Tambahkan field email
	Department  string    `json:"department"`
	Asal        string    `json:"asal"`
	VisitDate   time.Time `json:"visitDate" gorm:"column:visit_date"`
	CreatedAt   time.Time `json:"createdAt" gorm:"column:created_at"`
}
