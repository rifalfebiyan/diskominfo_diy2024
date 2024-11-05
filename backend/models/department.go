package models

import (
	"time"
)

type Department struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Phone     string    `json:"phone"`
	Address   string    `json:"address"`
	AgencyID  uint      `json:"agency_id"`
	Agency    Agency    `gorm:"foreignKey:AgencyID" json:"agency"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
