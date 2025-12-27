//! ChatApp API Server
//!
//! gRPC server implementation using tonic.

use std::net::SocketAddr;

use anyhow::Result;
use tonic::transport::Server;
use tracing::info;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod config;
mod db;
mod error;
mod services;

use config::Config;

#[tokio::main]
async fn main() -> Result<()> {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "api_server=debug,tower_http=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Load configuration
    dotenvy::dotenv().ok();
    let config = Config::from_env()?;

    info!("Starting API server...");

    // Initialize database connection pool
    let pool = db::create_pool(&config.database_url).await?;

    // Run migrations
    db::run_migrations(&pool).await?;

    // Build gRPC services
    let chat_service = services::chat::ChatServiceImpl::new(pool.clone());
    let user_service = services::user::UserServiceImpl::new(pool.clone());

    // Start server
    let addr: SocketAddr = format!("{}:{}", config.host, config.port).parse()?;
    info!("Listening on {}", addr);

    Server::builder()
        .add_service(shared::proto::chat::chat_service_server::ChatServiceServer::new(
            chat_service,
        ))
        .add_service(shared::proto::user::user_service_server::UserServiceServer::new(
            user_service,
        ))
        .serve(addr)
        .await?;

    Ok(())
}
