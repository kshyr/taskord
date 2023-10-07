use async_graphql::{Context, Object};
use sqlx::PgPool;

use crate::models::task::Task;

pub struct MutationRoot;

// struct NewTask {
//     pub name: String,
//     pub description: Option<String>,
//     pub status: Option<i16>,
//     pub priority: Option<i16>,
// }

#[Object]
impl MutationRoot {
    async fn create_task(
        &self,
        ctx: &Context<'_>,
        name: String,
        description: Option<String>,
        status: Option<i16>,
        priority: Option<i16>,
    ) -> async_graphql::Result<Task> {
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
