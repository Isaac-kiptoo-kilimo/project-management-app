CREATE OR ALTER PROCEDURE assignProject(
    @project_id VARCHAR(100),
    @user_id VARCHAR (100)
)
AS 
BEGIN
    UPDATE projects 
    SET projectStatus ='assigned' , user_id=@user_id WHERE project_id=@project_id AND projectStatus='unassigned'
END

