#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use files::crud::read_dir;
use menus::get_menu;
use serde_json::Value;

mod files;
mod menus;

#[tauri::command]
fn save_model(invoke_message: String) {
    println!(
        "I was invoked from JS, with this message: {}",
        invoke_message
    );
}

#[tauri::command]
fn show_files(directory: String) -> Vec<Value> {
    let paths_to_show: Vec<Value> = read_dir(directory);
    paths_to_show.into()
}

fn main() {
    tauri::Builder::default()
        .menu(get_menu())
        .invoke_handler(tauri::generate_handler![save_model, show_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
