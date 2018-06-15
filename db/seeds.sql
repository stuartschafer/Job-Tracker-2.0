-- Inserting info for the Users table
USE Job_Tracker_db;

-- Email: stu@mail.com
-- PW: 12345
INSERT INTO USERS (name, email, password, settings, security_questions, createdAt, updatedAt) VALUES ('Stuart', 'stu@mail.com', '$2a$08$.jrNX0mqZ56hb4q9/u9xxe.OJBS/WUQYbJ7CbWRGUpWbIc.GP8dQ6', '{"sound":"on","alert":"28","order_by":"interest_level","sort_by":"desc","display_length":"25","id_column":"display","posted_from_column":"display","location_column":"display","name":"Stuart Schafer"}', '{"q1":"J7101PN`0HApi~&yCa?X)3I7Ydv]Q&2cPs2","q2":"W9201)rg7xR:>aIlGx~eagGmB2{wi`>wi0X"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Inserting info for the Jobs table for UserId 1
INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("04-02-2018", "President", "Schafer Enterprise", "Raleigh, NC", "111", "www.cnn.com", "LinkedIn", 5, "Well, I guess you run this.", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("05-02-2018", "Vice President", "Schafer Industries", "Charlotte, NC", "12345", "www.yahoo.com", "Glassdoor", 3, "You kinda run things around here.", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("05-13-2018", "The Man", "Schafer Incorporated", "Chapel Hill, NC", "85676", "https://www.youtube.com/watch?v=Uj1ykZWtPYI", "Zip Recruiter", 10, "Coolest job for the coolest kid.", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("04-11-2018", "The Boss", "Bestest Company Inc", "Morrisville, NC", "42234", "www.theonion.com", "Indeed", 8, "You are in charge", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("05-12-2018", "Just Do It", "Niiiiike", "Cary, NC", "fsd34", "www.seinfeld.com", "Glassdoor", 7, "Yessiry!", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("05-05-2018", "Coolio", "Like It Here", "Charlotte, NC", "54tg", "www.good.com", "LinkedIn", 8, "Sounds promising", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("05-08-2018", "Pretty Good Job", "Important Things, Inc", "Fayetteville, NC", "rgeg", "www.great.com", "LinkedIn", 6, "Could be exciting", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("04-06-2018", "Me Likey", "Good Times", "Durham, NC", "657th", "www.bestest.com", "LinkedIn", 5, "Well, let's see", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("04-16-2018", "Sounds Good", "Proper Thoughts", "Raleigh, NC", "897yku", "www.likelygreat.com", "Zip Recruiter", 10, "Perfect fit", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("04-29-2018", "Great Days Ahead", "Use Best Judgement", "Cary, NC", "cxsfew432", "www.doit.com", "Careerbuilder", 9, "I love this opportunity", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("05-06-2018", "Big Time", "Never Let You Down", "Durham, NC", "76yt", "www.haveaniceday.com", "LinkedIn", 7, "Grrrrrrreat!", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("05-17-2018", "You Got This", "Yesssssss", "Raleigh, NC", "123qw", "www.yeppers.com", "Monster", 8, "Okie Dokie", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("05-07-2018", "This Sounds Promising", "Working Here", "Durham, NC", "sdf23", "www.gotthejob.com", "LinkedIn", 6, "Let me see how this plays out", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("05-19-2018", "Perfect Fit", "Perfection Inc", "Raleigh, NC", "98fdn3", "www.lookinggood.com", "Zip Recruiter", 10, "OH YEAH!!!", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);








INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("04-23-2018", "Not good", "Scrubs R Us", "Blahtown, USA", "666", "www.yuckband.com", "Monster", 1, "Yuck, get out of here!", "Inactive", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("05-10-2018", "Very Bad", "Do No Good", "Badtown, USA", "xxxxx", "www.yucky.com", "Zip Recruiter", 2, "Uhh, prob not a good idea", "Inactive", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("04-30-2018", "Not a good job", "Clank", "Runaway, USA", "badbad", "www.gross.com", "Careerbuilder", 4, "Nah bruh", "Inactive", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("05-08-2018", "Yucky", "Sir Yucks a Lot", "Oops, USA", "FU", "www.worser.com", "LinkedIn", 3, "NOPE", "Inactive", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("04-17-2018", "Hate It", "Bummer", "Frickin-A, USA", "6X6X6X", "www.baddddd.com", "Monster", 1, "Not a chance", "Inactive", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);





CREATE TABLE USERS (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(70) NOT NULL,
    settings MEDIUMTEXT,
    security_questions MEDIUMTEXT,
    createdAt VARCHAR(70),
    updatedAt VARCHAR(70),
    status VARCHAR(20),
    PRIMARY KEY (id)
);

CREATE TABLE JOBS (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    date_applied VARCHAR(100) NOT NULL, 
    position VARCHAR(100) NOT NULL, 
    company VARCHAR(100) NOT NULL, 
    location VARCHAR(100) NOT NULL, 
    id_number VARCHAR(50),
    link MEDIUMTEXT,
    posted_from VARCHAR(50), 
    interest_level VARCHAR(2), 
    notes MEDIUMTEXT,
    status VARCHAR(10),
    status_response MEDIUMTEXT,
    createdAt VARCHAR(50),
    updatedAt VARCHAR(50),
    UserId VARCHAR(100),
    PRIMARY KEY (id)
);