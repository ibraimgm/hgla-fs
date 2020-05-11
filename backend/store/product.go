package store

import (
	"database/sql"

	"github.com/jmoiron/sqlx"

	"github.com/ibraimgm/backend/app"
)

// FindProductByID returns a product from a given ID.
func FindProductByID(db *sqlx.DB, id int) (*app.Product, error) {
	var p app.Product

	row := db.QueryRowx("SELECT id, name, slug FROM product WHERE id = ?", id)
	if err := row.StructScan(&p); err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		return nil, err
	}

	return &p, nil
}

// ExistsSlugOrName check wether the name or slug already exists in the database.
// If the ID field of the provided product is nonzero, it also check if these existing
// values come from a different database record.
func ExistsSlugOrName(db *sqlx.DB, product *app.Product) (bool, error) {
	var count int64
	var err error

	if product.ID == 0 {
		err = db.QueryRowx("SELECT 1 FROM product WHERE name = ? OR slug = ?", product.Name, product.Slug).Scan(&count)
	} else {
		err = db.QueryRowx("SELECT 1 FROM product WHERE (name = ? OR slug = ?) AND id <> ?", product.Name, product.Slug, product.ID).Scan(&count)
	}

	if err != nil && err != sql.ErrNoRows {
		return false, err
	}

	return count == 1, nil
}

// InsertProduct inserts a new product in the database, returning
// the newly inserted product
func InsertProduct(db *sqlx.DB, product *app.Product) error {
	res, err := db.Exec("INSERT INTO product(name, slug) VALUES(?, ?)", product.Name, product.Slug)
	if err != nil {
		return err
	}

	lastid, err := res.LastInsertId()
	if err != nil {
		return err
	}

	product.ID = int(lastid)
	return nil
}

// UpdateProduct updates an existing product in the database.
func UpdateProduct(db *sqlx.DB, product *app.Product) error {
	if _, err := db.Exec("UPDATE product SET name = ?, slug = ? WHERE id = ?", product.Name, product.Slug, product.ID); err != nil {
		return err
	}

	return nil
}

// DeleteProductByID removes a product from the database.
// It also deletes the associated prices.
func DeleteProductByID(db *sqlx.DB, id int) error {
	if _, err := db.Exec("DELETE FROM product_price WHERE product_id = ?", id); err != nil {
		return err
	}

	if _, err := db.Exec("DELETE FROM product WHERE id = ?", id); err != nil {
		return err
	}

	return nil
}
