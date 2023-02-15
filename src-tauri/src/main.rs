#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use db::crud::handle_methods;
use files::crud::read_dir;
use menus::get_menu;
use serde_json::{from_str, json, Map, Value};

mod db;
mod files;
mod menus;

#[tauri::command]
fn handle_models(method: &str, model_data: String) {
    let model: Value = from_str(model_data.as_str()).unwrap();
    println!("I was invoked from JS, with this message: {}", model);
    handle_methods(method, model);
}

#[tauri::command]
fn show_files(directory: String) -> Vec<Value> {
    let paths_to_show: Vec<Value> = read_dir(directory);
    paths_to_show.into()
}

fn main() {
    tauri::Builder::default()
        .menu(get_menu())
        .invoke_handler(tauri::generate_handler![handle_models, show_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
