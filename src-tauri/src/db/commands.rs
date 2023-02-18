use crate::db::notes::Note;
use crate::db::pros_cons::ProsCons;
use serde_json::from_str;

#[tauri::command]
pub fn handle_create(model_name: String, model_data: String) {
    let result: Note = from_str(model_data.as_str()).unwrap();
    result.create();
}

#[tauri::command]
pub fn handle_update(model_name: String, model_data: String) {
    let result: Note = from_str(model_data.as_str()).unwrap();
    result.update();
}

#[tauri::command]
pub fn handle_delete(model_name: String, model_data: String) {
    let result: Note = from_str(model_data.as_str()).unwrap();
    result.delete();
}

#[tauri::command]
pub fn handle_read(model_name: String) -> Vec<Note> {
    let result = Note::get_all();
    println!("{:#?}", result);
    return result.into();
}
