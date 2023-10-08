use async_graphql::{Context, Object};
use async_graphql::{Error, FieldError, Result};
use bcrypt::{hash, verify};
use jsonwebtoken::{encode, EncodingKey, Header};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

use crate::graphql::guards::JwtGuard;
use crate::models::task::Task;
use crate::models::user::User;

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
    ) -> Result<String> {
        let user: User = sqlx::query_as!(
            User,
            r#"
            SELECT * FROM "user" WHERE username = $1
            "#,
            username,
        )
        .fetch_one(ctx.data()?)
        .await?;

        let jwt_secret = dotenv::var("JWT_SECRET").expect("JWT_SECRET must be set");

        // TODO: implement refresh token
        if verify(&password, &user.password)? {
            let claims = Claims {
                sub: user.username,
                exp: (chrono::Utc::now() + chrono::Duration::hours(1)).timestamp() as usize,
            };
            let token = encode(
                &Header::default(),
                &claims,
                &EncodingKey::from_secret(jwt_secret.as_bytes()),
            )
            .unwrap();
            Ok(token)
        } else {
            Err(FieldError::new("Invalid credentials"))
        }
    }

    #[graphql(guard = JwtGuard)]
    async fn create_task(
        &self,
        ctx: &Context<'_>,
        name: String,
        description: Option<String>,
        status: Option<i16>,
        priority: Option<i16>,
    ) -> Result<Task> {
        let pool: &PgPool = ctx.data()?;
        let task = sqlx::query_as!(
            Task,
            "INSERT INTO task (name, description, status, priority) VALUES ($1, $2, $3, $4) RETURNING *",
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
