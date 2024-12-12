package models

import (
	"time"
)

// type Agency struct {
// 	ID          uint         `gorm:"primaryKey" json:"id"`
// 	Name        string       `json:"name"`
// 	Email       string       `json:"email"`
// 	Phone       string       `json:"phone"`
// 	Address     string       `json:"address"`
// 	Departments []Department `gorm:"foreignKey:AgencyID" json:"departments"` // Relasi ke Department
// 	CreatedAt   time.Time    `json:"created_at"`
// 	UpdatedAt   time.Time    `json:"updated_at"`
// }

type Agency struct {
	ID          uint         `gorm:"primaryKey" json:"id"`
	Name        string       `json:"name"`
	Email       string       `json:"email"`
	Phone       string       `json:"phone"`
	Address     string       `json:"address"`
	CreatedAt   time.Time    `json:"created_at"`
	UpdatedAt   time.Time    `json:"updated_at"`
	Departments []Department `gorm:"foreignKey:AgencyID" json:"departments"`
}
