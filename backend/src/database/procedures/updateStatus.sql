CREATE OR ALTER PROCEDURE markProjectComplete(
    @project_id VARCHAR(100)
)
AS 
BEGIN 
    BEGIN TRANSACTION
    UPDATE Projects
    SET completed = 'completed'
    WHERE project_id = @project_id AND completed = 'in progress';

    UPDATE Users
    SET Assigned = 0
    WHERE user_id = @user_id AND assigned = 1;
    COMMIT
END




DROP PROCEDURE markProjectComplete