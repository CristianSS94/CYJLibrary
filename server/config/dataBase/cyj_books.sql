CREATE DATABASE cyj_books;

USE cyj_books;

CREATE TABLE user (
  user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  user_name VARCHAR (30) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR (20),
  img VARCHAR (150),
  is_confirmed BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE category (
  category_id TINYINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT, 
  category_name VARCHAR(50) NOT NULL UNIQUE 
);

CREATE TABLE book (
  book_id BIGINT UNSIGNED PRIMARY KEY auto_increment, 
  user_id INT UNSIGNED NOT NULL,
  title VARCHAR (100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category_id TINYINT UNSIGNED NOT NULL,
  year_published YEAR NOT NULL, 
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (category_id) REFERENCES category(category_id)
); 

CREATE TABLE chat (
  chat_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  initiator_id INT UNSIGNED NOT NULL,
  recipient_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (initiator_id) REFERENCES user(user_id),
  FOREIGN KEY (recipient_id) REFERENCES user(user_id)
);

CREATE TABLE message (
  message_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  chat_id INT UNSIGNED NOT NULL,
  sender_id INT UNSIGNED NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chat_id) REFERENCES chat(chat_id),
  FOREIGN KEY (sender_id) REFERENCES user(user_id)
);



INSERT INTO category (category_name) VALUES
  ('Fantasía'),
  ('Amor'),
  ('Drama'),
  ('Aventuras'),
  ('Acción'),
  ('Terror');