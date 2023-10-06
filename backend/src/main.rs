use axum::{routing::get, Router};
use axum::response::Html;

async fn hello_world() -> Html<&'static str> {
    Html("<h1>Hi!</h1>")
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(hello_world));

    let addr = "[::]:8080".parse().unwrap();
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
