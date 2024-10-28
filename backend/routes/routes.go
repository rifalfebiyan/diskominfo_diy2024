// routes/routes.go
package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	api := router.Group("/api")
	{
		// Auth routes (unprotected)
		api.POST("/login", controllers.Login)
		api.POST("/register", controllers.Register)

		// Protected routes
		protected := api.Group("")
		protected.Use(middleware.AuthMiddleware())
		{
			// User routes
			protected.GET("/users", controllers.GetUsers)
			protected.GET("/users/:id", controllers.GetUser)
			protected.POST("/users", controllers.CreateUser)
			protected.PUT("/users/:id", controllers.UpdateUser)
			protected.DELETE("/users/:id", controllers.DeleteUser)

			// Department routes
			protected.GET("/departments", controllers.GetDepartments)
			protected.POST("/departments", controllers.CreateDepartment)
			protected.GET("/departments/:id", controllers.GetDepartment)
			protected.PUT("/departments/:id", controllers.UpdateDepartment)
			protected.DELETE("/departments/:id", controllers.DeleteDepartment)

			// Visitor routes
			protected.GET("/visitors", controllers.GetVisitors)
			protected.POST("/visitors", controllers.CreateVisitor)
			protected.GET("/visitors/:id", controllers.GetVisitor)
			protected.PUT("/visitors/:id", controllers.UpdateVisitor)
			protected.DELETE("/visitors/:id", controllers.DeleteVisitor)
		}
	}
}
