-- Inserting info for the Users table
USE Job_Tracker_db;

INSERT INTO USERS (name, email, password, createdAt, updatedAt) VALUES ("Stuart", "stuart@mail.com", "$2a$08$.jrNX0mqZ56hb4q9/u9xxe.OJBS/WUQYbJ7CbWRGUpWbIc.GP8dQ6", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Inserting info for the Jobs table for UserId 1
INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-05-01", "President", "Schafer Enterprise", "Raleigh, NC", "Do everything", "111", "www.cnn.com", "LinkedIn", 5, "Well, I guess you run this.", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-05-02", "Vice President", "Schafer Industries", "Charlotte, NC", "Do everything almost everything", "12345", "www.yahoo.com", "Glassdoor", 3, "You kinda run things around here.", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-05-03", "The Man", "Schafer Incorporated", "Chapel Hill, NC", "Do whatever you want", "85676", "www.youtube.com", "Zip Recruiter", 10, "Coolest job for the coolest kid.", "Active", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, status, status_response, createdAt, updatedAt, UserId)
VALUES ("2018-04-03", "Not a good job", "Scrubs R Us", "Blahtown, USA", "Not a good job", "666", "www.yuckband.com/", "Monster", 1, "Yuck, get out of here!", "Inactive", "", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);



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