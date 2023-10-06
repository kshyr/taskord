use std::error::Error;
use axum::{routing::get, Router, Extension};
use axum::response::Html;
use dotenv::dotenv;
use sqlx::postgres::PgPool;
use sqlx::{Pool, Postgres, Row};

async fn hello_world(Extension(db): Extension<Pool<Postgres>>) -> Html<String> {

    let res = sqlx::query("SELECT 1 + 1 AS result")
        .fetch_one(&db)
        .await.unwrap();
    let result: i32 = res.get("result");
    Html(format!("<h1>{}</h1>", result))
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    dotenv().ok();
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let db = PgPool::connect(&database_url).await.expect("Failed to connect to Postgres");

    let app = Router::new().route("/", get(hello_world)).layer(Extension(db));

    let addr = "[::]:8080".parse().unwrap();
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();

    Ok(())
}
