// models/user.go
package models

type User struct {
	ID         uint   `json:"id" gorm:"primaryKey"`
	Name       string `json:"name"`
	Email      string `json:"email" gorm:"unique"`
	Password   string `json:"password"`
	Phone      string `json:"phone"` // Tambahkan field Phone
	Role       string `json:"role"`
	Department string `json:"department"`
}
