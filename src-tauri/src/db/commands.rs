use crate::db::{create, delete, update};
use serde_json::{from_str, Value};

#[tauri::command]
pub fn handle_create(model_name: String, model_data: String) {
    let result: Value = from_str(model_data.as_str()).unwrap();
    println!("{:#?}", result);
    create(model_name, result)
    // result.create();
}

#[tauri::command]
pub fn handle_update(table: String, model_data: String, id: String) {
    let result: Value = from_str(model_data.as_str()).unwrap();
    update(table, result, id);
}

#[tauri::command]
pub fn handle_delete(table: String, id: String) {
    delete(table, id);
}

#[tauri::command]
pub fn handle_read(model_name: String) {
    // let result = Note::get_all();
    println!("{:#?}", model_name);
    // let result = Vec::new();
    // return result.into();
}
