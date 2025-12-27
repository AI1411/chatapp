//! Application state management

use std::sync::RwLock;

/// Application state shared across commands
pub struct AppState {
    /// Current authentication token
    pub auth_token: RwLock<Option<String>>,
    /// API server URL
    pub api_url: String,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            auth_token: RwLock::new(None),
            api_url: std::env::var("API_URL").unwrap_or_else(|_| "http://localhost:50051".to_string()),
        }
    }

    pub fn set_token(&self, token: String) {
        let mut guard = self.auth_token.write().unwrap();
        *guard = Some(token);
    }

    pub fn get_token(&self) -> Option<String> {
        self.auth_token.read().unwrap().clone()
    }

    pub fn clear_token(&self) {
        let mut guard = self.auth_token.write().unwrap();
        *guard = None;
    }
}

impl Default for AppState {
    fn default() -> Self {
        Self::new()
    }
}
