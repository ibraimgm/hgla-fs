-- +migrate Up

CREATE TABLE product (
  id int NOT NULL AUTO_INCREMENT,
  slug varchar(255) NOT NULL,
  name varchar(255) NOT NULL,

  CONSTRAINT pk_products PRIMARY KEY (id)
);

CREATE UNIQUE INDEX idx_product_slug ON product (slug);

CREATE UNIQUE INDEX idx_product_name ON product (slug);
