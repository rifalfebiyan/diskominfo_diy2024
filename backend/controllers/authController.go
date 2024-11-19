package controllers

import (
	"backend/database"
	"backend/models"
	"net/http"
	"time"

	log "github.com/sirupsen/logrus" // Mengimpor logrus dengan alias log

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func Login(c *gin.Context) {
	var input struct {
		Identifier string `json:"identifier"`
		Password   string `json:"password"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	result := database.DB.Where("email = ? OR nip = ?", input.Identifier, input.Identifier).First(&user)
	if result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if user.Password != input.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = user.ID
	claims["role"] = user.Role
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, err := token.SignedString([]byte("your_secret_key"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
		"user": gin.H{
			"id":     user.ID,
			"name":   user.Name,
			"email":  user.Email,
			"role":   user.Role,
			"agency": user.Agency, // Accessing the Agency relationship instead
		},
	})
}

func Register(c *gin.Context) {
	var input struct {
		Name     string `json:"name" binding:"required"`
		NIP      string `json:"nip"`
		Email    string `json:"email" binding:"required,email"`
		Phone    string `json:"phone" binding:"required"`
		Password string `json:"password" binding:"required,min=6"`
		Role     string `json:"role" binding:"required,oneof=admin user spectator"`
		AgencyID uint   `json:"agency_id" binding:"required"`
		N_IP     string `json:"n_ip"` // Tambahkan ini untuk n_ip
	}

	// Mengikat JSON ke struct input
	if err := c.ShouldBindJSON(&input); err != nil {
		log.Errorf("Error binding JSON: %v", err) // Mencatat kesalahan
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Infof("Received registration request: %+v", input) // Mencatat permintaan pendaftaran

	// Cek apakah email sudah terdaftar
	var existingUser models.User
	if err := database.DB.Where("email = ?", input.Email).First(&existingUser).Error; err == nil {
		log.Warnf("Email already registered: %s", input.Email) // Mencatat jika email sudah terdaftar
		c.JSON(http.StatusConflict, gin.H{"error": "Email already registered"})
		return
	}

	// Buat user baru
	user := models.User{
		Name:     input.Name,
		NIP:      input.NIP,
		Email:    input.Email,
		Phone:    input.Phone,
		Password: input.Password, // Pastikan password dienkripsi saat menyimpan
		Role:     input.Role,
		AgencyID: &input.AgencyID,
		N_IP:     input.N_IP, // Simpan n_ip ke database
	}

	// Menyimpan pengguna baru ke dalam database
	result := database.DB.Create(&user)
	if result.Error != nil {
		log.Errorf("Failed to create user: %v", result.Error) // Mencatat kesalahan saat membuat user
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	log.Infof("User  registered successfully: %+v", user) // Mencatat keberhasilan pendaftaran
	c.JSON(http.StatusCreated, gin.H{"message": "User  registered successfully"})
}
