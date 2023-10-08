use crate::ID;
use async_graphql::Object;
use chrono::{DateTime, Utc};

use crate::graphql::guards::JwtGuard;

#[derive(Debug, sqlx::FromRow)]
pub struct Task {
    pub id: ID,
    pub name: String,
    pub description: Option<String>,
    pub status: i16,
    pub priority: i16,
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
    async fn created_at(&self) -> DateTime<Utc> {
        self.created_at
    }

    #[graphql(guard = JwtGuard)]
    async fn updated_at(&self) -> DateTime<Utc> {
        self.updated_at
    }
}
