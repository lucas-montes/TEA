#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use menus::get_menu;

mod menus;

#[tauri::command]
fn save_model(invoke_message: String) {
    println!(
        "I was invoked from JS, with this message: {}",
        invoke_message
    );
}

fn main() {
    tauri::Builder::default()
        .menu(get_menu())
        .invoke_handler(tauri::generate_handler![save_model])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
