//! gRPC client for communicating with the API server

use anyhow::Result;
use tonic::transport::Channel;

/// Create a gRPC channel to the API server
#[allow(dead_code)]
pub async fn create_channel(api_url: &str) -> Result<Channel> {
    let channel = Channel::from_shared(api_url.to_string())?.connect().await?;
    Ok(channel)
}
