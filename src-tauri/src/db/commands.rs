use crate::db::{create, Note, ProsCons};
use serde_json::from_str;

#[tauri::command]
pub fn handle_notes_create(table: &str, model_data: String) {
    if table == "note" {
        let model: Note = from_str(model_data.as_str()).unwrap();
    } else if table == "proscons" {
        let model: ProsCons = from_str(model_data.as_str()).unwrap();
    }
    create(model);
}

#[tauri::command]
pub fn handle_notes_update(model_data: String) {
    let note: Note = from_str(model_data.as_str()).unwrap();
    note.update();
}

#[tauri::command]
pub fn handle_notes_delete(model_data: String) {
    let note: Note = from_str(model_data.as_str()).unwrap();
    note.delete();
}

#[tauri::command]
pub fn handle_notes_read() -> Vec<Note> {
    let notes = Note::get_all();
    println!("{:#?}", notes);
    return notes.into();
}
