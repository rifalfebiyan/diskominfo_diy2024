package controllers

import (
	"backend/database"
	"backend/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetDepartments(c *gin.Context) {
	var departments []models.Department
	if err := database.DB.Preload("Agency").Find(&departments).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	fmt.Println(departments) // Log data untuk debugging
	c.JSON(http.StatusOK, departments)
}

func GetDepartment(c *gin.Context) {
	id := c.Param("id")
	var department models.Department
	if err := database.DB.Preload("Agency").First(&department, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Department not found"})
		return
	}
	c.JSON(http.StatusOK, department)
}

func CreateDepartment(c *gin.Context) {
	var department models.Department
	if err := c.ShouldBindJSON(&department); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Validasi semua field yang diperlukan
	if department.Name == "" || department.Address == "" || department.Phone == "" || department.Status == "" || department.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Semua field harus diisi"})
		return
	}

	// Validasi AgencyID
	var agency models.Agency
	if err := database.DB.First(&agency, department.AgencyID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Agency ID"})
		return
	}

	if err := database.DB.Create(&department).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create department"})
		return
	}

	c.JSON(http.StatusCreated, department)
}

func UpdateDepartment(c *gin.Context) {
	id := c.Param("id")
	var department models.Department
	if err := database.DB.First(&department, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Department not found"})
		return
	}

	if err := c.ShouldBindJSON(&department); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validasi AgencyID
	var agency models.Agency
	if err := database.DB.First(&agency, department.AgencyID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Agency ID"})
		return
	}

	if err := database.DB.Save(&department).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, department)
}

func DeleteDepartment(c *gin.Context) {
	id := c.Param("id")
	var department models.Department
	if err := database.DB.First(&department, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Department not found"})
		return
	}

	// Sebelum menghapus, periksa apakah ada data terkait yang perlu ditangani
	// Misalnya, jika ada relasi dengan tabel lain, Anda bisa menanganinya di sini

	if err := database.DB.Delete(&department).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete department"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Department deleted successfully"})
}
