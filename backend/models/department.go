package models

import "time"

type Department struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name"`
	Phone     string    `json:"phone"`
	Address   string    `json:"address"`
	Status    string    `json:"status"`
	Email     string    `json:"email"`
	AgencyID  uint      `json:"agency_id"`                         // Foreign key ke Agency
	Agency    Agency    `gorm:"foreignKey:AgencyID" json:"agency"` // Relasi ke Agency
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
