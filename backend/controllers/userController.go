package controllers

import (
	"backend/database"
	"backend/models"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

// GetUsers retrieves all users
func GetUsers(c *gin.Context) {
	var users []models.User
	if err := database.DB.Preload("Agency").Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}

// GetUser retrieves a specific user
func GetUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User

	result := database.DB.
		Preload("Agency"). // Preload agency relation
		First(&user, id)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Transform response if needed
	response := map[string]interface{}{
		"id":     user.ID,
		"name":   user.Name,
		"email":  user.Email,
		"phone":  user.Phone,
		"agency": user.Agency, // This should include the full agency object
		// ... other fields
	}

	c.JSON(http.StatusOK, response)
}

// CreateUser creates a new user
func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate role
	validRoles := map[string]bool{
		"admin":     true,
		"user":      true,
		"spectator": true,
	}

	if !validRoles[user.Role] {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid role"})
		return
	}

	// Create user in database
	result := database.DB.Create(&user)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User created successfully",
		"user":    user,
	})
}

// UpdateUser  updates an existing user
func UpdateUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	if err := database.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User  not found"})
		return
	}

	var updateData models.User
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validasi role
	validRoles := map[string]bool{
		"admin":     true,
		"user":      true,
		"spectator": true,
	}

	// Validasi agency_id
	if user.AgencyID != nil {
		var agency models.Agency
		if err := database.DB.First(&agency, *user.AgencyID).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid agency_id"})
			return
		}
	}

	if !validRoles[updateData.Role] {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid role"})
		return
	}

	user.Name = updateData.Name
	user.Email = updateData.Email
	user.Phone = updateData.Phone
	user.AgencyID = updateData.AgencyID // Update AgencyID
	user.Role = updateData.Role
	if updateData.Password != "" {
		user.Password = updateData.Password
	}

	if err := database.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}

// DeleteUser deletes a user
func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	if err := database.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if err := database.DB.Delete(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

// controllers/userController.go

// UpdateProfilePicture updates user's profile picture
// backend/controllers/userController.go

func UpdateProfilePicture(c *gin.Context) {
	// Get user ID from params
	userID := c.Param("id")

	// Get the file from the request
	file, err := c.FormFile("profile_picture")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded"})
		return
	}

	// Validate file type
	if !strings.HasPrefix(file.Header.Get("Content-Type"), "image/") {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File must be an image"})
		return
	}

	// Create uploads directory if it doesn't exist
	uploadsDir := "uploads/profiles"
	if err := os.MkdirAll(uploadsDir, 0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create uploads directory"})
		return
	}

	// Generate unique filename
	filename := fmt.Sprintf("%s_%s", userID, file.Filename)
	filepath := filepath.Join(uploadsDir, filename)

	// Save the file
	if err := c.SaveUploadedFile(file, filepath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}

	// Update user profile picture in database
	var user models.User
	if err := database.DB.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Delete old profile picture if exists
	if user.ProfilePicture != "" {
		oldFilepath := user.ProfilePicture
		if strings.HasPrefix(oldFilepath, "/uploads/") {
			oldFilepath = "." + oldFilepath
		}
		os.Remove(oldFilepath)
	}

	// Update profile picture path in database
	profilePicturePath := "/" + filepath
	if err := database.DB.Model(&user).Update("profile_picture", profilePicturePath).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile picture in database"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":         "Profile picture updated successfully",
		"profile_picture": profilePicturePath,
	})
}
