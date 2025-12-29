//! Server configuration

use anyhow::{Context, Result};
use std::env;

/// Server configuration loaded from environment variables
#[derive(Debug, Clone)]
#[allow(dead_code)]
pub struct Config {
    /// Database connection URL
    pub database_url: String,
    /// Server host
    pub host: String,
    /// Server port
    pub port: u16,
    /// JWT secret key
    pub jwt_secret: String,
}

impl Config {
    /// Load configuration from environment variables
    pub fn from_env() -> Result<Self> {
        Ok(Self {
            database_url: env::var("DATABASE_URL").context("DATABASE_URL must be set")?,
            host: env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string()),
            port: env::var("PORT")
                .unwrap_or_else(|_| "50051".to_string())
                .parse()
                .context("PORT must be a valid number")?,
            jwt_secret: env::var("JWT_SECRET").context("JWT_SECRET must be set")?,
        })
    }
}
