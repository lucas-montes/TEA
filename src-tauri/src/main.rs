#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use db::commands::{handle_create, handle_delete, handle_read, handle_update};
use files::commands::show_files;
use menus::get_menu;

mod db;
mod files;
mod menus;

fn main() {
    tauri::Builder::default()
        .menu(get_menu())
        .invoke_handler(tauri::generate_handler![
            handle_create,
            handle_update,
            handle_delete,
            handle_read,
            show_files
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
