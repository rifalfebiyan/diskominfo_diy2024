package controllers

import (
	"backend/database"
	"backend/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateDepartment(c *gin.Context) {
	fmt.Println("Received request to create department")

	var department models.Department
	if err := c.ShouldBindJSON(&department); err != nil {
		fmt.Printf("Error binding JSON: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Printf("Received department data: %+v\n", department)

	result := database.DB.Create(&department)
	if result.Error != nil {
		fmt.Printf("Error creating department in database: %v\n", result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create department: " + result.Error.Error()})
		return
	}

	fmt.Printf("Department created successfully: %+v\n", department)
	c.JSON(http.StatusCreated, department)
}

func GetDepartments(c *gin.Context) {
	fmt.Println("Received request to get all departments")

	var departments []models.Department
	result := database.DB.Find(&departments)
	if result.Error != nil {
		fmt.Printf("Error fetching departments: %v\n", result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch departments"})
		return
	}

	fmt.Printf("Retrieved %d departments\n", len(departments))
	c.JSON(http.StatusOK, departments)
}

func DeleteDepartment(c *gin.Context) {
	fmt.Println("Received request to delete department")

	id := c.Param("id")
	fmt.Printf("Attempting to delete department with ID: %s\n", id)

	var department models.Department
	if err := database.DB.First(&department, id).Error; err != nil {
		fmt.Printf("Error finding department: %v\n", err)
		c.JSON(http.StatusNotFound, gin.H{"error": "Department not found"})
		return
	}

	if err := database.DB.Delete(&department).Error; err != nil {
		fmt.Printf("Error deleting department: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete department"})
		return
	}

	fmt.Printf("Department with ID %s deleted successfully\n", id)
	c.JSON(http.StatusOK, gin.H{"message": "Department deleted successfully"})
}
