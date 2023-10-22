use crate::ID;
use async_graphql::{Context, Error, Object, Result};
use sqlx::PgPool;

use crate::graphql::guards::JwtGuard;
use crate::models::project::Project;
use crate::models::tag::Tag;
use crate::models::task::Task;

pub struct QueryRoot;

#[Object]
impl QueryRoot {
    #[graphql(guard = JwtGuard)]
    async fn projects(&self, ctx: &Context<'_>, user_id: ID) -> Result<Vec<Project>, Error> {
        let pool: &PgPool = ctx.data().unwrap();
        let projects =
            sqlx::query_as!(Project, "SELECT * FROM project WHERE user_id = $1", user_id)
                .fetch_all(pool)
                .await?;

        Ok(projects.into())
    }

    #[graphql(guard = JwtGuard)]
    async fn tags(&self, ctx: &Context<'_>, user_id: ID) -> Result<Vec<Tag>, Error> {
        let pool: &PgPool = ctx.data().unwrap();
        let tags = sqlx::query_as!(Tag, "SELECT * FROM tag WHERE user_id = $1", user_id)
            .fetch_all(pool)
            .await?;

        Ok(tags)
    }

    #[graphql(guard = JwtGuard)]
    async fn tasks(&self, ctx: &Context<'_>, user_id: ID) -> Result<Vec<Task>, Error> {
        let pool: &PgPool = ctx.data().unwrap();
        let tasks = sqlx::query_as!(Task, "SELECT * FROM task WHERE user_id = $1", user_id)
            .fetch_all(pool)
            .await?;
        Ok(tasks)
    }
}
