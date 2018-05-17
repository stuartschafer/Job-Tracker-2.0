-- Inserting info for the Users table
-- India's pw is 123
-- Mary's pw is 1234
-- Stuart's pw is 12345
USE Job_Tracker_db;

INSERT INTO USERS (name, email, password, createdAt, updatedAt) VALUES ("Stuart", "stuart@mail.com", "$2a$08$.jrNX0mqZ56hb4q9/u9xxe.OJBS/WUQYbJ7CbWRGUpWbIc.GP8dQ6", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Inserting info for the Jobs table for UserId 1
INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, createdAt, updatedAt, UserId)
VALUES ("2018-05-01", "President", "Schafer Enterprise", "Raleigh, NC", "Do everything", "111", "www.schaferenterprise.com", "LinkedIn", 5, "Well, I guess you run this.", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, createdAt, updatedAt, UserId)
VALUES ("2018-05-02", "Vice President", "Schafer Industries", "Charlotte, NC", "Do everything almost everything", "12345", "www.schaferindustries.com", "Glassdoor", 3, "You kinda run things around here.", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO JOBS (date_applied, position, company, location, description, id_number, link, posted_from, interest_level, notes, createdAt, updatedAt, UserId)
VALUES ("2018-05-03", "The Man", "Schafer Incorporated", "Chapel Hill, NC", "Do whatever you want", "85676", "www.schaferincorporated.com", "Zip Recruiter", 10, "Coolest job for the coolest kid.", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);



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
    position VARCHAR(30) NOT NULL, 
    company VARCHAR(20) NOT NULL, 
    location VARCHAR(20) NOT NULL, 
    description VARCHAR(50) NOT NULL, 
    id_number VARCHAR(10),
    link VARCHAR(30),
    posted_from VARCHAR(15), 
    interest_level VARCHAR(2), 
    notes VARCHAR(80), 
    createdAt VARCHAR(70),
    updatedAt VARCHAR(70),
    UserId VARCHAR(10),
    PRIMARY KEY (id)
);