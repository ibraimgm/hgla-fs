package api

import (
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

// Server represents the main application server, that holds the
// preconfigured database connection and a reference to the gin engine.
type Server struct {
	db *sqlx.DB
	r  *gin.Engine
}

// NewServer returns a new instance of the application server.
// The resulting server already has a set of routes mapped
func NewServer(db *sqlx.DB, r *gin.Engine) *Server {
	s := &Server{
		db: db,
		r:  r,
	}

	// setup routes
	r.GET("/product/:id", s.getProduct)
	r.POST("/product", s.insertProduct)
	r.PUT("/product/:id", s.updateProduct)
	r.DELETE("/product/:id", s.deleteProduct)

	return s
}

// Run starts the server, akin to the Run method of
// the gin engine
func (s *Server) Run() error {
	if err := s.r.Run(); err != nil {
		return err
	}

	return nil
}
