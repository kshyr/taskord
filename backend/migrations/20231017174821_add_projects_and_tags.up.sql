CREATE TABLE tag (
    id         UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id    UUID             NOT NULL REFERENCES "user" (id) ON DELETE CASCADE,
    name       VARCHAR(32)      NOT NULL,
    created_at TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);

CREATE TABLE project (
    id          UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id     UUID             NOT NULL REFERENCES "user" (id) ON DELETE CASCADE,
    name        VARCHAR(32)      NOT NULL,
    description VARCHAR(256)     NOT NULL,
    created_at  TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);

CREATE TABLE project_tag (
    project_id UUID NOT NULL REFERENCES project (id) ON DELETE CASCADE,
    tag_id     UUID NOT NULL REFERENCES tag (id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, tag_id)
);

ALTER TABLE task
    ADD COLUMN project_id UUID REFERENCES project (id) ON DELETE CASCADE,
    ADD COLUMN user_id    UUID REFERENCES "user" (id) ON DELETE CASCADE;

UPDATE task
SET user_id = '00000000-0000-0000-0000-000000000000'
WHERE user_id IS NULL;

ALTER TABLE task
    ALTER COLUMN user_id SET NOT NULL;
