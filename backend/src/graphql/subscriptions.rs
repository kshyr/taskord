use async_graphql::futures_util::{FutureExt, TryStreamExt};
use async_graphql::*;
use futures_util::stream::Stream;

use tokio::sync::broadcast;
use tokio_stream::wrappers::BroadcastStream;
use tokio_stream::StreamExt;
use uuid::Uuid;

use crate::models::task::Task;

// Define the channel capacity
const CHANNEL_CAPACITY: usize = 100;

#[derive(SimpleObject, Clone)]
pub struct TaskStatusUpdate {
    pub task_id: ID,
    pub new_status: i16,
}

pub struct SubscriptionRoot;

#[Subscription]
impl SubscriptionRoot {
    async fn task_updated(&self, ctx: &Context<'_>) -> impl Stream<Item = Task> {
        let tx = ctx.data::<broadcast::Sender<Task>>().unwrap().clone();
        let rx: BroadcastStream<Task> = BroadcastStream::new(tx.subscribe());

        rx.into_stream().filter_map(|result| match result {
            Ok(task) => Some(task),
            Err(err) => None,
        })
    }
}
