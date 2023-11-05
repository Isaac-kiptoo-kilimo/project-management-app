CREATE PROCEDURE deleteProject(@project_id VARCHAR(100))

AS BEGIN
  DELETE  FROM Projects  WHERE project_id = @project_id;
END;

DROP PROCEDURE IF EXISTS deleteProject;

