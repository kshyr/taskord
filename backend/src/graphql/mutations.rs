use async_graphql::{Context, Object};
use async_graphql::{Error, FieldError, Result};
use bcrypt::{hash, verify};
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
    async fn create_task(
        &self,
        ctx: &Context<'_>,
        name: String,
        project_id: Option<ID>,
        user_id: ID,
        description: Option<String>,
        status: Option<i16>,
        priority: Option<i16>,
    ) -> Result<Task> {
        let pool: &PgPool = ctx.data()?;
        let task = sqlx::query_as!(
            Task,
            r#"
            INSERT INTO task (project_id, user_id, name, description, status, priority)
            VALUES ($1::UUID, $2, $3, $4, $5, $6) RETURNING *
            "#,
            project_id,
            user_id,
            name,
            description,
            status.unwrap_or(0),
            priority.unwrap_or(0)
        )
        .fetch_one(pool)
        .await?;

        Ok(task)
    }
}
