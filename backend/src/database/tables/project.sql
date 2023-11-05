CREATE TABLE Projects (
    project_id VARCHAR(100) NOT NULL,
    project_name VARCHAR(250) NOT NULL,
    description VARCHAR(500) NOT NULL,
    endDate VARCHAR(100) NOT NULL,
    deleted BIT DEFAULT 0,
    projectStatus VARCHAR(255) DEFAULT 'unassigned' CHECK (projectStatus IN ('unassigned', 'assigned')),
    user_id VARCHAR(100) FOREIGN KEY REFERENCES Users(user_id),
    completed VARCHAR(255) DEFAULT 'in progress' CHECK (completed IN ('in progress', 'completed'))
    
);



SELECT * FROM Projects

DROP TABLE Projects
