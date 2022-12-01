-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db
DROP TABLE IF EXISTS films;

CREATE TABLE films (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  title VARCHAR NOT NULL,
  director VARCHAR NOT NULL, 
  genre VARCHAR NOT NULL,
  year INT NOT NULL
);

INSERT INTO
films (title, director, genre, year) 
VALUES 
('There Will Be Blood', 'Paul Thomas Anderson', 'Period Drama', 2007),
('A Clockwork Orange', 'Stanley Kubrick', 'Dystopian Crime', 1971),
('Raising Arizona', 'Ethan Coen', 'Comedy', 1987),
('Punch-Drunk Love', 'Paul Thomas Anderson', 'Comedy', 2002),
('Trainspotting', 'Danny Boyle', 'Comedy-Drama', 1996),
('Moonfall', 'Who Cares', 'Bad', 2022),
('The Grand Budapest Hotel', 'Wes Anderson', 'Comedy', 2014),
('Oldboy', 'Park Chan-wook', 'Neo-Noir Action Thriller', 2003);