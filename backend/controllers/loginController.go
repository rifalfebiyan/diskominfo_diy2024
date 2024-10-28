package controllers

import (
	"backend/database"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Login handles login requests
func Login(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var foundUser models.User
	if err := database.DB.Where("email = ?", user.Email).First(&foundUser).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	if foundUser.Password != user.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	token := "your_token_here" // Generate a token here
	c.JSON(http.StatusOK, gin.H{"token": token, "role": foundUser.Department})
}
