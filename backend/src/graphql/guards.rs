use async_graphql::{async_trait, Context, Error, Guard, Result};
use jsonwebtoken::{decode, encode, EncodingKey, Header};
use jsonwebtoken::{DecodingKey, Validation};
use serde::{Deserialize, Serialize};

use crate::models::user::AccessToken;
use crate::Token;

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
}

pub fn generate_access_token(sub: String) -> AccessToken {
    let expiration = chrono::Utc::now() + chrono::Duration::minutes(20);

    let secret = dotenv::var("JWT_SECRET").expect("JWT_SECRET must be set");

    let claims = Claims {
        sub,
        exp: (expiration).timestamp() as usize,
    };

    AccessToken {
        token: encode(
            &Header::default(),
            &claims,
            &EncodingKey::from_secret(secret.as_bytes()),
        )
        .expect("Error while generating access token"),
        expires_in: expiration,
    }
}

pub fn generate_refresh_token(sub: String) -> Token {
    let expiration = chrono::Utc::now() + chrono::Duration::hours(18);

    let secret = dotenv::var("JWT_REFRESH_SECRET").expect("JWT_REFRESH_SECRET must be set");

    let claims = Claims {
        sub,
        exp: (expiration).timestamp() as usize,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
    .expect("Error while generating refresh token")
}

pub struct JwtGuard;

#[async_trait::async_trait]
impl Guard for JwtGuard {
    async fn check(&self, ctx: &Context<'_>) -> Result<()> {
        let token_header = ctx
            .data_opt::<Token>()
            .ok_or(Error::new("No token found"))?;

        let token = token_header.trim_start_matches("Bearer ").to_string();

        let secret = dotenv::var("JWT_SECRET").expect("JWT_SECRET must be set");

        decode::<Claims>(
            &token,
            &DecodingKey::from_secret(secret.as_bytes()),
            &Validation::default(),
        )
        .map_err(|_| Error::new("Invalid token"))?;

        Ok(())
    }
}

pub struct JwtRefreshGuard;

#[async_trait::async_trait]
impl Guard for JwtRefreshGuard {
    async fn check(&self, ctx: &Context<'_>) -> Result<()> {
        let token_header = ctx
            .data_opt::<Token>()
            .ok_or(Error::new("No token found"))?;

        let token = token_header.trim_start_matches("Refresh ").to_string();

        let secret = dotenv::var("JWT_REFRESH_SECRET").expect("JWT_REFRESH_SECRET must be set");

        decode::<Claims>(
            &token,
            &DecodingKey::from_secret(secret.as_bytes()),
            &Validation::default(),
        )
        .map_err(|_| Error::new("Invalid token"))?;

        Ok(())
    }
}
