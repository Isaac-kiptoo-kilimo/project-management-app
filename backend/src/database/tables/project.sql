CREATE TABLE Projects(
    project_id VARCHAR(100) NOT NULL,
    project_name VARCHAR(250) NOT NULL,
    description VARCHAR(500) NOT NULL,
    endDate VARCHAR(100) NOT NULL,
    deleted BIT Default 0,
    user_id VARCHAR(100) FOREIGN KEY REFERENCES Users(user_id)
)

SELECT * FROM Projects

DROP TABLE Projects
