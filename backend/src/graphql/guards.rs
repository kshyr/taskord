use crate::Token;
use async_graphql::{async_trait, Context, Error, Guard, Result};
use jsonwebtoken::decode;
use jsonwebtoken::{DecodingKey, Validation};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
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
