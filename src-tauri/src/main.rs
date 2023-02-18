#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use db::notes::Note;
use files::crud::read_dir;
use menus::get_menu;
use serde_json::{from_str, Value};

mod db;
mod files;
mod menus;

#[tauri::command]
async fn handle_notes_create(model_data: String) {
    let note: Note = from_str(model_data.as_str()).unwrap();
    note.create();
}

#[tauri::command]
async fn handle_notes_update(model_data: String) {
    let note: Note = from_str(model_data.as_str()).unwrap();
    note.update();
}

#[tauri::command]
async fn handle_notes_delete(model_data: String) {
    let note: Note = from_str(model_data.as_str()).unwrap();
    note.delete();
}

#[tauri::command]
async fn handle_notes_read() -> Vec<Note> {
    let notes = Note::get_all();
    println!("{:#?}", notes);
    return notes.into();
}

#[tauri::command]
async fn show_files(directory: String) -> Vec<Value> {
    let paths_to_show: Vec<Value> = read_dir(directory);
    paths_to_show.into()
}

fn main() {
    tauri::Builder::default()
        .menu(get_menu())
        .invoke_handler(tauri::generate_handler![
            handle_notes_create,
            handle_notes_update,
            handle_notes_delete,
            handle_notes_read,
            show_files
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
