CREATE DATABASE IF NOT EXISTS search_app;
USE search_app;

CREATE TABLE IF NOT EXISTS search_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  search_term VARCHAR(255) NOT NULL,
  search_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);