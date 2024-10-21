package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func DepartmentRoutes(router *gin.RouterGroup) {
	router.POST("/departments", controllers.CreateDepartment)
	router.GET("/departments", controllers.GetDepartments)
	router.DELETE("/api/departments/:id", controllers.DeleteDepartment)

}
