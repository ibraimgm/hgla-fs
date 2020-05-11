-- +migrate Up

CREATE TABLE cycle_type (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,

  CONSTRAINT pk_cycle_type PRIMARY KEY (id)
);

CREATE UNIQUE INDEX idx_cycle_type_name ON cycle_type (name);
