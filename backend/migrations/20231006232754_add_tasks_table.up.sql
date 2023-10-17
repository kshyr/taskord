CREATE TABLE task
(
    id          UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name        VARCHAR(32)      NOT NULL,
    description VARCHAR(128),
    status      SMALLINT         NOT NULL DEFAULT 0,
    priority    SMALLINT         NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);
