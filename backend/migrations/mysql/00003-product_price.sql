-- +migrate Up

CREATE TABLE product_price (
  product_id int NOT NULL,
  cycle_id int NOT NULL,
  months int NOT NULL,
  price_renew DECIMAL(9,2) NOT NULL,
  price_order DECIMAL(9,2) NOT NULL,

  CONSTRAINT pk_product_price PRIMARY KEY (product_id, cycle_id),
  CONSTRAINT ckc_product_price_months CHECK (months > 0),
  CONSTRAINT ckc_product_price_renew CHECK (price_renew >= 0),
  CONSTRAINT ckc_product_price_order CHECK (price_order >= 0)
);

ALTER TABLE product_price ADD FOREIGN KEY (product_id) REFERENCES product (id);

ALTER TABLE product_price ADD FOREIGN KEY (cycle_id) REFERENCES cycle_type (id);
