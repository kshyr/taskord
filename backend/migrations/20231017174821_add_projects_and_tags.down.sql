ALTER TABLE task
    DROP COLUMN project_id,
    DROP COLUMN user_id;

DROP TABLE project_tag;
DROP TABLE project;
DROP TABLE tag;
