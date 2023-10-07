use crate::ID;
use async_graphql::{Context, Error, Object, Result};
use sqlx::PgPool;

use crate::models::task::Task;

pub struct QueryRoot;

#[Object]
impl QueryRoot {
    async fn task_by_id(&self, ctx: &Context<'_>, id: ID) -> Result<Option<Task>, Error> {
        let pool: &PgPool = ctx.data().unwrap();
        let task = sqlx::query_as!(Task, "SELECT * FROM task WHERE id = $1", id)
            .fetch_optional(pool)
            .await?;
        Ok(task)
    }

    async fn all_tasks(&self, ctx: &Context<'_>) -> Result<Vec<Task>, Error> {
        let pool: &PgPool = ctx.data().unwrap();
        let tasks: Vec<Task> = sqlx::query_as!(Task, "SELECT * FROM task")
            .fetch_all(pool)
            .await?;

        Ok(tasks.into())
    }
}
