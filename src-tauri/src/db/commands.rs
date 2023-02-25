use crate::db::{camel_to_snake_case, create, delete, update, KanbanTicket, Note, ProsCons};
use serde_json::{from_str, Value};

#[tauri::command]
pub fn handle_create(table: String, model_data: String) -> i8 {
    let snake_table = camel_to_snake_case(&table);
    let result: Value = from_str(model_data.as_str()).unwrap();
    println!("{:#?}", result);
    return create(snake_table, result).into();
}

#[tauri::command]
pub fn handle_update(table: String, model_data: String, id: String) -> i8 {
    let snake_table = camel_to_snake_case(&table);
    let result: Value = from_str(model_data.as_str()).unwrap();
    return update(snake_table, result, id).into();
}

#[tauri::command]
pub fn handle_delete(table: String, id: String) -> i8 {
    let snake_table = camel_to_snake_case(&table);
    return delete(snake_table, id).into();
}

#[tauri::command]
pub fn handle_read_notes() -> Vec<Note> {
    return Note::read().into();
}

#[tauri::command]
pub fn handle_read_proscons() -> Vec<ProsCons> {
    return ProsCons::read().into();
}

#[tauri::command]
pub fn handle_read_kanbantickets() -> Vec<KanbanTicket> {
    return KanbanTicket::read().into();
}
