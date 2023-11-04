CREATE OR ALTER PROCEDURE getProjectsByUserId(@user_id VARCHAR (100))
AS
BEGIN
    SELECT * FROM projects WHERE user_id=@user_id
END