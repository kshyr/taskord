use crate::graphql::schema::AppSchema;
use async_graphql::http::GraphiQLSource;
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::{
    extract::State,
    headers::HeaderMap,
    response::{Html, IntoResponse},
    routing::{get, post},
    Router,
};
use dotenv::dotenv;
use sqlx::PgPool;
use tower_http::cors::CorsLayer;
use uuid::Uuid;

mod graphql;
mod models;

type ID = Uuid;
type Token = String;

async fn graphiql() -> impl IntoResponse {
    Html(GraphiQLSource::build().endpoint("/").finish())
}

fn get_auth_token_from_headers(headers: &HeaderMap) -> Option<Token> {
    headers
        .get("Authorization")
        .and_then(|value| value.to_str().map(|s| s.to_string()).ok())
}

async fn graphql_handler(
    State(schema): State<AppSchema>,
    headers: HeaderMap,
    req: GraphQLRequest,
) -> GraphQLResponse {
    let mut req = req.into_inner();
    if let Some(token) = get_auth_token_from_headers(&headers) {
        req = req.data(token);
    }
    schema.execute(req).await.into()
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
        .route("/", post(graphql_handler))
        .route("/graphiql", get(graphiql))
        .layer(CorsLayer::permissive())
        .with_state(schema);

    let addr = "[::]:8080".parse().unwrap();
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
