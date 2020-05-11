package app

// Product represents a product row in the database
type Product struct {
	ID   int    `db:"id" json:"id,omitempty" swaggertype:"number"`
	Name string `db:"name" json:"name,omitempty" binding:"required" swaggertype:"string"`
	Slug string `db:"slug" json:"slug,omitempty" binding:"required" swaggertype:"string"`
}
