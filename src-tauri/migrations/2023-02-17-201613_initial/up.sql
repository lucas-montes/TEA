-- Your SQL goes here
-- TIMESTAMP -> YYYY-MM-DD HH:MM:SS

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)
-- CREATE TABLE alias (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     title TEXT NOT NULL,
--     created_at TIMESTAMP
-- )
-- CREATE TABLE kanban (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     title TEXT NOT NULL,
--     created_at TIMESTAMP
-- )
-- CREATE TABLE categories (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     title TEXT NOT NULL,
--     created_at TIMESTAMP
-- )
-- CREATE TABLE schedules (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     title TEXT NOT NULL,
--     created_at TIMESTAMP
-- )