USE ecommerce_db;

SELECT * FROM category;
SELECT * FROM product;
SELECT * FROM tag;
SELECT * FROM product_tag;

SELECT product.id AS ID, product.product_name AS Product, product.price AS Price, product.stock AS Stock, category.category_name AS Category, tag.tag_name as Tag
FROM product
JOIN category ON product.category_id = category.id
JOIN product_tag ON product.id = product_tag.product_id
JOIN tag ON product_tag.tag_id = tag.id;