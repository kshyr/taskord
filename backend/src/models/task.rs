use async_graphql::{Context, Object};
use chrono::{DateTime, Utc};
use sqlx::PgPool;

use crate::graphql::guards::JwtGuard;
use crate::models::project::Project;
use crate::ID;

#[derive(Debug, Clone, sqlx::FromRow)]
pub struct Task {
    pub id: ID,
    pub project_id: Option<ID>,
    pub user_id: ID,
    pub name: String,
    pub description: Option<String>,
    pub status: i16,
    pub priority: i16,
    pub due_date: Option<DateTime<Utc>>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[Object]
impl Task {
    #[graphql(guard = JwtGuard)]
    async fn id(&self) -> ID {
        self.id
    }

    #[graphql(guard = JwtGuard)]
    async fn project(&self, ctx: &Context<'_>) -> Option<Project> {
        let pool: &PgPool = ctx.data().unwrap();
        let project = sqlx::query_as!(
            Project,
            r#"
            SELECT *
            FROM project
            WHERE id = $1
            "#,
            self.project_id
        )
        .fetch_optional(pool)
        .await
        .unwrap();

        project
    }

    #[graphql(guard = JwtGuard)]
    async fn user_id(&self) -> ID {
        self.user_id
    }

    #[graphql(guard = JwtGuard)]
    async fn name(&self) -> &str {
        &self.name
    }

    #[graphql(guard = JwtGuard)]
    async fn description(&self) -> Option<&str> {
        self.description.as_deref()
    }

    #[graphql(guard = JwtGuard)]
    async fn status(&self) -> i16 {
        self.status
    }

    #[graphql(guard = JwtGuard)]
    async fn priority(&self) -> i16 {
        self.priority
    }

    #[graphql(guard = JwtGuard)]
    async fn due_date(&self) -> Option<DateTime<Utc>> {
        self.due_date
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
