package api

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

func paramInt(c *gin.Context, name string) (int, error) {
	v := c.Param(name)
	i64, err := strconv.ParseInt(v, 10, 0)
	if err != nil {
		return 0, err
	}

	return int(i64), nil
}
