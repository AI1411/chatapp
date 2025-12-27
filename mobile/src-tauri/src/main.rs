//! ChatApp Mobile - Tauri Entry Point
//!
//! This is the main entry point for the Tauri desktop/mobile application.

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    chatapp_mobile_lib::run()
}
