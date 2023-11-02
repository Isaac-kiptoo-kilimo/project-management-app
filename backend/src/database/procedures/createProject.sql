CREATE OR ALTER PROCEDURE createProject(
    @project_id VARCHAR(100),
    @project_name VARCHAR(250),
    @description VARCHAR(500),
    @endDate VARCHAR(100) 
    
     )
AS 
BEGIN
     INSERT INTO Projects(project_id,project_name,description,endDate
     )
     VALUES( @project_id ,
    @project_name ,@description,
     @endDate )

END

DROP PROCEDURE createProject