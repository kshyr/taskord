use async_graphql::dataloader::DataLoader;
use async_graphql::extensions::Logger;
use async_graphql::Schema;
use sqlx::PgPool;

use crate::graphql::subscriptions::SubscriptionRoot;
use crate::graphql::{mutations::MutationRoot, queries::QueryRoot};
use crate::models::user::UserLoader;

pub type AppSchema = Schema<QueryRoot, MutationRoot, SubscriptionRoot>;

pub fn create_schema(db: PgPool) -> AppSchema {
    Schema::build(QueryRoot, MutationRoot, SubscriptionRoot)
        .data(db.clone())
        .data(DataLoader::new(
            UserLoader { pool: db.clone() },
            tokio::spawn,
        ))
        .extension(Logger)
        .finish()
}
