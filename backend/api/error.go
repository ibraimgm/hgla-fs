package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func badRequest(c *gin.Context, err error) {
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
}

func serverError(c *gin.Context, err error) {
	c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
}

func notFound(c *gin.Context) {
	c.JSON(http.StatusNotFound, gin.H{"message": "Not found"})
}
