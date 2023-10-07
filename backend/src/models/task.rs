use crate::ID;
use async_graphql::Object;
use chrono::{DateTime, Utc};

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
    async fn id(&self) -> ID {
        self.id
    }

    async fn name(&self) -> &str {
        &self.name
    }

    async fn description(&self) -> Option<&str> {
        self.description.as_deref()
    }

    async fn status(&self) -> i16 {
        self.status
    }

    async fn priority(&self) -> i16 {
        self.priority
    }

    async fn created_at(&self) -> DateTime<Utc> {
        self.created_at
    }

    async fn updated_at(&self) -> DateTime<Utc> {
        self.updated_at
    }
}
