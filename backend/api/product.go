package api

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ibraimgm/backend/app"
	"github.com/ibraimgm/backend/store"
)

// @Summary getProduct
// @Description Returns a product
// @Tags product
// @Produce json
// @Param id path string true "The ID of the product"
// @Success 200 {object} app.Product "Returns a json object with the requested product."
// @Router /product/{id} [get]
func (s *Server) getProduct(c *gin.Context) {
	id, err := paramInt(c, "id")
	if err != nil {
		badRequest(c, err)
		return
	}

	p, err := store.FindProductByID(s.db, id)
	if err != nil {
		badRequest(c, err)
		return
	}

	if p == nil {
		notFound(c)
		return
	}

	c.JSON(http.StatusOK, p)
}

// @Summary insertProduct
// @Description Creates a new product
// @Tags product
// @Produce json
// @Param product body app.Product true "The product to be created."
// @Success 201 {object} app.Product "Returns a json object with the newly created product."
// @Router /product [POST]
func (s *Server) insertProduct(c *gin.Context) {
	var p app.Product

	// bind the request body, ignoring the ID supplied by the user
	if err := c.ShouldBind(&p); err != nil {
		badRequest(c, err)
		return
	}
	p.ID = 0

	// check for unique values
	if exists, err := store.ExistsSlugOrName(s.db, &p); exists {
		badRequest(c, errors.New("Name or Slug already exists in database"))
		return
	} else if err != nil {
		serverError(c, err)
		return
	}

	if err := store.InsertProduct(s.db, &p); err != nil {
		serverError(c, err)
		return
	}

	c.JSON(http.StatusCreated, p)
}

// @Summary updateProduct
// @Description Updates an existing product
// @Tags product
// @Produce json
// @Param id path string true "The ID of the product"
// @Param product body app.Product true "The product to be updated."
// @Success 204 {object} app.Product "Returns a json object with the updated product."
// @Router /product/{id} [PUT]
func (s *Server) updateProduct(c *gin.Context) {
	// get the id from url params
	id, err := paramInt(c, "id")
	if err != nil {
		badRequest(c, err)
		return
	}

	// bind the request body, ignoring the ID supplied by the user
	// and using the one from the url instead
	var p app.Product
	if err := c.ShouldBind(&p); err != nil {
		badRequest(c, err)
		return
	}
	p.ID = id

	// does this product exists?
	if existing, err := store.FindProductByID(s.db, id); err != nil {
		serverError(c, err)
		return
	} else if existing == nil {
		notFound(c)
		return
	}

	// check for unique values
	if exists, err := store.ExistsSlugOrName(s.db, &p); exists {
		badRequest(c, errors.New("Name or Slug already exists in database"))
		return
	} else if err != nil {
		serverError(c, err)
		return
	}

	if err := store.UpdateProduct(s.db, &p); err != nil {
		serverError(c, err)
		return
	}

	c.JSON(http.StatusNoContent, p)
}

// @Summary deleteProduct
// @Description Deletes a product
// @Tags product
// @Produce json
// @Param id path string true "The ID of the product"
// @Success 204
// @Router /product/{id} [delete]
func (s *Server) deleteProduct(c *gin.Context) {
	// get the id from url params
	id, err := paramInt(c, "id")
	if err != nil {
		badRequest(c, err)
		return
	}

	// delete the product and the associated data
	if err := store.DeleteProductByID(s.db, id); err != nil {
		serverError(c, err)
		return
	}

	c.JSON(http.StatusNoContent, nil)
}
