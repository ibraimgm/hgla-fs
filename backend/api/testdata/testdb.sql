/*
  SAMPLE SQLITE SCRIPT FOR TESTING PURPOSES

  This happens to be equal the 'real' migration script because this is a demo
  application. On real world, the contents (maybe apart from the schema itself)
  will be very different.
*/

CREATE TABLE product (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug varchar(255) NOT NULL,
  name varchar(255) NOT NULL
);
CREATE UNIQUE INDEX idx_product_slug ON product (slug);
CREATE UNIQUE INDEX idx_product_name ON product (slug);

CREATE TABLE cycle_type (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name varchar(255) NOT NULL
);
CREATE UNIQUE INDEX idx_cycle_type_name ON cycle_type (name);

CREATE TABLE product_price (
  product_id INTEGER NOT NULL,
  cycle_id INTEGER NOT NULL,
  months INTEGER NOT NULL,
  price_renew DECIMAL(9,2) NOT NULL,
  price_order DECIMAL(9,2) NOT NULL,

  CONSTRAINT pk_product_price PRIMARY KEY (product_id, cycle_id),
  CONSTRAINT ckc_product_price_months CHECK (months > 0),
  CONSTRAINT ckc_product_price_renew CHECK (price_renew >= 0),
  CONSTRAINT ckc_product_price_order CHECK (price_order >= 0),
  CONSTRAINT fk_product_price_product FOREIGN KEY (product_id) REFERENCES product (id)
  CONSTRAINT fk_product_price_cycle FOREIGN KEY (cycle_id) REFERENCES cycle_type (id)
);

INSERT INTO cycle_type (id, name) VALUES(1, 'monthly');
INSERT INTO cycle_type (id, name) VALUES(2, 'semiannually');
INSERT INTO cycle_type (id, name) VALUES(3, 'biennially');
INSERT INTO cycle_type (id, name) VALUES(4, 'triennially');
INSERT INTO cycle_type (id, name) VALUES(5, 'quarterly');
INSERT INTO cycle_type (id, name) VALUES(6, 'annually');


INSERT INTO product (id, slug, name) VALUES(5, 'planoP', 'Plano P');
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(5, 1,  1,  24.19,  24.19);
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(5, 2,  6, 128.34, 128.34);
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(5, 3, 24, 393.36, 393.36);
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(5, 4, 36, 561.13, 561.13);
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(5, 5,  3,  67.17,  67.17);
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(5, 6, 12, 220.66, 220.66);

INSERT INTO product (id, slug, name) VALUES(6, 'planoM', 'Plano M');
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(6, 1,  1,  29.69,  29.69);
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(6, 2,  6, 159.54, 159.54);
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(6, 3, 24, 532.56, 532.56);
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(6, 4, 36, 764.22, 764.22);
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(6, 5,  3,  82.77,  82.77);
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(6, 6, 12, 286.66, 286.66);

INSERT INTO product (id, slug, name) VALUES(335, 'planoTurbo', 'Plano Turbo');
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(335, 1,  1,   44.99,  44.99);
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(335, 2,  6,  257.94,  257.94);
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(335, 3, 24,  983.76,  983.76);
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(335, 4, 36, 1439.64, 1439.64);
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(335, 5,  3,  131.97,  131.97);
INSERT INTO product_price (product_id, cycle_id, months, price_renew, price_order) VALUES(335, 6, 12,  503.88,  503.88);
