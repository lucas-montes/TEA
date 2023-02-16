#![allow(dead_code)]

use rusqlite::{params, Connection, ToSql};
use serde_json::{json, to_string, Value};
use std::any::Any;

// Commands
const CREATE_TABLE: &str = "CREATE TABLE";
const CREATE_TABLE_IF: &str = "CREATE TABLE IF NOT EXISTS";
const INSERT_INTO: &str = "INSERT INTO";
const SELECT: &str = "SELECT";
const UPDATE: &str = "UPDATE";

// Arguments
const BASE_DB: &str = "main.db";
const VALUES: &str = "VALUES";
const FROM: &str = "FROM";
const SET: &str = "SET";

// TYPES
const INTEGER_PRIMARY_KEY: &str = "INTEGER PRIMARY KEY";
const TEXT: &str = "TEXT";
const INTEGER: &str = "INTEGER";
const NOT_NULL: &str = "NOT NULL";

pub fn handle_methods(method_name: &str, model_data: Value) {
    let callable_method = match method_name {
        "create" => create,
        "update" => update,
        "read" => read,
        "delete" => delete,
        &_ => todo!(),
    };
    let table: String = get_table(model_data);
    return callable_method(model_data);
}

fn get_table(model_data: Value) -> String {
    return model_data
        .as_object_mut()
        .unwrap()
        .remove("table")
        .unwrap()
        .to_string();
}

fn create(mut model_data: Value) {
    let (fields, fields_numbers, fields_values) = get_model_fields_information(model_data);
    let query = create_query(table, fields, fields_numbers);
    execute_query(query, fields_values);
}

fn get_model_fields_information(model_data: Value) -> (String, String, Vec<String>) {
    let mut fields: String = String::from("");
    let mut fields_numbers: String = String::from("");
    let mut fields_values: Vec<String> = Vec::new();
    let mut number_field: i8 = 0;

    // When iterating it seems that the object from serde it's sorted
    for (key, value) in model_data.as_object().unwrap() {
        fields = generate_fields(fields.to_string(), key.to_string());

        number_field += 1;
        fields_numbers = generate_fields(
            fields_numbers.to_string(),
            format!("{number_field}?").to_string(),
        );

        fields_values.push(value.as_str().unwrap().to_string());
    }
    return (fields, fields_numbers, fields_values);
}

fn generate_fields(fields: String, new_field: String) -> String {
    let fields_str: String;

    if fields.is_empty() {
        fields_str = format!("{}", new_field);
    } else {
        fields_str = format!("{}, {}", fields, new_field);
    }

    return fields_str;
}

fn create_query(table: String, fields: String, fields_numbers: String) -> String {
    return format!("INSERT INTO {table} ({fields}) VALUES ({fields_numbers});").to_string();
}

fn execute_query(query: String, fields_values: Vec<String>) -> i8 {
    let final_values: Vec<&dyn ToSql> = fields_values
        .iter()
        .map(|value| value as &dyn ToSql)
        .collect();

    connect().execute(&query, &final_values[..]).unwrap();
    return 0;
}

fn connect() -> Connection {
    return Connection::open(BASE_DB).unwrap();
}

fn update(model_data: Value) {}

fn update_query(table: String, fields_names: String) -> String {
    return format!("UPDATE {table} SET {fields_names} WHERE id = ?");
}

fn read(model_data: Value) {
    let person_iter = stmt.query_map([], |row| {
        Ok(Person {
            id: row.get(0)?,
            name: row.get(1)?,
            data: row.get(2)?,
        })
    })?;
}

fn read_query(table: String, fields_names: String) -> String {
    return format!("SELECT {fields_names} FROM {table}");
}

fn get_model(table: &str) -> String {
    //TODO change the return to a model
    let model = match table {
        "note" => "create",
        "alias" => "update",
        "kanban" => "read",
        "schedule" => "delete",
        &_ => "",
    };
    return model.to_string();
}

fn delete(model_data: Value) {}

fn values_and_columns(data: &Value) -> (Vec<String>, Vec<Box<dyn Any + 'static>>) {
    let mut column_names = Vec::new();
    let mut column_values: Vec<Box<dyn Any>> = Vec::new();
    if let Some(obj) = data.as_object() {
        for (key, val) in obj {
            match val {
                Value::String(val_str) => {
                    column_names.push(key.to_owned());
                    column_values.push(Box::new(val_str.clone()));
                }
                Value::Number(val_num) => {
                    if let Some(val_i64) = val_num.as_i64() {
                        column_names.push(key.to_owned());
                        column_values.push(Box::new(val_i64));
                    } else if let Some(val_f64) = val_num.as_f64() {
                        column_names.push(key.to_owned());
                        column_values.push(Box::new(val_f64));
                    }
                }
                Value::Null => {
                    column_names.push(key.to_owned());
                    column_values.push(Box::new(rusqlite::types::Null));
                }
                _ => {}
            }
        }
    }
    (column_names, column_values)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_model_fields_information() {
        let model_data = json!({ "title": "name", "id": "5"});
        let (fields, fields_numbers, fields_values) = get_model_fields_information(model_data);
        assert_eq!("id, title", fields);
        assert_eq!("1?, 2?", fields_numbers);
        assert_eq!(vec!("5", "title"), fields_values);
    }

    #[test]
    fn test_generate_fields() {
        let mut result = String::from("");
        for word in ["one", "two", "three"] {
            result = generate_fields(result, String::from(word));
        }
        assert_eq!("one, two, three", result);
    }

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
