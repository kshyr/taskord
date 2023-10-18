use crate::graphql::guards::JwtGuard;
use crate::ID;
use async_graphql::dataloader::*;
use async_graphql::futures_util::TryStreamExt;
use async_graphql::Object;
use async_graphql::*;
use chrono::{DateTime, Utc};
use sqlx::PgPool;
use std::collections::HashMap;

#[derive(Debug, Clone, sqlx::FromRow)]
pub struct User {
    pub id: ID,
    pub username: String,
    pub email: String,
    pub password: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[Object]
impl User {
    async fn id(&self) -> ID {
        self.id
    }

    async fn username(&self) -> &str {
        &self.username
    }

    async fn email(&self) -> &str {
        &self.email
    }

    async fn created_at(&self) -> DateTime<Utc> {
        self.created_at
    }

    #[graphql(guard = JwtGuard)]
    async fn updated_at(&self) -> DateTime<Utc> {
        self.updated_at
    }
}

#[derive(Debug)]
pub struct UserWithTokens {
    pub id: ID,
    pub username: String,
    pub email: String,
    pub password: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub access_token: AccessToken,
    pub refresh_token: String,
}

#[Object]
impl UserWithTokens {
    async fn id(&self) -> ID {
        self.id
    }

    async fn username(&self) -> &str {
        &self.username
    }

    async fn email(&self) -> &str {
        &self.email
    }

    async fn created_at(&self) -> DateTime<Utc> {
        self.created_at
    }

    async fn updated_at(&self) -> DateTime<Utc> {
        self.updated_at
    }

    async fn access_token(&self) -> &AccessToken {
        &self.access_token
    }

    async fn refresh_token(&self) -> &str {
        &self.refresh_token
    }
}

#[derive(Debug)]
pub struct AccessToken {
    pub token: String,
    pub expires_in: DateTime<Utc>,
}

#[Object]
impl AccessToken {
    async fn token(&self) -> &str {
        &self.token
    }

    async fn expires_in(&self) -> DateTime<Utc> {
        self.expires_in
    }
}

pub struct UserLoader {
    pub(crate) pool: PgPool,
}

#[async_trait::async_trait]
impl Loader<ID> for UserLoader {
    type Value = User;
    type Error = Error;

    async fn load(&self, keys: &[ID]) -> Result<HashMap<ID, Self::Value>, Self::Error> {
        let user = sqlx::query_as!(
            Self::Value,
            r#"
            SELECT * FROM "user"
            WHERE id = ANY($1)
            "#,
            &keys
        )
        .fetch(&self.pool)
        .map_ok(|user| (user.id, user))
        .try_collect()
        .await?;

        Ok(user)
    }
}
