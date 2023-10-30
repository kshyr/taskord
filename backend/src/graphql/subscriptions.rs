use async_graphql::*;
use futures_util::stream::{Stream, StreamExt};

pub struct SubscriptionRoot;

#[Subscription]
impl SubscriptionRoot {
    async fn value(&self, condition: i32) -> impl Stream<Item = i32> {
        // Returns the number from 0 to `condition`.
        futures_util::stream::iter(0..condition)
    }
}
