CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    date DATE,
    rating INTEGER,
    text TEXT,
    username VARCHAR(255),
    product_id INTEGER
);

INSERT INTO reviews (id, date, rating, text, username, product_id) VALUES (4, '2026-01-02', 5, 'The best!
', 'emre@gmail.com', 4);