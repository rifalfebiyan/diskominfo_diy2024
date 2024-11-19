package controllers

import (
	"backend/database"
	"backend/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAgencies(c *gin.Context) {
	var agencies []models.Agency
	if err := database.DB.Find(&agencies).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, agencies)
}

func GetAgency(c *gin.Context) {
	id := c.Param("id")
	var agency models.Agency
	if err := database.DB.First(&agency, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Agency not found"})
		return
	}
	c.JSON(http.StatusOK, agency)
}

func CreateAgency(c *gin.Context) {
	fmt.Println("CreateAgency called") // Debug log
	var agency models.Agency
	if err := c.ShouldBindJSON(&agency); err != nil {
		fmt.Println("Error binding JSON:", err) // Debug log
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Printf("Received agency data: %+v\n", agency) // Debug log

	if err := database.DB.Create(&agency).Error; err != nil {
		fmt.Println("Error creating agency:", err) // Debug log
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("Agency created successfully") // Debug log
	c.JSON(http.StatusCreated, agency)
}
func UpdateAgency(c *gin.Context) {
	id := c.Param("id")
	var agency models.Agency
	if err := database.DB.First(&agency, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Agency not found"})
		return
	}

	if err := c.ShouldBindJSON(&agency); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Save(&agency).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, agency)
}

func DeleteAgency(c *gin.Context) {
	id := c.Param("id")
	var agency models.Agency
	if err := database.DB.First(&agency, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Agency not found"})
		return
	}

	if err := database.DB.Delete(&agency).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete agency"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Agency deleted successfully"})
}
