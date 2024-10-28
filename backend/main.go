package main

import (
	"backend/database"
	"backend/models"
	"backend/routes"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Initialize database
	database.Connect()
	database.DB.AutoMigrate(&models.Visitor{})
	database.DB.AutoMigrate(&models.Visitor{}, &models.User{})

	// Initialize Gin router
	router := gin.Default()

	// CORS configuration
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"} // Sesuaikan dengan URL frontend Anda
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	config.AllowCredentials = true

	// Use CORS middleware
	router.Use(cors.New(config))

	// Setup routes
	api := router.Group("/api")
	routes.VisitorRoutes(api)
	routes.DepartmentRoutes(api)
	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port if not specified
	}

	log.Printf("Server is starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
