CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    address TEXT,
    username VARCHAR(255)
);

INSERT INTO users (id, full_name, email, password, address, username) VALUES (1, 'Test Kullanıcı', 'user@test.com', '123456', 'İstanbul, Türkiye', NULL);
INSERT INTO users (id, full_name, email, password, address, username) VALUES (2, NULL, 'emre@gmail.com', '1234', NULL, 'emre');
INSERT INTO users (id, full_name, email, password, address, username) VALUES (3, NULL, 'admin@admin.com', '123', NULL, 'admin');
INSERT INTO users (id, full_name, email, password, address, username) VALUES (4, NULL, 'emre123@gmail.com', '1234', NULL, 'emre123');
INSERT INTO users (id, full_name, email, password, address, username) VALUES (5, NULL, 'emre1234@gmail.com', '1234', NULL, 'emre1234');