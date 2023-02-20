use crate::db::create;
use serde_json::{from_str, Value};

#[tauri::command]
pub fn handle_create(model_name: String, model_data: String) {
    let result: Value = from_str(model_data.as_str()).unwrap();
    println!("{:#?}", result);
    create(model_name, result)
    // result.create();
}

#[tauri::command]
pub fn handle_update(model_name: String, model_data: String) {
    let result: Value = from_str(model_data.as_str()).unwrap();
    // result.update();
}

#[tauri::command]
pub fn handle_delete(model_name: String, model_data: String) {
    let result: Value = from_str(model_data.as_str()).unwrap();
    // result.delete();
}

#[tauri::command]
pub fn handle_read(model_name: String) {
    // let result = Note::get_all();
    println!("{:#?}", model_name);
    // let result = Vec::new();
    // return result.into();
}
