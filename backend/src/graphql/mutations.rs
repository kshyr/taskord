use async_graphql::{Context, Object};
use async_graphql::{Error, FieldError, Result};
use bcrypt::{hash, verify};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

use crate::graphql::guards::{
    generate_access_token, generate_refresh_token, JwtGuard, JwtRefreshGuard,
};
use crate::models::project::Project;
use crate::models::tag::Tag;
use crate::models::task::Task;
use crate::models::user::{AccessToken, User, UserWithTokens};
use crate::ID;

pub struct MutationRoot;

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
}

#[Object]
impl MutationRoot {
    /* Auth */
    async fn register(
        &self,
        ctx: &Context<'_>,
        username: String,
        email: String,
        password: String,
    ) -> Result<User, Error> {
        let hashed_password = hash(&password, 4)?;

        let user = sqlx::query_as!(
            User,
            r#"
            INSERT INTO "user" (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING *
            "#,
            username,
            email,
            hashed_password
        )
        .fetch_one(ctx.data()?)
        .await?;

        Ok(user)
    }

    async fn authorize(
        &self,
        ctx: &Context<'_>,
        username: String,
        password: String,
    ) -> Result<UserWithTokens> {
        let user: User = sqlx::query_as!(
            User,
            r#"
            SELECT * FROM "user" WHERE username = $1
            "#,
            username,
        )
        .fetch_one(ctx.data()?)
        .await?;

        if verify(&password, &user.password)? {
            let access_token = generate_access_token(user.email.clone());
            let refresh_token = generate_refresh_token(user.email.clone());
            Ok(UserWithTokens {
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                created_at: user.created_at,
                updated_at: user.updated_at,
                access_token,
                refresh_token,
            })
        } else {
            Err(FieldError::new("Invalid credentials"))
        }
    }

    #[graphql(guard = JwtRefreshGuard)]
    async fn refresh_token(&self) -> Result<AccessToken> {
        let access_token = generate_access_token("".into());
        Ok(access_token)
    }

    /* Project */

    #[graphql(guard = JwtGuard)]
    async fn create_project(
        &self,
        ctx: &Context<'_>,
        name: String,
        description: Option<String>,
        user_id: ID,
    ) -> Result<Project> {
        let pool: &PgPool = ctx.data()?;
        let project = sqlx::query_as!(
            Project,
            r#"
            INSERT INTO project (name, description, user_id)
            VALUES ($1, $2, $3) RETURNING *
            "#,
            name,
            description,
            user_id
        )
        .fetch_one(pool)
        .await?;

        Ok(project)
    }

    #[graphql(guard = JwtGuard)]
    async fn update_project(
        &self,
        ctx: &Context<'_>,
        id: ID,
        name: Option<String>,
        description: Option<String>,
        task_ids: Option<Vec<ID>>,
        tag_ids: Option<Vec<ID>>,
    ) -> Result<Project> {
        let pool: &PgPool = ctx.data()?;
        let existing_project: Project = sqlx::query_as!(
            Project,
            r#"
            SELECT * FROM project WHERE id = $1
            "#,
            id
        )
        .fetch_one(pool)
        .await?;

        let existing_tasks: Vec<Task> = sqlx::query_as!(
            Task,
            r#"
            SELECT * FROM task WHERE project_id = $1
            "#,
            id
        )
        .fetch_all(pool)
        .await?;

        let existing_task_ids: Vec<ID> = existing_tasks.iter().map(|task| task.id).collect();

        let existing_tags: Vec<Tag> = sqlx::query_as!(
            Tag,
            r#"
            SELECT t.*
            FROM tag t
            JOIN project_tag pt ON t.id = pt.tag_id
            WHERE pt.project_id = $1
            "#,
            id
        )
        .fetch_all(pool)
        .await?;

        let existing_tag_ids: Vec<ID> = existing_tags.iter().map(|tag| tag.id).collect();

        if let Some(task_ids) = task_ids {
            for task_id in task_ids {
                if !existing_task_ids.contains(&task_id) {
                    sqlx::query!(
                        r#"
                        UPDATE task
                        SET project_id = $1
                        WHERE id = $2
                        "#,
                        id,
                        task_id
                    )
                    .execute(pool)
                    .await?;
                } else {
                    sqlx::query!(
                        r#"
                        UPDATE task
                        SET project_id = NULL
                        WHERE id = $1
                        "#,
                        task_id
                    )
                    .execute(pool)
                    .await?;
                }
            }
        }

        if let Some(tag_ids) = tag_ids {
            for tag_id in tag_ids {
                if !existing_tag_ids.contains(&tag_id) {
                    sqlx::query!(
                        r#"
                        INSERT INTO project_tag (project_id, tag_id)
                        VALUES ($1, $2)
                        "#,
                        id,
                        tag_id
                    )
                    .execute(pool)
                    .await?;
                } else {
                    sqlx::query!(
                        r#"
                        DELETE FROM project_tag
                        WHERE project_id = $1 AND tag_id = $2
                        "#,
                        id,
                        tag_id
                    )
                    .execute(pool)
                    .await?;
                }
            }
        }

        let updated_project = sqlx::query_as!(
            Project,
            r#"
            UPDATE project
            SET name = $1, description = $2
            WHERE id = $3
            RETURNING *
            "#,
            name.unwrap_or(existing_project.name),
            description.unwrap_or(existing_project.description),
            id
        )
        .fetch_one(pool)
        .await?;

        Ok(updated_project)
    }

    #[graphql(guard = JwtGuard)]
    async fn delete_project(&self, ctx: &Context<'_>, id: ID) -> Result<Project> {
        let pool: &PgPool = ctx.data()?;
        let project: Project = sqlx::query_as!(
            Project,
            r#"
            DELETE FROM project
            WHERE id = $1
            RETURNING *
            "#,
            id
        )
        .fetch_one(pool)
        .await?;

        Ok(project)
    }

    /* Tag */

    #[graphql(guard = JwtGuard)]
    async fn create_tag(&self, ctx: &Context<'_>, name: String, user_id: ID) -> Result<Tag> {
        let pool: &PgPool = ctx.data()?;
        let tag = sqlx::query_as!(
            Tag,
            r#"
            INSERT INTO tag (name, user_id)
            VALUES ($1, $2) RETURNING *
            "#,
            name,
            user_id
        )
        .fetch_one(pool)
        .await?;

        Ok(tag)
    }

    #[graphql(guard = JwtGuard)]
    async fn update_tag(&self, ctx: &Context<'_>, id: ID, name: Option<String>) -> Result<Tag> {
        let pool: &PgPool = ctx.data()?;
        let existing_tag: Tag = sqlx::query_as!(
            Tag,
            r#"
            SELECT * FROM tag WHERE id = $1
            "#,
            id
        )
        .fetch_one(pool)
        .await?;

        let updated_tag = sqlx::query_as!(
            Tag,
            r#"
            UPDATE tag
            SET name = $1
            WHERE id = $2
            RETURNING *
            "#,
            name.unwrap_or(existing_tag.name),
            id
        )
        .fetch_one(pool)
        .await?;

        Ok(updated_tag)
    }

    /* Task */

    #[graphql(guard = JwtGuard)]
    async fn create_task(
        &self,
        ctx: &Context<'_>,
        name: String,
        project_id: Option<ID>,
        user_id: ID,
        description: Option<String>,
        status: Option<i16>,
        priority: Option<i16>,
        due_date: Option<DateTime<Utc>>,
    ) -> Result<Task> {
        let pool: &PgPool = ctx.data()?;
        let task = sqlx::query_as!(
            Task,
            r#"
            INSERT INTO task (project_id, user_id, name, description, status, priority, due_date)
            VALUES ($1::UUID, $2, $3, $4, $5, $6, $7) RETURNING *
            "#,
            project_id,
            user_id,
            name,
            description,
            status.unwrap_or(0),
            priority.unwrap_or(0),
            due_date
        )
        .fetch_one(pool)
        .await?;

        Ok(task)
    }

    #[graphql(guard = JwtGuard)]
    async fn update_task(
        &self,
        ctx: &Context<'_>,
        id: ID,
        name: Option<String>,
        project_id: Option<ID>,
        description: Option<String>,
        status: Option<i16>,
        priority: Option<i16>,
    ) -> Result<Task> {
        let pool: &PgPool = ctx.data()?;
        let existing_task: Task = sqlx::query_as!(
            Task,
            r#"
            SELECT * FROM task WHERE id = $1
            "#,
            id
        )
        .fetch_one(pool)
        .await?;

        let updated_task = sqlx::query_as!(
            Task,
            r#"
            UPDATE task
            SET name = $1, project_id = $2, description = $3, status = $4, priority = $5
            WHERE id = $6
            RETURNING *
            "#,
            name.unwrap_or(existing_task.name),
            project_id,
            description,
            status.unwrap_or(existing_task.status),
            priority.unwrap_or(existing_task.priority),
            id
        )
        .fetch_one(pool)
        .await?;

        Ok(updated_task)
    }
}
