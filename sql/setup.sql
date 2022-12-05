-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db
DROP TABLE IF EXISTS films;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS pedals; 

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

CREATE TABLE albums (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  title VARCHAR NOT NULL,
  artist VARCHAR NOT NULL, 
  genre VARCHAR NOT NULL,
  year INT NOT NULL
);


INSERT INTO
albums (title, artist, genre, year) 
VALUES 
('Strangers from the Universe', 'Thinking Fellers Union Local 282', 'Art Rock', 1994),
('The Acrobats', 'Helvetia', 'Rock', 2007),
('Start a People', 'Black Moth Super Rainbow', 'Psychedelic/Electronic', 2004),
('Merriweather Post Pavilion', 'Animal Collective', 'Experimental Pop', 2009),
('Spiderland', 'Slint', 'Rock', 1991),
('Isnt Anything', 'My Bloody Valentine', 'Shoegaze', 1988),
('Building Nothing Out of Something', 'Modest Mouse', 'Rock', 2000),
('Richard D. James Album', 'Aphex Twin', 'Electronic', 1996);


CREATE TABLE pedals (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  maker VARCHAR NOT NULL
);

INSERT INTO
pedals (name, maker)
VALUES 
('Loomer', 'Keeley'),
('Russian Pickle', 'Way Huge'),
('MS-50G', 'Zoom'),
('Blues Driver', 'Boss');