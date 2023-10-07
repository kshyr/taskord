CREATE TABLE task (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(32) NOT NULL,
    description VARCHAR(128),
    status      SMALLINT    NOT NULL DEFAULT 0,
    priority    SMALLINT    NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
