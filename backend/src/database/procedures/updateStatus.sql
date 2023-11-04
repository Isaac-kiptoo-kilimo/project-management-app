CREATE OR ALTER PROCEDURE markProjectComplete (@project_id VARCHAR(100))
AS
BEGIN
    UPDATE Projects SET completed = 1 WHERE project_id = @project_id;
END;

