#![allow(dead_code)]

use crate::db::{connect, get_model_fields_information, get_model_fields_information_for_update};
use rusqlite::ToSql;
use serde_json::Value;

pub fn create(table: String, model_data: Value) -> i8 {
    let (fields, fields_numbers, fields_values) = get_model_fields_information(model_data);
    let query = format!("INSERT INTO {table} ({fields}) VALUES ({fields_numbers});");
    execute_query(query, fields_values);
    return 1;
}

fn execute_query(query: String, fields_values: Vec<String>) -> i8 {
    let final_values: Vec<&dyn ToSql> = fields_values
        .iter()
        .map(|value| value as &dyn ToSql)
        .collect();

    connect().execute(&query, &final_values[..]).unwrap();
    return 0;
}

pub fn update(table: String, model_data: Value, id: i16) -> i8 {
    let fields_names = get_model_fields_information_for_update(model_data);
    connect()
        .execute(
            &format!("UPDATE {table} SET {fields_names} WHERE id = {id}"),
            (),
        )
        .unwrap();
    return 1;
}

pub fn delete(table: String, id: i16) -> i8 {
    connect()
        .execute(&format!("DELETE FROM {table} WHERE id = {id}"), ())
        .unwrap();
    return 1;
}
