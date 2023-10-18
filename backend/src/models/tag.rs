use crate::ID;
use async_graphql::dataloader::DataLoader;
use async_graphql::{Context, Object};
use chrono::{DateTime, Utc};

use crate::graphql::guards::JwtGuard;
use crate::models::user::{User, UserLoader};

#[derive(Debug, Clone, sqlx::FromRow)]
pub struct Tag {
    pub id: ID,
    pub user_id: ID,
    pub name: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[Object]
impl Tag {
    #[graphql(guard = JwtGuard)]
    async fn id(&self) -> ID {
        self.id
    }

    #[graphql(guard = JwtGuard)]
    async fn user(&self, ctx: &Context<'_>) -> User {
        let loader = ctx.data_unchecked::<DataLoader<UserLoader>>();
        let user = loader.load_one(self.user_id).await.unwrap();
        user.unwrap()
    }

    #[graphql(guard = JwtGuard)]
    async fn name(&self) -> &str {
        &self.name
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
