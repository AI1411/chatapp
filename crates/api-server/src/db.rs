//! Database connection and migration management

use anyhow::Result;
use sqlx::{PgPool, postgres::PgPoolOptions};
use tracing::info;

/// Create a database connection pool
pub async fn create_pool(database_url: &str) -> Result<PgPool> {
    info!("Connecting to database...");

    let pool = PgPoolOptions::new()
        .max_connections(10)
        .connect(database_url)
        .await?;

    info!("Database connection established");
    Ok(pool)
}

/// Run database migrations
pub async fn run_migrations(pool: &PgPool) -> Result<()> {
    info!("Running database migrations...");
    sqlx::migrate!("./migrations").run(pool).await?;
    info!("Migrations completed");
    Ok(())
}
