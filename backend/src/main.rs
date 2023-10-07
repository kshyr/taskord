use async_graphql::http::GraphiQLSource;
use async_graphql_axum::GraphQL;
use axum::response::{Html, IntoResponse};
use axum::routing::post_service;
use axum::{routing::get, Router};
use dotenv::dotenv;
use sqlx::PgPool;

mod graphql;
mod models;

type ID = i32;

async fn graphiql() -> impl IntoResponse {
    Html(GraphiQLSource::build().endpoint("/").finish())
}

#[tokio::main]
async fn main() {
    dotenv().ok();
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let db = PgPool::connect(&database_url)
        .await
        .expect("Failed to connect to Postgres");

    let schema = graphql::schema::create_schema(db);
    let app = Router::new()
        .route("/", post_service(GraphQL::new(schema)))
        .route("/graphiql", get(graphiql));

    let addr = "[::]:8080".parse().unwrap();
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
