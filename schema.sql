DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(75) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Logitech Wireless Mouse", "Video Games", 8, 15),
  ("Viva Select-a-Size Paper Towels 12pk", "Housewares", 15, 75),
  ("Hershey's Reese's Peanut Butter Mini's 24pk", "Grocery", 5, 180),
  ("Gain Laundry Pods 50ct", "Housewares", 12, 25),
  ("Borax Laundry Whitener", "Housewares", 4, 25),
  ("Hershey's Kisses 12oz", "Grocery", 5, 150),
  ("Twizzler's 18oz", "Grocery", 5, 80),
  ("Bamazon Basics Lightning Cord 6ft ", "Electronics", 15, 20),
  ("Bamazon Basics Lightning Cord 10ft ", "Electronics", 25, 20),
  ("Haribo Gummy Bears 64oz", "Grocery", 10, 50);
