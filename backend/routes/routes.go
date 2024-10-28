package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func DepartmentRoutes(router *gin.RouterGroup) {
	router.POST("/departments", controllers.CreateDepartment)
	router.GET("/departments", controllers.GetDepartments)
	router.GET("/departments/:id", middleware.AuthMiddleware(), controllers.GetDepartment) // Add this line
	router.PUT("/departments/:id", controllers.UpdateDepartment)                           // Add this line for updates
	router.DELETE("/departments/:id", middleware.AuthMiddleware(), controllers.DeleteDepartment)
	UserRoutes(router)
	LoginRoutes(router)
}

func UserRoutes(router *gin.RouterGroup) {
	router.GET("/users", controllers.GetUsers)
	router.GET("/users/:id", controllers.GetUser)
	router.POST("/users", controllers.CreateUser)
	router.PUT("/users/:id", controllers.UpdateUser)
	router.DELETE("/users/:id", controllers.DeleteUser)
}

func VisitorRoutes(router *gin.RouterGroup) {
	router.GET("/visitors", middleware.AuthMiddleware(), controllers.GetVisitors)
	router.GET("/visitors/:id", middleware.AuthMiddleware(), controllers.GetVisitor)
	router.POST("/visitors", controllers.CreateVisitor)
	router.PUT("/visitors/:id", controllers.UpdateVisitor)
	router.DELETE("/visitors/:id", middleware.AuthMiddleware(), controllers.DeleteVisitor)
}

func LoginRoutes(router *gin.RouterGroup) {
	router.POST("/login", controllers.Login)
}
