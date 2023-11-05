CREATE OR ALTER PROCEDURE markProjectComplete(
    @project_id VARCHAR(100)
)
AS 
BEGIN
    UPDATE Projects
    SET completed = 'completed'
    WHERE project_id = @project_id AND completed = 'in progress';
END




DROP PROCEDURE markProjectComplete