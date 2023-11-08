CREATE OR ALTER PROCEDURE assignProject(
    @project_id VARCHAR(100),
    @user_id VARCHAR(100)
)
AS
BEGIN
    
    IF EXISTS (SELECT 1 FROM projects WHERE project_id = @project_id AND projectStatus = 'unassigned')
    BEGIN
      
        UPDATE projects
        SET projectStatus = 'assigned', user_id = @user_id
        WHERE project_id = @project_id;
        PRINT 'Project assigned successfully.';
    END
    ELSE
    BEGIN
        PRINT 'Project is already assigned or does not exist.';
    END
END
