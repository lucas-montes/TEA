use crate::db::notes::Note;
use serde_json::from_str;

#[tauri::command]
pub fn handle_notes_create(model_data: String) {
    let note: Note = from_str(model_data.as_str()).unwrap();
    note.create();
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
