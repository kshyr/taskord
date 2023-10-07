use async_graphql::{EmptySubscription, Schema};
use sqlx::PgPool;

use crate::graphql::{mutations::MutationRoot, queries::QueryRoot};

pub type AppSchema = Schema<QueryRoot, MutationRoot, EmptySubscription>;

pub fn create_schema(db: PgPool) -> AppSchema {
    Schema::build(QueryRoot, MutationRoot, EmptySubscription).data(db).finish()
}
