CREATE DATABASE IF NOT EXISTS master_paging_os;
USE master_paging_os;

CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  passwordHash VARCHAR(255) NOT NULL,
  score INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS QuizQuestions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  options JSON NOT NULL,
  correctAnswer VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Leaderboard (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  score INT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PageTables (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pageNo INT NOT NULL,
  frameNo INT NOT NULL,
  pageSize INT NOT NULL,
  startAddress INT NOT NULL
);

INSERT INTO QuizQuestions (question, options, correctAnswer) VALUES
('Which concept divides memory into fixed-sized blocks?', JSON_ARRAY('Paging','Segmentation','Swapping','Caching'), 'Paging'),
('What does the offset represent in a logical address?', JSON_ARRAY('Page number','Frame number','Distance inside a page','Table index'), 'Distance inside a page'),
('Which algorithm always replaces the page not used for the longest time?', JSON_ARRAY('FIFO','LRU','Optimal','Random'), 'LRU');
