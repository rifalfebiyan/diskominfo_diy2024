package models

import "time"

type Department struct {
	ID        uint      `json:"id"`
	Name      string    `json:"name"`
	Phone     string    `json:"phone"`
	Address   string    `json:"address"`
	Status    string    `json:"status"` // Pastikan ini ada
	Email     string    `json:"email"`
	AgencyID  uint      `json:"agency_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
