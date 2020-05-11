package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ibraimgm/backend/store"
)

// @Summary getPrices
// @Description Returns the pricing list of all products
// @Tags challenge
// @Produce json
// @Success 200 "Returns a json object with the all the pricing info."
// @Router /prices [get]
func (s *Server) getPrices(c *gin.Context) {
	prices, err := store.GetPricesByID(s.db, 0)
	if err != nil {
		serverError(c, err)
		return
	}

	//if we have no data, just send and empty value
	if len(prices) == 0 {
		c.JSON(http.StatusOK, struct{}{})
		return
	}

	// wrap into "shared/products", as specified in the
	// challenge sample result
	c.JSON(http.StatusOK, map[string]interface{}{
		"shared": map[string]interface{}{
			"products": prices,
		},
	})
}

// @Summary getPrices
// @Description Returns the pricing list of one product
// @Tags challenge
// @Produce json
// @Param id path int true "The ID of the product"
// @Success 200 "Returns a json object with pricing of a product."
// @Router /prices/{id} [get]
func (s *Server) getPricesByID(c *gin.Context) {
	id, err := paramInt(c, "id")
	if err != nil {
		badRequest(c, err)
		return
	}

	prices, err := store.GetPricesByID(s.db, id)
	if err != nil {
		serverError(c, err)
		return
	}

	// the loop will run either 0 or one time only,
	// because we filtered the data on the store call
	for k := range prices {
		product := prices[k]
		c.JSON(http.StatusOK, product)
		return
	}

	c.JSON(http.StatusOK, struct{}{})
}
