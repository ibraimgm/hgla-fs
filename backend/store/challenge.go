package store

import "github.com/jmoiron/sqlx"

const pricesSQL = `
	SELECT
				p.id,
        p.name,
        p.slug,
        ct.name as cycle,
        pp.months,
        pp.price_renew,
        pp.price_order
  FROM product_price pp
  JOIN product p
    ON p.id = pp.product_id
  JOIN cycle_type ct
    ON ct.id = pp.cycle_id
	`

// GetPricesByID returns the plan and the pricing info, on one go,
// in a map where the keys are the product slug, and each product follows
// the structure below:
// {
//   "productSlug": {
//	   "id":"...",
//	   "name":"...",
//	   "cycle": {
//	     "cycleName": {...}
//     }
//   }
// }
//
// This was done with a map to avoid mapping multiple structs and doind
// multiple database roundtrips on the server.
//
// Note that id id is a zerovalue, the pricing of all products is returned
func GetPricesByID(db *sqlx.DB, id int) (map[string]interface{}, error) {
	var err error

	// get everything in one go
	rows := []struct {
		ID         string  `db:"id"`
		Name       string  `db:"name"`
		Slug       string  `db:"slug"`
		Cycle      string  `db:"cycle"`
		Months     int     `db:"months"`
		PriceRenew float64 `db:"price_renew"`
		PriceOrder float64 `db:"price_order"`
	}{}

	if id == 0 {
		err = db.Select(&rows, pricesSQL)
	} else {
		err = db.Select(&rows, pricesSQL+"WHERE pp.product_id = ?", id)
	}

	if err != nil {
		return nil, err
	}

	// build a map in the specified format
	result := make(map[string]interface{})

	for _, row := range rows {
		var product, cycle map[string]interface{}

		if prod, ok := result[row.Slug]; !ok {
			product = make(map[string]interface{})
			cycle = make(map[string]interface{})

			product["name"] = row.Name
			product["id"] = row.ID
			product["cycle"] = cycle
			result[row.Slug] = product
		} else {
			product, _ = prod.(map[string]interface{})
			cycle, _ = product["cycle"].(map[string]interface{})
		}

		cycle[row.Cycle] = map[string]interface{}{
			"priceRenew": row.PriceRenew,
			"priceOrder": row.PriceOrder,
			"months":     row.Months,
		}
	}

	return result, nil
}
