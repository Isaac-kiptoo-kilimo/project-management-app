

CREATE OR ALTER PROCEDURE registerUser(
    @user_id VARCHAR(100),
    @fullName VARCHAR(200),
     @email VARCHAR(200),
     @password VARCHAR(200),
     @cpassword VARCHAR(200)
     )
     AS 
     BEGIN
     INSERT INTO Users(user_id,fullName,email,password ,
     cpassword)
     VALUES( @user_id ,
    @fullName ,@email ,
     @password ,@cpassword )

    END