package models

import (
	"time"
)

type User struct {
	ID             uint      `json:"id" gorm:"primaryKey"`
	Name           string    `json:"name"`
	NIP            string    `json:"nip"` // Pastikan ini tidak unik jika Anda ingin mengizinkan perubahan
	Email          string    `json:"email" gorm:"unique"`
	Phone          string    `json:"phone"`
	Password       string    `json:"password"`
	CreatedAt      time.Time `json:"created_at"`
	Role           string    `json:"role"`
	ProfilePicture string    `json:"profile_picture"`
	AgencyID       *uint     `json:"agency_id"`
	N_IP           string    `json:"n_ip"`
	Agency         Agency    `gorm:"foreignKey:AgencyID" json:"agency"`
}
