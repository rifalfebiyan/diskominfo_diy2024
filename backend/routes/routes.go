package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	// Public routes
	public := router.Group("/api")
	{
		public.POST("/login", controllers.Login)
		public.POST("/register", controllers.Register)
	}

	// Protected routes
	protected := router.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		// User routes
		protected.GET("/users", controllers.GetUsers)
		protected.GET("/users/:id", controllers.GetUser)
		protected.POST("/users", controllers.CreateUser)
		protected.PUT("/users/:id", controllers.UpdateUser)
		protected.DELETE("/users/:id", controllers.DeleteUser)
		protected.POST("/users/:id/profile-picture", controllers.UpdateProfilePicture)

		// Department routes
		protected.POST("/departments", controllers.CreateDepartment)
		protected.GET("/departments", controllers.GetDepartments)
		protected.GET("/departments/:id", controllers.GetDepartment)
		protected.PUT("/departments/:id", controllers.UpdateDepartment)
		protected.DELETE("/departments/:id", controllers.DeleteDepartment)
		// Agency routes
		protected.GET("/agencies", controllers.GetAgencies)
		// protected.GET("/agencies/:id", controllers.GetAgency)
		protected.GET("/agencies/:id", controllers.GetAgencyWithDepartments)
		protected.POST("/agencies", controllers.CreateAgency)
		protected.PUT("/agencies/:id", controllers.UpdateAgency)
		protected.DELETE("/agencies/:id", controllers.DeleteAgency)

		// Visitor routes
		protected.GET("/visitors", controllers.GetVisitors)
		protected.POST("/visitors", controllers.CreateVisitor)
		protected.GET("/visitors/:id", controllers.GetVisitor)
		protected.PUT("/visitors/:id", controllers.UpdateVisitor)
		protected.DELETE("/visitors/:id", controllers.DeleteVisitor)

		// Stats route
		protected.GET("/stats", controllers.GetStats)

		// Stats route (jika ada)
		// protected.GET("/stats", controllers.GetStats)
	}
}
