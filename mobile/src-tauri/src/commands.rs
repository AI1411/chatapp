//! Tauri command handlers
//!
//! These commands are invoked from the frontend via the Tauri invoke API.

use crate::state::AppState;
use serde::{Deserialize, Serialize};
use tauri::State;
use tracing::info;

/// Room representation for the frontend
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Room {
    pub id: String,
    pub name: String,
    pub description: Option<String>,
    pub owner_id: String,
    pub member_ids: Vec<String>,
    pub created_at: String,
    pub updated_at: String,
}

/// Message representation for the frontend
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Message {
    pub id: String,
    pub room_id: String,
    pub sender_id: String,
    pub content: String,
    pub r#type: String,
    pub created_at: String,
}

/// User representation for the frontend
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct User {
    pub id: String,
    pub email: String,
    pub display_name: String,
    pub avatar_url: Option<String>,
}

/// Login command
#[tauri::command]
pub async fn login(
    email: String,
    password: String,
    state: State<'_, AppState>,
) -> Result<User, String> {
    info!("Login attempt for: {}", email);

    // TODO: Implement actual gRPC login
    // For now, return a mock response
    let _api_url = &state.api_url;

    // Mock implementation
    let user = User {
        id: uuid::Uuid::new_v4().to_string(),
        email,
        display_name: "Test User".to_string(),
        avatar_url: None,
    };

    // Store mock token
    state.set_token("mock_token".to_string());

    Ok(user)
}

/// Register command
#[tauri::command]
pub async fn register(
    email: String,
    password: String,
    display_name: String,
    state: State<'_, AppState>,
) -> Result<User, String> {
    info!("Registration attempt for: {}", email);

    // TODO: Implement actual gRPC registration
    let _api_url = &state.api_url;
    let _password = password;

    // Mock implementation
    let user = User {
        id: uuid::Uuid::new_v4().to_string(),
        email,
        display_name,
        avatar_url: None,
    };

    // Store mock token
    state.set_token("mock_token".to_string());

    Ok(user)
}

/// Get rooms command
#[tauri::command]
pub async fn get_rooms(state: State<'_, AppState>) -> Result<Vec<Room>, String> {
    info!("Getting rooms");

    // TODO: Implement actual gRPC call
    let _api_url = &state.api_url;

    // Mock implementation - return empty list
    Ok(vec![])
}

/// Get messages command
#[tauri::command]
pub async fn get_messages(
    room_id: String,
    state: State<'_, AppState>,
) -> Result<Vec<Message>, String> {
    info!("Getting messages for room: {}", room_id);

    // TODO: Implement actual gRPC call
    let _api_url = &state.api_url;

    // Mock implementation - return empty list
    Ok(vec![])
}

/// Send message command
#[tauri::command]
pub async fn send_message(
    room_id: String,
    content: String,
    state: State<'_, AppState>,
) -> Result<Message, String> {
    info!("Sending message to room: {}", room_id);

    // TODO: Implement actual gRPC call
    let _api_url = &state.api_url;

    // Mock implementation
    let message = Message {
        id: uuid::Uuid::new_v4().to_string(),
        room_id,
        sender_id: "current_user".to_string(),
        content,
        r#type: "text".to_string(),
        created_at: chrono::Utc::now().to_rfc3339(),
    };

    Ok(message)
}
