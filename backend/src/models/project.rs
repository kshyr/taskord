use crate::ID;
use async_graphql::dataloader::DataLoader;
use async_graphql::{Context, Object};
use chrono::{DateTime, Utc};
use sqlx::PgPool;

use crate::graphql::guards::JwtGuard;
use crate::models::tag::Tag;
use crate::models::task::Task;
use crate::models::user::{User, UserLoader};

#[derive(Debug, Clone, sqlx::FromRow)]
pub struct Project {
    pub id: ID,
    pub user_id: ID,
    pub name: String,
    pub description: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[Object]
impl Project {
    #[graphql(guard = JwtGuard)]
    async fn id(&self) -> ID {
        self.id
    }

    #[graphql(guard = JwtGuard)]
    async fn name(&self) -> &str {
        &self.name
    }

    #[graphql(guard = JwtGuard)]
    async fn description(&self) -> &str {
        &self.description
    }

    #[graphql(guard = JwtGuard)]
    async fn user(&self, ctx: &Context<'_>) -> User {
        let loader = ctx.data_unchecked::<DataLoader<UserLoader>>();
        let user = loader.load_one(self.user_id).await.unwrap();
        user.unwrap()
    }

    #[graphql(guard = JwtGuard)]
    async fn tags(&self, ctx: &Context<'_>) -> Vec<Tag> {
        let pool: &PgPool = ctx.data().unwrap();
        let tags: Vec<Tag> = sqlx::query_as!(
            Tag,
            r#"
            SELECT t.*
            FROM tag t
            JOIN project_tag pt ON t.id = pt.tag_id
            WHERE pt.project_id = $1
            "#,
            self.id
        )
        .fetch_all(pool)
        .await
        .unwrap();

        tags
    }

    #[graphql(guard = JwtGuard)]
    async fn tasks(&self, ctx: &Context<'_>) -> Vec<Task> {
        let pool: &PgPool = ctx.data().unwrap();
        let tasks: Vec<Task> = sqlx::query_as!(
            Task,
            r#"
            SELECT * FROM task
            WHERE project_id = $1
            "#,
            self.id
        )
        .fetch_all(pool)
        .await
        .unwrap();

        tasks
    }

    #[graphql(guard = JwtGuard)]
    async fn created_at(&self) -> DateTime<Utc> {
        self.created_at
    }

    #[graphql(guard = JwtGuard)]
    async fn updated_at(&self) -> DateTime<Utc> {
        self.updated_at
    }
}
