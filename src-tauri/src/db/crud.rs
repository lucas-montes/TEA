#![allow(dead_code)]

use crate::db::{connect, get_model_fields_information, get_model_fields_information_for_update};
use rusqlite::ToSql;
use serde_json::Value;

pub fn create(table: String, model_data: Value) {
    let (fields, fields_numbers, fields_values) = get_model_fields_information(model_data);
    let query = create_query(table, fields, fields_numbers);
    execute_query(query, fields_values);
}

fn create_query(table: String, fields: String, fields_numbers: String) -> String {
    return format!("INSERT INTO {table} ({fields}) VALUES ({fields_numbers});");
}

fn execute_query(query: String, fields_values: Vec<String>) -> i8 {
    let final_values: Vec<&dyn ToSql> = fields_values
        .iter()
        .map(|value| value as &dyn ToSql)
        .collect();

    connect().execute(&query, &final_values[..]).unwrap();
    return 0;
}

pub fn update(table: String, model_data: Value, id: String) -> i8 {
    let fields_names = get_model_fields_information_for_update(model_data);
    let query = update_query(table, fields_names, id);
    connect().execute(&query, ()).unwrap();
    return 1;
}

fn update_query(table: String, fields_names: String, id: String) -> String {
    return format!("UPDATE {table} SET {fields_names} WHERE id = {id}");
}

pub fn delete(table: String, id: String) -> i8 {
    connect()
        .execute(&format!("DELETE FROM {table} WHERE id = {id}"), ())
        .unwrap();
    return 1;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_query() {
        let result = create_query(
            String::from("notes"),
            String::from("name, age"),
            String::from("1?, 2?"),
        );
        assert_eq!("INSERT INTO notes (name, age) VALUES (1?, 2?);", result);
    }
}
