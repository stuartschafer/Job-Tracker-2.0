-- Inserting info for the Users table
USE Job_Tracker_db;

-- Email: stu@mail.com
-- PW: 12345
INSERT INTO USERS (name, email, password, createdAt, updatedAt) VALUES ("Stuart", "stuart@mail.com", "$2a$08$.jrNX0mqZ56hb4q9/u9xxe.OJBS/WUQYbJ7CbWRGUpWbIc.GP8dQ6", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Inserting info for the Jobs table for UserId 1
INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-04-01", "President", "Schafer Enterprise", "Raleigh, NC", "Do everything", "111", "www.cnn.com", "LinkedIn", 5, "Well, I guess you run this.", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-05-02", "Vice President", "Schafer Industries", "Charlotte, NC", "Do everything almost everything", "12345", "www.yahoo.com", "Glassdoor", 3, "You kinda run things around here.", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-05-13", "The Man", "Schafer Incorporated", "Chapel Hill, NC", "Do whatever you want", "85676", "https://www.youtube.com/watch?v=Uj1ykZWtPYI", "Zip Recruiter", 10, "Coolest job for the coolest kid.", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-04-11", "The Boss", "Bestest Company Inc", "Morrisville, NC", "Run things", "42234", "www.theonion.com", "Indeed", 8, "You are in charge", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-05-12", "Just Do It", "Niiiiike", "Cary, NC", "It's gotta be the shoes", "fsd34", "www.seinfeld.com", "Glassdoor", 7, "Yessiry!", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-05-05", "Coolio", "Like It Here", "Charlotte, NC", "You will like", "54tg", "www.good.com", "LinkedIn", 8, "Sounds promising", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-05-08", "Pretty Good Job", "Important Things, Inc", "Fayetteville, NC", "Sounds good", "rgeg", "www.great.com", "LinkedIn", 6, "Could be exciting", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-04-06", "Me Likey", "Good Times", "Durham, NC", "Make it work", "657th", "www.bestest.com", "LinkedIn", 5, "Well, let's see", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-04-16", "Sounds Good", "Proper Thoughts", "Raleigh, NC", "Does important stuff", "897yku", "www.likelygreat.com", "Zip Recruiter", 10, "Perfect fit", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-04-29", "Great Days Ahead", "Use Best Judgement", "Cary, NC", "Not a Dull moment", "cxsfew432", "www.doit.com", "Careerbuilder", 9, "I love this opportunity", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-05-06", "Big Time", "Never Let You Down", "Durham, NC", "Get Ahead", "76yt", "www.haveaniceday.com", "LinkedIn", 7, "Grrrrrrreat!", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-05-17", "You Got This", "Yesssssss", "Raleigh, NC", "Nice time here", "123qw", "www.yeppers.com", "Monster", 8, "Okie Dokie", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-05-07", "This Sounds Promising", "Working Here", "Durham, NC", "You Can Do It", "sdf23", "www.gotthejob.com", "LinkedIn", 6, "Let me see how this plays out", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-05-19", "Perfect Fit", "Perfection Inc", "Raleigh, NC", "Nice time here", "98fdn3", "www.lookinggood.com", "Zip Recruiter", 10, "OH YEAH!!!", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);








INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-04-23", "Not good", "Scrubs R Us", "Blahtown, USA", "Not a good job", "666", "www.yuckband.com", "Monster", 1, "Yuck, get out of here!", "Inactive", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-05-10", "Very Bad", "Do No Good", "Badtown, USA", "Do nothing good", "xxxxx", "www.yucky.com", "Zip Recruiter", 2, "Uhh, prob not a good idea", "Inactive", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-04-30", "Not a good job", "Clank", "Runaway, USA", "You will hate this", "badbad", "www.gross.com", "Careerbuilder", 4, "Nah bruh", "Inactive", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-05-08", "Yucky", "Sir Yucks a Lot", "Oops, USA", "Have a bad time", "FU", "www.worser.com", "LinkedIn", 3, "NOPE", "Inactive", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-04-17", "Hate It", "Bummer", "Frickin-A, USA", "Regret It", "6X6X6X", "www.baddddd.com", "Monster", 1, "Not a chance", "Inactive", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);





CREATE TABLE USERS (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(70) NOT NULL,
    createdAt VARCHAR(70),
    updatedAt VARCHAR(70),
    status VARCHAR(20),
    PRIMARY KEY (id)
);

CREATE TABLE JOBS (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    date_applied VARCHAR(30) NOT NULL, 
    position VARCHAR(40) NOT NULL, 
    company VARCHAR(30) NOT NULL, 
    location VARCHAR(30) NOT NULL, 
    description VARCHAR(50) NOT NULL, 
    id_number VARCHAR(20),
    link VARCHAR(40),
    posted_from VARCHAR(25), 
    interest_level VARCHAR(2), 
    notes MEDIUMTEXT,
    status MEDIUMTEXT,
    status_response MEDIUMTEXT,
    createdAt VARCHAR(70),
    updatedAt VARCHAR(70),
    UserId VARCHAR(100),
    PRIMARY KEY (id)
);