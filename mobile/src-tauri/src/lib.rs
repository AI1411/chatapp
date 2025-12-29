//! ChatApp Mobile Library
//!
//! This module contains the Tauri application setup and command handlers.

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod grpc;
mod state;

use tauri::Manager;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "chatapp_mobile=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_notification::init())
        .setup(|app| {
            // Initialize application state
            let state = state::AppState::new();
            app.manage(state);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::login,
            commands::register,
            commands::get_rooms,
            commands::get_messages,
            commands::send_message,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
