-- Table: orders

DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    total_price DECIMAL(10, 2),
    order_date DATE,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
      REFERENCES users(id)
);

-- Data: orders

INSERT INTO orders (id, user_id, total_price, order_date) VALUES (1, 1, 1500.00, '2025-01-02');
INSERT INTO orders (id, user_id, total_price, order_date) VALUES (2, 2, 450.50, '2025-01-03');
INSERT INTO orders (id, user_id, total_price, order_date) VALUES (3, 1, 3200.00, '2025-01-03');